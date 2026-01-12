<script lang="ts">
	import Container from '../ui/Container.svelte';
	import { resolve } from '$app/paths';
	import Facebook from 'lucide-svelte/icons/facebook';
	import Twitter from 'lucide-svelte/icons/twitter';
	import Instagram from 'lucide-svelte/icons/instagram';
	import Linkedin from 'lucide-svelte/icons/linkedin';
	import Mail from 'lucide-svelte/icons/mail';
	import Phone from 'lucide-svelte/icons/phone';
	import MapPin from 'lucide-svelte/icons/map-pin';

</script>

<footer class="bg-black text-white border-t border-zinc-800">
	<Container>
		<div class="py-4">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
				<!-- Company Info -->
				<div class="space-y-3">
					<a href={resolve('/')} class="inline-flex items-center gap-3">
						<img src="/images/branding/logo.svg" alt="Full Scope Media logo" class="h-10 w-auto" loading="lazy" />
						<span class="text-lg font-semibold text-[var(--color-primary)]">Full Scope Media</span>
					</a>
					<p class="text-sm text-zinc-400 leading-relaxed">
						Real estate and portrait visuals by Ryan Champion. Clean lighting, accurate color, and reliable turnarounds.
					</p>
					<div class="flex gap-3">
						<a
							href="https://facebook.com"
							class="text-zinc-500 hover:text-[var(--color-primary)] transition-colors"
							aria-label="Facebook"
							target="_blank"
							rel="noreferrer"
						>
							<Facebook size={18} />
						</a>
						<a
							href="https://x.com"
							class="text-zinc-500 hover:text-[var(--color-primary)] transition-colors"
							aria-label="Twitter"
							target="_blank"
							rel="noreferrer"
						>
							<Twitter size={18} />
						</a>
						<a
							href="https://instagram.com"
							class="text-zinc-500 hover:text-[var(--color-primary)] transition-colors"
							aria-label="Instagram"
							target="_blank"
							rel="noreferrer"
						>
							<Instagram size={18} />
						</a>
						<a
							href="https://linkedin.com"
							class="text-zinc-500 hover:text-[var(--color-primary)] transition-colors"
							aria-label="LinkedIn"
							target="_blank"
							rel="noreferrer"
						>
							<Linkedin size={18} />
						</a>
					</div>
				</div>

				<!-- Contact Info -->
				<div class="space-y-2">
					<h4 class="text-sm font-semibold text-white">Contact</h4>
					<div class="space-y-2 text-sm text-zinc-300">
						<div class="flex items-center gap-2">
							<Mail size={16} class="text-[var(--color-primary)]" />
							<span>ryan@fullscope-media.com</span>
						</div>
						<div class="flex items-center gap-2">
							<Phone size={16} class="text-[var(--color-primary)]" />
							<span>(517) 220-2934</span>
						</div>
						<div class="flex items-start gap-2">
							<MapPin size={16} class="text-blue-400 mt-0.5" />
							<span>301 MAC Ave Ste 106, East Lansing, MI</span>
						</div>
						<p class="text-zinc-400">Open daily · 7am–10pm ET</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Bottom Bar -->
		<div class="border-t border-gray-800 py-3">
			<div class="flex flex-col md:flex-row justify-between items-center gap-2 text-sm">
				<p class="text-gray-400">© {new Date().getFullYear()} Full Scope Media. All rights reserved.</p>
				<div class="flex gap-4">
					<a href={resolve('/privacy')} class="text-gray-400 hover:text-white transition-colors">
						Privacy Policy
					</a>
					<a href={resolve('/terms')} class="text-gray-400 hover:text-white transition-colors">
						Terms of Service
					</a>
				</div>
			</div>
		</div>
	</Container>
</footer>
