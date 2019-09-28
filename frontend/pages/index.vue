<template>
	<div class="content">
		<v-alert type="info" color="indigo">
			This page is under development
		</v-alert>
	</div>
</template>

<script>
	import Logo from '~/components/Logo.vue'
	import VuetifyLogo from '~/components/VuetifyLogo.vue'

	export default {
		// asyncData ({ $axios, store }) {
		// 	return $axios.get('https://nuxt-app-db.herokuapp.com')
		// 		.then((res) => {
		// 			console.log(res)
		// 		}).catch(e => {
		// 			console.log('error ', e);
		// 		})
		// },
		components: {
			Logo,
			VuetifyLogo
		},
		mounted() {
			console.log(this);
		}
	}
</script>
