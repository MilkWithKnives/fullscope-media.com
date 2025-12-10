<script lang="ts">
	import Container from '$lib/components/ui/Container.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { Award, Users, Target, Zap, Linkedin, Mail } from 'lucide-svelte';

	const values = [
		{
			icon: Award,
			title: 'Excellence',
			description: 'We strive for perfection in every project, delivering exceptional quality that exceeds expectations and drives real results for our clients.'
		},
		{
			icon: Users,
			title: 'Collaboration',
			description: 'We work closely with our clients as true partners, ensuring their vision is brought to life authentically and effectively.'
		},
		{
			icon: Target,
			title: 'Results-Driven',
			description: 'Every creative decision is made with your business goals in mind, ensuring measurable impact and return on investment.'
		},
		{
			icon: Zap,
			title: 'Innovation',
			description: 'We stay ahead of trends and technology to deliver cutting-edge solutions that make your brand stand out from the competition.'
		}
	];

	const team = [
		{
			name: 'Sarah Johnson',
			role: 'Creative Director & Founder',
			bio: 'With over 10 years in the industry, Sarah leads our creative vision and ensures every project tells a compelling story.',
			image: '/api/placeholder/300/300',
			linkedin: '#',
			email: 'sarah@fullscopemedia.com'
		},
		{
			name: 'Mike Chen',
			role: 'Lead Video Producer',
			bio: 'Mike brings technical expertise and creative flair to every video project, from concept development to final delivery.',
			image: '/api/placeholder/300/300',
			linkedin: '#',
			email: 'mike@fullscopemedia.com'
		},
		{
			name: 'Emily Rodriguez',
			role: 'Senior Photographer',
			bio: 'Emily captures stunning visuals that tell your brand story, specializing in commercial and lifestyle photography.',
			image: '/api/placeholder/300/300',
			linkedin: '#',
			email: 'emily@fullscopemedia.com'
		},
		{
			name: 'David Park',
			role: 'Digital Marketing Strategist',
			bio: 'David develops comprehensive digital strategies that amplify your content and connect with your target audience.',
			image: '/api/placeholder/300/300',
			linkedin: '#',
			email: 'david@fullscopemedia.com'
		}
	];

	const stats = [
		{ number: '500+', label: 'Projects Completed' },
		{ number: '50+', label: 'Happy Clients' },
		{ number: '5+', label: 'Years Experience' },
		{ number: '15+', label: 'Industry Awards' }
	];
</script>

<svelte:head>
	<title>About - Full Scope Media</title>
	<meta name="description" content="Learn about Full Scope Media's team, values, and mission. We're passionate about creating compelling visual stories that drive results for businesses." />
</svelte:head>

<!-- Hero Section -->
<section class="bg-gradient-to-br from-blue-900 to-purple-900 text-white py-24">
	<Container>
		<div class="text-center space-y-6">
			<h1 class="text-4xl md:text-5xl font-bold">About Full Scope Media</h1>
			<p class="text-xl text-blue-100 max-w-3xl mx-auto">
				We're a passionate team of creatives dedicated to telling stories that matter. 
				Our mission is to help businesses connect with their audiences through powerful visual content.
			</p>
		</div>
	</Container>
</section>

<!-- Story Section -->
<section class="py-24 bg-white">
	<Container>
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
			<div class="space-y-6">
				<h2 class="text-3xl md:text-4xl font-bold text-gray-900">Our Story</h2>
				<div class="space-y-4 text-gray-600 leading-relaxed">
					<p>
						Founded in 2019, Full Scope Media began with a simple belief: every brand has a unique story 
						worth telling. What started as a small creative studio has grown into a full-service agency 
						that combines artistic vision with strategic thinking.
					</p>
					<p>
						We've had the privilege of working with startups finding their voice, established businesses 
						evolving their brand, and everything in between. Each project teaches us something new and 
						reinforces our commitment to excellence.
					</p>
					<p>
						Today, we're proud to be trusted partners to businesses across industries, helping them 
						create content that not only looks great but drives real, measurable results.
					</p>
				</div>
			</div>
			
			<!-- Stats -->
			<div class="grid grid-cols-2 gap-8">
				{#each stats as stat}
					<div class="text-center p-6 bg-gray-50 rounded-xl">
						<div class="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
						<div class="text-gray-600">{stat.label}</div>
					</div>
				{/each}
			</div>
		</div>
	</Container>
</section>

<!-- Values Section -->
<section class="py-24 bg-gray-50">
	<Container>
		<div class="text-center mb-16">
			<h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				These core values guide everything we do and shape how we work with our clients and each other.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			{#each values as value}
				<Card class="text-center hover:shadow-lg transition-shadow duration-300">
					<div class="space-y-4">
						<div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
							<svelte:component this={value.icon} size={32} class="text-blue-600" />
						</div>
						<h3 class="text-xl font-semibold text-gray-900">{value.title}</h3>
						<p class="text-gray-600 leading-relaxed">{value.description}</p>
					</div>
				</Card>
			{/each}
		</div>
	</Container>
</section>

<!-- Team Section -->
<section class="py-24 bg-white">
	<Container>
		<div class="text-center mb-16">
			<h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				Our diverse team of creatives, strategists, and technical experts work together to bring your vision to life.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
			{#each team as member}
				<Card class="text-center group hover:shadow-lg transition-all duration-300">
					<div class="space-y-4">
						<!-- Placeholder for team member photo -->
						<div class="w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full mx-auto flex items-center justify-center">
							<span class="text-2xl font-bold text-blue-600">{member.name.split(' ').map(n => n[0]).join('')}</span>
						</div>

						<div class="space-y-2">
							<h3 class="text-lg font-semibold text-gray-900">{member.name}</h3>
							<p class="text-blue-600 font-medium">{member.role}</p>
							<p class="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
						</div>

						<div class="flex justify-center space-x-3 pt-2">
							<a href={member.linkedin} class="text-gray-400 hover:text-blue-600 transition-colors">
								<Linkedin size={20} />
							</a>
							<a href={`mailto:${member.email}`} class="text-gray-400 hover:text-blue-600 transition-colors">
								<Mail size={20} />
							</a>
						</div>
					</div>
				</Card>
			{/each}
		</div>
	</Container>
</section>

<!-- CTA Section -->
<section class="py-24 bg-blue-600 text-white">
	<Container>
		<div class="text-center space-y-8">
			<h2 class="text-3xl md:text-4xl font-bold">Ready to Work Together?</h2>
			<p class="text-xl text-blue-100 max-w-2xl mx-auto">
				We'd love to learn about your project and discuss how we can help you achieve your goals.
			</p>
			<Button variant="primary" size="lg" class="bg-white text-blue-600 hover:bg-blue-50">
				<a href="/contact">Get in Touch</a>
			</Button>
		</div>
	</Container>
</section>
