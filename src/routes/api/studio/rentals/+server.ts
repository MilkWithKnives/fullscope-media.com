import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/supabase';
import { createBookingEvent, generateICalInvite } from '$lib/utils/ical';
import { sendEmail, generateBookingConfirmationEmail } from '$lib/utils/email';
import { env } from '$env/dynamic/private';

const BUSINESS_EMAIL = env.BUSINESS_EMAIL ?? '';

type RouteEvent = Parameters<RequestHandler>[0];

export const POST: RequestHandler = async ({ request }: RouteEvent) => {
	try {
		const rentalData = await request.json();
		
		// Validate required fields for 15-minute block system
		const requiredFields = ['client_name', 'client_email', 'client_phone', 'rental_date', 'start_time', 'end_time', 'total_blocks', 'duration_minutes', 'rental_type', 'rate_per_block', 'total_amount'];
		for (const field of requiredFields) {
			if (!rentalData[field]) {
				return json({ error: `Missing required field: ${field}` }, { status: 400 });
			}
		}

		// Check for booking conflicts (both studio rentals and photography services)
		const conflictCheck = await checkBookingConflicts(
			rentalData.rental_date,
			rentalData.start_time,
			rentalData.end_time
		);

		if (conflictCheck.hasConflict) {
			return json({
				error: 'Time slot conflict detected',
				conflicts: conflictCheck.conflicts
			}, { status: 409 });
		}

		// Generate unique iCal UID
		const icalUid = `studio-rental-${Date.now()}-${Math.random().toString(36).substr(2, 9)}@fullscopemedia.com`;

		// Insert studio rental into database (15-minute block system)
		const { data: rental, error: dbError } = await supabase
			.from('studio_rentals')
			.insert({
				client_name: rentalData.client_name,
				client_email: rentalData.client_email,
				client_phone: rentalData.client_phone,
				client_company: rentalData.client_company,
				rental_date: rentalData.rental_date,
				start_time: rentalData.start_time,
				end_time: rentalData.end_time,
				duration_minutes: rentalData.duration_minutes,
				total_blocks: rentalData.total_blocks,
				rental_type: rentalData.rental_type,
				rate_per_block: rentalData.rate_per_block,
				total_amount: rentalData.total_amount,
				purpose: rentalData.purpose,
				event_type: rentalData.event_type,
				equipment_needed: rentalData.equipment_needed,
				guest_count: rentalData.guest_count || 1,
				special_requirements: rentalData.special_requirements,
				setup_time_needed: rentalData.setup_time_needed || false,
				cleanup_time_needed: rentalData.cleanup_time_needed || false,
				deposit_required: rentalData.deposit_required !== false,
				booking_source: 'website',
				ical_uid: icalUid,
				status: 'confirmed'
			})
			.select()
			.single();

		if (dbError) {
			console.error('Database error:', dbError);
			return json({ error: 'Failed to create studio rental' }, { status: 500 });
		}

		// Insert into booking conflicts table to prevent double-booking
		const { error: conflictError } = await supabase
			.from('booking_conflicts')
			.insert({
				booking_date: rental.rental_date,
				start_time: rental.start_time,
				end_time: rental.end_time,
				booking_type: 'studio_rental',
				booking_id: rental.id,
				client_name: rental.client_name,
				service_description: `Studio Rental - ${rental.rental_type} (${rental.total_blocks} blocks)`
			});

		if (conflictError) {
			console.error('Conflict table error:', conflictError);
			// Don't fail the booking, just log the error
		}

		// Generate iCal event for studio rental
		const bookingEvent = {
			id: rental.id,
			title: `Studio Rental - ${rental.client_name}`,
			start: new Date(`${rental.rental_date}T${rental.start_time}`),
			end: new Date(`${rental.rental_date}T${rental.end_time}`),
			description: `Studio Rental\nClient: ${rental.client_name}\nEmail: ${rental.client_email}\nPhone: ${rental.client_phone}\nPurpose: ${rental.purpose}\nGuests: ${rental.guest_count}\n${rental.special_requirements ? `\nSpecial Requirements:\n${rental.special_requirements}` : ''}`,
			location: 'Full Scope Media Studio',
			attendee: {
				name: rental.client_name,
				email: rental.client_email,
				phone: rental.client_phone
			}
		};

		const icalBuffer = generateICalInvite(bookingEvent);

		// Send confirmation email to client
		const clientEmailHtml = generateStudioRentalConfirmationEmail(rental);
		const clientEmailSent = await sendEmail({
			to: rental.client_email,
			subject: `Studio Rental Confirmation - ${rental.rental_date}`,
			html: clientEmailHtml,
			attachments: [
				{
					filename: 'studio-rental.ics',
					content: icalBuffer,
					contentType: 'text/calendar'
				}
			]
		});

		// Send notification email to business owner
		const ownerEmailHtml = `
			<h2>New Studio Rental Booking</h2>
			<p><strong>Client:</strong> ${rental.client_name}</p>
			<p><strong>Email:</strong> ${rental.client_email}</p>
			<p><strong>Phone:</strong> ${rental.client_phone}</p>
			<p><strong>Company:</strong> ${rental.client_company || 'N/A'}</p>
			<p><strong>Date:</strong> ${rental.rental_date}</p>
			<p><strong>Time:</strong> ${rental.start_time} - ${rental.end_time}</p>
			<p><strong>Duration:</strong> ${rental.duration_hours} hours</p>
			<p><strong>Purpose:</strong> ${rental.purpose}</p>
			<p><strong>Guests:</strong> ${rental.guest_count}</p>
			<p><strong>Total Amount:</strong> $${rental.total_amount}</p>
			${rental.equipment_needed ? `<p><strong>Equipment:</strong> ${rental.equipment_needed}</p>` : ''}
			${rental.special_requirements ? `<p><strong>Special Requirements:</strong> ${rental.special_requirements}</p>` : ''}
		`;

		const ownerEmailSent = await sendEmail({
			to: BUSINESS_EMAIL || 'contact@fullscopemedia.com',
			subject: `New Studio Rental: ${rental.rental_date} - ${rental.client_name}`,
			html: ownerEmailHtml,
			attachments: [
				{
					filename: 'studio-rental.ics',
					content: icalBuffer,
					contentType: 'text/calendar'
				}
			]
		});

		// Update rental status based on email success
		if (clientEmailSent) {
			await supabase
				.from('studio_rentals')
				.update({ confirmation_sent: true })
				.eq('id', rental.id);
		}

		return json({
			success: true,
			rental: {
				id: rental.id,
				client_name: rental.client_name,
				rental_date: rental.rental_date,
				start_time: rental.start_time,
				end_time: rental.end_time,
				total_amount: rental.total_amount
			},
			emails_sent: {
				client: clientEmailSent,
				owner: ownerEmailSent
			}
		});

	} catch (error) {
		console.error('Studio rental API error:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};

function generateStudioRentalConfirmationEmail(rental: any): string {
	const formattedDate = new Date(rental.rental_date).toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
	
	const formattedStartTime = new Date(`${rental.rental_date}T${rental.start_time}`).toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true
	});

	const formattedEndTime = new Date(`${rental.rental_date}T${rental.end_time}`).toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true
	});

	return `
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8">
			<title>Studio Rental Confirmation - Full Scope Media</title>
		</head>
		<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
			<div style="max-width: 600px; margin: 0 auto; padding: 20px;">
				<div style="text-align: center; margin-bottom: 30px;">
					<h1 style="color: #2563eb;">Full Scope Media Studio</h1>
					<h2 style="color: #4b5563;">Studio Rental Confirmation</h2>
				</div>
				
				<p>Dear ${rental.client_name},</p>
				
				<p>Thank you for booking our photography studio! Your rental has been confirmed.</p>
				
				<div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
					<h3 style="margin-top: 0; color: #2563eb;">Rental Details</h3>
					<p><strong>Date:</strong> ${formattedDate}</p>
					<p><strong>Time:</strong> ${formattedStartTime} - ${formattedEndTime}</p>
					<p><strong>Duration:</strong> ${Math.floor(rental.duration_minutes / 60)}h ${rental.duration_minutes % 60}m (${rental.total_blocks} blocks)</p>
					<p><strong>Purpose:</strong> ${rental.purpose}</p>
					<p><strong>Guests:</strong> ${rental.guest_count} people</p>
					<p><strong>Total Amount:</strong> $${rental.total_amount}</p>
				</div>
				
				<div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
					<h4 style="margin-top: 0; color: #92400e;">Studio Guidelines:</h4>
					<ul style="margin: 0;">
						<li>Please arrive 15 minutes early for setup</li>
						<li>Studio address will be provided 24 hours before rental</li>
						<li>All equipment must be handled with care</li>
						<li>Clean up after your session</li>
						<li>No smoking or food in the studio</li>
					</ul>
				</div>
				
				<p>If you need to reschedule or have any questions, please contact us at least 24 hours in advance.</p>
				
				<p>We look forward to hosting your creative session!</p>
				
				<div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
					<p style="color: #6b7280; font-size: 14px;">
						Full Scope Media Studio - Professional Photography Space Rental
					</p>
				</div>
			</div>
		</body>
		</html>
	`;
}

