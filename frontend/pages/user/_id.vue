<template>
	<div>
		<div class="content">
			<div class="section mb-5">
				<div class="another-user d-flex align-center">
					<div class="another-user__logo" style="background-image: url(http://allpravda.info/upload/editor/image/assassin_creed_brotherhood_wallpaper_12_1200x9001.jpg)"></div>
					<div class="another-user__info ml-5">
						<div class="another-user__name mb-2">{{username}}</div>
						<div class="another-user__params mb-3 d-flex">
							<div class="another-user__param d-flex align-center">
								<v-icon class="ml-0" color="red" light right>mdi-cards-heart</v-icon></v-btn>
								<div class="another-user__param-value ml-2">23</div>
							</div>
							<div class="another-user__param d-flex align-center ml-5">
								<v-icon class="ml-0" color="white" light right>mdi-account-multiple</v-icon></v-btn>
								<div class="another-user__param-value ml-2">65</div>
							</div>
						</div>
						<v-btn>Message
							<v-icon class="ml-3" dark right>mdi-email</v-icon>
						</v-btn>
						<v-btn class="success ml-3">Add friend
							<v-icon class="ml-1" medium dark right>mdi-account</v-icon></v-btn>
						<v-btn class="red ml-3">Like
							<v-icon light right>mdi-cards-heart</v-icon></v-btn>
					</div>
				</div>
				</div>
			</div>
			<div class="section">
				<v-expansion-panels :readonly="false" multiple>
					<v-expansion-panel v-for="article in articles" :key="article.id">
						<v-expansion-panel-header>{{article.title}}</v-expansion-panel-header>
						<v-expansion-panel-content>
							{{article.content}}
						</v-expansion-panel-content>
					</v-expansion-panel>
				</v-expansion-panels>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		asyncData ({ $axios, params }) {
			const options = {
				user_id: params.id
			};
			return $axios.post('http://laravel-auth/api/user', options)
				.then((res) => {
					console.log(res);
					return {
						articles: res.data.articles,
						username: res.data.user.name
					}
				})
		},
		mounted() {
			// console.log(this.$route.params.id);
		}
	}
</script>

<style lang="scss" scoped>
	.another-user {
		&__logo {
			width: 180px;
			height: 180px;
			border-radius: 50%;
			background-size: cover;
			background-position: center center;
		}

		&__name {
			font-size: 22px;
		}
	}
</style>