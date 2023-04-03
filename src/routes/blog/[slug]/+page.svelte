<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import moment from 'moment';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.blog.title}</title>
	<meta content={data.blog.title} property="og:title" />
	<meta content={data.blog.title} property="twitter:title" />
	<meta
		name="description"
		content={data.blog.description}
	/>
</svelte:head>

<div class="flex flex-col min-h-screen">
	<Header isConnected={!!$page.data.session?.user} />

	<div class="bg-base-300">
		<div class="sm:max-w-2xl max-w-xs mx-auto sm:py-28 py-14 w-full text-center">
			{#if data.blog}
				<h1 class="sm:text-5xl text-4xl mb-4">{data.blog.title}</h1>
				<div class="flex gap-2 justify-center mb-4">
					{#each data.blog.categories as chip}
						<div class={`badge badge-primary`}>{chip}</div>
					{/each}
				</div>
				<div class="flex gap-4 justify-center sm:text-sm text-xs items-center mb-12">
					<p>{moment(data.blog.created_at).fromNow()}</p>
					<div class="flex gap-2 items-center">
						<div class="avatar">
							<div class="w-5 rounded-full">
								<img src="/amine.jpg" alt="author" />
							</div>
						</div>
						<p class="text-xs">Amine</p>
					</div>
				</div>
                <img class="rounded-lg shadow-lg w-full h-full mb-12" src={data.blog.image} alt="" />
				<article class="prose-sm mx-auto text-left prose-h2:text-xl sm:prose">
					{@html data.blog.content}
				</article>
			{/if}
		</div>
	</div>

	<Footer />
</div>
