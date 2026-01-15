import type { ComponentType } from 'svelte';
import Camera from 'lucide-svelte/icons/camera';
import Layers3 from 'lucide-svelte/icons/layers-3';
import House from 'lucide-svelte/icons/house';
import Building from 'lucide-svelte/icons/building-2';
import Drone from 'lucide-svelte/icons/drone';
import Image from 'lucide-svelte/icons/image';
import Ruler from 'lucide-svelte/icons/ruler';
import User from 'lucide-svelte/icons/user';
import portfolioData from './portfolio-data.json';

export type PortfolioItem = {
	id: number;
	title: string;
	category: PortfolioCategory;
	description: string;
	image?: string;
	video?: string;
	tags?: string[];
	date?: string;
	client?: string;
	results?: string;
};

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

export const portfolioItems = portfolioData as PortfolioItem[];
