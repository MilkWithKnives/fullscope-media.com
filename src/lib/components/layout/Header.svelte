<script lang="ts">
	import { page } from '$app/stores';
import { resolve } from '$app/paths';
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
	<Container class="header-shell">
		<div class="flex items-center justify-between h-16 gap-4">
			<!-- Logo -->
			<div class="flex-shrink-0">
				<a href={resolve('/' as any)} class="flex items-center gap-3">
					<img src="/images/branding/logo.svg" alt="Full Scope Media logo" class="h-12 w-auto md:h-14" loading="lazy" />
					<span class="hidden sm:inline text-xl font-bold text-[var(--color-primary)]"></span>
				</a>
			</div>

			<!-- Desktop Navigation -->
			<nav class="hidden sm:flex space-x-4 md:space-x-6">
				{#each navigation as item (item.href)}
					<a
						href={resolve(item.href as any)}
						class={cn(
							'cta-button cta-nav',
							item.highlight && 'cta-highlight',
							$page.url.pathname === item.href && !item.highlight && 'cta-active'
						)}
					>
						{item.name}
					</a>
				{/each}
			</nav>

			<!-- CTA Button -->
			<div class="hidden sm:block ml-4 md:ml-5">
				<a href={resolve('/contact' as any)} class="cta-button">Get Started</a>
			</div>

			<!-- Mobile menu button -->
			<div class="sm:hidden">
				<button
					onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
					class="text-zinc-300 hover:text-[var(--color-primary)] p-2"
					aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
					aria-expanded={mobileMenuOpen}
					aria-controls="mobile-primary-nav"
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
					<nav id="mobile-primary-nav" class="flex flex-col space-y-2">
						{#each navigation as item (item.href)}
							<a
								href={resolve(item.href as any)}
								class={cn(
									'cta-button w-full text-center',
									item.highlight && 'cta-highlight',
									$page.url.pathname === item.href && !item.highlight && 'cta-active'
								)}
								onclick={() => (mobileMenuOpen = false)}
						>
							{item.name}
						</a>
						{/each}
						<div class="pt-2">
							<a href={resolve('/contact' as any)} class="cta-button w-full text-center block">Get Started</a>
						</div>
					</nav>
			</div>
		{/if}
	</Container>
</header>

<style>
	.cta-button {
		width: auto;
		min-width: 8.5em;
		position: relative;
		height: 3.2em;
		border: 2px solid var(--color-primary);
		outline: none;
		background-color: transparent;
		color: #f5f6f8;
		transition: 0.35s ease;
		border-radius: 0.3em;
		font-size: 13px;
		font-weight: 700;
		letter-spacing: 0.08em;
		cursor: pointer;
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		text-transform: uppercase;
		padding: 0 1.4em;
		overflow: hidden;
	}

	.cta-nav {
		font-size: 13px;
	}

	.cta-active {
		color: #149cea;
	}

	.cta-button::after {
		content: '';
		position: absolute;
		inset: -2px;
		background: linear-gradient(120deg, transparent 0%, rgba(255, 95, 59, 0.2) 50%, transparent 100%);
		transform: translateX(-130%);
		transition: transform 0.4s ease;
		pointer-events: none;
		z-index: 0;
	}

	.cta-button::before {
		content: '';
		position: absolute;
		inset: -2px;
		background: linear-gradient(45deg, rgba(231, 233, 239, 0.08), transparent 60%);
		opacity: 0;
		transition: opacity 0.35s ease;
		pointer-events: none;
		z-index: 0;
	}

	.cta-button:hover::before,
	.cta-button:hover::after {
		transform: translateX(0);
		opacity: 1;
	}

	.cta-button:hover {
		box-shadow:
			0 0 16px rgba(231, 233, 239, 0.22),
			0 0 22px rgba(255, 95, 59, 0.24),
			inset 0 0 10px rgba(255, 95, 59, 0.2);
	}

	.header-shell {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding-left: clamp(1.5rem, 4vw, 3rem);
		padding-right: clamp(1.5rem, 4vw, 3rem);
	}
</style>
