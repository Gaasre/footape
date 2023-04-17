<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import type { Channel } from '$lib/interfaces';
	import { fly } from 'svelte/transition';
	export let visible: boolean;
	export let channels: Channel[];
	export let onClose: () => void;
	let loading = false
</script>

{#if visible}
	<div
		in:fly={{ x: 20 }}
		class="absolute top-0 my-16 mx-8 right-0 max-w-lg w-full h-auto rounded-lg bg-base-300 shadow-lg z-20 p-6"
	>
		<div class="flex items-center">
			<button class="btn btn-ghost btn-sm btn-circle" on:click={onClose}>
				<i class="fi fi-br-cross-small" />
			</button>
			<h2 class="font-bold text-center grow">New Video</h2>
		</div>

		<form
			method="POST"
			action={`?/newVideo`}
			use:enhance={({ form }) => {
				loading = true
				return async ({ result, update }) => {
					if (result.type === 'success') {
						onClose()
						form.reset();
					}
					if (result.type === 'error') {
						await applyAction(result);
					}
					loading = false
					update();
				};
			}}
		>
			<div class="divider" />

			<div class="space-y-2 mb-8">
				<div class="form-control w-full">
					<label class="label">
						<span class="label-text">Title</span>
					</label>
					<input
						type="text"
						name="title"
						placeholder="Your video title"
						class="input input-sm w-full input-bordered"
					/>
				</div>

				<div class="form-control w-full">
					<label class="label">
						<span class="label-text">Channel</span>
					</label>
					<select name="channel" class="select select-bordered w-full select-sm">
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
                        rows="5"
						placeholder="Notes ..."
						class="textarea leading-normal textarea-sm w-full textarea-bordered"
					/>
				</div>

                <div class="float-right">
                    <button class:loading={loading} class="btn btn-primary btn-sm"> Add Video </button>
                </div>
			</div>
		</form>
	</div>
{/if}
