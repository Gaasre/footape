<script lang="ts">
	import { page } from '$app/stores';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
</script>

<svelte:head>
	<title>Footape - Payment Failed </title>
	<meta content="Footape - Payment Failed" property="og:title" />
	<meta content="Footape - Payment Failed" property="twitter:title" />
</svelte:head>

<div class="flex flex-col h-screen">
	<Header isConnected={!!$page.data.session?.user} />
	<div class="grow w-full bg-base-300 flex items-center justify-center">
		<div class="bg-base-100 rounded text-center py-10 px-24">
			<i class="fi fi-br-cross-circle text-6xl text-error" />
			<h1 class="text-3xl font-bold mb-6">Payment Failed</h1>
			<p class="mb-6">Oh no! Something went wrong with your payment</p>
			<a href={$page.data.session?.user ? "/dashboard" : '/'} class="btn btn-primary"
				>{$page.data.session?.user ? 'Go back to Dashboard' : 'Go back home'}</a
			>
		</div>
	</div>
	<Footer />
</div>
