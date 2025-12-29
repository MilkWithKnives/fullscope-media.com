<script lang="ts">
	import Container from '$lib/components/ui/Container.svelte';
	import BookingCalendar from '$lib/components/booking/BookingCalendar.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Phone from 'lucide-svelte/icons/phone';
	import Mail from 'lucide-svelte/icons/mail';
	import MapPin from 'lucide-svelte/icons/map-pin';

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

	let selectedBooking = $state<SelectedBooking | null>(null);
</script>

<svelte:head>
	<title>Book Appointment - Full Scope Media</title>
	<meta
		name="description"
		content="Schedule a consultation with Full Scope Media. Book your appointment for video production, photography, or digital marketing services."
	/>
</svelte:head>

<section class="py-12 bg-gray-50 min-h-screen">
	<Container>
		<div class="max-w-3xl mx-auto text-center mb-12 space-y-4">
			<h1 class="text-3xl md:text-4xl font-bold text-gray-900">Book Your Appointment</h1>
			<p class="text-lg text-gray-600">
				Pick any available slot to get started. All times are in your local timezone. After selecting a slot,
				we’ll reach out to confirm details.
			</p>
		</div>

		<div class="space-y-10">
			<BookingCalendar onBookingSelect={(booking) => (selectedBooking = booking)} />

			{#if selectedBooking}
				<Card class="max-w-3xl mx-auto text-center">
					<h3 class="text-xl font-semibold text-gray-900 mb-2">Selected</h3>
					<p class="text-gray-700">
						{new Date(selectedBooking.start).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })} •
						{selectedBooking.service} • {selectedBooking.duration} min {selectedBooking.price ? `• ${selectedBooking.price}` : ''}
					</p>
					<p class="text-sm text-gray-500 mt-2">We’ll confirm the booking details right after.</p>
				</Card>
			{/if}

			<Card class="max-w-4xl mx-auto">
				<div class="text-center">
					<h3 class="text-lg font-semibold text-gray-900 mb-4">Need help or have questions?</h3>
					<div
						class="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-gray-600"
					>
						<div class="flex items-center space-x-2">
							<Phone size={16} class="text-blue-600" />
							<span>(555) 123-4567</span>
						</div>
						<div class="flex items-center space-x-2">
							<Mail size={16} class="text-blue-600" />
							<span>hello@fullscopemedia.com</span>
						</div>
						<div class="flex items-center space-x-2">
							<MapPin size={16} class="text-blue-600" />
							<span>Available Nationwide</span>
						</div>
					</div>
				</div>
			</Card>
		</div>
	</Container>
</section>
