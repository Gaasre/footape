<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import type { Channel, Member, User, Video, Work } from '$lib/interfaces';
	import { fly } from 'svelte/transition';
	import moment from 'moment';
	import { Action, Position, Section, Status } from '$lib/enums';
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';
	import Upload from '$lib/components/Upload.svelte';
	import Files from '$lib/components/Files.svelte';

	export let visible: boolean;
	export let video: Video;
	export let onClose: () => void;
	export let user: (User & Member & { teamid: string }) | null;

	let timeLogVisible = false;
	let loggedhours = 0;

	const confirmLogTime = async () => {
		if (loggedhours == 0) {
			timeLogVisible = false;
			return;
		}
		await fetch(`/dashboard/workflow/logtime?id=${video.id}`, {
			method: 'PUT',
			body: JSON.stringify({ loggedhours })
		});

		await invalidateAll();
		timeLogVisible = false;
		loggedhours = 0;
	};

	const finishWork = async () => {
		await fetch(`/dashboard/workflow/done?id=${video.id}`, {
			method: 'PUT'
		});

		await invalidateAll();
	};

	const assign = async () => {
		await fetch(`/dashboard/workflow/assign?id=${video.id}`, {
			method: 'POST'
		});

		await invalidateAll();
	};

	let archiveLoading = false;

	const archiveVideo = async () => {
		archiveLoading = true;
		await fetch(`/dashboard/workflow?id=${video.id}`, {
			method: 'PUT',
			body: JSON.stringify({ status: Status.Archived })
		});

		await invalidateAll();
		archiveLoading = false;
	};

	const unassign = async (workid: string) => {
		await fetch(`/dashboard/workflow/assign?id=${workid}`, {
			method: 'DELETE'
		});

		await invalidateAll();
	};

	$: statusColor = (status: Status) => {
		switch (status) {
			case Status.InScripting:
				return 'badge-ghost';
			case Status.InVoiceOver:
				return 'badge-info';
			case Status.InVideoEditing:
				return 'badge-warning';
			case Status.InQualityCheck:
				return 'badge-accent';
			case Status.ReadyForUpload:
				return 'badge-success';
			case Status.Published:
				return 'badge-secondary';
			default:
				return 'badge-ghost';
		}
	};

	$: isAssignedToMe = () =>
		video.works.find((work) => work.member.id == $page.data.fullUser?.id) ? true : false;

	$: canFinishWork = () => {
		const work = video.works.find((work) => work.member.id == $page.data.fullUser?.id);
		if (work) {
			if (work.finished_at) {
				return false;
			}
			return true;
		}
		return false;
	};

	$: canAssign = () =>
		video.works.find((work) => work.member.position == $page.data.fullUser?.position)
			? false
			: true;

	$: canUnassign = (work: Work) => {
		if (
			$page.data.fullUser?.position == Position.Owner ||
			work.memberid == $page.data.fullUser?.id
		) {
			return true;
		}
		return false;
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
			<h2 class="font-bold text-center grow">Video Details</h2>
		</div>
		<div class="flex items-center space-x-4">
			<div class="avatar">
				<div class="mask mask-squircle w-16 h-16">
					{#if video.thumbnailLink}
						<img src={video.thumbnailLink} alt="Thumbnail" />
					{:else}
						<div class="bg-gray w-16 h-16" />
					{/if}
				</div>
			</div>
			<div>
				<div class="tooltip tooltip-bottom" data-tip={video.title}>
					<h1 class="text-3xl font-bold text-ellipsis overflow-hidden max-w-sm whitespace-nowrap">
						{video.title}
					</h1>
				</div>
				<h2 class="text-gray">{video.channel.name}</h2>
			</div>
		</div>

		<div class="divider" />

		<div class="space-y-4">
			<div class="flex flex-row-reverse">
				{#if video.status == Status.Published}
				<button
					class:loading={archiveLoading}
					on:click={archiveVideo}
					class="btn btn-xs btn-error gap-2"
				>
					<i class="fi fi-br-box mt-0.5" /> <span>Archive</span>
				</button>
			{/if}
			</div>
			{#if isAssignedToMe()}
				<div class="flex flex-row-reverse relative mb-4 gap-2">
					{#if timeLogVisible}
						<div>
							<div class="input-group">
								<input
									bind:value={loggedhours}
									type="number"
									min="0"
									step="1"
									class="input input-bordered input-xs w-20"
								/>
								<button on:click={confirmLogTime} class="btn btn-xs btn-success">confirm</button>
								<button on:click={() => (timeLogVisible = false)} class="btn btn-xs btn-error"
									>cancel</button
								>
							</div>
						</div>
					{:else}
						<button
							on:click={() => (timeLogVisible = true)}
							class="btn btn-warning btn-xs flex gap-2"
						>
							<i class="fi fi-br-clock mt-0.5" />
							<span>Log time</span>
						</button>
					{/if}
					{#if canFinishWork()}
						<button on:click={finishWork} class="btn btn-success btn-xs flex gap-2">
							<i class="fi fi-br-check mt-0.5" />
							<span>Finish work</span>
						</button>
					{/if}
				</div>
			{/if}
			<div class="flex gap-10 items-baseline">
				<label class="text-sm font-semibold text-gray w-28">Assignees</label>
				<div class="flex gap-1 flex-wrap">
					{#each video.works as work}
						<button class="btn btn-secondary btn-xs flex gap-2">
							<img class="mask mask-circle h-4 w-4" src={work.member.user.image} />
							<span
								>{work.member.user.firstname}
								{work.member.user.lastname} - {work.member.position}</span
							>
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							{#if canUnassign(work)}
								<i on:click={() => unassign(work.id)} class="fi fi-br-cross-circle text-xs mt-1" />
							{/if}
						</button>
					{/each}
					{#if canAssign()}
						<button on:click={() => assign()} class="btn btn-accent btn-xs flex gap-2">
							<i class="fi fi-br-add" />
							<span>Assign to me</span>
						</button>
					{/if}
				</div>
			</div>
			<div class="flex gap-10">
				<label class="text-sm font-semibold text-gray w-28">Status</label>
				<div class={`badge ${statusColor(video.status)}`}>
					{video.status}
				</div>
			</div>
			<div class="flex gap-10">
				<label class="text-sm font-semibold text-gray w-28">Creation date</label>
				<p class="text-sm">
					{moment(video.created_at).format('MMMM Do YYYY')}
				</p>
			</div>
			<div class="flex gap-10">
				<label class="text-sm font-semibold text-gray w-28">Publishing date</label>
				<p class="text-sm">
					{video.publishedAt ? moment(video.publishedAt).format('MMMM Do YYYY') : '-'}
				</p>
			</div>
			<div class="flex gap-10">
				<label class="text-sm font-semibold text-gray w-28">Link</label>
				{#if video.youtubeVideoLink}
					<a href={video.youtubeVideoLink} class="btn btn-primary btn-xs items-center gap-2">
						<i class="fi fi-br-play-alt" />
						<span>Youtube</span>
					</a>
				{:else}
					-
				{/if}
			</div>
			<div>
				<label class="text-sm font-semibold text-gray">Notes:</label>
				<p class="text-sm">
					{video.notes}
				</p>
			</div>
		</div>

		<div class="divider" />

		<!-- <Upload {video} /> -->
		<Files {video} />
	</div>
{/if}
