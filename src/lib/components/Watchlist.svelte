<script lang="ts">
	import { portfolio } from '$lib/stores/portfolio.svelte.js';

	function remove(id: string) {
		portfolio.removeFromWatchlist(id);
	}

	function marketData(coinId: string) {
		return portfolio.marketCoins.find(c => c.id === coinId);
	}
</script>

<div class="watchlist panel">
	<h2 class="section-title" data-kanji="目">Watchlist</h2>
	{#if portfolio.watchlist.length === 0}
		<p class="empty">No watched coins. Add from the market rankings.</p>
	{:else}
		<div class="list">
			{#each portfolio.watchlist as coin (coin.id)}
				{@const data = marketData(coin.coinId)}
				<div class="item">
					<div class="item-info">
						{#if data?.image}
							<img src={data.image} alt="" width="20" height="20" class="coin-icon" />
						{/if}
						<span class="item-name">{data?.name || coin.coinId}</span>
						<span class="item-symbol">{data?.symbol?.toUpperCase() || ''}</span>
					</div>
					<div class="item-right">
						<span class="item-price">${data?.current_price?.toLocaleString() ?? '--'}</span>
						<span class="item-change" class:positive={data?.price_change_percentage_24h >= 0} class:negative={data?.price_change_percentage_24h < 0}>
							{data?.price_change_percentage_24h != null ? `${data.price_change_percentage_24h >= 0 ? '+' : ''}${data.price_change_percentage_24h.toFixed(2)}%` : '--'}
						</span>
					</div>
					<button class="btn-icon" aria-label="Remove from watchlist" onclick={() => remove(coin.id)}>
						<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
							<line x1="4" y1="4" x2="12" y2="12" />
							<line x1="12" y1="4" x2="4" y2="12" />
						</svg>
					</button>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.watchlist { padding: var(--s5); }
	h2 { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; color: var(--wave-mid); margin-bottom: var(--s3); }
	h2::before { font-size: 0.7rem; letter-spacing: 4px; }
	.empty { color: var(--wave-mid); text-align: center; padding: var(--s5) 0; font-size: 0.9rem; }
	.list { display: flex; flex-direction: column; gap: var(--s2); }
	.item { display: flex; align-items: center; justify-content: space-between; padding: var(--s2); border-bottom: 1px solid var(--linen-2); gap: var(--s2); }
	.item:last-child { border-bottom: none; }
	.item-info { display: flex; align-items: center; gap: var(--s2); min-width: 0; }
	.coin-icon { border-radius: 50%; flex-shrink: 0; }
	.item-name { font-weight: 600; font-size: 0.85rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
	.item-symbol { font-size: 0.72rem; color: var(--wave-mid); }
	.item-right { display: flex; flex-direction: column; align-items: flex-end; gap: 1px; flex-shrink: 0; }
	.item-price { font-size: 0.85rem; font-weight: 700; font-family: var(--serif); }
	.item-change { font-size: 0.72rem; font-weight: 600; }
	.positive { color: var(--matcha); }
	.negative { color: var(--crimson); }
	.btn-icon {
		display: inline-flex; align-items: center; justify-content: center;
		width: 32px; height: 32px; border: none; background: transparent;
		cursor: pointer; border-radius: 4px; color: var(--wave-mid); flex-shrink: 0;
		transition: color .15s ease, background .15s ease;
	}
	.btn-icon:hover { color: var(--crimson); background: rgba(220,53,69,0.08); }
</style>
