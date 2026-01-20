<script lang="ts">
	import Container from '$lib/components/ui/Container.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Video from 'lucide-svelte/icons/video';
	import Camera from 'lucide-svelte/icons/camera';
	import Drone from 'lucide-svelte/icons/drone';
	import User from 'lucide-svelte/icons/user';
	import Check from 'lucide-svelte/icons/check';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import { resolve } from '$app/paths';

	const services = [
		{
			icon: Camera,
			title: 'Real Estate Photography',
			description: 'Clean, accurate sets for every listing—delivered fast and sized for MLS, print, and social.',
			features: [
				'Interior, Exterior, and Detail Sets',
				'Cubicasa Floorplans Included',
				'Virtual Staging-Ready Files',
				'MLS-safe color + verticals',
				'Twilight & Blue-sky Options',
				'Next-day Turnaround'
			],
			pricing: 'Photo packages from $250',
			popular: true
		},
		{
			icon: Video,
			title: '3D & Video Tours',
			description: 'Immersive tours that keep buyers engaged—Matterport and Zillow 3D Home plus cinematic and AI-narrated video walkthroughs.',
			features: [
				'Matterport & Zillow 3D Home',
				'Cinematic / AI Video Tours',
				'Agent intro or Voiceover',
				'MLS & Social Exports',
				'Branded & Unbranded Links',
				'Delivery-ready Hosting'
			],
			pricing: 'Tours from $400',
			popular: false
		},
		{
			icon: Drone,
			title: 'Drone & Aerial Media',
			description: 'FAA-compliant flights for hero shots, context, and coverage you can’t get from the ground.',
			features: [
				'Aerial Hero + Lot Coverage',
				'Neighborhood & Amenity Context',
				'Roofline and Elevation Angles',
				'Vertical & Landscape Deliverables',
				'FAA-compliant Planning',
				'Add-on to Photo or Video'
			],
			pricing: 'Aerial from $200',
			popular: false
		},
		{
			icon: User,
			title: 'Portraits & Headshots',
			description: 'Professional portraits that feel like you—corporate, creative, LinkedIn, and passport-ready options.',
			features: [
				'Corporate & Team Headshots',
				'Creative Portrait Sessions',
				'LinkedIn / Passport Crops',
				'Studio or On-location',
				'Light Retouching Included',
				'Delivery in Multiple Ratios'
			],
			pricing: 'Headshots from $175',
			popular: false
		}
	];
</script>

<svelte:head>
	<title>Services - Full Scope Media</title>
	<meta name="description" content="Real estate photography, 3D and video tours, drone media, and portraits/headshots by Full Scope Media in East Lansing." />
</svelte:head>

<!-- Hero Section -->
<section class="bg-black text-white py-16 md:py-24">
	<Container>
		<div class="text-center space-y-6">
			<h1 class="text-4xl md:text-5xl font-bold">Our Services</h1>
			<p class="text-xl text-zinc-300 max-w-3xl mx-auto">
				Real estate media and portraits, built for fast turnarounds and clean, consistent results across photo, tours, drone, and headshots. Music videos and other creative projects are scoped case by case—reach out to talk details.
			</p>
		</div>
	</Container>
</section>

