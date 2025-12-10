<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		direction?: 'top' | 'middle' | 'bottom';
		class?: string;
		children: Snippet<{ mouseX: number; distance: (x: number) => number; magnification: number }>;
	}

	let { direction = 'middle', class: className = '', children }: Props = $props();

	let mouseX = $state(0);
	let dockRef: HTMLDivElement;
	let magnification = 60;
	let distance = (x: number) => {
		const bounds = dockRef?.getBoundingClientRect() ?? { x: 0, width: 0 };
		return x - bounds.x - bounds.width / 2;
	};

	function handleMouseMove(e: MouseEvent) {
		mouseX = e.clientX;
	}

	function handleMouseLeave() {
		mouseX = 0;
	}

	onMount(() => {
		if (dockRef) {
			dockRef.addEventListener('mousemove', handleMouseMove);
			dockRef.addEventListener('mouseleave', handleMouseLeave);
		}

		return () => {
			if (dockRef) {
				dockRef.removeEventListener('mousemove', handleMouseMove);
				dockRef.removeEventListener('mouseleave', handleMouseLeave);
			}
		};
	});
</script>

<div
	bind:this={dockRef}
	class="mx-auto flex h-[58px] w-max gap-2 rounded-2xl border border-gray-200 bg-gray-50/80 px-2 backdrop-blur-md dark:border-gray-700 dark:bg-gray-800/80 {className}"
	data-direction={direction}
>
	{@render children({ mouseX, distance, magnification })}
</div>

<style>
	div[data-direction='top'] {
		align-items: flex-start;
	}
	
	div[data-direction='middle'] {
		align-items: center;
	}
	
	div[data-direction='bottom'] {
		align-items: flex-end;
	}
</style>
