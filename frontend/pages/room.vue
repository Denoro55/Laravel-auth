<template>
	<!--<div class="content">-->
		<!--<div class="room">-->
			<!--<div class="room__id mb-3">-->
				<!--Room #{{ chatUser.room }}-->
			<!--</div>-->
			<!--<div class="room__messager mb-5">-->
				<!--<div class="messager mb-2">-->
					<!--<div class="messager__list" ref="messager">-->
						<!--<Message v-for="m in messages"-->
						         <!--:key="m.id"-->
						         <!--:name="m.name"-->
						         <!--:avatar="m.avatar"-->
						         <!--:owner="m.d_id === chatUser.id"-->
						         <!--:text="m.text" />-->
					<!--</div>-->
				<!--</div>-->
			<!--</div>-->
			<!--<div class="room__form">-->
				<!--<div class="chat-form">-->
					<!--<ChatForm />-->
				<!--</div>-->
			<!--</div>-->
		<!--</div>-->
	<!--</div>-->
	<div class="content messages">
		<div class="messages__header">
			<v-toolbar color="green" dark>
				<v-icon class="mr-4">mdi-drama-masks</v-icon>
				<v-toolbar-title>
					<div class="room-id">Room #{{ chatUser.room }}</div>
				</v-toolbar-title>
				<div class="flex-grow-1"></div>
				<v-btn icon>
					<v-icon>mdi-magnify</v-icon>
				</v-btn>
			</v-toolbar>
		</div>
		<div class="messages__content">
			<template>
				<v-list three-line>
					<template v-for="(item, index) in messages">
						<v-subheader class="d-none"
						             v-if="item.header"
						             :key="item.id"
						             v-text="item.header"
						></v-subheader>
						<v-list-item v-else :key="item.title">
							<v-list-item-avatar class="mr-4">
								<v-img :src="getUserImage(item)" onerror="default_user_avatar.png"></v-img>
							</v-list-item-avatar>
							<v-list-item-content>
								<v-list-item-title v-html="item.name"></v-list-item-title>
								<v-list-item-subtitle>
									{{item.text}}
								</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
					</template>
				</v-list>
			</template>
		</div>
		<div class="messages__input">
			<v-textarea
					v-model="text"
					@keydown.enter.prevent="sendMessage"
					label="Message"
					outlined
					rows="1"
					row-height="15"
			>
			</v-textarea>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	import Message from '@/components/Message';
	import ChatForm from '@/components/ChatForm';
	export default {
		layout: 'chat',
		components: {
			Message,
			ChatForm
		},
		head() {
			return {
				title: `Room #${this.chatUser.room}`
			}
		},
		data: () => ({
			text: ''
		}),
		middleware: 'chat',
		computed: mapState(['chatUser', 'messages']),
		methods: {
			sendMessage() {
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
			},
			getUserImage(item) {
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
		}
		// watch: {
		// 	messages (newCount, oldCount) {
		// 		setTimeout(() => {
		// 			this.$refs.messager.scrollTop = this.$refs.messager.scrollHeight;
		// 		});
		// 		console.log(this.messages);
		// 	}
		// },
		// created() {
		// 	console.log(this.messages);
		// }
	}
</script>

<style lang="scss" scoped>
	.messager__list {
		max-height: 420px;
		padding-right: 20px;
		overflow-y: auto;
	}

	.room-id {
		font-size: 16px;
	}
</style>