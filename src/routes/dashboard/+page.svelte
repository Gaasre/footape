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

	const currentMonth = new Date().getMonth();

	const configTime = {
		data: {
			labels: moment.monthsShort(),
			datasets: [
				{
					type: 'line' as ChartType,
					label: 'Average time per video (days)',
					data: data.monthlyTime,
					backgroundColor: '#e5e8f06e',
					borderColor: '#7b8cc6',
					tension: 0.3,
					fill: true
				}
			]
		},
		options: {
			plugins: {
				legend: {
					display: false
				}
			},
			borderRadius: '10',
			responsive: false,
			maintainAspectRatio: false,
			cutout: '95%',
			spacing: 2,
			elements: {
				point: {
					pointStyle: false
				}
			},
			scales: {
				x: {
					grid: {
						display: false
					},
					ticks: {
						font: {
							family: 'Quicksand',
							weight: 700
						},
						color: '#888f8f'
					}
				},
				y: {
					grid: {
						display: true,
						color: '#f8f8fa'
					},
					ticks: {
						font: {
							family: 'Quicksand',
							weight: 700
						},
						color: '#888f8f',
						callback: function (value: number, index: number, ticks: any) {
							return value.toFixed(1);
						}
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
					type: 'line' as ChartType,
					label: 'Monthly cost ($)',
					borderColor: '#ebcaa5',
					tension: 0.3,
					fill: true,
					data: data.monthlyCosts,
					backgroundColor: '#fdf7ef'
				}
			]
		},
		options: {
			elements: {
				point: {
					pointStyle: false
				}
			},
			borderRadius: '10',
			responsive: false,
			maintainAspectRatio: false,
			cutout: '95%',
			spacing: 2,
			plugins: {
				legend: {
					display: false
				}
			},
			scales: {
				x: {
					grid: {
						display: false
					},
					ticks: {
						font: {
							family: 'Quicksand',
							weight: 700
						},
						color: '#888f8f'
					}
				},
				y: {
					grid: {
						display: true,
						color: '#f8f8fa'
					},
					ticks: {
						font: {
							family: 'Quicksand',
							weight: 700
						},
						color: '#888f8f',
						callback: function (value: string, index: number, ticks: any) {
							return '$' + value;
						}
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
			<div class="stat-desc flex items-center gap-2">
				<i
					class:text-success={data.totalVideos.label == 'more'}
					class:text-error={data.totalVideos.label == 'less'}
					class="fi fi-br-arrow-trend-up"
				/>
				<span
					><b
						class:text-success={data.totalVideos.label == 'more'}
						class:text-error={data.totalVideos.label == 'less'}>{data.totalVideos.diff}%</b
					>
					{data.totalVideos.label} than last month</span
				>
			</div>
		</div>
		<div class="stat">
			<div class="stat-title">Costs this month</div>
			<div class="stat-value">$ {data.totalCost.count}</div>
			<div class="stat-desc flex items-center gap-2">
				<i
					class:text-success={data.totalCost.label == 'more'}
					class:text-error={data.totalCost.label == 'less'}
					class="fi fi-br-arrow-trend-up"
				/>
				<span
					><b
						class:text-success={data.totalCost.label == 'more'}
						class:text-error={data.totalCost.label == 'less'}>{data.totalCost.diff}%</b
					>
					{data.totalCost.label} than last month</span
				>
			</div>
		</div>
	</div>
	<div class="rounded-md shadow-md shadow-[#e9e9e9] border-[#e9e9e9] border flex-auto p-6">
		<h2 class="text-[#2e4d40] text-xl font-bold mb-4">Average Time per Video</h2>
		<canvas bind:this={time} class="w-full" height={200} />
	</div>
	<div class="rounded-md shadow-md shadow-[#e9e9e9] border-[#e9e9e9] border p-6 flex flex-col">
		<div class="text-[#2e4d40] text-xl font-bold mb-4">Channels Overview</div>
		<div class="h-full flex justify-center items-center">
			<canvas bind:this={distribution} height="200" />
		</div>
	</div>
</div>
<div class="rounded-md shadow-md shadow-[#e9e9e9] border-[#e9e9e9] border flex-auto p-6">
	<div class="text-[#2e4d40] text-xl font-bold mb-4">Monthly costs</div>
	<div class="h-full flex justify-center items-center">
		<canvas bind:this={cost} class="w-full" height={300} />
	</div>
</div>

<style>
	.stat-title {
		@apply text-sm font-semibold text-[#888f8f];
	}
</style>
