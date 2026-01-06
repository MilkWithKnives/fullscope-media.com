<script lang="ts">
	import Container from '$lib/components/ui/Container.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Calendar from 'lucide-svelte/icons/calendar';
	import Tag from 'lucide-svelte/icons/tag';
	import Eye from 'lucide-svelte/icons/eye';
	import Play from 'lucide-svelte/icons/play';
	import ExternalLink from 'lucide-svelte/icons/external-link';
	import TrendingUp from 'lucide-svelte/icons/trending-up';
	import Award from 'lucide-svelte/icons/award';
	import type { PageData } from './$types';

	export let data: PageData;

	let currentSlide = 0;
	const images = data.items.map((item) => ({
		src: item.image,
		alt: item.title
	}));

	const next = () => (currentSlide = (currentSlide + 1) % images.length);
	const prev = () => (currentSlide = (currentSlide - 1 + images.length) % images.length);

	const iconFor = (category: string) => {
		if (category === 'video') return Play;
		if (category === 'photography') return ExternalLink;
		if (category === 'marketing') return TrendingUp;
		return Award;
	};
</script>

<svelte:head>
	<title>{data.categoryName} Portfolio - Full Scope Media</title>
	<meta name="description" content={`Projects in ${data.categoryName}`} />
</svelte:head>

<section class="py-16 bg-black min-h-screen">
	<Container>
		<div class="mb-10 text-center space-y-3">
			<p class="text-sm uppercase tracking-[0.2em] text-[var(--color-primary)]">Portfolio</p>
			<h1 class="text-3xl md:text-4xl font-bold text-white">
				{data.categoryName}
			</h1>
	<p class="text-zinc-400">
		Selected work highlighting our {data.categoryName.toLowerCase()} projects.
	</p>
	<a href="/portfolio" class="text-[var(--color-primary)] hover:underline text-sm">
		← Back to all work
	</a>
</div>

{#if images.length}
	<div class="max-w-5xl mx-auto mb-12">
		<div class="relative overflow-hidden rounded-3xl border border-zinc-800 shadow-lg">
			{#each images as image, idx}
				<div class="absolute inset-0 transition-opacity duration-500 {idx === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}">
					<img src={image.src} alt={image.alt} class="w-full h-[320px] md:h-[420px] object-cover" loading="lazy" />
					<div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
					<div class="absolute bottom-4 left-4 text-white">
						<p class="text-lg font-semibold">{image.alt}</p>
					</div>
				</div>
			{/each}
			<button
				class="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
				on:click={prev}
				aria-label="Previous slide"
			>
				&lt;
			</button>
			<button
				class="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
				on:click={next}
				aria-label="Next slide"
			>
				&gt;
			</button>
			<div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
				{#each images as _, i}
					<button
						class="h-2.5 w-2.5 rounded-full border border-zinc-500 transition-all {i === currentSlide ? 'bg-[var(--color-primary)]' : 'bg-zinc-600'}"
						on:click={() => (currentSlide = i)}
						aria-label={`Go to slide ${i + 1}`}
					/>
				{/each}
			</div>
		</div>
	</div>
{/if}

{#if data.items.length === 0}
	<p class="text-center text-zinc-500">No projects in this category yet.</p>
{:else}
	<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
		{#each data.items as item}
					<Card class="overflow-hidden border border-zinc-800 bg-zinc-900">
						<div class="relative overflow-hidden">
							<div class="aspect-[4/3] overflow-hidden">
								<img src={item.image} alt={item.title} class="w-full h-full object-cover" loading="lazy" />
							</div>
							<div class="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-500 bg-black/60">
								<div class="bg-zinc-900/90 backdrop-blur-md rounded-2xl px-5 py-3 border border-zinc-700 flex items-center space-x-2 text-white">
									<Eye size={18} />
									<span>Project Details</span>
								</div>
							</div>
							<div class="absolute top-4 left-4">
								<span class="inline-flex items-center space-x-2 px-3 py-1.5 bg-black/80 backdrop-blur-md rounded-full text-xs font-semibold text-white border border-zinc-700">
									<svelte:component this={iconFor(item.category)} size={14} class="text-[var(--color-primary)]" />
									<span class="capitalize">{item.category}</span>
								</span>
							</div>
						</div>
						<div class="p-6 space-y-4">
							<div class="flex items-start justify-between gap-3">
								<div>
									<h2 class="text-xl font-semibold text-white">{item.title}</h2>
									<p class="text-sm font-medium text-[var(--color-primary)]">{item.client}</p>
								</div>
								<div class="flex items-center space-x-1 text-sm text-zinc-400">
									<Calendar size={14} />
									<span>{new Date(item.date).toLocaleDateString()}</span>
								</div>
							</div>
							<p class="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{item.description}</p>
							<div class="flex flex-wrap gap-2">
								{#each item.tags as tag}
									<span class="inline-flex items-center space-x-1 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs rounded-full border border-gray-200 dark:border-gray-700">
										<Tag size={10} />
										<span>{tag}</span>
									</span>
								{/each}
							</div>
							<div class="text-sm text-gray-600 dark:text-gray-300 font-semibold">{item.results}</div>
						</div>
					</Card>
				{/each}
			</div>
		{/if}
	</Container>
</section>
