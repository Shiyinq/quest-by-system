<script>
	const signUp = () => {
		console.log('Sign up');
	};
</script>

<div class="dialog sign-up">
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
		<button class="nb-button blue" on:click={signUp}>Sign up</button>
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
