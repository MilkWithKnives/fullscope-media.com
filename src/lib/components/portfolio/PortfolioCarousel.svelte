<script lang="ts">
	import emblaCarouselSvelte from 'embla-carousel-svelte';
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

	let { items, options = {} }: { items: PortfolioItem[]; options?: Record<string, unknown> } = $props();

	const prefersReducedMotion =
		typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	const baseOptions = {
		loop: true,
		align: 'start',
		skipSnaps: false,
		dragFree: false
	};

	const emblaOptions = $derived({
		...baseOptions,
		...options
	});

	let emblaApi: any;
	const slides = $derived(items ?? []);

	const scrollTo = (index: number) => emblaApi?.scrollTo(index);
	const next = () => emblaApi?.scrollNext();
	const prev = () => emblaApi?.scrollPrev();
</script>

<div class="embla">
	<div
		class="embla__viewport"
		use:emblaCarouselSvelte={{ options: emblaOptions }}
		onemblaInit={(event) => (emblaApi = event.detail)}
	>
		<div class="embla__container">
			{#each slides as item (item.id)}
				<div class="embla__slide">
					<div class="relative group h-full cursor-pointer" role="button" tabindex="0" aria-label={`View ${item.title} project details`}>
						<div class="relative aspect-video bg-gradient-to-br from-[#121212] via-[#0f0f0f] to-[#090909] rounded-2xl overflow-hidden">
							{#if item.image}
								<img
									src={item.image}
									alt={`${item.title} project preview`}
									loading="lazy"
									decoding="async"
									class="absolute inset-0 h-full w-full object-cover"
								/>
							{:else}
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

							{#if item.featured}
								<div class="absolute top-4 left-4 bg-[var(--color-primary-strong)] text-black px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 shadow-lg shadow-[var(--color-primary-strong)]/40">
									<Award size={14} />
									<span>Featured</span>
								</div>
							{/if}

							{#if item.award}
								<div class="absolute top-4 right-4 bg-black/70 border border-[var(--color-primary-strong)] text-[var(--color-primary-strong)] px-3 py-1 rounded-full text-sm font-medium backdrop-blur">
									{item.award}
								</div>
							{/if}
						</div>

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
				</div>
			{/each}
		</div>
	</div>

	{#if slides.length > 1}
		<div class="flex items-center justify-between mt-4">
			<div class="flex items-center gap-3">
				<button class="nav-btn" onclick={prev} aria-label="Previous slide">←</button>
				<button class="nav-btn" onclick={next} aria-label="Next slide">→</button>
			</div>
			<div class="flex items-center gap-2">
				{#each slides as _, idx (idx)}
					<button
						class="dot-btn"
						aria-label={`Go to slide ${idx + 1}`}
						onclick={() => scrollTo(idx)}
					></button>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.embla {
		overflow: hidden;
		width: 100%;
	}
	.embla__viewport {
		overflow: hidden;
	}
	.embla__container {
		display: flex;
		column-gap: clamp(1rem, 2vw, 1.75rem);
	}
	.embla__slide {
		flex: 0 0 90%;
		min-width: 0;
	}
	@media (min-width: 768px) {
		.embla__slide {
			flex: 0 0 70%;
		}
	}
	@media (min-width: 1100px) {
		.embla__slide {
			flex: 0 0 60%;
		}
	}
	.nav-btn {
		padding: 0.25rem 0.75rem;
		border-radius: 9999px;
		background: #18181b;
		border: 1px solid #3f3f46;
		color: #e5e7eb;
		transition: color 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
	}
	.nav-btn:hover,
	.nav-btn:focus-visible {
		color: var(--color-primary);
		border-color: var(--color-primary);
		background: #111114;
	}
	.dot-btn {
		height: 10px;
		width: 10px;
		border-radius: 9999px;
		background: #3f3f46;
		border: 1px solid #52525b;
		transition: all 0.2s ease;
	}
	.dot-btn:focus,
	.dot-btn:hover {
		background: var(--color-primary);
		border-color: var(--color-primary);
	}
</style>
