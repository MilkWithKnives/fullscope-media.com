<script lang="ts">
	import { onMount } from 'svelte';
	import { createCalendar, createViewWeek, createViewMonthGrid } from '@schedule-x/calendar';
	import { createInteractiveEventModal } from '@sx-premium/interactive-event-modal';
	import { Temporal } from 'temporal-polyfill';
	import '@schedule-x/theme-default/dist/index.css';
	import '@sx-premium/interactive-event-modal/dist/index.css';
	import Container from '$lib/components/ui/Container.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import Star from 'lucide-svelte/icons/star';

	let calendarElement: HTMLDivElement;
	let calendar: any;

	const toZoned = (dateStr: string, time: string) =>
		Temporal.ZonedDateTime.from(`${dateStr}T${time}:00+00:00[UTC]`);

	onMount(() => {
		const today = new Date();
		const bookings = [];

		// Generate sample bookings
		for (let i = 0; i < 5; i++) {
			const date = new Date(today);
			date.setDate(today.getDate() + i);
			const dateStr = date.toISOString().split('T')[0];

			bookings.push({
				id: `consultation-${i}`,
				title: `Free Consultation - Client ${i + 1}`,
				start: toZoned(dateStr, '09:00'),
				end: toZoned(dateStr, '09:30'),
				calendarId: 'consultation',
				description: 'Initial consultation and project planning session.',
				location: 'Full Scope Media Studio',
				people: ['Client', 'Project Manager']
			});
		}

		calendar = createCalendar({
			locale: 'en-US',
			firstDayOfWeek: 0,
			defaultView: 'week',
			views: [createViewWeek(), createViewMonthGrid()],
			plugins: [createInteractiveEventModal()],
			events: bookings,
			calendars: {
				consultation: {
					colorName: 'consultation',
					lightColors: {
						main: '#22c55e',
						container: '#dcfce7',
						onContainer: '#166534'
					}
				}
			}
		});

		if (calendarElement) {
			calendar.render(calendarElement);
		}
	});
</script>

<svelte:head>
	<title>Premium Calendar Demo - Full Scope Media</title>
</svelte:head>

<section class="py-12 bg-gray-50 min-h-screen">
	<Container>
		<div class="max-w-4xl mx-auto">
			<div class="text-center mb-8">
				<div class="flex items-center justify-center gap-2 mb-4">
					<Star class="w-6 h-6 text-yellow-500" />
					<h1 class="text-3xl font-bold text-gray-900">Premium Calendar Demo</h1>
				</div>
				<p class="text-gray-600">Click on any event to see the interactive modal!</p>
			</div>

			<Card>
				<div bind:this={calendarElement} class="calendar-demo"></div>
			</Card>
		</div>
	</Container>
</section>

<style>
	:global(.calendar-demo .sx__calendar) {
		min-height: 500px;
	}
</style>
