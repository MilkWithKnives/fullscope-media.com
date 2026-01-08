<script lang="ts">
	import Container from '$lib/components/ui/Container.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Mail from 'lucide-svelte/icons/mail';
	import Phone from 'lucide-svelte/icons/phone';
	import MapPin from 'lucide-svelte/icons/map-pin';
	import Clock from 'lucide-svelte/icons/clock';
	import Send from 'lucide-svelte/icons/send';

	let formData = $state({
		name: '',
		email: '',
		company: '',
		service: '',
		budget: '',
		message: '',
		timeline: ''
	});

	let isSubmitting = $state(false);
	let submitStatus = $state<'idle' | 'success' | 'error'>('idle');

	const services = ['Video Production', 'Photography', 'Digital Marketing', 'Other'];

	const budgetRanges = [
		'Under $5,000',
		'$5,000 - $10,000',
		'$10,000 - $25,000',
		'$25,000 - $50,000',
		'$50,000+'
	];

	const contactInfo = [
		{
			icon: Mail,
			title: 'Email',
			details: 'ryan@fullscope-media.com'
		},
		{
			icon: Phone,
			title: 'Phone',
			details: '(517) 220-2934'
		},
		{
			icon: MapPin,
			title: 'Location',
			details: '301 MAC Ave Ste 106, East Lansing, MI'
		},
		{
			icon: Clock,
			title: 'Business Hours',
			details: 'Open daily · 7am–10pm ET'
		}
	];

	async function handleSubmit(event: Event) {
		event.preventDefault();
		isSubmitting = true;
		
		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || 'Failed to submit contact form');
			}

			submitStatus = 'success';

			// Reset form
			formData = {
				name: '',
				email: '',
				company: '',
				service: '',
				budget: '',
				message: '',
				timeline: ''
			};
		} catch (error) {
			console.error('Contact form error:', error);
			submitStatus = 'error';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<svelte:head>
	<title>Contact - Full Scope Media</title>
	<meta name="description" content="Get in touch with Full Scope Media. Let's discuss your project and create something amazing together. Professional video, photography, and digital marketing services." />
</svelte:head>

<!-- Hero Section -->
<section class="bg-black text-white py-24">
	<Container>
		<div class="text-center space-y-6">
			<h1 class="text-4xl md:text-5xl font-bold">Let's Create Together</h1>
			<p class="text-xl text-zinc-400 max-w-3xl mx-auto">
				Tell us what you’re working on—video, photography, or a full campaign. We’ll respond with next steps, timing, and a clear plan.
			</p>
		</div>
	</Container>
</section>

<!-- Contact Section -->
<section class="py-24 bg-black">
	<Container>
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
			<!-- Contact Form -->
			<div>
				<Card class="bg-zinc-900 border border-zinc-800">
					<div class="space-y-6">
						<div>
							<h2 class="text-2xl font-bold text-white mb-2">Start Your Project</h2>
							<p class="text-zinc-400">Share a few details and we’ll reply within one business day.</p>
						</div>

						{#if submitStatus === 'success'}
							<div class="p-4 bg-green-900/20 border border-green-800 rounded-lg">
								<p class="text-green-400">Thank you! We've received your message and will get back to you soon.</p>
							</div>
						{:else if submitStatus === 'error'}
							<div class="p-4 bg-red-900/20 border border-red-800 rounded-lg">
								<p class="text-red-400">Sorry, there was an error sending your message. Please try again.</p>
							</div>
						{/if}

						<form onsubmit={handleSubmit} class="space-y-6">
							<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label for="name" class="block text-sm font-medium text-zinc-300 mb-2">
										Name *
									</label>
									<input
										type="text"
										id="name"
										bind:value={formData.name}
										required
										class="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent text-white placeholder-zinc-500"
										placeholder="Your full name"
									/>
								</div>
								<div>
									<label for="email" class="block text-sm font-medium text-zinc-300 mb-2">
										Email *
									</label>
									<input
										type="email"
										id="email"
										bind:value={formData.email}
										required
										class="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent text-white placeholder-zinc-500"
										placeholder="your@email.com"
									/>
								</div>
							</div>

							<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label for="company" class="block text-sm font-medium text-zinc-300 mb-2">
										Company
									</label>
									<input
										type="text"
										id="company"
										bind:value={formData.company}
										class="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent text-white placeholder-zinc-500"
										placeholder="Your company name"
									/>
								</div>
								<div>
									<label for="service" class="block text-sm font-medium text-zinc-300 mb-2">
										Service Needed *
									</label>
									<select
										id="service"
										bind:value={formData.service}
										required
										class="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent text-white"
									>
										<option value="">Select a service</option>
							{#each services as service (service)}
								<option value={service}>{service}</option>
							{/each}
									</select>
								</div>
							</div>

							<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label for="budget" class="block text-sm font-medium text-zinc-300 mb-2">
										Budget Range
									</label>
									<select
										id="budget"
										bind:value={formData.budget}
										class="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent text-white"
									>
										<option value="">Select budget range</option>
										{#each budgetRanges as range (range)}
											<option value={range}>{range}</option>
										{/each}
									</select>
								</div>
								<div>
									<label for="timeline" class="block text-sm font-medium text-zinc-300 mb-2">
										Timeline
									</label>
									<input
										type="text"
										id="timeline"
										bind:value={formData.timeline}
										class="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent text-white placeholder-zinc-500"
										placeholder="When do you need this completed?"
									/>
								</div>
							</div>

							<div>
								<label for="message" class="block text-sm font-medium text-zinc-300 mb-2">
									Project Details *
								</label>
								<textarea
									id="message"
									bind:value={formData.message}
									required
									rows="6"
									class="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent resize-none text-white placeholder-zinc-500"
									placeholder="Tell us about your project, goals, and any specific requirements..."
								></textarea>
							</div>

							<Button
								type="submit"
								variant="primary"
								size="lg"
								class="w-full"
								disabled={isSubmitting}
							>
								{#if isSubmitting}
									<span class="flex items-center justify-center space-x-2">
										<div class="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
										<span>Sending...</span>
									</span>
								{:else}
									<span class="flex items-center justify-center space-x-2">
										<Send size={20} />
										<span>Send Message</span>
									</span>
								{/if}
							</Button>
						</form>
					</div>
				</Card>
			</div>

			<!-- Contact Information -->
			<div class="space-y-8">
				<div>
					<h2 class="text-2xl font-bold text-white mb-6">Get in Touch</h2>
					<div class="space-y-6">
						{#each contactInfo as info (info.title)}
							<div class="flex items-start space-x-4">
								<div class="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center flex-shrink-0">
									<info.icon size={20} class="text-[var(--color-primary)]" />
								</div>
								<div>
									<h3 class="font-semibold text-white">{info.title}</h3>
							{#if info.title === 'Email'}
								<a href="mailto:ryan@fullscope-media.com" class="text-[var(--color-primary)] hover:text-[var(--color-primary-strong)] transition-colors">
									{info.details}
								</a>
							{:else if info.title === 'Phone'}
								<a href="tel:+15172202934" class="text-[var(--color-primary)] hover:text-[var(--color-primary-strong)] transition-colors">
									{info.details}
								</a>
							{:else}
										<p class="text-zinc-400">{info.details}</p>
									{/if}
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- FAQ -->
				<Card class="bg-zinc-900 border border-zinc-800">
					<div class="space-y-4">
						<h3 class="text-lg font-semibold text-white">Frequently Asked Questions</h3>
						<div class="space-y-4">
							<div>
								<h4 class="font-medium text-white mb-1">How long does a typical project take?</h4>
								<p class="text-zinc-400 text-sm">Most video projects wrap in 2–4 weeks after kickoff. Photo sessions are typically scheduled and delivered within 7–10 days.</p>
							</div>
							<div>
								<h4 class="font-medium text-white mb-1">Do you work with clients remotely?</h4>
								<p class="text-zinc-400 text-sm">Yes. We collaborate with teams nationwide and run remote reviews, approvals, and delivery seamlessly.</p>
							</div>
							<div>
								<h4 class="font-medium text-white mb-1">What's included in your pricing?</h4>
								<p class="text-zinc-400 text-sm">Every estimate includes planning, production, post, and delivery. You’ll see a detailed scope, timeline, and any add-ons before we begin.</p>
							</div>
						</div>
					</div>
				</Card>
			</div>
		</div>
	</Container>
</section>
