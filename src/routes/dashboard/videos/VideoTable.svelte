<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { Action, Section, Status } from '$lib/enums';
	import type { Channel, Video } from '$lib/interfaces';
	import { checkPermission } from '$lib/utils';
	import moment from 'moment';
	import { fly } from 'svelte/transition';
	import DeleteConfirm from './DeleteConfirm.svelte';
	import EditVideo from './EditVideo.svelte';
	import WorkflowCalendar from './WorkflowCalendar.svelte';

	export let data: Video[];
	$: statusColor = (status: Status) => {
		switch (status) {
			case Status.InScripting:
				return 'badge-primary';
			case Status.InVoiceOver:
				return 'badge-info';
			case Status.InVideoEditing:
				return 'badge-warning';
			case Status.InQualityCheck:
				return 'badge-accent';
			case Status.ReadyForUpload:
				return 'badge-secondary';
			case Status.Published:
				return 'badge-success';
			default:
				return 'badge-ghost';
		}
	};
	export let channels: Channel[];

	let editVisible = false;
	let selectedVideo: number;
	let workflowVisible = false;

	const selectWorkflow = (video: number) => {
		selectedVideo = video;
		workflowVisible = true;
	};

	const selectVideo = (video: number) => {
		selectedVideo = video;
		editVisible = true;
	};

	const removeVideo = async (video: Video) => {
		await fetch(`?id=${video.id}`, {
			method: 'DELETE'
		});

		await invalidateAll();
	};
</script>

<table class="table table-compact w-full">
	<!-- head -->
	<thead>
		<tr>
			<th>Title</th>
			<th>Status</th>
			<th>Creation Date</th>
			<th>Script</th>
			<th>Voice Over</th>
			<th>Editing</th>
			<th>Workflow</th>
			<th />
		</tr>
	</thead>
	<tbody>
		{#each data as video, index}
			<tr>
				<td>
					<div class="flex items-center space-x-3">
						<div class="avatar">
							<div class="mask mask-squircle w-14 h-14">
								{#if video.thumbnailLink}
									<img src={video?.thumbnailLink} alt="Thumbnail" />
								{:else}
									<div class="bg-neutral w-14 h-14" />
								{/if}
							</div>
						</div>
						<div>
							<div class="font-bold">{video.title}</div>
							<div class="text-sm opacity-50">{video.channel.name}</div>
						</div>
					</div>
				</td>
				<td>
					<span class={`badge ${statusColor(video.status)}`}>{video.status}</span>
				</td>
				<td>{moment(video.created_at).format('lll')}</td>
				<td>
					<span class={`badge ${video.scriptLink ? 'badge-success' : 'badge-error'}`}
						>{video.scriptLink ? 'Done' : 'To-do'}</span
					>
				</td>
				<td>
					<span class={`badge ${video.voiceOverLink ? 'badge-success' : 'badge-error'}`}
						>{video.voiceOverLink ? 'Done' : 'To-do'}</span
					>
				</td>
				<td>
					<span class={`badge ${video.videoLink ? 'badge-success' : 'badge-error'}`}
						>{video.videoLink ? 'Done' : 'To-do'}</span
					>
				</td>
				<td>
					<button on:click={() => selectWorkflow(index)} class="btn btn-ghost btn-xs"
						>Details</button
					>
				</td>
				<td>
					{#if checkPermission($page.data.fullUser?.permissions, Section.Videos, Action.Edit, $page.data.fullUser?.position)}
						<button class="btn btn-ghost btn-sm btn-circle" on:click={() => selectVideo(index)}>
							<i class="fi fi-br-pencil" />
						</button>
					{/if}
					{#if checkPermission($page.data.fullUser?.permissions, Section.Videos, Action.Delete, $page.data.fullUser?.position)}
						<label for={`delete-confirm-${video.id}`} class="btn btn-ghost btn-sm btn-circle">
							<i class="fi fi-br-trash" />
						</label>
						<DeleteConfirm
							remove={() => removeVideo(video)}
							title={video.title}
							id={`delete-confirm-${video.id}`}
						/>
					{/if}
				</td>
			</tr>
		{/each}
	</tbody>
</table>
{#if workflowVisible}
	<div
		in:fly={{ x: 20 }}
		out:fly={{ x: 20 }}
		class="absolute top-0 my-16 mx-8 right-0 w-fit h-auto rounded-lg bg-base-300 shadow-lg z-10 p-6"
	>
		<div class="mb-4 flex items-center">
			<button class="btn btn-ghost btn-xs btn-circle" on:click={() => (workflowVisible = false)}>
				<i class="fi fi-br-cross-small" />
			</button>
			<h2 class="font-bold text-center grow">Workflow</h2>
		</div>
		<WorkflowCalendar video={data[selectedVideo]} />
	</div>
{/if}
<EditVideo
	onClose={() => (editVisible = false)}
	visible={editVisible}
	video={data[selectedVideo]}
	{channels}
/>
