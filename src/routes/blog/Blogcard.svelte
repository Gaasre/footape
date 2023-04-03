<script lang="ts">
	import type { Blog } from '$lib/interfaces';
	import moment from 'moment';
	export let blog: Blog;
</script>

<a href={`/blog/${blog.slug}`}>
	<div
		class="rounded-lg text-left bg-base-100 hover:bg-base-200 duration-300 ease-in-out transition-all w-full"
	>
		{#if blog.image}
			<img src={blog.image} alt="" class="rounded-lg shadow-lg" />
		{/if}
		<div class=" p-6">
			<div class="mb-2 flex justify-between flex-wrap">
				<div class="flex gap-2">
					{#each blog.categories as chip}
						<div class="badge badge-primary sm:badge-md badge-sm">{chip}</div>
					{/each}
				</div>
				<div class="text-xs font-semibold">{moment(blog.created_at).fromNow()}</div>
			</div>
			<h4 class="text-lg font-bold mb-2">{blog.title}</h4>
			<p class="text-sm mb-4">
				{blog.description}
			</p>
			<div class="flex gap-2 items-center">
				<div class="avatar">
					<div class="w-5 rounded-full">
						<img src="/amine.jpg" alt="author" />
					</div>
				</div>
				<p class="text-xs">Amine</p>
			</div>
		</div>
	</div>
</a>
