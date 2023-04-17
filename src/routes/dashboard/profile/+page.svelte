<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;
	let loading = false;

	const updateImage = async () => {
		const formData = new FormData();
		await fetch('?/editImage', {
			method: 'POST',
			body: formData
		});
		await invalidateAll();
	};
</script>

<svelte:head>
	<title>Footape - Dashboard</title>
	<meta content="Footape - Dashboard" property="og:title" />
	<meta content="Footape - Dashboard" property="twitter:title" />
</svelte:head>

<h1 class="text-3xl font-bold mb-16">Profile</h1>
<div class="mx-8">
	<div class="flex gap-10">
		<div class="relative group mb-10 w-fit">
			<img src={$page.data.fullUser?.image} alt="avatar" class="mask mask-circle" />
			<button
				on:click={updateImage}
				class="absolute top-0 left-0 bg-base-300/0 h-full w-full rounded-full flex group-hover:bg-base-300/60 transition-colors duration-300 items-center justify-center"
			>
				<p class="group-hover:opacity-100 opacity-0 duration-300 transition-all">Change</p>
			</button>
		</div>
		<div class="pt-4">
			<p class="badge badge-accent capitalize mb-4">
				{$page.data.fullUser?.subscription} subscription
			</p>
			{#if $page.data.fullUser?.position == 'Owner'}
				<form
					method="POST"
					action={`?/portal`}
					class="space-y-4"
					use:enhance={({ form }) => {
						return async ({ result, update }) => {
							if (result.type === 'error') {
								await applyAction(result);
							}
							update({ reset: false });
						};
					}}
				>
					<button class="btn btn-ghost">Manage subscription</button>
				</form>
			{/if}
		</div>
	</div>
	<div>
		<form
			method="POST"
			action={`?/editUser`}
			class="space-y-4"
			use:enhance={({ form }) => {
				loading = true
				return async ({ result, update }) => {
					if (result.type === 'success') {
						console.log(result);
					} else if (result.type === 'error') {
						await applyAction(result);
					}
					loading = false
					update({ reset: false });
				};
			}}
		>
			<div class="form-control w-full max-w-xs">
				<label class="label">
					<span class="label-text">First name</span>
				</label>
				<input
					type="text"
					value={$page.data.fullUser?.firstname}
					name="firstname"
					placeholder="Last name"
					class="input input-bordered w-full max-w-lg"
				/>
			</div>
			<div class="form-control w-full max-w-xs">
				<label class="label">
					<span class="label-text">Last name</span>
				</label>
				<input
					type="text"
					value={$page.data.fullUser?.lastname}
					name="lastname"
					placeholder="First name"
					class="input input-bordered w-full max-w-lg"
				/>
			</div>
			<div class="form-control w-full max-w-xs">
				<label class="label">
					<span class="label-text">E-mail</span>
				</label>
				<input
					type="text"
					value={$page.data.fullUser?.email}
					placeholder="E-mail"
					class="input input-bordered w-full max-w-lg"
					disabled
				/>
			</div>
			<div>
				<button class:loading={loading} class="btn btn-primary">Submit</button>
			</div>
		</form>
	</div>
</div>
