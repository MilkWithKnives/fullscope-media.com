import type { ComponentType } from 'svelte';
import Play from 'lucide-svelte/icons/play';
import ExternalLink from 'lucide-svelte/icons/external-link';
import TrendingUp from 'lucide-svelte/icons/trending-up';

export type PortfolioCategory = 'video' | 'photography' | 'marketing';

export const categories: { id: 'all' | PortfolioCategory; name: string; icon: ComponentType }[] = [
	{ id: 'all', name: 'All Work', icon: ExternalLink },
	{ id: 'video', name: 'Video Production', icon: Play },
	{ id: 'photography', name: 'Photography', icon: ExternalLink },
	{ id: 'marketing', name: 'Digital Marketing', icon: TrendingUp }
];

export const portfolioItems = [
	{
		id: 1,
		title: 'Tech Startup Brand Video',
		category: 'video' as PortfolioCategory,
		description:
			'A compelling brand story video that helped a tech startup secure Series A funding and establish market presence.',
		image:
			'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
		tags: ['Brand Video', 'Startup', 'Technology'],
		date: '2024-01-15',
		client: 'TechFlow Solutions',
		results: '300% increase in investor inquiries'
	},
	{
		id: 2,
		title: 'Restaurant Photography Series',
		category: 'photography' as PortfolioCategory,
		description:
			'Mouth-watering food photography that transformed online presence and drove significant order growth.',
		image:
			'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
		tags: ['Food Photography', 'Restaurant', 'Commercial'],
		date: '2024-02-20',
		client: 'Bella Vista Restaurant',
		results: '40% increase in online orders'
	},
	{
		id: 3,
		title: 'Social Media Campaign',
		category: 'marketing' as PortfolioCategory,
		description:
			'Multi-platform digital campaign that achieved exceptional reach and engagement across all demographics.',
		image:
			'https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
		tags: ['Social Media', 'Campaign', 'Digital Marketing'],
		date: '2024-02-05',
		client: 'Fitness Plus',
		results: '2M+ impressions, 15% engagement'
	},
	{
		id: 4,
		title: 'Corporate Event Coverage',
		category: 'video' as PortfolioCategory,
		description:
			'Professional event documentation capturing key moments and presentations for Fortune 500 annual conference.',
		image:
			'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
		tags: ['Event Video', 'Corporate', 'Live Coverage'],
		date: '2024-01-30',
		client: 'Global Industries',
		results: 'Used in 12 international markets'
	},
	{
		id: 5,
		title: 'Product Photography Collection',
		category: 'photography' as PortfolioCategory,
		description:
			'High-end product photography showcasing luxury timepieces with precision lighting and composition.',
		image:
			'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
		tags: ['Product Photography', 'Luxury', 'Catalog'],
		date: '2024-03-25',
		client: 'Timepiece Luxury',
		results: '50+ product shots delivered'
	}
];
