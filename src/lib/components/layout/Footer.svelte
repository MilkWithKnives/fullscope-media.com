<script lang="ts">
	import Container from '../ui/Container.svelte';
	import FooterDock from '../ui/dock/FooterDock.svelte';
	import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-svelte';

	const socialLinks = [
		{ name: 'Facebook', href: '#', icon: Facebook },
		{ name: 'Twitter', href: '#', icon: Twitter },
		{ name: 'Instagram', href: '#', icon: Instagram },
		{ name: 'LinkedIn', href: '#', icon: Linkedin }
	];

	const quickLinks = [
		{ name: 'Services', href: '/services' },
		{ name: 'Portfolio', href: '/portfolio' },
		{ name: 'About', href: '/about' },
		{ name: 'Contact', href: '/contact' }
	];

	const services = [
		{ name: 'Video Production', href: '/services#video' },
		{ name: 'Photography', href: '/services#photography' },
		{ name: 'Digital Marketing', href: '/services#marketing' },
		{ name: 'Web Design', href: '/services#web' }
	];
</script>

<footer class="bg-gray-900 text-white">
	<Container>
		<div class="py-6">
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<!-- Company Info -->
				<div>
					<h3 class="text-xl font-bold text-blue-400 mb-2">Full Scope Media</h3>
					<p class="text-gray-300 mb-3">
						Creating compelling visual stories that connect, inspire, and drive results for your brand.
					</p>
					<div class="flex space-x-4">
						{#each socialLinks as social}
							<a
								href={social.href}
								class="text-gray-400 hover:text-blue-400 transition-colors"
								aria-label={social.name}
							>
								<svelte:component this={social.icon} size={20} />
							</a>
						{/each}
					</div>
				</div>

				<!-- Quick Links -->
				<div>
					<h4 class="text-base font-semibold mb-2">Quick Links</h4>
					<ul class="space-y-1">
						{#each quickLinks as link}
							<li>
								<a href={link.href} class="text-gray-300 hover:text-white transition-colors">
									{link.name}
								</a>
							</li>
						{/each}
					</ul>
				</div>

				<!-- Services -->
				<div>
					<h4 class="text-base font-semibold mb-2">Services</h4>
					<ul class="space-y-1">
						{#each services as service}
							<li>
								<a href={service.href} class="text-gray-300 hover:text-white transition-colors">
									{service.name}
								</a>
							</li>
						{/each}
					</ul>
				</div>

				<!-- Contact Info -->
				<div>
					<h4 class="text-base font-semibold mb-2">Contact</h4>
					<div class="space-y-2">
						<div class="flex items-center space-x-3">
							<Mail size={16} class="text-blue-400" />
							<span class="text-gray-300">info@fullscopemedia.com</span>
						</div>
						<div class="flex items-center space-x-3">
							<Phone size={16} class="text-blue-400" />
							<span class="text-gray-300">(555) 123-4567</span>
						</div>
						<div class="flex items-center space-x-3">
							<MapPin size={16} class="text-blue-400" />
							<span class="text-gray-300">Your City, State</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Interactive Dock -->
		<div class="border-t border-gray-800">
			<Container>
				<FooterDock />
			</Container>
		</div>

		<!-- Bottom Bar -->
		<div class="border-t border-gray-800 py-3">
			<div class="flex flex-col md:flex-row justify-between items-center">
				<p class="text-gray-400 text-sm">
					© {new Date().getFullYear()} Full Scope Media. All rights reserved.
				</p>
				<div class="flex space-x-6 mt-2 md:mt-0">
					<a href="/privacy" class="text-gray-400 hover:text-white text-sm transition-colors">
						Privacy Policy
					</a>
					<a href="/terms" class="text-gray-400 hover:text-white text-sm transition-colors">
						Terms of Service
					</a>
				</div>
			</div>
		</div>
	</Container>
</footer>
