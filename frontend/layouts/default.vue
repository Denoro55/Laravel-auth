<template>
	<v-app dark>
		<v-navigation-drawer
				v-model="drawer"
				:mini-variant="miniVariant"
				:clipped="clipped"
				fixed
				app
		>
			<div class="avatar">
				<div class="avatar__image"
				     style="background-image: url(https://images.wallpaperscraft.ru/image/for_honor_shlem_personazh_art_113107_1280x1024.jpg)"></div>
				<div class="avatar__name mb-2">
					{{user.name}}
				</div>
				<div class="avatar__likes d-flex justify-center">
					<div class="icon-text d-flex align-center">
						<v-icon color="red">mdi-cards-heart</v-icon>
						<div class="icon-text__value ml-2">
							11
						</div>
					</div>
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

			<v-toolbar-title class="px-3" v-text="title"/>
			<v-btn class="ml-4" to="/dashboard">Dashboard</v-btn>
			<v-btn class="ml-4 info" to="/vuex">Vuex</v-btn>
			<v-btn class="ml-4 info" to="/user/2">User 2</v-btn>
			<v-btn class="ml-4 info" to="/user/3">User 3</v-btn>
			<v-spacer/>
			<template v-if="authenticated">
				<v-btn class="error ml-3" @click.prevent="logout">Logout</v-btn>
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
						to: '/chatroom'
					}
				],
				miniVariant: false,
				right: true,
				rightDrawer: false,
				title: 'Denis'
			}
		},
		methods: {
			logout() {
				this.$auth.logout();
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding-top: 12px;
	}

	.avatar {
		padding: 30px 20px 10px;

		&__image {
			width: 120px;
			height: 120px;
			border-radius: 50%;
			background-size: cover;
			background-position: center center;
			margin: 0 auto 10px auto;
		}

		&__name {
			text-align: center;
			color: #FFF;
			font-size: 20px;
		}
	}
</style>