<script lang="ts">
	import SimpleStudioCalendar from '$lib/components/studio/SimpleStudioCalendar.svelte';

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

	let selectedBooking = $state<SelectedBooking | null>(null);

	function handleBookingSelect(booking: SelectedBooking) {
		console.log('Booking selected:', booking);
		selectedBooking = booking;
	}
</script>

<svelte:head>
	<title>Test Studio Calendar - Full Scope Media</title>
</svelte:head>

<div class="container mx-auto p-8">
	<h1 class="text-3xl font-bold mb-6">Studio Calendar Test</h1>
	
	<SimpleStudioCalendar onBookingSelect={handleBookingSelect} />
	
	{#if selectedBooking}
		<div class="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
			<h2 class="text-xl font-semibold text-green-900 mb-4">Selected Booking</h2>
			<pre class="text-sm text-green-800">{JSON.stringify(selectedBooking, null, 2)}</pre>
		</div>
	{/if}
</div>
