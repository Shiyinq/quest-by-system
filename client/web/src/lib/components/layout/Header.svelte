<script>
	import { theme } from '$lib/store';
	import { slide } from 'svelte/transition';

	let light = true;
	const toggleThemes = () => {
		light = !light;
		theme.update((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
	};
</script>

<header class="card-container" transition:slide={{ duration: 1000 }}>
	<div class="dialog">
		<div></div>
		<div class="navigation">
			<a href="/">🏠 Home</a>
			<a href="/quests">🎯 Quests</a>
			<a href="/profile">👤 Profile</a>
		</div>
		<div class="toggle-theme">
			{#if light}
				<a href="#" on:click={toggleThemes}>🌞</a>
			{:else}
				<a href="#" on:click={toggleThemes}>🌙</a>
			{/if}
		</div>
	</div>
</header>

<style>
	.dialog {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.navigation {
		display: flex;
		justify-content: flex-end;
	}

	a {
		margin-right: 20px;
	}

	a:hover {
		color: #0077b6;
	}
</style>
