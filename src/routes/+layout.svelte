<script lang="ts">
	import '../app.postcss';
	import '@fontsource/quicksand';
	import { onMount } from 'svelte';
	import supabase from '$lib/supabaseClient';
	import { invalidateAll } from '$app/navigation';

	import { theme } from '$lib/stores';
	import { page } from '$app/stores';

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
	<meta content="Twitter.png" property="twitter:image" />
	<meta content="Twitter.png" property="og:image" />
	<meta property="og:type" content="website" />
	<meta content="summary_large_image" name="twitter:card" />
	<meta content="width=device-width, initial-scale=1" name="viewport" />
</svelte:head>
<div data-theme={currentTheme}>
	<slot />
</div>

<style>
	@import '@flaticon/flaticon-uicons/css/bold/rounded.css';
	@import '@flaticon/flaticon-uicons/css/brands/all.css';

	:global(*) {
		font-family: 'Quicksand', sans-serif;
		@apply scroll-smooth;
	}
</style>
