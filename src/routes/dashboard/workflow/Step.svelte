<script lang="ts">
	import VideoCard from './VideoCard.svelte';
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import type { Video } from '$lib/interfaces';
	import ViewVideo from './ViewVideo.svelte';

	export let id: number;
	export let name: string;
	export let cards: Video[];

	const dragstart = (
		event: DragEvent & {
			currentTarget: EventTarget & HTMLDivElement;
		},
		data: Video
	) => {
		if (event.dataTransfer) {
			const img = new Image();
			img.src = '/card-placeholder.png';
			event.dataTransfer.setDragImage(img, 0, 0);
			event.dataTransfer.effectAllowed = 'move';
			event.dataTransfer.dropEffect = 'move';
			event.dataTransfer.setData('text/plain', JSON.stringify({ step: id, card: data }));
		}
	};

	export let onSelectVideo: (videoIndex: string) => void
</script>

<div class="w-64 px-2">
	<div class="space-y-4">
		{#each cards as card, cardIndex (card)}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				animate:flip={{ duration: 500 }}
				draggable={true}
				on:dragstart={(event) => dragstart(event, card)}
				on:dragover|preventDefault={() => false}
				on:click={() => onSelectVideo(card.id)}
			>
				<VideoCard video={card} />
			</div>
		{/each}
	</div>
</div>
