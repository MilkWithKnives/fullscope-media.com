<script lang="ts">
	import { onMount } from 'svelte';
	import { createCalendar } from '@schedule-x/calendar';
	import { createViewWeek, createViewMonthGrid } from '@schedule-x/calendar';
	import '@schedule-x/theme-default/dist/index.css';
	import Calendar from 'lucide-svelte/icons/calendar';
	import Clock from 'lucide-svelte/icons/clock';
	import Users from 'lucide-svelte/icons/users';
	import DollarSign from 'lucide-svelte/icons/dollar-sign';
	import Plus from 'lucide-svelte/icons/plus';
	import Minus from 'lucide-svelte/icons/minus';
	import type { Temporal } from 'temporal-polyfill';
	import Button from '../ui/Button.svelte';
	import Card from '../ui/Card.svelte';

	const WeekDay = {
		MONDAY: 1,
		TUESDAY: 2,
		WEDNESDAY: 3,
		THURSDAY: 4,
		FRIDAY: 5,
		SATURDAY: 6,
		SUNDAY: 7
	} as const;

type WeekDayValue = (typeof WeekDay)[keyof typeof WeekDay];

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

	interface ExistingBooking {
		id?: string;
		title?: string;
		booking_type?: string;
		rental_date: string;
		start_time?: string;
		end_time?: string;
	}

	let {
		onBookingSelect
	}: {
		onBookingSelect?: (booking: SelectedBooking) => void;
	} = $props();

	let calendarElement: HTMLElement;
	let calendar: any;
	let selectedDate = $state(new Date().toISOString().split('T')[0]);
	let selectedBlocks = $state<TimeBlock[]>([]);
	let existingBookings = $state<ExistingBooking[]>([]);

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

	type RentalKey = keyof typeof rentalTypes;
	const rentalEntries = $derived(Object.entries(rentalTypes) as [RentalKey, (typeof rentalTypes)[RentalKey]][]);

	let selectedRentalType = $state<RentalKey>('photographer_rental');

	onMount(async () => {
		console.log('Enhanced15MinStudioCalendar mounted');
		await loadExistingBookings();
		initializeCalendar();
		generateTimeBlocks();
	});

	async function loadExistingBookings() {
		try {
			console.log('Loading existing bookings...');
			// Load both studio rentals and photography service bookings
			const [studioResponse, servicesResponse] = await Promise.all([
				fetch('/api/admin/studio-rentals').catch(() => ({ json: () => ({ rentals: [] }) })),
				fetch('/api/bookings').catch(() => ({ json: () => ({ bookings: [] }) }))
			]);

			const studioData = await studioResponse.json();
			const servicesData = await servicesResponse.json();

			existingBookings = [
				...(studioData.rentals || []).map((rental: any) => ({
					...rental,
					booking_type: 'studio_rental',
					title: `Studio: ${rental.client_name} - ${rental.event_type || rental.purpose}`
				})),
				...(servicesData.bookings || []).map((booking: any) => ({
					...booking,
					booking_type: 'photography_service',
					title: `Service: ${booking.service_type} - ${booking.client_name}`,
					rental_date: booking.appointment_date,
					start_time: booking.appointment_time,
					// Calculate end time based on service duration
					end_time: calculateServiceEndTime(booking.appointment_time, booking.service_type)
				}))
			];

			console.log('Loaded bookings:', existingBookings.length);
		} catch (error) {
			console.error('Failed to load existing bookings:', error);
			existingBookings = []; // Fallback to empty array
		}
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
		const [hours, minutes] = startTime.split(':').map(Number);
		const startMinutes = hours * 60 + minutes;
		const endMinutes = startMinutes + duration;
		const endHours = Math.floor(endMinutes / 60);
		const endMins = endMinutes % 60;
		
		return `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;
	}

	function initializeCalendar() {
		if (!calendarElement) {
			console.warn('Calendar element not ready');
			return;
		}

		try {
			console.log('Initializing Schedule-X calendar...');
			calendar = createCalendar({
				locale: 'en-US',
				firstDayOfWeek: WeekDay.SUNDAY as WeekDayValue,
				defaultView: 'week',
				views: [createViewWeek(), createViewMonthGrid()],
				events: existingBookings.map((booking) => {
					const startTime = booking.start_time ?? '00:00';
					const endTime = booking.end_time ?? startTime;

					return {
						id: booking.id || `booking-${Math.random()}`,
						title: booking.title || 'Booking',
						start: `${booking.rental_date} ${startTime}`,
						end: `${booking.rental_date} ${endTime}`,
						calendarId: booking.booking_type || 'default'
					};
				}),
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
					},
					default: {
						colorName: 'default',
						lightColors: {
							main: '#6b7280',
							container: '#f3f4f6',
							onContainer: '#374151'
						}
					}
				},
				callbacks: {
					onClickDate: (date: Temporal.PlainDate) => {
						const clickedDate = date.toString();
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
	}

	function timeToMinutes(time: string): number {
		const [hours, minutes] = time.split(':').map(Number);
		return hours * 60 + minutes;
	}

	function toggleTimeBlock(blockIndex: number) {
		const block = selectedBlocks[blockIndex];
		if (!block.available) return;
		
		selectedBlocks[blockIndex].selected = !selectedBlocks[blockIndex].selected;
		
		// Update booking calculation
		updateBookingCalculation();
	}

	function updateBookingCalculation() {
		const selectedTimeBlocks = selectedBlocks.filter(block => block.selected);
		if (selectedTimeBlocks.length === 0) return;

		// Sort selected blocks by time
		selectedTimeBlocks.sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));
		
		const rentalConfig = rentalTypes[selectedRentalType];
		const startTime = selectedTimeBlocks[0].time;
		const lastBlock = selectedTimeBlocks[selectedTimeBlocks.length - 1];
		const endMinutes = timeToMinutes(lastBlock.time) + 15;
		const endTime = `${Math.floor(endMinutes / 60).toString().padStart(2, '0')}:${(endMinutes % 60).toString().padStart(2, '0')}`;
		
		// Check if minimum blocks requirement is met
		if (selectedTimeBlocks.length < rentalConfig.minimum_blocks) {
			return; // Don't create booking if minimum not met
		}

		// Calculate pricing
		const isWeekend = new Date(selectedDate).getDay() === 0 || new Date(selectedDate).getDay() === 6;
		const multiplier = isWeekend ? 1.5 : 1;
		const blockRate = rentalConfig.rate_per_block * multiplier;
		const subtotal = selectedTimeBlocks.length * blockRate;
		const totalAmount = subtotal + rentalConfig.setup_fee + rentalConfig.cleanup_fee;

		const booking: SelectedBooking = {
			date: selectedDate,
			start_time: startTime,
			end_time: endTime,
			total_blocks: selectedTimeBlocks.length,
			duration_minutes: selectedTimeBlocks.length * 15,
			rental_type: selectedRentalType,
			rate_per_block: blockRate,
			total_amount: totalAmount,
			setup_fee: rentalConfig.setup_fee,
			cleanup_fee: rentalConfig.cleanup_fee
		};

		onBookingSelect?.(booking);
	}

	function selectConsecutiveBlocks(startIndex: number, count: number) {
		// Clear all selections first
		selectedBlocks.forEach(block => block.selected = false);
		
		// Select consecutive blocks
		for (let i = 0; i < count && startIndex + i < selectedBlocks.length; i++) {
			const block = selectedBlocks[startIndex + i];
			if (block.available) {
				block.selected = true;
			}
		}
		
		updateBookingCalculation();
	}

	function formatTime(time: string): string {
		const [hour, minute] = time.split(':').map(Number);
		const period = hour >= 12 ? 'PM' : 'AM';
		const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
		return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
	}

	$effect(() => {
		if (selectedDate) {
			generateTimeBlocks();
		}
	});
</script>

<div class="space-y-6">
	<!-- Debug Info (remove in production) -->
	<Card class="p-4 bg-yellow-50 border-yellow-200">
		<h4 class="text-sm font-semibold text-yellow-800 mb-2">Debug Info</h4>
		<div class="text-xs text-yellow-700 space-y-1">
			<p>Selected Date: {selectedDate}</p>
			<p>Existing Bookings: {existingBookings.length}</p>
			<p>Selected Blocks: {selectedBlocks.length}</p>
			<p>Available Blocks: {selectedBlocks.filter(b => b.available).length}</p>
			<p>Selected Rental Type: {selectedRentalType}</p>
		</div>
	</Card>

	<!-- Rental Type Selection -->
	<Card class="p-6 bg-zinc-900 border-zinc-800">
		<h3 class="text-lg font-semibold text-white mb-4">Select Rental Type</h3>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			{#each rentalEntries as [key, rental]}
				<button
					onclick={() => { selectedRentalType = key; updateBookingCalculation(); }}
					class="p-4 border-2 rounded-lg transition-all text-left {selectedRentalType === key
						? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
						: 'border-zinc-700 hover:border-zinc-600'}"
				>
					<div class="flex items-center gap-2 mb-2">
						<div class="w-4 h-4 rounded-full" style="background-color: {rental.color}"></div>
						<h4 class="font-semibold text-white">{rental.name}</h4>
					</div>
					<p class="text-sm text-zinc-400 mb-2">{rental.description}</p>
					<div class="text-sm">
						<p class="font-medium text-[var(--color-primary)]">${rental.rate_per_block}/15min</p>
						<p class="text-zinc-500">Min: {Math.floor(rental.minimum_blocks / 4)}h</p>
						{#if rental.setup_fee > 0}
							<p class="text-zinc-500">Setup: ${rental.setup_fee}</p>
						{/if}
					</div>
				</button>
			{/each}
		</div>
	</Card>

	<!-- Date Selection -->
	<Card class="p-6 bg-zinc-900 border-zinc-800">
		<div class="flex items-center gap-3 mb-4">
			<Calendar class="text-[var(--color-primary)]" size={24} />
			<h3 class="text-lg font-semibold text-white">Select Date</h3>
		</div>

		<input
			type="date"
			bind:value={selectedDate}
			min={new Date().toISOString().split('T')[0]}
			class="w-full px-4 py-2 bg-zinc-900 text-white border border-zinc-700 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
		/>
	</Card>

	<!-- Schedule-X Calendar Overview -->
	<Card class="p-6 bg-zinc-900 border-zinc-800">
		<h3 class="text-lg font-semibold text-white mb-4">Studio Schedule Overview</h3>
		<div bind:this={calendarElement} class="schedule-x-calendar"></div>
	</Card>

	<!-- 15-Minute Time Block Selection -->
	<Card class="p-6 bg-zinc-900 border-zinc-800">
		<div class="flex items-center justify-between mb-4">
			<div class="flex items-center gap-3">
				<Clock class="text-[var(--color-primary)]" size={24} />
				<h3 class="text-lg font-semibold text-white">Select Time Blocks (15-minute increments)</h3>
			</div>
			<div class="text-sm text-zinc-400">
				Selected: {selectedBlocks.filter(b => b.selected).length} blocks
				({Math.floor(selectedBlocks.filter(b => b.selected).length * 15 / 60)}h {(selectedBlocks.filter(b => b.selected).length * 15) % 60}m)
			</div>
		</div>

		<!-- Quick Selection Buttons -->
		<div class="flex flex-wrap gap-2 mb-4">
			<Button
				variant="outline"
				size="sm"
				onclick={() => selectConsecutiveBlocks(32, 8)}
			>
				2 Hours (2 PM)
			</Button>
			<Button
				variant="outline"
				size="sm"
				onclick={() => selectConsecutiveBlocks(36, 12)}
			>
				3 Hours (3 PM)
			</Button>
			<Button
				variant="outline"
				size="sm"
				onclick={() => selectConsecutiveBlocks(40, 16)}
			>
				4 Hours (4 PM)
			</Button>
			<Button
				variant="outline"
				size="sm"
				onclick={() => selectedBlocks.forEach(block => block.selected = false)}
			>
				Clear All
			</Button>
		</div>

		<!-- Time Block Grid -->
		{#if selectedBlocks.length > 0}
			<div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-1 max-h-96 overflow-y-auto">
				{#each selectedBlocks as block, index}
					<button
						onclick={() => toggleTimeBlock(index)}
						disabled={!block.available}
						class="p-2 text-xs border rounded transition-all {
							!block.available
								? 'bg-red-900/30 border-red-800 text-red-500 cursor-not-allowed'
								: block.selected
									? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-black'
									: 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800'
						}"
						title="{formatTime(block.time)} - {block.available ? 'Available' : 'Booked'}"
					>
						{formatTime(block.time)}
					</button>
				{/each}
			</div>
		{:else}
			<div class="text-center py-8 text-zinc-400">
				<p>Loading time slots...</p>
				<button
					onclick={() => generateTimeBlocks()}
					class="mt-2 px-4 py-2 bg-[var(--color-primary)] text-black rounded hover:bg-[var(--color-primary)]/90"
				>
					Refresh Time Slots
				</button>
			</div>
		{/if}

		<div class="mt-4 flex items-center gap-4 text-sm">
			<div class="flex items-center gap-2">
				<div class="w-4 h-4 bg-zinc-900 border border-zinc-700 rounded"></div>
				<span class="text-zinc-400">Available</span>
			</div>
			<div class="flex items-center gap-2">
				<div class="w-4 h-4 bg-[var(--color-primary)] rounded"></div>
				<span class="text-zinc-400">Selected</span>
			</div>
			<div class="flex items-center gap-2">
				<div class="w-4 h-4 bg-red-900/30 border border-red-800 rounded"></div>
				<span class="text-zinc-400">Booked</span>
			</div>
		</div>
	</Card>

	<!-- Booking Summary -->
	{#if selectedBlocks.filter(b => b.selected).length > 0}
		{@const selectedCount = selectedBlocks.filter(b => b.selected).length}
		{@const rentalConfig = rentalTypes[selectedRentalType]}
		{@const isWeekend = new Date(selectedDate).getDay() === 0 || new Date(selectedDate).getDay() === 6}
		{@const multiplier = isWeekend ? 1.5 : 1}
		{@const blockRate = rentalConfig.rate_per_block * multiplier}
		{@const subtotal = selectedCount * blockRate}
		{@const totalAmount = subtotal + rentalConfig.setup_fee + rentalConfig.cleanup_fee}

		<Card class="p-6 bg-blue-50 border-blue-200">
			<h3 class="text-lg font-semibold text-blue-900 mb-4">Booking Summary</h3>

			<div class="grid grid-cols-2 gap-4 text-sm mb-4">
				<div>
					<span class="text-blue-700 font-medium">Date:</span>
					<p class="text-blue-900">{new Date(selectedDate).toLocaleDateString()}</p>
				</div>
				<div>
					<span class="text-blue-700 font-medium">Rental Type:</span>
					<p class="text-blue-900">{rentalConfig.name}</p>
				</div>
				<div>
					<span class="text-blue-700 font-medium">Duration:</span>
					<p class="text-blue-900">{Math.floor(selectedCount * 15 / 60)}h {(selectedCount * 15) % 60}m ({selectedCount} blocks)</p>
				</div>
				<div>
					<span class="text-blue-700 font-medium">Rate per Block:</span>
					<p class="text-blue-900">${blockRate.toFixed(2)} {isWeekend ? '(Weekend)' : ''}</p>
				</div>
			</div>

			<div class="border-t border-blue-200 pt-4">
				<div class="flex justify-between items-center text-sm mb-2">
					<span class="text-blue-700">Subtotal ({selectedCount} blocks):</span>
					<span class="text-blue-900">${subtotal.toFixed(2)}</span>
				</div>
				{#if rentalConfig.setup_fee > 0}
					<div class="flex justify-between items-center text-sm mb-2">
						<span class="text-blue-700">Setup Fee:</span>
						<span class="text-blue-900">${rentalConfig.setup_fee.toFixed(2)}</span>
					</div>
				{/if}
				{#if rentalConfig.cleanup_fee > 0}
					<div class="flex justify-between items-center text-sm mb-2">
						<span class="text-blue-700">Cleanup Fee:</span>
						<span class="text-blue-900">${rentalConfig.cleanup_fee.toFixed(2)}</span>
					</div>
				{/if}
				<div class="flex justify-between items-center text-lg font-bold border-t border-blue-200 pt-2">
					<span class="text-blue-900">Total:</span>
					<span class="text-blue-900">${totalAmount.toFixed(2)}</span>
				</div>
			</div>

			{#if selectedCount < rentalConfig.minimum_blocks}
				<div class="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
					<p class="text-yellow-800 text-sm">
						⚠️ Minimum booking is {rentalConfig.minimum_blocks} blocks ({Math.floor(rentalConfig.minimum_blocks * 15 / 60)}h {(rentalConfig.minimum_blocks * 15) % 60}m).
						Please select {rentalConfig.minimum_blocks - selectedCount} more blocks.
					</p>
				</div>
			{/if}
		</Card>
	{/if}
</div>

<style>
	:global(.schedule-x-calendar) {
		height: 400px;
	}
</style>
