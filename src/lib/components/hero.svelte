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

<section
	class="relative"
	use:inview={{ unobserveOnEnter: true }}
	on:change={({ detail }) => {
		isInView = detail.inView;
	}}
>
	<Header {isConnected} />
	<div class="sm:mb-32 mb-20 relative z-10 mt-36">
		<p class="font-bold text-4xl sm:text-5xl text-center mb-4">
			The perfect <span class="relative">
				<span class="text-error">Youtube</span> channel
			</span> <br />management tool
		</p>
		<p class="sm:text-3xl text-2xl text-center mb-11">
			Manage your video creation <br />team and workflow in
			<span class="font-bold text-primary relative">
				<!-- <img src="one-place.png" alt="one place" class="absolute right-3 top-9" /> -->
				<span>one place</span>
			</span>
		</p>
		<div class="flex justify-center space-x-2 mb-2">
			<a href="/login" class="btn btn-primary btn-lg"> sign up now </a>
		</div>
		<p class="text-xs text-center mb-4">*Free for small channels</p>
		<div class="mx-auto w-fit flex justify-center items-center">
			<p class="text-sm mr-4 sm:mr-10">Replaces</p>
			<img src="Trello.png" class="h-14" alt="" />
			<div class="divider divider-horizontal" />
			<img src="Zapier.png" class="h-8" alt="" />
			<div class="divider divider-horizontal" />
			<img src="Sheets.png" class="h-10" alt="" />
		</div>
	</div>
	<div class="relative w-full sm:w-1/2 sm:px-0 px-4 mx-auto">
		{#if isInView}
			<div
				in:fly={{ y: 100, duration: 1000 }}
				class="w-[calc(100%-80px)] h-24 bg-[#d4e2df] rounded-2xl shadow-lg absolute z-10 -top-8 left-0 right-0 mx-auto"
			/>
			<img
				in:fly={{ y: 100, duration: 1500 }}
				src="workflow.png"
				width="100%"
				alt="dashboard"
				class="rounded-2xl border-8 relative border-base-100 shadow-lg z-30 mb-9"
			/>
			<img
				in:fly={{ y: 100, duration: 2000 }}
				src="green-vector.png"
				alt="Green Vector"
				class="absolute right-0 sm:-right-20 z-10 w-32 sm:w-auto -top-12 sm:-top-24"
			/>
		{/if}
	</div>
	{#if isInView}
		<img
			in:fly={{ y: 100, duration: 1000 }}
			src="red-vector.png"
			alt="Red Vector"
			class="absolute left-0 top-64 w-32 sm:w-auto z-20"
		/>
		<img
			in:fly={{ y: 100, duration: 1500 }}
			src="blue-vector.png"
			alt="Blue Vector"
			class="absolute right-0 top-28 w-24 sm:w-auto z-20"
		/>
	{/if}
</section>
