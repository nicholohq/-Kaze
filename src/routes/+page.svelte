<script lang="ts">
	import { onMount } from 'svelte';
	import { auth } from '$lib/stores/auth.svelte.js';
	import { goto } from '$app/navigation';
	import { reveal } from '$lib/actions.js';

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
		<div class="hero-content">
			<div class="hero-card">
				<h1>Kaze</h1>
				<p class="tagline">Track your Ethereum portfolio</p>
				<div class="cta-buttons">
					<a href="/login" class="btn btn--primary">Get Started</a>
					<a href="/login" class="btn btn--ghost btn--ghost-light">Sign In</a>
				</div>
			</div>
		</div>
	</div>

	<div class="features-section reveal" use:reveal>
		<div class="features">
			<div class="feature panel">
				<div class="feature-icon">
					<svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="var(--charcoal)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<rect x="6" y="12" width="36" height="26" rx="3" />
						<rect x="6" y="16" width="36" height="8" opacity="0.15" />
						<circle cx="32" cy="26" r="3" fill="var(--charcoal)" />
						<line x1="24" y1="16" x2="24" y2="12" />
					</svg>
				</div>
				<h3>Wallet Import</h3>
				<p>Import holdings from MetaMask or any Ethereum address.</p>
			</div>
			<div class="feature panel">
				<div class="feature-icon">
					<svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="var(--charcoal)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
					<svg viewBox="0 0 48 48" width="40" height="40" fill="var(--charcoal)" stroke="none">
						<path d="M6 36 Q12 20, 20 24 Q28 28, 34 16 Q38 10, 42 14 Q36 22, 28 20 Q20 18, 14 28 Q10 34, 6 36 Z" opacity="0.8" />
						<path d="M10 30 Q14 24, 18 26 Q22 28, 26 22 Q28 18, 32 20 Q28 26, 22 24 Q16 22, 14 28 Z" opacity="0.4" />
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

	.hero { position: relative; height: 100vh; }
	.hero-bg {
		position: absolute; inset: 0; z-index: 0;
		background: url('/greatwave.jpg') center center / cover no-repeat;
		filter: contrast(1.12) saturate(1.08);
	}
	.hero-overlay {
		position: absolute; inset: 0; z-index: 1;
		background: linear-gradient(180deg, rgba(26,42,58,0.35) 0%, rgba(26,42,58,0.65) 100%);
	}

	.hero-content { position: relative; z-index: 2; height: 100%; display: flex; align-items: flex-start; justify-content: center; padding-top: min(10vh, 100px); }
	.hero-card { background: rgba(26, 42, 58, 0.88); padding: var(--s5) var(--s6); border-radius: var(--radius); text-align: center; max-width: 480px; backdrop-filter: blur(4px); border: 3px solid var(--charcoal); }
	.hero-card h1 { font-size: 3rem; color: var(--linen); margin-bottom: var(--s2); }
	.hero-card .tagline { font-size: 1.1rem; color: var(--wave-foam); margin-bottom: var(--s5); line-height: 1.6; opacity: 0.85; }
	.cta-buttons { display: flex; gap: var(--s3); justify-content: center; }

	:global(.btn--ghost-light) { color: var(--linen); border-color: var(--linen); }
	:global(.btn--ghost-light:hover) { background: rgba(255,255,255,0.1); }

	.features-section { position: relative; z-index: 1; padding: var(--s6) var(--s4); }
	.features { max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--s4); }
	.feature { padding: var(--s5); text-align: center; }
	.feature-icon { margin-bottom: var(--s3); display: flex; justify-content: center; }
	.feature h3 { font-size: 1.1rem; margin-bottom: var(--s2); }
	.feature p { font-size: 0.88rem; color: var(--wave-mid); line-height: 1.5; }
</style>
