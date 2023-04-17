<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import Step from './Step.svelte';
	import ViewVideo from './ViewVideo.svelte';

	let hovering = -1;
	export let data: PageData;

	let selectedVideoId: string;
	let selectedStatus: number;
	let infoVisible = false;

	const selectVideo = (videoId: string, statusIndex: number) => {
		selectedVideoId = videoId;
		selectedStatus = statusIndex;
		infoVisible = true;
	};

	const closeInfo = () => {
		infoVisible = false;
	};

	const drop = async (
		event: DragEvent & {
			currentTarget: EventTarget & HTMLDivElement;
		},
		i: number
	) => {
		if (event.dataTransfer && data.videos) {
			event.dataTransfer.dropEffect = 'move';
			const { step, card } = JSON.parse(event.dataTransfer.getData('text/plain'));
			data.videos[step].cards = data.videos[step].cards.filter((x) => x.id != card.id);
			data.videos[i].cards = [card, ...data.videos[i].cards];

			hovering = -1;

			await fetch(`?id=${card.id}`, {
				method: 'PUT',
				body: JSON.stringify({
					status: data.videos[i].name
				})
			});

			await invalidateAll();
		}
		hovering = -1;
	};

	$: selectedVideo = data.videos && selectedStatus ? data.videos[selectedStatus].cards.findIndex((v) => v.id == selectedVideoId) : -1
</script>

<svelte:head>
	<title>Footape - Workflow</title>
	<meta content="Footape - Workflow" property="og:title" />
	<meta content="Footape - Workflow" property="twitter:title" />
</svelte:head>

<div class="relative">
	<h1 class="text-3xl font-bold mb-8">Workflow</h1>
	<div class="overflow-auto h-[calc(100vh-150px)]">
		<div class="grid sticky top-0 grid-cols-7 gap-5 w-max z-10">
			{#each data.videos ?? [] as step}
				<div class="w-64 px-2">
					<div class="flex gap-2 items-center mb-4 bg-base-300 rounded-lg py-2 justify-center">
						<h2 class="uppercase font-semibold text-base-content">{step.name}</h2>
						<div class="badge badge-primary">{step.cards.length}</div>
					</div>
				</div>
			{/each}
		</div>
		<div class="flex gap-4 w-full py-4">
			{#each data.videos ?? [] as step, index}
				<div
					class="border-2 border-transparent border-dashed h-full min-h-[300px] bg-base-200 py-2 rounded-lg"
					class:hovering={hovering == index}
					on:drop|preventDefault={(event) => drop(event, index)}
					on:dragenter={() => {
						hovering = index;
					}}
					on:dragover|preventDefault={() => true}
				>
					<Step
						onSelectVideo={(videoId) => selectVideo(videoId, index)}
						id={index}
						{...step}
					/>
				</div>
			{/each}
		</div>
	</div>
	{#if data.videos && selectedStatus >= 0 && selectedVideo >= 0}
		<ViewVideo
			user={$page.data.fullUser}
			video={data.videos[selectedStatus].cards[selectedVideo]}
			visible={infoVisible}
			onClose={closeInfo}
		/>
	{/if}
</div>

<style>
	.hovering {
		@apply border-accent rounded-lg transition-all duration-200 ease-in-out;
	}
</style>
