<script lang="ts">
	import Container from '../ui/Container.svelte';
	import Card from '../ui/Card.svelte';
	import Button from '../ui/Button.svelte';
	import { Video, Camera, Megaphone, Globe, ArrowRight } from 'lucide-svelte';

	const services = [
		{
			icon: Video,
			title: 'Video Production',
			description: 'From corporate videos to commercials, we create compelling visual stories that engage your audience and drive results.',
			features: ['Corporate Videos', 'Commercials', 'Event Coverage', 'Documentaries']
		},
		{
			icon: Camera,
			title: 'Photography',
			description: 'Professional photography services for all your business needs, from product shots to corporate headshots.',
			features: ['Product Photography', 'Corporate Headshots', 'Event Photography', 'Brand Photography']
		},
		{
			icon: Megaphone,
			title: 'Digital Marketing',
			description: 'Strategic digital marketing campaigns that amplify your brand and connect with your target audience.',
			features: ['Social Media Marketing', 'Content Strategy', 'Brand Development', 'Campaign Management']
		},
		{
			icon: Globe,
			title: 'Web Design',
			description: 'Modern, responsive websites that showcase your brand and convert visitors into customers.',
			features: ['Responsive Design', 'E-commerce', 'SEO Optimization', 'Content Management']
		}
	];
</script>

<section class="py-24 bg-gray-50">
	<Container>
		<div class="text-center mb-16">
			<h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
				Our Services
			</h2>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				We offer a comprehensive range of creative services to help your business stand out 
				and connect with your audience in meaningful ways.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
			{#each services as service}
				<Card class="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
					<div class="space-y-4">
						<div class="flex items-center space-x-4">
							<div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
								<svelte:component this={service.icon} size={24} class="text-blue-600" />
							</div>
							<h3 class="text-xl font-semibold text-gray-900">{service.title}</h3>
						</div>
						
						<p class="text-gray-600 leading-relaxed">
							{service.description}
						</p>
						
						<ul class="space-y-2">
							{#each service.features as feature}
								<li class="flex items-center space-x-2 text-sm text-gray-500">
									<div class="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
									<span>{feature}</span>
								</li>
							{/each}
						</ul>
						
						<div class="pt-4">
							<Button variant="ghost" size="sm" class="text-blue-600 hover:text-blue-700 p-0">
								<a href="/services" class="flex items-center space-x-1">
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
				<a href="/services">View All Services</a>
			</Button>
		</div>
	</Container>
</section>
