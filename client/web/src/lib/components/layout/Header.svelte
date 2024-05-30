<script lang="ts">
	import { goto } from '$app/navigation';
	import { theme, userId, activeMenu } from '$lib/store';
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

	const menuClicked = (name: string) => {
		activeMenu.set(name);
	};
</script>

<header class="card-container" transition:slide={{ duration: 1000 }}>
	<div class="dialog">
		<div class="toggle-theme">
			<!-- svelte-ignore a11y-invalid-attribute -->
			<a href="#" title="Theme" on:click={toggleThemes}>{light ? '🌞' : '🌙'}</a>
		</div>
		<div class="navigation">
			<a href="/" class={$activeMenu == '/' ? 'active-menu' : ''} on:click={() => menuClicked('/')}
				>🏠 Home</a
			>
			<a
				href="/quests"
				class={$activeMenu == '/quests' ? 'active-menu' : ''}
				on:click={() => menuClicked('/quests')}>🎯 Quests</a
			>
			<a
				href="/profile"
				class={$activeMenu == '/profile' ? 'active-menu' : ''}
				on:click={() => menuClicked('/profile')}>👤 Profile</a
			>
		</div>
		<div class="logout-desktop">
			<!-- svelte-ignore a11y-invalid-attribute -->
			<a href="#" class="logout" on:click={logout}>↪️ Logout</a>
		</div>
		<div class="logout-mobil">
			<!-- svelte-ignore a11y-invalid-attribute -->
			<a href="#" class="logout" on:click={logout}>↪️</a>
		</div>
	</div>
</header>

<style>
	.card-container {
		margin-bottom: 86px;
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

	.logout {
		color: red;
		border: 3px solid #000000;
		padding: 5px 10px;
		text-decoration: none;
		border-radius: 4px;
	}

	.logout:hover {
		color: white;
		background-color: darkred;
	}

	.logout-mobil {
		display: none;
	}

	@media (max-width: 480px) {
		.card-container {
			margin-bottom: 70px;
		}

		.dialog {
			width: 90%;
			height: 65px;
		}

		.logout-desktop {
			display: none;
		}

		.logout-mobil {
			display: block;
		}
	}
</style>
