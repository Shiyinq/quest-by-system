<script lang="ts">
	import { page } from '$app/stores';
	import { numberToEmoji } from '$lib/utils';

	let status = $page.status;
	let description = $page.error?.message || 'Error';
</script>

<svelte:head>
	<title>{status} - {description}</title>
	<meta name="description" content="QUEBYS - Auth" />
</svelte:head>

<div class="card-container">
	<h1>{numberToEmoji(status)}</h1>
	<p>Page {description}. Let's get you back on track!</p>
	<a href="/" class="nb-button blue">🚀 Back to Home</a>
</div>

<style>
	.card-container {
		height: 80vh;
		justify-content: center;
	}
	h1 {
		font-size: 70px;
		margin: 0;
		padding: 0;
	}
</style>
