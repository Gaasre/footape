<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let plan = false;

	const pricingPlans = [
		{
			monthlyPriceId: 'price_1Moo3eIHpJ2Gf9tLgiP3eaxt',
			monthlyPrice: '$12',
			annualPriceId: 'price_1Moo3eIHpJ2Gf9tLzuaHjf59',
			annualPrice: '$115',
			name: 'Premium',
			channel: '3',
			team: '10',
			videos: '30',
			primary: true,
			hasTrial: false
		},
		{
			monthlyPriceId: 'price_1Moo55IHpJ2Gf9tLQ3bXy8wN',
			monthlyPrice: '$34',
			annualPriceId: 'price_1Moo55IHpJ2Gf9tLqAo1nb2o',
			annualPrice: '$326',
			name: 'Entreprise',
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
		<h1 class="text-4xl sm:text-5xl mx-auto sm:max-w-2xl max-w-sm font-bold mb-4">
			it's easy to Get started
		</h1>
		<p class="mb-12">Choose a plan tailored to your needs</p>
		<div class="flex justify-center">
			<label class="label cursor-pointer gap-6">
				<span
					class="label-text transition-all duration-300"
					class:text-primary={!plan}
					class:font-bold={!plan}>Monthly</span
				>
				<input type="checkbox" class="toggle toggle-primary" bind:checked={plan} />
				<div class="label-text transition-all gap-2 flex items-center">
					<span class:text-primary={plan} class:font-bold={plan}>Yearly</span>
					<span class="badge badge-accent badge-xs">20% OFF</span>
				</div>
			</label>
		</div>
	</div>

	<div class="flex gap-10 justify-center sm:flex-row flex-col items-center">
		<div
			class="border-base-200 border-2
			} px-10 py-8 w-[340px] mx-auto sm:mx-0 rounded-md bg-base-100"
		>
			<div>
				<h2 class="text-2xl text-base-content mb-2">Starter</h2>
				<h1 class="font-bold text-5xl">
					0$
					<span class="text-sm font-normal">/{plan ? 'year' : 'month'}</span>
				</h1>
			</div>
			<div class="divider" />
			<div class="space-y-5 mb-12">
				<p class="flex gap-4">
					<i class="fi fi-br-star text-base-content mt-0.5" />
					<span>Access to <b class="text-base-content font-semibold">Analytics</b></span>
				</p>
				<p class="flex gap-4">
					<i class="fi fi-br-star text-base-content mt-0.5" />
					<span><b class="text-base-content font-semibold">1</b> channel</span>
				</p>
				<p class="flex gap-4">
					<i class="fi fi-br-star text-base-content mt-0.5" />
					<span><b class="text-base-content font-semibold">5</b> team members</span>
				</p>
				<p class="flex gap-4">
					<i class="fi fi-br-star text-base-content mt-0.5" />
					<span
						><b class="text-base-content font-semibold">10</b> videos
						<span class="text-xs">/ month</span></span
					>
				</p>
			</div>
			{#if $page.data.fullUser?.position == 'Owner'}
				<a href="/login" class="btn btn-primary w-full">Get Started</a>
			{/if}
		</div>
		{#each pricingPlans as pricingPlan}
			<div>
				{#if pricingPlan.primary}
					<div
						class="bg-primary text-primary-content text-center text-sm rounded-t-md font-semibold"
					>
						Most Popular
					</div>
				{/if}
				<div
					class={`${
						pricingPlan.primary ? 'border-primary border-2' : 'border-base-200 border-2'
					} px-10 py-8 w-[340px] mx-auto sm:mx-0 rounded-md bg-base-100`}
					class:rounded-t-none={pricingPlan.primary}
				>
					<div>
						<h2 class="text-2xl text-base-content mb-2">{pricingPlan.name}</h2>
						<h1 class="font-bold text-5xl">
							{plan ? pricingPlan.annualPrice : pricingPlan.monthlyPrice}
							<span class="text-sm font-normal">/{plan ? 'year' : 'month'}</span>
						</h1>
					</div>
					<div class="divider" />
					<div class="space-y-5 mb-12">
						<p class="flex gap-4">
							<i class="fi fi-br-star text-base-content mt-0.5" />
							<span>Access to <b class="text-base-content font-semibold">Analytics</b></span>
						</p>
						<p class="flex gap-4">
							<i class="fi fi-br-star text-base-content mt-0.5" />
							<span
								><b class="text-base-content font-semibold">{pricingPlan.channel}</b> channels</span
							>
						</p>
						<p class="flex gap-4">
							<i class="fi fi-br-star text-base-content mt-0.5" />
							<span
								><b class="text-base-content font-semibold">{pricingPlan.team}</b> team members</span
							>
						</p>
						<p class="flex gap-4">
							<i class="fi fi-br-star text-base-content mt-0.5" />
							<span
								><b class="text-base-content font-semibold">{pricingPlan.videos}</b> videos
								<span class="text-xs">/ month</span></span
							>
						</p>
						<!-- <p class="flex gap-4">
		<i class="fi fi-br-star text-success mt-0.5" />
		<span><b class="text-base-content">Chat</b> support</span>
	</p> -->
					</div>
					{#if $page.data.fullUser?.position == 'Owner'}
						{#if pricingPlan.name.toLowerCase() != ($page.data.fullUser?.subscription ?? '').toLowerCase()}
							{#if $page.data.fullUser?.subscription.toLowerCase() != 'starter'}
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
									<button class={`btn btn-primary w-full`}>Change subscription</button>
								</form>
							{:else}
								<button
									on:click={() =>
										checkout(
											plan ? pricingPlan.annualPriceId : pricingPlan.monthlyPriceId,
											pricingPlan.hasTrial
										)}
									class="btn btn-primary w-full"
									>{pricingPlan.hasTrial ? 'Start your 7 days trial' : 'Get Started'}</button
								>
							{/if}
						{:else if $page.data.fullUser?.subscription.toLowerCase() != 'starter'}
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
								<button class="btn btn-primary w-full">Manage</button>
							</form>
						{/if}
					{/if}
				</div>
			</div>
		{/each}
	</div>
</section>
