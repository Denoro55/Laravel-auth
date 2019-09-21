<template>
	<v-app dark>
		<v-snackbar
				v-model="snackbar"
				bottom
		>
			{{ message }}
			<v-btn
					color="pink"
					@click="snackbar = false"
			>
				Close
			</v-btn>
		</v-snackbar>
		<v-navigation-drawer
				v-model="drawer"
				:mini-variant="miniVariant"
				:clipped="clipped"
				fixed
				app
		>
			<div class="avatar">
				<div class="avatar__top mb-8">
					<div class="avatar__image"
					     :style="{backgroundImage: `url(img/${user.image_url})` }" >
						<div class="avatar__likes d-flex justify-center">
							<div class="icon-text d-flex align-center">
								<v-icon color="red">mdi-cards-heart</v-icon>
								<div class="icon-text__value ml-2">
									11
								</div>
							</div>
						</div>
					</div>
					<!--<div class="avatar__image"-->
					     <!--:style="{backgroundImage: `url(${require(`~/assets/img/${user.image_url}`)})` }">-->
						<!--<div class="avatar__likes d-flex justify-center">-->
							<!--<div class="icon-text d-flex align-center">-->
								<!--<v-icon color="red">mdi-cards-heart</v-icon>-->
								<!--<div class="icon-text__value ml-2">-->
									<!--11-->
								<!--</div>-->
							<!--</div>-->
						<!--</div>-->
					<!--</div>-->
				</div>
				<div class="avatar__name mb-2">
					{{user.name}}
				</div>
				<div>
					<!--<img :src="`/img/${user.image_url}`" alt="">-->
					<!--<img :src="require('~/assets/v.png')" alt="">-->
					<!--<img :src="require(`@/assets/v.png`)" alt="">-->
					<!--<img :src="import('~/assets/v.png')" alt="">-->
				</div>
			</div>
			<v-list>
				<v-list-item
						v-for="(item, i) in items"
						:key="i"
						:to="item.to"
						router
						exact
				>
					<v-list-item-action class="mr-4">
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title v-text="item.title"/>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-app-bar class="px-3 pl-4"
				:clipped-left="clipped"
				fixed
				app
		>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
			<v-btn
					icon
					@click.stop="miniVariant = !miniVariant"
			>
				<v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
			</v-btn>
			<v-btn
					icon
					@click.stop="clipped = !clipped"
			>
				<v-icon>mdi-application</v-icon>
			</v-btn>

			<v-toolbar-title class="px-3" v-text="user.name"/>
			<!--<v-btn class="ml-4" to="/dashboard">Dashboard</v-btn>-->
			<!--<v-btn class="ml-4 info" to="/vuex">Vuex</v-btn>-->
			<!--<v-btn class="ml-4 info" to="/user/2">User 2</v-btn>-->
			<!--<v-btn class="ml-4 info" to="/user/3">User 3</v-btn>-->
			<v-spacer/>
			<template v-if="authenticated">
				<v-btn to="/settings"><v-icon>mdi-brightness-7</v-icon></v-btn>
				<v-btn class="error ml-4" @click.prevent="logout">Logout</v-btn>
			</template>
			<template v-else>
				<v-btn class="primary" to="/login">Login</v-btn>
				<v-btn class="success ml-4" to="/register">Register</v-btn>
			</template>
		</v-app-bar>
		<v-content>
			<v-container class="pl-7 pr-7 pb-7">
				<nuxt/>
			</v-container>
		</v-content>
		<!--<v-navigation-drawer-->
				<!--v-model="rightDrawer"-->
				<!--:right="right"-->
				<!--temporary-->
				<!--fixed-->
		<!--&gt;-->
			<!--<v-list>-->
				<!--<v-list-item @click.native="right = !right">-->
					<!--<v-list-item-action>-->
						<!--<v-icon light>-->
							<!--mdi-repeat-->
						<!--</v-icon>-->
					<!--</v-list-item-action>-->
					<!--<v-list-item-title>Switch drawer (click me)</v-list-item-title>-->
				<!--</v-list-item>-->
			<!--</v-list>-->
		<!--</v-navigation-drawer>-->
		<v-footer
				:fixed="fixed"
				app
		>
			<span>&copy; 2019</span>
		</v-footer>
	</v-app>
</template>

<script>
	export default {
		data() {
			return {
				clipped: false,
				drawer: false,
				fixed: false,
				message: '',
				snackbar: false,
				items: [
					{
						icon: 'mdi-account-circle',
						title: 'Me',
						to: '/me'
					},
					{
						icon: 'mdi-home-outline',
						title: 'Home',
						to: '/'
					},
					{
						icon: 'mdi-account-multiple',
						title: 'Friends',
						to: '/friends'
					},
					{
						icon: 'mdi-email-multiple',
						title: 'Messages',
						to: '/messages'
					},
					{
						icon: 'mdi-comment-processing-outline',
						title: 'Chatroom',
						to: '/chat'
					}
				],
				miniVariant: false,
				right: true,
				rightDrawer: false
			}
		},
		methods: {
			logout() {
				this.$auth.logout();
			}
		},
		computed: {
			imageUrl() {
				// return require('~/assets/img/' + this.$store.state.auth.user.image_url)
			}
		},
		mounted() {
			const {message} = this.$route.query;
			if (message === 'noUser') {
				this.message = 'Fill the data please';
			} else if (message === 'userLeft') {
				this.message = 'You have left the chat';
			}
			this.snackbar = !!this.message;
		}
	}
</script>

<style lang="scss">
	.container {
		position: relative;
	}

	.content {
		padding-top: 12px;
		height: 100%;
	}

	.avatar {
		padding: 30px 20px 10px;

		&__top {
			padding-right: 30px;
		}

		&__image {
			position: relative;
			width: 150px;
			height: 150px;
			border-radius: 50%;
			background-size: cover;
			background-position: center center;
			margin: 0 auto 10px auto;
			border: 2px solid #fff;
		}

		&__name {
			text-align: center;
			color: #FFF;
			font-size: 20px;
			padding-right: 30px;
		}

		&__likes {
			position: absolute;
			bottom: -20px;
			right: -30px;
		}
	}

	::-webkit-scrollbar {width: 12px;height: 12px;}
	::-webkit-scrollbar-track-piece {background:rgba(0,0,0,0);}
	::-webkit-scrollbar-thumb:vertical {height:10px;background: #272c35;}
	::-webkit-scrollbar-thumb:vertical:hover {background: #71CA55;}
	::-webkit-scrollbar-thumb:horizontal {width:10px;background: #272c35;}
	::-webkit-scrollbar-thumb:horizontal:hover {background: #71CA55;}

</style>