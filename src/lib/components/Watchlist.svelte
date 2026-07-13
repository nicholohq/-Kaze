<script lang="ts">
	import { portfolio } from '$lib/stores/portfolio.svelte.js';

	function remove(id: string) {
		portfolio.removeFromWatchlist(id);
	}
</script>

<div class="watchlist panel">
	<h2 class="section-title" data-kanji="目">Watchlist</h2>
	{#if portfolio.watchlist.length === 0}
		<p class="empty">No watched coins. Add from the market rankings.</p>
	{:else}
		<div class="list">
			{#each portfolio.watchlist as coin (coin.id)}
				<div class="item">
					<div class="item-info">
						<span class="item-name">{coin.coinId}</span>
					</div>
					<button class="btn btn--ghost btn--sm" onclick={() => remove(coin.id)}>✕</button>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.watchlist { padding: var(--s4); }
	h2 { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; color: var(--wave-mid); margin-bottom: var(--s3); }
	h2::before { font-size: 0.7rem; letter-spacing: 4px; }
	.empty { color: var(--wave-mid); text-align: center; padding: var(--s5) 0; font-size: 0.9rem; }
	.list { display: flex; flex-direction: column; gap: var(--s2); }
	.item { display: flex; align-items: center; justify-content: space-between; padding: var(--s2); border-bottom: 1px solid var(--linen-2); }
	.item:last-child { border-bottom: none; }
	.item-info { display: flex; align-items: center; gap: var(--s2); }
	.item-name { font-weight: 600; font-size: 0.88rem; text-transform: capitalize; }
</style>
