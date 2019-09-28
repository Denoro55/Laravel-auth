export default function({$axios, store}) {
	$axios.onError(error => {
		if (error.response.status === 422) {
			store.dispatch('validation/setErrors', error.response.data.errors);
		}
		if (error.response.status === 401) {
			// console.log('error 401 catch')
		}
		return Promise.reject(error);
	});

	$axios.onRequest((config ) => {
		// config.headers.common['Content-Type'] = 'text/plain;charset=utf-8';
		// config.headers.common['Access-Control-Allow-Origin'] = '*';
		store.dispatch('validation/clearErrors');
	})
}