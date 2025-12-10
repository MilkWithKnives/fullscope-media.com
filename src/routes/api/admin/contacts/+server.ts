import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/supabase';

export const GET: RequestHandler = async () => {
	try {
		const { data: contacts, error } = await supabase
			.from('contact_submissions')
			.select('*')
			.order('created_at', { ascending: false });

		if (error) {
			console.error('Database error:', error);
			return json({ error: 'Failed to fetch contact submissions' }, { status: 500 });
		}

		return json({ contacts });

	} catch (error) {
		console.error('Admin contacts API error:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};
