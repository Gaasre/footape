<script lang="ts">
	import { fly } from 'svelte/transition';
	import { inview } from 'svelte-inview';
	import supabase from '$lib/supabaseClient';
	import { page } from '$app/stores';
	import Header from './header.svelte';

	let isInView: boolean;
	let email: string = '';
	let inputError: boolean = true;
	let submitted: boolean = false;

	export let isConnected: boolean;

	const isEmailValid = () => {
		return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
			email
		);
	};

	const checkEmail = () => (inputError = !isEmailValid());

	async function sendData() {
		if (!isEmailValid()) {
			inputError = true;
			return;
		}

		const { data, error } = await supabase.from('Signups').insert([{ email: email }]);
		if (error) {
			throw new Error(error.message);
		}
		submitted = true;
		return data;
	}
</script>

<section class="relative">
	<Header {isConnected} />
	<div class="mb-32 relative z-10 mt-36">
		<p class="font-bold text-5xl text-center mb-4">
			The perfect <span class="relative">
				<span class="text-[#C84648]">Youtube</span> channel
			</span> <br />management tool
		</p>
		<p class="text-3xl text-center mb-11">
			Manage your video creation <br />team and workflow in
			<span class="font-bold text-secondary relative">
				<!-- <img src="one-place.png" alt="one place" class="absolute right-3 top-9" /> -->
				<span>one place</span>
			</span>
		</p>
		<div class="flex justify-center space-x-2 mb-2">
			<a href="/login" class="btn btn-primary btn-lg"> sign up now </a>
		</div>
		<p class="text-xs text-center mb-4">*Free 7-days Trial</p>
		<div class="mx-auto w-fit flex justify-center items-center">
			<p class="text-sm mr-10">Replaces</p>
			<img src="Trello.png" class="h-14" alt="" />
			<div class="divider divider-horizontal" />
			<img src="Zapier.png" class="h-8" alt="" />
			<div class="divider divider-horizontal" />
			<img src="Sheets.png" class="h-10" alt="" />
		</div>
	</div>
	<div
		class="relative w-1/2 mx-auto"
		use:inview={{ unobserveOnEnter: true }}
		on:change={({ detail }) => {
			isInView = detail.inView;
		}}
	>
		{#if isInView}
			<div
				in:fly={{ y: 100, duration: 1000 }}
				class="w-[calc(100%-100px)] h-24 bg-base-100 rounded-2xl shadow-lg absolute z-10 -top-10 left-0 right-0 mx-auto"
			/>
			<img
				in:fly={{ y: 100, duration: 1500 }}
				src="workflow.png"
				width="100%"
				alt="dashboard"
				class="rounded-2xl border-8 relative border-base-300 shadow-lg z-30 mb-9"
			/>
			<img
				in:fly={{ y: 100, duration: 2000 }}
				src="green-vector.png"
				alt="Green Vector"
				class="absolute -right-20 z-10 -top-24"
			/>
		{/if}
	</div>
	{#if isInView}
		<img
			in:fly={{ y: 100, duration: 1000 }}
			src="red-vector.png"
			alt="Red Vector"
			class="absolute left-0 top-80 z-20"
		/>
		<img
			in:fly={{ y: 100, duration: 1500 }}
			src="blue-vector.png"
			alt="Blue Vector"
			class="absolute right-0 top-16 z-20"
		/>
		<svg class="top-20 absolute fill-base-200" viewBox="0 0 1920 817" fill="none">
			<path d="M0 817C941.179 553.568 1672.16 707.237 1920 817V0H0V817Z" />
		</svg>
	{/if}
</section>
