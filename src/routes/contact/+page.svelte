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

	const services = [
		'Video Production',
		'Photography',
		'Digital Marketing',
		'Web Design',
		'Other'
	];

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
			details: 'info@fullscopemedia.com',
			link: 'mailto:info@fullscopemedia.com'
		},
		{
			icon: Phone,
			title: 'Phone',
			details: '(555) 123-4567',
			link: 'tel:+15551234567'
		},
		{
			icon: MapPin,
			title: 'Location',
			details: 'Your City, State 12345',
			link: '#'
		},
		{
			icon: Clock,
			title: 'Business Hours',
			details: 'Mon-Fri: 9AM-6PM',
			link: '#'
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
<section class="bg-gradient-to-br from-blue-900 to-purple-900 text-white py-24">
	<Container>
		<div class="text-center space-y-6">
			<h1 class="text-4xl md:text-5xl font-bold">Let's Create Together</h1>
			<p class="text-xl text-blue-100 max-w-3xl mx-auto">
				Ready to bring your vision to life? We'd love to hear about your project and 
				discuss how we can help you achieve your goals.
			</p>
		</div>
	</Container>
</section>

<!-- Contact Section -->
<section class="py-24 bg-gray-50">
	<Container>
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
			<!-- Contact Form -->
			<div>
				<Card>
					<div class="space-y-6">
						<div>
							<h2 class="text-2xl font-bold text-gray-900 mb-2">Start Your Project</h2>
							<p class="text-gray-600">Fill out the form below and we'll get back to you within 24 hours.</p>
						</div>

						{#if submitStatus === 'success'}
							<div class="p-4 bg-green-50 border border-green-200 rounded-lg">
								<p class="text-green-800">Thank you! We've received your message and will get back to you soon.</p>
							</div>
						{:else if submitStatus === 'error'}
							<div class="p-4 bg-red-50 border border-red-200 rounded-lg">
								<p class="text-red-800">Sorry, there was an error sending your message. Please try again.</p>
							</div>
						{/if}

						<form onsubmit={handleSubmit} class="space-y-6">
							<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label for="name" class="block text-sm font-medium text-gray-700 mb-2">
										Name *
									</label>
									<input
										type="text"
										id="name"
										bind:value={formData.name}
										required
										class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										placeholder="Your full name"
									/>
								</div>
								<div>
									<label for="email" class="block text-sm font-medium text-gray-700 mb-2">
										Email *
									</label>
									<input
										type="email"
										id="email"
										bind:value={formData.email}
										required
										class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										placeholder="your@email.com"
									/>
								</div>
							</div>

							<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label for="company" class="block text-sm font-medium text-gray-700 mb-2">
										Company
									</label>
									<input
										type="text"
										id="company"
										bind:value={formData.company}
										class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										placeholder="Your company name"
									/>
								</div>
								<div>
									<label for="service" class="block text-sm font-medium text-gray-700 mb-2">
										Service Needed *
									</label>
									<select
										id="service"
										bind:value={formData.service}
										required
										class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									>
										<option value="">Select a service</option>
										{#each services as service}
											<option value={service}>{service}</option>
										{/each}
									</select>
								</div>
							</div>

							<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label for="budget" class="block text-sm font-medium text-gray-700 mb-2">
										Budget Range
									</label>
									<select
										id="budget"
										bind:value={formData.budget}
										class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									>
										<option value="">Select budget range</option>
										{#each budgetRanges as range}
											<option value={range}>{range}</option>
										{/each}
									</select>
								</div>
								<div>
									<label for="timeline" class="block text-sm font-medium text-gray-700 mb-2">
										Timeline
									</label>
									<input
										type="text"
										id="timeline"
										bind:value={formData.timeline}
										class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										placeholder="When do you need this completed?"
									/>
								</div>
							</div>

							<div>
								<label for="message" class="block text-sm font-medium text-gray-700 mb-2">
									Project Details *
								</label>
								<textarea
									id="message"
									bind:value={formData.message}
									required
									rows="6"
									class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
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
										<div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
					<h2 class="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
					<div class="space-y-6">
						{#each contactInfo as info}
							<div class="flex items-start space-x-4">
								<div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
									<info.icon size={20} class="text-blue-600" />
								</div>
								<div>
									<h3 class="font-semibold text-gray-900">{info.title}</h3>
									{#if info.link !== '#'}
										<a href={info.link} class="text-blue-600 hover:text-blue-700 transition-colors">
											{info.details}
										</a>
									{:else}
										<p class="text-gray-600">{info.details}</p>
									{/if}
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- FAQ -->
				<Card>
					<div class="space-y-4">
						<h3 class="text-lg font-semibold text-gray-900">Frequently Asked Questions</h3>
						<div class="space-y-4">
							<div>
								<h4 class="font-medium text-gray-900 mb-1">How long does a typical project take?</h4>
								<p class="text-gray-600 text-sm">Project timelines vary based on scope and complexity. Most video projects take 2-4 weeks, while photography sessions can be completed within 1-2 weeks.</p>
							</div>
							<div>
								<h4 class="font-medium text-gray-900 mb-1">Do you work with clients remotely?</h4>
								<p class="text-gray-600 text-sm">Yes! We work with clients nationwide and have experience managing remote projects effectively through digital collaboration tools.</p>
							</div>
							<div>
								<h4 class="font-medium text-gray-900 mb-1">What's included in your pricing?</h4>
								<p class="text-gray-600 text-sm">Our pricing includes pre-production planning, production/shooting, post-production, and final delivery. We provide detailed quotes for each project.</p>
							</div>
						</div>
					</div>
				</Card>
			</div>
		</div>
	</Container>
</section>
