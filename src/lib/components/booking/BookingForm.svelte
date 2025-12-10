<script lang="ts">
	import { User, Mail, Phone, MessageSquare, Calendar, Clock, DollarSign } from 'lucide-svelte';
	import Button from '../ui/Button.svelte';
	import Card from '../ui/Card.svelte';
	import Loading from '../ui/Loading.svelte';
	import { cn } from '$lib/utils';

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

	interface SelectedSlot {
		id: string;
		title: string;
		start: string;
		end: string;
		service: string;
		duration: number;
		price?: string;
	}

	let {
		selectedSlot,
		onSubmit,
		onCancel
	}: {
		selectedSlot?: SelectedSlot;
		onSubmit?: (data: BookingData) => void;
		onCancel?: () => void;
	} = $props();

	let formData = $state<BookingData>({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		company: '',
		projectType: '',
		message: '',
		preferredDate: selectedSlot ? selectedSlot.start.split(' ')[0] : '',
		preferredTime: selectedSlot ? selectedSlot.start.split(' ')[1] : '',
		budget: '',
		hearAboutUs: ''
	});

	let isSubmitting = $state(false);
	let errors = $state<Record<string, string>>({});

	const projectTypes = [
		'Video Production',
		'Photography',
		'Digital Marketing',
		'Web Design',
		'Brand Strategy',
		'Social Media Management',
		'Other'
	];

	const budgetRanges = [
		'Under $5,000',
		'$5,000 - $10,000',
		'$10,000 - $25,000',
		'$25,000 - $50,000',
		'$50,000+',
		'Not sure yet'
	];

	const hearAboutOptions = [
		'Google Search',
		'Social Media',
		'Referral',
		'Previous Client',
		'Industry Event',
		'Other'
	];

	function validateForm(): boolean {
		errors = {};
		
		if (!formData.firstName.trim()) errors.firstName = 'First name is required';
		if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
		if (!formData.email.trim()) errors.email = 'Email is required';
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			errors.email = 'Please enter a valid email address';
		}
		if (!formData.phone.trim()) errors.phone = 'Phone number is required';
		if (!formData.projectType) errors.projectType = 'Please select a project type';
		if (!formData.message.trim()) errors.message = 'Please describe your project';

		return Object.keys(errors).length === 0;
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();

		if (!validateForm()) return;

		isSubmitting = true;

		try {
			// Prepare booking data
			const bookingData = {
				client_name: `${formData.firstName} ${formData.lastName}`,
				client_email: formData.email,
				client_phone: formData.phone,
				client_company: formData.company,
				service_type: formData.projectType,
				appointment_date: formData.preferredDate,
				appointment_time: formData.preferredTime,
				duration_minutes: selectedSlot?.duration || 120,
				property_address: formData.company, // Using company field as property address for now
				special_requirements: formData.message,
				budget_range: formData.budget,
				how_heard_about_us: formData.hearAboutUs
			};

			// Submit to API
			const response = await fetch('/api/bookings', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(bookingData)
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || 'Failed to submit booking');
			}

			// Success - call parent callback
			onSubmit?.(formData);
		} catch (error) {
			console.error('Booking submission error:', error);
			// You could show an error message to the user here
			alert('Failed to submit booking. Please try again or contact us directly.');
		} finally {
			isSubmitting = false;
		}
	}

	function formatDateTime(dateTime: string): string {
		const date = new Date(dateTime);
		return date.toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: '2-digit',
			hour12: true
		});
	}
</script>

