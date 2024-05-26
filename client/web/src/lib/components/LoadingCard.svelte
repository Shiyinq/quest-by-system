<script>
	import { slide } from 'svelte/transition';

	export let text = 'Loading...';
</script>

<div class="dialog" transition:slide={{ duration: 1000 }}>
	<p>{text}</p>
</div>
