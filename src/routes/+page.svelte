<script lang="ts">
	import { onMount } from 'svelte';
	import { auth } from '$lib/stores/auth.svelte.js';
	import { goto } from '$app/navigation';
	import { reveal } from '$lib/actions.js';
	import InkWash from '$lib/components/InkWash.svelte';
	import JapanesePattern from '$lib/components/JapanesePattern.svelte';

	onMount(() => {
		if (auth.user) goto('/dashboard');
	});
</script>

<svelte:head>
	<title>Kaze — Ethereum Portfolio Tracker</title>
</svelte:head>

<div class="landing">
	<div class="hero">
		<div class="hero-bg"></div>
		<div class="hero-overlay"></div>
		<InkWash position="center" intensity={0.4} />
		<div class="hero-content">
			<p class="hero-eyebrow" aria-hidden="true">風 ・ かぜ ・ WIND</p>
			<h1 class="hero-title brush-light">Kaze</h1>
			<p class="hero-sub">Track your Ethereum portfolio</p>
			<div class="hero-cta">
				<a href="/login" class="btn btn--primary btn--lg">Get Started</a>
				<a href="/login" class="btn btn--ghost btn--ghost-light">Sign In</a>
			</div>
			<p class="hero-kanji">風</p>
		</div>
	</div>

	<div class="features-section reveal" use:reveal>
		<JapanesePattern pattern="asanoha" opacity={0.05} color="var(--wave-deep)" />
		<div class="features">
			<div class="feature panel">
				<div class="feature-icon">
					<svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="var(--charcoal)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
						<rect x="6" y="12" width="36" height="26" rx="3" />
						<rect x="6" y="16" width="36" height="8" opacity="0.12" />
						<circle cx="32" cy="26" r="3" fill="var(--charcoal)" />
						<line x1="24" y1="16" x2="24" y2="12" />
					</svg>
				</div>
				<h3>Wallet Import</h3>
				<p>Import holdings from MetaMask or any Ethereum address.</p>
			</div>
			<div class="feature panel">
				<div class="feature-icon">
					<svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="var(--charcoal)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
						<rect x="6" y="6" width="36" height="36" rx="3" />
						<polyline points="12,34 19,22 27,28 36,14" />
						<circle cx="12" cy="34" r="2" fill="var(--charcoal)" stroke="none" />
						<circle cx="19" cy="22" r="2" fill="var(--charcoal)" stroke="none" />
						<circle cx="27" cy="28" r="2" fill="var(--charcoal)" stroke="none" />
						<circle cx="36" cy="14" r="2" fill="var(--charcoal)" stroke="none" />
					</svg>
				</div>
				<h3>Live Prices</h3>
				<p>Real-time prices and charts for the top 100 coins.</p>
			</div>
			<div class="feature panel">
				<div class="feature-icon">
					<svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="var(--charcoal)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
						<path d="M4 36 C12 22, 18 16, 26 20 C34 24, 40 12, 44 14" />
						<circle cx="4" cy="36" r="2" fill="var(--charcoal)" stroke="none" />
						<circle cx="26" cy="20" r="2" fill="var(--charcoal)" stroke="none" />
						<circle cx="44" cy="14" r="2" fill="var(--charcoal)" stroke="none" />
					</svg>
				</div>
				<h3>Great Wave Design</h3>
				<p>Inspired by Hokusai's masterpiece. Built for Ethereum.</p>
			</div>
		</div>
	</div>
</div>

<style>
	.landing { position: relative; min-height: 100vh; overflow: hidden; background: var(--linen); }

	.hero { position: relative; height: 100vh; display: flex; align-items: center; justify-content: center; }
	.hero-bg {
		position: absolute; inset: 0; z-index: 0;
		background: url('/greatwave.jpg') center 30% / cover no-repeat;
		filter: contrast(1.15) saturate(1.1);
	}
	.hero-overlay {
		position: absolute; inset: 0; z-index: 1;
		background: linear-gradient(180deg, rgba(26,42,58,0.3) 0%, rgba(26,42,58,0.7) 100%);
	}
	.hero-content {
		position: relative; z-index: 2; text-align: center;
		display: flex; flex-direction: column; align-items: center;
	}

	.hero-eyebrow {
		font-family: var(--serif);
		font-size: clamp(0.7rem, 1.4vw, 0.95rem);
		letter-spacing: 0.5em;
		color: var(--gold);
		margin-bottom: var(--s3);
		opacity: 0.9;
		text-indent: 0.5em;
	}
	.hero-title {
		font-size: clamp(4rem, 12vw, 10rem);
		color: var(--linen);
		line-height: 0.95;
		letter-spacing: 0.03em;
		margin-bottom: var(--s3);
		text-shadow: 0 4px 24px rgba(0,0,0,0.3);
	}
	.brush-light {
		background: linear-gradient(100deg, var(--paper) 0%, var(--wave-foam) 45%, var(--wisteria) 100%);
		-webkit-background-clip: text; background-clip: text;
		color: transparent;
	}
	.hero-sub {
		font-size: clamp(1rem, 2vw, 1.4rem);
		color: var(--wave-foam);
		opacity: 0.8;
		margin-bottom: var(--s5);
		letter-spacing: 2px;
		font-weight: 400;
	}
	.hero-cta { display: flex; gap: var(--s3); justify-content: center; }
	.hero-kanji {
		position: fixed; bottom: -0.15em; right: 0.08em;
		font-family: var(--serif);
		font-size: clamp(8rem, 20vw, 20rem);
		color: var(--linen);
		opacity: 0.04;
		line-height: 1;
		pointer-events: none;
		user-select: none;
		z-index: 2;
	}

	:global(.btn--ghost-light) { color: var(--linen); border-color: var(--linen); }
	:global(.btn--ghost-light:hover) { background: rgba(255,255,255,0.1); }
	:global(.btn--lg) { padding: var(--s3) var(--s6); font-size: 1rem; }

	.features-section { position: relative; z-index: 1; padding: var(--s6) var(--s4); }
	.features { position: relative; z-index: 1; max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--s4); }
	.feature { padding: var(--s5); text-align: center; }
	.feature-icon { margin-bottom: var(--s3); display: flex; justify-content: center; }
	.feature h3 { font-size: 1.1rem; margin-bottom: var(--s2); }
	.feature p { font-size: 0.88rem; color: var(--wave-mid); line-height: 1.5; }
</style>
