<script lang="ts">
	import { onMount } from 'svelte';
	import { createCalendar, createViewWeek, createViewMonthGrid } from '@schedule-x/calendar';
	import '@schedule-x/theme-default/dist/index.css';

	let calendarElement: HTMLElement;

	onMount(() => {
		const calendar = createCalendar({
			locale: 'en-US',
			firstDayOfWeek: 7 as any, // Sunday
			defaultView: 'week',
			views: [createViewWeek(), createViewMonthGrid()],
			events: [
				{
					id: '1',
					title: 'Test Event',
					start: '2024-12-11 10:00',
					end: '2024-12-11 11:00',
					calendarId: 'test'
				}
			],
			calendars: {
				test: {
					colorName: 'test',
					lightColors: {
						main: '#3b82f6',
						container: '#dbeafe',
						onContainer: '#1e40af'
					}
				}
			}
		});

		calendar.render(calendarElement);
	});
</script>

<svelte:head>
	<title>Calendar Test - Full Scope Media</title>
</svelte:head>

<div class="container mx-auto p-8 bg-black min-h-screen">
	<h1 class="text-3xl font-bold mb-6 text-white">Schedule-X Calendar Test</h1>
	
	<div class="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
		<div bind:this={calendarElement} class="schedule-x-test-calendar"></div>
	</div>
</div>

<style>
	:global(.schedule-x-test-calendar) {
		height: 600px;
	}
</style>
