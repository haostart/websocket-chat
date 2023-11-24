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
const ws = new WebSocket("ws://127.0.0.1:9000");
export default {
  name: "Login",
  data() {
    return {
      uid: "",
      username: "",
    };
  },
  mounted() {
    const username = localStorage.getItem("username");
    if (username) {
      this.$router.push("/");
      return;
    }
    ws.addEventListener("open", this.hanlewsOpen.bind(this), false);
    ws.addEventListener("close", this.handlewsClose.bind(this), false);
    ws.addEventListener("error", this.handlewsError.bind(this), false);
    ws.addEventListener("message", this.handlewsMessage.bind(this), false);

  },
  methods: {
    handleEnterBtnClick() {
      const username = this.username.trim();
      if (username.length < 2) {
        alert("用户名不小于2位");
        return;
      }
      const uid = new Date().getTime() + Math.floor(Math.random() * 1000);
      localStorage.setItem("username", username);
      localStorage.setItem("uid", uid);
      ws.send(
        JSON.stringify({
          type: "login",
          data: {
            uid: uid,
            username: username,
          },
        })
      );
      this.$router.push("/chat");
    },
    hanlewsOpen(e) {

      console.log("websocket open 前端连接成功");

    },
    handlewsClose(e) {
      console.log("websocket close 前端关闭连接");
      this.message = "连接关闭,请刷新重试!";
    },
    handlewsError(e) {
      console.log("websocket error 前端错误", e);
      this.message = "连接错误,请刷新重试或者检查网络!";
    },
    handlewsMessage(e) {
      let data = JSON.parse(e.data);
      console.log("websocket message 前端接收", data);
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
