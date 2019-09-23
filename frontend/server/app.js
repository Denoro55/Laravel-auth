const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const users = require('./users')();

const m = (name, text, d_id, avatar) => ({name, text, d_id, avatar});

io.on('connection', socket => {

	console.log('socket coonect with ID: ', socket.id);

	socket.on('joinedUser', (data, cb) => {
		if (false) {
			return cb('Invalid data');
		} else {
			cb({id: socket.id});

			socket.join(data.room);

			users.remove(socket.id);
			users.add({
				id: socket.id,
				name: data.name,
				room: data.room
			});

			io.to(data.room).emit('updateUsers', users.getByRoom(data.room));

			socket.emit('newMessage', m('admin', `Welcome to the chat, ${data.name}`));
			socket.broadcast.to(data.room).emit('newMessage', m('admin', `User ${data.name} has connected.`));
		}
	})

	socket.on('createMessage', (data, cb) => {
		const user = users.get(data.id);
		if (user) {
			io.to(user.room).emit('newMessage', m(user.name, data.text, data.id, data.avatar));
		}
		cb();
	});

	socket.on('userLeft', (data, cb) => {
		const user = users.remove(data.id);
		if (user) {
			io.to(user.room).emit('updateUsers', users.getByRoom(user.room));
			io.to(user.room).emit('newMessage', m('admin', `User ${user.name} has disconnected.`));
		}
		cb();
	})

	socket.on('disconnect', () => {
		const user = users.remove(socket.id);
		if (user) {
			io.to(user.room).emit('updateUsers', users.getByRoom(user.room));
			io.to(user.room).emit('newMessage', m('admin', `User ${user.name} has disconnected.`));
		}
	})

	// console.log('Io connected to server');
	//
	// socket.emit('newMessage', {
	// 	text: 'WHAT'
	// })
	//
	// socket.on('customEmit', data => {
	// 	setTimeout(function() {
	// 		socket.emit('newMessage', {
	// 			text: 'Server return'
	// 		})
	// 	},500)
	// })
});

module.exports = {
	app,
	server
};