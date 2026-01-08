<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	import Container from '../ui/Container.svelte';
	import Button from '../ui/Button.svelte';
	import Menu from 'lucide-svelte/icons/menu';
	import X from 'lucide-svelte/icons/x';

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

<header class="bg-black/90 backdrop-blur-md border-b border-zinc-800 sticky top-0 z-50">
	<Container>
		<div class="flex items-center justify-between h-16">
			<!-- Logo -->
			<div class="flex-shrink-0">
				<a href="/" class="flex items-center gap-2">
					<img src="/logo.png" alt="Full Scope Media logo" class="h-10 w-auto" loading="lazy" />
					<span class="hidden sm:inline text-xl font-bold text-[var(--color-primary)]">Full Scope Media</span>
				</a>
			</div>

			<!-- Desktop Navigation -->
			<nav class="hidden sm:flex space-x-6 md:space-x-8">
				{#each navigation as item}
					<a
						href={item.href}
						class={cn(
							'px-3 py-2 text-sm font-medium transition-colors rounded-md',
							item.highlight
								? 'bg-[var(--color-primary)] text-black hover:bg-[var(--color-primary)]/90'
								: 'text-zinc-300 hover:text-[var(--color-primary)]',
							$page.url.pathname === item.href && !item.highlight && 'text-[var(--color-primary)]'
						)}
					>
						{item.name}
					</a>
				{/each}
			</nav>

			<!-- CTA Button -->
			<div class="hidden sm:block">
				<Button variant="primary" size="sm">
					<a href="/contact">Get Started</a>
				</Button>
			</div>

			<!-- Mobile menu button -->
			<div class="sm:hidden">
				<button
					onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
					class="text-zinc-300 hover:text-[var(--color-primary)] p-2"
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
			<div class="md:hidden border-t border-zinc-800 py-4">
				<nav class="flex flex-col space-y-2">
					{#each navigation as item}
						<a
							href={item.href}
							class={cn(
								'px-3 py-2 text-base font-medium transition-colors rounded-md',
								item.highlight
									? 'bg-[var(--color-primary)] text-black hover:bg-[var(--color-primary)]/90'
									: 'text-zinc-300 hover:text-[var(--color-primary)]',
								$page.url.pathname === item.href && !item.highlight && 'text-[var(--color-primary)]'
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
