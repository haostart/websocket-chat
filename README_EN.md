## Project Description

This is a sample project of a simple chat application based on WebSocket. Through this project, users can engage in private and group chats, sending and receiving real-time messages.
### Note
 - **Simple Demo, Incomplete Features**
 - Uses MySQL database, table structure in the `test_structure.sql` file. Execute the command `mysql -u your_username -p your_password your_database_name < test_structure.sql` to import the database table structure.



### Features

- Private Chat: Users can choose contacts for one-on-one private chats, sending instant messages.
- Group Chat: Users can join groups and engage in group chats with other members.
- Change Username: Users can directly modify their username on the interface.
- Display Online (Connected) Status
- Reconnect: Users can reconnect to the server. After reconnecting, the previous chat history will be loaded.
### Technology Stack

- **Frontend Framework:** This project uses Vue.js as the frontend framework, and Element Plus for UI components.

- **Backend Framework:** The backend is implemented using Node.js + MySQL, with the ws library used for WebSocket server.
- **WebSocket:** Real-time communication uses WebSocket technology to ensure the real-time nature of messages.
### How to Run


1. Clone the project locally:

   ```bash
   git clone https://github.com/haostart/websocket-chat.git
   ```

2. Navigate to the project directory:

   ```bash
   cd yourproject
   ```

3. Install dependencies:

   ```bash
   npm install
   ```
Start the project:
#### Client
   `
   npm run serve
   `
#### WebSocket Server
Navigate to the `server` folder and run

`npm run dev`

   The project will run locally, and you can access the application by visiting [http://localhost:8080](http://localhost:8080) in your browser.

### Project Structure

```
yourproject/
|-- server/ # WebSocket Server
|-- src/
|   |-- components/
|   |   |-- ...  # Vue components
|   |-- assets/
|   |   |-- ...  # Static resources
|   |-- views/
|   |   |-- Home.vue  # Main view component
|   |   |-- Login.vue  # Login view component
|   |-- router/
|   |-- App.vue
|   |-- main.js
|-- public/
|-- README.md
|-- ...
```

### Notes

1. Ensure that Node.js and npm are installed.
2. The WebSocket connection address in the project is `ws://127.0.0.1:9000/ws`. Modify it according to your actual situation.