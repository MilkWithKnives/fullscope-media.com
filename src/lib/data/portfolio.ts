import type { ComponentType } from 'svelte';
import Camera from 'lucide-svelte/icons/camera';
import Layers3 from 'lucide-svelte/icons/layers-3';
import House from 'lucide-svelte/icons/house';
import Building from 'lucide-svelte/icons/building-2';
import Drone from 'lucide-svelte/icons/drone';
import Image from 'lucide-svelte/icons/image';
import Ruler from 'lucide-svelte/icons/ruler';
import User from 'lucide-svelte/icons/user';

export type PortfolioCategory =
	| '3d-tours'
	| 'interior'
	| 'exterior'
	| 'drone'
	| 'virtual-staging'
	| 'floorplans'
	| 'portraits';

export const categories: { id: 'all' | PortfolioCategory; name: string; icon: ComponentType }[] = [
	{ id: 'all', name: 'All Work', icon: Layers3 },
	{ id: '3d-tours', name: '3D Tours', icon: Layers3 },
	{ id: 'interior', name: 'Interior Photography', icon: House },
	{ id: 'exterior', name: 'Exterior Photography', icon: Building },
	{ id: 'drone', name: 'Drone & Aerial', icon: Drone },
	{ id: 'virtual-staging', name: 'Virtual Staging', icon: Image },
	{ id: 'floorplans', name: 'Floorplans (Cubicasa)', icon: Ruler },
	{ id: 'portraits', name: 'Portraits & Headshots', icon: User }
];

export const portfolioItems = [
	{
		id: 1,
		title: 'Downtown Loft 3D Tour',
		category: '3d-tours' as PortfolioCategory,
		description: 'Matterport walkthrough highlighting natural light, flow, and key amenities.',
		image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
		tags: ['Matterport', 'Zillow 3D Home', 'Walkthrough'],
		date: '2024-02-12',
		client: 'Loft Collective',
		results: 'Average view time +48%'
	},
	{
		id: 2,
		title: 'Warm Interior Set',
		category: 'interior' as PortfolioCategory,
		description: 'Clean, true-to-color interiors with verticals straight and windows balanced.',
		image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
		tags: ['Interior', 'Verticals', 'Natural Light'],
		date: '2024-03-05',
		client: 'Main Street Realty',
		results: 'Listing under contract in 5 days'
	},
	{
		id: 3,
		title: 'Curb Appeal Exterior',
		category: 'exterior' as PortfolioCategory,
		description: 'Twilight exterior with sky replacement and lawn touch-ups for MLS.',
		image: 'https://images.unsplash.com/photo-1505693415763-3ed5e04ba4cd?auto=format&fit=crop&w=1200&q=80',
		tags: ['Twilight', 'Sky Replacement', 'MLS Safe'],
		date: '2024-01-18',
		client: 'Pine Ridge Homes',
		results: 'Showings up 30% week one'
	},
	{
		id: 4,
		title: 'Golf Course Drone Pass',
		category: 'drone' as PortfolioCategory,
		description: 'FAA-compliant aerials capturing lot lines, amenities, and hero shots.',
		image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb512?auto=format&fit=crop&w=1200&q=80',
		tags: ['Drone', 'FAA', 'Lot Coverage'],
		date: '2024-04-02',
		client: 'Fairway Estates',
		results: 'Used across social + print'
	},
	{
		id: 5,
		title: 'Virtual Staging Set',
		category: 'virtual-staging' as PortfolioCategory,
		description: 'Minimal staging for a studio—light furniture and art to guide scale.',
		image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb510?auto=format&fit=crop&w=1200&q=80',
		tags: ['Virtual Staging', 'Style Guides', 'Fast Turn'],
		date: '2024-03-22',
		client: 'Studio Collective',
		results: 'Bounce rate down 22%'
	},
	{
		id: 6,
		title: 'Cubicasa Floorplan Pack',
		category: 'floorplans' as PortfolioCategory,
		description: 'Cubicasa scan with branded floorplans and room dimensions.',
		image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb513?auto=format&fit=crop&w=1200&q=80',
		tags: ['Cubicasa', 'Dimensions', 'Branded'],
		date: '2024-02-28',
		client: 'Eastside Realty',
		results: 'Attachment download rate +60%'
	},
	{
		id: 7,
		title: 'Portraits for Leadership Team',
		category: 'portraits' as PortfolioCategory,
		description: 'Clean studio headshots plus environmental portraits for LinkedIn and press.',
		image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
		tags: ['Headshots', 'LinkedIn', 'Studio'],
		date: '2024-04-12',
		client: 'Northwood Partners',
		results: 'Brand kit refreshed in 48 hours'
	}
];
