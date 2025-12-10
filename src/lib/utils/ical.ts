import ical from 'ical-generator';
import { ICAL_DOMAIN, ICAL_ORGANIZER_EMAIL, ICAL_ORGANIZER_NAME } from '$env/static/private';

export interface BookingEvent {
	id: string;
	title: string;
	start: Date;
	end: Date;
	description: string;
	location?: string;
	attendee: {
		name: string;
		email: string;
		phone?: string;
	};
}

export function generateICalEvent(booking: BookingEvent): string {
	const calendar = ical({
		domain: ICAL_DOMAIN || 'fullscopemedia.com',
		name: 'Full Scope Media Bookings',
		timezone: 'America/New_York' // Adjust to your timezone
	});

	calendar.createEvent({
		id: booking.id,
		start: booking.start,
		end: booking.end,
		summary: booking.title,
		description: booking.description,
		location: booking.location,
		organizer: {
			name: ICAL_ORGANIZER_NAME || 'Full Scope Media',
			email: ICAL_ORGANIZER_EMAIL || 'contact@fullscopemedia.com'
		},
		attendees: [
			{
				name: booking.attendee.name,
				email: booking.attendee.email,
				rsvp: true,
				status: 'needs-action',
				type: 'individual'
			}
		],
		method: 'request',
		status: 'confirmed'
	});

	return calendar.toString();
}

export function generateICalInvite(booking: BookingEvent): Buffer {
	const icalString = generateICalEvent(booking);
	return Buffer.from(icalString, 'utf8');
}

export function createBookingEvent(bookingData: {
	id: string;
	client_name: string;
	client_email: string;
	client_phone?: string;
	service_type: string;
	appointment_date: string;
	appointment_time: string;
	duration_minutes: number;
	property_address?: string;
	special_requirements?: string;
}): BookingEvent {
	const startDateTime = new Date(`${bookingData.appointment_date}T${bookingData.appointment_time}`);
	const endDateTime = new Date(startDateTime.getTime() + (bookingData.duration_minutes * 60 * 1000));

	let description = `Service: ${bookingData.service_type}\n`;
	description += `Client: ${bookingData.client_name}\n`;
	description += `Email: ${bookingData.client_email}\n`;
	if (bookingData.client_phone) {
		description += `Phone: ${bookingData.client_phone}\n`;
	}
	if (bookingData.special_requirements) {
		description += `\nSpecial Requirements:\n${bookingData.special_requirements}`;
	}

	return {
		id: bookingData.id,
		title: `${bookingData.service_type} - ${bookingData.client_name}`,
		start: startDateTime,
		end: endDateTime,
		description,
		location: bookingData.property_address,
		attendee: {
			name: bookingData.client_name,
			email: bookingData.client_email,
			phone: bookingData.client_phone
		}
	};
}
