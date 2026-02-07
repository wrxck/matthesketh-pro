<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		index: number;
	}

	let { children, index }: Props = $props();
	let isHovered = $state(false);
	const rotation = Math.floor(Math.random() * 20) - 10;

	const isOdd = index % 2 === 1;
	const is2n = index % 2 === 0;
	const is3n = index % 3 === 0;
	const is4n = index % 4 === 0;
</script>

<div
	class="sticker"
	class:hovered={isHovered}
	class:is-odd={isOdd && !is3n && !is4n}
	class:is-2n={is2n && !is3n && !is4n}
	class:is-3n={is3n && !is4n}
	class:is-4n={is4n}
	style="--rotation: {rotation}deg"
	onmouseenter={() => (isHovered = true)}
	onmouseleave={() => (isHovered = false)}
>
	{@render children()}
</div>

<style>
	.sticker {
		padding: 1rem 2rem;
		border: 3px solid #e8e6d9;
		font-family: 'Rubik Mono One', sans-serif;
		font-size: 1.5rem;
		background: #0a0a0a;
		cursor: move;
		user-select: none;
		transition: transform 0.1s;
		transform: rotate(var(--rotation));
	}

	.sticker.hovered {
		transform: scale(1.2) rotate(0deg);
		z-index: 100;
		background: #fff;
		color: #000;
		box-shadow: 10px 10px 0px rgba(255, 255, 255, 0.2);
	}

	.sticker.is-odd:not(.hovered) {
		border-radius: 50%;
		font-family: 'Permanent Marker', cursive;
	}

	.sticker.is-2n:not(.hovered) {
		border-radius: 0;
		background: #e8e6d9;
		color: #0a0a0a;
		transform: rotate(3deg);
	}

	.sticker.is-3n:not(.hovered) {
		border: 2px dashed #e8e6d9;
		font-family: 'Metal Mania', cursive;
		transform: rotate(-2deg);
		background: transparent;
	}

	.sticker.is-4n:not(.hovered) {
		border-radius: 10px;
		border-width: 4px;
		font-family: 'UnifrakturMaguntia', cursive;
		font-size: 2rem;
	}
</style>
