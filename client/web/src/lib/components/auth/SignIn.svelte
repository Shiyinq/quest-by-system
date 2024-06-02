<script lang="ts">
	import { userId } from '$lib/store';
	import { goto } from '$app/navigation';

	let initialUserId = '';

	const setUserId = (e: any) => {
		initialUserId = e.target.value;
	};

	const login = () => {
		userId.set(initialUserId);
		goto('/');
	};
</script>

<div class="dialog sign-in">
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
</div>

<style>
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

	.form-button {
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

	.form-button button {
		width: 100%;
		margin-bottom: 12px;
		margin-top: 8px;
		border-radius: 5px;
	}
</style>
