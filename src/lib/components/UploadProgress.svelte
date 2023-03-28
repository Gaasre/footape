<script lang="ts">
	import { progress, uploadFile } from '$lib/stores';
	import { fly } from 'svelte/transition';

	let file: File | null;
	let progressValue = 0;

	uploadFile.subscribe((value) => (file = value));
	progress.subscribe((value) => (progressValue = value));
</script>

{#if file}
	<div
		in:fly={{ x: 20 }}
		out:fly={{ x: 20 }}
		class="absolute bottom-2 left-2 bg-base-300 text-base-content p-4 rounded-lg shadow-md"
	>
		<h2 class="text-lg font-bold">Upload in progress</h2>
		<p class="text-sm font-semibold">{file.name}</p>
		<progress class="progress progress-primary w-full" value={progressValue} max="100" />
	</div>
{/if}
