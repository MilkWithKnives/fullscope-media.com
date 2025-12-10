import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/supabase';

export const GET: RequestHandler = async ({ url }) => {
	try {
		const date = url.searchParams.get('date');
		
		if (!date) {
			return json({ error: 'Date parameter is required' }, { status: 400 });
		}

		// Check if the date is in the past
		const selectedDate = new Date(date);
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		
		if (selectedDate < today) {
			return json({ error: 'Cannot book dates in the past' }, { status: 400 });
		}

		// Get existing bookings for this date
		const { data: existingRentals, error: rentalsError } = await supabase
			.from('studio_rentals')
			.select('start_time, end_time, status')
			.eq('rental_date', date)
			.in('status', ['confirmed', 'paid']);

		if (rentalsError) {
			console.error('Database error:', rentalsError);
			return json({ error: 'Failed to fetch existing bookings' }, { status: 500 });
		}

		// Generate available time slots
		const timeSlots = generateTimeSlots();
		const availableSlots = timeSlots.map(slot => {
			const isAvailable = !isTimeSlotBooked(slot.start_time, slot.end_time, existingRentals || []);
			
			return {
				id: `${date}-${slot.start_time}-${slot.end_time}`,
				date,
				start_time: slot.start_time,
				end_time: slot.end_time,
				is_available: isAvailable,
				hourly_rate: getHourlyRate(date),
				daily_rate: getDailyRate(date)
			};
		});

		return json({
			date,
			slots: availableSlots,
			total_slots: timeSlots.length,
			available_slots: availableSlots.filter(slot => slot.is_available).length
		});

	} catch (error) {
		console.error('Studio availability API error:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};

function generateTimeSlots() {
	// Studio hours: 9 AM to 9 PM
	const slots = [];
	
	for (let hour = 9; hour < 21; hour++) {
		slots.push({
			start_time: `${hour.toString().padStart(2, '0')}:00`,
			end_time: `${(hour + 1).toString().padStart(2, '0')}:00`,
			label: formatTimeSlot(hour, hour + 1)
		});
	}
	
	return slots;
}

function formatTimeSlot(startHour: number, endHour: number): string {
	const formatHour = (hour: number) => {
		const period = hour >= 12 ? 'PM' : 'AM';
		const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
		return `${displayHour}:00 ${period}`;
	};
	
	return `${formatHour(startHour)} - ${formatHour(endHour)}`;
}

function isTimeSlotBooked(startTime: string, endTime: string, existingRentals: any[]): boolean {
	const slotStart = timeToMinutes(startTime);
	const slotEnd = timeToMinutes(endTime);
	
	return existingRentals.some(rental => {
		const rentalStart = timeToMinutes(rental.start_time);
		const rentalEnd = timeToMinutes(rental.end_time);
		
		// Check if there's any overlap
		return (slotStart < rentalEnd && slotEnd > rentalStart);
	});
}

function timeToMinutes(time: string): number {
	const [hours, minutes] = time.split(':').map(Number);
	return hours * 60 + minutes;
}

function getHourlyRate(date: string): number {
	const dayOfWeek = new Date(date).getDay();
	const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday
	
	const baseRate = 75; // Base hourly rate
	return isWeekend ? baseRate * 1.5 : baseRate; // 50% weekend surcharge
}

function getDailyRate(date: string): number {
	const dayOfWeek = new Date(date).getDay();
	const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
	
	const baseRate = 450; // Base daily rate
	return isWeekend ? baseRate * 1.5 : baseRate; // 50% weekend surcharge
}

// POST endpoint to manually set availability
export const POST: RequestHandler = async ({ request }) => {
	try {
		const availabilityData = await request.json();
		
		// Validate required fields
		const requiredFields = ['date', 'start_time', 'end_time'];
		for (const field of requiredFields) {
			if (!availabilityData[field]) {
				return json({ error: `Missing required field: ${field}` }, { status: 400 });
			}
		}

		// Insert or update availability
		const { data: availability, error: dbError } = await supabase
			.from('studio_availability')
			.upsert({
				date: availabilityData.date,
				start_time: availabilityData.start_time,
				end_time: availabilityData.end_time,
				is_available: availabilityData.is_available ?? true,
				hourly_rate: availabilityData.hourly_rate || getHourlyRate(availabilityData.date),
				daily_rate: availabilityData.daily_rate || getDailyRate(availabilityData.date),
				notes: availabilityData.notes
			})
			.select()
			.single();

		if (dbError) {
			console.error('Database error:', dbError);
			return json({ error: 'Failed to update availability' }, { status: 500 });
		}

		return json({
			success: true,
			availability
		});

	} catch (error) {
		console.error('Studio availability POST error:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};