<Card class="max-w-2xl mx-auto">
	<div class="mb-6">
		<h2 class="text-2xl font-bold text-gray-900 mb-2">Book Your Appointment</h2>
		<p class="text-gray-600">Fill out the form below to confirm your booking with Full Scope Media.</p>
	</div>

	<!-- Selected Appointment Summary -->
	{#if selectedSlot}
		<div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
			<h3 class="font-semibold text-blue-900 mb-2 flex items-center space-x-2">
				<Calendar size={16} />
				<span>Selected Appointment</span>
			</h3>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
				<div class="flex items-center space-x-2">
					<Clock size={14} class="text-blue-600" />
					<span>{formatDateTime(selectedSlot.start)}</span>
				</div>
				<div class="flex items-center space-x-2">
					<User size={14} class="text-blue-600" />
					<span>{selectedSlot.service}</span>
				</div>
				{#if selectedSlot.price}
					<div class="flex items-center space-x-2">
						<DollarSign size={14} class="text-blue-600" />
						<span>{selectedSlot.price}</span>
					</div>
				{/if}
				<div class="flex items-center space-x-2">
					<Clock size={14} class="text-blue-600" />
					<span>{selectedSlot.duration} minutes</span>
				</div>
			</div>
		</div>
	{/if}

	<form onsubmit={handleSubmit} class="space-y-6">
		<!-- Personal Information -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div>
				<label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">
					First Name *
				</label>
				<input
					type="text"
					id="firstName"
					bind:value={formData.firstName}
					class={cn(
						'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
						errors.firstName ? 'border-red-500' : 'border-gray-300'
					)}
					placeholder="John"
				/>
				{#if errors.firstName}
					<p class="text-red-500 text-sm mt-1">{errors.firstName}</p>
				{/if}
			</div>

			<div>
				<label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">
					Last Name *
				</label>
				<input
					type="text"
					id="lastName"
					bind:value={formData.lastName}
					class={cn(
						'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
						errors.lastName ? 'border-red-500' : 'border-gray-300'
					)}
					placeholder="Doe"
				/>
				{#if errors.lastName}
					<p class="text-red-500 text-sm mt-1">{errors.lastName}</p>
				{/if}
			</div>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div>
				<label for="email" class="block text-sm font-medium text-gray-700 mb-1">
					Email Address *
				</label>
				<input
					type="email"
					id="email"
					bind:value={formData.email}
					class={cn(
						'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
						errors.email ? 'border-red-500' : 'border-gray-300'
					)}
					placeholder="john@example.com"
				/>
				{#if errors.email}
					<p class="text-red-500 text-sm mt-1">{errors.email}</p>
				{/if}
			</div>

			<div>
				<label for="phone" class="block text-sm font-medium text-gray-700 mb-1">
					Phone Number *
				</label>
				<input
					type="tel"
					id="phone"
					bind:value={formData.phone}
					class={cn(
						'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
						errors.phone ? 'border-red-500' : 'border-gray-300'
					)}
					placeholder="(555) 123-4567"
				/>
				{#if errors.phone}
					<p class="text-red-500 text-sm mt-1">{errors.phone}</p>
				{/if}
			</div>
		</div>

		<div>
			<label for="company" class="block text-sm font-medium text-gray-700 mb-1">
				Company (Optional)
			</label>
			<input
				type="text"
				id="company"
				bind:value={formData.company}
				class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
				placeholder="Your Company Name"
			/>
		</div>

		<!-- Project Information -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div>
				<label for="projectType" class="block text-sm font-medium text-gray-700 mb-1">
					Project Type *
				</label>
				<select
					id="projectType"
					bind:value={formData.projectType}
					class={cn(
						'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
						errors.projectType ? 'border-red-500' : 'border-gray-300'
					)}
				>
					<option value="">Select a project type</option>
					{#each projectTypes as type}
						<option value={type}>{type}</option>
					{/each}
				</select>
				{#if errors.projectType}
					<p class="text-red-500 text-sm mt-1">{errors.projectType}</p>
				{/if}
			</div>

			<div>
				<label for="budget" class="block text-sm font-medium text-gray-700 mb-1">
					Budget Range
				</label>
				<select
					id="budget"
					bind:value={formData.budget}
					class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
				>
					<option value="">Select budget range</option>
					{#each budgetRanges as range}
						<option value={range}>{range}</option>
					{/each}
				</select>
			</div>
		</div>

		<div>
			<label for="message" class="block text-sm font-medium text-gray-700 mb-1">
				Project Description *
			</label>
			<textarea
				id="message"
				bind:value={formData.message}
				rows="4"
				class={cn(
					'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
					errors.message ? 'border-red-500' : 'border-gray-300'
				)}
				placeholder="Tell us about your project, goals, and any specific requirements..."
			></textarea>
			{#if errors.message}
				<p class="text-red-500 text-sm mt-1">{errors.message}</p>
			{/if}
		</div>

		<div>
			<label for="hearAboutUs" class="block text-sm font-medium text-gray-700 mb-1">
				How did you hear about us?
			</label>
			<select
				id="hearAboutUs"
				bind:value={formData.hearAboutUs}
				class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
			>
				<option value="">Select an option</option>
				{#each hearAboutOptions as option}
					<option value={option}>{option}</option>
				{/each}
			</select>
		</div>

		<!-- Form Actions -->
		<div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
			{#if onCancel}
				<Button
					type="button"
					variant="outline"
					class="flex-1"
					onclick={onCancel}
					disabled={isSubmitting}
				>
					Cancel
				</Button>
			{/if}

			<Button
				type="submit"
				variant="primary"
				class="flex-1"
				disabled={isSubmitting}
			>
				{#if isSubmitting}
					<Loading size="sm" class="mr-2" />
					Booking Appointment...
				{:else}
					Confirm Booking
				{/if}
			</Button>
		</div>

		<div class="text-center text-sm text-gray-500">
			<p>
				By booking this appointment, you agree to our
				<a href="/terms" class="text-blue-600 hover:underline">Terms of Service</a>
				and
				<a href="/privacy" class="text-blue-600 hover:underline">Privacy Policy</a>.
			</p>
		</div>
	</form>
</Card>
