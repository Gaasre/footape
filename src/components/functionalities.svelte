<script lang="ts">
	import { fly } from 'svelte/transition';
	import { inview } from 'svelte-inview';

	let sectionOneInView: boolean;
	let sectionTwoInView: boolean;
	let sectionThreeInView: boolean;
	let sectionFourInView: boolean;
</script>

<section id="features" class="mt-32">
	<p class="font-bold text-[40px] text-center max-w-lg mx-auto mb-20">
		The only tool designed for video creation
	</p>
	<div class="flex items-center mb-16">
		<div class="w-1/2">
			{#if sectionOneInView}
				<div class="w-1/2 float-right" in:fly={{ y: 100, duration: 500 }}>
					<p class="text-2xl font-bold mb-5">Collaborate effortlessly with <br />your team</p>
					<p class="text-dark-gray font-semibold mb-7">
						Simplify your video creation process and <br />work more effectively with your team
					</p>
					<ul class="space-y-5 text-dark-gray font-semibold">
						<li class="flex space-x-10 items-center">
							<i class="fi fi-br-chart-network mt-0.5 text-blue text-xl" />
							<p>
								With a <span class="text-blue font-bold">centralized platform</span> for
								communication
								<br />and resource sharing, your team can
								<br />
								collaborate with ease
							</p>
						</li>
						<li class="flex space-x-10 items-center">
							<i class="fi fi-br-cloud-share mt-0.5 text-blue text-xl" />
							<p>
								<span class="text-blue font-bold">Submit</span> video scripts, voice-overs, videos
								and<br /> any other resource directly on the platform
							</p>
						</li>
						<li class="flex space-x-10 items-center">
							<i class="fi fi-br-comment-check mt-0.5 text-blue text-xl" />
							<p>
								<span class="text-blue font-bold">Get feedback</span> and stay in sync with your
								team,
								<br />all in one place
							</p>
						</li>
					</ul>
				</div>
			{/if}
		</div>
		<div
			class="w-1/2 relative"
			use:inview={{ unobserveOnEnter: true }}
			on:change={({ detail }) => {
				sectionOneInView = detail.inView;
			}}
		>
			{#if sectionOneInView}
				<img src="bg-func-blue.png" alt="" class="float-right" in:fly={{ y: 100, duration: 300 }} />
				<img
					src="scriptwriter.png"
					alt=""
					class="absolute top-6 right-56"
					in:fly={{ y: 100, duration: 500 }}
				/>
				<img
					src="voiceover.png"
					alt=""
					class="absolute top-28 right-10"
					in:fly={{ y: 100, duration: 800 }}
				/>
				<img
					src="videoeditor.png"
					alt=""
					class="absolute bottom-40 right-48"
					in:fly={{ y: 100, duration: 1100 }}
				/>
				<img
					src="channelmanager.png"
					alt=""
					class="absolute bottom-10 right-20"
					in:fly={{ y: 100, duration: 1400 }}
				/>
			{/if}
		</div>
	</div>
	<div class="flex items-center mb-16">
		<div
			class="w-1/2 relative"
			use:inview={{ unobserveOnEnter: true }}
			on:change={({ detail }) => {
				sectionTwoInView = detail.inView;
			}}
		>
			{#if sectionTwoInView}
				<img src="bg-func-red.png" alt="" class="float-left" in:fly={{ y: 100, duration: 300 }} />
				<img
					src="voice-col.png"
					alt=""
					class="absolute top-0 left-64"
					in:fly={{ y: 100, duration: 500 }}
				/>
				<img
					src="card.png"
					alt=""
					class="absolute bottom-20 left-6"
					in:fly={{ y: 100, duration: 800 }}
				/>
			{/if}
		</div>
		<div class="w-1/2">
			{#if sectionTwoInView}
				<div class="w-1/2 float-left" in:fly={{ y: 100, duration: 500 }}>
					<p class="text-2xl font-bold mb-5">Stay on track with easy <br />workflow management</p>
					<p class="text-dark-gray font-semibold mb-7">
						With the platform's kanban board, you can easily <br />visualize your video creation
						process and track your <br />progress from start to finish
					</p>
					<ul class="space-y-5 text-dark-gray font-semibold">
						<li class="flex space-x-10 items-center">
							<i class="fi fi-br-list-check mt-0.5 text-red text-xl" />
							<p>
								<span class="text-red font-bold">Know exactly</span> which stage each video is in
								and
								<br />who is responsible for each step
							</p>
						</li>
						<li class="flex space-x-10 items-center">
							<i class="fi fi-br-time-check mt-0.5 text-red text-xl" />
							<p>
								<span class="text-red font-bold">Keep track</span> of time taken and expenses
								incurred, <br />and get a clear understanding of any delays
							</p>
						</li>
					</ul>
				</div>
			{/if}
		</div>
	</div>
	<div class="flex items-center mb-16">
		<div class="w-1/2">
			{#if sectionThreeInView}
				<div class="w-1/2 float-right" in:fly={{ y: 100, duration: 500 }}>
					<p class="text-2xl font-bold mb-5">Simplify your video creation <br />process</p>
					<p class="text-dark-gray font-semibold mb-7">
						Simplify your workflow and ditch multiple tools and <br />platforms. With the platform,
						you can have <br />everything you need in one place
					</p>
					<ul class="space-y-5 text-dark-gray font-semibold">
						<li class="flex space-x-10 items-center">
							<i class="fi fi-br-comment-check mt-0.5 text-green text-xl" />
							<p>
								You can <span class="text-green font-bold">easily manage</span> tasks, deadlines,
								and
								<br />resources all in one location
							</p>
						</li>
						<li class="flex space-x-10 items-center">
							<i class="fi fi-br-play-alt mt-0.5 text-green text-xl" />
							<p>
								The platform's workflow is designed specifically <br />for
								<span class="text-green font-bold">YouTube videos</span>, making it easy to get
								<br />started with your video creation process
							</p>
						</li>
					</ul>
				</div>
			{/if}
		</div>
		<div
			class="w-1/2 relative"
			use:inview={{ unobserveOnEnter: true }}
			on:change={({ detail }) => {
				sectionThreeInView = detail.inView;
			}}
		>
			{#if sectionThreeInView}
				<img
					src="bg-func-green.png"
					alt=""
					class="float-right"
					in:fly={{ y: 100, duration: 500 }}
				/>
				<img
					src="allvideos.png"
					alt=""
					class="absolute top-20 right-1"
					in:fly={{ y: 100, duration: 800 }}
				/>
			{/if}
		</div>
	</div>
	<div class="flex items-center mb-16">
		<div
			class="w-1/2 relative"
			use:inview={{ unobserveOnEnter: true }}
			on:change={({ detail }) => {
				sectionFourInView = detail.inView;
			}}
		>
			{#if sectionFourInView}
				<img
					src="bg-func-yellow.png"
					alt=""
					class="float-left"
					in:fly={{ y: 100, duration: 500 }}
				/>
				<img
					src="dashboard-outline.png"
					alt=""
					class="absolute top-16 left-32"
					in:fly={{ y: 100, duration: 800 }}
				/>
				<img
					src="cpv.png"
					alt=""
					class="absolute top-4 left-80"
					in:fly={{ y: 100, duration: 1100 }}
				/>
				<img
					src="tpv.png"
					alt=""
					class="absolute top-36 left-20"
					in:fly={{ y: 100, duration: 1400 }}
				/>
				<img
					src="vtm.png"
					alt=""
					class="absolute bottom-4 left-72"
					in:fly={{ y: 100, duration: 1700 }}
				/>
			{/if}
		</div>
		<div class="w-1/2">
			{#if sectionThreeInView}
				<div class="w-1/2 float-left" in:fly={{ y: 100, duration: 500 }}>
					<p class="text-2xl font-bold mb-5">
						Gain insights into your video <br />creation process
					</p>
					<p class="text-dark-gray font-semibold mb-7">
						With the platform's analytics, you can analyze the <br />video creation process over
						time
					</p>
					<ul class="space-y-5 text-dark-gray font-semibold">
						<li class="flex space-x-10 items-center">
							<i class="fi fi-br-list-check mt-0.5 text-yellow text-xl" />
							<p>
								<span class="text-yellow font-bold">Track time</span> taken for each step of the process,
								see expenses incurred, and keep track of any delays
							</p>
						</li>
						<li class="flex space-x-10 items-center">
							<i class="fi fi-br-time-check mt-0.5 text-yellow text-xl" />
							<p>
								<span class="text-yellow font-bold">Use the data</span> provided to identify areas of
								improvement and optimize your video creation process
							</p>
						</li>
					</ul>
				</div>
			{/if}
		</div>
	</div>
</section>
