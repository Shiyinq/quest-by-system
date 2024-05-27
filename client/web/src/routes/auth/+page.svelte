<script lang="ts">
	import { userId } from '$lib/store';
	import { goto } from '$app/navigation';

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
	<div class="dialog">
		<div class="form-title">
			<h2>LOGIN</h2>
		</div>
		<div class="form">
			<input
				class="nb-input default"
				placeholder="ID Telegram"
				value={initialUserId}
				on:change={setUserId}
			/>
		</div>
		<div class="form-button">
			<button class="nb-button blue" on:click={login}>LOGIN</button>
		</div>
	</div>
</div>

<style>
	.card-container {
		justify-content: center;
		height: 100vh;
	}

	.form-title {
		text-align: center;
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

	.form-button button {
		width: 100%;
		margin-bottom: 12px;
	}
</style>
