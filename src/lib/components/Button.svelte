<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		onclick?: () => void;
		variant?: 'default' | 'submit';
		type?: 'button' | 'submit';
	}

	let { children, onclick, variant = 'default', type = 'button' }: Props = $props();
	let isHovered = $state(false);
</script>

<button
	{type}
	class="btn"
	class:submit={variant === 'submit'}
	class:hovered={isHovered}
	onmouseenter={() => (isHovered = true)}
	onmouseleave={() => (isHovered = false)}
	{onclick}
>
	{@render children()}
</button>

<style>
	.btn {
		width: 100%;
		padding: 1rem;
		background: transparent;
		border: 2px solid #e8e6d9;
		color: #e8e6d9;
		font-family: 'Rubik Mono One', sans-serif;
		text-transform: uppercase;
		cursor: pointer;
		transition: 0.2s;
		text-align: center;
	}

	.btn.submit {
		background: #e8e6d9;
		color: #0a0a0a;
		font-weight: bold;
	}

	.btn.hovered {
		background: #e8e6d9;
		color: #0a0a0a;
		box-shadow: 0 0 15px rgba(232, 230, 217, 0.5);
	}
</style>
