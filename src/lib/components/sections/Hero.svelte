<script lang="ts">
	import Container from '../ui/Container.svelte';
	import Button from '../ui/Button.svelte';
	import ScrollReveal from '../ui/ScrollReveal.svelte';
	import Play from 'lucide-svelte/icons/play';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';

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

<section bind:this={heroRef} class="relative bg-black text-white overflow-hidden">
	<!-- Background Pattern -->
	<div class="absolute inset-0 bg-zinc-900/20"></div>
	<div class="absolute inset-0 opacity-20 bg-dots-pattern"></div>

	<!-- Floating Elements with Mouse Interaction -->
	<div
		class="absolute top-20 left-10 w-32 h-32 bg-[var(--color-primary)]/15 rounded-full blur-2xl transition-transform duration-1000 ease-out"
		style="transform: translate({mouseX * 20}px, {mouseY * 20}px)"
	></div>
	<div
		class="absolute bottom-20 right-10 w-40 h-40 bg-[var(--color-primary)]/15 rounded-full blur-2xl transition-transform duration-1000 ease-out"
		style="transform: translate({mouseX * -15}px, {mouseY * -15}px)"
	></div>
	
	<Container class="relative">
		<div class="py-16 lg:py-32">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
				<!-- Content -->
				<ScrollReveal animation="fade-right" class="space-y-8">
					<div class="space-y-4">
						<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
							Creative production
							<span class="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[var(--color-primary)] animate-pulse-slow">
								built for impact
							</span>
						</h1>
						<p class="text-xl text-zinc-300 leading-relaxed">
							We plan, produce, and polish visuals that make people stop and care. From the first idea to the final deliverable,
							our team handles video, photography, and digital content with a focus on clarity, craft, and measurable results.
						</p>
					</div>

					<div class="flex flex-col sm:flex-row gap-4">
						<Button variant="primary" size="lg" class="text-black">
							<a href={resolve('/contact')} class="flex items-center gap-2">
								Get Started
								<ArrowRight size={20} />
							</a>
						</Button>
						<Button variant="outline" size="lg" class="border-zinc-700 text-white hover:bg-zinc-800">
							<a href={resolve('/portfolio')} class="flex items-center gap-2">
								<Play size={20} />
								View Our Work
							</a>
						</Button>
					</div>

					<!-- Stats -->
					<div class="grid grid-cols-3 gap-8 pt-8 border-t border-zinc-800">
						<div class="text-center">
							<div class="text-3xl font-bold text-[var(--color-primary)]">400+</div>
							<div class="text-sm text-zinc-400">Projects delivered</div>
						</div>
						<div class="text-center">
							<div class="text-3xl font-bold text-[var(--color-primary)]">60+</div>
							<div class="text-sm text-zinc-400">Client partners</div>
						</div>
						<div class="text-center">
							<div class="text-3xl font-bold text-[var(--color-primary)]">5+</div>
							<div class="text-sm text-zinc-400">Years producing</div>
						</div>
					</div>
				</ScrollReveal>

				<!-- Visual Element -->
				<ScrollReveal animation="fade-left" delay={200} class="relative">
					<div class="aspect-video bg-gradient-to-br from-zinc-900/50 via-zinc-900/0 to-[var(--color-primary)]/10 rounded-2xl backdrop-blur-sm border border-zinc-800 flex items-center justify-center hover:scale-105 transition-transform duration-300 cursor-pointer group">
						<div class="text-center space-y-4">
							<div class="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm group-hover:bg-[var(--color-primary)]/30 transition-colors duration-300 group-hover:animate-bounce-slow">
								<Play size={32} class="text-white ml-1" />
							</div>
							<p class="text-zinc-300 group-hover:text-white transition-colors duration-300">Watch Our Showreel</p>
						</div>
					</div>

					<!-- Floating Elements -->
					<div class="absolute -top-4 -right-4 w-24 h-24 bg-[var(--color-primary)]/15 rounded-full blur-xl animate-pulse-slow"></div>
					<div class="absolute -bottom-4 -left-4 w-32 h-32 bg-[var(--color-primary-strong)]/15 rounded-full blur-xl animate-pulse-slow" style="animation-delay: 1s"></div>
				</ScrollReveal>
			</div>
		</div>
	</Container>
</section>
