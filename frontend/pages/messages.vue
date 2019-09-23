<template>
	<div class="content">
		<v-card>
			<v-toolbar color="cyan" dark>
				<v-icon class="mr-4">mdi-email-multiple-outline</v-icon>

				<v-toolbar-title>Messages</v-toolbar-title>

				<div class="flex-grow-1"></div>

				<v-btn icon>
					<v-icon>mdi-magnify</v-icon>
				</v-btn>
			</v-toolbar>

			<template v-if="!mode">
				<v-list three-line>
					<template v-for="(item, index) in items">
						<v-subheader class="d-none"
						             v-if="item.header"
						             :key="item.id"
						             v-text="item.header"
						></v-subheader>
						<v-divider
								v-else-if="item.divider"
								:key="index"
								:inset="item.inset"
						></v-divider>

						<v-list-item v-else :key="item.title" :to="`messages?user=${item.idd}`">
							<v-list-item-avatar>
								<v-img :src="item.avatar"></v-img>
							</v-list-item-avatar>
							<v-list-item-content>
								<v-list-item-title v-html="item.name"></v-list-item-title>
								<v-list-item-subtitle>
									{{item.text}}
								</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
					</template>
				</v-list>
			</template>

			<template v-else>
				<v-list three-line flat>
					<template v-for="(item, index) in companion">
						<v-subheader class="d-none"
						             v-if="item.header"
						             :key="item.id"
						             v-text="item.header"
						></v-subheader>
						<v-divider
								v-else-if="item.divider"
								:key="index"
								:inset="item.inset"
						></v-divider>

						<v-list-item v-else :key="item.title">
							<v-list-item-avatar>
								<v-img :src="item.avatar"></v-img>
							</v-list-item-avatar>
							<v-list-item-content>
								<v-list-item-title v-html="item.name"></v-list-item-title>
								<v-list-item-subtitle>
									{{item.text}}
								</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
					</template>
				</v-list>
			</template>

		</v-card>
	</div>
</template>

<script>
	export default {
		asyncData({ route }) {
			if (route.query.user) {
				return {
					mode: true
				}
			}
			return {
				mode: false
			}
		},
		data: () => ({
			items: [
				{
					idd: 1,
					avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
					name: 'Ali Connors',
					text: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
				},
				{
					idd: 2,
					avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
					name: 'Ali Connors',
					text: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
				}
			],
			companion: [
				{
					idd: 1,
					avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
					name: 'Ali Connors',
					text: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
				},
				{
					idd: 2,
					avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
					name: 'Ali Connors',
					text: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
				}
			]
		}),
		mounted() {
			// const { user } = this.$route.query;
			// if (user) {
			// 	this.mode = true;
			// }
			console.log(this)
		},
		watch: {
			'$route' (to, from) {
				if (to.query.user) {
					console.log('id')
					this.mode = true;
				} else {
					this.mode = false;
				}
			}
		}
	}

</script>

<style lang="scss" scoped>
	.v-list-item__content {
		border-bottom: 1px solid rgba(255, 255, 255, 0.12);
	}

	.v-list-item:last-child {
		.v-list-item__content {
			border-bottom: 0;
		}
	}
</style>