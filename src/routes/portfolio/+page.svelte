<script lang="ts">
	import Container from '$lib/components/ui/Container.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { resolve } from '$app/paths';
	import { categories } from '$lib/data/portfolio';

	const categoryDescriptions: Record<string, string> = {
		interior: 'Clean, true-to-color interiors with straight lines and balanced windows.',
		exterior: 'Twilight and daylight curb appeal that keeps MLS safe and eye-catching.',
		'3d-tours': 'Matterport and Zillow 3D Home walkthroughs that show flow and scale.',
		drone: 'FAA-compliant aerials for lot context, amenities, and hero shots.',
		portraits: 'Studio and environmental portraits for teams, LinkedIn, and press.',
		'side-projects': 'Experimental and branded work: virtual staging, video, and specials.'
	};

	const portfolioCategories = categories.filter((c) => c.id !== 'all');
</script>

<svelte:head>
	<title>Portfolio - Full Scope Media</title>
	<meta
		name="description"
		content="Real estate interiors, exteriors, 3D tours, drone, portraits, and side projects."
	/>
</svelte:head>

<section class="py-20 bg-black text-white">
	<Container>
		<div class="text-center space-y-4 mb-12">
			<p class="text-sm uppercase tracking-[0.2em] text-[var(--color-primary)]">Portfolio</p>
			<h1 class="text-4xl md:text-5xl font-bold">Work that moves listings and brands</h1>
			<p class="text-xl text-zinc-400 max-w-3xl mx-auto">
				Browse by category to see focused examples and carousels of recent sets.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
			{#each portfolioCategories as cat (cat.id)}
				{@const Icon = cat.icon}
				<Card class="h-full bg-zinc-900 border border-zinc-800 hover:border-[var(--color-primary)]/60 transition-colors">
					<div class="flex items-start gap-4">
						<div class="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center">
							<Icon size={24} class="text-[var(--color-primary)]" />
						</div>
						<div class="space-y-2">
							<h2 class="text-2xl font-semibold">{cat.name}</h2>
							<p class="text-zinc-400 text-sm leading-relaxed">
								{categoryDescriptions[cat.id] || 'Selected work in this category.'}
							</p>
							<Button variant="primary" class="mt-2">
								<a href={resolve(`/portfolio/${cat.id}`)}>View {cat.name}</a>
							</Button>
						</div>
					</div>
				</Card>
			{/each}
		</div>
	</Container>
</section>
