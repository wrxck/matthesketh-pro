<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<svelte:head>
	<title>Matt Hesketh</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Creepster&family=Eater&family=Frijole&family=Metal+Mania&family=Nosifer&family=Permanent+Marker&family=Rubik+Glitch&family=Rubik+Mono+One&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=UnifrakturMaguntia&display=swap" rel="stylesheet" />
</svelte:head>

{@render children()}

<style>
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		cursor: crosshair;
	}

	:global(::selection) {
		background: #e8e6d9;
		color: #0a0a0a;
	}

	:global(body) {
		background-color: #0a0a0a;
		color: #e8e6d9;
		font-family: 'Space Mono', monospace;
		margin: 0;
		overflow-x: hidden;
		line-height: 1.4;
		font-size: 16px;
		min-height: 100vh;
	}

	:global(a) {
		color: #e8e6d9;
		text-decoration: none;
	}
</style>
