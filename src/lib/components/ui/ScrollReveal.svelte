<script lang="ts">
	import { onMount } from 'svelte';
	import { cn } from '$lib/utils';

	interface $$Props {
		class?: string;
		animation?: 'fade-up' | 'fade-left' | 'fade-right' | 'fade-in';
		delay?: number;
		threshold?: number;
		children?: any;
	}

	let {
		class: className,
		animation = 'fade-up',
		delay = 0,
		threshold = 0.1,
		children
	}: $$Props = $props();

	let element: HTMLElement;
	let isVisible = $state(false);

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setTimeout(() => {
							isVisible = true;
						}, delay);
						observer.unobserve(entry.target);
					}
				});
			},
			{
				threshold,
				rootMargin: '50px'
			}
		);

		if (element) {
			observer.observe(element);
		}

		return () => {
			if (element) {
				observer.unobserve(element);
			}
		};
	});

	const animationClasses = {
		'fade-up': 'animate-fade-in-up',
		'fade-left': 'animate-fade-in-left',
		'fade-right': 'animate-fade-in-right',
		'fade-in': 'animate-fade-in-up'
	};
</script>

<div
	bind:this={element}
	class={cn(
		'transition-all duration-700',
		!isVisible && 'opacity-0 translate-y-8',
		isVisible && animationClasses[animation],
		className
	)}
>
	{@render children?.()}
</div>
