import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import 'element-plus/dist/index.css'
import utils from 'element-plus/es'
import Vant from "vant";
import "vant/lib/index.css";
import { socketManager } from './assets/socket.js'


const app = createApp(App);
app.config.productionTip = false;
const dayjs = require("dayjs");
app.config.globalProperties.dayjs = dayjs;

// app.use(provideSocket); // 使用 provideSocket 提供全局 WebSocket 连接
app.use(socketManager);
app.config.globalProperties.socketManager = socketManager; // Add socketManager to globalProperties

app.use(utils)
app.use(router);
app.use(Vant);
app.mount("#app");
