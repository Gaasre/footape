<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { Video } from '$lib/interfaces';

	export let video: Video;

	let scriptLoading = false;
	let voiceoverLoading = false;
	let videoLoading = false;
	let thumbnailLoading = false;

	let scriptLink = '';
	let voiceoverLink = '';
	let videoLink = '';
	let thumbnailLink = '';

	let scriptEditOpen = false;
	let voiceoverEditOpen = false;
	let videoEditOpen = false;
	let thumbnailEditOpen = false;

	const deleteFile = async (filetype: string) => {
		if (filetype == 'script') {
			scriptLoading = true;
		} else if (filetype == 'voiceover') {
			voiceoverLoading = true;
		} else if (filetype == 'video') {
			videoLoading = true;
		} else {
			thumbnailLoading = true;
		}

		const res = await fetch(`/api/file/${video.id}`, {
			method: 'DELETE',
			body: JSON.stringify({ filetype })
		});

		if (res.ok) {
			await invalidateAll();
		}

		if (filetype == 'script') {
			scriptLoading = false;
            scriptEditOpen = false;
		} else if (filetype == 'voiceover') {
			voiceoverLoading = false;
            voiceoverEditOpen = false;
		} else if (filetype == 'video') {
			videoLoading = false;
            videoEditOpen = false;
		} else {
			thumbnailLoading = false;
            thumbnailEditOpen = false;
		}
	};

	const submitFile = async (filetype: string, link: string) => {
		if (filetype == 'script') {
			scriptLoading = true;
		} else if (filetype == 'voiceover') {
			voiceoverLoading = true;
		} else if (filetype == 'video') {
			videoLoading = true;
		} else {
			thumbnailLoading = true;
		}

		const res = await fetch(`/api/file/${video.id}`, {
			method: 'POST',
			body: JSON.stringify({ filetype, link })
		});

		if (res.ok) {
			await invalidateAll();
		}

		if (filetype == 'script') {
			scriptLoading = false;
            scriptEditOpen = false;
		} else if (filetype == 'voiceover') {
			voiceoverLoading = false;
            voiceoverEditOpen = false;
		} else if (filetype == 'video') {
			videoLoading = false;
            videoEditOpen = false;
		} else {
			thumbnailLoading = false;
            thumbnailEditOpen = false;
		}
	};
</script>

<div class="flex">
	<div class="flex flex-col w-1/3">
		<label class="label">Script:</label>
		<label class="label">Voice-Over:</label>
		<label class="label">Video:</label>
		<label class="label">Thumbnail:</label>
	</div>
	<div class="flex flex-col gap-4 mt-1.5">
		<div>
			{#if video.scriptLink}
				<div class="flex gap-2">
					<a href={video.scriptLink} class="btn btn-xs btn-info gap-2">
						<i class="fi fi-br-clip mt-0.5" />
						<p class="max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">
							{video.scriptLink}
						</p>
					</a>
					<button class:loading={scriptLoading} on:click={() => deleteFile('script')} class="btn btn-xs btn-error">remove</button>
				</div>
			{:else if scriptEditOpen}
				<div class="form-control">
					<div class="input-group">
						<input
							type="text"
							bind:value={scriptLink}
							placeholder="Script Link"
							class="input input-bordered input-xs w-full"
						/>
						<button on:click={() => submitFile('script', scriptLink)} class:btn-disabled={scriptLink == ''} class:loading={scriptLoading} class="btn btn-xs btn-primary">submit</button>
						<button on:click={() => scriptEditOpen = false} class="btn btn-xs btn-accent">cancel</button>
					</div>
				</div>
			{:else}
				<button on:click={() => scriptEditOpen = true} class="btn btn-xs btn-ghost gap-2">
					<i class="fi fi-br-clip mt-0.5" />
					<span>Attachement</span>
				</button>
			{/if}
		</div>
        <div>
			{#if video.voiceOverLink}
				<div class="flex gap-2">
					<a href={video.voiceOverLink} class="btn btn-xs btn-info gap-2">
						<i class="fi fi-br-clip mt-0.5" />
						<p class="max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">
							{video.voiceOverLink}
						</p>
					</a>
					<button class:loading={voiceoverLoading} on:click={() => deleteFile('voiceover')} class="btn btn-xs btn-error">remove</button>
				</div>
			{:else if voiceoverEditOpen}
				<div class="form-control">
					<div class="input-group">
						<input
							type="text"
							bind:value={voiceoverLink}
							placeholder="Voice-Over Link"
							class="input input-bordered input-xs w-full"
						/>
						<button on:click={() => submitFile('voiceover', voiceoverLink)} class:btn-disabled={voiceoverLink == ''} class:loading={voiceoverLoading} class="btn btn-xs btn-primary">submit</button>
						<button on:click={() => voiceoverEditOpen = false} class="btn btn-xs btn-accent">cancel</button>
					</div>
				</div>
			{:else}
				<button on:click={() => voiceoverEditOpen = true} class="btn btn-xs btn-ghost gap-2">
					<i class="fi fi-br-clip mt-0.5" />
					<span>Attachement</span>
				</button>
			{/if}
		</div>
        <div>
			{#if video.videoLink}
				<div class="flex gap-2">
					<a href={video.videoLink} class="btn btn-xs btn-info gap-2">
						<i class="fi fi-br-clip mt-0.5" />
						<p class="max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">
							{video.videoLink}
						</p>
					</a>
					<button class:loading={videoLoading} on:click={() => deleteFile('video')} class="btn btn-xs btn-error">remove</button>
				</div>
			{:else if videoEditOpen}
				<div class="form-control">
					<div class="input-group">
						<input
							type="text"
							bind:value={videoLink}
							placeholder="Video Link"
							class="input input-bordered input-xs w-full"
						/>
						<button on:click={() => submitFile('video', videoLink)} class:btn-disabled={videoLink == ''} class:loading={videoLoading} class="btn btn-xs btn-primary">submit</button>
						<button on:click={() => videoEditOpen = false} class="btn btn-xs btn-accent">cancel</button>
					</div>
				</div>
			{:else}
				<button on:click={() => videoEditOpen = true} class="btn btn-xs btn-ghost gap-2">
					<i class="fi fi-br-clip mt-0.5" />
					<span>Attachement</span>
				</button>
			{/if}
		</div>
        <div>
			{#if video.thumbnailLink}
				<div class="flex gap-2">
					<a href={video.thumbnailLink} class="btn btn-xs btn-info gap-2">
						<i class="fi fi-br-clip mt-0.5" />
						<p class="max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">
							{video.thumbnailLink}
						</p>
					</a>
					<button class:loading={thumbnailLoading} on:click={() => deleteFile('thumbnail')} class="btn btn-xs btn-error">remove</button>
				</div>
			{:else if thumbnailEditOpen}
				<div class="form-control">
					<div class="input-group">
						<input
							type="text"
							bind:value={thumbnailLink}
							placeholder="Thumbnail Link"
							class="input input-bordered input-xs w-full"
						/>
						<button on:click={() => submitFile('thumbnail', thumbnailLink)} class:btn-disabled={thumbnailLink == ''} class:loading={thumbnailLoading} class="btn btn-xs btn-primary">submit</button>
						<button on:click={() => thumbnailEditOpen = false} class="btn btn-xs btn-accent">cancel</button>
					</div>
				</div>
			{:else}
				<button on:click={() => thumbnailEditOpen = true} class="btn btn-xs btn-ghost gap-2">
					<i class="fi fi-br-clip mt-0.5" />
					<span>Attachement</span>
				</button>
			{/if}
		</div>
	</div>
</div>
