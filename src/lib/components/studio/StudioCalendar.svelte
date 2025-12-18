<script lang="ts">
	import { onMount } from 'svelte';
	import Calendar from 'lucide-svelte/icons/calendar';
	import Clock from 'lucide-svelte/icons/clock';
	import DollarSign from 'lucide-svelte/icons/dollar-sign';
	import Users from 'lucide-svelte/icons/users';
	import Camera from 'lucide-svelte/icons/camera';
	import Button from '../ui/Button.svelte';
	import Card from '../ui/Card.svelte';

	interface TimeSlot {
		id: string;
		date: string;
		start_time: string;
		end_time: string;
		is_available: boolean;
		hourly_rate: number;
		daily_rate: number;
	}

	interface SelectedSlot {
		date: string;
		start_time: string;
		end_time: string;
		duration_hours: number;
		total_amount: number;
		rental_type: 'hourly' | 'half-day' | 'daily';
	}

	let {
		onSlotSelect
	}: {
		onSlotSelect?: (slot: SelectedSlot) => void;
	} = $props();

	let currentDate = $state(new Date());
	let selectedDate = $state<string>('');
	let availableSlots = $state<TimeSlot[]>([]);
	let selectedSlot = $state<SelectedSlot | null>(null);
	let loading = $state(false);

	// Generate time slots for a day (9 AM to 9 PM)
	const timeSlots = [
		{ start: '09:00', end: '10:00', label: '9:00 AM - 10:00 AM' },
		{ start: '10:00', end: '11:00', label: '10:00 AM - 11:00 AM' },
		{ start: '11:00', end: '12:00', label: '11:00 AM - 12:00 PM' },
		{ start: '12:00', end: '13:00', label: '12:00 PM - 1:00 PM' },
		{ start: '13:00', end: '14:00', label: '1:00 PM - 2:00 PM' },
		{ start: '14:00', end: '15:00', label: '2:00 PM - 3:00 PM' },
		{ start: '15:00', end: '16:00', label: '3:00 PM - 4:00 PM' },
		{ start: '16:00', end: '17:00', label: '4:00 PM - 5:00 PM' },
		{ start: '17:00', end: '18:00', label: '5:00 PM - 6:00 PM' },
		{ start: '18:00', end: '19:00', label: '6:00 PM - 7:00 PM' },
		{ start: '19:00', end: '20:00', label: '7:00 PM - 8:00 PM' },
		{ start: '20:00', end: '21:00', label: '8:00 PM - 9:00 PM' }
	];

	// Package options
	const packages = [
		{ 
			type: 'hourly' as const, 
			name: 'Hourly Rental', 
			rate: 75, 
			description: 'Perfect for quick shoots',
			minHours: 2,
			icon: Clock
		},
		{ 
			type: 'half-day' as const, 
			name: 'Half Day (4 hours)', 
			rate: 250, 
			description: 'Great for portrait sessions',
			minHours: 4,
			icon: Camera
		},
		{ 
			type: 'daily' as const, 
			name: 'Full Day (8+ hours)', 
			rate: 450, 
			description: 'Best value for long shoots',
			minHours: 8,
			icon: Users
		}
	];

	onMount(() => {
		// Set default selected date to today
		selectedDate = new Date().toISOString().split('T')[0];
		loadAvailableSlots();
	});

	async function loadAvailableSlots() {
		if (!selectedDate) return;
		
		loading = true;
		try {
			const response = await fetch(`/api/studio/availability?date=${selectedDate}`);
			const data = await response.json();
			availableSlots = data.slots || [];
		} catch (error) {
			console.error('Failed to load availability:', error);
		} finally {
			loading = false;
		}
	}

	function selectPackage(pkg: typeof packages[0], startTime: string) {
		const endTime = calculateEndTime(startTime, pkg.minHours);
		const isWeekend = new Date(selectedDate).getDay() === 0 || new Date(selectedDate).getDay() === 6;
		const multiplier = isWeekend ? 1.5 : 1;
		
		selectedSlot = {
			date: selectedDate,
			start_time: startTime,
			end_time: endTime,
			duration_hours: pkg.minHours,
			total_amount: pkg.rate * multiplier,
			rental_type: pkg.type
		};

		onSlotSelect?.(selectedSlot);
	}

	function calculateEndTime(startTime: string, hours: number): string {
		const [startHour, startMinute] = startTime.split(':').map(Number);
		const endHour = startHour + hours;
		return `${endHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`;
	}

	function formatTime(time: string): string {
		const [hour, minute] = time.split(':').map(Number);
		const period = hour >= 12 ? 'PM' : 'AM';
		const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
		return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
	}

	function isSlotAvailable(startTime: string, duration: number): boolean {
		// Check if the time slot is available for the given duration
		const startHour = parseInt(startTime.split(':')[0]);
		const endHour = startHour + duration;
		
		// Check if it's within business hours (9 AM to 9 PM)
		if (startHour < 9 || endHour > 21) return false;
		
		// For now, assume all slots are available (you can add real availability checking here)
		return true;
	}

	$effect(() => {
		if (selectedDate) {
			loadAvailableSlots();
		}
	});
