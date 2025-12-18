<script lang="ts">
	import Container from '../ui/Container.svelte';
	import Button from '../ui/Button.svelte';
	import Award from 'lucide-svelte/icons/award';
	import Users from 'lucide-svelte/icons/users';
	import Target from 'lucide-svelte/icons/target';
	import Zap from 'lucide-svelte/icons/zap';

	const values = [
		{
			icon: Award,
			title: 'Excellence',
			description: 'We strive for perfection in every project, delivering exceptional quality that exceeds expectations.'
		},
		{
			icon: Users,
			title: 'Collaboration',
			description: 'We work closely with our clients as partners, ensuring their vision is brought to life authentically.'
		},
		{
			icon: Target,
			title: 'Results-Driven',
			description: 'Every creative decision is made with your business goals in mind, ensuring measurable impact.'
		},
		{
			icon: Zap,
			title: 'Innovation',
			description: 'We stay ahead of trends and technology to deliver cutting-edge solutions that stand out.'
		}
	];
</script>

<section class="py-24 bg-white">
	<Container>
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
			<!-- Content -->
			<div class="space-y-8">
				<div class="space-y-4">
					<h2 class="text-3xl md:text-4xl font-bold text-gray-900">
						About Full Scope Media
					</h2>
					<p class="text-xl text-gray-600 leading-relaxed">
						We're a creative agency passionate about telling stories that matter. 
						With years of experience and a team of talented professionals, we help 
						businesses connect with their audiences through powerful visual content.
					</p>
				</div>

				<div class="space-y-6">
					<p class="text-gray-600 leading-relaxed">
						Founded on the belief that every brand has a unique story to tell, Full Scope Media 
						combines creative vision with strategic thinking to deliver content that not only 
						looks great but drives real business results.
					</p>
					<p class="text-gray-600 leading-relaxed">
						From startups to established enterprises, we've helped hundreds of clients 
						amplify their message and achieve their goals through compelling video, 
						photography, and digital marketing campaigns.
					</p>
				</div>

				<Button variant="primary" size="lg">
					<a href="/about">Learn More About Us</a>
				</Button>
			</div>

			<!-- Values Grid -->
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
				{#each values as value}
					<div class="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
						<div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
							<svelte:component this={value.icon} size={24} class="text-blue-600" />
						</div>
						<h3 class="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
						<p class="text-gray-600 text-sm leading-relaxed">{value.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</Container>
</section>
