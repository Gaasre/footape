<script lang="ts">
	import { fly } from 'svelte/transition';
	import { inview } from 'svelte-inview';

	let isInView: boolean;
</script>

<section id="services" class="mt-48" use:inview={{ unobserveOnEnter: true }}
on:change={({ detail }) => {
	isInView = detail.inView;
}}>
	{#if isInView}
		<p class="font-bold text-[40px] text-center max-w-2xl mx-auto mb-20">
			Everything you need for a smooth video creation
		</p>
		<div class="relative">
			<div
				class="flex space-x-16 justify-center"
			>
				<div class="text-center" in:fly={{ y: 100, duration: 500 }}>
					<img src="collaborate.png" alt="Collaborate seamlessly" class="mx-auto mb-8" />
					<p class="font-bold text-2xl mb-2">Collaborate seamlessly</p>
					<p class="max-w-xs text-center font-bold text-gray/70">
						Work together effortlessly, <br />with centralized communication <br />and resources
					</p>
				</div>
				<div class="text-center" in:fly={{ y: 100, duration: 800 }}>
					<img src="track.png" alt="Track your progress" class="mx-auto mb-8" />
					<p class="font-bold text-2xl mb-2">Track your progress</p>
					<p class="max-w-xs text-center font-bold text-gray/70">
						Visualize your workflow, <br />manage time and expenses, <br />and stay on track
					</p>
				</div>
				<div class="text-center" in:fly={{ y: 100, duration: 1100 }}>
					<img src="simplify.png" alt="Simplify your workflow" class="mx-auto mb-8" />
					<p class="font-bold text-2xl mb-2">Simplify your workflow</p>
					<p class="max-w-xs text-center font-bold text-gray/70">
						Streamline tasks and automate <br />workflows, reducing the need <br />for extra tools
					</p>
				</div>
				<div class="text-center" in:fly={{ y: 100, duration: 1400 }}>
					<img src="analyze.png" alt="Analyze your performance" class="mx-auto mb-8" />
					<p class="font-bold text-2xl mb-2">Analyze your performance</p>
					<p class="max-w-xs text-center font-bold text-gray/70">
						Track channel performance, <br />identify areas for improvement, <br />and make
						data-driven decisions
					</p>
				</div>
			</div>

			<img
				src="bg-services.png"
				class="-top-40 w-screen h-[650px] absolute -z-30"
				alt="services background"
				in:fly={{ y: 100, duration: 300 }}
			/>
		</div>
	{/if}
</section>
