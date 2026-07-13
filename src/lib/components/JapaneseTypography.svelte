<script lang="ts">
	// 文字 — hierarchical Japanese typography with optional vertical writing.
	// Renders the chosen semantic tag with a clamp-based type scale.
	type Level = 'display' | 'hero' | 'large' | 'medium' | 'small';

	let {
		level = 'large',
		vertical = false,
		brush = false,
		tag = 'h2',
		kanji = '',
		class: className = '',
		children
	}: {
		level?: Level;
		vertical?: boolean;
		brush?: boolean;
		tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
		kanji?: string;
		class?: string;
		children?: import('svelte').Snippet;
	} = $props();
</script>

<svelte:element
	this={tag}
	class="jp-type t-{level} {className}"
	class:vertical-rl={vertical}
	class:brush
>
	{#if kanji}<span class="jp-kanji" aria-hidden="true">{kanji}</span>{/if}
	{@render children?.()}
</svelte:element>

<style>
	.jp-type {
		margin: 0;
		color: var(--charcoal);
	}
	.jp-kanji {
		display: block;
		font-size: 0.72rem;
		letter-spacing: 6px;
		color: var(--vermilion);
		font-weight: 700;
		margin-bottom: 0.15em;
	}
	.jp-type.vertical-rl .jp-kanji {
		letter-spacing: 0.15em;
		margin-bottom: 0;
		margin-left: 0.15em;
	}
</style>
