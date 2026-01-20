<svelte:head>
	<title>Palma-inspired Preview</title>
	<meta
		name="description"
		content="Standalone Palma-inspired layout for reference without touching the live site."
	/>
</svelte:head>

<div class="min-h-screen bg-[#f5f0ea] text-[#1c1a19]">
	<header class="border-b border-black/10 bg-white/80 backdrop-blur">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
			<div class="flex items-center gap-3">
				<div class="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center text-sm tracking-[0.2em]">
					P
				</div>
				<div class="text-lg font-semibold uppercase tracking-[0.25em] text-[#1c1a19]">
					Palma
				</div>
			</div>
			<nav class="hidden md:flex items-center gap-6 text-sm uppercase tracking-wide">
				<a class="hover:underline" href="#about">About</a>
				<a class="hover:underline" href="#work">Work</a>
				<a class="hover:underline" href="#services">Services</a>
				<a class="hover:underline" href="#contact">Contact</a>
			</nav>
			<button class="hidden md:inline-flex palma-cta">
				Book a Call
			</button>
		</div>
	</header>

	<main>
		<section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
			<div class="space-y-6">
				<p class="text-sm uppercase tracking-[0.3em] text-[#5c554f]">Interior Design Studio</p>
				<h1 class="text-4xl md:text-5xl font-semibold leading-tight text-[#1c1a19]">
					Curated homes with sun-washed palettes and sculptural lines.
				</h1>
				<p class="text-lg text-[#433c35] leading-relaxed">
					Bespoke interiors balancing modern Mediterranean warmth with thoughtful function. From concept to styling, we craft spaces that feel effortless and lived-in.
				</p>
				<div class="flex flex-wrap gap-4">
					<button class="px-6 py-3 bg-[#1c1a19] text-white uppercase tracking-wide text-sm hover:opacity-90 transition">
						View Portfolio
					</button>
					<button class="px-6 py-3 border border-[#1c1a19] text-[#1c1a19] uppercase tracking-wide text-sm hover:bg-black hover:text-white transition">
						Our Services
					</button>
				</div>
			</div>
			<div class="relative">
				<div class="absolute -inset-4 bg-[#d9d1c8] rounded-[32px] rotate-2"></div>
				<div class="relative overflow-hidden rounded-[28px] shadow-xl border border-black/5">
					<img
						src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80"
						alt="Warm living room"
						class="w-full h-full object-cover"
						loading="lazy"
					/>
				</div>
			</div>
		</section>

		<section id="about" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 grid grid-cols-1 md:grid-cols-3 gap-8">
			<div class="md:col-span-1 space-y-3">
				<h2 class="text-2xl font-semibold text-[#1c1a19]">What we do</h2>
				<p class="text-[#433c35]">
					Studios, homes, hospitality spaces and retail with airy palettes and tactile finishes.
				</p>
			</div>
			<div class="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
				<div class="p-6 bg-white border border-black/10 rounded-2xl space-y-3">
					<h3 class="text-lg font-semibold text-[#1c1a19]">Full-service design</h3>
					<p class="text-[#433c35] text-sm leading-relaxed">
						Concept, sourcing, custom millwork, styling, and installation with clear milestones.
					</p>
				</div>
				<div class="p-6 bg-white border border-black/10 rounded-2xl space-y-3">
					<h3 class="text-lg font-semibold text-[#1c1a19]">Project consulting</h3>
					<p class="text-[#433c35] text-sm leading-relaxed">
						Room refreshes, layout edits, and finish palettes for teams needing quick direction.
					</p>
				</div>
				<div class="p-6 bg-white border border-black/10 rounded-2xl space-y-3">
					<h3 class="text-lg font-semibold text-[#1c1a19]">FF&E curation</h3>
					<p class="text-[#433c35] text-sm leading-relaxed">
						Sourcing furniture, lighting, rugs, and objects with vendor management baked in.
					</p>
				</div>
				<div class="p-6 bg-white border border-black/10 rounded-2xl space-y-3">
					<h3 class="text-lg font-semibold text-[#1c1a19]">Styling & staging</h3>
					<p class="text-[#433c35] text-sm leading-relaxed">
						Photo-ready styling for launches, rentals, and sales with turnkey install crews.
					</p>
				</div>
			</div>
		</section>

		<section id="work" class="bg-white border-y border-black/10">
			<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 space-y-8">
				<div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
					<div>
						<p class="text-sm uppercase tracking-[0.3em] text-[#5c554f]">Selected work</p>
						<h2 class="text-3xl font-semibold text-[#1c1a19]">Recent projects</h2>
					</div>
					<button class="px-5 py-2 border border-[#1c1a19] text-sm uppercase tracking-wide hover:bg-black hover:text-white transition self-start md:self-auto">
						View all projects
					</button>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
					{#each [
						{
							title: 'Palermo Townhouse',
							location: 'Barcelona',
							img: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80'
						},
						{
							title: 'Cala Living Room',
							location: 'Lisbon',
							img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'
						},
						{
							title: 'Siena Apartment',
							location: 'Milan',
							img: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80'
						},
						{
							title: 'Monaco Suite',
							location: 'Nice',
							img: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80'
						}
					] as project (project.title)}
						<div class="group space-y-3">
							<div class="overflow-hidden rounded-[24px] border border-black/10">
								<img src={project.img} alt={project.title} class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
							</div>
							<div class="flex items-center justify-between text-sm uppercase tracking-wide text-[#5c554f]">
								<span>{project.title}</span>
								<span>{project.location}</span>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<section id="services" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
			<div class="space-y-4">
				<p class="text-sm uppercase tracking-[0.3em] text-[#5c554f]">Process</p>
				<h2 class="text-3xl font-semibold text-[#1c1a19]">An intentional, low-friction process</h2>
				<p class="text-[#433c35]">
					Transparent milestones, mood boards, detailed sourcing lists, and coordinated install—so you can see decisions before they happen.
				</p>
				<ul class="space-y-3 text-[#1c1a19] font-medium">
					<li class="flex items-start gap-2">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#1c1a19]"></span> Discovery & concept boards
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#1c1a19]"></span> Layouts, lighting, and materials schedule
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#1c1a19]"></span> Procurement with vendor coordination
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#1c1a19]"></span> Styling day and handover
					</li>
				</ul>
			</div>
			<div class="relative">
				<div class="absolute -inset-3 bg-[#d9d1c8] rounded-[30px] -rotate-1"></div>
				<div class="relative bg-white border border-black/10 rounded-[26px] overflow-hidden shadow-lg">
					<img
						src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80"
						alt="Dining space"
						class="w-full h-full object-cover"
						loading="lazy"
					/>
				</div>
			</div>
		</section>

		<section class="bg-[#1c1a19] text-white py-14 md:py-20">
			<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
				<p class="text-sm uppercase tracking-[0.3em] text-white/70">Testimonial</p>
				<blockquote class="text-2xl md:text-3xl font-semibold leading-snug">
					“Palma translated our ideas into a home that feels warm, calm, and entirely ours. The process was clear, timelines were met, and the styling day was magic.”
				</blockquote>
				<p class="text-sm uppercase tracking-[0.2em] text-white/70">— Client, 2024</p>
			</div>
		</section>

		<section id="contact" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
			<div class="space-y-4">
				<h2 class="text-3xl font-semibold text-[#1c1a19]">Let’s plan your project</h2>
				<p class="text-[#433c35]">
					Share a timeline, scope, and photos. We’ll respond with a tailored plan and suggested start date.
				</p>
			</div>
			<form class="bg-white border border-black/10 rounded-2xl p-6 space-y-4 shadow-sm">
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<label class="space-y-2 text-sm">
						<span class="uppercase tracking-wide text-[#5c554f]">Name</span>
						<input class="w-full border border-black/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20" placeholder="Your name" />
					</label>
					<label class="space-y-2 text-sm">
						<span class="uppercase tracking-wide text-[#5c554f]">Email</span>
						<input type="email" class="w-full border border-black/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20" placeholder="you@email.com" />
					</label>
				</div>
				<label class="space-y-2 text-sm block">
					<span class="uppercase tracking-wide text-[#5c554f]">Project Type</span>
					<select class="w-full border border-black/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20">
						<option>Residence</option>
						<option>Hospitality</option>
						<option>Retail</option>
						<option>Other</option>
					</select>
				</label>
				<label class="space-y-2 text-sm block">
					<span class="uppercase tracking-wide text-[#5c554f]">Message</span>
					<textarea rows="4" class="w-full border border-black/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20" placeholder="Scope, timeline, location"></textarea>
				</label>
				<button type="button" class="w-full py-3 bg-[#1c1a19] text-white uppercase tracking-wide text-sm hover:opacity-90 transition">
					Send Inquiry
				</button>
			</form>
		</section>
	</main>
</div>

<style>
	.palma-cta {
		width: 10em;
		position: relative;
		height: 3.5em;
		border: 3px ridge #149cea;
		outline: none;
		background-color: transparent;
		color: #1c1a19;
		transition: 1s;
		border-radius: 0.3em;
		font-size: 14px;
		font-weight: 700;
		letter-spacing: 0.08em;
		cursor: pointer;
		text-transform: uppercase;
	}

	.palma-cta::after {
		content: '';
		position: absolute;
		top: -10px;
		left: 3%;
		width: 95%;
		height: 40%;
		background-color: #eae5de;
		transition: 0.5s;
		transform-origin: center;
	}

	.palma-cta::before {
		content: '';
		transform-origin: center;
		position: absolute;
		top: 80%;
		left: 3%;
		width: 95%;
		height: 40%;
		background-color: #eae5de;
		transition: 0.5s;
	}

	.palma-cta:hover::before,
	.palma-cta:hover::after {
		transform: scale(0);
	}

	.palma-cta:hover {
		box-shadow: inset 0 0 25px #1479ea;
	}
</style>
