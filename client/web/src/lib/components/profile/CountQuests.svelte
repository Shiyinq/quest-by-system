<script>
	export let title = '';
	export let quest = {
		in_progress: 0,
		completed: 0,
		not_completed: 0
	};
</script>

<div class="dialog task-category">
	<h2>{title}</h2>
	<ul>
		<li>In Progress: {quest.in_progress}</li>
		<li>Completed: {quest.completed}</li>
		<li>Not Completed: {quest.not_completed}</li>
	</ul>
</div>
