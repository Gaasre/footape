<script lang="ts">
	export let id: string;
	export let firstname: string;
	export let lastname: string;
	export let remove: () => void;
</script>

<input type="checkbox" {id} class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Delete User?</h3>
		<p class="py-4 break-words whitespace-pre-wrap">
			Are you sure you want to remove <b>{firstname} {lastname}</b> from your team ?
		</p>
		<div class="flex flex-row-reverse gap-2">
			<div class="modal-action">
				<label for={id} class="btn btn-ghost">Cancel</label>
			</div>
			<div class="modal-action">
				<label for={id} on:click={remove} on:keypress={remove} class="btn btn-error">Remove</label>
			</div>
		</div>
	</div>
</div>
