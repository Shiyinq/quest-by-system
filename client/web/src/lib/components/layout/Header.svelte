<script>
	import { goto } from '$app/navigation';
	import { theme, userId } from '$lib/store';
	import { slide } from 'svelte/transition';

	let light = true;
	const toggleThemes = () => {
		light = !light;
		theme.update((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
	};

	const logout = () => {
		localStorage.removeItem('userId');
		userId.set('');
		goto('/auth');
	};
</script>

<header class="card-container" transition:slide={{ duration: 1000 }}>
	<div class="dialog">
		<div class="toggle-theme">
			<!-- svelte-ignore a11y-invalid-attribute -->
			<a href="#" title="Theme" on:click={toggleThemes}>{light ? '🌞' : '🌙'}</a>
		</div>
		<div class="navigation">
			<a href="/">🏠 Home</a>
			<a href="/quests">🎯 Quests</a>
			<a href="/profile">👤 Profile</a>
		</div>
		<div>
			<!-- svelte-ignore a11y-invalid-attribute -->
			<a href="#" class="logout" on:click={logout}>↪️ Logout</a>
		</div>
	</div>
</header>

<style>
	.card-container {
		margin-bottom: 85px;
	}

	.dialog {
		position: fixed;
		z-index: 1000;
	}

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

	.logout {
		color: red;
		/* background-color: lightgray; */
		border: 1px solid lightgray;
		padding: 5px 10px;
		text-decoration: none;
		border-radius: 4px;
	}

	.logout:hover {
		color: white;
		background-color: darkred;
	}
</style>
