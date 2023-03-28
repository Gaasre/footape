<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { Action, Section } from '$lib/enums';
	import type { Member } from '$lib/interfaces';
	import { checkPermission } from '$lib/utils';
	import DeleteConfirm from './DeleteConfirm.svelte';
	import EditPermissions from './EditPermissions.svelte';
	import EditUser from './EditUser.svelte';
	export let data: Member[];
	let editVisible = false;
	let permissionsVisible = false;
	let selectedMember: Member;

	const selectMember = (member: Member) => {
		selectedMember = member;
		editVisible = true;
	};

	const selectMemberPermissions = (member: Member) => {
		selectedMember = member;
		permissionsVisible = true;
	};

	const removeMember = async (member: Member) => {
		await fetch(`?id=${member.id}`, {
			method: 'DELETE'
		});

		await invalidateAll();
	};
</script>

<table class="table table-compact w-full">
	<!-- head -->
	<thead>
		<tr>
			<th>Name</th>
			<th>Position</th>
			<th>Rate</th>
			<th>Invitation</th>
			<th>Permissions</th>
			<th />
		</tr>
	</thead>
	<tbody>
		<!-- row 1 -->
		{#each data as member}
			<tr>
				<td>
					<div class="flex items-center space-x-3">
						<div class="avatar">
							<div class="mask mask-squircle w-12 h-12">
								<img src={member.user.image} alt="Avatar" />
							</div>
						</div>
						<div>
							<div class="font-bold">{member.user.firstname} {member.user.lastname}</div>
							<div class="text-sm opacity-50">{member.user.email}</div>
						</div>
					</div>
				</td>
				<td>
					<span class="badge badge-ghost">{member.position}</span>
				</td>
				<td>
					{#if member.position != 'Owner'}
						<span>${member.rate.toLocaleString('en-us')}</span>
						<br />
						<span class="badge badge-secondary badge-sm">{member.frequency}</span>
					{:else}
						-
					{/if}
				</td>
				<td>
					{#if member.user.confirmed_at}
						<div class="badge badge-success">Confirmed</div>
					{:else}
						<div class="badge badge-warning">Pending</div>
					{/if}
				</td>
				<td>
					{#if checkPermission($page.data.fullUser?.permissions, Section.Team, Action.Edit, $page.data.fullUser?.position)}
						{#if member.position != 'Owner'}
							<button class="btn btn-ghost btn-xs" on:click={() => selectMemberPermissions(member)}
								>Details</button
							>
						{:else}
							-
						{/if}
					{:else}
						-
					{/if}
				</td>
				<td>
					{#if member.position != 'Owner'}
						{#if checkPermission($page.data.fullUser?.permissions, Section.Team, Action.Edit, $page.data.fullUser?.position)}
							<button class="btn btn-ghost btn-sm btn-circle" on:click={() => selectMember(member)}>
								<i class="fi fi-br-pencil" />
							</button>
						{/if}
						{#if member.user.id != $page.data.session?.user.id}
							{#if checkPermission($page.data.fullUser?.permissions, Section.Team, Action.Delete, $page.data.fullUser?.position)}
								<label for={`delete-confirm-${member.id}`} class="btn btn-ghost btn-sm btn-circle">
									<i class="fi fi-br-trash" />
								</label>
								<DeleteConfirm
									remove={() => removeMember(member)}
									firstname={member.user.firstname}
									lastname={member.user.lastname}
									id={`delete-confirm-${member.id}`}
								/>
							{/if}
						{/if}
					{/if}
				</td>
			</tr>
		{/each}
	</tbody>
</table>
<EditUser onClose={() => (editVisible = false)} visible={editVisible} member={selectedMember} />
<EditPermissions
	onClose={() => (permissionsVisible = false)}
	visible={permissionsVisible}
	member={selectedMember}
/>
