<script lang="ts">
	import Container from '$lib/components/ui/Container.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Award from 'lucide-svelte/icons/award';
	import Users from 'lucide-svelte/icons/users';
	import Target from 'lucide-svelte/icons/target';
	import Zap from 'lucide-svelte/icons/zap';
	import Linkedin from 'lucide-svelte/icons/linkedin';
	import Mail from 'lucide-svelte/icons/mail';
	import { resolve } from '$app/paths';

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
			linkedin: 'https://www.linkedin.com',
			email: 'sarah@fullscopemedia.com'
		},
		{
			name: 'Mike Chen',
			role: 'Lead Video Producer',
			bio: 'Mike brings technical expertise and creative flair to every video project, from concept development to final delivery.',
			image: '/api/placeholder/300/300',
			linkedin: 'https://www.linkedin.com',
			email: 'mike@fullscopemedia.com'
		},
		{
			name: 'Emily Rodriguez',
			role: 'Senior Photographer',
			bio: 'Emily captures stunning visuals that tell your brand story, specializing in commercial and lifestyle photography.',
			image: '/api/placeholder/300/300',
			linkedin: 'https://www.linkedin.com',
			email: 'emily@fullscopemedia.com'
		},
		{
			name: 'David Park',
			role: 'Digital Marketing Strategist',
			bio: 'David develops comprehensive digital strategies that amplify your content and connect with your target audience.',
			image: '/api/placeholder/300/300',
			linkedin: 'https://www.linkedin.com',
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
<section class="bg-black text-white py-24">
	<Container>
		<div class="text-center space-y-6">
			<h1 class="text-4xl md:text-5xl font-bold">About Full Scope Media</h1>
			<p class="text-xl text-zinc-400 max-w-3xl mx-auto">
				We’re a small, senior team that blends strategy, production, and design to make brands look and feel intentional—on camera, online, and in every campaign.
			</p>
		</div>
	</Container>
</section>

<!-- Story Section -->
<section class="py-24 bg-black">
	<Container>
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
			<div class="space-y-6">
				<h2 class="text-3xl md:text-4xl font-bold text-white">Our Story</h2>
				<div class="space-y-4 text-zinc-400 leading-relaxed">
					<p>
						We started in 2019 with one goal: produce work that’s both beautiful and useful. Today we’re a full-service studio that still operates with the same focus—clear process, thoughtful creative, and consistent delivery.
					</p>
					<p>
						We partner with teams at every stage—launching new products, refreshing brands, and capturing key moments. Every engagement teaches us something new and sharpens how we collaborate.
					</p>
					<p>
						What stays constant is our commitment to organized projects, direct communication, and work that performs in the real world.
					</p>
				</div>
			</div>
			
			<!-- Stats -->
			<div class="grid grid-cols-2 gap-8">
				{#each stats as stat (stat.label)}
					<div class="text-center p-6 bg-zinc-900 rounded-xl border border-zinc-800">
						<div class="text-4xl font-bold text-[var(--color-primary)] mb-2">{stat.number}</div>
						<div class="text-zinc-400">{stat.label}</div>
					</div>
				{/each}
			</div>
		</div>
	</Container>
</section>

<!-- Values Section -->
<section class="py-24 bg-black">
	<Container>
		<div class="text-center mb-16">
			<h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Our Values</h2>
			<p class="text-xl text-zinc-400 max-w-3xl mx-auto">
				These principles guide how we plan, produce, and support every engagement.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			{#each values as value (value.title)}
				<Card class="text-center hover:shadow-lg transition-shadow duration-300 bg-zinc-900 border border-zinc-800">
					<div class="space-y-4">
						<div class="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto">
							<value.icon size={32} class="text-[var(--color-primary)]" />
						</div>
						<h3 class="text-xl font-semibold text-white">{value.title}</h3>
						<p class="text-zinc-400 leading-relaxed">{value.description}</p>
					</div>
				</Card>
			{/each}
		</div>
	</Container>
</section>

<!-- Team Section -->
<section class="py-24 bg-black">
	<Container>
		<div class="text-center mb-16">
			<h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Meet Our Team</h2>
			<p class="text-xl text-zinc-400 max-w-3xl mx-auto">
				A nimble group of creatives, strategists, and technologists who stay hands-on from kickoff through delivery.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
			{#each team as member (member.email)}
				<Card class="text-center group hover:shadow-lg transition-all duration-300 bg-zinc-900 border border-zinc-800">
					<div class="space-y-4">
						<!-- Placeholder for team member photo -->
						<div class="w-32 h-32 bg-zinc-800 rounded-full mx-auto flex items-center justify-center border border-zinc-700">
							<span class="text-2xl font-bold text-[var(--color-primary)]">{member.name.split(' ').map(n => n[0]).join('')}</span>
						</div>

						<div class="space-y-2">
							<h3 class="text-lg font-semibold text-white">{member.name}</h3>
							<p class="text-[var(--color-primary)] font-medium">{member.role}</p>
							<p class="text-zinc-400 text-sm leading-relaxed">{member.bio}</p>
						</div>

						<div class="flex justify-center space-x-3 pt-2">
							<a href="https://www.linkedin.com" target="_blank" rel="noreferrer" class="text-zinc-500 hover:text-[var(--color-primary)] transition-colors">
								<Linkedin size={20} />
							</a>
							<a href={`mailto:${member.email}`} class="text-zinc-500 hover:text-[var(--color-primary)] transition-colors">
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
<section class="py-24 bg-zinc-900 text-white border-t border-zinc-800">
	<Container>
		<div class="text-center space-y-8">
			<h2 class="text-3xl md:text-4xl font-bold">Ready to Work Together?</h2>
			<p class="text-xl text-zinc-400 max-w-2xl mx-auto">
				Tell us what you’re building. We’ll share a clear plan, timeline, and team to get it done.
			</p>
			<Button variant="primary" size="lg" class="bg-[var(--color-primary)] text-black hover:bg-[var(--color-primary-strong)]">
				<a href={resolve('/contact')}>Get in Touch</a>
			</Button>
		</div>
	</Container>
</section>