// Conflict checking function
async function checkBookingConflicts(date: string, startTime: string, endTime: string) {
	try {
		// Check studio rentals
		const { data: studioConflicts, error: studioError } = await supabase
			.from('studio_rentals')
			.select('id, client_name, start_time, end_time, rental_type')
			.eq('rental_date', date)
			.neq('status', 'cancelled')
			.or(`and(start_time.lt.${endTime},end_time.gt.${startTime})`);

		if (studioError) {
			console.error('Studio conflict check error:', studioError);
		}

		// Check photography service bookings
		const { data: serviceConflicts, error: serviceError } = await supabase
			.from('bookings')
			.select('id, client_name, appointment_time, service_type')
			.eq('appointment_date', date)
			.neq('status', 'cancelled');

		if (serviceError) {
			console.error('Service conflict check error:', serviceError);
		}

		// Calculate service end times and check for conflicts
		const serviceTimeConflicts = (serviceConflicts || []).filter((booking: any) => {
			const serviceEndTime = calculateServiceEndTime(booking.appointment_time, booking.service_type);
			return timeOverlaps(startTime, endTime, booking.appointment_time, serviceEndTime);
		});

		const allConflicts = [
			...(studioConflicts || []).map((c: any) => ({ ...c, type: 'studio_rental' })),
			...serviceTimeConflicts.map((c: any) => ({ ...c, type: 'photography_service' }))
		];

		return {
			hasConflict: allConflicts.length > 0,
			conflicts: allConflicts
		};
	} catch (error) {
		console.error('Conflict check error:', error);
		return { hasConflict: false, conflicts: [] };
	}
}

function timeOverlaps(start1: string, end1: string, start2: string, end2: string): boolean {
	const start1Minutes = timeToMinutes(start1);
	const end1Minutes = timeToMinutes(end1);
	const start2Minutes = timeToMinutes(start2);
	const end2Minutes = timeToMinutes(end2);

	return start1Minutes < end2Minutes && end1Minutes > start2Minutes;
}

function timeToMinutes(time: string): number {
	const [hours, minutes] = time.split(':').map(Number);
	return hours * 60 + minutes;
}

function calculateServiceEndTime(startTime: string, serviceType: string): string {
	const serviceDurations: Record<string, number> = {
		'Real Estate Photography': 120,
		'Drone/Aerial Photography': 90,
		'Matterport 3D Tour': 180,
		'Zillow 3D Tour': 150,
		'Cubicasa Floor Plans': 60,
		'Virtual Staging': 30,
		'AI Video Tour': 90,
		'Cinematic Video': 240,
		'Full Package': 360
	};

	const duration = serviceDurations[serviceType] || 120;
	const startMinutes = timeToMinutes(startTime);
	const endMinutes = startMinutes + duration;
	const endHours = Math.floor(endMinutes / 60);
	const endMins = endMinutes % 60;

	return `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;
}
