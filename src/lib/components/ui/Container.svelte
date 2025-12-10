<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	interface $$Props extends HTMLAttributes<HTMLDivElement> {
		class?: string;
		size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
	}

	let {
		class: className,
		size = 'lg',
		children,
		...restProps
	}: $$Props = $props();

	const sizes = {
		sm: 'max-w-2xl',
		md: 'max-w-4xl',
		lg: 'max-w-6xl',
		xl: 'max-w-7xl',
		full: 'max-w-full'
	};
</script>

<div
	class={cn(
		'mx-auto px-4 sm:px-6 lg:px-8',
		sizes[size],
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
