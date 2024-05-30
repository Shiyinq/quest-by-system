<script>
	import '../app.css';
	import { userId } from '$lib/store';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import SplashScreen from '$lib/components/SplashScreen.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let showSplash = true;
	onMount(() => {
		if (!$userId) {
			goto('/auth');
		}
		setTimeout(() => {
			showSplash = false;
		}, 3000);
	});
</script>

{#if showSplash}
	<SplashScreen show={showSplash} />
{/if}

{#if $userId}
	<Header />
{/if}

<slot />

{#if $userId}
	<Footer />
{/if}
