<script lang="ts">
	import { userId } from '$lib/store';
	import { goto } from '$app/navigation';

	let formSignIn = true;
	let initialUserId = localStorage.getItem('userId') || '';

	const setUserId = (e: any) => {
		initialUserId = e.target.value;
	};

	const login = () => {
		localStorage.setItem('userId', initialUserId);
		userId.set(initialUserId);
		goto('/');
	};
</script>

<div class="card-container">
	<div class="dialog sign-in" class:hidden={!formSignIn}>
		<div class="form-title">
			<h2>Sign in to QUEBYS</h2>
		</div>
		<div class="form">
			<p class="label-input">ID Telegram</p>
			<input
				class="nb-input default"
				placeholder="Enter Your ID Telegram"
				value={initialUserId}
				on:change={setUserId}
			/>
		</div>
		<div class="form-button">
			<button class="nb-button blue" on:click={login}>Sign in</button>
		</div>
		<div class="link">
			<!-- svelte-ignore a11y-invalid-attribute -->
			<p class="link-auth">
				Don't have an account? <a href="#" on:click={() => (formSignIn = !formSignIn)}>Sign up</a>
			</p>
		</div>
	</div>

	<div class="dialog sign-up" class:hidden={formSignIn}>
		<div class="form-title">
			<h2>Sign up to QUEBYS</h2>
		</div>
		<div class="form">
			<p class="label-input">Name</p>
			<input class="nb-input default" placeholder="Enter Your Full Name" />
			<p class="label-input">Username</p>
			<input class="nb-input default" placeholder="Enter Your Username" />
			<p class="label-input">Password</p>
			<input class="nb-input default" placeholder="Enter Your Password" type="password" />
		</div>
		<div class="form-button">
			<button class="nb-button blue" on:click={login}>Sign up</button>
		</div>
		<div class="link">
			<!-- svelte-ignore a11y-invalid-attribute -->
			<p class="link-auth">
				Already have an account? <a href="#" on:click={() => (formSignIn = !formSignIn)}>Sign in</a>
			</p>
		</div>
	</div>
</div>

<style>
	.card-container {
		justify-content: center;
		height: 100vh;
	}

	.dialog {
		width: 400px;
	}

	.form-title {
		text-align: center;
		margin-bottom: 30px;
	}
	.form input {
		width: 100%;
		margin-bottom: 12px;
	}

	.form-button,
	.link {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.label-input {
		font-size: 16px;
		font-weight: bold;
		padding: 0px;
		margin: 8px;
	}

	.link-auth {
		font-size: 15px;
	}

	.form-button button {
		width: 100%;
		margin-bottom: 12px;
		margin-top: 8px;
		border-radius: 5px;
	}

	.hidden {
		display: none;
	}
</style>
