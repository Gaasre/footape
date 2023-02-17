<script lang="ts">
	import { fly } from 'svelte/transition';
	import { inview } from 'svelte-inview';
	import supabase from '$lib/supabaseClient';

	let isInView: boolean;
	let email: string = '';
	let inputError: boolean = true;
	let submitted: boolean = false;

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
	<div
		id="header"
		class="py-6 flex items-center mb-36 justify-between mx-auto max-w-4xl lg:max-w-6xl"
	>
		<a class="font-bold text-2xl" href="/"><span class="text-secondary">Foo</span>tape</a>
		<div class="flex space-x-10 lg:ml-28">
			<a class="link" href="/">Home</a>
			<a class="link" href="/#features">Features</a>
			<a class="link" href="/#pricing">Pricing</a>
			<a class="link" href="/">Blog</a>
		</div>
		<div class="flex items-center space-x-5">
			<div class="flex space-x-2">
				<i class="fi fi-br-lock mt-0.5 text-secondary" />
				<a class="link" href="/#">Sign In</a>
			</div>
			<a
				href="/#"
				class="border-secondary border px-5 py-2 rounded-full font-bold text-secondary hover:bg-secondary hover:text-white bg-primary transition-colors duration-300 ease-in-out"
			>
				Get Started
			</a>
		</div>
	</div>
	<div class="mb-32">
		<p class="font-bold text-5xl text-center mb-4">
			The perfect <span class="relative">
				<span>Youtube channel</span>
				<img
					src="youtube-channel.png"
					alt="Youtube Channel"
					class="absolute bottom-1 left-1 -z-10 w-full "
				/>
			</span> <br />management tool
		</p>
		<p class="text-3xl text-center mb-11 text-gray">
			Manage your video creation <br />team and workflow in
			<span class="font-bold text-secondary relative">
				<img src="one-place.png" alt="one place" class="absolute right-3 top-9" />
				<span>one place</span>
			</span>
		</p>
		{#if submitted}
			<p
				class="text-center mx-auto text-lg font-semibold text-dark-gray max-w-xl"
				in:fly={{ y: 50, duration: 300 }}
			>
				<span class="text-2xl font-bold text-secondary"> Thank you for signing up for the waitlist to use Footape! </span> <br />
				We can't wait to help you streamline your YouTube channel and video production
				process. <br />
				We'll keep you updated on our progress and let you know as soon as Footape is ready for you to
				use.
			</p>
		{:else}
			<div class="relative mx-auto w-[600px] group">
				<input
					placeholder="Enter Your Email"
					class="placeholder:text-gray py-5 pl-11 pr-52 border rounded-full w-full outline-none group-hover:border-secondary focus:border-secondary"
					type="text"
					class:error={inputError && email != ''}
					on:input={checkEmail}
					bind:value={email}
				/>
				<button
					on:click={sendData}
					disabled={inputError && email != ''}
					class="disabled:bg-neutral-500 disabled:text-neutral-100 absolute -right-1 px-12 py-[21px] font-bold rounded-full bg-secondary text-white hover:bg-secondary-hover transition-colors duration-300 ease-in-out"
					>Join Waitlist</button
				>
			</div>
		{/if}
		{#if inputError && email != ''}
			<p
				in:fly={{ y: 50, duration: 300 }}
				out:fly={{ y: 50, duration: 300 }}
				class="text-red font-bold text-center mt-2"
			>
				This email address is not valid
			</p>
		{/if}
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
				class="w-[calc(100%-100px)] h-24 bg-white/60 rounded-2xl shadow-lg absolute -z-10 -top-10 left-0 right-0 mx-auto"
			/>
			<img
				in:fly={{ y: 100, duration: 1500 }}
				src="dashboard.png"
				width="100%"
				alt="dashboard"
				class="rounded-2xl border-8 border-white shadow-lg z-10 mb-9"
			/>
			<img
				in:fly={{ y: 100, duration: 2000 }}
				src="green-vector.png"
				alt="Green Vector"
				class="absolute -right-20 -z-20 -top-24"
			/>
		{/if}
	</div>
	{#if isInView}
		<img
			in:fly={{ y: 100, duration: 1000 }}
			src="red-vector.png"
			alt="Red Vector"
			class="absolute left-0 top-80"
		/>
		<img
			in:fly={{ y: 100, duration: 1500 }}
			src="blue-vector.png"
			alt="Blue Vector"
			class="absolute right-0 top-16"
		/>
		<img src="bg.png" class="top-0 w-screen h-screen absolute -z-30" alt="" />
	{/if}
</section>

<style>
	.error {
		@apply border-red;
	}

	.link {
		@apply font-bold text-black hover:text-secondary transition-colors duration-300 ease-in-out;
	}
</style>
