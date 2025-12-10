import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/supabase';
import { createBookingEvent, generateICalInvite } from '$lib/utils/ical';
import { sendEmail, generateBookingConfirmationEmail } from '$lib/utils/email';
import { BUSINESS_EMAIL } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const bookingData = await request.json();
		
		// Validate required fields
		const requiredFields = ['client_name', 'client_email', 'client_phone', 'service_type', 'appointment_date', 'appointment_time'];
		for (const field of requiredFields) {
			if (!bookingData[field]) {
				return json({ error: `Missing required field: ${field}` }, { status: 400 });
			}
		}

		// Generate unique iCal UID
		const icalUid = `booking-${Date.now()}-${Math.random().toString(36).substr(2, 9)}@fullscopemedia.com`;

		// Insert booking into database
		const { data: booking, error: dbError } = await supabase
			.from('bookings')
			.insert({
				client_name: bookingData.client_name,
				client_email: bookingData.client_email,
				client_phone: bookingData.client_phone,
				client_company: bookingData.client_company,
				service_type: bookingData.service_type,
				appointment_date: bookingData.appointment_date,
				appointment_time: bookingData.appointment_time,
				duration_minutes: bookingData.duration_minutes || 120,
				property_address: bookingData.property_address,
				property_type: bookingData.property_type,
				special_requirements: bookingData.special_requirements,
				budget_range: bookingData.budget_range,
				how_heard_about_us: bookingData.how_heard_about_us,
				notes: bookingData.notes,
				ical_uid: icalUid,
				status: 'confirmed'
			})
			.select()
			.single();

		if (dbError) {
			console.error('Database error:', dbError);
			return json({ error: 'Failed to create booking' }, { status: 500 });
		}

		// Generate iCal event
		const bookingEvent = createBookingEvent(booking);
		const icalBuffer = generateICalInvite(bookingEvent);

		// Send confirmation email to client
		const clientEmailHtml = generateBookingConfirmationEmail(booking);
		const clientEmailSent = await sendEmail({
			to: booking.client_email,
			subject: `Booking Confirmation - ${booking.service_type}`,
			html: clientEmailHtml,
			attachments: [
				{
					filename: 'appointment.ics',
					content: icalBuffer,
					contentType: 'text/calendar'
				}
			]
		});

		// Send notification email to business owner
		const ownerEmailHtml = `
			<h2>New Booking Received</h2>
			<p><strong>Client:</strong> ${booking.client_name}</p>
			<p><strong>Email:</strong> ${booking.client_email}</p>
			<p><strong>Phone:</strong> ${booking.client_phone}</p>
			<p><strong>Service:</strong> ${booking.service_type}</p>
			<p><strong>Date:</strong> ${booking.appointment_date}</p>
			<p><strong>Time:</strong> ${booking.appointment_time}</p>
			${booking.property_address ? `<p><strong>Address:</strong> ${booking.property_address}</p>` : ''}
			${booking.special_requirements ? `<p><strong>Requirements:</strong> ${booking.special_requirements}</p>` : ''}
		`;

		const ownerEmailSent = await sendEmail({
			to: BUSINESS_EMAIL || 'contact@fullscopemedia.com',
			subject: `New Booking: ${booking.service_type} - ${booking.client_name}`,
			html: ownerEmailHtml,
			attachments: [
				{
					filename: 'appointment.ics',
					content: icalBuffer,
					contentType: 'text/calendar'
				}
			]
		});

		// Update booking status based on email success
		if (clientEmailSent) {
			await supabase
				.from('bookings')
				.update({ confirmation_sent: true })
				.eq('id', booking.id);
		}

		return json({
			success: true,
			booking: {
				id: booking.id,
				client_name: booking.client_name,
				service_type: booking.service_type,
				appointment_date: booking.appointment_date,
				appointment_time: booking.appointment_time
			},
			emails_sent: {
				client: clientEmailSent,
				owner: ownerEmailSent
			}
		});

	} catch (error) {
		console.error('Booking API error:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};

export const GET: RequestHandler = async ({ url }) => {
	try {
		const date = url.searchParams.get('date');
		
		if (date) {
			// Get bookings for specific date
			const { data: bookings, error } = await supabase
				.from('bookings')
				.select('appointment_time, duration_minutes, service_type')
				.eq('appointment_date', date)
				.eq('status', 'confirmed');

			if (error) {
				return json({ error: 'Failed to fetch bookings' }, { status: 500 });
			}

			return json({ bookings });
		} else {
			// Get all upcoming bookings
			const today = new Date().toISOString().split('T')[0];
			const { data: bookings, error } = await supabase
				.from('bookings')
				.select('*')
				.gte('appointment_date', today)
				.order('appointment_date', { ascending: true })
				.order('appointment_time', { ascending: true });

			if (error) {
				return json({ error: 'Failed to fetch bookings' }, { status: 500 });
			}

			return json({ bookings });
		}
	} catch (error) {
		console.error('Booking GET API error:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};
