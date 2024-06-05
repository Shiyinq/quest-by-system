<script lang="ts">
	import { Toaster, toast } from 'svelte-sonner';
	import { userSignUp } from '$lib/apis/users';

	let name = '';
	let username = '';
	let password = '';
	let loading = false;
	let validation: any = {};

	const formValidation = () => {
		let valid = true;
		if (name.trim() == '') {
			valid = false;
			validation['name'] = 'Name is required!';
		}

		if (username.trim() == '') {
			valid = false;
			validation['username'] = 'Username is required!';
		}

		if (password.trim() == '') {
			valid = false;
			validation['password'] = 'Password is required!';
		}

		return valid;
	};

	const signUp = async () => {
		if (!formValidation()) return;
		loading = !loading;
		let data = await userSignUp(name, username, password).catch((err) => {
			loading = !loading;
			toast.error(err.detail || 'Internal Server Error!');
			return;
		});

		if (data) {
			name = '';
			username = '';
			password = '';
			loading = !loading;
			toast.success(data.message);
		}
	};

	const clearValidation = (key: string) => {
		delete validation[key];
	};
</script>

<Toaster richColors position="top-center" />
<div class="dialog sign-up">
	<div class="form-title">
		<h2>Sign up to QUEBYS</h2>
	</div>
	<form class="form">
		<div class="form-field">
			<p class="label-input">Name</p>
			<input
				class="nb-input default"
				placeholder="Enter Your Full Name"
				bind:value={name}
				on:keydown={() => clearValidation('name')}
			/>
			{#if validation.name}
				<span>{validation.name}</span>
			{/if}
		</div>
		<div class="form-field">
			<p class="label-input">Username</p>
			<input
				class="nb-input default"
				placeholder="Enter Your Username"
				bind:value={username}
				on:keydown={() => clearValidation('username')}
			/>
			{#if validation.username}
				<span>{validation.username}</span>
			{/if}
		</div>
		<div class="form-field">
			<p class="label-input">Password</p>
			<input
				class="nb-input default"
				placeholder="Enter Your Password"
				type="password"
				bind:value={password}
				on:keydown={() => clearValidation('password')}
			/>
			{#if validation.password}
				<span>{validation.password}</span>
			{/if}
		</div>
	</form>
	<div class="form-button">
		<button class="nb-button blue" on:click={async () => await signUp()} disabled={loading}
			>{loading ? 'LOADING...' : 'SIGN UP'}</button
		>
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

	span {
		color: red;
		font-size: 15px;
	}
</style>
