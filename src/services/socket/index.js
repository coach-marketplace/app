import queryString from 'query-string'
import openSocket from 'socket.io-client'

/**
 * Socket
 */

class Socket {
  socket = null

  static init(data) {
    const { userId } = data
    let url = process.env.REACT_APP_API_URL
    userId && (url += `?${queryString.stringify({ userId })}`)
    !this.socket && (this.socket = openSocket(url))
  }
}

// Socket.init();

export default Socket
