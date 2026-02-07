<script lang="ts">
	import Button from './Button.svelte';

	interface Props {
		title: string;
		year: string;
		description: string;
		tags: string[];
		buttonText: string;
	}

	let { title, year, description, tags, buttonText }: Props = $props();
	let isHovered = $state(false);
</script>

<div
	class="card"
	class:hovered={isHovered}
	onmouseenter={() => (isHovered = true)}
	onmouseleave={() => (isHovered = false)}
>
	<div class="card-shadow" class:hovered={isHovered}></div>
	<div class="header">
		<h3>{@html title}</h3>
		<span class="year">{year}</span>
	</div>
	<p class="description">{description}</p>
	<div class="tags">
		{#each tags as tag}
			<span class="tag">{tag}</span>
		{/each}
	</div>
	<Button>{buttonText}</Button>
</div>

<style>
	.card {
		border: 3px solid #e8e6d9;
		padding: 1.5rem;
		background: #0a0a0a;
		position: relative;
		transition: all 0.3s;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.card.hovered {
		border-color: #fff;
		transform: translate(-5px, -5px);
	}

	.card-shadow {
		content: '';
		position: absolute;
		top: 10px;
		left: 10px;
		width: 100%;
		height: 100%;
		border: 2px solid #333333;
		z-index: -1;
		transition: all 0.3s;
	}

	.card-shadow.hovered {
		transform: translate(10px, 10px);
		border-color: #e8e6d9;
	}

	.header {
		border-bottom: 2px solid #e8e6d9;
		padding-bottom: 1rem;
		margin-bottom: 1.5rem;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}

	h3 {
		font-family: 'Rubik Mono One', sans-serif;
		font-size: 2rem;
		margin: 0;
		line-height: 1;
	}

	.year {
		font-family: 'Space Mono', monospace;
		background: #e8e6d9;
		color: #0a0a0a;
		padding: 2px 6px;
		font-weight: bold;
	}

	.description {
		font-family: 'Space Mono', monospace;
		font-size: 0.9rem;
		flex-grow: 1;
		margin-bottom: 2rem;
	}

	.tags {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin-bottom: 1.5rem;
	}

	.tag {
		border: 1px solid #e8e6d9;
		padding: 2px 8px;
		font-size: 0.7rem;
		text-transform: uppercase;
		font-family: 'Space Mono', monospace;
	}
</style>
