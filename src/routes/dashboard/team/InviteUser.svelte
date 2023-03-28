<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { fly } from 'svelte/transition';
	export let visible: boolean;
	export let onClose: () => void;
</script>

{#if visible}
	<div
		in:fly={{ x: 20 }}
		class="absolute top-0 my-16 mx-8 right-0 max-w-lg w-full h-auto rounded-lg bg-base-300 shadow-lg z-10 p-6"
	>
		<div class="flex items-center">
			<button class="btn btn-ghost btn-sm btn-circle" on:click={onClose}>
				<i class="fi fi-br-cross-small" />
			</button>
			<h2 class="font-bold text-center grow">Invite Member</h2>
		</div>

		<form
			method="POST"
			action={`?/inviteMember`}
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
			<div class="divider" />

			<div class="space-y-2 mb-8">
				<div class="flex">
					<div class="form-control w-full max-w-xs">
						<label class="label">
							<span class="label-text">First Name</span>
						</label>
						<input
							type="text"
							name="firstname"
							min="0"
							placeholder="First Name"
							class="input input-sm w-40 input-bordered"
						/>
					</div>

					<div class="form-control w-full max-w-xs">
						<label class="label">
							<span class="label-text">Last Name</span>
						</label>
						<input
							type="text"
							name="lastname"
							min="0"
							placeholder="Last Name"
							class="input input-sm w-40 input-bordered"
						/>
					</div>
				</div>
				<div class="form-control w-full">
					<label class="label">
						<span class="label-text">Email</span>
					</label>
					<input
						type="email"
						name="email"
						min="0"
						placeholder="email@email.com"
						class="input input-sm input-bordered"
					/>
				</div>
				<div class="flex">
					<div class="form-control w-full max-w-xs">
						<label class="label">
							<span class="label-text">Rate</span>
						</label>
						<div class="flex items-center space-x-2">
							<input type="number" name="rate" min="0" class="input input-sm w-40 input-bordered" />
							<i class="fi fi-br-dollar" />
						</div>
					</div>

					<div class="form-control w-full max-w-xs">
						<label class="label">
							<span class="label-text">Frequency</span>
						</label>
						<select name="frequency" class="select select-bordered w-40 select-sm">
							<option value="hourly">Hourly</option>
							<option value="per video">Per Video</option>
						</select>
					</div>
				</div>
				<div class="form-control w-full max-w-full">
					<label class="label">
						<span class="label-text">Position</span>
					</label>
					<select name="position" class="select select-bordered w-full select-sm">
						<option value="Manager">Manager</option>
						<option value="Script Writer">Script Writer</option>
						<option value="Voice Over">Voice Over</option>
						<option value="Video Editor">Video Editor</option>
						<option value="Thumbnail Designer">Thumbnail Designer</option>
					</select>
				</div>
			</div>

			<div class="float-right">
				<button class="btn btn-primary btn-sm"> Send Invite </button>
			</div>
		</form>
	</div>
{/if}
