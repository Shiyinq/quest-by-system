<script>
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		if (!localStorage.userId) {
			goto('/auth');
		}
	});
</script>

{#if localStorage.userId}
	<Header />
{/if}

<slot />

{#if localStorage.userId}
	<Footer />
{/if}
