<template>
	<div class="wrap">
		<div class="friends">
			<div class="friends__nav mb-7">
				<v-btn @click="friends = true" :class="{primary: friends}">Friends</v-btn>
				<v-btn @click="uploadRequests" :class="{primary: !friends}" class="ml-4">Friend requests</v-btn>
			</div>
			<div class="friends__list d-flex">
				<template v-if="friends && friendList">
					<div v-for="item in friendList" class="friends__item friend">
						<v-card width="260">
							<v-list-item class="py-3">
								<div class="friend__avatar mr-3" :style="{backgroundImage: `url(img/${item.image_url})`}">
								</div>
								<v-list-item-content class="py-0">
									<v-list-item-title class="subtitle-2">{{item.name}}</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
							<v-img :src="`img/${item.image_url}`"
									height="164"
							></v-img>

							<v-card-actions>
								<v-btn :to="`user/${item.id}`" text color="blue lighten-1">
									Read
								</v-btn>
								<v-btn :to="`/messages?user=${item.id}`" text color="blue lighten-1">
									Message
								</v-btn>
								<div class="flex-grow-1"></div>
							</v-card-actions>
						</v-card>
					</div>
				</template>
				<template v-if="!friends">
					<div v-for="(item, index) in friendRequests" class="friends__item friend">
						<v-card width="260">
							<v-list-item class="py-3">
								<div class="friend__avatar mr-3" :style="{background: `url(img/${item.image_url})`}">
								</div>
								<v-list-item-content class="py-0">
									<v-list-item-title class="subtitle-2">{{item.name}}</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
							<v-img :src="`img/${item.image_url}`"
							       height="164"
							></v-img>
							<!--<v-card-text>-->
								<!--{{item.status}}-->
							<!--</v-card-text>-->
							<v-card-actions>
								<v-btn @click="confirmFriend(item, index)" text color="success lighten-1">
									Confirm
								</v-btn>
								<v-btn text color="red lighten-1">
									Delete
								</v-btn>
								<div class="flex-grow-1"></div>
							</v-card-actions>
						</v-card>
					</div>

				</template>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		middleware: 'auth',
		asyncData ({ $axios, store }) {
			const options = {
				user_id: store.state.auth.user.id
			};
			if (store.state.auth.user) {
				return $axios.post('user/friends', options)
					.then((res) => {
						let data = res.data;
						return { friendList: data }
					})
			}
			return {
				friendList: []
			}
		},
		data() {
			return {
				friends: true,
				friendRequests: [],
				friendRequestsLoaded: false
			}
		},
		methods: {
			async uploadRequests() {
				if (!this.friendRequestsLoaded) {
					const options = {
						user_id: this.$store.state.auth.user.id
					};
					const friendRequests = await this.$axios.post('user/friendRequests', options);
					this.friendRequests = friendRequests.data;
					this.friendRequestsLoaded = true;
				}
				this.friends = false;
			},
			async confirmFriend(friend, index) {
				const options = {
					user_id: this.$store.state.auth.user.id,
					friend_id: friend.id
				};
				const response = await this.$axios.$post('user/confirmFriend', options);
				if (response.success) {
					this.friendRequests.splice(this.friendRequests.indexOf(index), 1);
					this.friendList.push(friend);
				}
			}
		},
		created() {
			console.log(this.$store)
		}
	}

</script>

<style lang="scss" scoped>
	.friends {
		padding-top: 15px;

		&__item {
			margin-left: 20px;
			margin-bottom: 20px;
		}

		&__list {
			flex-wrap: wrap;
			margin-left: -20px;
		}
	}

	.friend {
		&__avatar {
			width: 40px;
			height: 40px;
			border-radius: 50%;
			background-size: cover;
			background-position: center center;
		}
	}

	.v-card__text {
		height: 58px;
		overflow: hidden;
		padding-bottom: 0;
		margin-bottom: 5px;
	}

	.v-list-item {
		white-space: normal;
	}

	.v-list-item-title {
		white-space: normal;
	}
</style>