<script lang="ts">
	import { fly } from 'svelte/transition';
	import { inview } from 'svelte-inview';

	let sectionOneInView: boolean;
	let sectionTwoInView: boolean;
	let sectionThreeInView: boolean;
	let sectionFourInView: boolean;
</script>

<section id="features" class="mt-32 overflow-hidden">
	<p class="font-bold text-4xl sm:text-[40px] text-center mx-auto sm:max-w-lg max-w-sm mb-20">
		The only tool designed for video creation
	</p>
	<div class="flex items-center mb-16 flex-col-reverse sm:flex-row">
		<div class="sm:w-1/2">
			{#if sectionOneInView}
				<div class="sm:w-1/2 sm:float-right px-8" in:fly={{ x: -300, duration: 1500 }}>
					<p class="text-2xl font-bold mb-5">Collaborate effortlessly with <br />your team</p>
					<p class="mb-7">
						Simplify your video creation process and <br />work more effectively with your team
					</p>
					<ul class="space-y-5">
						<li class="flex space-x-10 items-center">
							<i class="fi fi-br-chart-network mt-0.5 text-info text-xl" />
							<p>
								With a <span class="text-info font-bold">centralized platform</span> for
								communication
								<br />and resource sharing, your team can
								<br />
								collaborate with ease
							</p>
						</li>
						<li class="flex space-x-10 items-center">
							<i class="fi fi-br-cloud-share mt-0.5 text-info text-xl" />
							<p>
								<span class="text-info font-bold">Submit</span> video scripts, voice-overs, videos
								and<br /> any other resource directly on the platform
							</p>
						</li>
						<li class="flex space-x-10 items-center">
							<i class="fi fi-br-comment-check mt-0.5 text-info text-xl" />
							<p>
								<span class="text-info font-bold">Get feedback</span> and stay in sync with your
								team,
								<br />all in one place
							</p>
						</li>
					</ul>
				</div>
			{/if}
		</div>
		<div
			class="sm:w-1/2 relative pl-6 sm:pl-0 mb-12"
			use:inview={{ unobserveOnEnter: true, rootMargin: '20%' }}
			on:change={({ detail }) => {
				sectionOneInView = detail.inView;
			}}
		>
			{#if sectionOneInView}
				<img src="bg-func-blue.png" alt="" class="float-right" in:fly={{ x: 100, duration: 1000 }} />
				<img
					src="scriptwriter.png"
					alt=""
					class="absolute top-6 right-32 sm:top-6 sm:right-56 h-12 sm:h-auto"
					in:fly={{ y: 100, duration: 1500 }}
				/>
				<img
					src="voiceover.png"
					alt=""
					class="absolute top-36 right-8 sm:top-28 sm:right-10 h-12 sm:h-auto"
					in:fly={{ y: 100, duration: 1500 }}
				/>
				<img
					src="videoeditor.png"
					alt=""
					class="absolute bottom-40 right-48 h-12 sm:h-auto"
					in:fly={{ y: 100, duration: 2000 }}
				/>
				<img
					src="channelmanager.png "
					alt=""
					class="absolute sm:bottom-10 sm:right-20 bottom-8 right-32 h-12 sm:h-auto"
					in:fly={{ y: 100, duration: 2200 }}
				/>
			{/if}
		</div>
	</div>
	<div class="flex items-center mb-16 flex-col sm:flex-row">
		<div
			class="sm:w-1/2 relative pr-6 sm:pr-0 mb-12"
			use:inview={{ unobserveOnEnter: true, rootMargin: '20%' }}
			on:change={({ detail }) => {
				sectionTwoInView = detail.inView;
			}}
		>
			{#if sectionTwoInView}
				<img src="bg-func-red.png" alt="" class="float-left" in:fly={{ x: -100, duration: 1000 }} />
				<img
					src="voice-col.png"
					alt=""
					class="absolute top-2 left-48 sm:top-0 sm:left-64 sm:h-auto h-[280px]"
					in:fly={{ x: 100, duration: 1000 }}
				/>
				<img
					src="card.png"
					alt=""
					class="absolute bottom-20 left-6 h-[80px] sm:h-auto"
					in:fly={{ y: 100, duration: 1400 }}
				/>
			{/if}
		</div>
		<div class="sm:w-1/2">
			{#if sectionTwoInView}
				<div class="sm:w-1/2 sm:float-left px-8" in:fly={{ x: 300, duration: 1500 }}>
					<p class="text-2xl font-bold mb-5">Stay on track with easy <br />workflow management</p>
					<p class="mb-7">
						With the platform's kanban board, you can easily <br />visualize your video creation
						process and track your <br />progress from start to finish
					</p>
					<ul class="space-y-5">
						<li class="flex space-x-10 items-center">
							<i class="fi fi-br-list-check mt-0.5 text-error text-xl" />
							<p>
								<span class="text-error font-bold">Know exactly</span> which stage each video is in
								and
								<br />who is responsible for each step
							</p>
						</li>
						<li class="flex space-x-10 items-center">
							<i class="fi fi-br-time-check mt-0.5 text-error text-xl" />
							<p>
								<span class="text-error font-bold">Keep track</span> of time taken and expenses
								incurred, <br />and get a clear understanding of any delays
							</p>
						</li>
					</ul>
				</div>
			{/if}
		</div>
	</div>
	<div class="flex items-center mb-16 flex-col-reverse sm:flex-row">
		<div class="sm:w-1/2">
			{#if sectionThreeInView}
				<div class="sm:w-1/2 sm:float-right px-8" in:fly={{ x: -300, duration: 1500 }}>
					<p class="text-2xl font-bold mb-5">Simplify your video creation <br />process</p>
					<p class="mb-7">
						Simplify your workflow and ditch multiple tools and <br />platforms. With the platform,
						you can have <br />everything you need in one place
					</p>
					<ul class="space-y-5">
						<li class="flex space-x-10 items-center">
							<i class="fi fi-br-comment-check mt-0.5 text-success text-xl" />
							<p>
								You can <span class="text-success font-bold">easily manage</span> tasks, deadlines,
								and
								<br />resources all in one location
							</p>
						</li>
						<li class="flex space-x-10 items-center">
							<i class="fi fi-br-play-alt mt-0.5 text-success text-xl" />
							<p>
								The platform's workflow is designed specifically <br />for
								<span class="text-success font-bold">YouTube videos</span>, making it easy to get
								<br />started with your video creation process
							</p>
						</li>
					</ul>
				</div>
			{/if}
		</div>
		<div
			class="sm:w-1/2 relative pl-6 sm:pl-0 mb-12"
			use:inview={{ unobserveOnEnter: true, rootMargin: '20%' }}
			on:change={({ detail }) => {
				sectionThreeInView = detail.inView;
			}}
		>
			{#if sectionThreeInView}
				<img
					src="bg-func-green.png"
					alt=""
					class="float-right"
					in:fly={{ x: 100, duration: 1000 }}
				/>
				<img
					src="allvideos.png"
					alt=""
					class="absolute top-12 -right-3 sm:top-20"
					in:fly={{ y: 100, duration: 1500 }}
				/>
			{/if}
		</div>
	</div>
	<div class="flex items-center pb-20 flex-col sm:flex-row">
		<div
			class="sm:w-1/2 relative pr-6 sm:pr-0 mb-12"
			use:inview={{ unobserveOnEnter: true, rootMargin: '20%' }}
			on:change={({ detail }) => {
				sectionFourInView = detail.inView;
			}}
		>
			{#if sectionFourInView}
				<img
					src="bg-func-yellow.png"
					alt=""
					class="float-left"
					in:fly={{ x: -100, duration: 1000 }}
				/>
				<img
					src="dashboard-outline.png"
					alt=""
					class="absolute top-8 left-16 sm:top-16 sm:left-32 w-3/5 sm:w-auto"
					in:fly={{ y: 100, duration: 1500 }}
				/>
				<img
					src="cpv.png"
					alt=""
					class="absolute sm:w-auto w-[180px] top-4 left-48 sm:top-4 sm:left-80"
					in:fly={{ y: 100, duration: 1500 }}
				/>
				<img
					src="tpv.png"
					alt=""
					class="absolute sm:w-auto w-[180px] top-28 left-0 sm:top-36 sm:left-20"
					in:fly={{ y: 100, duration: 2000 }}
				/>
				<img
					src="vtm.png"
					alt=""
					class="absolute bottom-4 left-48 sm:left-72 sm:w-auto w-[180px]"
					in:fly={{ y: 100, duration: 2000 }}
				/>
			{/if}
		</div>
		<div class="sm:w-1/2">
			{#if sectionFourInView}
				<div class="sm:w-1/2 sm:float-left px-8" in:fly={{ x: 300, duration: 1500 }}>
					<p class="text-2xl font-bold mb-5">
						Gain insights into your video <br />creation process
					</p>
					<p class="mb-7">
						With the platform's analytics, you can analyze the <br />video creation process over
						time
					</p>
					<ul class="space-y-5">
						<li class="flex space-x-10 items-center">
							<i class="fi fi-br-list-check mt-0.5 text-warning text-xl" />
							<p>
								<span class="text-warning font-bold">Track time</span> taken for each step of the process,
								see expenses incurred, and keep track of any delays
							</p>
						</li>
						<li class="flex space-x-10 items-center">
							<i class="fi fi-br-time-check mt-0.5 text-warning text-xl" />
							<p>
								<span class="text-warning font-bold">Use the data</span> provided to identify areas of
								improvement and optimize your video creation process
							</p>
						</li>
					</ul>
				</div>
			{/if}
		</div>
	</div>
</section>
