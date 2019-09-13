export const state = () => ({
	list: [
		{ text: "Learn JavaScript", done: false },
		{ text: "Learn Vue", done: false },
		{ text: "Play around in JSFiddle", done: true },
		{ text: "Build something awesome", done: true }
	]
});

export const mutations = {
	add (state, text) {
		state.list.push({
			text: text,
			done: false
		})
	},
	remove (state, { todo }) {
		state.list.splice(state.list.indexOf(todo), 1)
	},
	toggle (state, todo) {
		todo.done = !todo.done
	}
}