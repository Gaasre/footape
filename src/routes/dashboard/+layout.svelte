<script lang="ts">
	import Navigation from './Navigation.svelte';
	import Header from './Header.svelte';
	import UploadProgress from '$lib/components/UploadProgress.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>


<div class="h-screen bg-base-100 relative">
	<Header />
	<div class="bg-base-100 px-3 flex gap-2 min-h-[calc(100vh-66px)] h-auto">
		<div class="bg-base-100">
			<Navigation channels={data.channels ?? []} />
		</div>
		<div class="rounded-lg bg-base-200 shadow-lg px-5 py-6 h-full min-h-[calc(100vh-80px)] w-[calc(100%-220px)]">
			<slot />
		</div>
	</div>
	<UploadProgress />
</div>
