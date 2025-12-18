<script lang="ts">
	import User from 'lucide-svelte/icons/user';
	import Mail from 'lucide-svelte/icons/mail';
	import Phone from 'lucide-svelte/icons/phone';
	import Building from 'lucide-svelte/icons/building';
	import Camera from 'lucide-svelte/icons/camera';
	import Users from 'lucide-svelte/icons/users';
	import MessageSquare from 'lucide-svelte/icons/message-square';
	import Button from '../ui/Button.svelte';
	import Card from '../ui/Card.svelte';
	import Loading from '../ui/Loading.svelte';

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

	interface StudioBookingData {
		client_name: string;
		client_email: string;
		client_phone: string;
		client_company?: string;
		purpose: string;
		equipment_needed?: string;
		guest_count: number;
		special_requirements?: string;
	}

	let {
		selectedSlot,
		onSubmit,
		onCancel
	}: {
		selectedSlot?: SelectedSlot;
		onSubmit?: (data: StudioBookingData) => void;
		onCancel?: () => void;
	} = $props();

	let formData = $state<StudioBookingData>({
		client_name: '',
		client_email: '',
		client_phone: '',
		client_company: '',
		purpose: '',
		equipment_needed: '',
		guest_count: 1,
		special_requirements: ''
	});

	let isSubmitting = $state(false);
	let errors = $state<Record<string, string>>({});

	const purposeOptions = [
		'Portrait Photography',
		'Product Photography',
		'Fashion Shoot',
		'Corporate Headshots',
		'Content Creation',
		'Video Production',
		'Art Photography',
		'Event Photography',
		'Other'
	];

	const equipmentOptions = [
		'Professional Lighting Kit',
		'Backdrop System',
		'Props and Accessories',
		'Video Equipment',
		'Audio Recording',
		'Makeup Station',
		'Wardrobe Rack',
		'Reflectors and Diffusers'
	];

	function validateForm(): boolean {
		errors = {};

		if (!formData.client_name.trim()) {
			errors.client_name = 'Name is required';
		}

		if (!formData.client_email.trim()) {
			errors.client_email = 'Email is required';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.client_email)) {
			errors.client_email = 'Please enter a valid email';
		}

		if (!formData.client_phone.trim()) {
			errors.client_phone = 'Phone number is required';
		}

		if (!formData.purpose) {
			errors.purpose = 'Please select the purpose of your rental';
		}

		if (formData.guest_count < 1 || formData.guest_count > 20) {
			errors.guest_count = 'Guest count must be between 1 and 20';
		}

		return Object.keys(errors).length === 0;
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		
		if (!validateForm()) return;

		isSubmitting = true;
		
		try {
			// Prepare studio rental data
			const rentalData = {
				...formData,
				rental_date: selectedSlot?.date,
				start_time: selectedSlot?.start_time,
				end_time: selectedSlot?.end_time,
				duration_minutes: selectedSlot?.duration_minutes,
				total_blocks: selectedSlot?.total_blocks,
				rental_type: selectedSlot?.rental_type,
				rate_per_block: selectedSlot?.rate_per_block,
				total_amount: selectedSlot?.total_amount,
				setup_fee: selectedSlot?.setup_fee,
				cleanup_fee: selectedSlot?.cleanup_fee,
				event_type: formData.purpose // Map purpose to event_type
			};

			// Submit to API
			const response = await fetch('/api/studio/rentals', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(rentalData)
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || 'Failed to submit studio rental');
			}

			// Success - call parent callback
			onSubmit?.(formData);
		} catch (error) {
			console.error('Studio rental submission error:', error);
			alert('Failed to submit studio rental. Please try again or contact us directly.');
		} finally {
			isSubmitting = false;
		}
	}

	function formatDateTime(date: string, time: string): string {
		const dateTime = new Date(`${date}T${time}`);
		return dateTime.toLocaleDateString('en-US', {
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
	<div class="p-6">
		<h2 class="text-2xl font-bold text-gray-900 mb-6">Studio Rental Booking</h2>

		<!-- Booking Summary -->
		{#if selectedSlot}
			<div class="bg-blue-50 rounded-lg p-4 mb-6">
				<h3 class="font-semibold text-blue-900 mb-2">Rental Details</h3>
				<div class="grid grid-cols-2 gap-4 text-sm">
					<div>
						<span class="text-blue-700">Date & Time:</span>
						<p class="text-blue-900">{formatDateTime(selectedSlot.date, selectedSlot.start_time)}</p>
					</div>
					<div>
						<span class="text-blue-700">Duration:</span>
						<p class="text-blue-900">{Math.floor(selectedSlot.duration_minutes / 60)}h {selectedSlot.duration_minutes % 60}m ({selectedSlot.total_blocks} blocks)</p>
					</div>
					<div>
						<span class="text-blue-700">Package:</span>
						<p class="text-blue-900 capitalize">{selectedSlot.rental_type} Rental</p>
					</div>
					<div>
						<span class="text-blue-700">Total:</span>
						<p class="text-blue-900 font-bold text-lg">${selectedSlot.total_amount}</p>
					</div>
				</div>
			</div>
		{/if}

		<form onsubmit={handleSubmit} class="space-y-6">
			<!-- Personal Information -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2">
						<User size={16} class="inline mr-1" />
						Full Name *
					</label>
					<input
						type="text"
						bind:value={formData.client_name}
						class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						class:border-red-500={errors.client_name}
						placeholder="Your full name"
					/>
					{#if errors.client_name}
						<p class="text-red-500 text-sm mt-1">{errors.client_name}</p>
					{/if}
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2">
						<Mail size={16} class="inline mr-1" />
						Email Address *
					</label>
					<input
						type="email"
						bind:value={formData.client_email}
						class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						class:border-red-500={errors.client_email}
						placeholder="your@email.com"
					/>
					{#if errors.client_email}
						<p class="text-red-500 text-sm mt-1">{errors.client_email}</p>
					{/if}
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2">
						<Phone size={16} class="inline mr-1" />
						Phone Number *
					</label>
					<input
						type="tel"
						bind:value={formData.client_phone}
						class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						class:border-red-500={errors.client_phone}
						placeholder="(555) 123-4567"
					/>
					{#if errors.client_phone}
						<p class="text-red-500 text-sm mt-1">{errors.client_phone}</p>
					{/if}
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2">
						<Building size={16} class="inline mr-1" />
						Company/Organization
					</label>
					<input
						type="text"
						bind:value={formData.client_company}
						class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						placeholder="Your company name"
					/>
				</div>
			</div>

			<!-- Rental Details -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2">
						<Camera size={16} class="inline mr-1" />
						Purpose of Rental *
					</label>
					<select
						bind:value={formData.purpose}
						class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						class:border-red-500={errors.purpose}
					>
						<option value="">Select purpose</option>
						{#each purposeOptions as purpose}
							<option value={purpose}>{purpose}</option>
						{/each}
					</select>
					{#if errors.purpose}
						<p class="text-red-500 text-sm mt-1">{errors.purpose}</p>
					{/if}
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2">
						<Users size={16} class="inline mr-1" />
						Number of People *
					</label>
					<input
						type="number"
						bind:value={formData.guest_count}
						min="1"
						max="20"
						class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						class:border-red-500={errors.guest_count}
					/>
					{#if errors.guest_count}
						<p class="text-red-500 text-sm mt-1">{errors.guest_count}</p>
					{/if}
				</div>
			</div>

			<div>
				<p class="block text-sm font-medium text-gray-700 mb-2">
					Equipment Needed
				</p>
				<div class="grid grid-cols-2 gap-2">
					{#each equipmentOptions as equipment}
						<label class="flex items-center">
							<input
								type="checkbox"
								value={equipment}
								class="mr-2"
								onchange={(e) => {
									const checked = (e.target as HTMLInputElement | null)?.checked;
									if (checked) {
										formData.equipment_needed = formData.equipment_needed 
											? `${formData.equipment_needed}, ${equipment}`
											: equipment;
									} else {
										formData.equipment_needed = formData.equipment_needed
											?.split(', ')
											.filter(item => item !== equipment)
											.join(', ') || '';
									}
								}}
							/>
							<span class="text-sm text-gray-700">{equipment}</span>
						</label>
					{/each}
				</div>
			</div>

			<div>
				<label class="block text-sm font-medium text-gray-700 mb-2">
					<MessageSquare size={16} class="inline mr-1" />
					Special Requirements
				</label>
				<textarea
					bind:value={formData.special_requirements}
					rows="3"
					class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					placeholder="Any special setup requirements, accessibility needs, or other details..."
				></textarea>
			</div>

			<!-- Form Actions -->
			<div class="flex gap-4 pt-4">
				<Button
					type="button"
					variant="outline"
					onclick={onCancel}
					class="flex-1"
				>
					Back to Calendar
				</Button>
				
				<Button
					type="submit"
					variant="primary"
					disabled={isSubmitting}
					class="flex-1"
				>
					{#if isSubmitting}
						<Loading size="sm" class="mr-2" />
						Booking Studio...
					{:else}
						Book Studio - ${selectedSlot?.total_amount || 0}
					{/if}
				</Button>
			</div>
		</form>
	</div>
</Card>
