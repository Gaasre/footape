<script lang="ts">
	import { page } from '$app/stores';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import Pricing from '$lib/components/pricing.svelte';
</script>

<svelte:head>
	<title>Footape - Pricing</title>
	<meta content="Footape - Pricing" property="og:title" />
	<meta content="Footape - Pricing" property="twitter:title" />
</svelte:head>

<div class="flex flex-col h-screen">
	<Header isConnected={!!$page.data.session?.user} />
	<div class="grow w-full bg-base-300 flex items-center justify-center">
		<Pricing />
	</div>
	<Footer />
</div>
