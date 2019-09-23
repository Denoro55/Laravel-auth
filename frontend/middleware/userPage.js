export default function({store, redirect, route}) {
	if (route.params.id == store.state.auth.user.id) {
		// console.log('redirect')
		return redirect('/me');
	}
}