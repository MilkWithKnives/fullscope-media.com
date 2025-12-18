<script lang="ts">
	import Camera from 'lucide-svelte/icons/camera';
	import Clock from 'lucide-svelte/icons/clock';
	import Users from 'lucide-svelte/icons/users';
	import Lightbulb from 'lucide-svelte/icons/lightbulb';
	import Palette from 'lucide-svelte/icons/palette';
	import Video from 'lucide-svelte/icons/video';
	import Container from '$lib/components/ui/Container.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import ScheduleXStudioCalendar from '$lib/components/studio/ScheduleXStudioCalendar.svelte';
	import StudioBookingForm from '$lib/components/studio/StudioBookingForm.svelte';

	interface SelectedSlot {
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

	let currentStep = $state<'info' | 'calendar' | 'booking' | 'confirmation'>('info');
	let selectedBooking = $state<SelectedSlot | null>(null);
	let bookingComplete = $state(false);

	const studioFeatures = [
		{
			icon: Camera,
			title: 'Real Estate Photography',
			description: 'Professional real estate photos, virtual tours, and listing photography'
		},
		{
			icon: Users,
			title: 'Portrait Sessions',
			description: 'Professional headshots, LinkedIn photos, passport photos, and personal portraits'
		},
		{
			icon: Lightbulb,
			title: 'Commercial Photography',
			description: 'Business photography, product shots, and commercial imaging services'
		},
		{
			icon: Palette,
			title: 'Artistic Photography',
			description: 'Creative and artistic photography sessions for personal projects'
		},
		{
			icon: Video,
			title: 'Student Special 🎓',
			description: 'MSU, LCC, or grad school students get up to $15 Uber credit home!'
		},
		{
			icon: Clock,
			title: 'One-Stop Shop',
			description: 'Complete photography services from real estate to portraits in one location'
		}
	];

	function handleBookingSelect(booking: SelectedSlot | null) {
		if (!booking) {
			selectedBooking = null;
			return;
		}

		selectedBooking = booking;
		currentStep = 'booking';
	}

	function handleBookingSubmit() {
		bookingComplete = true;
		currentStep = 'confirmation';
	}

	function handleBookingCancel() {
		currentStep = 'calendar';
		selectedBooking = null;
	}

	function startBooking() {
		console.log('Starting booking process...');
		currentStep = 'calendar';
	}

	function resetBooking() {
		currentStep = 'info';
		selectedBooking = null;
		bookingComplete = false;
	}
</script>

<svelte:head>
	<title>Studio Rental - Full Scope Media</title>
	<meta name="description" content="Rent our professional photography studio for your creative projects. Fully equipped with lighting, backdrops, and professional equipment." />
</svelte:head>

<Container class="py-12">
	<div class="max-w-6xl mx-auto">
		
		{#if currentStep === 'info'}
			<!-- Studio Information -->
			<div class="text-center mb-12">
				<h1 class="text-4xl font-bold text-gray-900 mb-4">Professional Photography Studio</h1>
				<p class="text-xl text-gray-600 max-w-3xl mx-auto">
					Your one-stop shop for real estate photography, professional portraits, LinkedIn headshots, passport photos,
					and artistic photography. Students from MSU, LCC, or grad schools get up to $15 Uber credit home!
				</p>
			</div>

			<!-- Hero Image -->
			<div class="relative h-96 rounded-2xl overflow-hidden mb-12">
				<img
					src="/images/studio-hero.jpg"
					alt="Full Scope Media Studio Interior"
					class="w-full h-full object-cover"
					onerror={(e) => {
						const target = e.target as HTMLImageElement;
						if (target) {
							target.src = 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80';
						}
					}}
				/>
				<div class="absolute inset-0 bg-black/30 flex items-center justify-center">
					<div class="text-center text-white">
						<h2 class="text-3xl font-bold mb-4">1,200 sq ft Professional Studio</h2>
						<Button onclick={startBooking} size="lg" class="bg-white text-gray-900 hover:bg-gray-100">
							Book Your Session
						</Button>
					</div>
				</div>
			</div>

			<!-- Features Grid -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
				{#each studioFeatures as feature}
					<Card class="p-6 text-center">
						<div class="flex justify-center mb-4">
							<feature.icon size={48} class="text-blue-600" />
						</div>
						<h3 class="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
						<p class="text-gray-600">{feature.description}</p>
					</Card>
				{/each}
			</div>

			<!-- Pricing Overview -->
			<Card class="p-8 mb-12">
				<h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">Rental Packages</h2>
				
				<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div class="text-center p-6 border border-gray-200 rounded-lg">
						<Clock size={32} class="mx-auto text-blue-600 mb-3" />
						<h3 class="text-lg font-semibold mb-2">Hourly Rental</h3>
						<p class="text-3xl font-bold text-blue-600 mb-2">$75<span class="text-lg text-gray-500">/hr</span></p>
						<p class="text-sm text-gray-600">2 hour minimum</p>
						<p class="text-sm text-gray-600">Perfect for quick shoots</p>
					</div>
					
					<div class="text-center p-6 border-2 border-blue-500 rounded-lg bg-blue-50">
						<Camera size={32} class="mx-auto text-blue-600 mb-3" />
						<h3 class="text-lg font-semibold mb-2">Half Day</h3>
						<p class="text-3xl font-bold text-blue-600 mb-2">$250<span class="text-lg text-gray-500">/4hrs</span></p>
						<p class="text-sm text-gray-600">Most Popular</p>
						<p class="text-sm text-gray-600">Great for portrait sessions</p>
					</div>
					
					<div class="text-center p-6 border border-gray-200 rounded-lg">
						<Users size={32} class="mx-auto text-blue-600 mb-3" />
						<h3 class="text-lg font-semibold mb-2">Full Day</h3>
						<p class="text-3xl font-bold text-blue-600 mb-2">$450<span class="text-lg text-gray-500">/8hrs</span></p>
						<p class="text-sm text-gray-600">Best Value</p>
						<p class="text-sm text-gray-600">Perfect for long shoots</p>
					</div>
				</div>
				
				<div class="text-center mt-6">
					<p class="text-sm text-gray-600 mb-4">*Weekend rates include 50% surcharge</p>
					<Button onclick={startBooking} size="lg">
						Check Availability & Book
					</Button>
				</div>
			</Card>

			<!-- Studio Guidelines -->
			<Card class="p-6">
				<h3 class="text-lg font-semibold text-gray-900 mb-4">Studio Guidelines</h3>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
					<ul class="space-y-2">
						<li>• Arrive 15 minutes early for setup</li>
						<li>• Maximum 20 people in studio</li>
						<li>• All equipment must be handled with care</li>
						<li>• Clean up after your session</li>
					</ul>
					<ul class="space-y-2">
						<li>• No smoking or food in studio</li>
						<li>• 24-hour cancellation policy</li>
						<li>• Studio address provided upon booking</li>
						<li>• Additional equipment available for rent</li>
					</ul>
				</div>
			</Card>

		{:else if currentStep === 'calendar'}
			<!-- Calendar Selection -->
			<div class="mb-6">
				<Button variant="outline" onclick={resetBooking} class="mb-4">
					← Back to Studio Info
				</Button>
				<h1 class="text-3xl font-bold text-gray-900 mb-2">Select Your Time Slot</h1>
				<p class="text-gray-600">Choose your preferred date and rental package</p>
			</div>
			
			<ScheduleXStudioCalendar onBookingSelect={handleBookingSelect} />

		{:else if currentStep === 'booking'}
			<!-- Booking Form -->
			<div class="mb-6">
				<Button variant="outline" onclick={handleBookingCancel} class="mb-4">
					← Back to Calendar
				</Button>
				<h1 class="text-3xl font-bold text-gray-900 mb-2">Complete Your Booking</h1>
				<p class="text-gray-600">Fill in your details to confirm the studio rental</p>
			</div>
			
			<StudioBookingForm
				selectedSlot={selectedBooking || undefined}
				onSubmit={handleBookingSubmit}
				onCancel={handleBookingCancel}
			/>

		{:else if currentStep === 'confirmation'}
			<!-- Confirmation -->
			<Card class="max-w-2xl mx-auto text-center p-8">
				<div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
					<svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
					</svg>
				</div>
				
				<h1 class="text-3xl font-bold text-gray-900 mb-4">Studio Rental Confirmed!</h1>
				<p class="text-gray-600 mb-6">
					Your studio rental has been confirmed. You'll receive a confirmation email with all the details 
					and a calendar invite to add to your schedule.
				</p>
				
				{#if selectedBooking}
					<div class="bg-gray-50 rounded-lg p-6 mb-6">
						<h3 class="font-semibold text-gray-900 mb-2">Booking Summary</h3>
						<p class="text-gray-600">
							{new Date(selectedBooking.date).toLocaleDateString('en-US', {
								weekday: 'long',
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</p>
						<p class="text-gray-600">
							{new Date(`${selectedBooking.date}T${selectedBooking.start_time}`).toLocaleTimeString('en-US', {
								hour: 'numeric',
								minute: '2-digit',
								hour12: true
							})} -
							{new Date(`${selectedBooking.date}T${selectedBooking.end_time}`).toLocaleTimeString('en-US', {
								hour: 'numeric',
								minute: '2-digit',
								hour12: true
							})}
						</p>
						<p class="text-gray-600">
							Duration: {Math.floor(selectedBooking.duration_minutes / 60)}h {selectedBooking.duration_minutes % 60}m ({selectedBooking.total_blocks} blocks)
						</p>
						<p class="text-lg font-bold text-blue-600 mt-2">${selectedBooking.total_amount.toFixed(2)}</p>
					</div>
				{/if}
				
				<div class="space-y-3">
					<Button onclick={resetBooking} variant="primary" size="lg" class="w-full">
						Book Another Session
					</Button>
					<Button onclick={() => window.location.href = '/'} variant="outline" size="lg" class="w-full">
						Return to Home
					</Button>
				</div>
			</Card>
		{/if}
	</div>
</Container>
