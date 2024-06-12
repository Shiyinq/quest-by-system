<script lang="ts">
	import { Radar } from 'svelte-chartjs';
	import {
		Chart as ChartJS,
		RadialLinearScale,
		PointElement,
		LineElement,
		Filler,
		Tooltip,
		Legend
	} from 'chart.js';

	type QuestStatus = {
		in_progress: number;
		completed: number;
		not_completed: number;
	};

	type QuestStats = {
		daily: QuestStatus;
		weekly: QuestStatus;
		monthly: QuestStatus;
		side: QuestStatus;
	};

	ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);
	export let questStats: QuestStats;

	let data = {
		labels: ['Daily', 'Weekly', 'Monthly', 'Side'],
		datasets: [
			{
				label: 'In Progress',
				data: [
					questStats.daily.in_progress,
					questStats.weekly.in_progress,
					questStats.monthly.in_progress,
					questStats.side.in_progress
				],
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1
			},
			{
				label: 'Completed',
				data: [
					questStats.daily.completed,
					questStats.weekly.completed,
					questStats.monthly.completed,
					questStats.side.completed
				],
				backgroundColor: 'rgba(54, 162, 235, 0.2)',
				borderColor: 'rgba(54, 162, 235, 1)',
				borderWidth: 1
			},
			{
				label: 'Not Completed',
				data: [
					questStats.daily.not_completed,
					questStats.weekly.not_completed,
					questStats.monthly.not_completed,
					questStats.side.not_completed
				],
				backgroundColor: 'rgba(255, 206, 86, 0.2)',
				borderColor: 'rgba(255, 206, 86, 1)',
				borderWidth: 1
			}
		]
	};

	let options = {
		scales: {
			r: {
				angleLines: {
					display: false
				},
				suggestedMin: 0,
				suggestedMax: 20
			}
		}
	};
</script>

<div class="dialog">
	<h2>📊 Stats</h2>
	<Radar {data} {options} />
</div>
