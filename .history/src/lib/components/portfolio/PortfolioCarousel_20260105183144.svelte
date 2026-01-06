<script lang="ts">
import { Splide, SplideSlide } from '@splidejs/svelte-splide/components';
	import '@splidejs/svelte-splide/css';
	import Play from 'lucide-svelte/icons/play';
	import ExternalLink from 'lucide-svelte/icons/external-link';
	import Award from 'lucide-svelte/icons/award';
	import Calendar from 'lucide-svelte/icons/calendar';
	import Users from 'lucide-svelte/icons/users';
	import Button from '../ui/Button.svelte';

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

	const prefersReducedMotion =
		typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	const baseOptions = {
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
		pagination: true
	};

	const defaultOptions = $derived({
		...baseOptions,
		...options,
		autoplay: (options.autoplay ?? baseOptions.autoplay) && !prefersReducedMotion
	});

	function handleSlideClick(item: PortfolioItem) {
		// Handle slide click - could open modal or navigate to detail page
		console.log('Clicked item:', item);
	}

	function handleSlideKeydown(event: KeyboardEvent, item: PortfolioItem) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleSlideClick(item);
		}
	}
</script>

<div class="portfolio-carousel">
	<Splide options={defaultOptions} aria-label="Portfolio Showcase">
		{#each items as item (item.id)}
			<SplideSlide>
				<div
					class="relative group cursor-pointer"
					onclick={() => handleSlideClick(item)}
					onkeydown={(event) => handleSlideKeydown(event, item)}
					role="button"
					tabindex="0"
					aria-label={`View ${item.title} project details`}
				>
					<!-- Main Image/Video Container -->
					<div class="relative aspect-video bg-gradient-to-br from-[#121212] via-[#0f0f0f] to-[#090909] rounded-2xl overflow-hidden">
						{#if item.image}
							<img
								src={item.image}
								alt={`${item.title} project preview`}
								loading="lazy"
								decoding="async"
								class="absolute inset-0 h-full w-full object-cover"
							/>
						{/if}
						{#if !item.image}
							<div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#0c0c0c]">
								<div class="text-center space-y-4">
									{#if item.video}
										<Play size={48} class="text-[var(--color-primary-strong)] mx-auto" />
										<p class="text-zinc-300 font-medium">Video Project</p>
									{:else}
										<ExternalLink size={48} class="text-[var(--color-primary-strong)] mx-auto" />
										<p class="text-zinc-300 font-medium">View Project</p>
									{/if}
								</div>
							</div>
						{/if}
						
						<!-- Overlay -->
						<div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
							<div class="text-center space-y-4">
								<Button variant="primary" size="lg">
									{item.video ? 'Watch Video' : 'View Project'}
								</Button>
								{#if item.metrics}
									<div class="flex space-x-6 text-white text-sm">
										{#each item.metrics as metric (metric.label ?? metric.value)}
											<div class="text-center">
												<div class="font-bold">{metric.value}</div>
												<div class="opacity-80 text-zinc-300">{metric.label}</div>
											</div>
										{/each}
									</div>
								{/if}
							</div>
						</div>

						<!-- Featured Badge -->
						{#if item.featured}
							<div class="absolute top-4 left-4 bg-[var(--color-primary-strong)] text-black px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 shadow-lg shadow-[var(--color-primary-strong)]/40">
								<Award size={14} />
								<span>Featured</span>
							</div>
						{/if}

						<!-- Award Badge -->
						{#if item.award}
							<div class="absolute top-4 right-4 bg-black/70 border border-[var(--color-primary-strong)] text-[var(--color-primary-strong)] px-3 py-1 rounded-full text-sm font-medium backdrop-blur">
								{item.award}
							</div>
						{/if}
					</div>

					<!-- Content -->
					<div class="mt-6 space-y-4">
						<div class="flex items-start justify-between">
							<div class="space-y-2">
								<div class="flex items-center space-x-2 text-sm text-zinc-400">
									<Calendar size={14} />
									<span>{new Date(item.date).toLocaleDateString()}</span>
									<span>•</span>
									<span class="text-[var(--color-primary)] font-medium">{item.category}</span>
								</div>
								<h3 class="text-2xl font-bold text-white group-hover:text-[var(--color-primary)] transition-colors">
									{item.title}
								</h3>
								<p class="text-[var(--color-primary)] font-medium flex items-center space-x-1">
									<Users size={14} />
									<span>{item.client}</span>
								</p>
							</div>
						</div>
						
						<p class="text-zinc-300 leading-relaxed">
							{item.description}
						</p>
						
						<div class="flex flex-wrap gap-2">
							{#each item.tags as tag (tag)}
								<span class="px-3 py-1 bg-zinc-800 text-zinc-300 text-sm rounded-full border border-zinc-700 hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)] transition-colors">
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
