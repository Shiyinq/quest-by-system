<script>
	import { userId } from '$lib/store';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		if (!$userId) {
			goto('/auth');
		}
	});
</script>

{#if $userId}
	<Header />
{/if}

<slot />

{#if $userId}
	<Footer />
{/if}