<!-- Services Grid -->
<section class="py-16 md:py-24 bg-black">
	<Container>
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
			{#each services as service (service.title)}
				<Card class="relative overflow-hidden group hover:shadow-xl transition-all duration-300 bg-zinc-900 border border-zinc-800">
					{#if service.popular}
						<div class="absolute top-4 right-4 bg-[var(--color-primary-strong)] text-black px-3 py-1 rounded-full text-sm font-medium">
							Most Popular
						</div>
					{/if}
					
					<div class="space-y-6">
						<div class="flex items-center space-x-4">
							<div class="w-16 h-16 bg-[var(--color-primary)]/15 rounded-xl flex items-center justify-center group-hover:bg-[var(--color-primary)]/25 transition-colors">
								<service.icon size={32} class="text-[var(--color-primary-strong)]" />
							</div>
							<div>
								<h3 class="text-2xl font-bold text-white">{service.title}</h3>
								<p class="text-[var(--color-primary-strong)] font-semibold">{service.pricing}</p>
							</div>
						</div>
						
						<p class="text-zinc-400 leading-relaxed">
							{service.description}
						</p>
						
						<div class="space-y-3">
							<h4 class="font-semibold text-white">What's Included:</h4>
							<ul class="space-y-2">
								{#each service.features as feature (feature)}
									<li class="flex items-start space-x-3">
										<Check size={16} class="text-[var(--color-primary-strong)] mt-0.5 flex-shrink-0" />
										<span class="text-zinc-400">{feature}</span>
									</li>
								{/each}
							</ul>
						</div>
						
						<div class="pt-4">
							<Button variant="primary" class="w-full text-black">
								<a href={resolve('/contact')} class="flex items-center justify-center space-x-2">
									<span>Get Started</span>
									<ArrowRight size={16} />
								</a>
							</Button>
						</div>
					</div>
				</Card>
			{/each}
		</div>
	</Container>
</section>

<!-- Process Section -->
<section class="py-16 md:py-24 bg-black">
	<Container>
		<div class="text-center mb-16">
			<h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Our Process</h2>
			<p class="text-xl text-zinc-400 max-w-3xl mx-auto">
				We follow a proven process to ensure every project exceeds expectations and delivers measurable results.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-4 gap-8">
				<div class="text-center">
					<div class="w-16 h-16 bg-[var(--color-primary)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
						<span class="text-2xl font-bold text-[var(--color-primary-strong)]">1</span>
					</div>
					<h3 class="text-lg font-semibold text-white mb-2">Discovery</h3>
				<p class="text-zinc-400">We get clear on goals, audience, and success metrics before we lift a camera or open a doc.</p>
			</div>
			<div class="text-center">
				<div class="w-16 h-16 bg-[var(--color-primary)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
					<span class="text-2xl font-bold text-[var(--color-primary-strong)]">2</span>
				</div>
				<h3 class="text-lg font-semibold text-white mb-2">Planning</h3>
				<p class="text-zinc-400">A detailed plan with timelines, approvals, and creative direction everyone can follow.</p>
			</div>
			<div class="text-center">
				<div class="w-16 h-16 bg-[var(--color-primary)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
					<span class="text-2xl font-bold text-[var(--color-primary-strong)]">3</span>
				</div>
				<h3 class="text-lg font-semibold text-white mb-2">Production</h3>
				<p class="text-zinc-400">Tight production with experienced crew, pro gear, and an eye on the brief.</p>
			</div>
			<div class="text-center">
				<div class="w-16 h-16 bg-[var(--color-primary)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
					<span class="text-2xl font-bold text-[var(--color-primary-strong)]">4</span>
				</div>
				<h3 class="text-lg font-semibold text-white mb-2">Delivery</h3>
				<p class="text-zinc-400">Polished deliverables, clear handoff, and recommendations for distribution and optimization.</p>
			</div>
		</div>
	</Container>
</section>

<!-- CTA Section -->
<section class="py-16 md:py-24 bg-black text-white">
	<Container>
		<div class="text-center space-y-8">
			<h2 class="text-3xl md:text-4xl font-bold">Ready to Get Started?</h2>
			<p class="text-xl text-zinc-300 max-w-2xl mx-auto">
				Let's discuss your project and create a custom solution that fits your needs and budget.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<Button variant="primary" size="lg" class="text-black">
					<a href={resolve('/contact')}>Start Your Project</a>
				</Button>
				<Button variant="outline" size="lg" class="border-zinc-700 text-white hover:bg-zinc-800">
					<a href={resolve('/portfolio')}>View Our Work</a>
				</Button>
			</div>
		</div>
	</Container>
</section>
