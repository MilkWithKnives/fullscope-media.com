<script lang="ts">
	import { onMount } from 'svelte';
	import { Calendar, Clock, Users, DollarSign } from 'lucide-svelte';
	import Button from '../ui/Button.svelte';
	import Card from '../ui/Card.svelte';

	interface TimeBlock {
		date: string;
		time: string;
		available: boolean;
		selected: boolean;
	}

	interface SelectedBooking {
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

	let {
		onBookingSelect
	}: {
		onBookingSelect?: (booking: SelectedBooking) => void;
	} = $props();

	let selectedDate = $state(new Date().toISOString().split('T')[0]);
	let selectedBlocks = $state<TimeBlock[]>([]);
	let selectedRentalType = $state('photographer_rental');
	let existingBookings = $state([]);
	let isLoaded = $state(false);

	// Initialize with some blocks immediately
	function initializeBlocks() {
		const blocks: TimeBlock[] = [];
		for (let hour = 6; hour < 23; hour++) {
			for (let minute = 0; minute < 60; minute += 15) {
				const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
				blocks.push({
					date: selectedDate,
					time: timeString,
					available: true,
					selected: false
				});
			}
		}
		return blocks;
	}

	// Initialize blocks immediately
	selectedBlocks = initializeBlocks();

	// Rental types with 15-minute block pricing
	const rentalTypes = {
		photographer_rental: {
			name: 'Photographer Rental',
			description: 'Studio rental for professional photographers',
			rate_per_block: 18.75, // $75/hour
			minimum_blocks: 8, // 2 hours minimum
			setup_fee: 25.00,
			cleanup_fee: 15.00,
			color: '#3b82f6'
		},
		party_rental: {
			name: 'Party/Event Rental',
			description: 'Studio rental for parties and events',
			rate_per_block: 25.00, // $100/hour
			minimum_blocks: 12, // 3 hours minimum
			setup_fee: 50.00,
			cleanup_fee: 75.00,
			color: '#10b981'
		},
		event_rental: {
			name: 'Super Bowl/Sports Events',
			description: 'Premium pricing for major sporting events',
			rate_per_block: 37.50, // $150/hour
			minimum_blocks: 16, // 4 hours minimum
			setup_fee: 100.00,
			cleanup_fee: 100.00,
			color: '#f59e0b'
		},
		studio_rental: {
			name: 'Standard Studio Rental',
			description: 'Basic studio rental for general use',
			rate_per_block: 15.00, // $60/hour
			minimum_blocks: 8, // 2 hours minimum
			setup_fee: 0.00,
			cleanup_fee: 25.00,
			color: '#8b5cf6'
		}
	};

	onMount(() => {
		console.log('SimpleStudioCalendar mounted');
		// Use setTimeout to ensure the component is fully rendered
		setTimeout(() => {
			generateTimeBlocks();
			isLoaded = true;
		}, 100);
	});

	function generateTimeBlocks() {
		console.log('Generating time blocks for date:', selectedDate);
		const blocks: TimeBlock[] = [];

		// Generate 15-minute blocks from 6 AM to 11 PM
		for (let hour = 6; hour < 23; hour++) {
			for (let minute = 0; minute < 60; minute += 15) {
				const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

				// For now, make all blocks available (we'll add conflict checking later)
				blocks.push({
					date: selectedDate,
					time: timeString,
					available: true,
					selected: false
				});
			}
		}

		console.log('Generated blocks:', blocks.length);
		selectedBlocks = blocks;

		// Force a reactive update
		selectedBlocks = [...selectedBlocks];
	}

	function timeToMinutes(time: string): number {
		const [hours, minutes] = time.split(':').map(Number);
		return hours * 60 + minutes;
	}

	function toggleTimeBlock(blockIndex: number) {
		const block = selectedBlocks[blockIndex];
		if (!block.available) return;
		
		selectedBlocks[blockIndex].selected = !selectedBlocks[blockIndex].selected;
		
		// Update booking calculation
		updateBookingCalculation();
	}

	function updateBookingCalculation() {
		const selectedTimeBlocks = selectedBlocks.filter(block => block.selected);
		if (selectedTimeBlocks.length === 0) return;

		// Sort selected blocks by time
		selectedTimeBlocks.sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));
		
		const rentalConfig = rentalTypes[selectedRentalType as keyof typeof rentalTypes];
		const startTime = selectedTimeBlocks[0].time;
		const lastBlock = selectedTimeBlocks[selectedTimeBlocks.length - 1];
		const endMinutes = timeToMinutes(lastBlock.time) + 15;
		const endTime = `${Math.floor(endMinutes / 60).toString().padStart(2, '0')}:${(endMinutes % 60).toString().padStart(2, '0')}`;
		
		// Check if minimum blocks requirement is met
		if (selectedTimeBlocks.length < rentalConfig.minimum_blocks) {
			return; // Don't create booking if minimum not met
		}

		// Calculate pricing
		const isWeekend = new Date(selectedDate).getDay() === 0 || new Date(selectedDate).getDay() === 6;
		const multiplier = isWeekend ? 1.5 : 1;
		const blockRate = rentalConfig.rate_per_block * multiplier;
		const subtotal = selectedTimeBlocks.length * blockRate;
		const totalAmount = subtotal + rentalConfig.setup_fee + rentalConfig.cleanup_fee;

		const booking: SelectedBooking = {
			date: selectedDate,
			start_time: startTime,
			end_time: endTime,
			total_blocks: selectedTimeBlocks.length,
			duration_minutes: selectedTimeBlocks.length * 15,
			rental_type: selectedRentalType,
			rate_per_block: blockRate,
			total_amount: totalAmount,
			setup_fee: rentalConfig.setup_fee,
			cleanup_fee: rentalConfig.cleanup_fee
		};

		onBookingSelect?.(booking);
	}

	function formatTime(time: string): string {
		const [hour, minute] = time.split(':').map(Number);
		const period = hour >= 12 ? 'PM' : 'AM';
		const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
		return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
	}

	$effect(() => {
		if (selectedDate) {
			generateTimeBlocks();
		}
	});
