<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		content: string;
		sideOffset?: number;
		children: Snippet;
	}

	let { content, sideOffset = 8, children }: Props = $props();

	let showTooltip = $state(false);
	let triggerRef: HTMLElement;
	let tooltipRef = $state<HTMLDivElement>();

	function handleMouseEnter() {
		showTooltip = true;
	}

	function handleMouseLeave() {
		showTooltip = false;
	}

	onMount(() => {
		if (triggerRef) {
			triggerRef.addEventListener('mouseenter', handleMouseEnter);
			triggerRef.addEventListener('mouseleave', handleMouseLeave);
		}

		return () => {
			if (triggerRef) {
				triggerRef.removeEventListener('mouseenter', handleMouseEnter);
				triggerRef.removeEventListener('mouseleave', handleMouseLeave);
			}
		};
	});
</script>

<div class="relative inline-block">
	<div bind:this={triggerRef}>
		{@render children()}
	</div>
	
	{#if showTooltip}
		<div
			bind:this={tooltipRef}
			class="absolute bottom-full left-1/2 z-50 -translate-x-1/2 transform rounded-md bg-zinc-800 px-2 py-1 text-xs text-zinc-200 shadow-lg border border-zinc-700"
			style="margin-bottom: {sideOffset}px;"
		>
			{content}
			<div class="absolute top-full left-1/2 -translate-x-1/2 transform border-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
		</div>
	{/if}
</div>
