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

	let { 
		title = "Our Portfolio",
		subtitle = "Discover the stories we've told and the results we've achieved",
		showFeaturedCarousel = true,
		showFilters = true,
		showSearch = true
	} = $props();

	let viewMode = $state<'carousel' | 'grid'>('carousel');
	let selectedCategory = $state('all');
	let searchQuery = $state('');

	// Sample portfolio data - replace with real data
	const portfolioItems: PortfolioItem[] = [
		{
			id: 1,
			title: 'Tech Startup Brand Revolution',
			category: 'Video Production',
			client: 'TechFlow Solutions',
			description: 'A comprehensive brand video campaign that helped a tech startup secure $2M in Series A funding through compelling storytelling and professional production.',
			image: '/portfolio/tech-startup.jpg',
			video: '/portfolio/tech-startup.mp4',
			tags: ['Brand Video', 'Startup', 'Technology', 'Funding'],
			date: '2024-01-15',
			featured: true,
			award: 'Best Brand Video 2024',
			results: '200% increase in investor inquiries',
			metrics: [
				{ label: 'Views', value: '50K+' },
				{ label: 'Conversion', value: '15%' },
				{ label: 'Funding Raised', value: '$2M' }
			]
		},
		{
			id: 2,
			title: 'Luxury Restaurant Photography',
			category: 'Photography',
			client: 'Bella Vista Restaurant',
			description: 'Mouth-watering food photography and ambiance shots that transformed the restaurant\'s online presence and increased reservations by 40%.',
			image: '/portfolio/restaurant.jpg',
			tags: ['Food Photography', 'Restaurant', 'Commercial', 'Lifestyle'],
			date: '2024-02-20',
			featured: true,
			results: '40% increase in online orders',
			metrics: [
				{ label: 'Orders Increase', value: '40%' },
				{ label: 'Social Engagement', value: '300%' },
				{ label: 'New Customers', value: '25%' }
			]
		},
		{
			id: 3,
			title: 'Fitness Brand Social Campaign',
			category: 'Digital Marketing',
			client: 'Fitness Plus',
			description: 'Multi-platform social media campaign that generated 2M+ impressions and achieved a 15% engagement rate across all platforms.',
			image: '/portfolio/fitness-campaign.jpg',
			tags: ['Social Media', 'Campaign', 'Digital Marketing', 'Fitness'],
			date: '2024-02-05',
			results: '2M+ impressions, 15% engagement',
			metrics: [
				{ label: 'Impressions', value: '2M+' },
				{ label: 'Engagement', value: '15%' },
				{ label: 'New Followers', value: '10K+' }
			]
		},
		{
			id: 4,
			title: 'Corporate Event Documentation',
			category: 'Video Production',
			client: 'Global Industries',
			description: 'Professional event coverage for Fortune 500 company annual conference, including live streaming and post-event highlight reel.',
			image: '/portfolio/corporate-event.jpg',
			video: '/portfolio/corporate-event.mp4',
			tags: ['Event Video', 'Corporate', 'Live Coverage', 'Fortune 500'],
			date: '2024-01-30',
			results: 'Successful live stream to 5K+ viewers',
			metrics: [
				{ label: 'Live Viewers', value: '5K+' },
				{ label: 'Video Views', value: '25K+' },
				{ label: 'Client Satisfaction', value: '5/5' }
			]
		},
		{
			id: 5,
			title: 'Luxury Watch Product Catalog',
			category: 'Photography',
			client: 'Timepiece Luxury',
			description: 'High-end product photography for luxury watch brand catalog, featuring macro details and lifestyle shots that elevated brand perception.',
			image: '/portfolio/luxury-watches.jpg',
			tags: ['Product Photography', 'Luxury', 'Catalog', 'Macro'],
			date: '2024-03-25',
			results: '30% increase in online sales',
			metrics: [
				{ label: 'Sales Increase', value: '30%' },
				{ label: 'Catalog Downloads', value: '15K+' },
				{ label: 'Brand Perception', value: '+25%' }
			]
		}
	];

	const categories = [
		{ id: 'all', name: 'All Projects', count: portfolioItems.length },
		{ id: 'Video Production', name: 'Video Production', count: portfolioItems.filter(item => item.category === 'Video Production').length },
		{ id: 'Photography', name: 'Photography', count: portfolioItems.filter(item => item.category === 'Photography').length },
		{ id: 'Digital Marketing', name: 'Digital Marketing', count: portfolioItems.filter(item => item.category === 'Digital Marketing').length }
	];

	// Featured items for carousel
	const featuredItems = $derived(portfolioItems.filter((item) => item.featured));
	
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
							{#each categories as category}
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
