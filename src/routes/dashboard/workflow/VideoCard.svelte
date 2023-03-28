<script lang="ts">
	import type { Video } from '$lib/interfaces';

	export let video: Video;
</script>

<div
	class="p-4 bg-base-200 shadow cursor-pointer hover:shadow-md transition-all duration-200 ease-in-out rounded-lg space-y-3 select-none"
>
	<div>
		<div class="badge badge-info">{video.channel?.name}</div>
	</div>
	<p class="text-sm text-base-content">{video.title}</p>
	<div class="flex gap-2 flex-wrap">
		<div
			class:badge-success={!!video.scriptLink}
			class:badge-neutral={!video.scriptLink}
			class="badge gap-1 flex items-center"
		>
			<div>Script</div>
			{#if !!video.scriptLink}
				<i class="fi fi-br-badge-check mt-1 text-xs" />
			{/if}
		</div>
		<div
		class:badge-success={!!video.voiceOverLink}
		class:badge-neutral={!video.voiceOverLink}
		class="badge gap-1 flex items-center"
		>
			<div>Voice-over</div>
			{#if !!video.voiceOverLink}
				<i class="fi fi-br-badge-check mt-1 text-xs" />
			{/if}
		</div>
		<div
		class:badge-success={!!video.videoLink}
		class:badge-neutral={!video.videoLink}
		class="badge gap-1 flex items-center"
		>
			<div>Video</div>
			{#if !!video.videoLink}
				<i class="fi fi-br-badge-check mt-1 text-xs" />
			{/if}
		</div>
	</div>
	{#if !!video.thumbnailLink}
		<img class="rounded-lg shadow" draggable="false" src={video.thumbnailLink} alt="Thumbnail" />
	{/if}
	<div class="flex justify-between items-center">
		<div class="avatar-group -space-x-4">
			{#each video.works as work}
				<div class="avatar">
					<div class="w-6">
						<img src={work.member.user.image} />
					</div>
				</div>
			{/each}
			<!-- <div class="avatar placeholder">
				<div class="w-6 bg-neutral-focus text-neutral-content text-xs">
					<span>+2</span>
				</div>
			</div> -->
		</div>
		<div class="flex text-base-content bg-base-300 text-sm items-center gap-1 px-2 rounded-lg">
			<i class="fi fi-br-comment mt-1" />
			<p>0</p>
		</div>
	</div>
</div>
