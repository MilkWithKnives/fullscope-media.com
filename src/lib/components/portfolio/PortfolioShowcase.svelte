<script lang="ts">
	import Container from '../ui/Container.svelte';
	import Button from '../ui/Button.svelte';
	import PortfolioCarousel from './PortfolioCarousel.svelte';
	import PortfolioGrid from './PortfolioGrid.svelte';
	import Grid from 'lucide-svelte/icons/grid';
	import List from 'lucide-svelte/icons/list';
	import Filter from 'lucide-svelte/icons/filter';
	import Search from 'lucide-svelte/icons/search';
	import { resolve } from '$app/paths';
	import { cn } from '$lib/utils';
	import { categories, portfolioItems } from '$lib/data/portfolio';

	let { 
		title = "Our Portfolio",
		subtitle = "Discover the stories we've told and the results we've achieved",
		showFeaturedCarousel = true,
		showFilters = true,
		showSearch = true
	} = $props();

	let viewMode = $state<'carousel' | 'grid'>('carousel');
	let selectedCategory = $state<'all' | typeof categories[number]['id']>('all');
	let searchQuery = $state('');

	const categoryCounts = $derived(
		categories.map((cat) => ({
			...cat,
			count:
				cat.id === 'all'
					? portfolioItems.length
					: portfolioItems.filter((item) => item.category === cat.id).length
		}))
	);

	// Featured items for carousel
	const featuredItems = $derived(portfolioItems.slice(0, 8));
	const categoryLinks = $derived(categoryCounts.filter((c) => c.id !== 'all'));
	
	// Filtered items for grid
	const filteredItems = $derived(portfolioItems.filter((item) => {
		const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
		const matchesSearch = searchQuery === '' || 
			item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
		return matchesCategory && matchesSearch;
	}));
</script>

<section class="py-24 bg-black">
	<Container>
		<!-- Header -->
		<div class="text-center mb-16">
			<h2 class="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
			<p class="text-xl text-zinc-400 max-w-3xl mx-auto">{subtitle}</p>
		</div>

		<!-- All-items Carousel -->
		<div class="mb-16">
			<h3 class="text-2xl font-bold text-white mb-6 text-center">Featured Highlights</h3>
			<PortfolioCarousel items={featuredItems} />
		</div>

		<!-- Quick category links -->
			<div class="flex flex-wrap justify-center gap-3 mb-12">
				{#each categoryLinks as cat (cat.id)}
					{@const Icon = cat.icon}
					<a
						href={resolve(`/portfolio/${cat.id}`)}
						class="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900 hover:border-[var(--color-primary)]/50 hover:text-[var(--color-primary)] transition-colors text-sm"
					>
						<Icon size={14} />
						<span>{cat.name}</span>
						<span class="text-xs text-zinc-500">({cat.count})</span>
				</a>
			{/each}
		</div>

		<!-- Featured Carousel -->
		{#if showFeaturedCarousel && featuredItems.length > 0}
			<div class="mb-16">
				<div class="flex items-center justify-between mb-8">
					<h3 class="text-2xl font-bold text-white">Featured Projects</h3>
					<div class="flex items-center space-x-2">
						<span class="text-sm text-zinc-500">View:</span>
						<button
							onclick={() => viewMode = 'carousel'}
							class={cn(
								'p-2 rounded-lg transition-colors',
								viewMode === 'carousel' ? 'bg-[var(--color-primary)] text-black' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
							)}
						>
							<List size={16} />
						</button>
						<button
							onclick={() => viewMode = 'grid'}
							class={cn(
								'p-2 rounded-lg transition-colors',
								viewMode === 'grid' ? 'bg-[var(--color-primary)] text-black' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
							)}
						>
							<Grid size={16} />
						</button>
					</div>
				</div>

				{#if viewMode === 'carousel'}
					<PortfolioCarousel items={featuredItems} />
				{:else}
					<PortfolioGrid items={featuredItems} columns={2} />
				{/if}
			</div>
		{/if}

		<!-- Filters and Search -->
		{#if showFilters || showSearch}
			<div class="mb-12">
				<div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
					<!-- Category Filters -->
					{#if showFilters}
						<div class="flex flex-wrap gap-3">
							{#each categoryCounts as category (category.id)}
								<button
									onclick={() => selectedCategory = category.id}
									class={cn(
										'px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center space-x-2',
										selectedCategory === category.id
											? 'bg-[var(--color-primary)] text-black shadow-lg'
											: 'bg-zinc-900 text-zinc-300 hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)] border border-zinc-800'
									)}
								>
									<Filter size={14} />
									<span>{category.name}</span>
									<span class="bg-black/20 text-xs px-2 py-0.5 rounded-full">
										{category.count}
									</span>
								</button>
							{/each}
						</div>
					{/if}

					<!-- Search -->
					{#if showSearch}
						<div class="relative">
							<Search size={20} class="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500" />
							<input
								type="text"
								bind:value={searchQuery}
								placeholder="Search projects, clients, or tags..."
								class="pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-700 text-white rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent w-full lg:w-80 placeholder-zinc-500"
							/>
						</div>
					{/if}
				</div>
			</div>
		{/if}

		<!-- All Projects Grid -->
		<div class="mb-12">
			<h3 class="text-2xl font-bold text-white mb-8">
				All Projects
				<span class="text-lg font-normal text-zinc-500">({filteredItems.length} projects)</span>
			</h3>

			{#if filteredItems.length > 0}
				<PortfolioGrid items={filteredItems} columns={3} />
			{:else}
				<div class="text-center py-12">
					<p class="text-zinc-500 text-lg">No projects found matching your criteria.</p>
					<Button
						variant="outline"
						class="mt-4"
						onclick={() => { selectedCategory = 'all'; searchQuery = ''; }}
					>
						Clear Filters
					</Button>
				</div>
			{/if}
		</div>

		<!-- CTA -->
		<div class="text-center">
			<div class="bg-zinc-900 rounded-2xl p-8 border border-zinc-800">
				<h3 class="text-2xl font-bold text-white mb-4">Ready to Create Your Success Story?</h3>
				<p class="text-zinc-400 mb-6 max-w-2xl mx-auto">
					Let's discuss your project and create something that not only looks amazing but drives real results for your business.
				</p>
					<div class="flex flex-col sm:flex-row gap-4 justify-center">
						<Button variant="primary" size="lg">
							<a href={resolve('/contact')}>Start Your Project</a>
						</Button>
						<Button variant="outline" size="lg">
							<a href={resolve('/services')}>View Our Services</a>
						</Button>
					</div>
				</div>
			</div>
		</Container>
</section>
