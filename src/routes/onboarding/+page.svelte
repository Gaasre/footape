<script lang="ts">
	import { page } from '$app/stores';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import { fly } from 'svelte/transition';
	import { invalidateAll } from '$app/navigation';

	let step = 1;

	let firstname = '';
	let lastname = '';
	let channelName = '';

	const nextStep = async () => {
		if (step == 1 && firstname != '' && lastname != '') {
			await submitUser();
			step++;
		} else if (step == 2 && channelName != '') {
			await submitChannel();
			step++;
		}
	};

	const submitUser = async () => {
		const formData = new FormData();
		formData.append('firstname', firstname);
		formData.append('lastname', lastname);
		await fetch('/onboarding?/updateUser', {
			method: 'POST',
			body: formData
		});
		await invalidateAll();
	};

	const submitChannel = async () => {
		const formData = new FormData();
		formData.append('name', channelName);
		await fetch('/dashboard/channel?/newChannel', {
			method: 'POST',
			body: formData
		});
	};
</script>

<svelte:head>
	<title>Footape - Onboarding </title>
	<meta content="Footape - Onboarding" property="og:title" />
	<meta content="Footape - Onboarding" property="twitter:title" />
</svelte:head>

<div class="flex flex-col h-screen">
	<Header isConnected={!!$page.data.session?.user} />
	<div class="grow w-full bg-base-300 flex items-center justify-center">
		<div class="bg-base-100 rounded text-center py-10 px-24">
			<ul class="steps mb-6">
				<li class="step" class:step-primary={step >= 1}>Info</li>
				<li class="step" class:step-primary={step >= 2}>First Channel</li>
				<li class="step" class:step-primary={step >= 3}>Done</li>
			</ul>
			<div class="h-[200px]">
				{#if step == 1}
					<div
						in:fly={{ x: 50, duration: 250, delay: 300 }}
						out:fly={{ x: -50, duration: 250 }}
						class="mb-6"
					>
						<div class="form-control w-full max-w-xs">
							<label class="label">
								<span class="label-text-alt">First Name</span>
							</label>
							<input
								required
								bind:value={firstname}
								type="text"
								placeholder="First name"
								class="input input-bordered w-full max-w-xs"
							/>
						</div>
						<div class="form-control w-full max-w-xs">
							<label class="label">
								<span class="label-text-alt">Last Name</span>
							</label>
							<input
								required
								bind:value={lastname}
								type="text"
								placeholder="Last name"
								class="input input-bordered w-full max-w-xs"
							/>
						</div>
					</div>
				{/if}

				{#if step == 2}
					<div
						in:fly={{ x: 50, duration: 250, delay: 300 }}
						out:fly={{ x: -50, duration: 250 }}
						class="mb-6"
					>
						<div class="form-control w-full max-w-xs">
							<label class="label">
								<span class="label-text-alt">Channel name</span>
							</label>
							<input
								required
								type="text"
								bind:value={channelName}
								placeholder="Channel name"
								class="input input-bordered w-full max-w-xs"
							/>
						</div>
					</div>
				{/if}

				{#if step == 3}
					<div
						in:fly={{ x: 50, duration: 250, delay: 300 }}
						out:fly={{ x: -50, duration: 250 }}
						class="mb-6"
					>
						<i class="fi fi-br-badge-check text-6xl text-success mb-6" />
						<h1 class="text-2xl font-bold mb-6">You're good to go!</h1>
					</div>
				{/if}
			</div>

			<div class="flex flex-row-reverse gap-2">
				{#if step == 3}
					<a class="btn btn-primary" href="/dashboard">Go to Dashboard</a>
				{:else}
					<button class="btn btn-primary" on:click={nextStep}>Next</button>
				{/if}
				{#if step > 1}
					<button class="btn btn-ghost" on:click={() => step--}>Previous</button>
				{/if}
			</div>
		</div>
	</div>
	<Footer />
</div>
