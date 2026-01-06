<script lang="ts">
	import Camera from 'lucide-svelte/icons/camera';
	import Clock from 'lucide-svelte/icons/clock';
	import Users from 'lucide-svelte/icons/users';
	import Lightbulb from 'lucide-svelte/icons/lightbulb';
	import Palette from 'lucide-svelte/icons/palette';
	import Video from 'lucide-svelte/icons/video';
	import Phone from 'lucide-svelte/icons/phone';
	import Mail from 'lucide-svelte/icons/mail';
	import MapPin from 'lucide-svelte/icons/map-pin';
	import Container from '$lib/components/ui/Container.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import AcuityEmbed from '$lib/components/booking/AcuityEmbed.svelte';

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
			description: 'MSU, LCC, or grad school students get up to $15 Uber credit home'
		},
		{
			icon: Clock,
			title: 'One-Stop Shop',
			description: 'Complete photography services from real estate to portraits in one location'
		}
	];

	const pricingOptions = [
		{
			label: 'Hourly Rental',
			price: '$75',
			caption: '/hr',
			details: ['2 hour minimum', 'Perfect for quick shoots']
		},
		{
			label: 'Half Day',
			price: '$250',
			caption: '/4hrs',
			details: ['Most popular package', 'Great for portrait sessions'],
			featured: true
		},
		{
			label: 'Full Day',
			price: '$450',
			caption: '/8hrs',
			details: ['Best value', 'Ideal for longer productions']
		}
	];

	const guidelinesLeft = ['Arrive 15 minutes early for setup', 'Maximum 20 people in studio', 'Handle all equipment with care', 'Leave the space as you found it'];
	const guidelinesRight = ['No smoking or food in studio', '24-hour cancellation policy', 'Studio address shared upon booking', 'Additional equipment available'];

	let schedulerSection: HTMLDivElement | null = null;

	function scrollToScheduler() {
		schedulerSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
</script>

<svelte:head>
	<title>Studio Rental - Full Scope Media</title>
	<meta
		name="description"
		content="Rent our professional photography studio and schedule instantly through Acuity Scheduling. Fully equipped with lighting, backdrops, and professional equipment."
	/>
</svelte:head>

<Container class="py-12">
	<div class="max-w-6xl mx-auto space-y-12">
		<section class="space-y-6">
			<div class="relative h-96 rounded-2xl overflow-hidden">
				<img
					src="/images/studio-hero.jpg"
					alt="Full Scope Media Studio Interior"
					class="w-full h-full object-cover"
					onerror={(event) => {
						const target = event.target as HTMLImageElement | null;
						if (target) {
							target.src = 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80';
						}
					}}
				/>
				<div class="absolute inset-0 bg-black/35 flex items-center justify-center">
					<div class="text-center text-white space-y-4">
						<h1 class="text-4xl font-bold">Professional Photography Studio</h1>
						<p class="text-lg text-zinc-200 max-w-2xl">
							Your one-stop shop for real estate photography, professional portraits, creative shoots, and content production.
						</p>
						<Button
							onclick={scrollToScheduler}
							size="lg"
							class="bg-[var(--color-primary)] text-black hover:bg-[var(--color-primary-strong)]"
						>
							Check Availability
						</Button>
					</div>
				</div>
			</div>
		</section>

		<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each studioFeatures as feature}
				<Card class="p-6 text-center bg-zinc-900 border border-zinc-800">
					<div class="flex justify-center mb-4">
						<feature.icon size={48} class="text-[var(--color-primary)]" />
					</div>
					<h3 class="text-lg font-semibold text-white mb-2">{feature.title}</h3>
					<p class="text-zinc-400">{feature.description}</p>
				</Card>
			{/each}
		</section>

		<Card class="p-8 bg-zinc-900 border border-zinc-800">
			<h2 class="text-2xl font-bold text-white mb-6 text-center">Rental Packages</h2>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				{#each pricingOptions as option}
					<div
						class={`text-center p-6 border rounded-lg ${
							option.featured
								? 'border-2 border-[var(--color-primary)] bg-[var(--color-primary)]/10'
								: 'border-zinc-800'
						}`}
					>
						<Clock size={32} class="mx-auto text-[var(--color-primary)] mb-3" />
						<h3 class="text-lg font-semibold mb-2 text-white">{option.label}</h3>
						<p class="text-3xl font-bold text-[var(--color-primary)] mb-2">
							{option.price}<span class="text-lg text-zinc-500">{option.caption}</span>
						</p>
						{#each option.details as detail}
							<p class="text-sm text-zinc-400">{detail}</p>
						{/each}
					</div>
				{/each}
			</div>
			<div class="text-center mt-6 space-y-3">
				<p class="text-sm text-zinc-400">*Weekend rates include a 50% surcharge</p>
				<Button onclick={scrollToScheduler} size="lg">Reserve Your Spot</Button>
			</div>
		</Card>

		<Card class="p-6 bg-zinc-900 border border-zinc-800">
			<h3 class="text-lg font-semibold text-white mb-4">Studio Guidelines</h3>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-zinc-400">
				<ul class="space-y-2">
					{#each guidelinesLeft as guideline}
						<li>• {guideline}</li>
					{/each}
				</ul>
				<ul class="space-y-2">
					{#each guidelinesRight as guideline}
						<li>• {guideline}</li>
					{/each}
				</ul>
			</div>
		</Card>

		<section bind:this={schedulerSection} class="space-y-6">
			<div class="text-center space-y-4">
				<h2 class="text-3xl font-bold text-white">Book the Studio</h2>
				<p class="text-zinc-400 max-w-2xl mx-auto">
					Choose a convenient time using our Acuity Scheduling embed. You'll receive instant confirmation and calendar invites
					for your rental.
				</p>
			</div>
			<Card class="bg-zinc-900 border border-zinc-800 p-0">
				<AcuityEmbed />
			</Card>
		</section>

		<Card class="bg-zinc-900 border border-zinc-800">
			<div class="text-center space-y-4 p-6">
				<h3 class="text-lg font-semibold text-white">Need help or have questions?</h3>
				<div class="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-zinc-400">
					<div class="flex items-center gap-2">
						<Phone size={16} class="text-[var(--color-primary)]" />
						<span>(555) 123-4567</span>
					</div>
					<div class="flex items-center gap-2">
						<Mail size={16} class="text-[var(--color-primary)]" />
						<span>hello@fullscopemedia.com</span>
					</div>
					<div class="flex items-center gap-2">
						<MapPin size={16} class="text-[var(--color-primary)]" />
						<span>Available Nationwide</span>
					</div>
				</div>
			</div>
		</Card>
	</div>
</Container>
