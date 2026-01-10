<script lang="ts">
	import Container from '../ui/Container.svelte';
	import Card from '../ui/Card.svelte';
	import Button from '../ui/Button.svelte';
	import Video from 'lucide-svelte/icons/video';
	import Camera from 'lucide-svelte/icons/camera';
	import User from 'lucide-svelte/icons/user';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import { resolve } from '$app/paths';

	const services = [
		{
			icon: Camera,
			title: 'Real Estate Photography',
			description: 'Bright, accurate sets for MLS and marketing—delivered fast and formatted to upload.',
			features: ['Interiors, Exteriors, Details', 'Cubicasa Floorplans', 'Virtual Staging Ready', 'Next-day Delivery']
		},
		{
			icon: Video,
			title: '3D & Video Tours',
			description: 'Immersive tours that keep buyers engaged—Matterport and Zillow 3D Home plus cinematic and AI-narrated video walkthroughs.',
			features: ['Matterport & Zillow 3D Home', 'Cinematic / AI Video Tours', 'MLS & Social Exports', 'Agent-intro or Voiceover']
		},
		{
			icon: User,
			title: 'Portraits & Headshots',
			description: 'Professional portraits that feel like you—corporate, creative, LinkedIn, and passport photos in-studio or on location.',
			features: ['Corporate & Creative Portraits', 'LinkedIn & Passport Crops', 'Studio or On-location', 'Light Retouching Included']
		}
	];

	const rows = services.reduce((acc, service, idx) => {
		if (idx % 2 === 0) acc.push([service]);
		else acc[acc.length - 1].push(service);
		return acc;
	}, [] as typeof services[]);
</script>

<section class="py-24 bg-black">
	<Container>
		<div class="text-center mb-16">
			<h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
				What we deliver
			</h2>
			<p class="text-xl text-zinc-400 max-w-3xl mx-auto">
				Real estate media and portraits that keep listings moving and people looking their best.
			</p>
		</div>

		<div class="inline-table table-auto border-separate border-spacing-6 mx-auto mb-12">
			{#each rows as row (row[0].title)}
				<div class="table-row">
					{#each row as service (service.title)}
						<div class="table-cell align-top">
							<Card class="group bg-zinc-900 border border-zinc-800 hover:border-[var(--color-primary)]/50 transition-all duration-300 hover:-translate-y-1 w-full">
								<div class="space-y-4">
									<div class="flex items-center space-x-4">
										<div class="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center group-hover:bg-[var(--color-primary)]/10 transition-colors">
											<service.icon size={24} class="text-[var(--color-primary)]" />
										</div>
										<h3 class="text-xl font-semibold text-white">{service.title}</h3>
									</div>
									
									<p class="text-zinc-400 leading-relaxed">
										{service.description}
									</p>
									
									<ul class="space-y-2">
										{#each service.features as feature (feature)}
											<li class="flex items-center space-x-2 text-sm text-zinc-500">
												<div class="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full"></div>
												<span>{feature}</span>
											</li>
										{/each}
									</ul>
									
									<div class="pt-4">
										<Button variant="ghost" size="sm" class="text-[var(--color-primary)] hover:text-[var(--color-primary-strong)] p-0 hover:bg-transparent">
											<a href={resolve('/services')} class="flex items-center space-x-1">
												<span>Learn More</span>
												<ArrowRight size={16} />
											</a>
										</Button>
									</div>
								</div>
							</Card>
						</div>
					{/each}
					{#if row.length === 1}
						<div class="table-cell"></div>
					{/if}
				</div>
			{/each}
		</div>

		<div class="text-center">
			<Button variant="primary" size="lg">
				<a href={resolve('/services')}>View All Services</a>
			</Button>
			<p class="text-sm text-zinc-400 mt-3">
				Need a music video or custom creative project? Let’s scope it together.
			</p>
		</div>
	</Container>
</section>
