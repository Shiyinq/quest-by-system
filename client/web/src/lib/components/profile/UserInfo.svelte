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
