<script lang="ts">
	import 'flowbite-svelte/dist/flowbite.css';
	import { Carousel, Controls, CarouselIndicators, Thumbnails } from 'flowbite-svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Calendar from 'lucide-svelte/icons/calendar';
	import Tag from 'lucide-svelte/icons/tag';
	import type { PageData } from './$types';
	import { resolve } from '$app/paths';

	let { data } = $props<{ data: PageData }>();

	let index = $state(0);
	const images = $derived(
		data.items
			.filter((item) => item.image)
			.map((item) => ({
				src: item.image!,
				alt: item.title
			}))
	);
</script>

<svelte:head>
	<title>{data.categoryName} Portfolio - Full Scope Media</title>
	<meta name="description" content={`Projects in ${data.categoryName}`} />
</svelte:head>

<section class="py-16 bg-black min-h-screen text-white">
	<Container>
		<div class="mb-10 text-center space-y-3">
			<p class="text-sm uppercase tracking-[0.2em] text-[var(--color-primary)]">Portfolio</p>
			<h1 class="text-3xl md:text-4xl font-bold">{data.categoryName}</h1>
			<p class="text-zinc-400">
				Selected work highlighting our {data.categoryName.toLowerCase()} projects.
			</p>
			<a href={resolve('/portfolio')} class="text-[var(--color-primary)] hover:underline text-sm">
				← Back to all work
			</a>
		</div>

		{#if images.length}
			<div class="max-w-5xl mx-auto mb-12 space-y-4">
				<Carousel {images} bind:index>
					<Controls />
					<CarouselIndicators />
				</Carousel>
				<Thumbnails {images} bind:index />
			</div>
		{:else}
			<p class="text-center text-zinc-500 mb-12">No media available yet.</p>
		{/if}

		{#if data.items.length === 0}
			<p class="text-center text-zinc-500">No projects in this category yet.</p>
		{:else}
			<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
				{#each data.items as item (item.id)}
					<Card class="overflow-hidden border border-zinc-800 bg-zinc-900">
						{#if item.image}
							<div class="aspect-[4/3] overflow-hidden">
								<img src={item.image} alt={item.title} class="w-full h-full object-cover" loading="lazy" />
							</div>
						{/if}
						<div class="p-6 space-y-4">
							<div class="flex items-start justify-between gap-3">
								<div>
									<h2 class="text-xl font-semibold text-white">{item.title}</h2>
									{#if item.client}<p class="text-sm font-medium text-[var(--color-primary)]">{item.client}</p>{/if}
								</div>
								{#if item.date}
									<div class="flex items-center space-x-1 text-sm text-zinc-400">
										<Calendar size={14} />
										<span>{new Date(item.date).toLocaleDateString()}</span>
									</div>
								{/if}
							</div>
							{#if item.description}
								<p class="text-zinc-300 text-sm leading-relaxed">{item.description}</p>
							{/if}
							{#if item.tags?.length}
								<div class="flex flex-wrap gap-2">
									{#each item.tags as tag (tag)}
										<span class="inline-flex items-center space-x-1 px-3 py-1.5 bg-zinc-800 text-zinc-200 text-xs rounded-full border border-zinc-700">
											<Tag size={10} />
											<span>{tag}</span>
										</span>
									{/each}
								</div>
							{/if}
							{#if item.results}
								<div class="text-sm text-zinc-400 font-semibold">{item.results}</div>
							{/if}
						</div>
					</Card>
				{/each}
			</div>
		{/if}
	</Container>
</section>
