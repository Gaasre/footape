<script lang="ts">
	import { page } from '$app/stores';
	import { theme } from '$lib/stores';
	import { fly } from 'svelte/transition';

	let currentTheme: string;

	theme.subscribe((value) => (currentTheme = value));

	const changeTheme = () => {
		theme.set(currentTheme == 'dark' ? 'pastel' : 'dark');
	};
</script>

<div class="navbar bg-base-100">
	<div class="flex-1">
		<a class="btn btn-ghost" href="/">
			<img src="/logo.png" width="120" alt="Logo" />
		</a>
	</div>
	<div class="flex-none gap-4">
		<!-- <div class="flex">
			<button on:click={changeTheme} class:btn-base={currentTheme == 'dark'} class:btn-warning={currentTheme == 'light'} class="btn btn-circle btn-sm transition-all duration-200 ease-in-out relative overflow-hidden">
				{#if currentTheme == 'light'}
					<i in:fly={{y:20}} out:fly={{y:-20}} class="fi fi-br-brightness mt-1 text-sm absolute" />
				{:else}
					<i in:fly={{y:20}} out:fly={{y:-20}} class="fi fi-br-moon mt-1 text-sm absolute" />
				{/if}
			</button>
		</div> -->
		<div class="dropdown dropdown-end">
			<label tabindex="0" class="btn btn-ghost btn-circle avatar">
				<div class="w-10 rounded-full">
					<img src={$page.data.fullUser?.image} />
				</div>
			</label>
			<ul
				tabindex="0"
				class="menu menu-compact dropdown-content bg-base-300 mt-3 p-2 shadow bg-base-100 rounded-box w-52"
			>
				<li>
					<a>
						{$page.data.fullUser?.firstname}
						{$page.data.fullUser?.lastname}
					</a>
					<a href="/dashboard/profile"> Profile </a>
				</li>
				<li><a href="/logout">Logout</a></li>
			</ul>
		</div>
	</div>
</div>
