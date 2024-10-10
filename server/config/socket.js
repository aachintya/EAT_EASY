const socketIo = require('socket.io');
const { upvoteComment, downvoteComment } = require('../utils/commentUtils');

const init = (server) => {
  const FRONTEND_LINK = process.env.FRONTEND_LINK || 'http://localhost:3000';
  let io = socketIo(server, {
    cors: {
      origin: FRONTEND_LINK,
      methods: ['GET', 'POST'],
    },
  });
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

    // Handle comment upvoted event
    socket.on('upvoteComment', (data) => {
      io.emit('upvoteComment', data);
    });

    // Handle comment downvoted event
    socket.on('downvoteComment', (data) => {
      io.emit('downvoteComment', data);
    });

    // Handle client disconnection
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

module.exports = { init, connect };