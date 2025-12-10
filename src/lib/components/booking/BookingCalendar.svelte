<script lang="ts">
	import { onMount } from 'svelte';
	import { createCalendar } from '@schedule-x/calendar';
	import { createViewWeek, createViewMonthGrid } from '@schedule-x/calendar';
	import '@schedule-x/theme-default/dist/index.css';
	import { Calendar, Clock, User, MapPin, Phone } from 'lucide-svelte';
	import Button from '../ui/Button.svelte';
	import Card from '../ui/Card.svelte';
	import { cn } from '$lib/utils';

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

	interface ServiceType {
		id: string;
		name: string;
		duration: number;
		price: string;
		description: string;
		color: string;
	}

	let {
		selectedDate = new Date().toISOString().split('T')[0],
		selectedService = '',
		onBookingSelect,
		availableSlots = []
	}: {
		selectedDate?: string;
		selectedService?: string;
		onBookingSelect?: (slot: BookingSlot) => void;
		availableSlots?: BookingSlot[];
	} = $props();

	let calendarElement: HTMLElement;
	let calendar: any;
	let selectedSlot = $state<BookingSlot | null>(null);

	const serviceTypes: ServiceType[] = [
		{
			id: 'consultation',
			name: 'Free Consultation',
			duration: 30,
			price: 'Free',
			description: 'Discuss your project needs and get expert advice',
			color: '#3b82f6'
		},
		{
			id: 'strategy',
			name: 'Strategy Session',
			duration: 60,
			price: '$150',
			description: 'Deep dive into your marketing strategy and goals',
			color: '#8b5cf6'
		},
		{
			id: 'production',
			name: 'Production Planning',
			duration: 90,
			price: '$200',
			description: 'Plan your video or photo production in detail',
			color: '#10b981'
		},
		{
			id: 'review',
			name: 'Project Review',
			duration: 45,
			price: '$100',
			description: 'Review and provide feedback on ongoing projects',
			color: '#f59e0b'
		}
	];

	// Sample available slots - in real app, this would come from your backend
	const sampleSlots: BookingSlot[] = [
		{
			id: '1',
			title: 'Available - Free Consultation',
			start: '2024-12-11 09:00',
			end: '2024-12-11 09:30',
			available: true,
			service: 'consultation',
			duration: 30
		},
		{
			id: '2',
			title: 'Available - Strategy Session',
			start: '2024-12-11 10:00',
			end: '2024-12-11 11:00',
			available: true,
			service: 'strategy',
			duration: 60,
			price: '$150'
		},
		{
			id: '3',
			title: 'Available - Production Planning',
			start: '2024-12-11 14:00',
			end: '2024-12-11 15:30',
			available: true,
			service: 'production',
			duration: 90,
			price: '$200'
		},
		{
			id: '4',
			title: 'Booked - Client Meeting',
			start: '2024-12-11 11:00',
			end: '2024-12-11 12:00',
			available: false,
			service: 'consultation',
			duration: 60
		}
	];

	onMount(() => {
		if (calendarElement) {
			calendar = createCalendar({
				selectedDate: selectedDate,
				views: [createViewWeek(), createViewMonthGrid()],
				defaultView: 'week',
				events: sampleSlots.map(slot => ({
					id: slot.id,
					title: slot.title,
					start: slot.start,
					end: slot.end,
					backgroundColor: slot.available 
						? serviceTypes.find(s => s.id === slot.service)?.color || '#3b82f6'
						: '#6b7280',
					borderColor: slot.available 
						? serviceTypes.find(s => s.id === slot.service)?.color || '#3b82f6'
						: '#6b7280',
					textColor: '#ffffff'
				})),
				callbacks: {
					onEventClick: (calendarEvent) => {
						const slot = sampleSlots.find(s => s.id === calendarEvent.id);
						if (slot && slot.available) {
							selectedSlot = slot;
							onBookingSelect?.(slot);
						}
					}
				}
			});

			calendar.render(calendarElement);
		}

		return () => {
			if (calendar) {
				calendar.destroy();
			}
		};
	});

	function selectService(serviceId: string) {
		selectedService = serviceId;
		// Filter calendar events based on selected service
		if (calendar) {
			const filteredSlots = selectedService 
				? sampleSlots.filter(slot => slot.service === selectedService)
				: sampleSlots;
			
			calendar.events.set(filteredSlots.map(slot => ({
				id: slot.id,
				title: slot.title,
				start: slot.start,
				end: slot.end,
				backgroundColor: slot.available 
					? serviceTypes.find(s => s.id === slot.service)?.color || '#3b82f6'
					: '#6b7280',
				borderColor: slot.available 
					? serviceTypes.find(s => s.id === slot.service)?.color || '#3b82f6'
					: '#6b7280',
				textColor: '#ffffff'
			})));
		}
	}

	function bookSlot(slot: BookingSlot) {
		// Handle booking logic here
		console.log('Booking slot:', slot);
		// In real app, this would make an API call to book the slot
	}
