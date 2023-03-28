<script lang="ts">
	import { page } from '$app/stores';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
</script>

<svelte:head>
	<title>Footape - Permission Error </title>
	<meta content="Footape - Permission Error" property="og:title" />
	<meta content="Footape - Permission Error" property="twitter:title" />
</svelte:head>

<div class="flex flex-col h-screen">
	<Header isConnected={!!$page.data.session?.user} />
	<div class="grow w-full bg-base-300 flex items-center justify-center">
		<div class="bg-base-100 rounded text-center py-10 px-24">
			<i class="fi fi-br-shield-exclamation text-6xl text-warning" />
			<h1 class="text-3xl font-bold mb-6">No Permission</h1>
			<p class="mb-6">Sorry, but you don't have permission to access this page</p>
			<a href="/" class="btn btn-primary">Go back home</a>
		</div>
	</div>
	<Footer />
</div>
