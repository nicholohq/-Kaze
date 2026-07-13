<script lang="ts">
	import { auth } from '$lib/stores/auth.svelte.js';
	import { goto } from '$app/navigation';
	import SeigaihaPattern from './SeigaihaPattern.svelte';

	function handleLogout() {
		auth.logout();
		goto('/login');
	}
</script>

<nav>
	<div class="nav-pattern" aria-hidden="true"><SeigaihaPattern /></div>
	<div class="nav-inner">
		<a href="/dashboard" class="brand">
			<svg viewBox="0 0 24 24" width="20" height="20" fill="var(--wave-foam)" aria-hidden="true">
				<path d="M2 18 C8 12, 12 10, 18 12 C14 14, 10 16, 8 18 C6 20, 4 20, 2 18 Z" />
			</svg>
			Kaze
		</a>
		<div class="nav-right">
			<a href="/settings" class="btn btn--ghost btn--sm nav-hide">Settings</a>
			{#if auth.user}
				<span class="username nav-hide">{auth.user.username}</span>
				<button class="btn btn--ghost btn--sm nav-hide" onclick={handleLogout}>Logout</button>
			{:else}
				<a href="/login" class="btn btn--sm">Sign In</a>
			{/if}
		</div>
	</div>
</nav>

<style>
	nav { position: relative; background: var(--wave-deep); color: var(--wave-foam); padding: var(--s2) var(--s4); border-bottom: 4px solid var(--vermilion); overflow: hidden; }
	.nav-pattern { position: absolute; inset: 0; z-index: 0; color: var(--wave-foam); opacity: .08; }
	.nav-pattern :global(svg) { width: 100%; height: 100%; }
	.nav-inner { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
	.brand { font-family: var(--serif); font-size: 1.2rem; color: var(--wave-foam); text-decoration: none; display: flex; align-items: center; gap: var(--s2); transition: color .3s; position: relative; }
	.brand::after {
		content: ''; position: absolute; bottom: -2px; left: 50%; width: 0; height: 2px;
		background: var(--gold); transition: width .3s, left .3s;
	}
	.brand:hover { color: var(--gold); }
	.brand:hover::after { width: 70%; left: 15%; }
	.nav-right { display: flex; align-items: center; gap: var(--s3); }
	.nav-hide { opacity: 0; pointer-events: none; transition: opacity .3s ease; }
	nav:hover .nav-hide { opacity: 1; pointer-events: auto; }
	.username { font-size: 0.85rem; opacity: 0.8; }
</style>
