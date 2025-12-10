<script lang="ts">
	import { onMount } from 'svelte';
	import { createCalendar } from '@schedule-x/calendar';
	import { createViewWeek, createViewMonthGrid } from '@schedule-x/calendar';
	import '@schedule-x/theme-default/dist/index.css';
	import { Calendar, Clock, Users, DollarSign } from 'lucide-svelte';
	import Button from '../ui/Button.svelte';
	import Card from '../ui/Card.svelte';

	interface TimeBlock {
		date: string;
		time: string;
		available: boolean;
		selected: boolean;
	}

	interface SelectedBooking {
		date: string;
		start_time: string;
		end_time: string;
		total_blocks: number;
		duration_minutes: number;
		rental_type: string;
		rate_per_block: number;
		total_amount: number;
		setup_fee: number;
		cleanup_fee: number;
	}

	let {
		onBookingSelect
	}: {
		onBookingSelect?: (booking: SelectedBooking) => void;
	} = $props();

	let selectedDate = $state(new Date().toISOString().split('T')[0]);
	let selectedBlocks = $state<TimeBlock[]>([]);
	let selectedRentalType = $state('photographer_rental');
	let existingBookings = $state([]);
	let calendar: any = $state(null);
	let calendarElement: HTMLDivElement;

	// Rental types with 15-minute block pricing
	const rentalTypes = {
		photographer_rental: {
			name: 'Photographer Rental',
			description: 'Studio rental for professional photographers',
			rate_per_block: 18.75, // $75/hour
			minimum_blocks: 8, // 2 hours minimum
			setup_fee: 25.00,
			cleanup_fee: 15.00,
			color: '#3b82f6'
		},
		party_rental: {
			name: 'Party/Event Rental',
			description: 'Studio rental for parties and events',
			rate_per_block: 25.00, // $100/hour
			minimum_blocks: 12, // 3 hours minimum
			setup_fee: 50.00,
			cleanup_fee: 75.00,
			color: '#10b981'
		},
		event_rental: {
			name: 'Super Bowl/Sports Events',
			description: 'Premium pricing for major sporting events',
			rate_per_block: 37.50, // $150/hour
			minimum_blocks: 16, // 4 hours minimum
			setup_fee: 100.00,
			cleanup_fee: 100.00,
			color: '#f59e0b'
		},
		studio_rental: {
			name: 'Standard Studio Rental',
			description: 'Basic studio rental for general use',
			rate_per_block: 15.00, // $60/hour
			minimum_blocks: 8, // 2 hours minimum
			setup_fee: 0.00,
			cleanup_fee: 25.00,
			color: '#8b5cf6'
		}
	};

	// Initialize with some blocks immediately
	function initializeBlocks() {
		const blocks: TimeBlock[] = [];
		for (let hour = 6; hour < 23; hour++) {
			for (let minute = 0; minute < 60; minute += 15) {
				const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
				blocks.push({
					date: selectedDate,
					time: timeString,
					available: true,
					selected: false
				});
			}
		}
		return blocks;
	}

	// Initialize blocks immediately
	selectedBlocks = initializeBlocks();

	onMount(async () => {
		console.log('ScheduleXStudioCalendar mounted');
		await loadExistingBookings();
		initializeScheduleX();
		generateTimeBlocks();
	});

	async function loadExistingBookings() {
		try {
			console.log('Loading existing bookings...');
			// For now, we'll use mock data or empty array until API endpoints are set up
			// TODO: Replace with actual API calls when backend is ready
			existingBookings = [
				// Example booking to show how conflicts work
				// {
				// 	id: 'demo-1',
				// 	rental_date: new Date().toISOString().split('T')[0],
				// 	start_time: '14:00',
				// 	end_time: '16:00',
				// 	booking_type: 'studio_rental',
				// 	title: 'Demo Booking'
				// }
			];

			console.log('Loaded bookings:', existingBookings.length);
		} catch (error) {
			console.error('Failed to load existing bookings:', error);
			existingBookings = []; // Fallback to empty array
		}
	}

	function calculateServiceEndTime(startTime: string, serviceType: string): string {
		// Service duration mapping (in minutes)
		const serviceDurations: Record<string, number> = {
			'photography': 120,
			'3d_tour': 180,
			'matterport': 180,
			'zillow3d': 180,
			'cubicasa': 90,
			'drone': 60,
			'virtual_staging': 30,
			'ai_video': 45,
			'cinematic_video': 240
		};

		const duration = serviceDurations[serviceType] || 120;
		const [hours, minutes] = startTime.split(':').map(Number);
		const startMinutes = hours * 60 + minutes;
		const endMinutes = startMinutes + duration;
		const endHours = Math.floor(endMinutes / 60);
		const endMins = endMinutes % 60;

		return `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;
	}

	function initializeScheduleX() {
		if (!calendarElement) {
			console.warn('Calendar element not ready');
			return;
		}

		try {
			console.log('Initializing Schedule-X calendar...');
			calendar = createCalendar({
				locale: 'en-US',
				firstDayOfWeek: 0,
				defaultView: 'week',
			views: [createViewWeek(), createViewMonthGrid()],
			events: existingBookings.map(booking => ({
				id: booking.id || `booking-${Math.random()}`,
				title: booking.title || 'Booking',
				start: `${booking.rental_date} ${booking.start_time}`,
				end: `${booking.rental_date} ${booking.end_time}`,
				calendarId: booking.booking_type || 'default'
			})),
			calendars: {
				studio_rental: {
					colorName: 'studio',
					lightColors: {
						main: '#8b5cf6',
						container: '#f3e8ff',
						onContainer: '#581c87'
					}
				},
				photography_service: {
					colorName: 'service',
					lightColors: {
						main: '#3b82f6',
						container: '#dbeafe',
						onContainer: '#1e40af'
					}
				}
			},
			callbacks: {
				onDateClick: (date) => {
					console.log('Date clicked:', date);
					const clickedDate = new Date(date).toISOString().split('T')[0];
					selectedDate = clickedDate;
					generateTimeBlocks();
				}
			}
		});

		calendar.render(calendarElement);
		console.log('Schedule-X calendar initialized successfully');
	} catch (error) {
		console.error('Failed to initialize Schedule-X calendar:', error);
	}
}

	function timeToMinutes(timeString: string): number {
		const [hours, minutes] = timeString.split(':').map(Number);
		return hours * 60 + minutes;
	}

	function generateTimeBlocks() {
		console.log('Generating time blocks for date:', selectedDate);
		const blocks: TimeBlock[] = [];

		// Generate 15-minute blocks from 6 AM to 11 PM
		for (let hour = 6; hour < 23; hour++) {
			for (let minute = 0; minute < 60; minute += 15) {
				const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

				// Check if this block conflicts with existing bookings
				const hasConflict = existingBookings.some(booking => {
					if (booking.rental_date !== selectedDate) return false;

					const blockStart = timeToMinutes(timeString);
					const blockEnd = blockStart + 15;
					const bookingStart = timeToMinutes(booking.start_time || '00:00');
					const bookingEnd = timeToMinutes(booking.end_time || '00:00');

					return (blockStart < bookingEnd && blockEnd > bookingStart);
				});

				blocks.push({
					date: selectedDate,
					time: timeString,
					available: !hasConflict,
					selected: false
				});
			}
		}

		console.log('Generated blocks:', blocks.length);
		selectedBlocks = blocks;

		// Force a reactive update
		selectedBlocks = [...selectedBlocks];
	}

	function toggleTimeBlock(blockIndex: number) {
		const block = selectedBlocks[blockIndex];
		if (!block.available) return;

		// Toggle selection
		selectedBlocks[blockIndex].selected = !selectedBlocks[blockIndex].selected;

		// Force reactive update
		selectedBlocks = [...selectedBlocks];

		// Update booking selection
		updateBookingSelection();
	}

	function updateBookingSelection() {
		const selected = selectedBlocks.filter(block => block.selected);
		if (selected.length === 0) {
			onBookingSelect?.(null);
			return;
		}

		// Sort selected blocks by time
		selected.sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));

		const startTime = selected[0].time;
		const endTimeMinutes = timeToMinutes(selected[selected.length - 1].time) + 15;
		const endHours = Math.floor(endTimeMinutes / 60);
		const endMins = endTimeMinutes % 60;
		const endTime = `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;

		const rental = rentalTypes[selectedRentalType];
		const totalBlocks = selected.length;
		const durationMinutes = totalBlocks * 15;
		const subtotal = totalBlocks * rental.rate_per_block;
		const setupFee = rental.setup_fee;
		const cleanupFee = rental.cleanup_fee;
		const totalAmount = subtotal + setupFee + cleanupFee;

		const booking: SelectedBooking = {
			date: selectedDate,
			start_time: startTime,
			end_time: endTime,
			total_blocks: totalBlocks,
			duration_minutes: durationMinutes,
			rental_type: selectedRentalType,
			rate_per_block: rental.rate_per_block,
			total_amount: totalAmount,
			setup_fee: setupFee,
			cleanup_fee: cleanupFee
		};

		onBookingSelect?.(booking);
	}

	function formatTime(time: string): string {
		const [hours, minutes] = time.split(':').map(Number);
		const period = hours >= 12 ? 'PM' : 'AM';
		const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
		return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
	}

	function formatDuration(minutes: number): string {
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		if (hours === 0) return `${mins}m`;
		if (mins === 0) return `${hours}h`;
		return `${hours}h ${mins}m`;
	}

	// Reactive statement to regenerate blocks when date or rental type changes
	$effect(() => {
		if (selectedDate || selectedRentalType) {
			generateTimeBlocks();
		}
	});

