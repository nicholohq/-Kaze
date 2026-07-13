<script lang="ts">
	import { portfolio } from '$lib/stores/portfolio.svelte.js';

	let showAddForm = $state(false);
	let newCoinId = $state('');
	let newAmount = $state(0);
	let newPrice = $state(0);
	let addError = $state('');

	function getPrice(coinId: string) {
		return portfolio.prices[coinId]?.usd || 0;
	}

	function getChange(coinId: string) {
		return portfolio.prices[coinId]?.usd_24h_change;
	}

	async function addHolding() {
		addError = '';
		try {
			await portfolio.addHolding({ coinId: newCoinId, amount: Number(newAmount), purchasePrice: Number(newPrice) || undefined });
			showAddForm = false;
			newCoinId = '';
			newAmount = 0;
			newPrice = 0;
		} catch (err: any) {
			addError = err.message;
		}
	}

	async function confirmRemove(id: string) {
		if (confirm('Remove this holding?')) {
			await portfolio.removeHolding(id);
		}
	}
</script>

<div class="holdings panel">
	<div class="header">
		<h2 class="section-title" data-kanji="波">Holdings</h2>
		<button class="btn btn--sm btn--primary" onclick={() => showAddForm = !showAddForm}>
			{showAddForm ? 'Cancel' : '+ Add'}
		</button>
	</div>

	{#if showAddForm}
		<form onsubmit={addHolding} class="add-form">
			<input class="input" placeholder="Coin ID (e.g., bitcoin)" bind:value={newCoinId} required />
			<input class="input" type="number" step="any" placeholder="Amount" bind:value={newAmount} required />
			<input class="input" type="number" step="any" placeholder="Purchase price (USD)" bind:value={newPrice} />
			<button type="submit" class="btn btn--primary btn--sm">Save</button>
			{#if addError}<p class="error">{addError}</p>{/if}
		</form>
	{/if}

	{#if portfolio.holdings.length === 0}
		<p class="empty">No holdings yet. Add coins or import a wallet.</p>
	{:else}
		<div class="table-wrap">
			<table class="desktop-table">
				<thead>
					<tr>
						<th>Coin</th>
						<th>Amount</th>
						<th>Price</th>
						<th>24h</th>
						<th>Value</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{#each portfolio.holdings as h (h.id)}
						<tr>
							<td class="coin-name">{h.coinId}</td>
							<td>{h.amount}</td>
							<td>${getPrice(h.coinId).toFixed(2)}</td>
							<td class={getChange(h.coinId) != null ? (getChange(h.coinId) >= 0 ? 'positive' : 'negative') : ''}>
								{getChange(h.coinId)?.toFixed(2) ?? '--'}%
							</td>
							<td class="value-cell">${(h.amount * getPrice(h.coinId)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
							<td>
								<button class="btn-icon" aria-label="Remove holding" onclick={() => confirmRemove(h.id)}>
									<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
										<line x1="4" y1="4" x2="12" y2="12" />
										<line x1="12" y1="4" x2="4" y2="12" />
									</svg>
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<div class="mobile-cards">
			{#each portfolio.holdings as h (h.id)}
				{@const change = getChange(h.coinId)}
				{@const value = h.amount * getPrice(h.coinId)}
				<div class="holding-card">
					<div class="card-top">
						<span class="card-coin">{h.coinId}</span>
						<button class="btn-icon" aria-label="Remove holding" onclick={() => confirmRemove(h.id)}>
							<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
								<line x1="4" y1="4" x2="12" y2="12" />
								<line x1="12" y1="4" x2="4" y2="12" />
							</svg>
						</button>
					</div>
					<div class="card-grid">
						<div class="card-label">Amount</div>
						<div class="card-val">{h.amount}</div>
						<div class="card-label">Price</div>
						<div class="card-val">${getPrice(h.coinId).toFixed(2)}</div>
						<div class="card-label">24h</div>
						<div class="card-val {change != null ? (change >= 0 ? 'positive' : 'negative') : ''}">
							{change?.toFixed(2) ?? '--'}%
						</div>
						<div class="card-label">Value</div>
						<div class="card-val value-cell">${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.holdings { padding: var(--s5); }
	.header { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--s3); }
	h2 { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; color: var(--wave-mid); }
	h2::before { font-size: 0.7rem; letter-spacing: 4px; }
	.add-form { display: flex; gap: var(--s2); flex-wrap: wrap; margin-bottom: var(--s3); padding: var(--s3); background: var(--linen); border-radius: var(--radius); }
	.add-form .input { flex: 1; min-width: 120px; }
	.error { color: var(--crimson); font-size: 0.82rem; width: 100%; }
	.empty { color: var(--wave-mid); text-align: center; padding: var(--s5) 0; font-size: 0.9rem; }
	.table-wrap { overflow-x: auto; }

	.desktop-table { width: 100%; border-collapse: collapse; font-size: 0.88rem; }
	.desktop-table th { text-align: left; padding: var(--s1) var(--s2); border-bottom: var(--border-thin); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px; color: var(--wave-mid); }
	.desktop-table td { padding: var(--s2); border-bottom: 1px solid var(--linen-2); }
	.desktop-table tbody tr { transition: background .15s ease; }
	.desktop-table tbody tr:hover { background: var(--linen); }
	.coin-name { font-weight: 700; }
	.positive { color: var(--matcha); }
	.negative { color: var(--crimson); }
	.value-cell { font-family: var(--serif); font-weight: 700; }

	.btn-icon {
		display: inline-flex; align-items: center; justify-content: center;
		width: 32px; height: 32px; border: none; background: transparent;
		cursor: pointer; border-radius: 4px; color: var(--wave-mid);
		transition: color .15s ease, background .15s ease;
	}
	.btn-icon:hover { color: var(--crimson); background: rgba(220,53,69,0.08); }

	.mobile-cards { display: none; flex-direction: column; gap: var(--s3); }
	.holding-card { padding: var(--s3); background: var(--linen); border-radius: var(--radius); border: 2px solid var(--linen-2); }
	.card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--s2); }
	.card-coin { font-weight: 700; font-size: 0.95rem; }
	.card-grid { display: grid; grid-template-columns: auto 1fr; gap: var(--s1) var(--s3); font-size: 0.85rem; }
	.card-label { color: var(--wave-mid); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px; }
	.card-val { font-weight: 600; text-align: right; }

	@media (max-width: 640px) {
		.table-wrap { display: none; }
		.mobile-cards { display: flex; }
	}
</style>
