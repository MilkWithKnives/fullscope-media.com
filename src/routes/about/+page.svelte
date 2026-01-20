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
		name: 'Ryan Champion',
		title: 'Owner & Lead Photographer',
		image: '/images/about/ryan-headshot.jpg',
		bio: 'Real estate and portrait photographer based in East Lansing, MI. I handle strategy, shooting, and delivery myself so every property and portrait feels intentional—and you always know who’s accountable.',
		email: 'ryan@fullscope-media.com',
		phone: '(517) 220-2934',
		location: '301 MAC Ave Ste 106, East Lansing, MI · Serving clients nationwide',
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
<section class="bg-black text-white py-16 md:py-24">
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
<section class="py-16 md:py-24 bg-black">
	<Container>
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
				<div class="space-y-6">
					<h2 class="text-3xl md:text-4xl font-bold text-white">Our Story</h2>
					<div class="space-y-4 text-zinc-400 leading-relaxed">
						<p>
							I’m Ryan, a real estate and portrait photographer based in East Lansing, MI, and the owner of Full Scope Media. This site brings together two things I care about: a studio you can actually create in, and a portfolio that shows what the right visuals can do for a listing or a brand.
						</p>
						<p>
							Most of my work is for real estate agents who need consistent, on-time media that makes their listings stand out in a crowded MLS feed. From interior and exterior photography to video and 3D tours, the goal is simple: make every property look its best while keeping the process straightforward for you and your clients.
						</p>
						<p>
							The studio is designed more like a lived-in space than a blank white box—comfortable furniture, artwork, and room to move—so it works just as well for headshots and brand sessions as it does for creatives renting it by the hour. Whether we’re shooting on location or in the studio, the focus is on clean lighting, accurate color, and images that feel intentional, not generic.
						</p>
						<p>
							Outside of shooting, a lot of my time goes into two things that quietly shape my work: Motown music and coding. Motown is usually playing in the background while editing, and about 14 months of teaching myself to code has made me increasingly focused on small details, systems, and using the right tools to keep projects organized and on schedule. Before photography became the full-time focus, I spent several years running busy restaurant operations and managing large teams on game days. That experience hard-wired a respect for communication, reliability, and handling pressure—habits that now carry over into every shoot, delivery, and studio booking.
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
<section class="py-16 md:py-24 bg-black">
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
<section class="py-16 md:py-24 bg-black">
	<Container>
		<div class="text-center mb-16">
			<h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Meet your partner</h2>
			<p class="text-xl text-zinc-400 max-w-3xl mx-auto">
				I stay hands-on from kickoff to delivery so you have one accountable lead for every project.
			</p>
		</div>

		<div class="max-w-5xl mx-auto">
			<Card class="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-zinc-900 border border-zinc-800 overflow-hidden">
				<div class="relative h-80 lg:h-full">
					<img
						src={owner.image}
						alt={`${owner.name} headshot`}
						class="w-full h-full object-cover"
						loading="lazy"
						onerror={(event) => {
							const target = event.target as HTMLImageElement | null;
							if (target) {
								target.src = 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80';
							}
						}}
					/>
					<div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent lg:hidden"></div>
				</div>
				<div class="p-8 space-y-4 flex flex-col justify-center">
					<div>
						<h3 class="text-3xl font-semibold text-white">{owner.name}</h3>
						<p class="text-[var(--color-primary)] font-medium">{owner.title}</p>
					</div>
					<p class="text-zinc-300 leading-relaxed">{owner.bio}</p>
					<div class="flex flex-wrap gap-3 text-sm text-zinc-200">
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
<section class="py-16 md:py-24 bg-zinc-900 text-white border-t border-zinc-800">
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
