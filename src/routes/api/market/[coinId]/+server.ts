import { json } from '@sveltejs/kit';
import { fetchCoinDetail, fetchPriceHistory } from '$lib/server/coingecko.js';

export async function GET({ params, url }: { params: { coinId: string }; url: URL }) {
	const days = Number(url.searchParams.get('days')) || 7;
	try {
		const [detail, history] = await Promise.all([
			fetchCoinDetail(params.coinId),
			fetchPriceHistory(params.coinId, days)
		]);
		return json({ detail, history });
	} catch (err: any) {
		return json({ error: err.message }, { status: 502 });
	}
}
