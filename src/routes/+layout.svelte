<script lang="ts">
	import './layout.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import {
		BUSINESS_EMAIL,
		BUSINESS_LOCATION,
		BUSINESS_PHONE,
		BUSINESS_SAME_AS,
		SITE_DESCRIPTION,
		SITE_KEYWORDS,
		SITE_NAME,
		SITE_TAGLINE,
		SITE_TITLE,
		SITE_URL,
		SOCIAL_IMAGE
	} from '$lib/config/site';
	import { PUBLIC_GA_ID } from '$env/static/public';
	import { page } from '$app/state';
	import { dev } from '$app/environment';

	let { children } = $props();

	const keywords = SITE_KEYWORDS.join(', ');
	const canonicalUrl = $derived(
		new URL(`${page.url.pathname}${page.url.search}`, SITE_URL).toString()
	);
	const structuredData = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'Organization',
			name: SITE_NAME,
			description: SITE_DESCRIPTION,
			url: SITE_URL,
			telephone: BUSINESS_PHONE,
			email: BUSINESS_EMAIL,
			address: {
				'@type': 'PostalAddress',
				addressLocality: BUSINESS_LOCATION
			},
			sameAs: BUSINESS_SAME_AS,
			founder: SITE_NAME
		})
	);
</script>

<svelte:head>
	<title>{SITE_TITLE}</title>
	<meta name="description" content={SITE_DESCRIPTION} />
	<meta name="keywords" content={keywords} />
	<meta name="author" content={SITE_NAME} />
	<meta name="theme-color" content="#121212" />
	<link rel="canonical" href={canonicalUrl} />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={SITE_TITLE} />
	<meta property="og:description" content={SITE_DESCRIPTION} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:image" content={SOCIAL_IMAGE} />
	<meta property="og:image:alt" content={SITE_TAGLINE} />
	<meta property="og:locale" content="en_US" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={SITE_TITLE} />
	<meta name="twitter:description" content={SITE_TAGLINE} />
	<meta name="twitter:image" content={SOCIAL_IMAGE} />
	{#if !dev && PUBLIC_GA_ID}
		<script async src={`https://www.googletagmanager.com/gtag/js?id=${PUBLIC_GA_ID}`}></script>
		<script>
			{`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${PUBLIC_GA_ID}');`}
		</script>
	{/if}
	{#if !dev}
		<script type="application/ld+json">{structuredData}</script>
	{/if}
</svelte:head>

<div class="min-h-screen flex flex-col">
	<Header />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>

<style>
	:global(:root) {
		--color-background: #121212;
		--color-text: #e0e0e0;
		--color-primary: #ff8a33;
		--color-primary-strong: #ff6f00;
	}
</style>
