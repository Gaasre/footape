<script lang="ts">
	import { Action, Section } from '$lib/enums';
	import type { Member } from '$lib/interfaces';
	import { fly } from 'svelte/transition';
	import { invalidateAll } from '$app/navigation';

	export let visible: boolean;
	export let onClose: () => void;
	export let member: Member;

	let toUpdate: { section: Section; action: Action; memberid: string }[] = [];
	let toDelete: { section: Section; action: Action; memberid: string }[] = [];

	const sections = [Section.Dashboard, Section.Team, Section.Videos];

	const changePermission = (section: Section, action: Action) => {
		if (!hasAction(section, action)) {
			if (localUpdateHasAction(section, action)) {
				toUpdate = toUpdate.filter(
					(value) => !(value.section == section && value.action == action)
				);
			} else {
				toUpdate.push({ section, action, memberid: member.id });
			}
		} else {
			if (localDeleteHasAction(section, action)) {
				toDelete = toDelete.filter(
					(value) => !(value.section == section && value.action == action)
				);
			} else {
				toDelete.push({ section, action, memberid: member.id });
			}
		}
	};

	const savePermissions = async () => {
		const res = await fetch('', {
			method: 'POST',
			body: JSON.stringify({
				toUpdate,
				toDelete
			})
		});

		if (!res.status) {
			return;
		}

		await invalidateAll();

		toDelete = [];
		toUpdate = [];

		onClose()
	};

	const localUpdateHasAction = (section: Section, action: Action) => {
		return !!toUpdate.find((value) => value.section == section && value.action == action);
	};

	const localDeleteHasAction = (section: Section, action: Action) => {
		return !!toUpdate.find((value) => value.section == section && value.action == action);
	};

	let hasAction = (section: Section, action: Action) => {
		return member.permissions[section]?.includes(action);
	};

	$: hasAction = (section: Section, action: Action) => {
		return member.permissions[section]?.includes(action);
	};
</script>

{#if visible}
	<div
		in:fly={{ x: 20 }}
		class="absolute top-0 my-16 mx-8 right-0 max-w-lg w-full h-auto rounded-lg bg-base-300 shadow-lg z-10 p-6"
	>
		<div class="flex items-center mb-4">
			<button class="btn btn-ghost btn-sm btn-circle" on:click={onClose}>
				<i class="fi fi-br-cross-small" />
			</button>
			<h2 class="font-bold text-center grow">Permissions</h2>
		</div>

		<div class="flex items-center space-x-4">
			<div class="avatar">
				<div class="mask mask-squircle w-16 h-16">
					<img src={member.user.image} alt="Avatar Tailwind CSS Component" />
				</div>
			</div>
			<div>
				<h1 class="text-3xl font-bold ">{member.user.firstname} {member.user.lastname}</h1>
				<h2>{member.user.email}</h2>
			</div>
		</div>

		<div class="divider" />

		<div class="space-y-2 mb-8">
			<table class="table table-compact w-full">
				<!-- head -->
				<thead>
					<tr>
						<th>Sections</th>
						<th>View</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{#each sections as section}
						<tr>
							<td>{section}</td>
							<td>
								<label>
									<input
										type="checkbox"
										checked={hasAction(section, Action.View)}
										on:change={() => changePermission(section, Action.View)}
										class="checkbox checkbox-sm"
									/>
								</label>
							</td>
							<td>
								<label>
									<input
										type="checkbox"
										checked={hasAction(section, Action.Edit)}
										on:change={() => changePermission(section, Action.Edit)}
										class="checkbox checkbox-sm"
									/>
								</label>
							</td>
							<td>
								<label>
									<input
										checked={hasAction(section, Action.Delete)}
										on:change={() => changePermission(section, Action.Delete)}
										type="checkbox"
										class="checkbox checkbox-sm"
									/>
								</label>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<div class="float-right">
			<button class="btn btn-primary btn-sm" on:click={savePermissions}> Save Permissions </button>
		</div>
	</div>
{/if}
