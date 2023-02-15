<script lang="ts">
	import { fly } from 'svelte/transition';
	import { inview } from 'svelte-inview';

	let isInView: boolean;
</script>

<section class="relative">
	<div id="header" class="px-56 py-6 flex justify-center items-center mb-36">
		<a class="font-bold text-2xl mr-64" href="/"><span class="text-secondary">Foo</span>tape</a>
		<div class="flex space-x-10 mr-48">
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
		<div class="relative mx-auto w-[600px] group">
			<input
				placeholder="Enter Your Email"
				class="placeholder:text-gray py-5 pl-11 pr-52 border rounded-full w-full outline-none group-hover:border-secondary focus:border-secondary"
				type="text"
			/>
			<button
				class="absolute -right-1 px-12 py-[21px] font-bold rounded-full bg-secondary text-white hover:bg-secondary-hover transition-colors duration-300 ease-in-out"
				>Join Waitlist</button
			>
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
				in:fly={{ y: 100, duration: 500 }}
				class="w-[calc(100%-100px)] h-24 bg-white/60 rounded-2xl shadow-lg absolute -z-10 -top-10 left-0 right-0 mx-auto"
			/>
			<img
				in:fly={{ y: 100, duration: 1000 }}
				src="dashboard.png"
				width="100%"
				alt="dashboard"
				class="rounded-2xl border-8 border-white shadow-lg z-10 mb-9"
			/>
			<img
				in:fly={{ y: 100, duration: 500 }}
				src="green-vector.png"
				alt="Green Vector"
				class="absolute -right-20 -z-20 -top-24"
			/>
		{/if}
	</div>
	{#if isInView}
		<img
			in:fly={{ y: 100, duration: 500 }}
			src="red-vector.png"
			alt="Red Vector"
			class="absolute left-0 top-80"
		/>
		<img
			in:fly={{ y: 100, duration: 500 }}
			src="blue-vector.png"
			alt="Blue Vector"
			class="absolute right-0 top-16"
		/>
		<img src="bg.png" class="top-0 w-screen h-screen absolute -z-30" alt="" />
	{/if}
</section>

<style>
	.link {
		@apply font-bold text-black hover:text-secondary transition-colors duration-300 ease-in-out;
	}
</style>
