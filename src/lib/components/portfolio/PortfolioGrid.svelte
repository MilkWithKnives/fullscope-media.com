<script lang="ts">
	import { Play, ExternalLink, Calendar, Tag, Award, TrendingUp } from 'lucide-svelte';
	import Card from '../ui/Card.svelte';
	import Button from '../ui/Button.svelte';
	import ScrollReveal from '../ui/ScrollReveal.svelte';
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
		items, 
		columns = 3,
		showMetrics = true,
		animated = true 
	}: { 
		items: PortfolioItem[]; 
		columns?: number;
		showMetrics?: boolean;
		animated?: boolean;
	} = $props();

	const gridClasses = {
		2: 'grid-cols-1 md:grid-cols-2',
		3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
		4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
	};

	function handleItemClick(item: PortfolioItem) {
		console.log('Clicked item:', item);
		// Handle item click - could open modal or navigate to detail page
	}
</script>

<div class="grid {gridClasses[columns]} gap-8">
	{#each items as item, index (item.id)}
		{#if animated}
			<ScrollReveal 
				animation="fade-up" 
				delay={index * 100}
				class="h-full"
			>
				<Card 
					class="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer h-full flex flex-col" 
					padding="none"
					onclick={() => handleItemClick(item)}
				>
					<div class="relative">
						<!-- Image/Video Container -->
						<div class="aspect-video bg-gradient-to-br from-blue-200 to-purple-200 relative overflow-hidden">
							<!-- Placeholder for actual image -->
							<div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
								<div class="text-center space-y-2">
									{#if item.video}
										<Play size={32} class="text-blue-600 mx-auto group-hover:scale-110 transition-transform duration-300" />
										<p class="text-sm text-blue-800 font-medium">Video Project</p>
									{:else}
										<ExternalLink size={32} class="text-blue-600 mx-auto group-hover:scale-110 transition-transform duration-300" />
										<p class="text-sm text-blue-800 font-medium">View Project</p>
									{/if}
								</div>
							</div>
							
							<!-- Hover Overlay -->
							<div class="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
								<div class="text-center space-y-3">
									<Button variant="primary" size="sm">
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
									<div class="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
										<Award size={12} />
										<span>Featured</span>
									</div>
								{/if}
								{#if item.award}
									<div class="bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium">
										{item.award}
									</div>
								{/if}
							</div>

							<!-- Category Badge -->
							<div class="absolute top-3 right-3">
								<span class="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
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
								{#if showMetrics && item.metrics}
									<div class="flex items-center space-x-1 text-green-600">
										<TrendingUp size={14} />
										<span class="text-sm font-medium">{item.metrics[0]?.value}</span>
									</div>
								{/if}
							</div>
							
							<h3 class="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
								{item.title}
							</h3>
							
							<p class="text-sm text-blue-600 font-medium">{item.client}</p>
							
							<p class="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-1">
								{item.description}
							</p>
						</div>
						
						<!-- Metrics -->
						{#if showMetrics && item.metrics}
							<div class="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
								{#each item.metrics.slice(0, 2) as metric}
									<div class="text-center">
										<div class="text-lg font-bold text-blue-600">{metric.value}</div>
										<div class="text-xs text-gray-500">{metric.label}</div>
									</div>
								{/each}
							</div>
						{/if}
						
						<!-- Tags -->
						<div class="flex flex-wrap gap-1 mt-4">
							{#each item.tags.slice(0, 3) as tag}
								<span class="inline-flex items-center space-x-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
									<Tag size={8} />
									<span>{tag}</span>
								</span>
							{/each}
							{#if item.tags.length > 3}
								<span class="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
									+{item.tags.length - 3} more
								</span>
							{/if}
						</div>
					</div>
				</Card>
			</ScrollReveal>
		{:else}
			<Card 
				class="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer h-full flex flex-col" 
				padding="none"
				onclick={() => handleItemClick(item)}
			>
				<!-- Same content as above but without ScrollReveal wrapper -->
				<!-- Content would be duplicated here for non-animated version -->
			</Card>
		{/if}
	{/each}
</div>
