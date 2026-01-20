<script lang="ts">
	import Container from '../ui/Container.svelte';
	import Button from '../ui/Button.svelte';
	import Award from 'lucide-svelte/icons/award';
	import Users from 'lucide-svelte/icons/users';
	import Target from 'lucide-svelte/icons/target';
	import Zap from 'lucide-svelte/icons/zap';
	import { resolve } from '$app/paths';

	const values = [
		{
			icon: Award,
			title: 'Excellence',
			description: 'We strive for perfection in every project, delivering exceptional quality that exceeds expectations.'
		},
		{
			icon: Users,
			title: 'Collaboration',
			description: 'We work closely with our clients as partners, ensuring their vision is brought to life authentically.'
		},
		{
			icon: Target,
			title: 'Results-Driven',
			description: 'Every creative decision is made with your business goals in mind, ensuring measurable impact.'
		},
		{
			icon: Zap,
			title: 'Innovation',
			description: 'We stay ahead of trends and technology to deliver cutting-edge solutions that stand out.'
		}
	];
</script>

<section class="py-16 md:py-24 bg-black">
	<Container>
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
			<!-- Content -->
			<div class="space-y-8">
				<div class="space-y-4">
					<h2 class="text-3xl md:text-4xl font-bold text-white">
						About Full Scope Media
					</h2>
					<p class="text-xl text-zinc-400 leading-relaxed">
						We're a creative studio focused on clear storytelling and crisp execution. Our team blends strategy, production, and design to help brands communicate with confidence.
					</p>
				</div>

				<div class="space-y-6">
					<p class="text-zinc-400 leading-relaxed">
						We pair creative direction with measurable goals so every deliverable earns its keep—whether that's a launch film, a refreshed library of photos, or a site that finally tells your story.
					</p>
					<p class="text-zinc-400 leading-relaxed">
						From early-stage teams to established organizations, we keep projects organized, communication clear, and quality consistent from start to finish.
					</p>
				</div>

				<Button variant="primary" size="lg">
					<a href={resolve('/about')}>Learn More About Us</a>
				</Button>
			</div>

			<!-- Values Grid -->
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
				{#each values as value (value.title)}
					<div class="p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-800 transition-colors">
						<div class="w-12 h-12 bg-[var(--color-primary)]/10 rounded-lg flex items-center justify-center mb-4">
							<value.icon size={24} class="text-[var(--color-primary)]" />
						</div>
						<h3 class="text-lg font-semibold text-white mb-2">{value.title}</h3>
						<p class="text-zinc-400 text-sm leading-relaxed">{value.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</Container>
</section>
