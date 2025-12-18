<script lang="ts">
	import { onMount } from 'svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Calendar from 'lucide-svelte/icons/calendar';
	import Mail from 'lucide-svelte/icons/mail';
	import Phone from 'lucide-svelte/icons/phone';
	import MapPin from 'lucide-svelte/icons/map-pin';
	import Clock from 'lucide-svelte/icons/clock';
	import User from 'lucide-svelte/icons/user';

	interface Contact {
		id: string;
		name: string;
		email: string;
		phone?: string;
		company?: string;
		service?: string;
		budget?: string;
		message: string;
		status: string;
		created_at: string;
	}

	interface Booking {
		id: string;
		client_name: string;
		client_email: string;
		client_phone?: string;
		service: string;
		service_type: string;
		date: string;
		time: string;
		appointment_date: string;
		appointment_time: string;
		property_address?: string;
		status: string;
		created_at: string;
	}

	interface StudioRental {
		id: string;
		client_name: string;
		client_email: string;
		client_phone?: string;
		date: string;
		rental_date: string;
		start_time: string;
		end_time: string;
		rental_type: string;
		purpose: string;
		guest_count: number;
		status: string;
		total_amount: number;
		created_at: string;
	}

	let bookings = $state<Booking[]>([]);
	let contacts = $state<Contact[]>([]);
	let studioRentals = $state<StudioRental[]>([]);
	let loading = $state(true);

	onMount(async () => {
		try {
			// Fetch bookings
			const bookingsResponse = await fetch('/api/bookings');
			const bookingsData = await bookingsResponse.json();
			bookings = bookingsData.bookings || [];

			// Fetch contact submissions
			const contactsResponse = await fetch('/api/admin/contacts');
			const contactsData = await contactsResponse.json();
			contacts = contactsData.contacts || [];

			// Fetch studio rentals
			const studioResponse = await fetch('/api/admin/studio-rentals');
			const studioData = await studioResponse.json();
			studioRentals = studioData.rentals || [];
		} catch (error) {
			console.error('Failed to load admin data:', error);
		} finally {
			loading = false;
		}
	});

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-US', {
			weekday: 'short',
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
	}

	function formatTime(timeString: string): string {
		return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: '2-digit',
			hour12: true
		});
	}

	function getStatusColor(status: string): string {
		switch (status) {
			case 'confirmed': return 'bg-green-100 text-green-800';
			case 'pending': return 'bg-yellow-100 text-yellow-800';
			case 'completed': return 'bg-blue-100 text-blue-800';
			case 'cancelled': return 'bg-red-100 text-red-800';
			default: return 'bg-gray-100 text-gray-800';
		}
	}
</script>

<svelte:head>
	<title>Admin Dashboard - Full Scope Media</title>
</svelte:head>

