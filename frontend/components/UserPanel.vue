<template>
	<div class="avatar__image"
	     :style="{backgroundImage: `url(/img/${user.image_url})` }" >
		<div class="avatar__likes d-flex justify-center">
			<div class="icon-text d-flex align-center">
				<v-icon color="red">mdi-cards-heart</v-icon>
				<div class="icon-text__value ml-2">
					{{ likes }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			likes: {
				type: Number,
				default: 0
			}
		}
	}
</script>

<style scoped>

</style>