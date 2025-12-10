<script lang="ts">
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';
	import { Play, ExternalLink, Award, Calendar, Users } from 'lucide-svelte';
	import Button from '../ui/Button.svelte';
	import { cn } from '$lib/utils';

	interface PortfolioItem {
		id: number;
		title: string;
		category: string;
		client: string;
		description: string;
		image: string;
		video?: string;
		tags: string[];
		date: string;
		metrics?: {
			label: string;
			value: string;
		}[];
		featured?: boolean;
		award?: string;
	}

	let { items, options = {} }: { items: PortfolioItem[]; options?: any } = $props();

	const defaultOptions = {
		type: 'loop',
		perPage: 1,
		perMove: 1,
		gap: '2rem',
		padding: '5rem',
		breakpoints: {
			1024: {
				perPage: 1,
				padding: '2rem',
			},
			768: {
				perPage: 1,
				padding: '1rem',
			},
		},
		autoplay: true,
		interval: 5000,
		pauseOnHover: true,
		arrows: true,
		pagination: true,
		...options
	};

	function handleSlideClick(item: PortfolioItem) {
		// Handle slide click - could open modal or navigate to detail page
		console.log('Clicked item:', item);
	}
</script>

<div class="portfolio-carousel">
	<Splide options={defaultOptions} aria-label="Portfolio Showcase">
		{#each items as item (item.id)}
			<SplideSlide>
				<div class="relative group cursor-pointer" onclick={() => handleSlideClick(item)}>
					<!-- Main Image/Video Container -->
					<div class="relative aspect-video bg-gradient-to-br from-blue-200 to-purple-200 rounded-2xl overflow-hidden">
						<!-- Placeholder for actual image -->
						<div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
							<div class="text-center space-y-4">
								{#if item.video}
									<Play size={48} class="text-blue-600 mx-auto" />
									<p class="text-blue-800 font-medium">Video Project</p>
								{:else}
									<ExternalLink size={48} class="text-blue-600 mx-auto" />
									<p class="text-blue-800 font-medium">View Project</p>
								{/if}
							</div>
						</div>
						
						<!-- Overlay -->
						<div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
							<div class="text-center space-y-4">
								<Button variant="primary" size="lg">
									{item.video ? 'Watch Video' : 'View Project'}
								</Button>
								{#if item.metrics}
									<div class="flex space-x-6 text-white text-sm">
										{#each item.metrics as metric}
											<div class="text-center">
												<div class="font-bold">{metric.value}</div>
												<div class="opacity-80">{metric.label}</div>
											</div>
										{/each}
									</div>
								{/if}
							</div>
						</div>

						<!-- Featured Badge -->
						{#if item.featured}
							<div class="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
								<Award size={14} />
								<span>Featured</span>
							</div>
						{/if}

						<!-- Award Badge -->
						{#if item.award}
							<div class="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
								{item.award}
							</div>
						{/if}
					</div>

					<!-- Content -->
					<div class="mt-6 space-y-4">
						<div class="flex items-start justify-between">
							<div class="space-y-2">
								<div class="flex items-center space-x-2 text-sm text-gray-500">
									<Calendar size={14} />
									<span>{new Date(item.date).toLocaleDateString()}</span>
									<span>•</span>
									<span class="text-blue-600 font-medium">{item.category}</span>
								</div>
								<h3 class="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
									{item.title}
								</h3>
								<p class="text-blue-600 font-medium flex items-center space-x-1">
									<Users size={14} />
									<span>{item.client}</span>
								</p>
							</div>
						</div>
						
						<p class="text-gray-600 leading-relaxed">
							{item.description}
						</p>
						
						<div class="flex flex-wrap gap-2">
							{#each item.tags as tag}
								<span class="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors">
									{tag}
								</span>
							{/each}
						</div>
					</div>
				</div>
			</SplideSlide>
		{/each}
	</Splide>
</div>
