<script lang="ts">
	import Container from '../ui/Container.svelte';
	import Card from '../ui/Card.svelte';
	import Button from '../ui/Button.svelte';
	import Video from 'lucide-svelte/icons/video';
	import Camera from 'lucide-svelte/icons/camera';
	import Megaphone from 'lucide-svelte/icons/megaphone';
	import Globe from 'lucide-svelte/icons/globe';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import { resolve } from '$app/paths';

	const services = [
		{
			icon: Video,
			title: 'Video Production',
			description: 'Concept-through-delivery video that clarifies your message and moves viewers to act.',
			features: ['Brand & Corporate Films', 'Commercial Spots', 'Event Coverage', 'Documentary-style Stories']
		},
		{
			icon: Camera,
			title: 'Photography',
			description: 'Clean, consistent images that showcase products, people, and spaces at their best.',
			features: ['Product Sets', 'Executive Portraits', 'Events & Conferences', 'Brand/Lifestyle Campaigns']
		},
		{
			icon: Megaphone,
			title: 'Digital Marketing',
			description: 'Campaign strategy, content, and reporting tailored to the channels that matter to you.',
			features: ['Social & Content Strategy', 'Always-on Campaigns', 'Brand Positioning', 'Performance Reporting']
		},
		{
			icon: Globe,
			title: 'Web Design',
			description: 'Modern, responsive sites that tell your story clearly and convert visitors into customers.',
			features: ['UX/UI & Responsive Build', 'E-commerce', 'On-page SEO', 'CMS & Content Support']
		}
	];
</script>

<section class="py-24 bg-black">
	<Container>
		<div class="text-center mb-16">
			<h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
				What we deliver
			</h2>
			<p class="text-xl text-zinc-400 max-w-3xl mx-auto">
				Full-service creative support, from the first draft to launch day—built to keep your brand cohesive and effective.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
			{#each services as service (service.title)}
				<Card class="group bg-zinc-900 border border-zinc-800 hover:border-[var(--color-primary)]/50 transition-all duration-300 hover:-translate-y-1">
					<div class="space-y-4">
						<div class="flex items-center space-x-4">
							<div class="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center group-hover:bg-[var(--color-primary)]/10 transition-colors">
								<service.icon size={24} class="text-[var(--color-primary)]" />
							</div>
							<h3 class="text-xl font-semibold text-white">{service.title}</h3>
						</div>
						
						<p class="text-zinc-400 leading-relaxed">
							{service.description}
						</p>
						
						<ul class="space-y-2">
							{#each service.features as feature (feature)}
								<li class="flex items-center space-x-2 text-sm text-zinc-500">
									<div class="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full"></div>
									<span>{feature}</span>
								</li>
							{/each}
						</ul>
						
						<div class="pt-4">
							<Button variant="ghost" size="sm" class="text-[var(--color-primary)] hover:text-[var(--color-primary-strong)] p-0 hover:bg-transparent">
								<a href={resolve('/services')} class="flex items-center space-x-1">
									<span>Learn More</span>
									<ArrowRight size={16} />
								</a>
							</Button>
						</div>
					</div>
				</Card>
			{/each}
		</div>

		<div class="text-center">
			<Button variant="primary" size="lg">
				<a href={resolve('/services')}>View All Services</a>
			</Button>
		</div>
	</Container>
</section>
