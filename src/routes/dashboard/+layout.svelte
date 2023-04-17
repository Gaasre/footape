<script lang="ts">
	import Navigation from './Navigation.svelte';
	import Header from './Header.svelte';
	import UploadProgress from '$lib/components/UploadProgress.svelte';
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';

	export let data: LayoutData;
</script>

<div class="max-h-screen bg-base-100 relative h-screen">
	<div class="bg-base-100 flex gap-2 h-full">
		<div class="bg-base-200 px-4 flex flex-col">
			<div class="grow">
				<Navigation channels={data.channels ?? []} />
			</div>
			<div class="pb-4">
				<a class="flex gap-4 bg-base-200 hover:bg-[#d4e2df] duration-300 ease-in-out transition-all px-2 py-1 rounded-lg mb-2" href="/dashboard/profile">
					<label tabindex="0" class="btn btn-ghost btn-circle avatar">
						<div class="w-10 rounded-full">
							<img src={$page.data.fullUser?.image} />
						</div>
					</label>
					<div class="text-left">
						<p class="badge badge-accent capitalize">
							{$page.data.fullUser?.subscription} Plan
						</p>
						<p class="font-bold">{$page.data.fullUser?.firstname} {$page.data.fullUser?.lastname}</p>
						<p class="text-[#888f8f] text-sm font-semibold">{$page.data.fullUser?.position}</p>
					</div>
				</a>
				<a href="/logout" class="btn flex gap-4 btn-ghost">
					<i class="fi fi-br-sign-out-alt mt-1"></i>
					<b>Logout</b>
				</a>
			</div>
		</div>
		<div
			class="rounded-lg bg-base-100 px-5 py-6 h-full w-[calc(100%-250px)] overflow-y-auto"
		>
			<slot />
		</div>
	</div>
	<UploadProgress />
</div>
