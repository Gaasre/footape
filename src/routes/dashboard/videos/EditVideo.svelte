<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import Upload from '$lib/components/Upload.svelte';
	import type { Channel, Video } from '$lib/interfaces';
	import { fly } from 'svelte/transition';

	export let visible: boolean;
	export let video: Video;
	export let channels: Channel[];
	export let onClose: () => void;
</script>

{#if visible}
	<div
		in:fly={{ x: 20 }}
		class="absolute top-0 my-16 mx-8 right-0 max-w-lg w-full h-auto rounded-lg bg-base-300 shadow-lg z-10 p-6"
	>
		<div class="flex items-center mb-4">
			<button class="btn btn-ghost btn-sm btn-circle" on:click={onClose}>
				<i class="fi fi-br-cross-small" />
			</button>
			<h2 class="font-bold text-center grow">Edit Video</h2>
		</div>
		<form
			method="POST"
			action={`?/editVideo&id=${video.id}`}
			use:enhance={({ form }) => {
				return async ({ result, update }) => {
					if (result.type === 'success') {
						onClose()
						form.reset();
					}
					if (result.type === 'error') {
						await applyAction(result);
					}
					update();
				};
			}}
		>
			<div class="flex items-center space-x-4">
				<div class="avatar">
					<div class="mask mask-squircle w-16 h-16">
						{#if video.thumbnailLink}
							<img src={video.thumbnailLink} alt="Thumbnail" />
						{:else}
							<div class="bg-neutral w-16 h-16" />
						{/if}
					</div>
				</div>
				<div>
					<h1 class="text-3xl font-bold text-ellipsis overflow-hidden max-w-sm whitespace-nowrap">
						{video.title}
					</h1>
					<h2>{video.channel.name}</h2>
				</div>
			</div>

			<div class="divider" />

			<div class="space-y-2 mb-8">
				<div class="form-control w-full">
					<label class="label">
						<span class="label-text">Title</span>
					</label>
					<input
						type="text"
						name="title"
						placeholder="Title"
						class="input input-sm w-full input-bordered"
						bind:value={video.title}
					/>
				</div>

				<div class="form-control w-full">
					<label class="label">
						<span class="label-text">Channel</span>
					</label>
					<select
						bind:value={video.channel.id}
						name="channel"
						class="select select-bordered w-full select-sm"
					>
						{#each channels as channel}
							<option value={channel.id}>{channel.name}</option>
						{/each}
					</select>
				</div>

				<div class="form-control w-full">
					<label class="label">
						<span class="label-text">Notes</span>
					</label>
					<textarea
						name="notes"
						rows="3"
						placeholder="Notes ..."
						class="textarea textarea-sm w-full textarea-bordered"
						bind:value={video.notes}
					/>
				</div>
			</div>

			<div class="flex flex-row-reverse">
				<button class="btn btn-primary btn-sm"> Edit Video </button>
			</div>
		</form>

		<div class="divider" />

		<Upload {video} />
	</div>
{/if}
