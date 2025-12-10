<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	import Container from '../ui/Container.svelte';
	import Button from '../ui/Button.svelte';
	import { Menu, X } from 'lucide-svelte';

	let mobileMenuOpen = $state(false);

	const navigation = [
		{ name: 'Home', href: '/' },
		{ name: 'Services', href: '/services' },
		{ name: 'Portfolio', href: '/portfolio' },
		{ name: 'Studio Rental', href: '/studio' },
		{ name: 'About', href: '/about' },
		{ name: 'Contact', href: '/contact' },
		{ name: 'Book Now', href: '/book', highlight: true }
	];
</script>

<header class="bg-white shadow-sm sticky top-0 z-50">
	<Container>
		<div class="flex items-center justify-between h-16">
			<!-- Logo -->
			<div class="flex-shrink-0">
				<a href="/" class="flex items-center">
					<span class="text-2xl font-bold text-blue-600">Full Scope Media</span>
				</a>
			</div>

			<!-- Desktop Navigation -->
			<nav class="hidden md:flex space-x-8">
				{#each navigation as item}
					<a
						href={item.href}
						class={cn(
							'px-3 py-2 text-sm font-medium transition-colors rounded-md',
							item.highlight
								? 'bg-blue-600 text-white hover:bg-blue-700'
								: 'text-gray-700 hover:text-blue-600',
							$page.url.pathname === item.href && !item.highlight && 'text-blue-600'
						)}
					>
						{item.name}
					</a>
				{/each}
			</nav>

			<!-- CTA Button -->
			<div class="hidden md:block">
				<Button variant="primary" size="sm">
					<a href="/contact">Get Started</a>
				</Button>
			</div>

			<!-- Mobile menu button -->
			<div class="md:hidden">
				<button
					onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
					class="text-gray-700 hover:text-blue-600 p-2"
				>
					{#if mobileMenuOpen}
						<X size={24} />
					{:else}
						<Menu size={24} />
					{/if}
				</button>
			</div>
		</div>

		<!-- Mobile Navigation -->
		{#if mobileMenuOpen}
			<div class="md:hidden border-t border-gray-200 py-4">
				<nav class="flex flex-col space-y-2">
					{#each navigation as item}
						<a
							href={item.href}
							class={cn(
								'px-3 py-2 text-base font-medium transition-colors rounded-md',
								item.highlight
									? 'bg-blue-600 text-white hover:bg-blue-700'
									: 'text-gray-700 hover:text-blue-600',
								$page.url.pathname === item.href && !item.highlight && 'text-blue-600'
							)}
							onclick={() => (mobileMenuOpen = false)}
						>
							{item.name}
						</a>
					{/each}
					<div class="pt-2">
						<Button variant="primary" size="sm" class="w-full">
							<a href="/contact">Get Started</a>
						</Button>
					</div>
				</nav>
			</div>
		{/if}
	</Container>
</header>
