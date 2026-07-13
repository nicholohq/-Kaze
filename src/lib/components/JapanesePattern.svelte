<script lang="ts" module>
	// Unique-id counter so multiple pattern instances don't collide on <pattern> ids.
	let uid = 0;
</script>

<script lang="ts">
	// Background pattern system. Renders a tiling SVG (or CSS washi) as a
	// non-interactive decorative layer. Drop inside a position:relative parent.
	type Pattern = 'asanoha' | 'seigaiha' | 'yagasuri' | 'washi';

	let {
		pattern = 'seigaiha',
		opacity = 0.08,
		color = 'currentColor',
		scale = 60,
		class: className = ''
	}: {
		pattern?: Pattern;
		opacity?: number;
		color?: string;
		scale?: number;
		class?: string;
	} = $props();

	const n = uid++; // stable per-instance suffix so <pattern> ids never collide
	const id = $derived(`jp-${pattern}-${n}`);
</script>

<div
	class="jp-pattern {className}"
	class:washi={pattern === 'washi'}
	style="opacity:{opacity};color:{color};"
	aria-hidden="true"
>
	{#if pattern !== 'washi'}
		<svg width="100%" height="100%">
			<defs>
				{#if pattern === 'seigaiha'}
					<!-- 青海波 — wave scales -->
					<pattern {id} width={scale} height={scale / 2} patternUnits="userSpaceOnUse">
						{#each [0, scale] as cx (cx)}
							<g transform="translate({cx}, 0)">
								<circle cx="0" cy="0" r={scale * 0.33} fill="none" stroke="currentColor" stroke-width="2" opacity="0.9" />
								<circle cx="0" cy="0" r={scale * 0.24} fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.7" />
								<circle cx="0" cy="0" r={scale * 0.14} fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5" />
								<circle cx="0" cy="0" r={scale * 0.05} fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.35" />
							</g>
						{/each}
						<g transform="translate({scale / 2}, 0)">
							<circle cx="0" cy="0" r={scale * 0.33} fill="none" stroke="currentColor" stroke-width="2" opacity="0.9" />
							<circle cx="0" cy="0" r={scale * 0.24} fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.7" />
							<circle cx="0" cy="0" r={scale * 0.14} fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5" />
							<circle cx="0" cy="0" r={scale * 0.05} fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.35" />
						</g>
					</pattern>
				{:else if pattern === 'asanoha'}
					<!-- 麻の葉 — hemp leaf -->
					<pattern {id} width={scale} height={scale} patternUnits="userSpaceOnUse">
						<g fill="none" stroke="currentColor" stroke-width="1" transform="scale({scale / 60})">
							<path d="M30 0 L30 30 M30 30 L60 15 M30 30 L60 45 M30 30 L30 60 M30 30 L0 45 M30 30 L0 15" />
							<path d="M30 0 L60 15 L60 45 L30 60 L0 45 L0 15 Z" />
							<path d="M30 0 L45 7.5 M30 0 L15 7.5 M60 15 L45 22.5 M60 45 L45 37.5 M30 60 L45 52.5 M30 60 L15 52.5 M0 45 L15 37.5 M0 15 L15 22.5" />
						</g>
					</pattern>
				{:else if pattern === 'yagasuri'}
					<!-- 矢絣 — arrow feather -->
					<pattern {id} width={scale} height={scale} patternUnits="userSpaceOnUse">
						<g fill="currentColor" transform="scale({scale / 40})">
							<path d="M0 0 L20 10 L0 20 L0 14 L10 10 L0 6 Z" />
							<path d="M20 0 L40 10 L20 20 L20 14 L30 10 L20 6 Z" />
							<path d="M0 20 L20 30 L0 40 L0 34 L10 30 L0 26 Z" />
							<path d="M20 20 L40 30 L20 40 L20 34 L30 30 L20 26 Z" />
						</g>
					</pattern>
				{/if}
			</defs>
			<rect width="100%" height="100%" fill="url(#{id})" />
		</svg>
	{/if}
</div>

<style>
	.jp-pattern {
		position: absolute;
		inset: 0;
		z-index: 0;
		pointer-events: none;
		overflow: hidden;
	}
	.jp-pattern svg {
		display: block;
	}
	.jp-pattern.washi {
		background-image:
			radial-gradient(circle at 20% 30%, rgba(139,115,85,0.5) 0, transparent 45%),
			radial-gradient(circle at 80% 70%, rgba(139,115,85,0.5) 0, transparent 45%),
			repeating-linear-gradient(0deg, rgba(28,28,28,0.35) 0 1px, transparent 1px 3px),
			repeating-linear-gradient(90deg, rgba(28,28,28,0.3) 0 1px, transparent 1px 4px);
	}
</style>
