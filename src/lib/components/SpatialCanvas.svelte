<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';

	interface Node {
		id: string;
		type: 'core' | 'category' | 'item' | 'subitem';
		x: number;
		y: number;
		z: number;
		label: string;
		sublabel?: string;
		description?: string;
		tags?: string[];
		year?: string;
		parent?: string;
	}

	let selectedNode = $state<Node | null>(null);

	const nodes: Node[] = [
		// core
		{ id: 'core', type: 'core', x: 0, y: 0, z: 0, label: 'MATT', sublabel: 'HESKETH' },

		// main categories - spread in Z
		{ id: 'work', type: 'category', x: -500, y: 300, z: -200, label: 'WORK', parent: 'core' },
		{ id: 'life', type: 'category', x: 500, y: 300, z: -100, label: 'LIFE', parent: 'core' },
		{ id: 'product', type: 'category', x: -500, y: -300, z: 100, label: 'PRODUCT', parent: 'core' },
		{ id: 'stack', type: 'category', x: 500, y: -300, z: 200, label: 'STACK', parent: 'core' },

		// work → projects
		{ id: 'proj1', type: 'item', x: -900, y: 500, z: -350, label: 'VOID ENGINE', year: '2024', description: 'Distributed systems in Rust. Millions of concurrent connections.', tags: ['Rust', 'Tokio', 'gRPC'], parent: 'work' },
		{ id: 'proj2', type: 'item', x: -600, y: 550, z: -280, label: 'NEURAL MESH', year: '2023', description: 'Real-time collaboration platform with CRDT conflict resolution.', tags: ['TypeScript', 'SvelteKit'], parent: 'work' },
		{ id: 'proj3', type: 'item', x: -300, y: 500, z: -150, label: 'DARK FORGE', year: '2023', description: 'Infrastructure-as-code for Kubernetes clusters.', tags: ['Go', 'K8s', 'Terraform'], parent: 'work' },

		// life → hobbies
		{ id: 'music', type: 'item', x: 350, y: 500, z: -200, label: 'MUSIC', description: 'Electronic production, modular synthesis', parent: 'life' },
		{ id: 'gaming', type: 'item', x: 550, y: 550, z: -50, label: 'GAMING', description: 'Strategy, immersive sims, indie', parent: 'life' },
		{ id: 'reading', type: 'item', x: 750, y: 500, z: 50, label: 'READING', description: 'Sci-fi, philosophy, technical papers', parent: 'life' },
		{ id: 'fitness', type: 'item', x: 600, y: 380, z: -150, label: 'FITNESS', description: 'Climbing, cycling, weights', parent: 'life' },

		// product → design
		{ id: 'ui', type: 'item', x: -900, y: -350, z: 50, label: 'UI DESIGN', description: 'Brutalist interfaces, dark themes', parent: 'product' },
		{ id: 'ux', type: 'item', x: -700, y: -500, z: 150, label: 'UX RESEARCH', description: 'User testing, analytics, A/B', parent: 'product' },
		{ id: 'brand', type: 'item', x: -400, y: -450, z: 200, label: 'BRANDING', description: 'Visual identity, typography', parent: 'product' },
		{ id: 'proto', type: 'item', x: -600, y: -200, z: 0, label: 'PROTOTYPING', description: 'Figma, code prototypes', parent: 'product' },

		// stack → languages
		{ id: 'js', type: 'item', x: 300, y: -450, z: 150, label: 'JavaScript', parent: 'stack' },
		{ id: 'python', type: 'item', x: 500, y: -550, z: 280, label: 'Python', parent: 'stack' },
		{ id: 'rust', type: 'item', x: 700, y: -450, z: 350, label: 'Rust', parent: 'stack' },
		{ id: 'go', type: 'item', x: 850, y: -350, z: 250, label: 'Go', parent: 'stack' },
		{ id: 'csharp', type: 'item', x: 950, y: -500, z: 400, label: 'C#', parent: 'stack' },
		{ id: 'java', type: 'item', x: 1050, y: -400, z: 300, label: 'Java', parent: 'stack' },
		{ id: 'c', type: 'item', x: 400, y: -200, z: 100, label: 'C', parent: 'stack' },
		{ id: 'cpp', type: 'item', x: 550, y: -150, z: 180, label: 'C++', parent: 'stack' },
		{ id: 'lua', type: 'item', x: 700, y: -180, z: 220, label: 'Lua', parent: 'stack' },
		{ id: 'shell', type: 'item', x: 300, y: -250, z: 50, label: 'Shell', parent: 'stack' },
		{ id: 'html', type: 'item', x: 150, y: -350, z: 120, label: 'HTML', parent: 'stack' },
		{ id: 'css', type: 'item', x: 100, y: -480, z: 200, label: 'CSS', parent: 'stack' },
		{ id: 'cobol', type: 'item', x: 1150, y: -300, z: 450, label: 'COBOL', parent: 'stack' },

		// js → typescript
		{ id: 'ts', type: 'item', x: 200, y: -600, z: 250, label: 'TypeScript', parent: 'js' },

		// js/ts frameworks
		{ id: 'node', type: 'subitem', x: 100, y: -750, z: 300, label: 'Node.js', parent: 'ts' },
		{ id: 'react', type: 'subitem', x: 350, y: -620, z: 200, label: 'React', parent: 'js' },
		{ id: 'svelte', type: 'subitem', x: 50, y: -650, z: 320, label: 'Svelte', parent: 'ts' },

		// node frameworks
		{ id: 'express', type: 'subitem', x: 0, y: -870, z: 380, label: 'Express', parent: 'node' },
		{ id: 'fastify', type: 'subitem', x: 200, y: -880, z: 350, label: 'Fastify', parent: 'node' },

		// python frameworks
		{ id: 'fastapi', type: 'subitem', x: 400, y: -700, z: 350, label: 'FastAPI', parent: 'python' },
		{ id: 'django', type: 'subitem', x: 600, y: -700, z: 380, label: 'Django', parent: 'python' },

		// rust frameworks
		{ id: 'tokio', type: 'subitem', x: 750, y: -600, z: 420, label: 'Tokio', parent: 'rust' },
		{ id: 'axum', type: 'subitem', x: 850, y: -580, z: 450, label: 'Axum', parent: 'rust' },

		// c# frameworks
		{ id: 'dotnet', type: 'subitem', x: 1000, y: -650, z: 480, label: '.NET', parent: 'csharp' },
		{ id: 'unity', type: 'subitem', x: 1100, y: -600, z: 500, label: 'Unity', parent: 'csharp' },

		// java frameworks
		{ id: 'spring', type: 'subitem', x: 1150, y: -500, z: 400, label: 'Spring', parent: 'java' },

		// infra
		{ id: 'infra', type: 'item', x: 1000, y: -200, z: 350, label: 'INFRA', parent: 'stack' },
		{ id: 'docker', type: 'subitem', x: 1150, y: -100, z: 400, label: 'Docker', parent: 'infra' },
		{ id: 'k8s', type: 'subitem', x: 1250, y: -200, z: 450, label: 'Kubernetes', parent: 'infra' },
		{ id: 'aws', type: 'subitem', x: 1200, y: -350, z: 420, label: 'AWS', parent: 'infra' },
		{ id: 'linux', type: 'subitem', x: 1100, y: -50, z: 380, label: 'Linux', parent: 'infra' },
	];

	const connections = nodes
		.filter((n) => n.parent)
		.map((n) => ({ from: n.parent!, to: n.id }));

	function handleSelect(node: Node | null) {
		selectedNode = node;
	}
