<script lang="ts">
	import { onMount } from 'svelte';
	import { auth } from '$lib/stores/auth.svelte.js';
	import { goto } from '$app/navigation';

	onMount(() => {
		if (auth.user) goto('/dashboard');
	});
</script>

<div class="landing">
	<div class="wave-bg">
		<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet" class="hero-wave">
			<defs>
				<linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stop-color="var(--wave-deep)" />
					<stop offset="50%" stop-color="var(--wave-mid)" />
					<stop offset="100%" stop-color="var(--wave-deep)" />
				</linearGradient>
			</defs>
			<path d="M0 250 Q50 150 100 200 Q150 250 200 180 Q250 110 300 170 Q350 230 400 160 Q450 90 500 150 Q550 210 600 130 Q650 50 700 110 Q750 170 800 120 L800 400 L0 400Z" fill="url(#heroGrad)" opacity="0.3" />
			<path d="M0 300 Q60 220 120 260 Q180 300 240 230 Q300 160 360 210 Q420 260 480 190 Q540 120 600 180 Q660 240 720 170 Q780 100 800 150 L800 400 L0 400Z" fill="url(#heroGrad)" opacity="0.2" />
			<path d="M0 350 Q80 280 160 310 Q240 340 320 270 Q400 200 480 250 Q560 300 640 220 Q720 140 800 190 L800 400 L0 400Z" fill="url(#heroGrad)" opacity="0.15" />
		</svg>
	</div>

	<div class="content">
		<div class="hero">
			<div class="wave-icon">🌊</div>
			<h1>Kaze</h1>
			<p class="tagline">Track your crypto portfolio with the<br />power of the wind and the wave</p>
			<div class="cta-buttons">
				<a href="/login" class="btn btn--primary">Get Started</a>
				<a href="/login" class="btn btn--ghost">Sign In</a>
			</div>
		</div>

		<div class="features">
			<div class="feature panel">
				<span class="icon">👛</span>
				<h3>Wallet Import</h3>
				<p>Connect MetaMask or paste any Ethereum address to see your holdings instantly.</p>
			</div>
			<div class="feature panel">
				<span class="icon">📊</span>
				<h3>Live Prices</h3>
				<p>Real-time prices from CoinGecko with beautiful charts powered by TradingView.</p>
			</div>
			<div class="feature panel">
				<span class="icon">🌊</span>
				<h3>Japanese Design</h3>
				<p>Ukiyo-e inspired interface with the Great Wave off Kanagawa theme.</p>
			</div>
		</div>
	</div>
</div>

<style>
	.landing { position: relative; min-height: 100vh; overflow: hidden; }
	.wave-bg { position: absolute; inset: 0; z-index: 0; }
	.hero-wave { width: 100%; height: 100%; }
	.content { position: relative; z-index: 1; max-width: 900px; margin: 0 auto; padding: var(--s6) var(--s4); }
	.hero { text-align: center; padding: var(--s6) 0; }
	.wave-icon { font-size: 4rem; margin-bottom: var(--s3); }
	h1 { font-size: 3rem; color: var(--wave-deep); margin-bottom: var(--s2); }
	.tagline { font-size: 1.1rem; color: var(--wave-mid); margin-bottom: var(--s5); line-height: 1.6; }
	.cta-buttons { display: flex; gap: var(--s3); justify-content: center; }
	.features { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--s4); margin-top: var(--s6); }
	.feature { padding: var(--s5); text-align: center; }
	.feature .icon { font-size: 2.5rem; display: block; margin-bottom: var(--s3); }
	.feature h3 { font-size: 1.1rem; margin-bottom: var(--s2); }
	.feature p { font-size: 0.88rem; color: var(--wave-mid); line-height: 1.5; }
</style>
