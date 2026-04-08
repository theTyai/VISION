import { io } from 'socket.io-client'

const socket = io('http://localhost:5000', {
  autoConnect: false,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 10
})

export const connectSocket = (userId) => {
  if (!socket.connected) {
    socket.connect()
    socket.on('connect', () => {
      if (userId) socket.emit('register', userId)
    })
  } else if (userId) {
    socket.emit('register', userId)
  }
}

export const connectAdminSocket = () => {
  if (!socket.connected) {
    socket.connect()
    socket.on('connect', () => socket.emit('join:admin'))
  } else {
    socket.emit('join:admin')
  }
}

export const disconnectSocket = () => {
  socket.disconnect()
}

export default socket