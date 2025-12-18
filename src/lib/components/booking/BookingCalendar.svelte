<script lang="ts">
	import { onMount } from 'svelte';
	import { createCalendar, createViewWeek, createViewMonthGrid } from '@schedule-x/calendar';
	import '@schedule-x/theme-default/dist/index.css';
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import Clock from 'lucide-svelte/icons/clock';
	import Button from '../ui/Button.svelte';
	import Card from '../ui/Card.svelte';

	type BookingSlot = {
		id: string;
		title: string;
		start: string;
		end: string;
		available: boolean;
		service: string;
		duration: number;
		price?: string;
	};

	let { onBookingSelect }: { onBookingSelect?: (slot: BookingSlot) => void } = $props();

	let calendarElement: HTMLElement;
	let calendar: ReturnType<typeof createCalendar> | null = null;
	let selectedSlot = $state<BookingSlot | null>(null);
	let slots = $state<BookingSlot[]>([]);

	const today = new Date();
	const pad = (n: number) => n.toString().padStart(2, '0');
	const toDateString = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

	function addDays(base: Date, days: number) {
		const d = new Date(base);
		d.setDate(d.getDate() + days);
		return d;
	}

	function buildSlots() {
		const day0 = toDateString(today);
		const day1 = toDateString(addDays(today, 1));
		const day2 = toDateString(addDays(today, 2));

		slots = [
			{ id: 'slot-1', title: 'Consultation', start: `${day0} 10:00`, end: `${day0} 10:30`, available: true, service: 'consultation', duration: 30, price: 'Free' },
			{ id: 'slot-2', title: 'Strategy Session', start: `${day0} 14:00`, end: `${day0} 15:00`, available: true, service: 'strategy', duration: 60, price: '$150' },
			{ id: 'slot-3', title: 'Production Planning', start: `${day1} 11:00`, end: `${day1} 12:30`, available: true, service: 'production', duration: 90, price: '$200' },
			{ id: 'slot-4', title: 'Booked - Client Meeting', start: `${day1} 16:00`, end: `${day1} 17:00`, available: false, service: 'consultation', duration: 60 },
			{ id: 'slot-5', title: 'Project Review', start: `${day2} 09:30`, end: `${day2} 10:15`, available: true, service: 'review', duration: 45, price: '$100' }
		];
	}

	function toEvents() {
		return slots.map((slot) => ({
			id: slot.id,
			title: slot.title,
			start: slot.start,
			end: slot.end,
			calendarId: slot.available ? 'available' : 'booked'
		}));
	}

	onMount(() => {
		buildSlots();
		const initialDate = toDateString(today);

		calendar = createCalendar({
			selectedDate: initialDate,
			views: [createViewWeek(), createViewMonthGrid()],
			defaultView: 'week',
			events: toEvents(),
			calendars: {
				available: {
					colorName: 'available',
					lightColors: { main: '#22c55e', container: '#dcfce7', onContainer: '#166534' }
				},
				booked: {
					colorName: 'booked',
					lightColors: { main: '#9ca3af', container: '#f3f4f6', onContainer: '#374151' }
				}
			},
			callbacks: {
				onEventClick: (calendarEvent) => {
					const slot = slots.find((s) => s.id === calendarEvent.id);
					if (slot && slot.available) {
						selectedSlot = slot;
						onBookingSelect?.(slot);
					}
				}
			}
		});

		if (calendarElement) {
			calendar.render(calendarElement);
		}

		return () => {
			calendar?.destroy();
		};
	});
</script>

<div class="grid gap-6 lg:grid-cols-[2fr,1fr] items-start">
	<Card class="h-full">
		<div class="mb-4 flex items-center gap-3">
			<CalendarIcon class="text-blue-600" size={22} />
			<div>
				<h3 class="text-lg font-semibold text-gray-900">Pick a time</h3>
				<p class="text-sm text-gray-600">All times are shown in your local timezone.</p>
			</div>
		</div>
		<div bind:this={calendarElement} class="calendar-container"></div>
	</Card>

	<Card class="h-full">
		<h3 class="text-lg font-semibold text-gray-900 mb-3">Selected slot</h3>
		{#if selectedSlot}
			<div class="space-y-2 text-sm text-gray-700">
				<div class="flex items-center gap-2">
					<Clock size={16} class="text-blue-600" />
					<span>
						{new Date(selectedSlot.start).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}
					</span>
				</div>
				<div>Service: <span class="font-medium">{selectedSlot.service}</span></div>
				<div>Duration: {selectedSlot.duration} min</div>
				{#if selectedSlot.price}<div>Price: {selectedSlot.price}</div>{/if}
				<Button class="w-full mt-2" onclick={() => onBookingSelect?.(selectedSlot)}>Continue</Button>
			</div>
		{:else}
			<p class="text-sm text-gray-600">Select any green slot to continue.</p>
		{/if}

		<div class="mt-4 space-y-2 text-xs text-gray-500">
			<div class="flex items-center gap-2">
				<span class="inline-block h-3 w-3 rounded bg-[#22c55e]"></span>
				<span>Available</span>
			</div>
			<div class="flex items-center gap-2">
				<span class="inline-block h-3 w-3 rounded bg-[#9ca3af]"></span>
				<span>Booked/Unavailable</span>
			</div>
		</div>
	</Card>
</div>

<style>
	:global(.calendar-container .sx__calendar) {
		min-height: 540px;
	}
</style>
