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

	const formatBookingDate = (booking: SelectedBooking) => {
		const date = new Date(`${booking.date}T${booking.start_time}`);
		return date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
	};

	const formatTimeRange = (booking: SelectedBooking) => {
		const format = (time: string) => {
			const [h, m] = time.split(':').map(Number);
			const date = new Date();
			date.setHours(h, m, 0, 0);
			return date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
		};
		return `${format(booking.start_time)} – ${format(booking.end_time)}`;
	};

	const formatAmount = (amount: number) => amount === 0 ? 'Free' : `$${amount.toFixed(2)}`;

	const buildMailto = (booking: SelectedBooking) => {
		const subject = encodeURIComponent(`Booking request: ${booking.service_type} on ${booking.date}`);
		const body = encodeURIComponent(
			[
				`Service: ${booking.service_type}`,
				`Date: ${formatBookingDate(booking)}`,
				`Time: ${formatTimeRange(booking)}`,
				`Duration: ${booking.duration_minutes} minutes`,
				`Total: ${formatAmount(booking.total_amount)}`,
				`Setup fee: ${formatAmount(booking.setup_fee)}`,
				'',
				'Additional details:'
			].join('\n')
		);
		return `mailto:hello@fullscopemedia.com?subject=${subject}&body=${body}`;
	};
</script>

<svelte:head>
	<title>Book Appointment - Full Scope Media</title>
	<meta
		name="description"
		content="Schedule a consultation with Full Scope Media. Book your appointment for video production, photography, or digital marketing services."
	/>
</svelte:head>

<section class="py-12 bg-black min-h-screen">
	<Container>
		<div class="max-w-3xl mx-auto text-center mb-12 space-y-4">
			<h1 class="text-3xl md:text-4xl font-bold text-white">Book Your Appointment</h1>
			<p class="text-lg text-zinc-400">
				Pick any available slot to get started. All times are in your local timezone. After selecting a slot,
				we’ll reach out to confirm details.
			</p>
		</div>

		<div class="space-y-10">
			<BookingCalendar onBookingSelect={(booking) => (selectedBooking = booking)} />

			{#if selectedBooking}
				<Card class="max-w-3xl mx-auto text-center bg-zinc-900 border-zinc-800">
					<h3 class="text-xl font-semibold text-white mb-2">Selected slot</h3>
					<p class="text-zinc-300 space-y-1">
						<span class="block">{formatBookingDate(selectedBooking)}</span>
						<span class="block">{formatTimeRange(selectedBooking)}</span>
						<span class="block capitalize">{selectedBooking.service_type.replace('_', ' ')}</span>
						<span class="block">Duration: {selectedBooking.duration_minutes} minutes</span>
						<span class="block font-semibold">Total: {formatAmount(selectedBooking.total_amount)}</span>
					</p>
					<p class="text-sm text-zinc-500 mt-3">Send us the details to lock in your time.</p>
					<div class="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
						<a
							class="w-full sm:w-auto inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-[var(--color-primary)] text-black hover:bg-[var(--color-primary)]/90 focus:ring-[var(--color-primary)] px-4 py-2"
							href={buildMailto(selectedBooking)}
						>
							Confirm via email
						</a>
						<a
							class="w-full sm:w-auto inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-zinc-900 text-white hover:bg-zinc-800 border border-zinc-800 focus:ring-zinc-700 px-4 py-2"
							href="tel:+15551234567"
						>
							Call to confirm
						</a>
					</div>
				</Card>
			{/if}

			<Card class="max-w-4xl mx-auto bg-zinc-900 border-zinc-800">
				<div class="text-center">
					<h3 class="text-lg font-semibold text-white mb-4">Need help or have questions?</h3>
					<div
						class="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-zinc-400"
					>
						<div class="flex items-center space-x-2">
							<Phone size={16} class="text-[var(--color-primary)]" />
							<span>(555) 123-4567</span>
						</div>
						<div class="flex items-center space-x-2">
							<Mail size={16} class="text-[var(--color-primary)]" />
							<span>hello@fullscopemedia.com</span>
						</div>
						<div class="flex items-center space-x-2">
							<MapPin size={16} class="text-[var(--color-primary)]" />
							<span>Available Nationwide</span>
						</div>
					</div>
				</div>
			</Card>
		</div>
	</Container>
</section>
