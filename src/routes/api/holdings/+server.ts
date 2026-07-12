import { json } from '@sveltejs/kit';
import { getDb } from '$lib/server/db.js';
import { makeId } from '$lib/server/id.js';

function rowToHolding(row: any) {
	return {
		id: row.id,
		userId: row.user_id,
		coinId: row.coin_id,
		contractAddress: row.contract_address || null,
		amount: row.amount,
		purchasePrice: row.purchase_price,
		purchaseDate: row.purchase_date || null,
		source: row.source,
		createdAt: row.created_at
	};
}

export async function GET({ locals }: { locals: any }) {
	if (!locals.user) return json({ error: 'Not authenticated.' }, { status: 401 });
	const db = getDb();
	const result = await db.execute({
		sql: 'SELECT * FROM holdings WHERE user_id = ? ORDER BY created_at DESC',
		args: [locals.user.userId]
	});
	return json(result.rows.map(rowToHolding));
}

export async function POST({ locals, request }: { locals: any; request: Request }) {
	if (!locals.user) return json({ error: 'Not authenticated.' }, { status: 401 });
	const db = getDb();
	const input = await request.json();

	if (!input.coinId || input.amount == null) {
		return json({ error: 'coinId and amount are required.' }, { status: 400 });
	}

	const id = makeId();
	const now = Date.now();

	await db.execute({
		sql: `INSERT INTO holdings (id, user_id, coin_id, contract_address, amount, purchase_price, purchase_date, source, created_at)
					VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
		args: [
			id, locals.user.userId, input.coinId, input.contractAddress || null,
			input.amount, input.purchasePrice || null, input.purchaseDate || null,
			input.source || 'manual', now
		]
	});

	return json(rowToHolding({
		id, user_id: locals.user.userId, coin_id: input.coinId,
		contract_address: input.contractAddress || null, amount: input.amount,
		purchase_price: input.purchasePrice || null, purchase_date: input.purchaseDate || null,
		source: input.source || 'manual', created_at: now
	}), { status: 201 });
}
