<template>
	<div class="content messages">
		<div class="messages__header">
			<v-toolbar color="cyan" dark>
				<v-icon class="mr-4">mdi-email-multiple-outline</v-icon>
				<v-toolbar-title>Messages</v-toolbar-title>
				<div class="flex-grow-1"></div>
				<v-btn icon>
					<v-icon>mdi-magnify</v-icon>
				</v-btn>
			</v-toolbar>
		</div>
		<div class="messages__content">
			<template v-if="!mode">
				<v-list three-line>
					<template v-for="(item, index) in messages">
						<v-subheader class="d-none"
						             v-if="item.header"
						             :key="item.id"
						             v-text="item.header"
						></v-subheader>
						<v-divider
								v-else-if="item.divider"
								:key="index"
								:inset="item.inset"
						></v-divider>
						<v-list-item v-else :key="item.title" :to="`messages?user=${item.idd}`">
							<v-list-item-avatar class="mr-4">
								<v-img :src="`img/${item.image_url}`"></v-img>
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
			<template v-else>
				<v-list three-line flat>
					<template v-for="(item, index) in privateMessages">
						<v-subheader class="d-none"
						             v-if="item.header"
						             :key="item.id"
						             v-text="item.header"
						></v-subheader>
						<v-divider
								v-else-if="item.divider"
								:key="index"
								:inset="item.inset"
						></v-divider>
						<v-list-item v-else :key="item.title">
							<v-list-item-avatar class="mr-4">
								<v-img :src="`img/${item.image_url}`"></v-img>
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
				v-model="message"
				@keydown.enter.prevent="sendMessage"
				label="Message"
				outlined
				rows="1"
				row-height="15"
				>
			</v-textarea>
		</div>

		<!--<v-card>-->
			<!--<v-toolbar color="cyan" dark>-->
				<!--<v-icon class="mr-4">mdi-email-multiple-outline</v-icon>-->
				<!--<v-toolbar-title>Messages</v-toolbar-title>-->
				<!--<div class="flex-grow-1"></div>-->
				<!--<v-btn icon>-->
					<!--<v-icon>mdi-magnify</v-icon>-->
				<!--</v-btn>-->
			<!--</v-toolbar>-->
			<!--<template v-if="!mode">-->
				<!--<v-list three-line>-->
					<!--<template v-for="(item, index) in messages">-->
						<!--<v-subheader class="d-none"-->
						             <!--v-if="item.header"-->
						             <!--:key="item.id"-->
						             <!--v-text="item.header"-->
						<!--&gt;</v-subheader>-->
						<!--<v-divider-->
								<!--v-else-if="item.divider"-->
								<!--:key="index"-->
								<!--:inset="item.inset"-->
						<!--&gt;</v-divider>-->
						<!--<v-list-item v-else :key="item.title" :to="`messages?user=${item.idd}`">-->
							<!--<v-list-item-avatar class="mr-4">-->
								<!--<v-img :src="`img/${item.image_url}`"></v-img>-->
							<!--</v-list-item-avatar>-->
							<!--<v-list-item-content>-->
								<!--<v-list-item-title v-html="item.name"></v-list-item-title>-->
								<!--<v-list-item-subtitle>-->
									<!--{{item.text}}-->
								<!--</v-list-item-subtitle>-->
							<!--</v-list-item-content>-->
						<!--</v-list-item>-->
					<!--</template>-->
				<!--</v-list>-->
			<!--</template>-->
			<!--<template v-else>-->
				<!--<v-list three-line flat>-->
					<!--<template v-for="(item, index) in privateMessages">-->
						<!--<v-subheader class="d-none"-->
						             <!--v-if="item.header"-->
						             <!--:key="item.id"-->
						             <!--v-text="item.header"-->
						<!--&gt;</v-subheader>-->
						<!--<v-divider-->
								<!--v-else-if="item.divider"-->
								<!--:key="index"-->
								<!--:inset="item.inset"-->
						<!--&gt;</v-divider>-->
						<!--<v-list-item v-else :key="item.title">-->
							<!--<v-list-item-avatar class="mr-4">-->
								<!--<v-img :src="`img/${item.image_url}`"></v-img>-->
							<!--</v-list-item-avatar>-->
							<!--<v-list-item-content>-->
								<!--<v-list-item-title v-html="item.name"></v-list-item-title>-->
								<!--<v-list-item-subtitle>-->
									<!--{{item.text}}-->
								<!--</v-list-item-subtitle>-->
							<!--</v-list-item-content>-->
						<!--</v-list-item>-->
					<!--</template>-->
				<!--</v-list>-->
				<!--<v-textarea class="mx-5 mt-auto"-->
				            <!--v-model="message"-->
				            <!--@keydown.enter.prevent="sendMessage"-->
						<!--label="Message"-->
						<!--outlined-->
						<!--rows="1"-->
						<!--row-height="15"-->
				<!--&gt;</v-textarea>-->
			<!--</template>-->
		<!--</v-card>-->
	</div>
