<script lang="ts">
	import { cn } from '$lib/utils';

	interface $$Props {
		class?: string;
		size?: 'sm' | 'md' | 'lg';
		variant?: 'spinner' | 'dots' | 'pulse';
	}

	let {
		class: className,
		size = 'md',
		variant = 'spinner'
	}: $$Props = $props();

	const sizes = {
		sm: 'w-4 h-4',
		md: 'w-8 h-8',
		lg: 'w-12 h-12'
	};
</script>

{#if variant === 'spinner'}
	<div
		class={cn(
			'border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin',
			sizes[size],
			className
		)}
	></div>
{:else if variant === 'dots'}
	<div class={cn('flex space-x-1', className)}>
		<div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
		<div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
		<div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
	</div>
{:else if variant === 'pulse'}
	<div
		class={cn(
			'bg-blue-600 rounded-full animate-pulse',
			sizes[size],
			className
		)}
	></div>
{/if}
