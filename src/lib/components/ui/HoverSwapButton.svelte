<script lang="ts">
  import { cn } from '$lib/utils';
  import type { HTMLButtonAttributes } from 'svelte/elements';

  interface $$Props extends HTMLButtonAttributes {
    label?: string;
    hoverLabel?: string;
    color?: string;
    class?: string;
  }

  let {
    label = 'Hover Me',
    hoverLabel = 'Thanks',
    color = 'var(--color-primary-strong)',
    class: className,
    type = 'button',
    ...restProps
  }: $$Props = $props();
</script>

<button
  class={cn('swap-button', className)}
  style={`--swap-color: ${color};`}
  type={type}
  {...restProps}
>
  <span class="swap-face front">{label}</span>
  <span class="swap-face back" aria-hidden="true">{hoverLabel}</span>
</button>

<style>
  .swap-button {
    height: 50px;
    width: 150px;
    border: none;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    background: var(--swap-color);
    color: #0a0a0a;
    font-weight: 600;
    font-size: 1.2rem;
    transition: box-shadow 0.45s ease, transform 0.45s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .swap-button:focus-visible {
    outline: 2px solid var(--swap-color);
    outline-offset: 4px;
    box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.2);
  }

  .swap-button:hover {
    box-shadow: 0 0 35px rgba(255, 138, 51, 0.45), 0 8px 22px rgba(0, 0, 0, 0.45);
  }

  .swap-face {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    transition: transform 0.45s ease;
  }

  .front {
    background: #ffffff;
    color: #0a0a0a;
    transform: translateY(0) scale(1.05);
  }

  .back {
    background: var(--swap-color);
    color: #0a0a0a;
    transform: translateY(100%);
  }

  .swap-button:hover .front {
    transform: translateY(-100%) scale(0.8) rotate(8deg);
  }

  .swap-button:hover .back {
    transform: translateY(0) scale(1.05);
  }
</style>
