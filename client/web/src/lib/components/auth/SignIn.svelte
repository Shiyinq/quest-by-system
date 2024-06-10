<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { activeMenu, token } from '$lib/store';

	import { jwtDecode } from 'jwt-decode';
	import { Toaster, toast } from 'svelte-sonner';

	export let form: any;

	let username = '';
	let password = '';
	let loading = false;

	const clearValidation = (key: string) => {
		delete form?.errors[key];
	};

	$: if (form) {
		if (form?.status) {
			activeMenu.set('/');
			toast.success(form?.message);
			token.set(form?.access_token);
			goto('/');
		} else {
			toast.error(form?.message);
		}
	}
</script>

<Toaster richColors position="top-center" />
<div class="dialog sign-in">
	<div class="form-title">
		<h2>Sign in to QUEBYS</h2>
	</div>
	<form method="POST" class="form" action="?/signIn" use:enhance>
		<div class="form-field">
			<p class="label-input">Username</p>
			<input
				class="nb-input default"
				placeholder="Enter Your Username"
				name="username"
				bind:value={username}
				on:keydown={() => clearValidation('username')}
			/>
			{#if form?.errors?.username}
				<span>{form?.errors?.username}</span>
			{/if}
		</div>
		<div class="form-field">
			<p class="label-input">Password</p>
			<input
				class="nb-input default"
				placeholder="Enter Your Password"
				name="password"
				type="password"
				bind:value={password}
				on:keydown={() => clearValidation('password')}
			/>
			{#if form?.errors?.password}
				<span>{form?.errors?.password}</span>
			{/if}
		</div>
		<div class="form-button">
			<button class="nb-button blue" disabled={loading} type="submit"
				>{loading ? 'LOADING...' : 'SIGN IN'}</button
			>
		</div>
	</form>
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

	span {
		color: red;
		font-size: 15px;
	}
</style>
