<script lang="ts">
	import supabase from '$lib/supabaseClient';
	import { fly } from 'svelte/transition';

	let email = '';
	let emailSent = false;
	let errorText = '';

	const handleLogin = async () => {
		try {
			const { error } = await supabase.auth.signInWithOtp({
				email
			});

			if (error) throw error;
			emailSent = true;
		} catch (error: any) {
			errorText = error.error_description || error.message;
		}
	};
</script>

<svelte:head>
	<title>Footape - Sign in</title>
	<meta content="Footape - Sign in" property="og:title">
	<meta content="Footape - Sign in" property="twitter:title">
</svelte:head>

<div class="h-screen bg-base-100 flex items-center justify-center">
	<div
		class="bg-base-300 max-w-lg sm:w-1/2 px-6 sm:px-12 lg:px-16 py-16 sm:py-32 rounded-xl mx-6 shadow-xl"
	>
		<h1 class="text-2xl">Login</h1>
		<h2 class="text-3xl sm:text-4xl font-bold">Welcome Back!</h2>
		<p class="font-bold mb-12">Please enter your account details</p>

		{#if emailSent}
			<p class="text-success text-sm text-center mb-2" in:fly={{ y: 50, duration: 500 }}>
				An e-mail has been sent with the login link.
			</p>
		{/if}
		<form on:submit|preventDefault={handleLogin}>
			<input
				type="text"
				placeholder="E-mail"
				name="email"
				class="input input-bordered w-full mb-6"
				bind:value={email}
			/>
			<button type="submit" class="btn btn-primary btn-block mb-8">Continue</button>
		</form>

		<div class="divider">OR LOGIN WITH</div>

		<div class="grid grid-cols-2 gap-4">
			<button class="btn gap-2 btn-warning">
				<i class="fi fi-brands-google" />
				Google
				<div class="badge badge-ghost">Soon</div>
			</button>
			<button class="btn gap-2 btn-accent">
				<i class="fi fi-brands-slack" />
				Slack
				<div class="badge badge-ghost">Soon</div>
			</button>
		</div>
	</div>
</div>
