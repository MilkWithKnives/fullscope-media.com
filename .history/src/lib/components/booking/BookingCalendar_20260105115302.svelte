<script lang="ts">
	import { onMount } from 'svelte';
	import { createCalendar, createViewWeek, createViewMonthGrid } from '@schedule-x/calendar';
	import { createInteractiveEventModal } from '@sx-premium/interactive-event-modal';
	import { Temporal } from 'temporal-polyfill';
	import '@schedule-x/theme-default/dist/index.css';
	import '@sx-premium/interactive-event-modal/index.css';
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import Clock from 'lucide-svelte/icons/clock';
	import Users from 'lucide-svelte/icons/users';
	import DollarSign from 'lucide-svelte/icons/dollar-sign';
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
		service_type: string;
		rate_per_block: number;
		total_amount: number;
		setup_fee: number;
	}

	interface ExistingBooking {
		id?: string;
		title?: string;
		booking_type?: string;
		rental_date: string;
		start_time?: string;
		end_time?: string;
	}

	type BookingSlot = SelectedBooking;

	let { onBookingSelect }: { onBookingSelect?: (slot: BookingSlot) => void } = $props();

	let selectedDate = $state(new Date().toISOString().split('T')[0]);
	let selectedBlocks = $state<TimeBlock[]>([]);
	let selectedServiceType = $state<ServiceKey>('consultation');
	let existingBookings = $state<ExistingBooking[]>([]);
	let calendar: any = $state(null);
	let calendarElement: HTMLDivElement;
	let selectedBooking = $state<SelectedBooking | null>(null);
	let isDragging = $state(false);
	let dragStartIndex: number | null = null;
	const backgroundEvents = [
		{
			title: 'Out of office',
			start: Temporal.PlainDate.from(new Date().toISOString().split('T')[0]),
			end: Temporal.PlainDate.from(new Date().toISOString().split('T')[0]),
			style: {
				backgroundImage:
					'repeating-linear-gradient(45deg, #e5e7eb, #e5e7eb 5px, transparent 5px, transparent 10px)',
				opacity: 0.4
			}
		},
		{
			title: 'Holiday',
			start: Temporal.PlainDate.from(
				new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
			),
			end: Temporal.PlainDate.from(
				new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
			),
			style: {
				backgroundImage:
					'repeating-linear-gradient(45deg, #bfdbfe, #bfdbfe 5px, transparent 5px, transparent 10px)',
				opacity: 0.35
			}
		}
	];

	function toZonedDateTime(date: string, time: string) {
		return Temporal.ZonedDateTime.from(`${date}T${time}:00+00:00[UTC]`);
	}

	// Service types with 15-minute block pricing
	const serviceTypes = {
		consultation: {
			name: 'Free Consultation',
			description: 'Initial consultation and project planning',
			rate_per_block: 0, // Free
			minimum_blocks: 2, // 30 minutes minimum
			setup_fee: 0,
			color: '#22c55e'
		},
		strategy_session: {
			name: 'Strategy Session',
			description: 'Detailed planning and strategy development',
			rate_per_block: 6.25, // $25/hour ($150/60min = $2.50/min = $37.50/15min, but let\'s use $25/hour = $6.25/15min)
			minimum_blocks: 4, // 1 hour minimum
			setup_fee: 0,
			color: '#3b82f6'
		},
		production_meeting: {
			name: 'Production Planning',
			description: 'Pre-production meeting and planning',
			rate_per_block: 8.33, // ~$33/hour
			minimum_blocks: 6, // 1.5 hours minimum
			setup_fee: 0,
			color: '#8b5cf6'
		},
		studio_rental: {
			name: 'Studio Rental',
			description: 'Full studio rental with equipment',
			rate_per_block: 18.75, // $75/hour
			minimum_blocks: 8, // 2 hours minimum
			setup_fee: 25.00,
			color: '#f59e0b'
		},
		photography_session: {
			name: 'Photography Session',
			description: 'Professional photography session',
			rate_per_block: 25.00, // $100/hour
			minimum_blocks: 4, // 1 hour minimum
			setup_fee: 0,
			color: '#ef4444'
		},
		video_production: {
			name: 'Video Production',
			description: 'Full video production session',
			rate_per_block: 37.50, // $150/hour
			minimum_blocks: 8, // 2 hours minimum
			setup_fee: 50.00,
			color: '#06b6d4'
		}
	};

	type ServiceKey = keyof typeof serviceTypes;

	const serviceEntries = $derived(Object.entries(serviceTypes) as [ServiceKey, (typeof serviceTypes)[ServiceKey]][]);

	// Initialize with some blocks immediately
	function initializeBlocks() {
		const blocks: TimeBlock[] = [];
		for (let hour = 8; hour < 18; hour++) { // Business hours 8 AM to 6 PM
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

	selectedBlocks = initializeBlocks();

	onMount(async () => {
		console.log('BookingCalendar mounted');
		await loadExistingBookings();
		initializeScheduleX();
		generateTimeBlocks();
	});

	async function loadExistingBookings() {
		try {
			// Mock existing bookings - replace with real API call
			const today = new Date();
			const tomorrow = new Date(today);
			tomorrow.setDate(tomorrow.getDate() + 1);
			const dayAfter = new Date(today);
			dayAfter.setDate(dayAfter.getDate() + 2);

			existingBookings = [
				{
					id: 'demo-1',
					rental_date: today.toISOString().split('T')[0],
					start_time: '14:00',
					end_time: '15:00',
					booking_type: 'consultation',
					title: 'Free Consultation - John Smith'
				},
				{
					id: 'demo-2',
					rental_date: tomorrow.toISOString().split('T')[0],
					start_time: '10:00',
					end_time: '12:00',
					booking_type: 'photography_session',
					title: 'Photography Session - ABC Corp'
				},
				{
					id: 'demo-3',
					rental_date: dayAfter.toISOString().split('T')[0],
					start_time: '13:00',
					end_time: '17:00',
					booking_type: 'video_production',
					title: 'Video Production - Marketing Campaign'
				}
			];
		} catch (error) {
			console.error('Failed to load existing bookings:', error);
			existingBookings = [];
		}
	}

	function initializeScheduleX() {
		if (!calendarElement) {
			console.warn('Calendar element not ready');
			return;
		}

		try {
			calendar = createCalendar({
				locale: 'en-US',
				firstDayOfWeek: WeekDay.SUNDAY as WeekDayValue,
				defaultView: 'week',
				views: [createViewWeek(), createViewMonthGrid()],
				plugins: [
					createInteractiveEventModal()
				],
				backgroundEvents,
				events: existingBookings.map((booking) => {
					const startTime = booking.start_time ?? '00:00';
					const endTime = booking.end_time ?? startTime;
					const serviceType = serviceTypes[booking.booking_type as ServiceKey];

					return {
						id: booking.id || `booking-${Math.random()}`,
						title: booking.title || 'Booking',
						start: toZonedDateTime(booking.rental_date, startTime),
						end: toZonedDateTime(booking.rental_date, endTime),
						calendarId: booking.booking_type || 'default',
						// Premium modal fields
						description: serviceType?.description || 'Professional service booking',
						location: 'Full Scope Media Studio',
						people: ['Client', 'Full Scope Media Team'],
						_customFields: {
							serviceType: serviceType?.name || 'Service',
							rate: serviceType ? `$${serviceType.rate_per_block * 4}/hour` : 'Contact for pricing',
							duration: `${Math.round((new Date(`1970-01-01T${endTime}:00`).getTime() - new Date(`1970-01-01T${startTime}:00`).getTime()) / (1000 * 60))} minutes`,
							status: 'Confirmed'
						}
					};
				}),
				calendars: {
					consultation: {
						colorName: 'consultation',
						lightColors: {
							main: '#22c55e',
							container: '#dcfce7',
							onContainer: '#166534'
						}
					},
					strategy_session: {
						colorName: 'strategy',
						lightColors: {
							main: '#3b82f6',
							container: '#dbeafe',
							onContainer: '#1e40af'
						}
					},
					studio_rental: {
						colorName: 'studio',
						lightColors: {
							main: '#f59e0b',
							container: '#fef3c7',
							onContainer: '#92400e'
						}
					}
				},
				callbacks: {
					onClickDate: (date: Temporal.PlainDate) => {
						const clickedDate = date.toString();
						selectedDate = clickedDate;
						generateTimeBlocks();
					},
					onEventClick: (calendarEvent) => {
						console.log('Event clicked:', calendarEvent);
						// Premium modal will automatically open
					},
					onEventUpdate: (calendarEvent) => {
						console.log('Event updated:', calendarEvent);
						// Handle booking updates here
						// TODO: Update backend with changes
					},
					onEventDelete: (eventId) => {
						console.log('Event deleted:', eventId);
						// Handle booking deletion here
						// TODO: Delete from backend
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

		// Generate 15-minute blocks during business hours
		for (let hour = 8; hour < 18; hour++) {
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
		selectedBlocks = [...selectedBlocks];
	}

	function toggleTimeBlock(blockIndex: number) {
		if (isDragging) return;
		const block = selectedBlocks[blockIndex];
		if (!block.available) return;

		selectedBlocks[blockIndex].selected = !selectedBlocks[blockIndex].selected;
		selectedBlocks = [...selectedBlocks];

		updateBookingSelection();
	}

	function updateBookingSelection() {
		const selected = selectedBlocks.filter(block => block.selected);
		if (selected.length === 0) {
			selectedBooking = null;
			onBookingSelect?.(null as any);
			return;
		}

		// Sort selected blocks by time
		selected.sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));

		const startTime = selected[0].time;
		const endTimeMinutes = timeToMinutes(selected[selected.length - 1].time) + 15;
		const endHours = Math.floor(endTimeMinutes / 60);
		const endMins = endTimeMinutes % 60;
		const endTime = `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;

		const service = serviceTypes[selectedServiceType];
		const totalBlocks = selected.length;
		const durationMinutes = totalBlocks * 15;
		const subtotal = totalBlocks * service.rate_per_block;
		const setupFee = service.setup_fee;
		const totalAmount = subtotal + setupFee;

		const booking: SelectedBooking = {
			date: selectedDate,
			start_time: startTime,
			end_time: endTime,
			total_blocks: totalBlocks,
			duration_minutes: durationMinutes,
			service_type: selectedServiceType,
			rate_per_block: service.rate_per_block,
			total_amount: totalAmount,
			setup_fee: setupFee
		};

		selectedBooking = booking;
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

	// Reactive statement to regenerate blocks when date or service type changes
	$effect(() => {
		if (selectedDate || selectedServiceType) {
			generateTimeBlocks();
		}
	});

	function startDrag(index: number) {
		if (!selectedBlocks[index]?.available) return;
		isDragging = true;
		dragStartIndex = index;
		selectRange(index, index);
	}

	function dragEnter(index: number) {
		if (!isDragging || dragStartIndex === null) return;
		selectRange(dragStartIndex, index);
	}

	function endDrag() {
		if (!isDragging) return;
		isDragging = false;
		dragStartIndex = null;
	}

	function selectRange(start: number, end: number) {
		const [from, to] = start <= end ? [start, end] : [end, start];
		selectedBlocks = selectedBlocks.map((block, i) => {
			if (!block.available) return { ...block, selected: false };
			if (i >= from && i <= to) return { ...block, selected: true };
			return { ...block, selected: false };
		});
		updateBookingSelection();
	}
</script>

<svelte:window on:mouseup={endDrag} />

<div class="space-y-6">
	<!-- Service Type Selection -->
	<Card class="bg-zinc-900 border-zinc-800">
		<div class="flex items-center gap-3 mb-4">
			<Users class="w-5 h-5 text-[var(--color-primary)]" />
			<h3 class="text-lg font-semibold text-white">Select Service Type</h3>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each serviceEntries as [key, service]}
					<button
						on:click={() => selectedServiceType = key}
					class="p-4 border-2 rounded-lg transition-all text-left {selectedServiceType === key
						? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
						: 'border-zinc-800 hover:border-zinc-700'}"
				>
					<div class="flex items-center gap-2 mb-2">
						<div class="w-4 h-4 rounded-full" style="background-color: {service.color}"></div>
						<h4 class="font-semibold text-white">{service.name}</h4>
					</div>
					<p class="text-sm text-zinc-400 mb-2">{service.description}</p>
					<div class="text-sm">
						{#if service.rate_per_block === 0}
							<p class="font-medium text-green-400">Free</p>
						{:else}
							<p class="font-medium text-[var(--color-primary)]">${service.rate_per_block}/15min</p>
						{/if}
						<p class="text-zinc-500">Min: {formatDuration(service.minimum_blocks * 15)}</p>
						{#if service.setup_fee > 0}
							<p class="text-zinc-500">Setup: ${service.setup_fee}</p>
						{/if}
					</div>
				</button>
			{/each}
		</div>
	</Card>

	<div class="grid gap-6 lg:grid-cols-[2fr,1fr] items-start">
		<!-- Schedule-X Calendar -->
		<Card class="h-full bg-zinc-900 border-zinc-800">
			<div class="mb-4 flex items-center gap-3">
				<CalendarIcon class="text-[var(--color-primary)]" size={22} />
				<div>
					<h3 class="text-lg font-semibold text-white">Calendar View</h3>
					<p class="text-sm text-zinc-400">Click on a date to see available time slots</p>
				</div>
			</div>
			<div bind:this={calendarElement} class="calendar-container"></div>
		</Card>

		<!-- Date & Time Selection -->
		<div class="space-y-4">
			<!-- Date Selection -->
			<Card class="bg-zinc-900 border-zinc-800">
				<div class="flex items-center gap-3 mb-4">
					<CalendarIcon class="w-5 h-5 text-[var(--color-primary)]" />
					<h3 class="text-lg font-semibold text-white">Select Date</h3>
				</div>
				<input
					type="date"
					bind:value={selectedDate}
					min={new Date().toISOString().split('T')[0]}
					class="w-full px-4 py-2 border border-zinc-700 bg-zinc-800 text-white rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] outline-none"
				/>
			</Card>

			<!-- Selected Booking Summary -->
			{#if selectedBooking}
				{@const service = serviceTypes[selectedServiceType]}
				<Card class="bg-zinc-900 border-zinc-800">
					<div class="flex items-center gap-3 mb-4">
						<DollarSign class="w-5 h-5 text-[var(--color-primary)]" />
						<h3 class="text-lg font-semibold text-white">Selected Booking</h3>
					</div>

					<div class="space-y-3 text-sm">
						<div class="flex justify-between">
							<span class="text-zinc-400">Service:</span>
							<span class="font-medium text-white">{service.name}</span>
						</div>
						<div class="flex justify-between">
							<span class="text-zinc-400">Date:</span>
							<span class="font-medium text-white">{new Date(selectedDate).toLocaleDateString()}</span>
						</div>
						<div class="flex justify-between">
							<span class="text-zinc-400">Time:</span>
							<span class="font-medium text-white">{formatTime(selectedBooking.start_time)} - {formatTime(selectedBooking.end_time)}</span>
						</div>
						<div class="flex justify-between">
							<span class="text-zinc-400">Duration:</span>
							<span class="font-medium text-white">{formatDuration(selectedBooking.duration_minutes)}</span>
						</div>
						{#if selectedBooking.total_amount > 0}
							<div class="border-t border-zinc-800 pt-3">
								<div class="flex justify-between text-lg font-semibold">
									<span class="text-white">Total:</span>
									<span class="text-white">${selectedBooking.total_amount.toFixed(2)}</span>
								</div>
							</div>
						{:else}
							<div class="border-t border-zinc-800 pt-3">
								<div class="text-center text-lg font-semibold text-green-400">
									Free Consultation
								</div>
							</div>
						{/if}
					</div>

					{#if selectedBooking.total_blocks < service.minimum_blocks}
						<div class="mt-4 p-3 bg-yellow-900/20 border border-yellow-900/50 rounded-lg">
							<p class="text-yellow-400 text-sm">
								⚠️ Minimum booking is {formatDuration(service.minimum_blocks * 15)}.
								Please select {service.minimum_blocks - selectedBooking.total_blocks} more time blocks.
							</p>
						</div>
					{:else}
						<Button class="w-full mt-4" on:click={() => onBookingSelect?.(selectedBooking!)}>
							Continue with Booking
						</Button>
					{/if}
				</Card>
			{/if}
		</div>
	</div>

	<!-- Time Block Selection -->
	<Card class="bg-zinc-900 border-zinc-800">
		<div class="flex items-center justify-between mb-4">
			<div class="flex items-center gap-3">
				<Clock class="w-5 h-5 text-[var(--color-primary)]" />
				<h3 class="text-lg font-semibold text-white">Available Time Slots</h3>
			</div>
			<div class="text-sm text-zinc-400">
				Selected: {selectedBlocks.filter(b => b.selected).length} blocks
				({formatDuration(selectedBlocks.filter(b => b.selected).length * 15)})
			</div>
		</div>

		{#if selectedBlocks.length > 0}
			<div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-1 max-h-96 overflow-y-auto">
				{#each selectedBlocks as block, index}
					<button
						on:mousedown|preventDefault={() => startDrag(index)}
						on:mouseenter={() => dragEnter(index)}
						on:click|preventDefault={() => toggleTimeBlock(index)}
						class="p-2 text-xs border rounded transition-all {
							!block.available
								? 'bg-red-900/20 border-red-900/50 text-red-400 cursor-not-allowed'
								: block.selected
									? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-black'
									: 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800'
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
				<p>Select a date to see available time slots</p>
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
</div>

<style>
	:global(.calendar-container .sx__calendar) {
		min-height: 540px;
	}
</style>
