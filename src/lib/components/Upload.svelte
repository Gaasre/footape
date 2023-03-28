<script lang="ts">
	import axios from 'axios';
	import { uploadFile, progress } from '$lib/stores';
	import { disableScrollHandling, invalidateAll } from '$app/navigation';
	export let video: import('$lib/interfaces').Video;

	let scriptInput: HTMLInputElement;
	let voiceoverInput: HTMLInputElement;
	let videoInput: HTMLInputElement;
	let thumbnailInput: HTMLInputElement;

	let scriptLoading = false;
	let voiceoverLoading = false;
	let videoLoading = false;
	let thumbnailLoading = false;

	let canUpload = true;

	uploadFile.subscribe((value) => (canUpload = value ? false : true));

	const deleteFile = async (filetype: string) => {
		if (filetype == 'script') {
			scriptLoading = true;
		} else if (filetype == 'voiceover') {
			voiceoverLoading = true;
		} else if (filetype == 'video') {
			videoLoading = true;
		} else {
			thumbnailLoading = true;
		}

		const res = await fetch(`/upload/${video.id}`, {
			method: 'DELETE',
			body: JSON.stringify({ filetype })
		});

		if (res.ok) {
			await invalidateAll();
		}

		if (filetype == 'script') {
			scriptLoading = false;
		} else if (filetype == 'voiceover') {
			voiceoverLoading = false;
		} else if (filetype == 'video') {
			videoLoading = false;
		} else {
			thumbnailLoading = false;
		}
	};

	const submitScriptUpload = async () => {
		if (canUpload) {
			scriptLoading = true;
			if (scriptInput.files && scriptInput.files?.length > 0) {
				const file = scriptInput.files[0];
				uploadFile.set(file);

				const nameparts = file.name.split('.');
				const extension = nameparts[nameparts.length - 1];

				const res = await fetch(`/upload/${video.id}`, {
					method: 'POST',
					body: JSON.stringify({ filetype: 'script', extension, contentType: file.type })
				});

				if (res.ok) {
					const { signedURL } = await res.json();

					const uploadRes = await axios.put(decodeURI(signedURL), file, {
						headers: {
							'Content-Type': file.type,
							'x-amz-acl': 'public-read'
						},
						onUploadProgress(progressEvent) {
							progress.set(progressEvent.progress ? progressEvent.progress * 100 : 0);
						}
					});

					if (uploadRes.status == 200) {
						uploadFile.set(null);
						progress.set(0);

						await fetch(`/upload/${video.id}/done`, {
							method: 'POST',
							body: JSON.stringify({ filetype: 'script', extension })
						});

						await invalidateAll();
					}
				}
			}
			scriptLoading = false;
		}
	};

	const submitVoiceoverUpload = async () => {
		if (canUpload) {
			voiceoverLoading = true;
			if (voiceoverInput.files && voiceoverInput.files?.length > 0) {
				const file = voiceoverInput.files[0];
				uploadFile.set(file);

				const nameparts = file.name.split('.');
				const extension = nameparts[nameparts.length - 1];

				const res = await fetch(`/upload/${video.id}`, {
					method: 'POST',
					body: JSON.stringify({ filetype: 'voiceover', extension, contentType: file.type })
				});

				if (res.ok) {
					const { signedURL } = await res.json();

					const uploadRes = await axios.put(decodeURI(signedURL), file, {
						headers: {
							'Content-Type': file.type,
							'x-amz-acl': 'public-read'
						},
						onUploadProgress(progressEvent) {
							progress.set(progressEvent.progress ? progressEvent.progress * 100 : 0);
						}
					});

					if (uploadRes.status == 200) {
						uploadFile.set(null);
						progress.set(0);

						await fetch(`/upload/${video.id}/done`, {
							method: 'POST',
							body: JSON.stringify({ filetype: 'voiceover', extension })
						});

						await invalidateAll();
					}
				}
			}
			voiceoverLoading = false;
		}
	};

	const submitVideoUpload = async () => {
		if (canUpload) {
			videoLoading = true;
			if (videoInput.files && videoInput.files?.length > 0) {
				const file = videoInput.files[0];
				uploadFile.set(file);

				const nameparts = file.name.split('.');
				const extension = nameparts[nameparts.length - 1];

				const res = await fetch(`/upload/${video.id}`, {
					method: 'POST',
					body: JSON.stringify({ filetype: 'video', extension, contentType: file.type })
				});

				if (res.ok) {
					const { signedURL } = await res.json();

					const uploadRes = await axios.put(decodeURI(signedURL), file, {
						headers: {
							'Content-Type': file.type,
							'x-amz-acl': 'public-read'
						},
						onUploadProgress(progressEvent) {
							progress.set(progressEvent.progress ? progressEvent.progress * 100 : 0);
						}
					});

					if (uploadRes.status == 200) {
						uploadFile.set(null);
						progress.set(0);

						await fetch(`/upload/${video.id}/done`, {
							method: 'POST',
							body: JSON.stringify({ filetype: 'video', extension })
						});

						await invalidateAll();
					}
				}
			}
			videoLoading = false;
		}
	};

	const submitThumbnailUpload = async () => {
		if (canUpload) {
			thumbnailLoading = true;
			if (thumbnailInput.files && thumbnailInput.files?.length > 0) {
				const file = thumbnailInput.files[0];
				uploadFile.set(file);

				const nameparts = file.name.split('.');
				const extension = nameparts[nameparts.length - 1];

				const res = await fetch(`/upload/${video.id}`, {
					method: 'POST',
					body: JSON.stringify({ filetype: 'thumbnail', extension, contentType: file.type })
				});

				if (res.ok) {
					const { signedURL } = await res.json();

					const uploadRes = await axios.put(decodeURI(signedURL), file, {
						headers: {
							'Content-Type': file.type,
							'x-amz-acl': 'public-read'
						},
						onUploadProgress(progressEvent) {
							progress.set(progressEvent.progress ? progressEvent.progress * 100 : 0);
						}
					});

					if (uploadRes.status == 200) {
						uploadFile.set(null);
						progress.set(0);

						await fetch(`/upload/${video.id}/done`, {
							method: 'POST',
							body: JSON.stringify({ filetype: 'thumbnail', extension })
						});

						await invalidateAll();
					}
				}
			}
			thumbnailLoading = false;
		}
	};
