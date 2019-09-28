const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const users = require('./users')();
const privateUsers = require('./privateUsers')();

const ROOM_PREFIX = 'R_';

const m = (name, text, d_id, image_url) => ({name, text, d_id, image_url});

const generateGuestName = function(room, initial_name) {
	let roomUsers = users.getByRoom(room);
	let filteredUsers = roomUsers.filter(function(a) {
		return a.name.includes('Guest');
	});
	let sortedGuests = filteredUsers.sort(function(a, b) {
		let val1 = a.name.indexOf('#') !== -1 ? +a.name.substr(a.name.indexOf('#') + 1) : 1;
		let val2 = b.name.indexOf('#') !== -1 ? +b.name.substr(b.name.indexOf('#') + 1) : 1;
		return val1 - val2;
	});
	if (filteredUsers.length) {
		for (let i = 0; i < filteredUsers.length + 1; i++) {
			let compareName = 'Guest';
			if (i > 0) {
				compareName = `Guest #${i+1}`
			}
			if (i === filteredUsers.length) {
				return `Guest #${i + 1}`;
			} else if (sortedGuests[i].name !== compareName) {
				return compareName;
			}
		}
	} else {
		return initial_name;
	}
};

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

			const ROOM = ROOM_PREFIX + data.room;

			let user_name = data.name;
			if (user_name === 'Guest') {
				user_name = generateGuestName(ROOM, user_name);
			}

			socket.join(ROOM);

			users.remove(socket.id);
			users.add({
				id: socket.id,
				name: user_name,
				room: ROOM,
				image_url: data.image_url
			});

			io.to(ROOM).emit('updateUsers', users.getByRoom(ROOM));

			socket.emit('newMessage', m('admin', `Welcome to the chat, ${user_name}`));
			socket.broadcast.to(ROOM).emit('newMessage', m('admin', `User ${user_name} has connected.`));

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
		const user = users.remove(data);
		console.log('userLeft:', data);
		console.log('userLeft user:', user);
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