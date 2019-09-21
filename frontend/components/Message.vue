<template>
	<div v-if="name==='admin'" class="messager__item d-flex mb-5 elevation-5">
		<div class="messager__avatar mr-5">
		</div>
		<div class="messager__content">
			<div class="messager__name">{{ name }}</div>
			<div class="messager__text">{{ text }}</div>
		</div>
	</div>
	<div v-else class="messager__item messager__item_user d-flex mb-5 elevation-5" :class="{owner}">
		<div class="messager__avatar mr-4"
		     :style="{backgroundImage: `url(img/${avatar})`}">

		</div>
		<div class="messager__content">
			<div class="messager__name">{{ name }}</div>
			<div class="messager__text">{{ text }}</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			name: String,
			text: String,
			id: String,
			avatar: String,
			owner: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.messager {
		font-size: 14px;

		&__avatar {
			width: 50px;
			height: 50px;
			background-color: #ddd;
			flex-shrink: 0;
			border-radius: 50%;
			background-size: cover;
			background-position: center center;
		 }

		&__name {
			margin-bottom: 5px;
			font-size: 16px;
			font-weight: 500;
		}

		&__text {
			font-size: 14px;
		}

		&__item {
			width: 80%;
			padding: 12px 20px 12px 15px;

			&_user {
				background-color: #176bff;
			}

			&_user.owner {
				background-color: #206688;
			}
		}

		&__item:not(.owner) {
			margin-left: auto;
		}
	}
</style>