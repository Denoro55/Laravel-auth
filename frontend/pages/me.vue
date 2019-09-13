<template>
	<div class="pt-5">
		<!--<div class="mb-4">-->
			<!--<v-btn class="primary">Articles</v-btn>-->
			<!--<v-btn class="ml-3 warning">Todos</v-btn>-->
		<!--</div>-->
		<div>
			<v-form
					ref="form"
					:lazy-validation="false"
					v-model="valid"
			>
				<div v-show="buttonText === 'hide'" class="article-form mb-4">
					<v-text-field
							v-model="title"
							:rules="titleRules"
							label="Title"
							required
							class="mb-2"

					></v-text-field>

					<v-textarea
							v-model="content"
							name="input-7-1"
							label="Content"
							:rules="contentRules"
							required
					></v-textarea>
				</div>

				<v-btn :disabled="!valid || buttonText === 'show'" color="success" class="mr-3" @click="createArticle">
					Create
				</v-btn>

				<v-btn :disabled="buttonText === 'show'" color="error" class="mr-3" @click="reset">
					Reset Form
				</v-btn>

				<v-btn color="primary" class="mr-3" @click="hide">
					{{ buttonText }}
				</v-btn>
			</v-form>
		</div>
		<div class="section mt-5">
			<div class="articles">
				<v-expansion-panels :readonly="false" multiple>
					<v-expansion-panel v-for="article in articles" :key="article.id">
						<v-expansion-panel-header>{{article.title}}</v-expansion-panel-header>
						<v-expansion-panel-content>
							<div class="articles__content">
								<div class="articles__body mb-5">
									{{ article.content }}
								</div>
								<div class="articles__controls mb-1 d-flex align-center">
									<div class="icon-text d-flex align-center">
										<v-icon>mdi-comment</v-icon>
										<div class="icon-text__value ml-2">
											23
										</div>
									</div>
									<div class="icon-text d-flex align-center ml-4">
										<v-icon color="red">mdi-cards-heart</v-icon>
										<div class="icon-text__value ml-2">
											23
										</div>
									</div>
									<v-btn class="primary ml-4">
										Comment
									</v-btn>
									<v-btn class="error ml-4">
										<v-icon color="white">mdi-cards-heart</v-icon>
									</v-btn>
									<div class="articles_created ml-auto">
										{{ article.updated_at }}
									</div>
									<v-btn @click="removeArticle(article.id)" class="error ml-4">
										Remove
									</v-btn>
								</div>
							</div>
						</v-expansion-panel-content>
					</v-expansion-panel>
				</v-expansion-panels>
			</div>
		</div>
		<!--<div class="pt-3 mb-2">-->
			<!--{{ authenticated }}-->
		<!--</div>-->
		<!--<h3>User info</h3>-->
		<!--<div class="pt-3">-->
			<!--{{ user }}-->
		<!--</div>-->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				valid: false,
				title: '',
				content: '',
				formVisible: false,
				buttonText: 'hide',
				titleRules: [
					v => !!v || 'Title is required',
					v => (v && v.length >= 10) || 'Name must be more than 10 characters',
				],
				contentRules: [
					v => !!v || 'Content is required',
					v => (v && v.length >= 30) || 'Content must be more than 30 characters',
				]
				// articles: [
				// 	{ title: 'Article 1', content: 'Some content 1'}
				// ]
			}
		},
		methods: {
			reset() {
				this.$refs.form.reset()
			},
			hide() {
				this.buttonText = this.buttonText === 'hide' ? 'show' : 'hide';
			},
			getArticles() {
				const options = {
					user_id: this.$store.state.auth.user.id
				};
				return this.$axios.post('http://laravel-auth/api/articles', options).then((res) => {
					this.articles = res.data;
				});
			},
			async createArticle() {
				const form = {title: this.title, content: this.content, user_id: this.$store.state.auth.user.id};
				await this.$axios.$post('http://laravel-auth/api/articles/store', form);
				this.$refs.form.reset();
				this.getArticles();
			},
			async removeArticle(id) {
				const form = {article_id: id};
				await this.$axios.$post('http://laravel-auth/api/articles/remove', form);
				this.getArticles();
			}
		},
		computed: {
			toggleText() {
				return this.buttonText === 'hide' ? 'show' : 'hide';
			}
		},
		// created() {
		// 	const options = {
		// 		user_id: 1
		// 	};
		// 	const articles = this.$axios.post('http://laravel-auth/api/articles', options).then(function(res){
		// 		console.log(res);
		// 	})
		// },
		asyncData ({ $axios, store }) {
			// this.$store.state.auth.user.id
			const options = {
				user_id: store.state.auth.user.id
			};
			return $axios.post('http://laravel-auth/api/articles', options)
				.then((res) => {
					console.log(res);
					return { articles: res.data }
				})
		},
		mounted() {
			// console.log(this.$store.state.auth.user.id);
		}
	}
</script>

<style>
	textarea {
		resize: none;
	}

	.v-expansion-panel-header {
		font-size: 1.1em;
		font-weight: 500;
		min-height: 55px;
	}
</style>