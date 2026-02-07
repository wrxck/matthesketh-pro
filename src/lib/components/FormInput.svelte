<script lang="ts">
	interface Props {
		type?: string;
		placeholder?: string;
		rows?: number;
		label: string;
		name: string;
	}

	let { type = 'text', placeholder, rows, label, name }: Props = $props();
	let isFocused = $state(false);
</script>

<div class="field">
	<label for={name}>{label}</label>
	{#if rows}
		<textarea
			id={name}
			{name}
			{placeholder}
			{rows}
			class:focused={isFocused}
			onfocus={() => (isFocused = true)}
			onblur={() => (isFocused = false)}
		></textarea>
	{:else}
		<input
			{type}
			id={name}
			{name}
			{placeholder}
			class:focused={isFocused}
			onfocus={() => (isFocused = true)}
			onblur={() => (isFocused = false)}
		/>
	{/if}
</div>

<style>
	.field {
		margin-bottom: 2rem;
	}

	label {
		display: block;
		font-family: 'Rubik Mono One', sans-serif;
		margin-bottom: 0.5rem;
		font-size: 1.2rem;
	}

	input,
	textarea {
		width: 100%;
		background: #0a0a0a;
		border: 2px solid #e8e6d9;
		color: #e8e6d9;
		padding: 1rem;
		font-family: 'Space Mono', monospace;
		font-size: 1rem;
		outline: none;
	}

	textarea {
		resize: vertical;
	}

	input.focused,
	textarea.focused {
		background: #333333;
		border-color: #fff;
	}
</style>
