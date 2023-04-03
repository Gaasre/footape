<script lang="ts">
	import { fly } from 'svelte/transition';
	import { inview } from 'svelte-inview';

	let isInView: boolean;
</script>

<section id="services" class="mt-24 sm:mt-48">
	<p class="font-bold text-4xl sm:text-[40px] text-center sm:max-w-2xl max-w-sm mx-auto mb-20">
		Everything you need for a smooth video creation
	</p>
	<div class="relative">
		<div
			class="flex gap-16 items-center sm:justify-center relative z-20 sm:flex-row flex-col"
			use:inview={{ unobserveOnEnter: true }}
			on:change={({ detail }) => {
				isInView = detail.inView;
			}}
		>
			{#if isInView}
				<div
					class="text-center mt-6 flex flex-row sm:flex-col items-center px-4 gap-4"
					in:fly={{ x: -200, duration: 1500 }}
				>
					<img
						src="collaborate.png"
						alt="Collaborate seamlessly"
						class="mx-auto sm:w-auto w-24 mb-4"
					/>
					<div>
						<p class="font-bold text-xl mb-2">Collaborate seamlessly</p>
						<p class="max-w-xs text-sm text-center">
							Work together effortlessly, <br />with centralized communication <br />and resources
						</p>
					</div>
				</div>
				<div
					class="text-center flex flex-row sm:flex-col items-center px-4 gap-4"
					in:fly={{ x: -200, duration: 2000 }}
				>
					<img src="track.png" alt="Track your progress" class="mx-auto sm:w-auto w-24 mb-4" />
					<div>
						<p class="font-bold text-xl mb-2">Track your progress</p>
						<p class="max-w-xs text-center text-sm">
							Visualize your workflow, <br />manage time and expenses, <br />and stay on track
						</p>
					</div>
				</div>
				<div
					class="text-center flex flex-row sm:flex-col items-center px-4  gap-4"
					in:fly={{ x: 200, duration: 2000 }}
				>
					<img
						src="simplify.png"
						alt="Simplify your workflow"
						class="mx-auto sm:w-auto w-24 mb-4"
					/>
					<div>
						<p class="font-bold text-xl mb-2">Simplify your workflow</p>
						<p class="max-w-xs text-sm text-center">
							Streamline tasks and automate <br />workflows, reducing the need <br />for extra tools
						</p>
					</div>
				</div>
				<div
					class="text-center mt-6 flex flex-row sm:flex-col items-center px-4 gap-4"
					in:fly={{ x: 200, duration: 1500 }}
				>
					<img
						src="analyze.png"
						alt="Analyze your performance"
						class="mx-auto sm:w-auto w-24 mb-4"
					/>
					<div>
						<p class="font-bold text-xl mb-2">Analyze your performance</p>
						<p class="max-w-xs text-sm text-center">
							Track channel performance, <br />identify areas for improvement, <br />and make
							data-driven decisions
						</p>
					</div>
				</div>
			{/if}
		</div>
	</div>
</section>
