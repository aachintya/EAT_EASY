import { io } from 'socket.io-client';

console.log('Attempting to connect to socket.io server');
const SOCKET_SERVER_URL = process.env.REACT_APP_SOCKET_SERVER_URL || 'http://localhost:5000';
const socket = io(SOCKET_SERVER_URL, {
    // withCredentials: true,
});

socket.on('connect', () => {
    console.log('Connected to socket.io server');
});

export const awaitUpvotes = (callback) => {
  socket.on('upvote', callback);
};

export const awaitDownvotes = (callback) => {
  socket.on('downvote', callback);
};

export const awaitComments = (callback) => {
  socket.on('newComment', callback);
};

export const awaitCommentUpvotes = (callback) => {
  socket.on('upvoteComment', callback);
}

export const awaitCommentDownvotes = (callback) => {
  socket.on('downvoteComment', callback);
}

export const emitUpvote = (data) => {
  socket.emit('upvote', data);
};

export const emitDownvote = (data) => {
  socket.emit('downvote', data);
};

export const emitNewComment = (data) => {
  socket.emit('newComment', data);
};

export const emitUpvoteComment = (data) => {
  socket.emit('upvoteComment', data);
}

export const emitDownvoteComment = (data) => {
  socket.emit('downvoteComment', data);
}