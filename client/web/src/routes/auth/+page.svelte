<script lang="ts">
	import SignIn from '$lib/components/auth/SignIn.svelte';
	import SignUp from '$lib/components/auth/SignUp.svelte';
	let formSignIn = true;
	export let form: any;
</script>

<svelte:head>
	<title>Auth</title>
	<meta name="description" content="QUEBYS - Auth" />
</svelte:head>

<div class="card-container">
	<div class:hidden={!formSignIn}>
		<SignIn {form} />
	</div>

	<div class:hidden={formSignIn}>
		<SignUp {form} />
	</div>

	<div class="link">
		<!-- svelte-ignore a11y-invalid-attribute -->
		<p class="link-auth" class:hidden={!formSignIn}>
			Don't have an account? <a href="#" on:click={() => (formSignIn = !formSignIn)}>Sign up</a>
		</p>
		<p class="link-auth" class:hidden={formSignIn}>
			<!-- svelte-ignore a11y-invalid-attribute -->
			Already have an account? <a href="#" on:click={() => (formSignIn = !formSignIn)}>Sign in</a>
		</p>
	</div>
</div>

<style global>
	.card-container {
		justify-content: center;
		height: 100vh;
	}

	.link {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.link-auth {
		font-size: 15px;
	}

	.hidden {
		display: none;
	}
</style>
