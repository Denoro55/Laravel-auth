<template>
	<div class="wrap">
		<template>
			<div class="pt-2">
				<v-form v-model="valid">
					<v-text-field class="mb-4" v-model="room_id" :rules="idRules" label="Room ID" required></v-text-field>

					<v-btn :disabled="!valid" color="success" class="mr-4" @click="enterRoom">
						Enter
					</v-btn>

				</v-form>
			</div>
		</template>
	</div>
</template>

<script>
	import {mapMutations} from 'vuex';

	export default {
		head: {
			title: "Страница чата"
		},
		data: () => ({
			room_id: '12',
			valid: false,
			idRules: [
				v => !!v || 'ID is required'
			]
		}),
		sockets: {
			connect: function () {
				console.log('socket connected')
			},
			customEmit: function (data) {
				console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
			}
		},
		methods: {
			...mapMutations(['setUser']),
			customEmit: function () {
				this.$socket.emit('customEmit', {
					data: 'customEmit from client'
				});
			},
			enterRoom() {
				const chatUser = {
					room: this.room_id,
					name: this.$store.state.auth.user.name ? this.$store.state.auth.user.name : 'Guest',
					image_url: this.getUserImage(this.$store.state.auth.user),
					id: this.$store.state.chatUser.id
				};
				this.$socket.emit('joinedUser', chatUser, data => {
					if (typeof data === 'string') {
						console.error(data);
					} else {
						chatUser.id = data.id;
						this.setUser(chatUser);
						this.$router.push('room');
					}
				});
			},
			getUserImage(item) {
				if (!item) {
					return 'default_avatar.png';
				}
				if (item.image_url !== undefined) {
					if (item.image_url) {
						return 'img/' + item.image_url;
					} else {
						return 'default_user_avatar.png';
					}
				} else if (item.name !== 'admin') {
					return 'default_avatar.png';
				}
				return 'images/chat/admin.png';
			}
		},
		mounted() {
			console.log(this.$store.$axios);
		}
	}
</script>

<style scoped>

</style>