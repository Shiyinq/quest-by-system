<script>
    export let title = "";
    export let quest = {
		inProgress: 0,
		completed: 0,
		notCompleted: 0
	};
</script>

<div class="dialog task-category">
    <h2>{title}</h2>
    <ul>
        <li>In Progress: {quest.inProgress}</li>
        <li>Completed: {quest.completed}</li>
        <li>Not Completed: {quest.notCompleted}</li>
    </ul>
</div>

<style>
    .dialog {
		width: 480px;
		padding: 20px;
		border-radius: 10px;
		margin-bottom: 20px;
	}

	.dialog h2 {
		margin: 0 0 10px;
		color: #0077b6;
	}

	h2 {
		font-size: 24px;
		margin-top: 30px;
		margin-bottom: 10px;
		color: #0077b6;
	}
</style>
