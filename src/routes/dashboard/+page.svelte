<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import type { ChartType } from 'chart.js';
	import uniqolor from 'uniqolor';
	import moment from 'moment';
	import type { PageData } from './$types';

	export let data: PageData;

	let time: HTMLCanvasElement;
	let cost: HTMLCanvasElement;
	let distribution: HTMLCanvasElement;

	const configTime = {
		data: {
			labels: moment.monthsShort(),
			datasets: [
				{
					type: 'line' as ChartType,
					label: 'Average time per video (days)',
					data: data.monthlyTime,
					backgroundColor: 'rgb(75, 192, 192)',
					borderColor: 'rgb(75, 192, 192)',
					tension: 0.1
				}
			]
		},
		options: {
			borderRadius: '10',
			responsive: false,
			maintainAspectRatio: false,
			cutout: '95%',
			spacing: 2,
			scales: {
				x: {
					grid: {
						display: false
					}
				},
				y: {
					grid: {
						display: false
					}
				}
			}
		}
	};

	const configCost = {
		data: {
			labels: moment.monthsShort(),
			datasets: [
				{
					type: 'bar' as ChartType,
					label: 'Monthly cost ($)',
					data: data.monthlyCosts,
					backgroundColor: data.monthlyCosts.map(
						(count) =>
							uniqolor(count * 10, {
								lightness: 70
							}).color
					)
				}
			]
		},
		options: {
			borderRadius: '10',
			responsive: false,
			maintainAspectRatio: false,
			cutout: '95%',
			spacing: 2,
			scales: {
				x: {
					grid: {
						display: false
					}
				},
				y: {
					grid: {
						display: false
					}
				}
			}
		}
	};

	const colors = data.channelsCost?.map(
		() =>
			uniqolor.random({
				lightness: 80
			}).color
	);
	const configDistribution = {
		data: {
			labels: data.channels?.map((channel) => channel.name),
			datasets: [
				{
					type: 'doughnut' as ChartType,
					label: 'Cost Per Video ($)',
					data: data.channelsCost?.map(({ cost }) => cost),
					backgroundColor: colors,
					hoverOffset: 4
				},
				{
					type: 'doughnut' as ChartType,
					label: 'Total Videos',
					data: data.channelsCost?.map(({ videos }) => videos),
					backgroundColor: colors,
					hoverOffset: 4
				}
			]
		},
		options: {
			responsive: false,
			maintainAspectRatio: false
		}
	};

	onMount(() => {
		const ctx = cost.getContext('2d');
		const ctx2 = distribution.getContext('2d');
		const ctx3 = time.getContext('2d');
		// Initialize chart using default config set
		if (ctx) {
			var myChart = new Chart(ctx, configCost);
		}

		if (ctx2) {
			var myChart2 = new Chart(ctx2, configDistribution);
		}

		if (ctx3) {
			var myChart3 = new Chart(ctx3, configTime);
		}
	});
</script>

<svelte:head>
	<title>Footape - Dashboard</title>
	<meta content="Footape - Dashboard" property="og:title" />
	<meta content="Footape - Dashboard" property="twitter:title" />
</svelte:head>

<h1 class="text-3xl font-bold mb-8">Dashboard</h1>
<div class="flex gap-4 mb-6">
	<div class="stats stats-vertical shadow">
		<div class="stat">
			<div class="stat-title">Total videos this month</div>
			<div class="stat-value">{data.totalVideos.count}</div>
			<div class="stat-desc">{data.totalVideos.diff}% {data.totalVideos.label} than last month</div>
		</div>
		<div class="stat">
			<div class="stat-title">Costs this month</div>
			<div class="stat-value">$ {data.totalCost.count}</div>
			<div class="stat-desc">{data.totalCost.diff}% {data.totalCost.label} than last month</div>
		</div>
	</div>
	<div class="stats shadow flex-auto">
		<div class="stat">
			<div class="stat-title">Average Time per Video</div>
			<canvas bind:this={time} class="w-full" height={300} />
		</div>
	</div>
	<div class="stats shadow">
		<div class="stat">
			<div class="stat-title">Channels Overview for the month</div>
			<canvas bind:this={distribution} height="200" />
		</div>
	</div>
</div>
<div class="stats shadow w-full">
	<div class="stat">
		<div class="stat-title">Costs per Month</div>
		<canvas bind:this={cost} class="w-full" height={300} />
	</div>
</div>
