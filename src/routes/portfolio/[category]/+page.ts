import { error } from '@sveltejs/kit';
import { categories, portfolioItems, type PortfolioCategory } from '$lib/data/portfolio';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const category = params.category as PortfolioCategory;
	const allowed = categories.filter((c) => c.id !== 'all').map((c) => c.id);
	if (!allowed.includes(category)) {
		throw error(404, 'Portfolio category not found');
	}

	const items = portfolioItems.filter((item) => item.category === category);
	const categoryMeta = categories.find((c) => c.id === category);

	return {
		category,
		items,
		categoryName: categoryMeta?.name ?? category
	};
};