</script>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
	<!-- Service Selection -->
	<div class="lg:col-span-1 space-y-6">
		<Card>
			<h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
				<Calendar size={20} class="text-blue-600" />
				<span>Select Service</span>
			</h3>

			<div class="space-y-3">
				<button
					onclick={() => selectService('')}
					class={cn(
						'w-full text-left p-3 rounded-lg border transition-all duration-200',
						selectedService === ''
							? 'border-blue-500 bg-blue-50 text-blue-700'
							: 'border-gray-200 hover:border-gray-300'
					)}
				>
					<div class="font-medium">All Services</div>
					<div class="text-sm text-gray-500">View all available slots</div>
				</button>

				{#each serviceTypes as service}
					<button
						onclick={() => selectService(service.id)}
						class={cn(
							'w-full text-left p-3 rounded-lg border transition-all duration-200',
							selectedService === service.id
								? 'border-blue-500 bg-blue-50 text-blue-700'
								: 'border-gray-200 hover:border-gray-300'
						)}
					>
						<div class="flex items-center justify-between mb-1">
							<div class="font-medium">{service.name}</div>
							<div class="text-sm font-semibold text-green-600">{service.price}</div>
						</div>
						<div class="flex items-center space-x-4 text-sm text-gray-500">
							<span class="flex items-center space-x-1">
								<Clock size={14} />
								<span>{service.duration} min</span>
							</span>
						</div>
						<div class="text-sm text-gray-600 mt-1">{service.description}</div>
					</button>
				{/each}
			</div>
		</Card>

		<!-- Selected Slot Info -->
		{#if selectedSlot}
			<Card>
				<h3 class="text-lg font-semibold text-gray-900 mb-4">Selected Appointment</h3>

				<div class="space-y-3">
					<div class="flex items-center space-x-2">
						<Calendar size={16} class="text-blue-600" />
						<span class="text-sm">
							{new Date(selectedSlot.start).toLocaleDateString('en-US', {
								weekday: 'long',
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</span>
					</div>

					<div class="flex items-center space-x-2">
						<Clock size={16} class="text-blue-600" />
						<span class="text-sm">
							{new Date(selectedSlot.start).toLocaleTimeString('en-US', {
								hour: 'numeric',
								minute: '2-digit',
								hour12: true
							})} -
							{new Date(selectedSlot.end).toLocaleTimeString('en-US', {
								hour: 'numeric',
								minute: '2-digit',
								hour12: true
							})}
						</span>
					</div>

					<div class="flex items-center space-x-2">
						<User size={16} class="text-blue-600" />
						<span class="text-sm">
							{serviceTypes.find(s => s.id === selectedSlot.service)?.name}
						</span>
					</div>

					{#if selectedSlot.price}
						<div class="flex items-center justify-between pt-2 border-t border-gray-200">
							<span class="font-medium">Price:</span>
							<span class="font-semibold text-green-600">{selectedSlot.price}</span>
						</div>
					{/if}
				</div>

				<Button
					variant="primary"
					class="w-full mt-4"
					onclick={() => bookSlot(selectedSlot)}
				>
					Book This Appointment
				</Button>
			</Card>
		{/if}
	</div>

	<!-- Calendar -->
	<div class="lg:col-span-2">
		<Card class="h-full">
			<div class="mb-4">
				<h3 class="text-lg font-semibold text-gray-900 mb-2">Available Times</h3>
				<p class="text-sm text-gray-600">
					Click on any available slot to select it. Green slots are available, gray slots are booked.
				</p>
			</div>

			<div bind:this={calendarElement} class="calendar-container"></div>
		</Card>
	</div>
</div>

<style>
	:global(.calendar-container .sx__calendar) {
		border: none;
		box-shadow: none;
	}

	:global(.calendar-container .sx__calendar-header) {
		background: #f8fafc;
		border-bottom: 1px solid #e2e8f0;
	}

	:global(.calendar-container .sx__event) {
		border-radius: 6px;
		font-size: 12px;
		font-weight: 500;
	}

	:global(.calendar-container .sx__event:hover) {
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}
</style>
