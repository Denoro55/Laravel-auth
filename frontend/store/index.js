import axios from 'axios';

export const state = () => ({
	chatUser: {},
	messages: [],
	privateMessages: [],
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
	updatePrivateMessages(state, msg) {
		state.privateMessages = msg;
	},
	SOCKET_newMessage(state, msg) {
		state.messages.push(msg);
	},
	SOCKET_updateUsers(state, users) {
		state.users = users;
	},
	SOCKET_newPrivateMessage(state, msg) {
		state.privateMessages.unshift(msg);
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