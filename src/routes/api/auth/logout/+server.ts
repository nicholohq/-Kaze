import { json } from '@sveltejs/kit';

export function POST({ cookies }: { cookies: any }) {
	cookies.delete('session', { path: '/' });
	return json({ ok: true });
}
