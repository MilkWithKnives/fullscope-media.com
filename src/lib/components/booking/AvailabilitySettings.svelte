<script lang="ts">
	import { Clock, Calendar, Plus, Trash2, Save } from 'lucide-svelte';
	import Button from '../ui/Button.svelte';
	import Card from '../ui/Card.svelte';
	import { cn } from '$lib/utils';

	interface TimeSlot {
		id: string;
		day: string;
		startTime: string;
		endTime: string;
		available: boolean;
	}

	interface ServiceAvailability {
		id: string;
		name: string;
		duration: number;
		bufferTime: number;
		maxBookingsPerDay: number;
		advanceBookingDays: number;
	}

	let weeklySchedule = $state<TimeSlot[]>([
		{ id: '1', day: 'Monday', startTime: '09:00', endTime: '17:00', available: true },
		{ id: '2', day: 'Tuesday', startTime: '09:00', endTime: '17:00', available: true },
		{ id: '3', day: 'Wednesday', startTime: '09:00', endTime: '17:00', available: true },
		{ id: '4', day: 'Thursday', startTime: '09:00', endTime: '17:00', available: true },
		{ id: '5', day: 'Friday', startTime: '09:00', endTime: '17:00', available: true },
		{ id: '6', day: 'Saturday', startTime: '10:00', endTime: '14:00', available: false },
		{ id: '7', day: 'Sunday', startTime: '10:00', endTime: '14:00', available: false }
	]);

	let serviceSettings = $state<ServiceAvailability[]>([
		{
			id: 'consultation',
			name: 'Free Consultation',
			duration: 30,
			bufferTime: 15,
			maxBookingsPerDay: 8,
			advanceBookingDays: 30
		},
		{
			id: 'strategy',
			name: 'Strategy Session',
			duration: 60,
			bufferTime: 15,
			maxBookingsPerDay: 4,
			advanceBookingDays: 30
		},
		{
			id: 'production',
			name: 'Production Planning',
			duration: 90,
			bufferTime: 30,
			maxBookingsPerDay: 2,
			advanceBookingDays: 60
		}
	]);

	let blockedDates = $state<string[]>([
		'2024-12-25', // Christmas
		'2024-01-01', // New Year
		'2024-07-04'  // Independence Day
	]);

	let newBlockedDate = $state('');

	function toggleDayAvailability(dayId: string) {
		const slot = weeklySchedule.find(s => s.id === dayId);
		if (slot) {
			slot.available = !slot.available;
		}
	}

	function updateTimeSlot(dayId: string, field: 'startTime' | 'endTime', value: string) {
		const slot = weeklySchedule.find(s => s.id === dayId);
		if (slot) {
			slot[field] = value;
		}
	}

	function updateServiceSetting(serviceId: string, field: keyof ServiceAvailability, value: any) {
		const service = serviceSettings.find(s => s.id === serviceId);
		if (service) {
			(service as any)[field] = value;
		}
	}

	function addBlockedDate() {
		if (newBlockedDate && !blockedDates.includes(newBlockedDate)) {
			blockedDates.push(newBlockedDate);
			newBlockedDate = '';
		}
	}

	function removeBlockedDate(date: string) {
		blockedDates = blockedDates.filter(d => d !== date);
	}

	function saveSettings() {
		// Here you would save the settings to your backend
		console.log('Saving availability settings:', {
			weeklySchedule,
			serviceSettings,
			blockedDates
		});
		
		// Show success message
		alert('Availability settings saved successfully!');
	}
</script>

