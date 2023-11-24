import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import 'element-plus/dist/index.css'
import utils from 'element-plus/es'
import Vant from "vant";
import "vant/lib/index.css";
const app = createApp(App);
app.config.productionTip = false;
const dayjs = require("dayjs");
app.config.globalProperties.dayjs = dayjs;

app.use(utils)
app.use(router);
app.use(Vant);
app.mount("#app");
