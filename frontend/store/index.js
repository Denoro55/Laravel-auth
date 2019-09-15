export const state = () => ({
	counter: 0
});

export const mutations = {
	increment (state) {
		state.counter++
	}
};

export const actions = {
	SOCKET_newMessage(ctx, data) {
		console.log('message received', data);
	}
}