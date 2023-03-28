<script lang="ts">
	import { page } from '$app/stores';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
</script>

<svelte:head>
	<title>Footape - Permission Error</title>
	<meta content="Footape - Permission Error" property="og:title" />
	<meta content="Footape - Permission Error" property="twitter:title" />
</svelte:head>

<div class="flex flex-col h-screen">
	<Header isConnected={!!$page.data.session?.user} />
	<div class="grow w-full bg-base-300 flex items-center justify-center">
		<div class="bg-base-100 rounded text-center py-10 px-24">
			<i class="fi fi-br-cross-circle text-6xl text-error" />
			<h1 class="text-3xl font-bold mb-6">Oops, Wrong Turn...</h1>
			<p class="mb-6 max-w-sm">Looks like you've wandered off the beaten path. Our team is working to get you back on track and find what you're looking for.</p>
			<a href="/" class="btn btn-primary">Back to home</a>
		</div>
	</div>
	<Footer />
</div>
