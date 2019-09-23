import axios from 'axios';

export const state = () => ({
	chatUser: {},
	messages: [],
	users: [],
	userInfo: {
		likes: 0
	}
});

export const mutations = {
	setUser(state, user) {
		state.chatUser = user;
	},
	clearData(state, user) {
		state.chatUser = {};
		state.messages = [];
		state.users = [];
	},
	SOCKET_newMessage(state, msg) {
		state.messages.push(msg);
	},
	SOCKET_updateUsers(state, users) {
		state.users = users;
	},
	setLikes(state, data) {
		state.userInfo.likes = data;
	},
	init (state) {
		console.log('init server');
	}
};

export const actions = {
	async nuxtServerInit ({ commit }, { req }) {
		commit('init');
	}
}