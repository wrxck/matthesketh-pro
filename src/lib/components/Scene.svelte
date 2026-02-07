<script lang="ts">
	import { T } from '@threlte/core';
	import { HTML, OrbitControls } from '@threlte/extras';
	import * as THREE from 'three';

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

	interface Connection {
		from: string;
		to: string;
	}

	interface Props {
		nodes: Node[];
		connections: Connection[];
		selectedNode: Node | null;
		onSelect: (node: Node | null) => void;
	}

	let { nodes, connections, selectedNode, onSelect }: Props = $props();
	let hoveredNode = $state<string | null>(null);

	function getNodeById(id: string): Node | undefined {
		return nodes.find((n) => n.id === id);
	}

	function getLinePoints(fromId: string, toId: string): THREE.Vector3[] | null {
		const from = getNodeById(fromId);
		const to = getNodeById(toId);
		if (!from || !to) return null;
		return [
			new THREE.Vector3(from.x, from.y, from.z),
			new THREE.Vector3(to.x, to.y, to.z)
		];
	}

	function getGlowColor(type: string): string {
		if (type === 'core') return '#0ff';
		if (type === 'category') return '#0ff';
		return '#f0f';
	}

	function getNodeScale(type: string): number {
		if (type === 'core') return 1.5;
		if (type === 'category') return 1.2;
		if (type === 'item') return 1;
		return 0.85;
	}
</script>

<T.PerspectiveCamera makeDefault position={[0, 0, 1500]} fov={60}>
	<OrbitControls
		enableDamping
		dampingFactor={0.05}
		minDistance={500}
		maxDistance={3000}
		enablePan
		panSpeed={1}
		rotateSpeed={0.5}
	/>
</T.PerspectiveCamera>

<T.AmbientLight intensity={0.3} />
<T.PointLight position={[500, 500, 500]} intensity={1} color="#0ff" />
<T.PointLight position={[-500, -500, -500]} intensity={0.5} color="#f0f" />

<!-- grid floor -->
<T.Mesh rotation.x={-Math.PI / 2} position.y={-600}>
	<T.PlaneGeometry args={[10000, 10000, 100, 100]} />
	<T.MeshBasicMaterial color="#050508" wireframe opacity={0.3} transparent />
</T.Mesh>

<!-- grid lines -->
<T.GridHelper args={[10000, 100, '#0ff', '#112']} position.y={-600} />

<!-- connections -->
{#each connections as conn}
	{@const points = getLinePoints(conn.from, conn.to)}
	{#if points}
		<T.Line>
			<T.BufferGeometry>
				{@const positions = new Float32Array([
					points[0].x, points[0].y, points[0].z,
					points[1].x, points[1].y, points[1].z
				])}
				<T.BufferAttribute
					attach="attributes.position"
					args={[positions, 3]}
				/>
			</T.BufferGeometry>
			<T.LineBasicMaterial color="#0ff" opacity={0.4} transparent linewidth={1} />
		</T.Line>
	{/if}
{/each}

<!-- nodes -->
{#each nodes as node (node.id)}
	{@const isSelected = selectedNode?.id === node.id}
	{@const isHovered = hoveredNode === node.id}
	{@const glowColor = getGlowColor(node.type)}
	{@const scale = getNodeScale(node.type)}
	<HTML
		position.x={node.x}
		position.y={node.y}
		position.z={node.z}
		transform
		sprite
		distanceFactor={300}
	>
			<button
				class="node-3d {node.type}"
				class:selected={isSelected}
				class:hovered={isHovered}
				style="--glow-color: {glowColor}; --scale: {scale}"
				onclick={() => onSelect(node)}
				onmouseenter={() => hoveredNode = node.id}
				onmouseleave={() => hoveredNode = null}
			>
				{#if node.type === 'core'}
					<span class="core-label">{node.label}</span>
					<span class="core-sublabel">{node.sublabel}</span>
				{:else}
					<span class="node-label">{node.label}</span>
					{#if node.year}
						<span class="node-year">{node.year}</span>
					{/if}
				{/if}
			</button>
	</HTML>
{/each}

<style>
	.node-3d {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: rgba(5, 5, 8, 0.9);
		border: 2px solid var(--glow-color);
		color: #e8e6d9;
		cursor: pointer;
		font-family: 'Space Mono', monospace;
		padding: 0.5rem 1rem;
		transition: all 0.2s ease;
		box-shadow: 0 0 10px var(--glow-color), inset 0 0 5px rgba(0, 255, 255, 0.1);
		transform: scale(var(--scale));
		white-space: nowrap;
	}

	.node-3d:hover,
	.node-3d.hovered {
		border-color: #fff;
		box-shadow: 0 0 30px var(--glow-color), 0 0 60px var(--glow-color), inset 0 0 15px rgba(0, 255, 255, 0.2);
		z-index: 100;
	}

	.node-3d.selected {
		border-color: #fff;
		box-shadow: 0 0 40px var(--glow-color), 0 0 80px var(--glow-color), inset 0 0 20px rgba(0, 255, 255, 0.3);
		animation: pulse 1.5s ease-in-out infinite;
	}

	@keyframes pulse {
		0%, 100% { box-shadow: 0 0 40px var(--glow-color), 0 0 80px var(--glow-color); }
		50% { box-shadow: 0 0 60px var(--glow-color), 0 0 120px var(--glow-color); }
	}

	.node-3d.core {
		border-radius: 50%;
		width: 180px;
		height: 180px;
		border-width: 3px;
		background: radial-gradient(circle, rgba(10, 30, 30, 0.9) 0%, rgba(5, 5, 8, 0.95) 100%);
	}

	.node-3d.category {
		border-radius: 8px;
		border-width: 2px;
		min-width: 100px;
		padding: 0.8rem 1.5rem;
	}

	.node-3d.item {
		border-radius: 4px;
		min-width: 80px;
	}

	.node-3d.subitem {
		border-radius: 4px;
		border-style: dashed;
		border-width: 1px;
		font-size: 0.85em;
	}

	.core-label {
		font-family: 'Rubik Mono One', sans-serif;
		font-size: 1.8em;
		letter-spacing: -2px;
		line-height: 1;
		color: #0ff;
		text-shadow: 0 0 10px #0ff;
	}

	.core-sublabel {
		font-family: 'Rubik Mono One', sans-serif;
		font-size: 1em;
		-webkit-text-stroke: 1px #0ff;
		color: transparent;
	}

	.node-label {
		font-size: 0.85em;
		text-transform: uppercase;
		font-weight: bold;
		text-align: center;
		line-height: 1.1;
		text-shadow: 0 0 5px var(--glow-color);
	}

	.node-3d.category .node-label {
		font-family: 'Rubik Mono One', sans-serif;
		font-size: 1em;
		color: #0ff;
	}

	.node-year {
		font-size: 0.6em;
		opacity: 0.7;
		color: #f0f;
	}
</style>
