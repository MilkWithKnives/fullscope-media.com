<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		mouseX: number;
		magnification: number;
		distance: (x: number) => number;
		children: Snippet;
	}

	let { mouseX, magnification, distance, children }: Props = $props();

	let ref: HTMLDivElement;
	let width = $state(40);

	onMount(() => {
		if (ref) {
			width = ref.offsetWidth;
		}
	});

	$effect(() => {
		if (ref && mouseX !== undefined) {
			const distanceCalc = distance(mouseX);
			const widthSync = width;
			const distanceToBeActive = 150;

			let widthMultiplier = 40;
			if (distanceCalc < distanceToBeActive) {
				widthMultiplier =
					40 + magnification * Math.cos((distanceCalc / distanceToBeActive) * (Math.PI / 2));
			}

			ref.style.width = `${widthMultiplier}px`;
			ref.style.height = `${widthMultiplier}px`;
		}
	});
</script>

<div
	bind:this={ref}
	class="flex aspect-square cursor-pointer items-center justify-center rounded-full transition-all duration-300 ease-out"
	style="width: 40px; height: 40px;"
>
	{@render children()}
</div>
