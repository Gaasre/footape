<script lang="ts">
	export let isConnected: boolean;
</script>

<div class="bg-base-200">
	<div
		id="header"
		class="py-6 flex items-center justify-between mx-auto max-w-4xl lg:max-w-6xl z-10 relative bg-base-200"
	>
		<a class="btn btn-ghost" href="/">
			<img src="/logo.png" width="120" alt="Logo">
		</a>
		<div class="flex space-x-10">
			<a class="btn btn-ghost" href="/">Home</a>
			<a class="btn btn-ghost" href="/#features">Features</a>
			<a class="btn btn-ghost" href="/#pricing">Pricing</a>
		</div>
		{#if isConnected}
			<div class="flex items-center">
				<a href="/dashboard" class="btn btn-primary"> Dashboard </a>
			</div>
		{:else}
			<div class="flex items-center space-x-5">
				<a class="btn btn-ghost" href="/login"> Sign In</a>
				<a href="/login" class="btn btn-primary"> Get Started </a>
			</div>
		{/if}
	</div>
</div>
