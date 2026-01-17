import type { ComponentType } from 'svelte';
import Layers3 from 'lucide-svelte/icons/layers-3';
import House from 'lucide-svelte/icons/house';
import Building from 'lucide-svelte/icons/building-2';
import Drone from 'lucide-svelte/icons/drone';
import User from 'lucide-svelte/icons/user';
import Sparkles from 'lucide-svelte/icons/sparkles';
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
	| 'interior'
	| 'exterior'
	| '3d-tours'
	| 'drone'
	| 'portraits'
	| 'side-projects';

export const categories: { id: 'all' | PortfolioCategory; name: string; icon: ComponentType }[] = [
	{ id: 'all', name: 'All Work', icon: Layers3 },
	{ id: 'interior', name: 'Interior', icon: House },
	{ id: 'exterior', name: 'Exterior', icon: Building },
	{ id: '3d-tours', name: '3D Tours', icon: Layers3 },
	{ id: 'drone', name: 'Drone', icon: Drone },
	{ id: 'portraits', name: 'Portraits', icon: User },
	{ id: 'side-projects', name: 'Side Projects', icon: Sparkles }
];

export const portfolioItems = portfolioData as PortfolioItem[];
