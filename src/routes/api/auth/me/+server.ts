import { json } from '@sveltejs/kit';
import { getDb } from '$lib/server/db.js';

export async function GET({ locals }: { locals: any }) {
	if (!locals.user) {
		return json(null, { status: 401 });
	}

	const db = getDb();
	const result = await db.execute({
		sql: 'SELECT id, username, wallet_address FROM users WHERE id = ?',
		args: [locals.user.userId]
	});

	if (result.rows.length === 0) {
		return json(null, { status: 401 });
	}

	const user = result.rows[0] as any;
	return json({ id: user.id, username: user.username, walletAddress: user.wallet_address || null });
}
