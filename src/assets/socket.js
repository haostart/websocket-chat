// socket.js

import { ref , provide} from 'vue';

class SocketManager {
  constructor() {
    this.socket = ref(null);
  }

  connect(url) {
    this.socket.value = new WebSocket(url);

    this.socket.value.onopen = () => {
      console.log('WebSocket connection opened');
    };

    this.socket.value.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
    };

    this.socket.value.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }
  
  getSocket() {
    return this.socket.value;
  }

  close() {
    this.socket.value.close();
  }
}

const socketManager = new SocketManager();
socketManager.connect('ws://127.0.0.1:9000/ws'); // Replace with the actual WebSocket URL

console.log('socketManager', socketManager);
export { socketManager };

