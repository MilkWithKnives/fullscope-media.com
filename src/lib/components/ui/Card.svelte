<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	interface $$Props extends HTMLAttributes<HTMLDivElement> {
		class?: string;
		padding?: 'none' | 'sm' | 'md' | 'lg';
		shadow?: 'none' | 'sm' | 'md' | 'lg';
	}

	let {
		class: className,
		padding = 'md',
		shadow = 'md',
		children,
		...restProps
	}: $$Props = $props();

	const paddings = {
		none: '',
		sm: 'p-4',
		md: 'p-6',
		lg: 'p-8'
	};

	const shadows = {
		none: '',
		sm: 'shadow-sm',
		md: 'shadow-md',
		lg: 'shadow-lg'
	};
</script>

<div
	class={cn(
		'bg-white rounded-lg border border-gray-200',
		paddings[padding],
		shadows[shadow],
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
