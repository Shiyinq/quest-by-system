<script>
	import { slide } from 'svelte/transition';
</script>

<header class="card-container" transition:slide={{ duration: 1000 }}>
	<div class="dialog navigation">
		<a href="/">🏠 Home</a>
		<a href="/quests">🎯 Quests</a>
		<a href="/profile">👤 Profile</a>
	</div>
</header>

<style>
	.navigation {
		padding: 20px;
		display: flex;
		justify-content: center;
		margin-bottom: 20px;
	}

	.navigation a {
		color: #0077b6;
		text-decoration: none;
		margin-right: 20px;
	}

	.navigation a:hover {
		color: #0077b6;
	}
</style>
