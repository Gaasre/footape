<script lang="ts">
	import Hero from '../lib/components/hero.svelte';
	import Services from '../lib/components/services.svelte';
	import Functionalities from '../lib/components/functionalities.svelte';
	import Footer from '$lib/components/footer.svelte';
	import type { PageData } from './$types';
	import Pricing from '$lib/components/pricing.svelte';
	import Cta from '$lib/components/cta.svelte';

	export let data: PageData
</script>

<svelte:head>
	<title>Footape - Streamline Your Video Production Process</title>
	<meta content="Footape - Streamline Your Video Production Process" property="og:title">
	<meta content="Footape - Streamline Your Video Production Process" property="twitter:title">
</svelte:head>

<Hero isConnected={data.isConnected} />
<Services />
<Functionalities />
<Pricing />
<Cta />
<Footer />
