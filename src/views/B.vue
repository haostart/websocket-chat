<template>
  <div class="home">
    <h3 style="text-align: center">这里是在线聊天室</h3>
    <h3 style="text-align: center">
      <span style="margin-right: 30px">用户名: {{ username }}</span>
      <span>状态: {{ message }}</span>
      <span
        @click="updateUser()"
        style="
          margin-left: 30px;
          color: darkseagreen;
          text-decoration: underline;
          cursor: pointer;
        "
        >修改用户名</span
      >
      &emsp; <input type="text" v-if="isUpdate" v-model="newUserName" /><span
        v-if="isUpdate"
        @click="makeSure"
        >&emsp;确定</span
      >
    </h3>
    <ul class="chat-room" id="chat-room" ref="chat-room">
      <li v-for="item in msgList" :key="item.id" ref="content">
        <p>
          <span>{{ item.user }}</span>
          <span style="margin-left: 10px"
            >{{ dayjs(item.dateTime).format("YYYY-MM-DD HH:mm") }}
          </span>
        </p>
        <p class="msg">{{ item.msg }}</p>
      </li>
    </ul>
    <van-row type="flex" justify="center" align="center">
      <van-col span="8">
        <input
          type="text"
          style="width: 100%"
          autofocus
          @keyup.enter="handleSendBtnClick"
          placeholder="请输入消息按Enter发送"
          v-model="msg"
        />
      </van-col>
      <van-col span="3" style="margin-left: 30px">
        <div
          class="sendBtn"
          @click="handleSendBtnClick"
          color="#576c99"
          size="normal"
        >
          发送
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
// @ is an alias to /src

const ws = new WebSocket("ws://159.75.18.63:9000");
// const ws = new WebSocket("ws://127.0.0.1:9000");

export default {
  name: "myHome",
  components: {},
  data() {
    return {
      msg: "",
      message: "在线中",
      newUserName: "",
      isUpdate: false,
      username: localStorage.getItem("username"),
      contentHeight: 490,
      chatRoom: null,
      msgList: [],
      conversitionList: [],
    };
  },
  //watch 中的函数, 给一个变量发送变化的回调函数, 如果变
  mounted() {
    // this.username = localStorage.getItem("username");
    console.log("this.username", this.username);
    if (!this.username) {
      this.$router.push("/login");
      return;
    }

    ws.addEventListener("open", this.hanlewsOpen.bind(this), false);
    ws.addEventListener("close", this.handlewsClose.bind(this), false);
    ws.addEventListener("error", this.handlewsError.bind(this), false);
    ws.addEventListener("message", this.handlewsMessage.bind(this), false);

    // 拉取本地聊天记录
    this.getRecord();
    this.chatRoom = document.querySelector("#chat-room");
  },

  methods: {
    handleSendBtnClick() {
      const msg = this.msg;
      if (!msg.trim().length) {
        return;
      }
      // 这里必须传递字符串
      ws.send(
        JSON.stringify({
          id: new Date().getTime(),
          user: this.username,
          dateTime: new Date().getTime(),
          msg: this.msg,
        })
      );
      this.msg = "";

      // ws.send({
      //   id: new Date().getTime(),
      //   user:this.username,
      //   dateTime: new Date().getTime(),
      //   msg:this.msg

      // })
    },
    hanlewsOpen(e) {
      console.log("websocket open 前端");
    },
    handlewsClose(e) {
      console.log("websocket close 前端");
      this.message = "连接关闭,请刷新重试!";
    },
    handlewsError(e) {
      console.log("websocket error 前端", e);
      this.message = "连接错误,请刷新重试或者检查网络!";
    },
    handlewsMessage(e) {
      console.log(e);
      console.log("websocket message 前端", e);
      this.msgList.push(JSON.parse(e.data));
      let obj = {
        username: localStorage.getItem("username"),
        msgRecordList: [],
      };
      if (this.username == obj.username) {
        obj.msgRecordList = this.msgList;
        localStorage.setItem("record", JSON.stringify(obj));
      }
      this.$nextTick(() => {
        this.chatRoom.scrollTop = this.chatRoom.scrollHeight;
      });
    },
    updateUser() {
      this.isUpdate = true;
    },
    makeSure() {
      this.isUpdate = false;
      this.username = this.newUserName;
      localStorage.setItem("username", this.username); //set username to local storage for reuse.  (username is the key)
    },
    getRecord() {
      let data = JSON.parse(localStorage.getItem("record")) || {};
      console.log(this.username);
      if (data) {
        if (this.username == data.username) {
          this.msgList = data.msgRecordList; //update the message list.  (the message list is the key)
          this.$nextTick(() => {
            this.chatRoom.scrollTop = this.chatRoom.scrollHeight;
          });
        } else {
          return 0;
        }
      }
    },
  },
};
</script>

<style scoped lang="css">
.home {
  /* text-align: center; */
  padding-bottom: 30px;
}

.home input {
  /* width: 100%; */
  height: 45px;
  padding: 6px 8px;
  border: 2px solid;
  border-color: darkseagreen;
  caret-color: darkseagreen;
  /* caret-shape: underscore; */
  margin-right: 0;
}

.home .sendBtn {
  /* width: 100%; */
  background: darkseagreen;
  height: 60px;
  line-height: 60px;
  color: white;
  text-align: center;
  /* margin-bottom: 10px; */
}

.home .chat-room {
  width: 540px;
  height: 490px;
  margin: 10px auto;
  padding: 30px 30px;
  overflow-y: scroll;
  background: #fff;
  color: black;
  font-size: 14px;
  box-shadow: 9px 9px 27px 13px rgba(0, 0, 0, 0.09);
  box-sizing: border-box;
}

.home .chat-room .msg {
  background-color: darkseagreen;
  /* box-shadow: rgba(18, 23, 45, 0.6) 0px 8px 24px; */
  border-radius: 4px;
  padding: 10px;
  font-size: 12px;
  line-height: 16px;
  width: auto;
  max-width: 330px;
  color: white;
}
</style>
