<script>
	import '../app.css';
	import { activeMenu, token } from '$lib/store';
	import { navigating } from '$app/stores';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import PreloadingIndicator from './PreloadingIndicator.svelte';
	import SplashScreen from '$lib/components/SplashScreen.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let showSplash = true;
	onMount(() => {
		if (!$token) {
			goto('/auth');
			activeMenu.set('/');
		}else {
			goto($activeMenu);
		}
		setTimeout(() => {
			showSplash = false;
		}, 3000);
	});
</script>

{#if showSplash}
	<SplashScreen show={showSplash} />
{/if}

{#if $navigating}
	<PreloadingIndicator />
{/if}

{#if $token}
	<Header />
{/if}

<slot />

{#if $token}
	<Footer />
{/if}