</script>

<div class="space-y-6">
	<!-- Debug Info -->
	<Card class="p-4 bg-blue-50 border-blue-200">
		<h4 class="text-sm font-semibold text-blue-800 mb-2">Simple Studio Calendar</h4>
		<div class="text-xs text-blue-700 space-y-1">
			<p>Selected Date: {selectedDate}</p>
			<p>Selected Blocks: {selectedBlocks.length}</p>
			<p>Available Blocks: {selectedBlocks.filter(b => b.available).length}</p>
			<p>Selected Rental Type: {selectedRentalType}</p>
			<p>Is Loaded: {isLoaded}</p>
			<button
				onclick={() => generateTimeBlocks()}
				class="mt-2 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
			>
				Debug: Generate Blocks
			</button>
		</div>
	</Card>

	<!-- Rental Type Selection -->
	<Card class="p-6">
		<h3 class="text-lg font-semibold text-gray-900 mb-4">Select Rental Type</h3>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			{#each Object.entries(rentalTypes) as [key, rental]}
				<button
					onclick={() => { selectedRentalType = key; updateBookingCalculation(); }}
					class="p-4 border-2 rounded-lg transition-all text-left {selectedRentalType === key
						? 'border-blue-500 bg-blue-50'
						: 'border-gray-200 hover:border-gray-300'}"
				>
					<div class="flex items-center gap-2 mb-2">
						<div class="w-4 h-4 rounded-full" style="background-color: {rental.color}"></div>
						<h4 class="font-semibold text-gray-900">{rental.name}</h4>
					</div>
					<p class="text-sm text-gray-600 mb-2">{rental.description}</p>
					<div class="text-sm">
						<p class="font-medium text-blue-600">${rental.rate_per_block}/15min</p>
						<p class="text-gray-500">Min: {Math.floor(rental.minimum_blocks / 4)}h</p>
						{#if rental.setup_fee > 0}
							<p class="text-gray-500">Setup: ${rental.setup_fee}</p>
						{/if}
					</div>
				</button>
			{/each}
		</div>
	</Card>

	<!-- Date Selection -->
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

	<!-- 15-Minute Time Block Selection -->
	<Card class="p-6">
		<div class="flex items-center justify-between mb-4">
			<div class="flex items-center gap-3">
				<Clock class="text-blue-600" size={24} />
				<h3 class="text-lg font-semibold text-gray-900">Select Time Blocks (15-minute increments)</h3>
			</div>
			<div class="text-sm text-gray-600">
				Selected: {selectedBlocks.filter(b => b.selected).length} blocks
				({Math.floor(selectedBlocks.filter(b => b.selected).length * 15 / 60)}h {(selectedBlocks.filter(b => b.selected).length * 15) % 60}m)
			</div>
		</div>

		<!-- Time Block Grid -->
		{#if selectedBlocks.length > 0}
			<div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-1 max-h-96 overflow-y-auto">
				{#each selectedBlocks as block, index}
					<button
						onclick={() => toggleTimeBlock(index)}
						disabled={!block.available}
						class="p-2 text-xs border rounded transition-all {
							!block.available
								? 'bg-red-100 border-red-300 text-red-600 cursor-not-allowed'
								: block.selected
									? 'bg-blue-500 border-blue-600 text-white'
									: 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
						}"
						title="{formatTime(block.time)} - {block.available ? 'Available' : 'Booked'}"
					>
						{formatTime(block.time)}
					</button>
				{/each}
			</div>
		{:else}
			<div class="text-center py-8 text-gray-500">
				<p>Loading time slots...</p>
				<button
					onclick={() => generateTimeBlocks()}
					class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
				>
					Generate Time Slots
				</button>
			</div>
		{/if}

		<div class="mt-4 flex items-center gap-4 text-sm">
			<div class="flex items-center gap-2">
				<div class="w-4 h-4 bg-white border border-gray-300 rounded"></div>
				<span class="text-gray-600">Available</span>
			</div>
			<div class="flex items-center gap-2">
				<div class="w-4 h-4 bg-blue-500 rounded"></div>
				<span class="text-gray-600">Selected</span>
			</div>
			<div class="flex items-center gap-2">
				<div class="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
				<span class="text-gray-600">Booked</span>
			</div>
		</div>
	</Card>

	<!-- Booking Summary -->
	{#if selectedBlocks.filter(b => b.selected).length > 0}
		{@const selectedCount = selectedBlocks.filter(b => b.selected).length}
		{@const rentalConfig = rentalTypes[selectedRentalType]}
		{@const isWeekend = new Date(selectedDate).getDay() === 0 || new Date(selectedDate).getDay() === 6}
		{@const multiplier = isWeekend ? 1.5 : 1}
		{@const blockRate = rentalConfig.rate_per_block * multiplier}
		{@const subtotal = selectedCount * blockRate}
		{@const totalAmount = subtotal + rentalConfig.setup_fee + rentalConfig.cleanup_fee}

		<Card class="p-6 bg-blue-50 border-blue-200">
			<h3 class="text-lg font-semibold text-blue-900 mb-4">Booking Summary</h3>

			<div class="grid grid-cols-2 gap-4 text-sm mb-4">
				<div>
					<span class="text-blue-700 font-medium">Date:</span>
					<p class="text-blue-900">{new Date(selectedDate).toLocaleDateString()}</p>
				</div>
				<div>
					<span class="text-blue-700 font-medium">Rental Type:</span>
					<p class="text-blue-900">{rentalConfig.name}</p>
				</div>
				<div>
					<span class="text-blue-700 font-medium">Duration:</span>
					<p class="text-blue-900">{Math.floor(selectedCount * 15 / 60)}h {(selectedCount * 15) % 60}m ({selectedCount} blocks)</p>
				</div>
				<div>
					<span class="text-blue-700 font-medium">Rate per Block:</span>
					<p class="text-blue-900">${blockRate.toFixed(2)} {isWeekend ? '(Weekend)' : ''}</p>
				</div>
			</div>

			<div class="border-t border-blue-200 pt-4">
				<div class="flex justify-between items-center text-sm mb-2">
					<span class="text-blue-700">Subtotal ({selectedCount} blocks):</span>
					<span class="text-blue-900">${subtotal.toFixed(2)}</span>
				</div>
				{#if rentalConfig.setup_fee > 0}
					<div class="flex justify-between items-center text-sm mb-2">
						<span class="text-blue-700">Setup Fee:</span>
						<span class="text-blue-900">${rentalConfig.setup_fee.toFixed(2)}</span>
					</div>
				{/if}
				{#if rentalConfig.cleanup_fee > 0}
					<div class="flex justify-between items-center text-sm mb-2">
						<span class="text-blue-700">Cleanup Fee:</span>
						<span class="text-blue-900">${rentalConfig.cleanup_fee.toFixed(2)}</span>
					</div>
				{/if}
				<div class="flex justify-between items-center text-lg font-bold border-t border-blue-200 pt-2">
					<span class="text-blue-900">Total:</span>
					<span class="text-blue-900">${totalAmount.toFixed(2)}</span>
				</div>
			</div>

			{#if selectedCount < rentalConfig.minimum_blocks}
				<div class="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
					<p class="text-yellow-800 text-sm">
						⚠️ Minimum booking is {rentalConfig.minimum_blocks} blocks ({Math.floor(rentalConfig.minimum_blocks * 15 / 60)}h {(rentalConfig.minimum_blocks * 15) % 60}m).
						Please select {rentalConfig.minimum_blocks - selectedCount} more blocks.
					</p>
				</div>
			{/if}
		</Card>
	{/if}
</div>
