<script lang="ts">
	import Container from '$lib/components/ui/Container.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import AcuityEmbed from '$lib/components/booking/AcuityEmbed.svelte';
	import Phone from 'lucide-svelte/icons/phone';
	import Mail from 'lucide-svelte/icons/mail';
	import MapPin from 'lucide-svelte/icons/map-pin';
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
				Pick a time that works for you. Our scheduler is synced to our live calendar, and we’ll confirm your booking immediately.
			</p>
		</div>

		<div class="space-y-10">
			<Card class="max-w-4xl mx-auto bg-zinc-900 border-zinc-800 p-0">
				<AcuityEmbed />
			</Card>

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
