<script lang="ts">
	import Container from '$lib/components/ui/Container.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Play from 'lucide-svelte/icons/play';
	import ExternalLink from 'lucide-svelte/icons/external-link';
	import Calendar from 'lucide-svelte/icons/calendar';
	import Tag from 'lucide-svelte/icons/tag';
	import Moon from 'lucide-svelte/icons/moon';
	import Sun from 'lucide-svelte/icons/sun';
	import Eye from 'lucide-svelte/icons/eye';
	import Award from 'lucide-svelte/icons/award';
	import Users from 'lucide-svelte/icons/users';
	import TrendingUp from 'lucide-svelte/icons/trending-up';
	import { browser } from '$app/environment';
	import { categories, portfolioItems } from '$lib/data/portfolio';

	// Theme state
	let isDarkMode = $state(false);

	// Initialize theme from localStorage
	$effect(() => {
		if (browser) {
			const stored = localStorage.getItem('theme');
			isDarkMode = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
			updateTheme();
		}
	});

	// Update theme
	function updateTheme() {
		if (browser) {
			document.documentElement.classList.toggle('dark', isDarkMode);
			localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
		}
	}

	function toggleTheme() {
		isDarkMode = !isDarkMode;
		updateTheme();
	}

	let selectedCategory = $state('all');

	// Filtered portfolio items
	const filteredItems = $derived(
		selectedCategory === 'all' 
			? portfolioItems 
			: portfolioItems.filter(item => item.category === selectedCategory)
	);
</script>

