<template>
	<div>
		<div class="pt-3 mb-2">
			{{ authenticated }}
		</div>
		<h3>User info</h3>
		<div class="pt-3">
			{{ user }}
		</div>
	</div>
</template>

<script>
	export default {
		middleware: 'auth'
	}
</script>