</script>

<div class="grid grid-cols-2">
	<div class="flex flex-col">
		<label class="label">Script:</label>
		<label class="label">Voice-Over:</label>
		<label class="label">Video:</label>
		<label class="label">Thumbnail:</label>
	</div>
	<div class="flex flex-col gap-4 mt-1.5">
		{#if scriptLoading}
			<progress class="progress w-56 my-2" />
		{:else if video.scriptLink}
			<div class="badge badge-lg text-sm  badge-primary flex gap-4 items-center px-4">
				<i
					on:click={() => deleteFile('script')}
					class="fi fi-br-cross-small mt-1.5 cursor-pointer"
				/>
				<span>Script</span>
				<a href={video.scriptLink} target="_blank">
					<i class="fi fi-br-download cursor-pointer" />
				</a>
			</div>
		{:else}
			<input
				type="file"
				class="file-input file-input-xs file-input-bordered file-input-primary w-full max-w-xs"
				disabled={!canUpload}
				accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, .pdf"
				on:change={() => submitScriptUpload()}
				bind:this={scriptInput}
			/>
		{/if}

		{#if voiceoverLoading}
			<progress class="progress w-56 my-2" />
		{:else if video.voiceOverLink}
			<div class="badge badge-lg text-sm  badge-primary flex gap-4 items-center px-4">
				<i
					on:click={() => deleteFile('voiceover')}
					class="fi fi-br-cross-small mt-1.5 cursor-pointer"
				/>
				<span>Voice-Over</span>
				<a href={video.voiceOverLink} target="_blank">
					<i class="fi fi-br-download cursor-pointer" />
				</a>
			</div>
		{:else}
			<input
				type="file"
				class="file-input file-input-xs file-input-bordered file-input-primary w-full max-w-xs"
				disabled={!canUpload}
				accept="audio/*"
				on:change={() => submitVoiceoverUpload()}
				bind:this={voiceoverInput}
			/>
		{/if}
		{#if videoLoading}
			<progress class="progress w-56 my-2" />
		{:else if video.videoLink}
			<div class="badge badge-lg text-sm  badge-primary flex gap-4 items-center px-4">
				<i
					on:click={() => deleteFile('video')}
					class="fi fi-br-cross-small mt-1.5 cursor-pointer"
				/>
				<span>Video</span>
				<a href={video.videoLink} target="_blank">
					<i class="fi fi-br-download cursor-pointer" />
				</a>
			</div>
		{:else}
			<input
				type="file"
				class="file-input file-input-xs file-input-bordered file-input-primary w-full max-w-xs"
				disabled={!canUpload}
				accept="video/*"
				on:change={() => submitVideoUpload()}
				bind:this={videoInput}
			/>
		{/if}

		{#if thumbnailLoading}
			<progress class="progress w-56 my-2" />
		{:else if video.thumbnailLink}
			<div class="badge badge-lg text-sm  badge-primary flex gap-4 items-center px-4">
				<i
					on:click={() => deleteFile('thumbnail')}
					class="fi fi-br-cross-small mt-1.5 cursor-pointer"
				/>
				<span>Thumbnail</span>
				<a href={video.thumbnailLink} target="_blank">
					<i class="fi fi-br-download cursor-pointer" />
				</a>
			</div>
		{:else}
			<input
				type="file"
				class="file-input file-input-xs file-input-bordered file-input-primary w-full max-w-xs"
				disabled={!canUpload}
				accept="image/*"
				on:change={() => submitThumbnailUpload()}
				bind:this={thumbnailInput}
			/>
		{/if}
	</div>
</div>
