<script lang="ts">
	import Home from 'lucide-svelte/icons/home';
	import Briefcase from 'lucide-svelte/icons/briefcase';
	import Camera from 'lucide-svelte/icons/camera';
	import Building from 'lucide-svelte/icons/building';
	import User from 'lucide-svelte/icons/user';
	import Mail from 'lucide-svelte/icons/mail';
	import Facebook from 'lucide-svelte/icons/facebook';
	import Twitter from 'lucide-svelte/icons/twitter';
	import Instagram from 'lucide-svelte/icons/instagram';
	import Linkedin from 'lucide-svelte/icons/linkedin';
	import Dock from './Dock.svelte';
	import DockIcon from './DockIcon.svelte';
	import Tooltip from '../Tooltip.svelte';
	import Separator from '../Separator.svelte';

	const navItems = [
		{ label: 'Home', icon: Home, href: '/' },
		{ label: 'Services', icon: Briefcase, href: '/services' },
		{ label: 'Portfolio', icon: Camera, href: '/portfolio' },
		{ label: 'Studio Rental', icon: Building, href: '/studio' },
		{ label: 'About', icon: User, href: '/about' },
		{ label: 'Contact', icon: Mail, href: '/contact' }
	];

	const contactItems = [
		{ label: 'Facebook', icon: Facebook, href: '#' },
		{ label: 'Instagram', icon: Instagram, href: '#' },
		{ label: 'LinkedIn', icon: Linkedin, href: '#' },
		{ label: 'Twitter', icon: Twitter, href: '#' }
	];
</script>

<div class="flex justify-center py-3">
	<Dock direction="middle" class="relative">
		{#snippet children({ mouseX, distance, magnification })}
			{#each navItems as item}
				<DockIcon {mouseX} {magnification} {distance}>
					<Tooltip content={item.label} sideOffset={8}>
						<a
							href={item.href}
							class="flex h-full w-full items-center justify-center rounded-full bg-white/10 text-gray-300 transition-all duration-200 hover:bg-white/20 hover:text-white dark:bg-gray-700/50 dark:hover:bg-gray-600/70"
						>
							<svelte:component this={item.icon} size={20} strokeWidth={1.5} />
						</a>
					</Tooltip>
				</DockIcon>
			{/each}
			
			<Separator orientation="vertical" class="h-8 mx-1" />
			
			{#each contactItems as item}
				<DockIcon {mouseX} {magnification} {distance}>
					<Tooltip content={item.label} sideOffset={8}>
						<a
							href={item.href}
							class="flex h-full w-full items-center justify-center rounded-full bg-white/10 text-gray-300 transition-all duration-200 hover:bg-white/20 hover:text-white dark:bg-gray-700/50 dark:hover:bg-gray-600/70"
							target="_blank"
							rel="noopener noreferrer"
						>
							<svelte:component this={item.icon} size={18} strokeWidth={1.5} />
						</a>
					</Tooltip>
				</DockIcon>
			{/each}
		{/snippet}
	</Dock>
</div>
