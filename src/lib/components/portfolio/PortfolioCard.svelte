<script lang="ts">
	import Calendar from 'lucide-svelte/icons/calendar';
	import TagIcon from 'lucide-svelte/icons/tag';
	import ExternalLink from 'lucide-svelte/icons/external-link';
	import type { PortfolioCategory } from '$lib/data/portfolio';

	interface PortfolioItem {
		id: number;
		title: string;
		category: PortfolioCategory;
		client: string;
		description: string;
		image: string;
		tags: string[];
		date: string;
		results?: string;
	}

	let { item }: { item: PortfolioItem } = $props();

	const categoryLink = `/portfolio/${item.category}`;
	const formattedDate = $derived(() => new Date(item.date).toLocaleDateString());
</script>

<div class="portfolio-card" tabindex="0" role="group" aria-labelledby={`portfolio-card-${item.id}-title`}>
	<div class="portfolio-card__front">
		<img src={item.image} alt={item.title} loading="lazy" decoding="async" />
		<div class="portfolio-card__overlay"></div>
		<div class="portfolio-card__badges">
			<span class="portfolio-card__badge portfolio-card__badge--category">{item.category}</span>
			{#if item.results}
				<span class="portfolio-card__badge portfolio-card__badge--result">{item.results}</span>
			{/if}
		</div>
	</div>

	<div class="card__content">
		<div class="card__meta">
			<span class="card__meta-item">
				<Calendar size={16} />
				{formattedDate}
			</span>
			<span class="card__meta-item card__meta-client">{item.client}</span>
		</div>

		<h3 id={`portfolio-card-${item.id}-title`} class="card__title">{item.title}</h3>

		<p class="card__description">{item.description}</p>

		{#if item.tags?.length}
			<div class="card__tags">
				{#each item.tags as tag}
					<span class="card__tag">
						<TagIcon size={12} />
						{tag}
					</span>
				{/each}
			</div>
		{/if}

		<a class="card__link" href={categoryLink} aria-label={`View more ${item.category} work`}>
			<ExternalLink size={14} />
			<span>View more {item.category}</span>
		</a>
	</div>
</div>

<style>
	.portfolio-card {
		position: relative;
		width: 100%;
		min-height: 340px;
		background-color: #f2f2f2;
		border-radius: 16px;
		overflow: hidden;
		perspective: 1000px;
		box-shadow: 0 0 0 1px rgba(17, 24, 39, 0.05);
		transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275),
			box-shadow 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		display: flex;
		flex-direction: column;
	}

	.portfolio-card:focus-visible {
		outline: 2px solid var(--color-primary, #ff8a33);
		outline-offset: 4px;
	}

	.portfolio-card:hover {
		transform: scale(1.02) translateY(-6px);
		box-shadow: 0 18px 32px rgba(0, 0, 0, 0.25);
	}

	.portfolio-card__front {
		position: relative;
		flex: 1 1 auto;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		padding: 1.5rem;
		background-color: #111;
		transform-origin: bottom;
		transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}

	.portfolio-card__front img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.6s ease;
	}

	.portfolio-card:hover .portfolio-card__front img {
		transform: scale(1.05);
	}

	.portfolio-card__overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(0deg, rgba(0, 0, 0, 0.75) 10%, rgba(0, 0, 0, 0.1) 70%);
		transition: opacity 0.3s ease;
	}

	.portfolio-card__badges {
		position: relative;
		z-index: 2;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 100%;
	}

	.portfolio-card__badge {
		align-self: flex-start;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.35rem 0.75rem;
		border-radius: 9999px;
		font-size: 0.725rem;
		font-weight: 600;
		text-transform: capitalize;
		background-color: rgba(17, 24, 39, 0.85);
		color: #f9fafb;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.portfolio-card__badge--category {
		background-color: rgba(255, 138, 51, 0.9);
		color: #111827;
		border-color: rgba(255, 138, 51, 0.9);
	}

	.portfolio-card__badge--result {
		background-color: rgba(17, 24, 39, 0.85);
		color: #f9fafb;
	}

	.card__content {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 1.75rem;
		box-sizing: border-box;
		background-color: #f2f2f2;
		transform: rotateX(-90deg);
		transform-origin: bottom;
		transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}

	.portfolio-card:hover .portfolio-card__front {
		transform: rotateX(90deg);
	}

	.portfolio-card:hover .card__content {
		transform: rotateX(0deg);
	}

	.card__meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		font-size: 0.8rem;
		color: #6b7280;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.card__meta-item {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
	}

	.card__meta-client {
		color: #111827;
		font-weight: 600;
	}

	.card__title {
		margin: 0.75rem 0 0.5rem;
		font-size: 1.4rem;
		font-weight: 700;
		color: #111827;
		line-height: 1.2;
	}

	.card__description {
		margin: 0;
		color: #4b5563;
		font-size: 0.95rem;
		line-height: 1.6;
	}

	.card__tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 1.5rem;
	}

	.card__tag {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.35rem 0.75rem;
		border-radius: 9999px;
		background-color: #e5e7eb;
		color: #374151;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.card__link {
		margin-top: auto;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: #111827;
		font-weight: 600;
		text-decoration: none;
		transition: transform 0.3s ease, color 0.3s ease;
	}

	.card__link:hover {
		transform: translateX(4px);
		color: var(--color-primary, #ff8a33);
	}

	@media (max-width: 768px) {
		.portfolio-card {
			min-height: 320px;
		}
	}
</style>
