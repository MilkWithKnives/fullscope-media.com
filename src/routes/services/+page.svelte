<script lang="ts">
	import Container from '$lib/components/ui/Container.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Video from 'lucide-svelte/icons/video';
	import Camera from 'lucide-svelte/icons/camera';
	import Megaphone from 'lucide-svelte/icons/megaphone';
	import Globe from 'lucide-svelte/icons/globe';
	import Check from 'lucide-svelte/icons/check';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';

	const services = [
		{
			icon: Video,
			title: 'Video Production',
			description: 'Professional video production services that tell your story with impact and authenticity.',
			features: [
				'Corporate Videos & Testimonials',
				'Commercial & Advertising Content',
				'Event Coverage & Live Streaming',
				'Documentary & Narrative Films',
				'Training & Educational Videos',
				'Social Media Video Content'
			],
			pricing: 'Starting at $2,500',
			popular: true
		},
		{
			icon: Camera,
			title: 'Photography',
			description: 'Stunning photography that captures your brand essence and connects with your audience.',
			features: [
				'Product & E-commerce Photography',
				'Corporate Headshots & Team Photos',
				'Event & Conference Photography',
				'Brand & Lifestyle Photography',
				'Real Estate Photography',
				'Food & Restaurant Photography'
			],
			pricing: 'Starting at $500',
			popular: false
		},
		{
			icon: Megaphone,
			title: 'Digital Marketing',
			description: 'Strategic digital marketing campaigns that amplify your reach and drive conversions.',
			features: [
				'Social Media Strategy & Management',
				'Content Creation & Curation',
				'Brand Development & Guidelines',
				'Campaign Planning & Execution',
				'Analytics & Performance Tracking',
				'Influencer Partnership Management'
			],
			pricing: 'Starting at $1,500/month',
			popular: false
		},
		{
			icon: Globe,
			title: 'Web Design & Development',
			description: 'Modern, responsive websites that showcase your brand and convert visitors into customers.',
			features: [
				'Custom Website Design',
				'E-commerce Development',
				'Mobile-First Responsive Design',
				'SEO Optimization',
				'Content Management Systems',
				'Website Maintenance & Support'
			],
			pricing: 'Starting at $3,000',
			popular: false
		}
	];
</script>

<svelte:head>
	<title>Services - Full Scope Media</title>
	<meta name="description" content="Professional video production, photography, digital marketing, and web design services. Comprehensive creative solutions for your business." />
</svelte:head>

<!-- Hero Section -->
<section class="bg-black text-white py-24">
	<Container>
		<div class="text-center space-y-6">
			<h1 class="text-4xl md:text-5xl font-bold">Our Services</h1>
			<p class="text-xl text-gray-200 max-w-3xl mx-auto">
				Comprehensive creative solutions designed to elevate your brand and drive results. 
				From concept to completion, we deliver excellence in every project.
			</p>
		</div>
	</Container>
</section>

<!-- Services Grid -->
<section class="py-24 bg-white">
	<Container>
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
			{#each services as service}
				<Card class="relative overflow-hidden group hover:shadow-xl transition-all duration-300">
					{#if service.popular}
						<div class="absolute top-4 right-4 bg-[var(--color-primary-strong)] text-black px-3 py-1 rounded-full text-sm font-medium">
							Most Popular
						</div>
					{/if}
					
					<div class="space-y-6">
						<div class="flex items-center space-x-4">
							<div class="w-16 h-16 bg-[var(--color-primary)]/15 rounded-xl flex items-center justify-center group-hover:bg-[var(--color-primary)]/25 transition-colors">
								<svelte:component this={service.icon} size={32} class="text-[var(--color-primary-strong)]" />
							</div>
							<div>
								<h3 class="text-2xl font-bold text-gray-900">{service.title}</h3>
								<p class="text-[var(--color-primary-strong)] font-semibold">{service.pricing}</p>
							</div>
						</div>
						
						<p class="text-gray-600 leading-relaxed">
							{service.description}
						</p>
						
						<div class="space-y-3">
							<h4 class="font-semibold text-gray-900">What's Included:</h4>
							<ul class="space-y-2">
								{#each service.features as feature}
									<li class="flex items-start space-x-3">
										<Check size={16} class="text-[var(--color-primary-strong)] mt-0.5 flex-shrink-0" />
										<span class="text-gray-600">{feature}</span>
									</li>
								{/each}
							</ul>
						</div>
						
						<div class="pt-4">
							<Button variant="primary" class="w-full text-black">
								<a href="/contact" class="flex items-center justify-center space-x-2">
									<span>Get Started</span>
									<ArrowRight size={16} />
								</a>
							</Button>
						</div>
					</div>
				</Card>
			{/each}
		</div>
	</Container>
</section>

<!-- Process Section -->
<section class="py-24 bg-white">
	<Container>
		<div class="text-center mb-16">
			<h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Process</h2>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				We follow a proven process to ensure every project exceeds expectations and delivers measurable results.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-4 gap-8">
			<div class="text-center">
				<div class="w-16 h-16 bg-[var(--color-primary)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
					<span class="text-2xl font-bold text-[var(--color-primary-strong)]">1</span>
				</div>
				<h3 class="text-lg font-semibold text-gray-900 mb-2">Discovery</h3>
				<p class="text-gray-600">We learn about your goals, audience, and vision to create the perfect strategy.</p>
			</div>
			<div class="text-center">
				<div class="w-16 h-16 bg-[var(--color-primary)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
					<span class="text-2xl font-bold text-[var(--color-primary-strong)]">2</span>
				</div>
				<h3 class="text-lg font-semibold text-gray-900 mb-2">Planning</h3>
				<p class="text-gray-600">Detailed project planning with timelines, deliverables, and creative concepts.</p>
			</div>
			<div class="text-center">
				<div class="w-16 h-16 bg-[var(--color-primary)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
					<span class="text-2xl font-bold text-[var(--color-primary-strong)]">3</span>
				</div>
				<h3 class="text-lg font-semibold text-gray-900 mb-2">Production</h3>
				<p class="text-gray-600">Expert execution using professional equipment and proven techniques.</p>
			</div>
			<div class="text-center">
				<div class="w-16 h-16 bg-[var(--color-primary)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
					<span class="text-2xl font-bold text-[var(--color-primary-strong)]">4</span>
				</div>
				<h3 class="text-lg font-semibold text-gray-900 mb-2">Delivery</h3>
				<p class="text-gray-600">Final delivery with ongoing support and optimization recommendations.</p>
			</div>
		</div>
	</Container>
</section>

<!-- CTA Section -->
<section class="py-24 bg-black text-white">
	<Container>
		<div class="text-center space-y-8">
			<h2 class="text-3xl md:text-4xl font-bold">Ready to Get Started?</h2>
			<p class="text-xl text-gray-200 max-w-2xl mx-auto">
				Let's discuss your project and create a custom solution that fits your needs and budget.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<Button variant="primary" size="lg" class="text-black">
					<a href="/contact">Start Your Project</a>
				</Button>
				<Button variant="outline" size="lg" class="border-white text-white hover:bg-white/10">
					<a href="/portfolio">View Our Work</a>
				</Button>
			</div>
		</div>
	</Container>
</section>
