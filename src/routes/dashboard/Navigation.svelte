<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { Action, Section } from '$lib/enums';
	import type { Channel } from '$lib/interfaces';
	import { checkPermission } from '$lib/utils';
	import { fly } from 'svelte/transition';
	import DeleteConfirm from './DeleteConfirm.svelte';
	import NewChannel from './NewChannel.svelte';
	let path: string;

	export let channels: Channel[];
	let newChannelVisible = false;
	let limitVisible = false;

	const navigation = [
		{
			target: '/dashboard',
			name: Section.Dashboard,
			icon: 'fi-br-apps'
		},
		{
			target: '/dashboard/team',
			name: Section.Team,
			icon: 'fi-br-chart-tree'
		},
		{
			target: '/dashboard/videos',
			name: Section.Videos,
			icon: 'fi-br-video-camera'
		},
		{
			target: '/dashboard/workflow',
			name: Section.Workflow,
			icon: 'fi-br-checkbox'
		}
		// {
		// 	target: '/dashboard/calendar',
		// 	name: 'Calendar',
		// 	icon: 'fi-br-calendar'
		// }
	];

	$: path = $page.url.pathname;

	const deleteChannel = async (id: string) => {
		const res = await fetch(`/dashboard/channel/${id}`, {
			method: 'DELETE'
		});

		if (res.ok) {
			invalidateAll();
		}
	};

	const addChannel = () => {
		if (canAddChannel()) {
			newChannelVisible = true;
		} else {
			// show error
			limitVisible = true;
			setTimeout(() => (limitVisible = false), 5000);
		}
	};

	const canAddChannel = () => {
		switch ($page.data.fullUser?.subscription) {
			case 'starter':
				if ($page.data.fullUser?.channel_count >= 1) {
					return false;
				}
				return true;
			case 'premium':
				if ($page.data.fullUser?.channel_count >= 3) {
					return false;
				}
				return true;
			case 'entreprise':
				return true;
			default:
				return false;
		}
	};
</script>

{#if limitVisible}
	<div in:fly={{ y: 50 }} out:fly={{ y: 50 }} class="toast">
		<div class="alert alert-error">
			<div>
				<span> You have reached the channels limit of your plan </span>
			</div>
			<a href="/pricing" class="btn btn-ghost">Upgrade now</a>
		</div>
	</div>
{/if}

<div class="text-center my-4">
	<a class="btn btn-ghost gap-4" href="/">
		<img src="/logo.png" height="64" class="w-8" alt="Logo" />
	</a>
</div>
<ul class="bg-base-200 menu menu-compact flex flex-col px-1 p-0 w-52 mt-10">
	{#each navigation as item}
		<li class="mb-1">
			<a class:active={path == item.target} href={item.target}>
				<i class={`fi ${item.icon} mt-1 mx-auto sm:mx-0`} />
				<span class="sm:inline hidden">{item.name}</span>

				{#if item.name != Section.Workflow}
					{#if !checkPermission($page.data.fullUser?.permissions, item.name, Action.View, $page.data.fullUser?.position)}
						<div class="badge badge-error badge-sm gap-2">
							<i class="fi fi-br-lock mt-1" />
						</div>
					{/if}
				{/if}
			</a>
		</li>
	{/each}

	<li class="menu-title mt-6">
		<span class="flex justify-between items-center">
			<span>Channels</span>
			{#if checkPermission($page.data.fullUser?.permissions, Section.Videos, Action.Add, $page.data.fullUser?.position)}
				<button on:click={addChannel} class="btn btn-ghost btn-sm">+</button>
			{/if}
		</span>
	</li>
	{#each channels as channel}
		<li>
			<!-- svelte-ignore a11y-missing-attribute -->
			<a class="flex justify-between">
				<div class="flex items-center gap-3">
					<i class="fi fi-brands-youtube mt-1" />
					<div class="tooltip" data-tip={channel.name}>
						<p class="truncate max-w-[80px]">{channel.name}</p>
					</div>
				</div>
				{#if checkPermission($page.data.fullUser?.permissions, Section.Videos, Action.Delete, $page.data.fullUser?.position)}
					<label
						for={`delete-confirm-${channel.id}`}
						class="btn btn-error btn-outline btn-xs btn-circle"
					>
						<i class="fi fi-br-trash mt-0.5" />
					</label>
					<DeleteConfirm
						remove={() => deleteChannel(channel.id)}
						title={channel.name}
						id={`delete-confirm-${channel.id}`}
					/>
				{/if}
			</a>
		</li>
	{/each}
</ul>
<NewChannel onClose={() => (newChannelVisible = false)} visible={newChannelVisible} />

<style>
	.menu {
		@apply text-[#888f8f] font-semibold;
	}

	.menu .active {
		@apply text-[#4e6e66] bg-[#d4e2df] font-bold;
	}

	.menu .active i {
		@apply text-primary;
	}

	.menu-title {
		@apply uppercase;
	}
</style>
