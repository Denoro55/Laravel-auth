export const state = () => ({
	chatUser: {},
	messages: [],
	users: []
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
		console.log(msg)
	},
	SOCKET_updateUsers(state, users) {
		state.users = users;
	}
};
