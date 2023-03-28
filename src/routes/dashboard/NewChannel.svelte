<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { fly } from 'svelte/transition';
	export let visible: boolean;
	export let onClose: () => void;
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
			<h2 class="font-bold text-center grow">New Channel</h2>
		</div>

		<form
			method="POST"
			action={`/dashboard/channel?/newChannel`}
			use:enhance={({ form }) => {
				return async ({ result, update }) => {
					if (result.type === 'success') {
						onClose();
						form.reset();
					}
					if (result.type === 'error') {
						await applyAction(result);
					}
					update();
				};
			}}
		>
			<div class="divider" />
			<div class="form-control w-full">
				<label class="label">
					<span class="label-text">Name</span>
				</label>
				<input
					type="text"
					name="name"
					placeholder="Your channel name"
					class="input input-sm w-full input-bordered"
                    required
				/>
			</div>

			<div class="float-right mt-4">
				<button class="btn btn-primary btn-sm"> Add Channel </button>
			</div>
		</form>
	</div>
{/if}
