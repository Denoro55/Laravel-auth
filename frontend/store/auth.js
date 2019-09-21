export const getters = {
	authenticated(state) {
		return state.loggedIn;
	},
	user(state) {
		return state.user;
	}
};

export const mutations = {
	updateImage(state, data) {
		console.log(state.user)
		state.user.image_url = data;
	},
};

export const state = () => ({
	busy: false,
	loggedIn: false,
	strategy: false,
	user: false
});