<!-- Portfolio Grid -->
			<section class="py-24 bg-[#0a0a0a] text-white relative overflow-hidden">
				<!-- Animated background texture -->
				<div class="absolute inset-0 bg-texture-subtle opacity-20 animate-texture-drift"></div>
				<div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[var(--color-primary)]/10 via-transparent to-white/5"></div>

				<Container>
					<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 relative z-10">
						{#each filteredItems as item, index}
							<div class="group relative bg-[#0f0f0f] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-6 hover:rotate-1 border border-white/5 animate-card-appear hover:scale-105" style="animation-delay: {index * 0.15}s;">
								<!-- Animated border gradient -->
								<div class="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-strong)] via-[var(--color-primary)] to-[var(--color-primary-strong)] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-gradient-rotate"></div>
								<div class="absolute inset-0.5 bg-[#0f0f0f] rounded-3xl"></div>

								<div class="relative z-10">
									<div class="relative overflow-hidden rounded-t-3xl">
										<!-- Project Image -->
										<div class="aspect-[4/3] overflow-hidden">
											<img
												src={item.image}
												alt={item.title}
												class="w-full h-full object-cover transition-all duration-1000 group-hover:scale-125 group-hover:rotate-2"
												loading="lazy"
											/>
										</div>

										<!-- Animated overlay -->
									<div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

										<!-- Floating category badge -->
										<div class="absolute top-6 left-6 transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
											<span class="inline-flex items-center space-x-2 px-4 py-2 bg-black/70 backdrop-blur-md rounded-2xl text-xs font-semibold text-white border border-white/20 shadow-lg">
												{#if item.category === 'video'}
													<Play size={14} class="text-[var(--color-primary-strong)] animate-pulse" />
												{:else if item.category === 'photography'}
													<ExternalLink size={14} class="text-[var(--color-primary-strong)] animate-bounce-gentle" />
												{:else if item.category === 'marketing'}
													<TrendingUp size={14} class="text-[var(--color-primary-strong)] animate-pulse" />
												{:else}
													<Award size={14} class="text-[var(--color-primary-strong)] animate-bounce-gentle" />
												{/if}
												<span class="capitalize">{item.category}</span>
											</span>
										</div>

										<!-- Enhanced Results Badge -->
										<div class="absolute top-6 right-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
											<div class="bg-gradient-to-r from-[var(--color-primary-strong)] to-[var(--color-primary)] text-black px-4 py-2 rounded-2xl text-xs font-bold shadow-xl border border-white/10 animate-result-glow">
												{item.results}
											</div>
										</div>

										<!-- Animated view overlay -->
										<div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-100 scale-75">
											<a
												href={`/portfolio/${item.category}`}
												class="bg-black/50 backdrop-blur-md rounded-2xl p-6 border border-white/20 animate-pulse-gentle shadow-2xl flex items-center space-x-3 text-white"
											>
												<Eye size={24} class="animate-bounce-gentle" />
												<span class="font-semibold text-lg">View {item.category} work</span>
											</a>
										</div>
								</div>

								</div>

								<div class="p-8 space-y-6">
									<div class="space-y-3">
										<div class="flex items-start justify-between">
											<h3 class="text-xl font-bold text-white group-hover:text-[var(--color-primary-strong)] transition-colors duration-300 leading-tight">
												{item.title}
											</h3>
											<div class="flex items-center space-x-1 text-sm text-gray-400 ml-4">
												<Calendar size={14} />
												<span>{new Date(item.date).toLocaleDateString()}</span>
											</div>
										</div>
										<p class="text-sm font-semibold text-[var(--color-primary-strong)]">{item.client}</p>
									</div>

									<p class="text-gray-300 leading-relaxed">
										{item.description}
									</p>

									<div class="flex flex-wrap gap-2">
										{#each item.tags as tag}
											<span class="inline-flex items-center space-x-1 px-3 py-1.5 bg-white/5 text-gray-100 text-xs rounded-full border border-white/10 hover:bg-[var(--color-primary)] hover:text-black transition-colors duration-300">
												<Tag size={10} />
												<span>{tag}</span>
											</span>
										{/each}
									</div>
								</div>
							</div>
						{/each}
					</div>

					{#if filteredItems.length === 0}
						<div class="text-center py-16 text-white/90">
							<div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4">
								<ExternalLink size={32} class="text-white/70" />
							</div>
							<p class="text-lg">No projects found in this category.</p>
							<p class="text-sm mt-2 text-white/70">Try selecting a different category to explore our work.</p>
						</div>
					{/if}
				</Container>
			</section>

			<!-- Interactive Flip Card -->
			<section class="bg-[#0a0a0a] text-white pb-16">
				<Container>
					<div class="flex justify-center">
						<div class="flip-card">
							<div class="flip-card-inner">
								<div class="flip-card-front">
									<p class="title">Featured Reel</p>
									<p>Hover me</p>
								</div>
								<div class="flip-card-back">
									<p class="title">View Portfolio</p>
									<p>Explore highlights</p>
								</div>
							</div>
						</div>
					</div>
				</Container>
			</section>

			<!-- Category link cards -->
			<section class="py-16 bg-black text-white border-b border-zinc-800">
				<Container>
					<div class="text-center mb-10 space-y-2">
						<p class="text-sm uppercase tracking-[0.2em] text-[var(--color-primary-strong)]">Browse</p>
						<h2 class="text-3xl font-bold">Explore by category</h2>
						<p class="text-zinc-400">Jump straight to the work you care about.</p>
					</div>
					<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
						{#each categories.filter((c) => c.id !== 'all') as cat}
							<a
								href={`/portfolio/${cat.id}`}
								class="block h-full rounded-2xl border border-zinc-800 shadow-none hover:shadow-none transition-all duration-300 hover:-translate-y-1 bg-zinc-900 p-6"
							>
								<div class="flex items-center justify-between mb-4">
									<div class="h-12 w-12 flex items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary-strong)]">
										<svelte:component this={cat.icon} size={22} />
									</div>
									<span class="text-sm text-[var(--color-primary-strong)] font-semibold">View</span>
								</div>
								<h3 class="text-xl font-semibold mb-2 capitalize text-white">{cat.name}</h3>
								<p class="text-sm text-zinc-400">See our latest {cat.name.toLowerCase()} projects and case studies.</p>
							</a>
						{/each}
					</div>
				</Container>
			</section>

<!-- Filter Tabs -->
<section class="py-20 bg-black border-b border-zinc-800 relative overflow-hidden">
	<!-- Animated background elements -->
	<div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--color-primary-strong)] to-[var(--color-primary)] animate-gradient-x"></div>
	<div class="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-[var(--color-primary)]/10 to-white/5 rounded-full blur-3xl animate-float-slow"></div>
	<div class="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-br from-black/5 to-[var(--color-primary)]/10 rounded-full blur-3xl animate-float-reverse"></div>

	<Container>
		<div class="text-center mb-16 relative z-10">
			<h2 class="text-4xl md:text-5xl font-bold text-white mb-6 animate-slide-up">
				<span class="bg-gradient-to-r from-[var(--color-primary-strong)] to-[var(--color-primary)] bg-clip-text text-transparent">Explore</span> Our Work
			</h2>
			<p class="text-lg text-zinc-300 max-w-3xl mx-auto animate-slide-up" style="animation-delay: 0.2s;">
				Filter by category to see specific types of projects and their measurable impact on our clients' success
			</p>
		</div>

		<div class="flex flex-wrap justify-center gap-6 relative z-10">
			{#each categories as category, index}
				<button
					onclick={() => selectedCategory = category.id}
					class="group relative flex items-center space-x-3 px-10 py-5 rounded-3xl font-semibold transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 animate-filter-appear {selectedCategory === category.id
						? 'bg-[var(--color-primary-strong)] text-black shadow-[0_15px_40px_rgba(255,138,51,0.35)] scale-105 border border-[var(--color-primary-strong)]'
						: 'bg-zinc-900 text-zinc-300 hover:text-white border-2 border-zinc-800 hover:border-[var(--color-primary-strong)] hover:shadow-lg backdrop-blur-sm'}"
					style="animation-delay: {0.4 + index * 0.1}s;"
				>
					<!-- Animated background for active state -->
					{#if selectedCategory === category.id}
						<div class="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-strong)] to-[var(--color-primary)] rounded-3xl animate-pulse-gentle opacity-80"></div>
					{/if}

					<category.icon size={24} class="relative z-10 transition-all duration-500 group-hover:rotate-12 group-hover:scale-125 {selectedCategory === category.id ? 'text-black animate-bounce-gentle' : 'text-zinc-500'}" />
					<span class="relative z-10 transition-all duration-300">{category.name}</span>

					<!-- Hover effect overlay -->
					<div class="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-primary-strong)]/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
				</button>
			{/each}
		</div>
	</Container>
</section>

<!-- Portfolio Grid -->
<section class="py-24 bg-black transition-colors duration-500 relative overflow-hidden">
	<!-- Animated background texture -->
	<div class="absolute inset-0 bg-texture-subtle opacity-20 animate-texture-drift"></div>
	<div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[var(--color-primary)]/5 via-transparent to-[var(--color-primary)]/5"></div>

	<Container>
		<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 relative z-10">
			{#each filteredItems as item, index}
				<div class="group relative bg-zinc-900 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-6 hover:rotate-1 border border-zinc-800 animate-card-appear hover:scale-105" style="animation-delay: {index * 0.15}s;">
					<!-- Animated border gradient -->
					<div class="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-strong)] via-[var(--color-primary)] to-[var(--color-primary-strong)] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-gradient-rotate"></div>
					<div class="absolute inset-0.5 bg-zinc-900 rounded-3xl"></div>

					<div class="relative z-10">
						<div class="relative overflow-hidden rounded-t-3xl">
							<!-- Project Image -->
							<div class="aspect-[4/3] overflow-hidden">
								<img
									src={item.image}
									alt={item.title}
									class="w-full h-full object-cover transition-all duration-1000 group-hover:scale-125 group-hover:rotate-2"
									loading="lazy"
								/>
							</div>

							<!-- Animated overlay -->
							<div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

							<!-- Floating category badge -->
							<div class="absolute top-6 left-6 transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
								<span class="inline-flex items-center space-x-2 px-4 py-2 bg-black/95 backdrop-blur-md rounded-2xl text-xs font-semibold text-zinc-300 border border-white/30 shadow-lg">
									{#if item.category === 'video'}
										<Play size={14} class="text-[var(--color-primary)] animate-pulse" />
									{:else if item.category === 'photography'}
										<ExternalLink size={14} class="text-[var(--color-primary)] animate-bounce-gentle" />
									{:else if item.category === 'marketing'}
										<TrendingUp size={14} class="text-[var(--color-primary)] animate-pulse" />
									{:else}
										<Award size={14} class="text-[var(--color-primary)] animate-bounce-gentle" />
									{/if}
									<span class="capitalize">{item.category}</span>
								</span>
							</div>

							<!-- Enhanced Results Badge -->
							<div class="absolute top-6 right-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
								<div class="bg-gradient-to-r from-[var(--color-primary-strong)] to-[var(--color-primary)] text-black px-4 py-2 rounded-2xl text-xs font-bold shadow-xl border border-white/20 animate-result-glow">
									{item.results}
								</div>
							</div>

							<!-- Animated view overlay -->
							<div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-100 scale-75">
								<a
									href={`/portfolio/${item.category}`}
									class="bg-zinc-900/90 backdrop-blur-md rounded-2xl p-6 border border-zinc-700 animate-pulse-gentle shadow-2xl flex items-center space-x-3 text-white"
								>
									<Eye size={24} class="animate-bounce-gentle" />
									<span class="font-semibold text-lg">View {item.category} work</span>
								</a>
							</div>
						</div>

					<div class="p-8 space-y-6">
						<div class="space-y-3">
							<div class="flex items-start justify-between">
								<h3 class="text-xl font-bold text-white group-hover:text-[var(--color-primary)] transition-colors duration-300 leading-tight">
									{item.title}
								</h3>
								<div class="flex items-center space-x-1 text-sm text-zinc-500 ml-4">
									<Calendar size={14} />
									<span>{new Date(item.date).toLocaleDateString()}</span>
								</div>
							</div>
							<p class="text-sm font-semibold text-[var(--color-primary)]">{item.client}</p>
						</div>

						<p class="text-zinc-400 leading-relaxed">
							{item.description}
						</p>

						<div class="flex flex-wrap gap-2">
							{#each item.tags as tag}
								<span class="inline-flex items-center space-x-1 px-3 py-1.5 bg-zinc-800 text-zinc-300 text-xs rounded-full border border-zinc-700 hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)] transition-colors duration-300">
									<Tag size={10} />
									<span>{tag}</span>
								</span>
							{/each}
						</div>
					</div>
				</div>
			</div>
			{/each}
		</div>

		{#if filteredItems.length === 0}
			<div class="text-center py-16">
				<div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900 mb-4">
					<ExternalLink size={32} class="text-zinc-500" />
				</div>
				<p class="text-zinc-500 text-lg">No projects found in this category.</p>
				<p class="text-zinc-500 text-sm mt-2">Try selecting a different category to explore our work.</p>
			</div>
		{/if}
	</Container>
</section>

<!-- CTA Section -->
<section class="relative py-32 bg-black text-white overflow-hidden">
	<!-- Background Pattern -->
	<div class="absolute inset-0 bg-dots-pattern opacity-25"></div>

	<!-- Floating Elements -->
	<div class="absolute top-20 left-10 w-20 h-20 bg-[var(--color-primary)]/20 rounded-full blur-xl animate-bounce-slow"></div>
	<div class="absolute bottom-20 right-10 w-32 h-32 bg-[var(--color-primary)]/20 rounded-full blur-xl animate-pulse-slow"></div>
	<div class="absolute top-1/2 left-1/4 w-16 h-16 bg-zinc-800/50 rounded-full blur-xl animate-bounce-slow" style="animation-delay: 1s;"></div>

	<Container>
		<div class="relative z-10 text-center space-y-12">
			<div class="space-y-6">
				<h2 class="text-4xl md:text-6xl font-bold text-white">
					Ready to Create Something Amazing?
				</h2>
				<div class="w-24 h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)] mx-auto rounded-full"></div>
				<p class="text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
					Let's discuss your vision and create a project that exceeds your expectations and drives real results for your business.
				</p>
			</div>

			<div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
				<Button variant="primary" size="lg" class="group shadow-[0_15px_40px_rgba(255,138,51,0.35)] transform hover:scale-105 transition-all duration-300">
					<a href="/contact" class="flex items-center space-x-2">
						<span>Start Your Project</span>
						<ExternalLink size={20} class="transition-transform duration-300 group-hover:translate-x-1" />
					</a>
				</Button>

				<Button variant="outline" size="lg" class="group bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800 transform hover:scale-105 transition-all duration-300">
					<a href="/services" class="flex items-center space-x-2">
						<span>View Services</span>
						<Eye size={20} class="transition-transform duration-300 group-hover:rotate-12" />
					</a>
				</Button>
			</div>

			<!-- Contact Info -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-12 border-t border-zinc-800">
				<div class="text-center space-y-2">
					<div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900 backdrop-blur-sm border border-zinc-800 mb-3">
						<ExternalLink size={24} class="text-[var(--color-primary)]" />
					</div>
					<h3 class="font-semibold text-white">Quick Response</h3>
					<p class="text-zinc-400 text-sm">Get a response within 24 hours</p>
				</div>
				<div class="text-center space-y-2">
					<div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900 backdrop-blur-sm border border-zinc-800 mb-3">
						<Users size={24} class="text-[var(--color-primary)]" />
					</div>
					<h3 class="font-semibold text-white">Expert Team</h3>
					<p class="text-zinc-400 text-sm">Dedicated professionals for your project</p>
				</div>
				<div class="text-center space-y-2">
					<div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900 backdrop-blur-sm border border-zinc-800 mb-3">
						<Award size={24} class="text-[var(--color-primary)]" />
					</div>
					<h3 class="font-semibold text-white">Proven Results</h3>
					<p class="text-zinc-400 text-sm">Track record of successful projects</p>
				</div>
			</div>
		</div>
	</Container>
</section>

<style>
	:global(html.dark) {
		color-scheme: dark;
	}

	:global(.animate-fade-in-up) {
		animation: fadeInUp 0.8s ease-out forwards;
		opacity: 0;
		transform: translateY(30px);
	}

	:global(.animate-pulse-slow) {
		animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	:global(.animate-bounce-slow) {
		animation: bounce 3s infinite;
	}

	/* Enhanced Keyframes */
	@keyframes fadeInUp {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Letter Animation */
	:global(.animate-letter-float) {
		animation: letterFloat 2s ease-in-out infinite;
		display: inline-block;
	}

	@keyframes letterFloat {
		0%, 100% { transform: translateY(0px) rotate(0deg); }
		25% { transform: translateY(-8px) rotate(1deg); }
		50% { transform: translateY(-4px) rotate(-1deg); }
		75% { transform: translateY(-12px) rotate(0.5deg); }
	}

	/* Title Reveal */
	:global(.animate-title-reveal) {
		animation: titleReveal 1.5s ease-out forwards;
		opacity: 0;
		transform: scale(0.8) translateY(50px);
	}

	@keyframes titleReveal {
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}

	/* Line Expand */
	:global(.animate-line-expand) {
		animation: lineExpand 1.2s ease-out forwards;
		transform: scaleX(0);
		transform-origin: center;
	}

	@keyframes lineExpand {
		to {
			transform: scaleX(1);
		}
	}

	/* Text Reveal */
	:global(.animate-text-reveal) {
		animation: textReveal 1s ease-out forwards;
		opacity: 0;
		transform: translateY(30px) scale(0.95);
	}

	@keyframes textReveal {
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	/* Stat Reveal */
	:global(.animate-stat-reveal) {
		animation: statReveal 0.8s ease-out forwards;
		opacity: 0;
		transform: translateY(40px) scale(0.8);
	}

	@keyframes statReveal {
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	/* Number Count */
	:global(.animate-number-count) {
		animation: numberCount 2s ease-out forwards;
	}

	@keyframes numberCount {
		from { transform: scale(0.5); opacity: 0; }
		50% { transform: scale(1.2); opacity: 0.8; }
		to { transform: scale(1); opacity: 1; }
	}

	/* Filter Appear */
	:global(.animate-filter-appear) {
		animation: filterAppear 0.6s ease-out forwards;
		opacity: 0;
		transform: translateY(20px) scale(0.9);
	}

	@keyframes filterAppear {
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	/* Card Appear */
	:global(.animate-card-appear) {
		animation: cardAppear 0.8s ease-out forwards;
		opacity: 0;
		transform: translateY(50px) scale(0.9) rotate(-2deg);
	}

	@keyframes cardAppear {
		to {
			opacity: 1;
			transform: translateY(0) scale(1) rotate(0deg);
		}
	}

	/* Floating Animations */
	:global(.animate-float-slow) {
		animation: floatSlow 6s ease-in-out infinite;
	}

	@keyframes floatSlow {
		0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
		25% { transform: translateY(-20px) translateX(10px) rotate(1deg); }
		50% { transform: translateY(-10px) translateX(-5px) rotate(-1deg); }
		75% { transform: translateY(-30px) translateX(15px) rotate(0.5deg); }
	}

	:global(.animate-float-reverse) {
		animation: floatReverse 8s ease-in-out infinite;
	}

	@keyframes floatReverse {
		0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
		25% { transform: translateY(15px) translateX(-10px) rotate(-1deg); }
		50% { transform: translateY(25px) translateX(8px) rotate(1deg); }
		75% { transform: translateY(5px) translateX(-15px) rotate(-0.5deg); }
	}

	:global(.animate-float-gentle) {
		animation: floatGentle 4s ease-in-out infinite;
	}

	@keyframes floatGentle {
		0%, 100% { transform: translateY(0px) scale(1); }
		50% { transform: translateY(-15px) scale(1.05); }
	}

	/* Pulse Gentle */
	:global(.animate-pulse-gentle) {
		animation: pulseGentle 3s ease-in-out infinite;
	}

	@keyframes pulseGentle {
		0%, 100% { opacity: 0.6; transform: scale(1); }
		50% { opacity: 1; transform: scale(1.1); }
	}

	/* Bounce Gentle */
	:global(.animate-bounce-gentle) {
		animation: bounceGentle 2s ease-in-out infinite;
	}

	@keyframes bounceGentle {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-5px); }
	}

	/* Spin Slow */
	:global(.animate-spin-slow) {
		animation: spinSlow 3s linear infinite;
	}

	@keyframes spinSlow {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}

	/* Gradient Animations */
	:global(.animate-gradient-shift) {
		background: linear-gradient(-45deg, #111111, #ff8a33, #0f0f0f, #ffb067);
		background-size: 400% 400%;
		animation: gradientShift 15s ease infinite;
		opacity: 0.15;
	}

	@keyframes gradientShift {
		0% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
		100% { background-position: 0% 50%; }
	}

	:global(.animate-gradient-x) {
		background-size: 200% 200%;
		animation: gradientX 3s ease infinite;
	}

	@keyframes gradientX {
		0%, 100% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
	}

	:global(.animate-gradient-rotate) {
		animation: gradientRotate 4s linear infinite;
	}

	@keyframes gradientRotate {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	/* Texture Animations */
	:global(.animate-texture-drift) {
		animation: textureDrift 20s linear infinite;
	}

	@keyframes textureDrift {
		0% { transform: translateX(0) translateY(0); }
		25% { transform: translateX(-10px) translateY(-5px); }
		50% { transform: translateX(-5px) translateY(-10px); }
		75% { transform: translateX(-15px) translateY(-2px); }
		100% { transform: translateX(0) translateY(0); }
	}

	/* Grid Animation */
	:global(.animate-grid-move) {
		animation: gridMove 25s linear infinite;
	}

	@keyframes gridMove {
		0% { transform: translateX(0) translateY(0); }
		100% { transform: translateX(-50px) translateY(-50px); }
	}

	/* Result Glow */
	:global(.animate-result-glow) {
		animation: resultGlow 2s ease-in-out infinite alternate;
	}

	@keyframes resultGlow {
		from { box-shadow: 0 0 10px rgba(255, 138, 51, 0.45); }
		to { box-shadow: 0 0 20px rgba(255, 176, 103, 0.8), 0 0 30px rgba(255, 138, 51, 0.35); }
	}

	/* Slide Animations */
	:global(.animate-slide-up) {
		animation: slideUp 0.8s ease-out forwards;
		opacity: 0;
		transform: translateY(40px);
	}

	@keyframes slideUp {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Background Patterns */
	:global(.bg-texture-pattern) {
		background-image:
			radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px),
			radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 1px, transparent 1px);
		background-size: 50px 50px;
	}

	:global(.bg-texture-subtle) {
		background-image:
			linear-gradient(45deg, rgba(255,255,255,0.02) 25%, transparent 25%),
			linear-gradient(-45deg, rgba(255,255,255,0.02) 25%, transparent 25%),
			linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.02) 75%),
			linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.02) 75%);
		background-size: 30px 30px;
		background-position: 0 0, 0 15px, 15px -15px, -15px 0px;
	}

	:global(.bg-gradient-mesh) {
		background:
			radial-gradient(ellipse at top left, rgba(255, 138, 51, 0.18) 0%, transparent 50%),
			radial-gradient(ellipse at top right, rgba(255, 176, 103, 0.18) 0%, transparent 50%),
			radial-gradient(ellipse at bottom left, rgba(255, 138, 51, 0.12) 0%, transparent 50%),
			radial-gradient(ellipse at bottom right, rgba(255, 176, 103, 0.14) 0%, transparent 50%);
	}

	:global(.bg-grid-pattern) {
		background-image:
			linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
		background-size: 50px 50px;
	}

	:global(.bg-dots-pattern) {
		background-image: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
		background-size: 20px 20px;
	}

	/* Flip card */
	.flip-card {
		background-color: transparent;
		width: 190px;
		height: 254px;
		perspective: 1000px;
		font-family: sans-serif;
	}

	.title {
		font-size: 1.5em;
		font-weight: 900;
		text-align: center;
		margin: 0;
	}

	.flip-card-inner {
		position: relative;
		width: 100%;
		height: 100%;
		text-align: center;
		transition: transform 0.8s;
		transform-style: preserve-3d;
	}

	.flip-card:hover .flip-card-inner {
		transform: rotateY(180deg);
	}

	.flip-card-front,
	.flip-card-back {
		box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.2);
		position: absolute;
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		height: 100%;
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		border: 1px solid coral;
		border-radius: 1rem;
	}

	.flip-card-front {
		background: linear-gradient(
			120deg,
			bisque 60%,
			rgb(255, 231, 222) 88%,
			rgb(255, 211, 195) 40%,
			rgba(255, 127, 80, 0.603) 48%
		);
		color: coral;
	}

	.flip-card-back {
		background: linear-gradient(
			120deg,
			rgb(255, 174, 145) 30%,
			coral 88%,
			bisque 40%,
			rgb(255, 185, 160) 78%
		);
		color: white;
		transform: rotateY(180deg);
	}
</style>
