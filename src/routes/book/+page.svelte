<script lang="ts">
	import Container from '$lib/components/ui/Container.svelte';
	import BookingCalendar from '$lib/components/booking/BookingCalendar.svelte';
	import BookingForm from '$lib/components/booking/BookingForm.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import { Calendar, CheckCircle, ArrowLeft, Phone, Mail, MapPin } from 'lucide-svelte';

	interface BookingSlot {
		id: string;
		title: string;
		start: string;
		end: string;
		available: boolean;
		service: string;
		duration: number;
		price?: string;
	}

	interface BookingData {
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
		company?: string;
		projectType: string;
		message: string;
		preferredDate: string;
		preferredTime: string;
		budget: string;
		hearAboutUs: string;
	}

	let currentStep = $state<'calendar' | 'form' | 'confirmation'>('calendar');
	let selectedSlot = $state<BookingSlot | null>(null);
	let bookingData = $state<BookingData | null>(null);

	function handleSlotSelection(slot: BookingSlot) {
		selectedSlot = slot;
		currentStep = 'form';
	}

	function handleBookingSubmit(data: BookingData) {
		bookingData = data;
		currentStep = 'confirmation';
		
		// Here you would typically send the booking data to your backend
		console.log('Booking submitted:', { slot: selectedSlot, data: bookingData });
	}

	function goBackToCalendar() {
		currentStep = 'calendar';
		selectedSlot = null;
	}

	function startNewBooking() {
		currentStep = 'calendar';
		selectedSlot = null;
		bookingData = null;
	}
</script>

<svelte:head>
	<title>Book Appointment - Full Scope Media</title>
	<meta name="description" content="Schedule a consultation with Full Scope Media. Book your appointment for video production, photography, or digital marketing services." />
</svelte:head>

<section class="py-12 bg-gray-50 min-h-screen">
	<Container>
		<!-- Header -->
		<div class="text-center mb-12">
			<h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
				Book Your Appointment
			</h1>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				Schedule a consultation with our team to discuss your project and explore how we can help bring your vision to life.
			</p>
		</div>

		<!-- Progress Steps -->
		<div class="flex items-center justify-center mb-12">
			<div class="flex items-center space-x-4">
				<div class="flex items-center space-x-2">
					<div class={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
						currentStep === 'calendar' ? 'bg-blue-600 text-white' : 
						currentStep === 'form' || currentStep === 'confirmation' ? 'bg-green-600 text-white' : 
						'bg-gray-300 text-gray-600'
					}`}>
						1
					</div>
					<span class="text-sm font-medium text-gray-700">Select Time</span>
				</div>
				
				<div class="w-8 h-0.5 bg-gray-300"></div>
				
				<div class="flex items-center space-x-2">
					<div class={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
						currentStep === 'form' ? 'bg-blue-600 text-white' : 
						currentStep === 'confirmation' ? 'bg-green-600 text-white' : 
						'bg-gray-300 text-gray-600'
					}`}>
						2
					</div>
					<span class="text-sm font-medium text-gray-700">Your Details</span>
				</div>
				
				<div class="w-8 h-0.5 bg-gray-300"></div>
				
				<div class="flex items-center space-x-2">
					<div class={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
						currentStep === 'confirmation' ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
					}`}>
						3
					</div>
					<span class="text-sm font-medium text-gray-700">Confirmation</span>
				</div>
			</div>
		</div>

		<!-- Step Content -->
		{#if currentStep === 'calendar'}
			<div class="space-y-8">
				<BookingCalendar onBookingSelect={handleSlotSelection} />
				
				<!-- Contact Info -->
				<Card class="max-w-4xl mx-auto">
					<div class="text-center">
						<h3 class="text-lg font-semibold text-gray-900 mb-4">
							Need help or have questions?
						</h3>
						<div class="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-gray-600">
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
		{:else if currentStep === 'form'}
			<div class="space-y-6">
				<div class="flex items-center justify-center mb-6">
					<Button variant="outline" onclick={goBackToCalendar}>
						<ArrowLeft size={16} class="mr-2" />
						Back to Calendar
					</Button>
				</div>
				
				<BookingForm 
					{selectedSlot} 
					onSubmit={handleBookingSubmit}
					onCancel={goBackToCalendar}
				/>
			</div>
		{:else if currentStep === 'confirmation'}
			<div class="max-w-2xl mx-auto text-center">
				<Card>
					<div class="space-y-6">
						<div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
							<CheckCircle size={32} class="text-green-600" />
						</div>
						
						<div>
							<h2 class="text-2xl font-bold text-gray-900 mb-2">
								Booking Confirmed!
							</h2>
							<p class="text-gray-600">
								Thank you for booking with Full Scope Media. We've sent a confirmation email to your inbox.
							</p>
						</div>

						{#if selectedSlot && bookingData}
							<div class="bg-gray-50 rounded-lg p-6 text-left">
								<h3 class="font-semibold text-gray-900 mb-4">Appointment Details</h3>
								<div class="space-y-2 text-sm">
									<div class="flex justify-between">
										<span class="text-gray-600">Date & Time:</span>
										<span class="font-medium">
											{new Date(selectedSlot.start).toLocaleDateString('en-US', {
												weekday: 'long',
												year: 'numeric',
												month: 'long',
												day: 'numeric',
												hour: 'numeric',
												minute: '2-digit',
												hour12: true
											})}
										</span>
									</div>
									<div class="flex justify-between">
										<span class="text-gray-600">Service:</span>
										<span class="font-medium">{selectedSlot.service}</span>
									</div>
									<div class="flex justify-between">
										<span class="text-gray-600">Duration:</span>
										<span class="font-medium">{selectedSlot.duration} minutes</span>
									</div>
									<div class="flex justify-between">
										<span class="text-gray-600">Client:</span>
										<span class="font-medium">{bookingData.firstName} {bookingData.lastName}</span>
									</div>
									<div class="flex justify-between">
										<span class="text-gray-600">Email:</span>
										<span class="font-medium">{bookingData.email}</span>
									</div>
								</div>
							</div>
						{/if}

						<div class="flex flex-col sm:flex-row gap-4">
							<Button variant="outline" onclick={startNewBooking} class="flex-1">
								Book Another Appointment
							</Button>
							<Button variant="primary" class="flex-1">
								<a href="/">Return to Home</a>
							</Button>
						</div>
					</div>
				</Card>
			</div>
		{/if}
	</Container>
</section>
