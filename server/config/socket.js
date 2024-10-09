const socketIo = require('socket.io');

const init = (server) => {
  const { FRONTEND_LINK } = process.env;
  let io = socketIo(server, {
    cors: {
      origin: FRONTEND_LINK,
      methods: ['GET', 'POST'],
    },
  });
  console.log(FRONTEND_LINK);
  return io;
};

const connect = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected');

    // Handle upvote event
    socket.on('upvote', (data) => {
      io.emit('upvote', data)
    });

    // Handle downvote event
    socket.on('downvote', (data) => {
      io.emit('downvote', data);
    });

    // Handle new comment event
    socket.on('newComment', (data) => {
      io.emit('newComment', data);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

module.exports = { init, connect };