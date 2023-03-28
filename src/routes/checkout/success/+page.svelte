<script lang="ts">
	import { page } from '$app/stores';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
</script>

<svelte:head>
	<title>Footape - Payment Successful </title>
	<meta content="Footape - Payment Successful" property="og:title" />
	<meta content="Footape - Payment Successful" property="twitter:title" />
</svelte:head>

<div class="flex flex-col h-screen">
	<Header isConnected={!!$page.data.session?.user} />
	<div class="grow w-full bg-base-300 flex items-center justify-center">
		<div class="bg-base-100 rounded text-center py-10 px-24">
			<i class="fi fi-br-badge-check text-6xl text-success" />
			<h1 class="text-3xl font-bold mb-6">Payment Successful</h1>
			<p class="mb-6">
				Thank you for choosing Footape. <br />{$page.data.fullUser?.firstname &&
				$page.data.fullUser.lastname
					? "Let's get you setup!"
					: ''}
			</p>
			<a
				href={$page.data.fullUser?.firstname && $page.data.fullUser.lastname
					? '/dashboard'
					: '/onboarding'}
				class="btn btn-primary"
				>{$page.data.fullUser?.firstname && $page.data.fullUser.lastname
					? 'Go to dashboard'
					: 'Get started'}</a
			>
		</div>
	</div>
	<Footer />
</div>
