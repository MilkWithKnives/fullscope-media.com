<script lang="ts">
	import Container from '$lib/components/ui/Container.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { Play, ExternalLink, Calendar, Tag, Moon, Sun, Eye, Award, Users, TrendingUp } from 'lucide-svelte';
	import { browser } from '$app/environment';

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

	const categories = [
		{ id: 'all', name: 'All Work', icon: Eye },
		{ id: 'video', name: 'Video Production', icon: Play },
		{ id: 'photography', name: 'Photography', icon: ExternalLink },
		{ id: 'marketing', name: 'Digital Marketing', icon: TrendingUp },
		{ id: 'web', name: 'Web Design', icon: Award }
	];

	const portfolioItems = [
		{
			id: 1,
			title: 'Tech Startup Brand Video',
			category: 'video',
			description: 'A compelling brand story video that helped a tech startup secure Series A funding and establish market presence.',
			image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
			tags: ['Brand Video', 'Startup', 'Technology'],
			date: '2024-01-15',
			client: 'TechFlow Solutions',
			results: '300% increase in investor inquiries'
		},
		{
			id: 2,
			title: 'Restaurant Photography Series',
			category: 'photography',
			description: 'Mouth-watering food photography that transformed online presence and drove significant order growth.',
			image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
			tags: ['Food Photography', 'Restaurant', 'Commercial'],
			date: '2024-02-20',
			client: 'Bella Vista Restaurant',
			results: '40% increase in online orders'
		},
		{
			id: 3,
			title: 'E-commerce Website Redesign',
			category: 'web',
			description: 'Complete website redesign with modern UX/UI that dramatically improved user experience and conversions.',
			image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
			tags: ['Web Design', 'E-commerce', 'UX/UI'],
			date: '2024-03-10',
			client: 'Fashion Forward',
			results: '65% conversion rate improvement'
		},
		{
			id: 4,
			title: 'Social Media Campaign',
			category: 'marketing',
			description: 'Multi-platform digital campaign that achieved exceptional reach and engagement across all demographics.',
			image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
			tags: ['Social Media', 'Campaign', 'Digital Marketing'],
			date: '2024-02-05',
			client: 'Fitness Plus',
			results: '2M+ impressions, 15% engagement'
		},
		{
			id: 5,
			title: 'Corporate Event Coverage',
			category: 'video',
			description: 'Professional event documentation capturing key moments and presentations for Fortune 500 annual conference.',
			image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
			tags: ['Event Video', 'Corporate', 'Live Coverage'],
			date: '2024-01-30',
			client: 'Global Industries',
			results: 'Used in 12 international markets'
		},
		{
			id: 6,
			title: 'Product Photography Collection',
			category: 'photography',
			description: 'High-end product photography showcasing luxury timepieces with precision lighting and composition.',
			image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
			tags: ['Product Photography', 'Luxury', 'Catalog'],
			date: '2024-03-25',
			client: 'Timepiece Luxury',
			results: '50% increase in catalog sales'
		},
		{
			id: 7,
			title: 'Real Estate Virtual Tours',
			category: 'photography',
			description: 'Immersive 3D virtual tours and professional photography for luxury real estate listings.',
			image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
			tags: ['3D Tours', 'Real Estate', 'Matterport'],
			date: '2024-03-15',
			client: 'Premier Properties',
			results: '80% faster sales cycle'
		},
		{
			id: 8,
			title: 'Drone Cinematography Project',
			category: 'video',
			description: 'Stunning aerial cinematography showcasing architectural marvels and natural landscapes.',
			image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
			tags: ['Drone Video', 'Cinematography', 'Aerial'],
			date: '2024-02-28',
			client: 'Urban Development Co.',
			results: 'Featured in national campaign'
		}
	];

	// Use $derived for reactive filtering
	const filteredItems = $derived(
		selectedCategory === 'all'
			? portfolioItems
			: portfolioItems.filter(item => item.category === selectedCategory)
	);

	const stats = [
		{ number: '150+', label: 'Projects Completed', icon: Award },
		{ number: '98%', label: 'Client Satisfaction', icon: Users },
		{ number: '5M+', label: 'Total Impressions', icon: TrendingUp },
		{ number: '24/7', label: 'Support Available', icon: Eye }
	];
