<script lang="ts">
	interface Props {
		orientation?: 'horizontal' | 'vertical';
		class?: string;
	}

	let { orientation = 'horizontal', class: className = '' }: Props = $props();
</script>

{#if orientation === 'vertical'}
	<div class="w-px bg-gray-300 dark:bg-gray-600 {className}" role="separator" aria-orientation="vertical"></div>
{:else}
	<div class="h-px bg-gray-300 dark:bg-gray-600 {className}" role="separator" aria-orientation="horizontal"></div>
{/if}
