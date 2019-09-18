export default function({store, redirect}) {
	if (!Object.keys(store.state.chatUser).length) {
		redirect('/?message=noUser');
	}
}