</script>

<svelte:head>
	<title>Portfolio - Full Scope Media</title>
	<meta name="description" content="Explore our portfolio of video production, photography, digital marketing, and web design projects. See how we've helped businesses achieve their goals." />
</svelte:head>

<!-- Hero Section -->
<section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900">
	<!-- Animated textured background -->
	<div class="absolute inset-0 bg-texture-pattern opacity-20"></div>
	<div class="absolute inset-0 bg-gradient-mesh animate-gradient-shift"></div>

	<!-- Floating geometric shapes -->
	<div class="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-xl animate-float-slow"></div>
	<div class="absolute bottom-32 right-16 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-lg animate-float-reverse"></div>
	<div class="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-pink-500/25 to-purple-500/25 rounded-full blur-md animate-float-gentle"></div>
	<div class="absolute bottom-1/4 left-1/3 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-lg animate-pulse-gentle"></div>

	<!-- Animated grid overlay -->
	<div class="absolute inset-0 bg-grid-pattern opacity-10 animate-grid-move"></div>

	<!-- Theme toggle -->
	<button
		onclick={toggleTheme}
		class="fixed top-20 right-4 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:scale-110 transition-all duration-500 hover:rotate-12 shadow-lg hover:shadow-xl"
		aria-label="Toggle theme"
	>
		{#if isDarkMode}
			<Sun size={20} class="animate-spin-slow" />
		{:else}
			<Moon size={20} class="animate-bounce-gentle" />
		{/if}
	</button>

	<Container>
		<div class="text-center space-y-8 relative z-10">
			<div class="space-y-6">
				<h1 class="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent animate-title-reveal">
					<span class="inline-block animate-letter-float" style="animation-delay: 0.1s;">O</span>
					<span class="inline-block animate-letter-float" style="animation-delay: 0.2s;">u</span>
					<span class="inline-block animate-letter-float" style="animation-delay: 0.3s;">r</span>
					<span class="inline-block animate-letter-float mx-4" style="animation-delay: 0.4s;"> </span>
					<span class="inline-block animate-letter-float" style="animation-delay: 0.5s;">P</span>
					<span class="inline-block animate-letter-float" style="animation-delay: 0.6s;">o</span>
					<span class="inline-block animate-letter-float" style="animation-delay: 0.7s;">r</span>
					<span class="inline-block animate-letter-float" style="animation-delay: 0.8s;">t</span>
					<span class="inline-block animate-letter-float" style="animation-delay: 0.9s;">f</span>
					<span class="inline-block animate-letter-float" style="animation-delay: 1.0s;">o</span>
					<span class="inline-block animate-letter-float" style="animation-delay: 1.1s;">l</span>
					<span class="inline-block animate-letter-float" style="animation-delay: 1.2s;">i</span>
					<span class="inline-block animate-letter-float" style="animation-delay: 1.3s;">o</span>
				</h1>
				<div class="w-32 h-1.5 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mx-auto rounded-full animate-line-expand shadow-lg shadow-purple-500/50"></div>
			</div>
			<p class="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed animate-text-reveal" style="animation-delay: 1.5s;">
				Discover the stories we've told and the results we've achieved.
				Each project represents our commitment to excellence and creative innovation.
			</p>

			<!-- Enhanced Stats -->
			<div class="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
				{#each stats as stat, index}
					<div class="text-center space-y-3 animate-stat-reveal group cursor-pointer" style="animation-delay: {1.8 + index * 0.2}s;">
						<div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-xl group-hover:shadow-purple-500/25">
							<stat.icon size={28} class="text-purple-300 group-hover:text-pink-300 transition-colors duration-300" />
						</div>
						<div class="text-3xl md:text-4xl font-bold text-white animate-number-count group-hover:scale-110 transition-transform duration-300">{stat.number}</div>
						<div class="text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300">{stat.label}</div>
					</div>
				{/each}
			</div>
		</div>
	</Container>
</section>

<!-- Filter Tabs -->
<section class="py-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-colors duration-500 relative overflow-hidden">
	<!-- Animated background elements -->
	<div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-gradient-x"></div>
	<div class="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-float-slow"></div>
	<div class="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-float-reverse"></div>

	<Container>
		<div class="text-center mb-16 relative z-10">
			<h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">
				<span class="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Explore</span> Our Work
			</h2>
			<p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-slide-up" style="animation-delay: 0.2s;">
				Filter by category to see specific types of projects and their measurable impact on our clients' success
			</p>
		</div>

		<div class="flex flex-wrap justify-center gap-6 relative z-10">
			{#each categories as category, index}
				<button
					onclick={() => selectedCategory = category.id}
					class="group relative flex items-center space-x-3 px-10 py-5 rounded-3xl font-semibold transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 animate-filter-appear {selectedCategory === category.id
						? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl shadow-purple-500/40 scale-105'
						: 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500 backdrop-blur-sm shadow-lg hover:shadow-xl'}"
					style="animation-delay: {0.4 + index * 0.1}s;"
				>
					<!-- Animated background for active state -->
					{#if selectedCategory === category.id}
						<div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl animate-pulse-gentle opacity-75"></div>
					{/if}

					<category.icon size={24} class="relative z-10 transition-all duration-500 group-hover:rotate-12 group-hover:scale-125 {selectedCategory === category.id ? 'text-white animate-bounce-gentle' : 'text-purple-600 dark:text-purple-400'}" />
					<span class="relative z-10 transition-all duration-300">{category.name}</span>

					<!-- Hover effect overlay -->
					<div class="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
				</button>
			{/each}
		</div>
	</Container>
</section>

<!-- Portfolio Grid -->
<section class="py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-500 relative overflow-hidden">
	<!-- Animated background texture -->
	<div class="absolute inset-0 bg-texture-subtle opacity-20 animate-texture-drift"></div>
	<div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/3 via-transparent to-pink-500/3"></div>

	<Container>
		<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 relative z-10">
			{#each filteredItems as item, index}
				<div class="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-6 hover:rotate-1 border border-gray-200 dark:border-gray-700 animate-card-appear hover:scale-105" style="animation-delay: {index * 0.15}s;">
					<!-- Animated border gradient -->
					<div class="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-gradient-rotate"></div>
					<div class="absolute inset-0.5 bg-white dark:bg-gray-800 rounded-3xl"></div>

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
								<span class="inline-flex items-center space-x-2 px-4 py-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl text-xs font-semibold text-gray-700 dark:text-gray-300 border border-white/30 shadow-lg">
									{#if item.category === 'video'}
										<Play size={14} class="text-purple-600 animate-pulse" />
									{:else if item.category === 'photography'}
										<ExternalLink size={14} class="text-pink-600 animate-bounce-gentle" />
									{:else if item.category === 'marketing'}
										<TrendingUp size={14} class="text-blue-600 animate-pulse" />
									{:else}
										<Award size={14} class="text-green-600 animate-bounce-gentle" />
									{/if}
									<span class="capitalize">{item.category}</span>
								</span>
							</div>

							<!-- Enhanced Results Badge -->
							<div class="absolute top-6 right-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
								<div class="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-2xl text-xs font-bold shadow-xl border border-white/20 animate-result-glow">
									{item.results}
								</div>
							</div>

							<!-- Animated view overlay -->
							<div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-100 scale-75">
								<div class="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 animate-pulse-gentle shadow-2xl">
									<div class="flex items-center space-x-3 text-white">
										<Eye size={24} class="animate-bounce-gentle" />
										<span class="font-semibold text-lg">View Project</span>
									</div>
								</div>
							</div>
						</div>

					<div class="p-8 space-y-6">
						<div class="space-y-3">
							<div class="flex items-start justify-between">
								<h3 class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 leading-tight">
									{item.title}
								</h3>
								<div class="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 ml-4">
									<Calendar size={14} />
									<span>{new Date(item.date).toLocaleDateString()}</span>
								</div>
							</div>
							<p class="text-sm font-semibold text-purple-600 dark:text-purple-400">{item.client}</p>
						</div>

						<p class="text-gray-600 dark:text-gray-300 leading-relaxed">
							{item.description}
						</p>

						<div class="flex flex-wrap gap-2">
							{#each item.tags as tag}
								<span class="inline-flex items-center space-x-1 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full border border-gray-200 dark:border-gray-600 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-300">
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
				<div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
					<ExternalLink size={32} class="text-gray-400" />
				</div>
				<p class="text-gray-500 dark:text-gray-400 text-lg">No projects found in this category.</p>
				<p class="text-gray-400 dark:text-gray-500 text-sm mt-2">Try selecting a different category to explore our work.</p>
			</div>
		{/if}
	</Container>
</section>

<!-- CTA Section -->
<section class="relative py-32 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 text-white overflow-hidden">
	<!-- Background Pattern -->
	<div class="absolute inset-0 bg-dots-pattern opacity-30"></div>

	<!-- Floating Elements -->
	<div class="absolute top-20 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-bounce-slow"></div>
	<div class="absolute bottom-20 right-10 w-32 h-32 bg-pink-500/20 rounded-full blur-xl animate-pulse-slow"></div>
	<div class="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-bounce-slow" style="animation-delay: 1s;"></div>

	<Container>
		<div class="relative z-10 text-center space-y-12">
			<div class="space-y-6">
				<h2 class="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
					Ready to Create Something Amazing?
				</h2>
				<div class="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
				<p class="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
					Let's discuss your vision and create a project that exceeds your expectations and drives real results for your business.
				</p>
			</div>

			<div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
				<Button variant="primary" size="lg" class="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-xl shadow-purple-500/25 transform hover:scale-105 transition-all duration-300">
					<a href="/contact" class="flex items-center space-x-2">
						<span>Start Your Project</span>
						<ExternalLink size={20} class="transition-transform duration-300 group-hover:translate-x-1" />
					</a>
				</Button>

				<Button variant="outline" size="lg" class="group bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transform hover:scale-105 transition-all duration-300">
					<a href="/services" class="flex items-center space-x-2">
						<span>View Services</span>
						<Eye size={20} class="transition-transform duration-300 group-hover:rotate-12" />
					</a>
				</Button>
			</div>

			<!-- Contact Info -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-12 border-t border-white/10">
				<div class="text-center space-y-2">
					<div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-3">
						<ExternalLink size={24} class="text-purple-300" />
					</div>
					<h3 class="font-semibold text-white">Quick Response</h3>
					<p class="text-gray-300 text-sm">Get a response within 24 hours</p>
				</div>
				<div class="text-center space-y-2">
					<div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-3">
						<Users size={24} class="text-purple-300" />
					</div>
					<h3 class="font-semibold text-white">Expert Team</h3>
					<p class="text-gray-300 text-sm">Dedicated professionals for your project</p>
				</div>
				<div class="text-center space-y-2">
					<div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-3">
						<Award size={24} class="text-purple-300" />
					</div>
					<h3 class="font-semibold text-white">Proven Results</h3>
					<p class="text-gray-300 text-sm">Track record of successful projects</p>
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
		background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
		background-size: 400% 400%;
		animation: gradientShift 15s ease infinite;
		opacity: 0.1;
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
		from { box-shadow: 0 0 10px rgba(168, 85, 247, 0.5); }
		to { box-shadow: 0 0 20px rgba(236, 72, 153, 0.8), 0 0 30px rgba(168, 85, 247, 0.3); }
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
			radial-gradient(ellipse at top left, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
			radial-gradient(ellipse at top right, rgba(236, 72, 153, 0.15) 0%, transparent 50%),
			radial-gradient(ellipse at bottom left, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
			radial-gradient(ellipse at bottom right, rgba(168, 85, 247, 0.15) 0%, transparent 50%);
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
</style>