</script>

<div class="space-y-6">
	<!-- Rental Type Selection -->
	<Card>
		<div class="flex items-center gap-3 mb-4">
			<Users class="w-5 h-5 text-blue-600" />
			<h3 class="text-lg font-semibold text-gray-900">Select Rental Type</h3>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			{#each Object.entries(rentalTypes) as [key, rental]}
				<button
					onclick={() => selectedRentalType = key}
					class="p-4 border-2 rounded-lg transition-all text-left {selectedRentalType === key
						? 'border-blue-500 bg-blue-50'
						: 'border-gray-200 hover:border-gray-300'}"
				>
					<div class="flex items-center gap-2 mb-2">
						<div class="w-4 h-4 rounded-full" style="background-color: {rental.color}"></div>
						<h4 class="font-semibold text-gray-900">{rental.name}</h4>
					</div>
					<p class="text-sm text-gray-600 mb-2">{rental.description}</p>
					<div class="text-sm">
						<p class="font-medium text-blue-600">${rental.rate_per_block}/15min</p>
						<p class="text-gray-500">Min: {formatDuration(rental.minimum_blocks * 15)}</p>
						{#if rental.setup_fee > 0}
							<p class="text-gray-500">Setup: ${rental.setup_fee}</p>
						{/if}
					</div>
				</button>
			{/each}
		</div>
	</Card>

	<!-- Schedule-X Calendar -->
	<Card>
		<div class="flex items-center gap-3 mb-4">
			<Calendar class="w-5 h-5 text-blue-600" />
			<h3 class="text-lg font-semibold text-gray-900">Studio Availability Calendar</h3>
		</div>
		<div bind:this={calendarElement} class="schedule-x-calendar"></div>
	</Card>

	<!-- Date Selection -->
	<Card>
		<div class="flex items-center gap-3 mb-4">
			<Calendar class="w-5 h-5 text-blue-600" />
			<h3 class="text-lg font-semibold text-gray-900">Select Date</h3>
		</div>
		<input
			type="date"
			bind:value={selectedDate}
			min={new Date().toISOString().split('T')[0]}
			class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
		/>
	</Card>

	<!-- Time Block Selection -->
	<Card>
		<div class="flex items-center justify-between mb-4">
			<div class="flex items-center gap-3">
				<Clock class="w-5 h-5 text-blue-600" />
				<h3 class="text-lg font-semibold text-gray-900">Select Time Blocks (15-minute increments)</h3>
			</div>
			<div class="text-sm text-gray-600">
				Selected: {selectedBlocks.filter(b => b.selected).length} blocks
				({formatDuration(selectedBlocks.filter(b => b.selected).length * 15)})
			</div>
		</div>

		{#if selectedBlocks.length > 0}
			<div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-1 max-h-96 overflow-y-auto">
				{#each selectedBlocks as block, index}
					<button
						onclick={() => toggleTimeBlock(index)}
						class="p-2 text-xs border rounded transition-all {
							!block.available
								? 'bg-red-100 border-red-300 text-red-700 cursor-not-allowed'
								: block.selected
									? 'bg-blue-500 border-blue-600 text-white'
									: 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
						}"
						title="{formatTime(block.time)} - {block.available ? 'Available' : 'Booked'}"
						disabled={!block.available}
					>
						{formatTime(block.time)}
					</button>
				{/each}
			</div>
		{:else}
			<div class="text-center py-8 text-gray-500">
				<Clock class="w-12 h-12 mx-auto mb-2 text-gray-300" />
				<p>No time blocks available for this date</p>
			</div>
		{/if}

		<div class="mt-4 flex items-center gap-4 text-sm">
			<div class="flex items-center gap-2">
				<div class="w-4 h-4 bg-white border border-gray-300 rounded"></div>
				<span class="text-gray-600">Available</span>
			</div>
			<div class="flex items-center gap-2">
				<div class="w-4 h-4 bg-blue-500 rounded"></div>
				<span class="text-gray-600">Selected</span>
			</div>
			<div class="flex items-center gap-2">
				<div class="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
				<span class="text-gray-600">Booked</span>
			</div>
		</div>
	</Card>

	<!-- Booking Summary -->
	{#if selectedBlocks.some(b => b.selected)}
		{@const selectedCount = selectedBlocks.filter(b => b.selected).length}
		{@const rental = rentalTypes[selectedRentalType]}
		{@const subtotal = selectedCount * rental.rate_per_block}
		{@const total = subtotal + rental.setup_fee + rental.cleanup_fee}

		<Card>
			<div class="flex items-center gap-3 mb-4">
				<DollarSign class="w-5 h-5 text-green-600" />
				<h3 class="text-lg font-semibold text-gray-900">Booking Summary</h3>
			</div>

			<div class="space-y-3">
				<div class="flex justify-between">
					<span class="text-gray-600">Duration:</span>
					<span class="font-medium">{formatDuration(selectedCount * 15)}</span>
				</div>
				<div class="flex justify-between">
					<span class="text-gray-600">Rate:</span>
					<span class="font-medium">${rental.rate_per_block}/15min × {selectedCount} blocks</span>
				</div>
				<div class="flex justify-between">
					<span class="text-gray-600">Subtotal:</span>
					<span class="font-medium">${subtotal.toFixed(2)}</span>
				</div>
				{#if rental.setup_fee > 0}
					<div class="flex justify-between">
						<span class="text-gray-600">Setup Fee:</span>
						<span class="font-medium">${rental.setup_fee.toFixed(2)}</span>
					</div>
				{/if}
				{#if rental.cleanup_fee > 0}
					<div class="flex justify-between">
						<span class="text-gray-600">Cleanup Fee:</span>
						<span class="font-medium">${rental.cleanup_fee.toFixed(2)}</span>
					</div>
				{/if}
				<div class="border-t pt-3">
					<div class="flex justify-between text-lg font-semibold">
						<span>Total:</span>
						<span class="text-green-600">${total.toFixed(2)}</span>
					</div>
				</div>
			</div>
		</Card>
	{/if}
</div>

<style>
	:global(.schedule-x-calendar) {
		height: 600px;
	}

	:global(.sx__event--studio_rental) {
		background-color: #f3e8ff !important;
		border-color: #8b5cf6 !important;
		color: #581c87 !important;
	}

	:global(.sx__event--photography_service) {
		background-color: #dbeafe !important;
		border-color: #3b82f6 !important;
		color: #1e40af !important;
	}
</style>
