<script lang="ts">
	import { auth } from '$lib/stores/auth.svelte.js';
	import { goto } from '$app/navigation';
	import Nav from '$lib/components/Nav.svelte';

	let mode = $state<'login' | 'signup'>('login');
	let username = $state('');
	let password = $state('');
	let error = $state('');
	let burst = $state(0); // 花火 — retriggers the button firework on each submit

	async function handleSubmit(e: Event) {
		e.preventDefault();
		burst++;
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

<div class="login-page">
	<div class="login-bg"></div>
	<div class="login-overlay"></div>
	<Nav />
	<div class="page">
		<div class="card panel washi">
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
				<div class="submit-wrap">
					{#key burst}
						{#if burst > 0}
							<span class="hanabi" aria-hidden="true">
								{#each Array(10) as _, i (i)}
									<span class="spark" style="--a:{i * 36}deg"></span>
								{/each}
							</span>
						{/if}
					{/key}
					<button type="submit" class="btn btn--primary" style="width:100%;justify-content:center;">
						{mode === 'login' ? 'Sign In' : 'Create Account'}
					</button>
				</div>
			</form>

			<p class="toggle">
				{mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
				<button class="btn btn--ghost btn--sm" onclick={toggleMode}>
					{mode === 'login' ? 'Sign Up' : 'Sign In'}
				</button>
			</p>
		</div>
	</div>
</div>

<style>
	.login-page { position: relative; min-height: 100vh; overflow: hidden; }
	.login-bg {
		position: fixed; inset: 0; z-index: 0;
		background: url('/greatwave.jpg') center center / cover no-repeat;
		filter: contrast(1.12) saturate(1.08);
	}
	.login-overlay {
		position: fixed; inset: 0; z-index: 1;
		background: linear-gradient(135deg, rgba(26,42,58,0.3) 0%, rgba(26,42,58,0.6) 100%);
	}
	:global(.login-page nav) { position: relative; z-index: 2; background: transparent; border-bottom-color: rgba(255,255,255,0.2); }
	:global(.login-page .brand) { color: var(--linen); }
	:global(.login-page .nav-right .btn--ghost) { color: var(--linen); border-color: rgba(255,255,255,0.4); }
	:global(.login-page .nav-right .btn--ghost:hover) { background: rgba(255,255,255,0.1); }
	.page { position: relative; z-index: 2; display: flex; align-items: center; justify-content: center; min-height: calc(100vh - 56px); padding: var(--s4); }
	.card { width: 100%; max-width: 400px; padding: var(--s5); text-align: center; }
	.wave-icon { margin-bottom: var(--s3); display: flex; justify-content: center; }
	h1 { font-size: 1.5rem; margin-bottom: var(--s5); }
	form { display: flex; flex-direction: column; gap: var(--s3); text-align: left; }
	.field { display: flex; flex-direction: column; gap: var(--s1); }
	.field label { font-size: 0.8rem; font-weight: 700; letter-spacing: 0.5px; color: var(--wave-mid); }
	.error { color: var(--crimson); font-size: 0.85rem; text-align: center; }
	.toggle { margin-top: var(--s4); font-size: 0.85rem; }

	/* 花火 — hanabi firework burst over the submit button */
	.submit-wrap { position: relative; }
	.hanabi {
		position: absolute;
		top: 50%; left: 50%;
		width: 0; height: 0;
		pointer-events: none;
		z-index: 3;
	}
	.spark {
		position: absolute;
		top: 0; left: 0;
		width: 5px; height: 5px;
		margin: -2.5px;
		border-radius: 50%;
		background: var(--gold);
		transform: rotate(var(--a)) translateY(0);
		animation: hanabi-fly 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}
	.spark:nth-child(odd) { background: var(--vermilion); }
	.spark:nth-child(3n) { background: var(--wave-foam); }
	@keyframes hanabi-fly {
		0% { transform: rotate(var(--a)) translateY(0); opacity: 1; }
		100% { transform: rotate(var(--a)) translateY(-46px); opacity: 0; }
	}
	@media (prefers-reduced-motion: reduce) {
		.spark { animation: none; display: none; }
	}
</style>
