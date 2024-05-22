<script>
	import Header from "$lib/components/layout/Header.svelte";
	import Footer from "$lib/components/layout/Footer.svelte";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";

    const userInfo = {
		userId: '123123',
		name: 'Zero',
		goal: 'UI Designer',
		source: 'Telegram',
		createdAt: '5/14/2024 9:17:47 PM',
		updatedAt: '5/14/2024 9:17:47 PM'
	};
	onMount(() => {
		if (!localStorage.userId) {
			goto("/auth");
		}else {
			goto("/");
		}
	})
</script>

{#if localStorage.userId}
	<Header />
{/if}

<slot />

{#if localStorage.userId}
	<Footer userInfo={userInfo}/>
{/if}