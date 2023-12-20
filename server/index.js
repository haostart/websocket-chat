const Ws = require('ws');

let initDate = {
    userList: [{ id: 1, name: "Mike" }, { id: 2, name: "Tom" }, { id: 3, name: "Jack" }],
    groupList: [{ id: 1, name: "Group1", userList: [1, 2, 3] }, { id: 2, name: "Group2", userList: [1, 2] }],
    UserMsgRecordList: [{
        id: new Date().getTime() + Math.floor(Math.random() * 1000000),
        uid: 1,
        username: "testuser",
        tid: 2,
        dateTime: new Date().getTime(),
        text: "testmsg",
    },],
    GroupMsgRecordList: [{
        id: new Date().getTime() + Math.floor(Math.random() * 1000000),
        uid: 1,
        gid: 1,
        gname: "testgroup",
        user: "testuser",
        dateTime: new Date().getTime(),
        text: "testmsg",
    },]
}
    ((Ws) => {
        const server = new Ws.Server({ port: 9000 });
        console.log("后端已启动")


        const init = () => {
            bindEvent()
        }

        function bindEvent() {
            server.on('open', handleOpen);
            server.on('close', handleClose);
            server.on('connection', handleConnection);
            server.on("error", handleError);
        }
        function handleOpen() {
            console.log("后端 websoket open")
        }
        function handleClose() {
            console.log("后端 Websoket close")
        }
        function handleError() {
            console.log("后端 websoket error")
        }
        function handleConnection(ws) {
            console.log("后端  websoket connection")
            ws.uid = null; // 初始化为 null，表示未登录状态

            ws.on('message', handleMessage)

            //发送用户列表和群组列表
            ws.send(JSON.stringify({
                type: "init",
                data: initDate
            }))
            console.log("发送用户列表和群组列表")

        }
        function sendMsgToUser(uid, msg) {
            server.clients.forEach((c) => {
                if (c.readyState === Ws.OPEN) {
                    if (c.uid === uid) {
                        c.send(JSON.stringify(msg))
                    }
                }
            });
        }
        function handleMessage(msg) {
            msg = JSON.parse(msg)
            this.uid = msg.data.uid;

            console.log("前端 websoket uid: %s, message: %s, type: %s", this.uid, msg, msg.type)
            if (msg.type === "groupMsg") {
                initDate.GroupMsgRecordList.push(msg.data)
                console.log("群组消息列表", initDate.GroupMsgRecordList)
                initDate.groupList.forEach((item) => {
                    if (item.id === msg.data.gid) {
                        item.userList.forEach((uid) => {
                            if (uid !== msg.data.uid) {
                                sendMsgToUser(uid, msg)
                                console.log("发送消息给用户", uid)
                            }
                        })
                    }
                })
            }
            else if (msg.type === "userMsg") {
                initDate.UserMsgRecordList.push(msg.data)
                sendMsgToUser(msg.data.tid, msg)
                console.log("发送消息给用户", msg.data.tid)
            }
            else if (msg.type === "currentUser") {
                console.log("当前用户", msg.data)
                let flag = false
                initDate.userList.forEach((item) => {
                    if (item.id === msg.data.uid) {
                        flag = true
                    }
                })
                if (!flag) {
                    initDate.userList.push({ id: msg.data.uid, name: msg.data.username })
                    initDate.groupList[0].userList.push(msg.data.uid)
                    console.log("用户列表", initDate.userList)
                }
            }
            else if (msg.type === "getGroupMsgList") {
                console.log("获取群组消息列表", msg.data)
                let groupMsgList = []
                initDate.GroupMsgRecordList.forEach((item) => {
                    if (item.gid === msg.data.gid) {
                        groupMsgList.push(item)
                    }
                })
                console.log("群组消息列表", groupMsgList)
                this.send(JSON.stringify({
                    type: "groupMsgList",
                    data: groupMsgList
                }))
            }
            else if (msg.type === "getUserMsgList") {
                console.log("获取用户消息列表", msg.data)
                let userMsgList = []
                initDate.UserMsgRecordList.forEach((item) => {
                    if ((item.uid === msg.data.uid || item.tid === msg.data.uid) && (item.uid === msg.data.tid || item.tid === msg.data.tid)) {
                        userMsgList.push(item)
                    }
                })
                console.log("用户消息列表", userMsgList)
                this.send(JSON.stringify({
                    type: "userMsgList",
                    data: userMsgList
                }))
            }
            else if (msg.type === "login") {
                let flag = false
                initDate.userList.forEach((item) => {
                    if (item.id === msg.data.uid) {
                        flag = true
                    }
                })
                if (!flag) {
                    initDate.userList.push({ id: msg.data.uid, name: msg.data.username })
                    initDate.groupList[0].userList.push(msg.data.uid)
                    console.log("用户列表", initDate.userList)
                }
            }

        }
        init()
    })(Ws);