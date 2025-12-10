<script lang="ts">
	import Container from '../ui/Container.svelte';
	import Button from '../ui/Button.svelte';
	import ScrollReveal from '../ui/ScrollReveal.svelte';
	import { Play, ArrowRight } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let heroRef: HTMLElement;
	let mouseX = $state(0);
	let mouseY = $state(0);

	onMount(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (heroRef) {
				const rect = heroRef.getBoundingClientRect();
				mouseX = (e.clientX - rect.left) / rect.width;
				mouseY = (e.clientY - rect.top) / rect.height;
			}
		};

		heroRef?.addEventListener('mousemove', handleMouseMove);
		return () => heroRef?.removeEventListener('mousemove', handleMouseMove);
	});
</script>

<section bind:this={heroRef} class="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white overflow-hidden">
	<!-- Background Pattern -->
	<div class="absolute inset-0 bg-black/20"></div>
	<div class="absolute inset-0 opacity-30 bg-dots-pattern"></div>

	<!-- Floating Elements with Mouse Interaction -->
	<div
		class="absolute top-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-xl transition-transform duration-1000 ease-out"
		style="transform: translate({mouseX * 20}px, {mouseY * 20}px)"
	></div>
	<div
		class="absolute bottom-20 right-10 w-40 h-40 bg-purple-400/10 rounded-full blur-xl transition-transform duration-1000 ease-out"
		style="transform: translate({mouseX * -15}px, {mouseY * -15}px)"
	></div>
	
	<Container class="relative">
		<div class="py-24 lg:py-32">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
				<!-- Content -->
				<ScrollReveal animation="fade-right" class="space-y-8">
					<div class="space-y-4">
						<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
							Bringing Your
							<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse-slow">
								Vision
							</span>
							to Life
						</h1>
						<p class="text-xl text-blue-100 leading-relaxed">
							Full Scope Media creates compelling visual stories that connect, inspire, and drive results.
							From concept to completion, we deliver exceptional video production, photography, and digital marketing solutions.
						</p>
					</div>

					<div class="flex flex-col sm:flex-row gap-4">
						<Button variant="primary" size="lg" class="bg-white text-blue-900 hover:bg-blue-50">
							<a href="/contact" class="flex items-center gap-2">
								Get Started
								<ArrowRight size={20} />
							</a>
						</Button>
						<Button variant="outline" size="lg" class="border-white text-white hover:bg-white/10">
							<a href="/portfolio" class="flex items-center gap-2">
								<Play size={20} />
								View Our Work
							</a>
						</Button>
					</div>

					<!-- Stats -->
					<div class="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
						<div class="text-center">
							<div class="text-3xl font-bold text-blue-400">500+</div>
							<div class="text-sm text-blue-100">Projects Completed</div>
						</div>
						<div class="text-center">
							<div class="text-3xl font-bold text-blue-400">50+</div>
							<div class="text-sm text-blue-100">Happy Clients</div>
						</div>
						<div class="text-center">
							<div class="text-3xl font-bold text-blue-400">5+</div>
							<div class="text-sm text-blue-100">Years Experience</div>
						</div>
					</div>
				</ScrollReveal>

				<!-- Visual Element -->
				<ScrollReveal animation="fade-left" delay={200} class="relative">
					<div class="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center hover:scale-105 transition-transform duration-300 cursor-pointer group">
						<div class="text-center space-y-4">
							<div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm group-hover:bg-white/30 transition-colors duration-300 group-hover:animate-bounce-slow">
								<Play size={32} class="text-white ml-1" />
							</div>
							<p class="text-blue-100 group-hover:text-white transition-colors duration-300">Watch Our Showreel</p>
						</div>
					</div>

					<!-- Floating Elements -->
					<div class="absolute -top-4 -right-4 w-24 h-24 bg-blue-400/20 rounded-full blur-xl animate-pulse-slow"></div>
					<div class="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-400/20 rounded-full blur-xl animate-pulse-slow" style="animation-delay: 1s"></div>
				</ScrollReveal>
			</div>
		</div>
	</Container>
</section>
