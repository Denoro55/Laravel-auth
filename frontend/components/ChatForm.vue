<template>
	<div>
		<v-text-field @keydown.enter="send()"
		              label="Write your message"
		              outlined
		              v-model="text"
		></v-text-field>
	</div>
</template>

<script>
	export default {
		data: () => ({
			text: 'User test message'
		}),
		methods: {
			send() {
				// console.log(this.$store.state)
				this.$socket.emit('createMessage', {
					text: this.text,
					name: this.$store.state.auth.user.name,
					id: this.$store.state.chatUser.id,
					avatar: this.$store.state.auth.user.image_url
				}, data => {
					if (typeof data === 'string') {
						console.error(data);
					} else {
						this.text = '';
					}
				})
			}
		}
	}
</script>


<style scoped>

</style>