</script>

<svelte:window
	onkeydown={(e) => { if (e.key === 'Escape') selectedNode = null; }}
/>

<div class="spatial-canvas">
	<Canvas>
		<Scene {nodes} {connections} {selectedNode} onSelect={handleSelect} />
	</Canvas>

	{#if selectedNode && selectedNode.description}
		<div class="detail-panel">
			<button class="close-btn" onclick={() => (selectedNode = null)}>×</button>
			<h2>{selectedNode.label}</h2>
			{#if selectedNode.year}
				<span class="detail-year">{selectedNode.year}</span>
			{/if}
			<p>{selectedNode.description}</p>
			{#if selectedNode.tags}
				<div class="detail-tags">
					{#each selectedNode.tags as tag}
						<span class="tag">{tag}</span>
					{/each}
				</div>
			{/if}
		</div>
	{/if}

	<div class="controls">
		<span>DRAG TO ORBIT</span>
		<span>SCROLL TO ZOOM</span>
		<span>CLICK FOR DETAILS</span>
	</div>
</div>

<style>
	.spatial-canvas {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: #050508;
		overflow: hidden;
	}

	.detail-panel {
		position: fixed;
		bottom: 2rem;
		left: 50%;
		transform: translateX(-50%);
		background: rgba(5, 5, 8, 0.95);
		border: 2px solid #0ff;
		box-shadow: 0 0 30px rgba(0, 255, 255, 0.3), inset 0 0 20px rgba(0, 255, 255, 0.1);
		padding: 2rem;
		max-width: 400px;
		z-index: 1000;
		font-family: 'Space Mono', monospace;
		color: #e8e6d9;
	}

	.detail-panel h2 {
		font-family: 'Rubik Mono One', sans-serif;
		font-size: 1.3rem;
		margin: 0 0 0.5rem;
		color: #0ff;
		text-shadow: 0 0 10px #0ff;
	}

	.detail-year {
		background: #0ff;
		color: #050508;
		padding: 2px 8px;
		font-size: 0.75rem;
		font-weight: bold;
	}

	.detail-panel p {
		margin: 1rem 0;
		line-height: 1.5;
		font-size: 0.9rem;
	}

	.detail-tags {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.tag {
		border: 1px solid #f0f;
		color: #f0f;
		padding: 3px 10px;
		font-size: 0.7rem;
		text-transform: uppercase;
		text-shadow: 0 0 5px #f0f;
	}

	.close-btn {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		background: none;
		border: none;
		color: #0ff;
		font-size: 1.5rem;
		cursor: pointer;
		padding: 0.5rem;
		line-height: 1;
		text-shadow: 0 0 10px #0ff;
	}

	.close-btn:hover {
		color: #fff;
	}

	.controls {
		position: fixed;
		bottom: 2rem;
		right: 2rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		font-family: 'Space Mono', monospace;
		font-size: 0.65rem;
		color: #0ff;
		opacity: 0.5;
		text-align: right;
		text-shadow: 0 0 5px #0ff;
	}
</style>
