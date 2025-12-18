<script lang="ts">
	import Play from 'lucide-svelte/icons/play';
	import ExternalLink from 'lucide-svelte/icons/external-link';
	import Calendar from 'lucide-svelte/icons/calendar';
	import Tag from 'lucide-svelte/icons/tag';
	import Award from 'lucide-svelte/icons/award';
	import TrendingUp from 'lucide-svelte/icons/trending-up';
	import Card from '../ui/Card.svelte';
	import Button from '../ui/Button.svelte';
	import ScrollReveal from '../ui/ScrollReveal.svelte';
	import { createEventDispatcher } from 'svelte';

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
		results?: string;
	}

	type ColumnCount = 2 | 3 | 4;

	let { 
		items, 
		columns = 3 as ColumnCount,
		showMetrics = true,
		animated = true 
	}: { 
		items: PortfolioItem[]; 
		columns?: ColumnCount;
		showMetrics?: boolean;
		animated?: boolean;
	} = $props();

	const prefersReducedMotion =
		typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	const shouldAnimate = $derived(animated && !prefersReducedMotion);

	const dispatch = createEventDispatcher<{ view: PortfolioItem }>();

	const gridClasses: Record<ColumnCount, string> = {
		2: 'grid-cols-1 md:grid-cols-2',
		3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
		4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
	};

	function handleItemClick(item: PortfolioItem) {
		dispatch('view', item);
	}

	function handleItemKeydown(event: KeyboardEvent, item: PortfolioItem) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleItemClick(item);
		}
	}
</script>

<div class="grid {gridClasses[columns]} gap-8">
	{#each items as item, index (item.id)}
		{#if shouldAnimate}
			<ScrollReveal 
				animation="fade-up" 
				delay={Math.min(index * 75, 600)}
				class="h-full"
			>
				{@render CardBody({ item })}
			</ScrollReveal>
		{:else}
			{@render CardBody({ item })}
		{/if}
	{/each}
</div>

{#snippet CardBody({ item }: { item: PortfolioItem })}
	<Card
		class="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer h-full flex flex-col focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-strong)] focus:ring-offset-2"
		padding="none"
		onclick={() => handleItemClick(item)}
		onkeydown={(event) => handleItemKeydown(event, item)}
		role="button"
		tabindex={0}
		aria-label={`View ${item.title} project details`}
	>
		<div class="relative">
			<!-- Image/Video Container -->
			<div class="aspect-video bg-gradient-to-br from-[#121212] via-[#0f0f0f] to-[#090909] relative overflow-hidden">
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
						<div class="text-center space-y-2">
							{#if item.video}
								<Play size={32} class="text-[var(--color-primary-strong)] mx-auto group-hover:scale-110 transition-transform duration-300" />
								<p class="text-sm text-gray-200 font-medium">Video Project</p>
							{:else}
								<ExternalLink size={32} class="text-[var(--color-primary-strong)] mx-auto group-hover:scale-110 transition-transform duration-300" />
								<p class="text-sm text-gray-200 font-medium">View Project</p>
							{/if}
						</div>
					</div>
				{/if}

				<!-- Hover Overlay -->
				<div class="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
					<div class="text-center space-y-3">
						<Button
							variant="primary"
							size="sm"
							aria-label={item.video ? `Watch video for ${item.title}` : `View details for ${item.title}`}
							onclick={(event) => {
								event.stopPropagation();
								handleItemClick(item);
							}}
						>
							{item.video ? 'Watch Video' : 'View Details'}
						</Button>
						{#if item.results}
							<p class="text-white text-sm px-4">{item.results}</p>
						{/if}
					</div>
				</div>

				<!-- Badges -->
				<div class="absolute top-3 left-3 flex flex-col space-y-2">
					{#if item.featured}
						<div class="bg-[var(--color-primary-strong)] text-black px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 shadow-md shadow-[var(--color-primary-strong)]/40">
							<Award size={12} />
							<span>Featured</span>
						</div>
					{/if}
					{#if item.award}
						<div class="bg-black/70 border border-[var(--color-primary-strong)] text-[var(--color-primary-strong)] px-2 py-1 rounded-full text-xs font-medium backdrop-blur">
							{item.award}
						</div>
					{/if}
				</div>

				<!-- Category Badge -->
				<div class="absolute top-3 right-3">
					<span class="bg-[var(--color-primary-strong)] text-black px-2 py-1 rounded-full text-xs font-medium shadow-md shadow-[var(--color-primary-strong)]/30">
						{item.category}
					</span>
				</div>
			</div>
		</div>

		<!-- Content -->
		<div class="p-6 flex-1 flex flex-col">
			<div class="space-y-3 flex-1">
				<div class="flex items-center justify-between">
					<div class="flex items-center space-x-2 text-sm text-gray-500">
						<Calendar size={14} />
						<span>{new Date(item.date).toLocaleDateString()}</span>
					</div>
					{#if showMetrics && item.metrics?.length}
						<div class="flex items-center space-x-1 text-[var(--color-primary-strong)]">
							<TrendingUp size={14} />
							<span class="text-sm font-medium">{item.metrics[0]?.value}</span>
						</div>
					{/if}
				</div>

				<h3 class="text-lg font-bold text-gray-900 group-hover:text-[var(--color-primary-strong)] transition-colors line-clamp-2">
					{item.title}
				</h3>

				<p class="text-sm text-[var(--color-primary-strong)] font-medium">{item.client}</p>

				<p class="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-1">
					{item.description}
				</p>
			</div>

			<!-- Metrics -->
			{#if showMetrics && item.metrics?.length}
				<div class="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
					{#each item.metrics.slice(0, 2) as metric (metric.label ?? metric.value)}
						<div class="text-center">
							<div class="text-lg font-bold text-[var(--color-primary-strong)]">{metric.value}</div>
							<div class="text-xs text-gray-500">{metric.label}</div>
						</div>
					{/each}
				</div>
			{/if}

			<!-- Tags -->
			<div class="flex flex-wrap gap-1 mt-4">
				{#each item.tags.slice(0, 3) as tag (tag)}
					<span class="inline-flex items-center space-x-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full border border-gray-200 hover:bg-[var(--color-primary)] hover:text-black transition-colors">
						<Tag size={8} />
						<span>{tag}</span>
					</span>
				{/each}
				{#if item.tags.length > 3}
					<span class="px-2 py-1 bg-[var(--color-primary)] text-black text-xs rounded-full">
						+{item.tags.length - 3} more
					</span>
				{/if}
			</div>
		</div>
	</Card>
{/snippet}
