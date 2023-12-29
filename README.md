## 项目说明


这是一个基于 WebSocket 实现的简单网页聊天应用的示例项目。通过该项目，用户可以进行私聊和群聊，实时发送和接收消息。

详细设计地址：[基于 Vue3 和 WebSocket 实现的简单网页聊天应用
](https://blog.csdn.net/haostart_/article/details/135291148)

### 注意
 - **简单Demo, 功能不完善**
 - 使用 Mysql 数据库, 表结构在test_structure.sql文件中,执行命令 `mysql -u your_username -p your_password your_database_name < test_structure.sql` 导入数据库表结构



### 功能特性

- 私聊功能：用户可以选择联系人进行一对一私聊，发送即时消息。
- 群聊功能：用户可以加入群组，与群组成员进行群聊。
- 修改用户名：用户可以在界面上直接修改自己的用户名。
- 显示在线(连接)状态
- 重新连接: 用户可以重新连接服务器, 重新连接后, 会加载之前的聊天记录
### 技术栈

- **前端框架：** 该项目使用 Vue.js 作为前端框架，Element Plus 用于 UI 组件。

- **后端框架：** 后端使用 Node.js +  Mysql 实现，使用 WebSocket 库 ws 作为 WebSocket 服务端。
- **WebSocket：** 实时通信使用 WebSocket 技术，保证消息的实时性。
### 如何运行


1. 克隆项目到本地：

   ```bash
   git clone https://github.com/haostart/websocket-chat.git
   ```

2. 进入项目目录：

   ```bash
   cd yourproject
   ```

3. 安装依赖：

   ```bash
   npm install
   ```
启动项目：
#### 客户端
   `
   npm run serve
   `
#### WebSocket 服务端
进入server文件夹运行

`npm run dev`

   项目将在本地运行，你可以通过浏览器访问 [http://localhost:8080](http://localhost:8080) 来查看应用。

### 项目结构

```
yourproject/
|-- server/ # WebSocket 服务端
|-- src/
|   |-- components/
|   |   |-- ...  # Vue 组件
|   |-- assets/
|   |   |-- ...  # 静态资源
|   |-- views/
|   |   |-- Home.vue  # 主要视图组件
|   |   |-- Login.vue  # 登录视图组件
|   |-- router/
|   |-- App.vue
|   |-- main.js
|-- public/
|-- README.md
|-- ...
```

### 注意事项

1. 请确保已经安装 Node.js 和 npm。
2. 项目中的 WebSocket 连接地址为 `ws://127.0.0.1:9000/ws`，请根据实际情况修改。

