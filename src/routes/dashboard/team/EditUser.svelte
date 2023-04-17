<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import type { Member } from '$lib/interfaces';
	import { fly } from 'svelte/transition';

	export let visible: boolean;
	export let onClose: () => void;
	export let member: Member;
	let loading = false;
</script>

{#if visible}
	<div
		in:fly={{ x: 20 }}
		class="absolute top-0 my-16 mx-8 right-0 max-w-lg w-full h-auto rounded-lg bg-base-300 shadow-lg z-20 p-6"
	>
	<div class="flex items-center mb-4">
		<button class="btn btn-ghost btn-sm btn-circle" on:click={onClose}>
			<i class="fi fi-br-cross-small" />
		</button>
		<h2 class="font-bold text-center grow">Edit team member</h2>
	</div>
		<form
			method="POST"
			action={`?/editMember&id=${member.id}`}
			use:enhance={({ form }) => {
				loading = true;
				return async ({ result, update }) => {
					if (result.type === 'success') {
						onClose()
						form.reset();
					}
					if (result.type === 'error') {
						await applyAction(result);
					}
					loading = false;
					update();
				};
			}}
		>

			<div class="flex items-center space-x-4">
				<div class="avatar">
					<div class="mask mask-squircle w-16 h-16">
						<img src={member.user.image} alt="Avatar Tailwind CSS Component" />
					</div>
				</div>
				<div>
					<h1 class="text-3xl font-bold ">{member.user.firstname} {member.user.lastname}</h1>
					<h2 class="text-gray">{member.user.email}</h2>
				</div>
			</div>

			<div class="divider" />

			<div class="space-y-2 mb-8">
				<div class="flex">
					<div class="form-control w-full max-w-xs">
						<label class="label">
							<span class="label-text">Rate</span>
						</label>
						<div class="flex items-center space-x-2">
							<input
								type="number"
								name="rate"
								min="0"
								placeholder="Type here"
								class="input input-sm w-40 input-bordered"
								bind:value={member.rate}
							/>
							<i class="fi fi-br-dollar" />
						</div>
					</div>

					<div class="form-control w-full max-w-xs">
						<label class="label">
							<span class="label-text">Frequency</span>
						</label>
						<select
							name="frequency"
							class="select select-bordered w-40 select-sm"
							bind:value={member.frequency}
						>
							<option value="hourly">Hourly</option>
							<option value="per video">Per Video</option>
						</select>
					</div>
				</div>
				<div class="form-control w-full max-w-full">
					<label class="label">
						<span class="label-text">Position</span>
					</label>
					<select
						name="position"
						class="select select-bordered w-full select-sm"
						bind:value={member.position}
					>
						<option value="Manager">Manager</option>
						<option value="Script Writer">Script Writer</option>
						<option value="Voice Over">Voice Over</option>
						<option value="Video Editor">Video Editor</option>
						<option value="Thumbnail Designer">Thumbnail Designer</option>
					</select>
				</div>
			</div>

			<div class="float-right">
				<button class:loading={loading} class="btn btn-primary btn-sm"> Edit Member </button>
			</div>
		</form>
	</div>
{/if}
