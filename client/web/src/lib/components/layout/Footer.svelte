<script>
	import { slide } from 'svelte/transition';
</script>

<div class="footer" transition:slide={{ duration: 1000 }}><p>Keep up the good work! 💪🚀</p></div>

<style>
	.footer {
		margin-top: auto;
		text-align: center;
		font-weight: bold;
	}
	p {
		font-size: 14px;
	}
</style>
