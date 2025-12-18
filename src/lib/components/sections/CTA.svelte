<script lang="ts">
	import Container from '../ui/Container.svelte';
	import Button from '../ui/Button.svelte';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import Phone from 'lucide-svelte/icons/phone';
</script>

<section class="py-24 bg-black text-white">
	<Container>
		<div class="text-center space-y-8">
			<div class="space-y-4">
				<h2 class="text-3xl md:text-4xl font-bold">
					Ready to Bring Your Vision to Life?
				</h2>
				<p class="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
					Let's discuss your project and create something amazing together. 
					Our team is ready to help you tell your story in a way that resonates with your audience.
				</p>
			</div>

			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<Button variant="primary" size="lg" class="text-black">
					<a href="/contact" class="flex items-center gap-2">
						Start Your Project
						<ArrowRight size={20} />
					</a>
				</Button>
				<Button variant="outline" size="lg" class="border-white text-white hover:bg-white/10">
					<a href="tel:+15551234567" class="flex items-center gap-2">
						<Phone size={20} />
						Call Us Now
					</a>
				</Button>
			</div>

			<!-- Trust Indicators -->
			<div class="pt-12 border-t border-white/20">
				<p class="text-gray-300 mb-6">Trusted by leading brands and growing businesses</p>
				<div class="flex flex-wrap justify-center items-center gap-8 opacity-60">
					<!-- Placeholder for client logos -->
					<div class="h-12 w-24 bg-white/20 rounded flex items-center justify-center">
						<span class="text-xs">Client Logo</span>
					</div>
					<div class="h-12 w-24 bg-white/20 rounded flex items-center justify-center">
						<span class="text-xs">Client Logo</span>
					</div>
					<div class="h-12 w-24 bg-white/20 rounded flex items-center justify-center">
						<span class="text-xs">Client Logo</span>
					</div>
					<div class="h-12 w-24 bg-white/20 rounded flex items-center justify-center">
						<span class="text-xs">Client Logo</span>
					</div>
				</div>
			</div>
		</div>
	</Container>
</section>
