import { json } from '@sveltejs/kit';
import { getDb } from '$lib/server/db.js';
import { makeId } from '$lib/server/id.js';

export async function GET({ locals }: { locals: any }) {
	if (!locals.user) return json({ error: 'Not authenticated.' }, { status: 401 });
	const db = getDb();
	const result = await db.execute({
		sql: 'SELECT * FROM watchlists WHERE user_id = ? ORDER BY created_at DESC',
		args: [locals.user.userId]
	});
	return json(result.rows.map((row: any) => ({
		id: row.id, coinId: row.coin_id, createdAt: row.created_at
	})));
}

export async function POST({ locals, request }: { locals: any; request: Request }) {
	if (!locals.user) return json({ error: 'Not authenticated.' }, { status: 401 });
	const db = getDb();
	const { coinId } = await request.json();

	if (!coinId) return json({ error: 'coinId is required.' }, { status: 400 });

	const existing = await db.execute({
		sql: 'SELECT id FROM watchlists WHERE user_id = ? AND coin_id = ?',
		args: [locals.user.userId, coinId]
	});
	if (existing.rows.length > 0) {
		return json({ error: 'Already in watchlist.' }, { status: 409 });
	}

	const id = makeId();
	const now = Date.now();
	await db.execute({
		sql: 'INSERT INTO watchlists (id, user_id, coin_id, created_at) VALUES (?, ?, ?, ?)',
		args: [id, locals.user.userId, coinId, now]
	});

	return json({ id, coinId, createdAt: now }, { status: 201 });
}
