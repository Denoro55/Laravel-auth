import axios from 'axios';

export const state = () => ({
	errors: {}
});

export const getters = {
	errors(state) {
		return state.errors
	}
};

export const mutations = {
	SET_VALIDATION_ERRORS(state, errors) {
		state.errors = errors;
	},
	GET_PROFILE_INFO(state, errors) {
		this.$axios.post('http://laravel-auth/api/user/profile', {user_id: 1})
			.then((res) => {
				console.log('res ' , res.data);
			})
	}
};

export const actions = {
	setErrors({commit}, errors) {
		console.log('set errors');
		commit('SET_VALIDATION_ERRORS', errors);
	},
	async setProfileInfo({commit}, errors) {
		commit('GET_PROFILE_INFO', errors);
	},
	clearErrors({commit}) {
		console.log('clear errors');
		commit('SET_VALIDATION_ERRORS', {});
	}
};

