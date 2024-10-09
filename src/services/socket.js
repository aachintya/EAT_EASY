import { io } from 'socket.io-client';

console.log('Attempting to connect to socket.io server');
const socket = io('http://localhost:5000', {
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

export const emitUpvote = (data) => {
  socket.emit('upvote', data);
};

export const emitDownvote = (data) => {
  socket.emit('downvote', data);
};

export const emitNewComment = (data) => {
  socket.emit('newComment', data);
};