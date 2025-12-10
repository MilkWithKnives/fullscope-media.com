import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/supabase';

export const GET: RequestHandler = async () => {
	try {
		const { data: rentals, error } = await supabase
			.from('studio_rentals')
			.select('*')
			.order('rental_date', { ascending: false });

		if (error) {
			console.error('Database error:', error);
			return json({ error: 'Failed to fetch studio rentals' }, { status: 500 });
		}

		return json({ rentals });

	} catch (error) {
		console.error('Admin studio rentals API error:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};
