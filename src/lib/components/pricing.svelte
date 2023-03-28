<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { dataset_dev } from 'svelte/internal';

	let plan = false;

	const pricingPlans = [
		{
			monthlyPriceId: 'price_1Moo1sIHpJ2Gf9tL5uqNTLc9',
			monthlyPrice: '$49.99',
			annualPriceId: 'price_1Moo1sIHpJ2Gf9tLCarOybsh',
			annualPrice: '$359.99',
			name: 'Starter',
			channel: 'One',
			team: 'Five',
			videos: '10',
			primary: false,
			hasTrial: true
		},
		{
			monthlyPriceId: 'price_1Moo3eIHpJ2Gf9tLgiP3eaxt',
			monthlyPrice: '$84.99',
			annualPriceId: 'price_1Moo3eIHpJ2Gf9tLzuaHjf59',
			annualPrice: '$611.92',
			name: 'Standard',
			channel: 'Three',
			team: 'Ten',
			videos: '30',
			primary: true,
			hasTrial: false
		},
		{
			monthlyPriceId: 'price_1Moo55IHpJ2Gf9tLQ3bXy8wN',
			monthlyPrice: '$213.99',
			annualPriceId: 'price_1Moo55IHpJ2Gf9tLqAo1nb2o',
			annualPrice: '$1,539.99',
			name: 'Premium',
			channel: 'Unlimited',
			team: 'Unlimited',
			videos: 'Unlimited',
			primary: false,
			hasTrial: false
		}
	];

	const checkout = async (priceId: string, trial: boolean) => {
		await fetch('/api/checkout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ priceId, trial })
		})
			.then((data) => {
				if (data.redirected) {
					goto(data.url);
				} else {
					return data.json();
				}
			})
			.then((data) => {
				if (data) window.location.replace(data.url);
			});
	};
</script>

<section class="bg-base-300 py-28" id="pricing">
	<div class="text-center mb-12">
		<h1 class="text-5xl font-bold mb-4">it's easy to Get started</h1>
		<p class="mb-12">Choose a plan tailored to your needs</p>
		<div class="flex justify-center">
			<label class="label cursor-pointer gap-6">
				<span
					class="label-text transition-all duration-300"
					class:text-white={!plan}
					class:font-bold={!plan}>Monthly</span
				>
				<input type="checkbox" class="toggle toggle-secondary" bind:checked={plan} />
				<div class="label-text transition-all gap-2 flex items-center">
					<span class:text-white={plan} class:font-bold={plan}>Yearly</span>
					<span class="badge badge-primary badge-xs">40% OFF</span>
				</div>
			</label>
		</div>
	</div>

	<div class="flex gap-10 justify-center">
		{#each pricingPlans as pricingPlan}
			<div
				class={`${
					pricingPlan.primary ? 'bg-primary text-primary-content' : 'bg-base-200 text-base-content'
				} px-10 py-8 border border-white/10 w-[340px]`}
			>
				<div>
					<h2 class="text-2xl text-white mb-2">{pricingPlan.name}</h2>
					<h1 class="font-bold text-5xl text-white">
						{plan ? pricingPlan.annualPrice : pricingPlan.monthlyPrice}
						<span class="text-sm font-normal text-base-content">/{plan ? 'year' : 'month'}</span>
					</h1>
				</div>
				<div class="divider" />
				<div class="space-y-5 mb-12">
					<p class="flex gap-4">
						<i class="fi fi-br-star text-success mt-0.5" />
						<span>Access to <b class="text-white">Analytics</b></span>
					</p>
					<p class="flex gap-4">
						<i class="fi fi-br-star text-success mt-0.5" />
						<span><b class="text-white">{pricingPlan.channel}</b> channel</span>
					</p>
					<p class="flex gap-4">
						<i class="fi fi-br-star text-success mt-0.5" />
						<span><b class="text-white">{pricingPlan.team}</b> team members</span>
					</p>
					<p class="flex gap-4">
						<i class="fi fi-br-star text-success mt-0.5" />
						<span
							><b class="text-white">{pricingPlan.videos}</b> videos
							<span class="text-xs">/ month</span></span
						>
					</p>
					<!-- <p class="flex gap-4">
					<i class="fi fi-br-star text-success mt-0.5" />
					<span><b class="text-white">Chat</b> support</span>
				</p> -->
				</div>
				{#if pricingPlan.name.toLowerCase() != ($page.data.fullUser?.subscription ?? '').toLowerCase()}
					{#if $page.data.fullUser?.subscription}
						<form
							method="POST"
							action={`/dashboard/profile?/portal`}
							class="space-y-4"
							use:enhance={() => {
								return async ({ result, update }) => {
									update({ reset: false });
								};
							}}
						>
							<button class="btn btn-ghost btn-outline w-full">Change subscription</button>
						</form>
					{:else}
						<button
							on:click={() =>
								checkout(plan ? pricingPlan.annualPriceId : pricingPlan.monthlyPriceId, pricingPlan.hasTrial)}
							class="btn btn-ghost btn-outline w-full"
							>{pricingPlan.hasTrial ? 'Start your 7 days trial' : 'Get Started'}</button
						>
					{/if}
				{:else}
					<form
						method="POST"
						action={`/dashboard/profile?/portal`}
						class="space-y-4"
						use:enhance={() => {
							return async ({ result, update }) => {
								update({ reset: false });
							};
						}}
					>
						<button class="btn btn-ghost btn-outline w-full">Manage</button>
					</form>
				{/if}
			</div>
		{/each}
	</div>
</section>
