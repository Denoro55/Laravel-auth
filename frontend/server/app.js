const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const users = require('./users')();
const privateUsers = require('./privateUsers')();

const ROOM_PREFIX = 'R_';

const m = (name, text, d_id, avatar) => ({name, text, d_id, avatar});

io.on('connection', socket => {

	console.log('socket coonect with ID: ', socket.id);

	// socket.on('joinedPrivateUser', (data, cb) => {
	// 	if (false) {
	// 		return cb('Invalid data');
	// 	}
	// 	privateUsers.add({
	// 		id: data.id,
	// 		room: data.id + data.companion_id,
	// 		companion_id: data.companion_id
	// 	});
	// 	console.log(privateUsers);
	// 	cb();
	// });

	socket.on('joinedPrivateUser', (data, cb) => {
		if (false) {
			return cb('Invalid data');
		} else {

			let users_id = [data.id, data.companion_id];
			users_id.sort(function(a, b) {
				return a - b;
			});
			const uniquePrivateRoomID = users_id.join('');

			cb({id: socket.id, room_id: uniquePrivateRoomID});

			socket.join(uniquePrivateRoomID);

			privateUsers.remove(socket.id);
			privateUsers.add({
				id: socket.id,
				real_id: data.id,
				name: data.name,
				room: uniquePrivateRoomID
			});

			console.log('private users: ',privateUsers);
		}
	});

	socket.on('userPrivateLeft', (data, cb) => {
		privateUsers.remove(data.id);
		console.log('user private left', privateUsers);
		cb();
	});

	socket.on('createPrivateMessage', (data, cb) => {
		const user = privateUsers.getByID(data.id);
		if (user) {
			io.to(user.room).emit('newPrivateMessage',
				{
					name: user.name,
					text: data.message,
					idd: data.id,
					image_url: data.avatar
				});
		}
		cb();
	});

	// chat

	socket.on('joinedUser', (data, cb) => {
		if (false) {
			return cb('Invalid data');
		} else {
			cb({id: socket.id});

			socket.join(ROOM_PREFIX + data.room);

			users.remove(socket.id);
			users.add({
				id: socket.id,
				name: data.name,
				room: ROOM_PREFIX + data.room
			});

			io.to(ROOM_PREFIX + data.room).emit('updateUsers', users.getByRoom(data.room));

			socket.emit('newMessage', m('admin', `Welcome to the chat, ${data.name}`));
			socket.broadcast.to(ROOM_PREFIX + data.room).emit('newMessage', m('admin', `User ${data.name} has connected.`));

			console.log('users: ',users);
		}
	});

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
	});

	socket.on('disconnect', () => {
		const user = users.remove(socket.id);
		privateUsers.remove(socket.id);
		if (user) {
			io.to(user.room).emit('updateUsers', users.getByRoom(user.room));
			io.to(user.room).emit('newMessage', m('admin', `User ${user.name} has disconnected.`));
		}
		console.log('user private disconnect', privateUsers);
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