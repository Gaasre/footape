<script lang="ts">
	import type { Video, Work } from '$lib/interfaces';
	import moment from 'moment';

	export let video: Video;

	const total = (work: Work) => {
		if (work.member.frequency == 'hourly') {
			return work.loggedhours * work.member.rate;
		} else {
			return work.member.rate;
		}
	};

	const videoCost = () => {
		return video.works.reduce((x, y) => x + total(y), 0);
	};
</script>

<div class="overflow-x-auto">
	<table class="table table-compact w-full">
		<thead>
			<tr>
				<th class="bg-base-200">Name</th>
				<th class="bg-base-200">Role</th>
				<th class="bg-base-200">Start Date</th>
				<th class="bg-base-200">Submission Date</th>
				<th class="bg-base-200">Pay Rate</th>
				<th class="bg-base-200">Logged Hours</th>
				<th class="bg-base-200">Cost</th>
			</tr>
		</thead>
		<tbody>
			{#each video.works as work}
				<tr>
					<td>{work.member.user.firstname} {work.member.user.lastname}</td>
					<td><div class="badge badge-ghost">{work.member.position}</div></td>
					<td>{moment(work.created_at).format('lll')}</td>
					<td>{work.finished_at ? moment(work.finished_at).format('lll') : '-'}</td>
					<td>{work.member.rate}$ {work.member.frequency}</td>
					<td>{work.loggedhours} hour(s)</td>
					<th>{total(work)}$</th>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<th class="bg-warning border-b-0" />
				<th class="bg-warning border-b-0" />
				<th class="bg-warning border-b-0" />
				<th class="bg-warning border-b-0" />
				<th class="bg-warning border-b-0" />
				<th class="bg-warning text-warning-content border-b-0"> Video cost: </th>
				<th class="text-2xl text-warning-content bg-warning border-b-0">{videoCost()}$</th>
			</tr>
		</tfoot>
	</table>
</div>
