<script lang="ts">
	import '../app.postcss';
	import { onMount } from 'svelte';
	import supabase from '$lib/supabaseClient';
	import { invalidateAll } from '$app/navigation';

	import { theme } from '$lib/stores';
	import { page } from '$app/stores';

	import Analytics from '$lib/analytics.svelte';

	let currentTheme: string;

	theme.subscribe((value) => (currentTheme = value));

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(async (event) => {
			await invalidateAll();
			if (event == 'SIGNED_IN') {
				if (!$page.data.fullUser?.customerid) {
					await fetch('/api/customer', { method: 'POST' });
				}
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<svelte:head>
	<meta
		name="description"
		content="Create and collaborate on YouTube videos with ease using Footape. Manage your video creation process, resources, progress, and costs all in one place."
	/>
	<meta
		name="og:description"
		content="Create and collaborate on YouTube videos with ease using Footape. Manage your video creation process, resources, progress, and costs all in one place."
	/>
	<meta
		name="twitter:description"
		content="Create and collaborate on YouTube videos with ease using Footape. Manage your video creation process, resources, progress, and costs all in one place."
	/>
	<meta content="https://footape.com/Twitter.png" name="twitter:image" />
	<meta content="https://footape.com/Twitter.png" name="og:image" />
	<meta name="twitter:creator" content="@AmineBarchid" />
	<meta name="og:type" content="website" />
	<meta content="summary_large_image" name="twitter:card" />
	<meta content="width=device-width, initial-scale=1" name="viewport" />
</svelte:head>

<Analytics />

<div data-theme={currentTheme}>
	<slot />
</div>

<style>
	@import '@flaticon/flaticon-uicons/css/bold/rounded.css';
	@import '@flaticon/flaticon-uicons/css/brands/all.css';
	@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap');

	:global(*) {
		font-family: 'Quicksand', sans-serif;
		@apply scroll-smooth;
	}
	
	:global(::-webkit-scrollbar) {
		@apply w-3 h-3;
	}

	/* Track */
	:global(::-webkit-scrollbar-track) {
		@apply bg-base-300 rounded-full;
	}

	/* Handle */
	:global(::-webkit-scrollbar-thumb) {
		@apply bg-primary rounded-full transition-all duration-300 ease-in-out hover:bg-primary-focus;
	}

	:global(::-webkit-scrollbar-corner) {
		@apply hidden;
	}
</style>
