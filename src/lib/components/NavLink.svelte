<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		href: string;
		children: Snippet;
	}

	let { href, children }: Props = $props();
	let isHovered = $state(false);
</script>

<a
	{href}
	class:hovered={isHovered}
	onmouseenter={() => (isHovered = true)}
	onmouseleave={() => (isHovered = false)}
>
	{@render children()}
</a>

<style>
	a {
		font-family: 'Rubik Mono One', sans-serif;
		color: #e8e6d9;
		text-decoration: none;
		font-size: 1.2rem;
		border: 2px solid #e8e6d9;
		padding: 0.5rem 1rem;
		transition: all 0.2s;
		text-transform: uppercase;
		background: #000;
	}

	a.hovered {
		background: #e8e6d9;
		color: #000;
		transform: translate(-4px, -4px);
		box-shadow: 4px 4px 0px #e8e6d9;
	}
</style>
