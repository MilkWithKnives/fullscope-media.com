<script lang="ts">
	const iframeSrc =
		'https://app.acuityscheduling.com/schedule.php?owner=37254063&ref=embedded_csp';
	const embedScriptSrc = 'https://embed.acuityscheduling.com/js/embed.js';

	$effect(() => {
		if (typeof document === 'undefined') return;

		const existing = document.querySelector(`script[src="${embedScriptSrc}"]`);
		if (existing) return;

		const script = document.createElement('script');
		script.src = embedScriptSrc;
		script.type = 'text/javascript';
		script.async = true;
		document.body.appendChild(script);
	});
</script>

<div class="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-lg shadow-black/30">
	<iframe
		src={iframeSrc}
		title="Schedule Appointment"
		class="h-[800px] w-full"
		allow="payment"
		frameborder="0"
		loading="lazy"
	></iframe>
</div>
