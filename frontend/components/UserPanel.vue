<template>
	<div class="avatar">
		<div class="avatar__top mb-8">
			<div class="avatar__image"
			     :style="{backgroundImage: `url(${ getUserImage }), url(default_user_avatar.png)` }" >
				<div class="avatar__likes d-flex justify-center">
					<div v-if="isAuthorized !== false" class="icon-text d-flex align-center">
						<v-icon color="red">mdi-cards-heart</v-icon>
						<div class="icon-text__value ml-2">
							{{ likes }}
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="name" class="avatar__name mb-2">
			{{ user.name }}
		</div>
		<div v-else class="avatar__name mb-2">
			Guest
		</div>
		<div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			likes: {
				type: Number,
				default: 0
			},
			name: {
				type: String,
				default: ''
			}
		},
		computed: {
			getUserImage() {
				return this.$store.state.auth.user ? 'img/' + this.$store.state.auth.user.image_url : 'default_avatar.png';
			},
			isAuthorized() {
				return !!this.$store.state.auth.user;
			}
		}
	}
</script>

<style scoped>

</style>