</script>

<div class="space-y-6">
	<!-- Date Picker -->
	<Card class="p-6">
		<div class="flex items-center gap-3 mb-4">
			<Calendar class="text-blue-600" size={24} />
			<h3 class="text-lg font-semibold text-gray-900">Select Date</h3>
		</div>
		
		<input
			type="date"
			bind:value={selectedDate}
			min={new Date().toISOString().split('T')[0]}
			class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
		/>
	</Card>

	<!-- Package Selection -->
	{#if selectedDate}
		<Card class="p-6">
			<h3 class="text-lg font-semibold text-gray-900 mb-4">Choose Your Package</h3>
			
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				{#each packages as pkg}
					<div class="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
						<div class="flex items-center gap-3 mb-3">
							<pkg.icon class="text-blue-600" size={20} />
							<h4 class="font-semibold text-gray-900">{pkg.name}</h4>
						</div>
						
						<p class="text-sm text-gray-600 mb-3">{pkg.description}</p>
						
						<div class="flex items-center justify-between mb-4">
							<span class="text-2xl font-bold text-blue-600">${pkg.rate}</span>
							<span class="text-sm text-gray-500">{pkg.minHours} hours min</span>
						</div>

						<!-- Time Slot Selection -->
						<div class="space-y-2">
							<p class="text-sm font-medium text-gray-700">Available Times:</p>
							<div class="grid grid-cols-2 gap-2">
								{#each timeSlots.slice(0, 6) as slot}
									{#if isSlotAvailable(slot.start, pkg.minHours)}
										<Button
											variant="outline"
											size="sm"
											class="text-xs p-2"
											onclick={() => selectPackage(pkg, slot.start)}
										>
											{formatTime(slot.start)}
										</Button>
									{/if}
								{/each}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</Card>
	{/if}

	<!-- Selected Slot Summary -->
	{#if selectedSlot}
		<Card class="p-6 bg-blue-50 border-blue-200">
			<h3 class="text-lg font-semibold text-blue-900 mb-4">Booking Summary</h3>
			
			<div class="grid grid-cols-2 gap-4 text-sm">
				<div>
					<span class="text-blue-700 font-medium">Date:</span>
					<p class="text-blue-900">{new Date(selectedSlot.date).toLocaleDateString()}</p>
				</div>
				<div>
					<span class="text-blue-700 font-medium">Time:</span>
					<p class="text-blue-900">{formatTime(selectedSlot.start_time)} - {formatTime(selectedSlot.end_time)}</p>
				</div>
				<div>
					<span class="text-blue-700 font-medium">Duration:</span>
					<p class="text-blue-900">{selectedSlot.duration_hours} hours</p>
				</div>
				<div>
					<span class="text-blue-700 font-medium">Total:</span>
					<p class="text-blue-900 text-lg font-bold">${selectedSlot.total_amount}</p>
				</div>
			</div>
		</Card>
	{/if}
</div>
