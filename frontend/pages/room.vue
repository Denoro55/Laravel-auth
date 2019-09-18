<template>
	<div class="content">
		<div class="room">
			<div class="room__id mb-3">
				Room #{{ chatUser.room }}
			</div>
			<div class="room__messager mb-5">
				<div class="messager mb-2">
					<div class="messager__list" ref="messager">
						<Message v-for="m in messages" :key="m.id" :name="m.name" :owner="m.d_id === chatUser.id" :text="m.text" />
					</div>
				</div>
			</div>
			<div class="room__form">
				<div class="chat-form">
					<ChatForm />
				</div>
			</div>
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
				title: `Комната ${this.chatUser.room}`
			}
		},
		middleware: 'chat',
		computed: mapState(['chatUser', 'messages']),
		watch: {
			messages (newCount, oldCount) {
				setTimeout(() => {
					this.$refs.messager.scrollTop = this.$refs.messager.scrollHeight;
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.messager__list {
		max-height: 420px;
		padding-right: 20px;
		overflow-y: auto;
	}
</style>