<script lang="ts">
	import { auth } from '$lib/stores/auth.svelte.js';
	import { goto } from '$app/navigation';
	import Nav from '$lib/components/Nav.svelte';
	import GreatWaveArt from '$lib/components/GreatWaveArt.svelte';

	let mode = $state<'login' | 'signup'>('login');
	let username = $state('');
	let password = $state('');
	let error = $state('');

	async function handleSubmit(e: Event) {
		e.preventDefault();
		error = '';
		try {
			if (mode === 'login') {
				await auth.login(username, password);
			} else {
				await auth.signup(username, password);
			}
			goto('/dashboard');
		} catch (err: any) {
			error = err.message;
		}
	}

	function toggleMode() {
		mode = mode === 'login' ? 'signup' : 'login';
		error = '';
	}
</script>

<svelte:head>
	<title>Kaze — Sign In</title>
</svelte:head>

<Nav />
<GreatWaveArt />

<div class="page">
	<div class="card panel">
		<div class="wave-icon">
			<svg viewBox="0 0 32 32" width="40" height="40" fill="var(--wave-deep)" aria-hidden="true">
				<path d="M2 24 C8 14, 14 10, 22 12 C18 16, 14 20, 10 24 C8 26, 4 26, 2 24 Z" />
				<path d="M12 18 C16 14, 20 14, 22 16 C20 18, 16 20, 12 18 Z" fill="var(--linen)" opacity="0.3" />
			</svg>
		</div>
		<h1>{mode === 'login' ? 'Sign In' : 'Create Account'}</h1>

		<form onsubmit={handleSubmit}>
			<div class="field">
				<label for="username">Username</label>
				<input id="username" class="input" bind:value={username} required minlength={3} />
			</div>
			<div class="field">
				<label for="password">Password</label>
				<input id="password" type="password" class="input" bind:value={password} required minlength={6} />
			</div>
			{#if error}
				<p class="error">{error}</p>
			{/if}
			<button type="submit" class="btn btn--primary" style="width:100%;justify-content:center;">
				{mode === 'login' ? 'Sign In' : 'Create Account'}
			</button>
		</form>

		<p class="toggle">
			{mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
			<button class="btn btn--ghost btn--sm" onclick={toggleMode}>
				{mode === 'login' ? 'Sign Up' : 'Sign In'}
			</button>
		</p>
	</div>
</div>

<style>
	.page { display: flex; align-items: center; justify-content: center; min-height: calc(100vh - 220px - 48px); padding: var(--s4); }
	.card { width: 100%; max-width: 400px; padding: var(--s5); text-align: center; }
	.wave-icon { margin-bottom: var(--s3); display: flex; justify-content: center; }
	h1 { font-size: 1.5rem; margin-bottom: var(--s5); }
	form { display: flex; flex-direction: column; gap: var(--s3); text-align: left; }
	.field { display: flex; flex-direction: column; gap: var(--s1); }
	.field label { font-size: 0.8rem; font-weight: 700; letter-spacing: 0.5px; color: var(--wave-mid); }
	.error { color: var(--crimson); font-size: 0.85rem; text-align: center; }
	.toggle { margin-top: var(--s4); font-size: 0.85rem; }
</style>
