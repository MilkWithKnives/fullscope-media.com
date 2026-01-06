<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { cn } from '$lib/utils';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface $$Props extends HTMLButtonAttributes {
		variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
		size?: 'sm' | 'md' | 'lg';
		class?: string;
	}

	let {
		variant = 'primary',
		size = 'md',
		class: className,
		children,
		onclick,
		onfocus,
		onblur,
		...restProps
	}: $$Props = $props();

	const dispatch = createEventDispatcher<{
		click: MouseEvent;
		focus: FocusEvent;
		blur: FocusEvent;
	}>();

	const variants = {
		primary:
			'bg-[var(--color-primary-strong)] text-black hover:bg-[var(--color-primary)] focus:ring-[var(--color-primary-strong)]',
		secondary: 'bg-black text-white hover:bg-[#111111] focus:ring-black',
		outline:
			'border border-zinc-700 text-white hover:bg-zinc-800 focus:ring-[var(--color-primary-strong)]',
		ghost: 'text-white hover:bg-zinc-800 focus:ring-[var(--color-primary-strong)]',
		destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
	} as const;

	const sizes = {
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-4 py-2 text-base',
		lg: 'px-6 py-3 text-lg'
	} as const;

	function handleClick(event: MouseEvent) {
		onclick?.(event);
		dispatch('click', event);
	}

	function handleFocus(event: FocusEvent) {
		onfocus?.(event);
		dispatch('focus', event);
	}

	function handleBlur(event: FocusEvent) {
		onblur?.(event);
		dispatch('blur', event);
	}
</script>

<button
	class={cn(
		'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
		variants[variant],
		sizes[size],
		className
	)}
	on:click={handleClick}
	on:focus={handleFocus}
	on:blur={handleBlur}
	{...restProps}
>
	{@render children?.()}
</button>
