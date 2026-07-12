import { json } from '@sveltejs/kit';
import { getDb } from '$lib/server/db.js';

export async function PATCH({ locals, params, request }: { locals: any; params: { id: string }; request: Request }) {
	if (!locals.user) return json({ error: 'Not authenticated.' }, { status: 401 });
	const db = getDb();
	const input = await request.json();

	const updates: string[] = [];
	const args: any[] = [];

	if (input.amount != null) { updates.push('amount = ?'); args.push(input.amount); }
	if (input.purchasePrice !== undefined) { updates.push('purchase_price = ?'); args.push(input.purchasePrice); }
	if (input.coinId) { updates.push('coin_id = ?'); args.push(input.coinId); }

	if (updates.length === 0) return json({ error: 'No fields to update.' }, { status: 400 });

	args.push(params.id, locals.user.userId);
	await db.execute({
		sql: `UPDATE holdings SET ${updates.join(', ')} WHERE id = ? AND user_id = ?`,
		args
	});

	return json({ ok: true });
}

export async function DELETE({ locals, params }: { locals: any; params: { id: string } }) {
	if (!locals.user) return json({ error: 'Not authenticated.' }, { status: 401 });
	const db = getDb();
	await db.execute({
		sql: 'DELETE FROM holdings WHERE id = ? AND user_id = ?',
		args: [params.id, locals.user.userId]
	});
	return json({ ok: true });
}
