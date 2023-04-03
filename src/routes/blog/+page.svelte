<script lang="ts">
	import type { PageData } from './$types';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import { page } from '$app/stores';
	import BlogCard from './Blogcard.svelte';

	export let data: PageData;

	const previousPage = () => {
		return data.page ? (data.page <= 1 ? 1 : data.page - 1) : 1;
	};

	const nextPage = () => {
		return data.pages ? (data.page >= data.pages ? data.pages : data.page + 1) : 1;
	};
</script>

<svelte:head>
	<title>Footape - Blog</title>
	<meta content="Footape - Blog" property="og:title" />
	<meta content="Footape - Blog" property="twitter:title" />
	<meta
		name="description"
		content="Discover the secrets to creating automated YouTube channels, mastering YouTube automation strategies, and optimizing expenses for maximum success in faceless youtube channel content production.."
	/>
</svelte:head>

<div class="flex flex-col min-h-screen">
	<Header isConnected={!!$page.data.session?.user} />
	<div class="grow w-full bg-base-300">
		<div class="bg-base-100 text-center pt-24 pb-8">
			<div class="max-w-2xl mx-auto">
				<h1 class="font-bold text-6xl mb-4">Footape Blog</h1>
				<h2 class="text-xl">
					Master YouTube automation: expert strategies, collaboration, freelancer management and
					expense control.
				</h2>
			</div>
		</div>
	</div>
	<div class="max-w-2xl mx-auto pt-16 py-12 w-full flex flex-col space-y-4">
		{#if data.blogs}
			{#each data.blogs as blog}
				<BlogCard {blog} />
			{/each}
		{/if}
	</div>
	<div class="btn-group flex justify-center mb-12">
		<a
			href={`?page=${previousPage()}`}
			class="btn btn-primary"
			class:btn-disabled={data.page ? data.page <= 1 : true}>«</a
		>
		<button class="btn btn-secondary">Page {data.page}/{data.pages}</button>
		<a
			href={`?page=${nextPage()}`}
			class="btn btn-primary"
			class:btn-disabled={data.pages ? data.page >= data.pages : true}>»</a
		>
	</div>
	<Footer />
</div>
