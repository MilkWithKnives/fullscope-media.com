<script lang="ts">
	import Container from '$lib/components/ui/Container.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Award from 'lucide-svelte/icons/award';
	import Target from 'lucide-svelte/icons/target';
	import Zap from 'lucide-svelte/icons/zap';
	import Linkedin from 'lucide-svelte/icons/linkedin';
	import Mail from 'lucide-svelte/icons/mail';
	import Phone from 'lucide-svelte/icons/phone';
	import MapPin from 'lucide-svelte/icons/map-pin';
	import { resolve } from '$app/paths';

	const owner = {
		name: 'Ryan',
		title: 'Owner & Lead Photographer',
		image: '/images/headshot.jpg',
		bio: 'Real estate and portrait photographer based in East Lansing, MI. I handle strategy, shooting, and delivery myself so every property and portrait feels intentional—and you always know who’s accountable.',
		email: 'hello@fullscopemedia.com',
		phone: '(517) 258-8244',
		location: 'East Lansing, MI · Serving clients nationwide',
		linkedin: 'https://www.linkedin.com'
	};

	const principles = [
		{
			icon: Award,
			title: 'Quality over volume',
			description: 'Fewer projects at a time so every deliverable gets the attention it needs.'
		},
		{
			icon: Target,
			title: 'Strategy first',
			description: 'MLS-ready framing, clean lines, and assets sized for the channels you actually use.'
		},
		{
			icon: Zap,
			title: 'Calm production',
			description: 'Organized timelines, transparent comms, and predictable delivery.'
		}
	];

	const stats = [
		{ number: '150+', label: 'Projects delivered' },
		{ number: '60+', label: 'Client partners' },
		{ number: '5+', label: 'Years producing' }
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
				Full Scope Media is led by {owner.name}, your hands-on partner for strategy, production, and delivery. One point of contact, no handoffs, consistent quality.
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
							I started Full Scope Media to make production simpler: one lead, a tight process, and deliverables that are as strategic as they are polished. Most of my work is for real estate agents who need on-time media that helps listings stand out in a crowded MLS feed.
						</p>
						<p>
							From interiors, exteriors, and 3D tours to portrait sessions, the goal is straightforward: accurate color, clean lighting, and images that feel intentional, not generic. The studio is set up like a lived-in space—comfortable furniture, artwork, and room to move—so it works for headshots, brand sessions, and creatives renting by the hour.
						</p>
						<p>
							Outside of shoots, I’m usually buried in Motown and code. Fourteen months of self-taught coding sharpened how I organize projects and sweat small details. Before this, running busy restaurant operations hard-wired communication, reliability, and handling pressure—habits I bring to every shoot, delivery, and studio booking.
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
			<h2 class="text-3xl md:text-4xl font-bold text-white mb-4">How I work</h2>
			<p class="text-xl text-zinc-400 max-w-3xl mx-auto">
				These principles guide every engagement—from first call to final delivery.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			{#each principles as value (value.title)}
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
			<h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Meet your partner</h2>
			<p class="text-xl text-zinc-400 max-w-3xl mx-auto">
				I stay hands-on from kickoff to delivery so you have one accountable lead for every project.
			</p>
		</div>

		<div class="max-w-3xl mx-auto">
			<Card class="grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-zinc-900 border border-zinc-800">
				<div class="flex justify-center">
					<div class="w-36 h-36 rounded-full overflow-hidden border border-zinc-700 bg-zinc-800">
						<img
							src={owner.image}
							alt={`${owner.name} headshot`}
							class="w-full h-full object-cover"
							loading="lazy"
							onerror={(event) => {
								const target = event.target as HTMLImageElement | null;
								if (target) {
									target.src = 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80';
								}
							}}
						/>
					</div>
				</div>
				<div class="md:col-span-2 space-y-3 text-center md:text-left">
					<h3 class="text-2xl font-semibold text-white">{owner.name}</h3>
					<p class="text-[var(--color-primary)] font-medium">{owner.title}</p>
					<p class="text-zinc-400 leading-relaxed">{owner.bio}</p>
					<div class="flex flex-wrap gap-4 text-sm justify-center md:justify-start text-zinc-300">
						<span class="inline-flex items-center gap-2"><Mail size={16} class="text-[var(--color-primary)]" /> {owner.email}</span>
						<span class="inline-flex items-center gap-2"><Phone size={16} class="text-[var(--color-primary)]" /> {owner.phone}</span>
						<span class="inline-flex items-center gap-2"><MapPin size={16} class="text-[var(--color-primary)]" /> {owner.location}</span>
						<button
							type="button"
							class="inline-flex items-center gap-2 text-[var(--color-primary)] hover:text-[var(--color-primary-strong)]"
							onclick={() => window.open(owner.linkedin, '_blank', 'noopener')}
						>
							<Linkedin size={16} /> LinkedIn
						</button>
					</div>
				</div>
			</Card>
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