<div class="space-y-8">
	<!-- Weekly Schedule -->
	<Card>
		<h3 class="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
			<Calendar size={20} class="text-blue-600" />
			<span>Weekly Schedule</span>
		</h3>
		
		<div class="space-y-4">
			{#each weeklySchedule as slot}
				<div class="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
					<div class="w-24">
						<label class="flex items-center space-x-2">
							<input
								type="checkbox"
								checked={slot.available}
								onchange={() => toggleDayAvailability(slot.id)}
								class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
							/>
							<span class="text-sm font-medium text-gray-700">{slot.day}</span>
						</label>
					</div>
					
					<div class="flex items-center space-x-2 flex-1">
						<div class="flex items-center space-x-2">
							<Clock size={16} class="text-gray-400" />
							<input
								type="time"
								value={slot.startTime}
								disabled={!slot.available}
								onchange={(e) => updateTimeSlot(slot.id, 'startTime', e.target.value)}
								class={cn(
									'px-2 py-1 border rounded text-sm',
									slot.available ? 'border-gray-300' : 'border-gray-200 bg-gray-50 text-gray-400'
								)}
							/>
							<span class="text-gray-500">to</span>
							<input
								type="time"
								value={slot.endTime}
								disabled={!slot.available}
								onchange={(e) => updateTimeSlot(slot.id, 'endTime', e.target.value)}
								class={cn(
									'px-2 py-1 border rounded text-sm',
									slot.available ? 'border-gray-300' : 'border-gray-200 bg-gray-50 text-gray-400'
								)}
							/>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</Card>

	<!-- Service Settings -->
	<Card>
		<h3 class="text-lg font-semibold text-gray-900 mb-6">Service Availability Settings</h3>
		
		<div class="space-y-6">
			{#each serviceSettings as service}
				<div class="border border-gray-200 rounded-lg p-4">
					<h4 class="font-medium text-gray-900 mb-4">{service.name}</h4>
					
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-1">
								Duration (minutes)
							</label>
							<input
								type="number"
								value={service.duration}
								onchange={(e) => updateServiceSetting(service.id, 'duration', parseInt(e.target.value))}
								class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
								min="15"
								step="15"
							/>
						</div>
						
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-1">
								Buffer Time (minutes)
							</label>
							<input
								type="number"
								value={service.bufferTime}
								onchange={(e) => updateServiceSetting(service.id, 'bufferTime', parseInt(e.target.value))}
								class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
								min="0"
								step="5"
							/>
						</div>
						
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-1">
								Max Bookings/Day
							</label>
							<input
								type="number"
								value={service.maxBookingsPerDay}
								onchange={(e) => updateServiceSetting(service.id, 'maxBookingsPerDay', parseInt(e.target.value))}
								class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
								min="1"
							/>
						</div>
						
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-1">
								Advance Booking (days)
							</label>
							<input
								type="number"
								value={service.advanceBookingDays}
								onchange={(e) => updateServiceSetting(service.id, 'advanceBookingDays', parseInt(e.target.value))}
								class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
								min="1"
							/>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</Card>

	<!-- Blocked Dates -->
	<Card>
		<h3 class="text-lg font-semibold text-gray-900 mb-6">Blocked Dates</h3>

		<div class="space-y-4">
			<div class="flex items-center space-x-2">
				<input
					type="date"
					bind:value={newBlockedDate}
					class="px-3 py-2 border border-gray-300 rounded-lg text-sm"
				/>
				<Button variant="outline" size="sm" onclick={addBlockedDate}>
					<Plus size={16} class="mr-1" />
					Add Date
				</Button>
			</div>

			{#if blockedDates.length > 0}
				<div class="space-y-2">
					{#each blockedDates as date}
						<div class="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
							<span class="text-sm font-medium text-red-800">
								{new Date(date).toLocaleDateString('en-US', {
									weekday: 'long',
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								})}
							</span>
							<button
								onclick={() => removeBlockedDate(date)}
								class="text-red-600 hover:text-red-800 transition-colors"
							>
								<Trash2 size={16} />
							</button>
						</div>
					{/each}
				</div>
			{:else}
				<p class="text-gray-500 text-sm">No blocked dates set.</p>
			{/if}
		</div>
	</Card>

	<!-- Save Button -->
	<div class="flex justify-end">
		<Button variant="primary" onclick={saveSettings}>
			<Save size={16} class="mr-2" />
			Save Availability Settings
		</Button>
	</div>
</div>
