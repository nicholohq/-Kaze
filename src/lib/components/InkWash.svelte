<script lang="ts">
	// 墨 — decorative radial ink-wash for depth behind heroes and headers.
	// Non-interactive; place inside a position:relative parent.
	type Position = 'center' | 'top' | 'bottom' | 'left' | 'right';

	let {
		position = 'center',
		intensity = 0.35,
		color = '26, 42, 58',
		class: className = ''
	}: {
		position?: Position;
		intensity?: number;
		color?: string; // rgb triplet
		class?: string;
	} = $props();

	const origin: Record<Position, string> = {
		center: '50% 45%',
		top: '50% 0%',
		bottom: '50% 100%',
		left: '0% 50%',
		right: '100% 50%'
	};
</script>

<div
	class="ink-wash-layer {className}"
	style="--ink-origin:{origin[position]}; --ink-rgb:{color}; --ink-a:{intensity};"
	aria-hidden="true"
></div>

<style>
	.ink-wash-layer {
		position: absolute;
		inset: 0;
		z-index: 0;
		pointer-events: none;
		background: radial-gradient(
			ellipse 65% 55% at var(--ink-origin),
			rgba(var(--ink-rgb), var(--ink-a)) 0%,
			rgba(var(--ink-rgb), calc(var(--ink-a) * 0.35)) 35%,
			transparent 72%
		);
	}
</style>
