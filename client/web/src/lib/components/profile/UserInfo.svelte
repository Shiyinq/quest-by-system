<script>
	export let userInfo;
</script>

<div class="dialog user-info">
    <h2>📌 User Information</h2>
    <ul>
        <li>🆔 User ID: {userInfo.userId}</li>
        <li>👤 Name: {userInfo.name}</li>
        <li>🎯 Goal: {userInfo.goal}</li>
        <li>🌐 Source: {userInfo.source}</li>
        <li>📅 Created At: {userInfo.createdAt}</li>
        <li>🕒 Updated At: {userInfo.updatedAt}</li>
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
