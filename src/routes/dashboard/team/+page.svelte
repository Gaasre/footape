<script lang="ts">
	import TeamTable from './TeamTable.svelte';
	import type { PageData } from './$types';
	import InviteUser from './InviteUser.svelte';
	import { checkPermission } from '$lib/utils';
	import { page } from '$app/stores';
	import { Action, Section } from '$lib/enums';
	import { fly } from 'svelte/transition';

	export let data: PageData;
	let inviteMemberVisible = false;
	let limitVisible = false;

	const inviteMember = () => {
		if (canInviteMembers()) {
			inviteMemberVisible = true;
		} else {
			limitVisible = true;
			setTimeout(() => (limitVisible = false), 5000);
		}
	};

	const canInviteMembers = () => {
		switch ($page.data.fullUser?.subscription) {
			case 'starter':
				if ($page.data.fullUser?.member_count >= 5) {
					return false;
				}
				return true;
			case 'standard':
				if ($page.data.fullUser?.member_count >= 10) {
					return false;
				}
				return true;
			case 'premium':
				return true;
			default:
				return false;
		}
	};

	const previousPage = () => {
		return data.page ? (data.page <= 1 ? 1 : data.page - 1) : 1;
	};

	const nextPage = () => {
		return data.pages ? (data.page >= data.pages ? data.pages : data.page + 1) : 1;
	};
</script>

<svelte:head>
	<title>Footape - Team</title>
	<meta content="Footape - Team" property="og:title" />
	<meta content="Footape - Team" property="twitter:title" />
</svelte:head>

{#if limitVisible}
	<div in:fly={{ y: 50 }} out:fly={{ y: 50 }} class="toast">
		<div class="alert alert-error">
			<div>
				<span> You have reached the members limit of your plan </span>
			</div>
			<button class="btn btn-ghost">Upgrade now</button>
		</div>
	</div>
{/if}
<div class="flex flex-col">
	<div class="flex justify-between mb-12">
		<h1 class="text-3xl font-bold">Team</h1>
		{#if checkPermission($page.data.fullUser?.permissions, Section.Team, Action.Add, $page.data.fullUser?.position)}
			<div class="float-right">
				<button on:click={inviteMember} class="btn btn-primary space-x-2">
					<i class="fi fi-br-user-add" />
					<span>Invite Member</span>
				</button>
			</div>
		{/if}
	</div>
	<div>
		<div class="overflow-y-auto h-[calc(100%-66px)] mb-10">
			<TeamTable data={data.members ?? []} />
		</div>
		<div class="btn-group flex justify-center">
			<a
				href={`?page=${previousPage()}`}
				class="btn btn-primary"
				class:btn-disabled={data.page ? data.page <= 1 : true}>«</a
			>
			<button class="btn btn-primary">Page {data.page}/{data.pages}</button>
			<a
				href={`?page=${nextPage()}`}
				class="btn btn-primary"
				class:btn-disabled={data.pages ? data.page >= data.pages : true}>»</a
			>
		</div>
	</div>
</div>
<InviteUser onClose={() => (inviteMemberVisible = false)} visible={inviteMemberVisible} />
