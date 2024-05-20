<script>
	import Header from "$lib/components/layout/Header.svelte";
	import Footer from "$lib/components/layout/Footer.svelte";

    const userInfo = {
		userId: '123123',
		name: 'Zero',
		goal: 'UI Designer',
		source: 'Telegram',
		createdAt: '5/14/2024 9:17:47 PM',
		updatedAt: '5/14/2024 9:17:47 PM'
	};
</script>

<Header />

<slot />

<Footer userInfo={userInfo}/>