</template>

<script>
	import {mapMutations, mapState} from 'vuex';
	export default {
		middleware: 'auth',
		async asyncData({ route, $axios, store }) {
			const options = {
				user_id: store.state.auth.user.id,
				companion_id: route.query.user
			};
			if (route.query.user) {
				const messages = await $axios.$post('message/getUserMessages', options);
				return {
					mode: true,
					companionID: route.query.user,
					messages: [],
					companionMessages: messages
				}
			}
			const messages = await $axios.$post('message/getMessages', options);
			console.log(messages)
			return {
				mode: false,
				messages: messages,
				companionMessages: []
			}
		},
		sockets: {
			connect: function () {
				console.log('socket connected')
			}
		},
		data: () => ({
			message: '',
			companionID: null,
			companionMessages: [],
			room_id: null
		}),
		computed: mapState(['privateMessages']),
		methods: {
			...mapMutations(['updatePrivateMessages']),
			async sendMessage() {
				const options = {
					user_id: this.$store.state.auth.user.id,
					companion_id: this.companionID,
					text: this.message,
					room_id: this.room_id
				};
				const response = await this.$axios.$post('message/sendMessage', options);
				// sockets
				this.$socket.emit('createPrivateMessage', {
					message: this.message,
					name: this.$store.state.auth.user.name,
					id: this.$store.state.auth.user.id,
					companion_id: this.companionID,
					avatar: this.$store.state.auth.user.image_url
				}, data => {
					if (typeof data === 'string') {
						console.error(data);
					} else {
						this.message = '';
						console.log('private message has been sent');
					}
				})
			},
			connectSocket() {
				const UserOptions = {
					id: this.$store.state.auth.user.id,
					companion_id: this.companionID,
					name: this.$store.state.auth.user.name
				};
				this.$socket.emit('joinedPrivateUser', UserOptions, data => {
					if (typeof data === 'string') {

					} else {
						this.room_id = data.room_id;
					}
				});
			}
		},
		mounted() {
			const {user} = this.$route.query;
			if (user) {
				this.connectSocket();
			}
			// const UserOptions = {
			// 	id: store.state.auth.user.id
			// };
			// this.$socket.emit('userPrivateLeft', UserOptions, data => {
			// 	if (typeof data === 'string') {
			// 		console.error(data);
			// 	} else {
			//
			// 	}
			// });
		},
		watch: {
			async '$route' (to, from) {
				if (to.query.user) {
					this.updatePrivateMessages([]);
					this.mode = true;
					this.companionID = to.query.user;
					const options = {
						user_id: this.$store.state.auth.user.id,
						companion_id: this.companionID
					};
					const messages = await this.$axios.$post('message/getUserMessages', options);
					this.updatePrivateMessages(messages);
					this.connectSocket();
				} else {
					this.mode = false;
					const UserOptions = {
						id: this.$store.state.auth.user.id
					};
					this.$socket.emit('userPrivateLeft', UserOptions, data => {
						if (typeof data === 'string') {
							console.error(data);
						} else {

						}
					});
				}
			}
		}
	}

</script>

<style lang="scss">
	.messages-header {
		height: 40px;
	}

	.messages {
		display: flex;
		flex-direction: column;
		padding: 0;
		margin-bottom: -40px;

		&__header {
			position: sticky;
			top: 65px;
			height: 100px;
			background-color: #303030;
			padding-top: 35px;
			z-index: 11;

			&:after {
				content: '';
				display: block;
				position: absolute;
				top: -10px;
				height: 10px;
				right: 0;
				left: 0;
				background-color: #303030;
			}
		}

		&__content {
			background-color: #424242;
			flex: 1;
		}

		&__input {
			position: sticky;
			bottom: 65px;
			height: 80px;
			background-color: #303030;
			z-index: 11;
			flex-shrink: 0;

			&:after {
				content: '';
				display: block;
				position: absolute;
				top: 100%;
				height: 40px;
				right: 0;
				left: 0;
				background-color: #303030;
			}
		}

		.v-textarea {
			position: absolute;
			bottom: 0;
			right: 0;
			left: 0;
		}

		.v-list-item__content {
			border-bottom: 1px solid rgba(255, 255, 255, 0.12);
		}

		.v-list-item:last-child {
			.v-list-item__content {
				border-bottom: 0;
			}
		}

		.v-list-item:first-child {
			.v-list-item__content {
				border-bottom: 1px solid rgba(255, 255, 255, 0.12);
			}
		}

		.v-card {
			display: flex;
			flex-direction: column;
			height: 100%;
			overflow: hidden;
		}

		.v-toolbar {
			flex: inherit;
		}

		.v-list {
			overflow-y: auto;
			flex: 1;
			min-height: 0;
			margin-bottom: 20px;
		}

		.v-input__slot {
			margin-bottom: 0;
		}
		
		.v-text-field__details {
			display: none;
		}

		.v-text-field__slot {
			label {
				left: 5px;
			}
		}
	}

</style>
