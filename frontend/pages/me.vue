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
							autocomplete="off"
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
		<div class="section mt-6">
			<div class="articles">
				<v-expansion-panels :readonly="false" multiple>
					<v-expansion-panel v-for="article in articles" :key="article.id">
						<v-expansion-panel-header>{{article.title}}</v-expansion-panel-header>
						<v-expansion-panel-content>
							<div class="articles__content mb-2">
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
											{{ article.likes }}
										</div>
									</div>
									<v-btn @click="showComment(article)" class="primary ml-4">
										Comments
									</v-btn>
									<v-btn @click="likeArticle(article)" class="ml-4" :class="{error: !article.liked}">
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
							<div v-show="article.showComment" class="article__comments mb-2 mt-6">
								<div class="article__new-comment mb-4">
									<v-form :ref="`commentForm-${article.id}`" @submit.prevent="sendComment(article, $event)">
										<div class="new-comment d-flex align-center">
											<div class="new-comment__input mr-5">
												<v-text-field
														v-model="message"
														:rules="messageRules"
														label="Write a message"
														required
												></v-text-field>
											</div>
											<div class="new-comment__send">
												<v-btn type="submit" class="success">Send</v-btn>
											</div>
										</div>
									</v-form>
								</div>
								<div v-for="comment in article.comments" class="article-comment white black--text elevation-5 mb-5 pa-5 d-flex">
									<div class="article-comment__logo mr-4" style="background-image: url(https://images.wallpaperscraft.ru/image/for_honor_shlem_personazh_art_113107_1280x1024.jpg)"></div>
									<div class="article-comment__content">
										<div class="article-comment__name mb-1">{{ comment.name }}</div>
										<div class="article-comment__text mb-1">{{ comment.text }}</div>
										<div class="article-comment__date">{{ comment.created_at }}</div>
									</div>
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
				message: '',
				titleRules: [
					v => !!v || 'Title is required',
					v => (v && v.length >= 10) || 'Name must be more than 10 characters',
				],
				contentRules: [
					v => !!v || 'Content is required',
					v => (v && v.length >= 30) || 'Content must be more than 30 characters',
				]
				,
				messageRules: [
					v => !!v || 'Text is required'
				]
			}
		},
		methods: {
			reset() {
				this.$refs.form.reset();
				console.log(this.$refs);
			},
			hide() {
				this.buttonText = this.buttonText === 'hide' ? 'show' : 'hide';
			},
			async sendComment(article, event) {
				const ref = 'commentForm-' + article.id;
				const thisForm = this.$refs[ref][0];
				thisForm.reset();
				const form = {
					article_id: article.id,
					name: this.$store.state.auth.user.name,
					text: event.target[0].value,
					created_at: Date.now()
				};
				const response = await this.$axios.$post('http://laravel-auth/api/comments/store', form);
				if (response.success === true) {
					article.comments.unshift(form);
				}
			},
			getArticles() {
				const options = {
					user_id: this.$store.state.auth.user.id
				};
				return this.$axios.post('http://laravel-auth/api/articles', options).then((res) => {
					this.articles = res.data;
				});
			},
			async likeArticle(article) {
				let type = 'add';
				if (article.liked) {
					article.likes--;
					article.liked = null;
					type = 'remove';
				} else {
					article.likes++;
					article.liked = 1;
				}
				const form = {
					article_id: article.id,
					user_id: this.$store.state.auth.user.id,
					type: type
				};
				console.log(article);
				await this.$axios.$post('http://laravel-auth/api/articles/like', form);
			},
			async showComment(article) {
				if (!article.commentsLoaded) {
					const form = { article_id: article.id };
					const response = await this.$axios.$post('http://laravel-auth/api/comments', form);
					article.commentsLoaded = true;
					article.comments = response;
				}
				article.showComment = !article.showComment;
			},
			async createArticle() {
				const form = {title: this.title, content: this.content, user_id: this.$store.state.auth.user.id};
				await this.$axios.$post('http://laravel-auth/api/articles/store', form);
				this.$refs.form.reset();
				this.getArticles();
			},
			async removeArticle(id) {
				const form = { article_id: id };
				await this.$axios.$post('http://laravel-auth/api/articles/remove', form);
				this.getArticles();
			}
		},
		computed: {
			toggleText() {
				return this.buttonText === 'hide' ? 'show' : 'hide';
			},
			getArticleRef(article) {
				return 'input'+article.id;
			}
		},
		asyncData ({ $axios, store }) {
			// this.$store.state.auth.user.id
			const options = {
				user_id: store.state.auth.user.id
			};
			return $axios.post('http://laravel-auth/api/articles', options)
				.then((res) => {
					let data = res.data;
					data.forEach(function(e){
						e.showComment = false;
						e.commentsLoaded = false;
						e.comments = []
					});
					console.log(data)
					return { articles: data }
				})
		},
		mounted() {
			console.log(this.$store.state.auth.user.id);
		}
	}
</script>

<style lang="scss">
	textarea {
		resize: none;
	}

	.articles {
		&__body {
			font-size: 14px;
		}
	}

	.v-expansion-panel-header {
		font-size: 1.1em;
		font-weight: 500;
		min-height: 55px;
	}

	.new-comment {
		&__input {
			flex: 1;
		}
	}

	.article-comment {
		border-radius: 10px;

		&__logo {
			flex-shrink: 0;
			width: 40px;
			height: 40px;
			border-radius: 50%;
			background-size: cover;
			background-position: center center;
		}

		&__content {
			flex: 1;
		}

		&__name {
			font-weight: 500;
		}

		&__date {
			font-size: .9em;
			text-align: right;
			color: #545454;
		}

		&__text {
			font-size: 14px;
		}
	}
</style>