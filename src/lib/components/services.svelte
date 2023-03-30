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

		{#if isInView}
			<svg
				class="-top-40 w-full absolute sm:block hidden fill-base-200"
				in:fly={{ y: 100, duration: 1500 }}
				width="1920"
				height="650"
				viewBox="0 0 1920 650"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M0 0L32.4087 9.56921C248.226 73.2929 470.986 110.558 695.792 120.545V120.545C863.49 127.995 1031.51 118.255 1197.22 91.4776L1281.51 77.8583C1449.99 50.6339 1622.16 56.6238 1788.34 95.4905L1920 126.283V623.759L1626.57 549.66C1182.12 437.423 715.877 444.828 275.213 571.123L0 650V0Z"
				/>
			</svg>
		{/if}
	</div>
</section>
