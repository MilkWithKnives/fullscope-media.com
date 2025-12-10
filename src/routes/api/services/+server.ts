import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/supabase';

export const GET: RequestHandler = async () => {
	try {
		const { data: services, error } = await supabase
			.from('services')
			.select('*')
			.eq('active', true)
			.order('category', { ascending: true })
			.order('name', { ascending: true });

		if (error) {
			console.error('Database error:', error);
			return json({ error: 'Failed to fetch services' }, { status: 500 });
		}

		// Group services by category
		const servicesByCategory = services.reduce((acc, service) => {
			if (!acc[service.category]) {
				acc[service.category] = [];
			}
			acc[service.category].push(service);
			return acc;
		}, {} as Record<string, typeof services>);

		return json({
			services,
			servicesByCategory
		});

	} catch (error) {
		console.error('Services API error:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};
