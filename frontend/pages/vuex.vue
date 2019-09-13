<template>
	<div>
		<div class="mb-2"> {{name}} </div>
		<div class="d-flex align-center mb-3">
			<v-btn class="secondary" @click="add">+1</v-btn>
			<div class="px-4">
				{{ counter }}
			</div>
			<v-btn class="error" @click="sub">-1</v-btn>
		</div>
		<div class="mb-2" v-if="visible">
			You can see this text!
		</div>
		<div>
			<v-btn class="primary" @click="toggleVisibility">Toggle</v-btn>
		</div>
		<div class="section mb-3">
			<v-text-field v-model="text"></v-text-field>
			<div>
				{{ text }}
			</div>
		</div>
		<div class="section mb-3">
			<img :src="srcPath" alt="">
		</div>
		<div class="section d-flex mb-5">
			<v-card class="p-5 mr-5" v-for="todo in todos" :key="todo.id">
				<v-card-title>{{todo.name}}</v-card-title>
				<v-card-text>{{todo.age}}</v-card-text>
			</v-card>
		</div>
		<div class="section d-flex">
			<li class="mr-5" v-for="todo in items">
				<input type="checkbox" :checked="todo.done" @change="toggle(todo)">
				<span :class="{ done: todo.done }">{{ todo.text }}</span>
			</li>
		</div>
	</div>
</template>

<script>
	import { mapMutations } from 'vuex';
	export default {
		data() {
			return {
				name: 'vuex',
				counter: 0,
				visible: true,
				text: 'Hello world',
				srcPath: 'http://allpravda.info/upload/editor/image/assassin_creed_brotherhood_wallpaper_12_1200x9001.jpg',
				todos: [
					{ name: 'Den', age: 22 },
					{ name: 'Bob', age: 19 },
					{ name: 'Lina', age: 21 }
				]
			}
		},
		methods: {
			add() {
				this.counter ++;
			},
			sub()  {
				this.counter --;
			},
			toggleVisibility() {
				this.visible = !this.visible;
			},
			...mapMutations({
				toggle: 'items/toggle'
			})
		},
		computed: {
			items () {
				return this.$store.state.items.list
			}
		}
	}
</script>

<style scoped>
	img {
		max-width: 200px;
	}
	ul, li {
		list-style: none;
	}
</style>