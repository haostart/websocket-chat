/* eslint-disable */
<template>
  <div class="about">
    <h3 style="color: #576c99">
      欢迎来到在线聊天系统!请输入用户名点击进入聊天室
    </h3>
    <van-row type="flex" justify="center">
      <van-col span="6"></van-col>
      <van-col span="6">
        <input type="text" placeholder="请输入用户名" autofocus v-model="username" />
        <van-button @click="handleEnterBtnClick" color="#576c99" size="normal"
          style="margin-top: 30px">进入聊天室</van-button></van-col>
      <van-col span="6"></van-col>
    </van-row>
  </div>
</template>

<script>
import { User, Message, MessageType } from "../assets/entity.js";
import { inject, ref } from 'vue';
import { socketManager } from '../assets/socket.js';
import { onMounted  } from 'vue';
import { useRouter } from 'vue-router';

const ws = ref(socketManager.getSocket()).value;
export default {

  name: "Login",
  data() {
    return {
      uid: "",
      username: "",
    };
  },
  setup() {

    const router = useRouter();
    console.log("------------------");
    console.log(ws);
    console.log("------------------");
    const message = ref(""); // Assuming you are using a ref for message


    const handlewsOpen = (e) => {
      console.log("websocket open 前端连接成功");
    };

    const handlewsClose = (e) => {
      console.log("websocket close 前端关闭连接");
      message.value = "连接关闭，请刷新重试!";
    };

    const handlewsError = (e) => {
      console.log("websocket error 前端错误", e);
      message.value = "连接错误，请刷新重试或者检查网络!";
    };

    const handlewsMessage = (e) => {
      let data = JSON.parse(e.data);
      console.log("websocket message 前端接收", data);
      if (data.type === MessageType.MESSAGE_LOGIN_SUCCEED) {
        console.log(MessageType.MESSAGE_LOGIN_SUCCEED);
        localStorage.setItem("username", data.data.username);
        localStorage.setItem("uid", data.data.uid);
        router.push("/");
      }
      else{
        console.log(MessageType.MESSAGE_LOGIN_FAILED);
        message.value = "用户名已存在，请重新输入!";}
    };

    onMounted(() => {
      // const username = localStorage.getItem("username");

      ws.addEventListener("open", handlewsOpen, false);
      ws.addEventListener("close", handlewsClose, false);
      ws.addEventListener("error", handlewsError, false);
      ws.addEventListener("message", handlewsMessage, false);
    });

    return { ws, message, handlewsOpen, handlewsClose, handlewsError, handlewsMessage };
  },

  // mounted() {

  // },
  methods: {
    handleEnterBtnClick() {
      const username = this.username.trim();
      if (username.length < 2) {
        alert("用户名不小于2位");
        return;
      }

      ws.send(
        JSON.stringify({
          type: MessageType.MESSAGE_LOGIN,
          data: {
            // uid: uid,
            username: username,
          },
        })
      );
      console.log("websocket message 前端发送", {
        type: MessageType.MESSAGE_LOGIN,
        data: {
          // uid: uid,
          username: username,
        },
      });
    },

  },
};
</script>

<style scoped lang="css">
.about {
  align-items: center;
  text-align: center;
  margin: 100px 30px;
}

.about input {
  width: 300px;
  height: 45px;
  padding: 6px 8px;
  border: 2px solid;
  border-color: #576c99;
  caret-color: #576c99;
  caret-shape: underscore;
}
</style>
