<script lang="ts">
	import Container from '../ui/Container.svelte';
	import Button from '../ui/Button.svelte';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import Phone from 'lucide-svelte/icons/phone';
	import { resolve } from '$app/paths';
</script>

<section class="py-24 bg-black text-white">
	<Container>
		<div class="text-center space-y-8">
			<div class="space-y-4">
				<h2 class="text-3xl md:text-4xl font-bold">
					Ready to make the next project your best one yet?
				</h2>
				<p class="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
					Tell us what you need—strategy, production, or a full campaign—and we’ll bring a clear plan, a senior team, and on-time delivery.
				</p>
			</div>

			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<Button variant="primary" size="lg" class="text-black">
					<a href={resolve('/contact')} class="flex items-center gap-2">
						Start Your Project
						<ArrowRight size={20} />
					</a>
				</Button>
				<Button variant="outline" size="lg" class="border-zinc-700 text-white hover:bg-zinc-800">
					<a href="tel:+15172202934" class="flex items-center gap-2">
						<Phone size={20} />
						Call Us Now
					</a>
				</Button>
			</div>

			<!-- Trust Indicators -->
			<div class="pt-12 border-t border-zinc-800">
				<p class="text-zinc-400 mb-6">Trusted by leading brands and growing businesses</p>
				<div class="flex flex-wrap justify-center items-center gap-8 opacity-60">
					<!-- Placeholder for client logos -->
					<div class="h-12 w-24 bg-zinc-800 rounded flex items-center justify-center">
						<span class="text-xs">Client</span>
					</div>
					<div class="h-12 w-24 bg-zinc-800 rounded flex items-center justify-center">
						<span class="text-xs">Client</span>
					</div>
					<div class="h-12 w-24 bg-zinc-800 rounded flex items-center justify-center">
						<span class="text-xs">Client</span>
					</div>
					<div class="h-12 w-24 bg-zinc-800 rounded flex items-center justify-center">
						<span class="text-xs">Client</span>
					</div>
				</div>
			</div>
		</div>
	</Container>
</section>
