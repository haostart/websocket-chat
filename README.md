## 项目说明

这是一个基于 WebSocket 实现的简单聊天应用的示例项目。通过该项目，用户可以进行私聊和群聊，实时发送和接收消息。
### 注意
 - **非常简陋**
 - 没有使用数据库,服务启动后直接保存在字典列表里(内存中),如下图:
 - 重启服务端自然会清除聊天数据

![远程图片](sample1.png)
### 功能特性

- 私聊功能：用户可以选择联系人进行一对一私聊，发送即时消息。
- 群聊功能：用户可以加入群组，与群组成员进行群聊。
- 修改用户名：用户可以在界面上直接修改自己的用户名。

### 技术栈

- **前端框架：** 该项目使用 Vue.js 作为前端框架，Element Plus 用于 UI 组件。
- **WebSocket：** 实时通信使用 WebSocket 技术，保证消息的实时性。
- **后端：** 后端采用了 WebSocket 服务器，通过 WebSocket 实现前后端实时数据交互。

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
|-- src/
|   |-- components/
|   |   |-- ...  # Vue 组件
|   |-- assets/
|   |   |-- ...  # 静态资源
|   |-- views/
|   |   |-- Home.vue  # 主要视图组件
|   |-- App.vue
|   |-- main.js
|-- public/
|-- README.md
|-- ...
```

### 注意事项

1. 请确保已经安装 Node.js 和 npm。
2. 项目中的 WebSocket 连接地址为 `ws://127.0.0.1:9000`，请根据实际情况修改。

