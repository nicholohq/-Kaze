<script lang="ts">
	// 提灯 — chōchin lantern notification. A dismissible banner with a
	// paper-lantern motif on the leading edge.
	import { fly } from 'svelte/transition';

	type Kind = 'info' | 'success' | 'warning' | 'error';

	let {
		type = 'info',
		message = '',
		dismissible = true,
		onDismiss,
		children
	}: {
		type?: Kind;
		message?: string;
		dismissible?: boolean;
		onDismiss?: () => void;
		children?: import('svelte').Snippet;
	} = $props();

	let open = $state(true);

	function dismiss() {
		open = false;
		onDismiss?.();
	}
</script>

{#if open}
	<div
		class="chochin chochin--{type}"
		role={type === 'error' || type === 'warning' ? 'alert' : 'status'}
		transition:fly={{ y: -8, duration: 220 }}
	>
		<span class="chochin__lantern" aria-hidden="true">
			<span class="chochin__glow"></span>
		</span>
		<span class="chochin__msg">{message}{@render children?.()}</span>
		{#if dismissible}
			<button class="chochin__close" onclick={dismiss} aria-label="Dismiss notification">×</button>
		{/if}
	</div>
{/if}

<style>
	.chochin {
		display: flex;
		align-items: center;
		gap: var(--s3);
		padding: var(--s2) var(--s3);
		background: var(--paper);
		border: var(--border-thin);
		border-left-width: 6px;
		border-radius: var(--radius);
		box-shadow: var(--shadow-kirigami);
		font-size: 0.88rem;
		font-weight: 600;
		color: var(--charcoal);
	}
	.chochin--info    { border-left-color: var(--ao); }
	.chochin--success { border-left-color: var(--matcha); }
	.chochin--warning { border-left-color: var(--gold); }
	.chochin--error   { border-left-color: var(--vermilion); }

	/* paper-lantern glyph */
	.chochin__lantern {
		position: relative;
		flex: none;
		width: 16px;
		height: 20px;
		border-radius: 50% / 42%;
		background: var(--vermilion);
		box-shadow: inset 0 0 0 2px rgba(0,0,0,0.12);
	}
	.chochin--success .chochin__lantern { background: var(--matcha); }
	.chochin--warning .chochin__lantern { background: var(--gold); }
	.chochin--info .chochin__lantern { background: var(--ao); }
	.chochin__lantern::before,
	.chochin__lantern::after {
		content: '';
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		width: 6px;
		height: 2px;
		background: var(--charcoal);
	}
	.chochin__lantern::before { top: -3px; }
	.chochin__lantern::after { bottom: -3px; }
	.chochin__glow {
		position: absolute;
		inset: 3px;
		border-radius: 50% / 42%;
		background: rgba(255,255,255,0.35);
		animation: chochin-flicker 3s ease-in-out infinite;
	}
	@keyframes chochin-flicker {
		0%, 100% { opacity: 0.35; }
		50% { opacity: 0.6; }
	}

	.chochin__msg { flex: 1; min-width: 0; }
	.chochin__close {
		flex: none;
		background: none;
		border: none;
		cursor: pointer;
		font-size: 1.2rem;
		line-height: 1;
		color: var(--wave-mid);
		padding: 0 var(--s1);
		border-radius: 4px;
		transition: color var(--ease-fast), background var(--ease-fast);
	}
	.chochin__close:hover { color: var(--vermilion); background: var(--linen-2); }

	@media (prefers-reduced-motion: reduce) {
		.chochin__glow { animation: none; }
	}
</style>
