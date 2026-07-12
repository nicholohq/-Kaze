import { json } from '@sveltejs/kit';
import { getDb } from '$lib/server/db.js';

export async function DELETE({ locals, params }: { locals: any; params: { id: string } }) {
	if (!locals.user) return json({ error: 'Not authenticated.' }, { status: 401 });
	const db = getDb();
	await db.execute({
		sql: 'DELETE FROM watchlists WHERE id = ? AND user_id = ?',
		args: [params.id, locals.user.userId]
	});
	return json({ ok: true });
}