<Container class="py-12">
	<div class="max-w-7xl mx-auto">
		<div class="mb-8">
			<h1 class="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
			<p class="text-gray-600">Manage your bookings and contact submissions</p>
		</div>

		{#if loading}
			<div class="text-center py-12">
				<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
				<p class="mt-4 text-gray-600">Loading...</p>
			</div>
		{:else}
			<div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
				<!-- Bookings Section -->
				<div>
					<h2 class="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
						<Calendar size={24} />
						Recent Bookings ({bookings.length})
					</h2>
					
					<div class="space-y-4">
						{#each bookings.slice(0, 10) as booking}
							<Card class="p-4">
								<div class="flex justify-between items-start mb-3">
									<div>
										<h3 class="font-semibold text-gray-900">{booking.client_name}</h3>
										<p class="text-sm text-gray-600">{booking.service_type}</p>
									</div>
									<span class="px-2 py-1 text-xs font-medium rounded-full {getStatusColor(booking.status)}">
										{booking.status}
									</span>
								</div>
								
								<div class="grid grid-cols-2 gap-4 text-sm text-gray-600">
									<div class="flex items-center gap-2">
										<Calendar size={16} />
										{formatDate(booking.appointment_date)}
									</div>
									<div class="flex items-center gap-2">
										<Clock size={16} />
										{formatTime(booking.appointment_time)}
									</div>
									<div class="flex items-center gap-2">
										<Mail size={16} />
										{booking.client_email}
									</div>
									<div class="flex items-center gap-2">
										<Phone size={16} />
										{booking.client_phone}
									</div>
								</div>
								
								{#if booking.property_address}
									<div class="mt-2 flex items-center gap-2 text-sm text-gray-600">
										<MapPin size={16} />
										{booking.property_address}
									</div>
								{/if}
							</Card>
						{/each}
						
						{#if bookings.length === 0}
							<Card class="p-8 text-center">
								<Calendar size={48} class="mx-auto text-gray-400 mb-4" />
								<p class="text-gray-600">No bookings yet</p>
							</Card>
						{/if}
					</div>
				</div>

				<!-- Studio Rentals Section -->
				<div>
					<h2 class="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
						<Calendar size={24} />
						Studio Rentals ({studioRentals.length})
					</h2>

					<div class="space-y-4">
						{#each studioRentals.slice(0, 10) as rental}
							<Card class="p-4">
								<div class="flex justify-between items-start mb-3">
									<div>
										<h3 class="font-semibold text-gray-900">{rental.client_name}</h3>
										<p class="text-sm text-gray-600 capitalize">{rental.rental_type} Rental - {rental.purpose}</p>
									</div>
									<span class="px-2 py-1 text-xs font-medium rounded-full {getStatusColor(rental.status)}">
										{rental.status}
									</span>
								</div>

								<div class="grid grid-cols-2 gap-4 text-sm text-gray-600">
									<div class="flex items-center gap-2">
										<Calendar size={16} />
										{formatDate(rental.rental_date)}
									</div>
									<div class="flex items-center gap-2">
										<Clock size={16} />
										{formatTime(rental.start_time)} - {formatTime(rental.end_time)}
									</div>
									<div class="flex items-center gap-2">
										<Mail size={16} />
										{rental.client_email}
									</div>
									<div class="flex items-center gap-2">
										<Phone size={16} />
										{rental.client_phone}
									</div>
								</div>

								<div class="mt-2 flex justify-between items-center text-sm">
									<div class="flex items-center gap-2 text-gray-600">
										<User size={16} />
										{rental.guest_count} guests
									</div>
									<div class="font-bold text-green-600">
										${rental.total_amount}
									</div>
								</div>
							</Card>
						{/each}

						{#if studioRentals.length === 0}
							<Card class="p-8 text-center">
								<Calendar size={48} class="mx-auto text-gray-400 mb-4" />
								<p class="text-gray-600">No studio rentals yet</p>
							</Card>
						{/if}
					</div>
				</div>

				<!-- Contact Submissions Section -->
				<div>
					<h2 class="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
						<Mail size={24} />
						Contact Submissions ({contacts.length})
					</h2>
					
					<div class="space-y-4">
						{#each contacts.slice(0, 10) as contact}
							<Card class="p-4">
								<div class="flex justify-between items-start mb-3">
									<div>
										<h3 class="font-semibold text-gray-900">{contact.name}</h3>
										<p class="text-sm text-gray-600">{contact.service}</p>
									</div>
									<span class="px-2 py-1 text-xs font-medium rounded-full {getStatusColor(contact.status)}">
										{contact.status}
									</span>
								</div>
								
								<div class="text-sm text-gray-600 mb-2">
									<div class="flex items-center gap-2 mb-1">
										<Mail size={16} />
										{contact.email}
									</div>
									{#if contact.budget}
										<div class="flex items-center gap-2">
											<span class="w-4 h-4 text-center">💰</span>
											{contact.budget}
										</div>
									{/if}
								</div>
								
								<p class="text-sm text-gray-700 line-clamp-2">{contact.message}</p>
								
								<div class="mt-2 text-xs text-gray-500">
									{formatDate(contact.created_at)}
								</div>
							</Card>
						{/each}
						
						{#if contacts.length === 0}
							<Card class="p-8 text-center">
								<Mail size={48} class="mx-auto text-gray-400 mb-4" />
								<p class="text-gray-600">No contact submissions yet</p>
							</Card>
						{/if}
					</div>
				</div>
			</div>
		{/if}
	</div>
</Container>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
