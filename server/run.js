import { User, Message, MessageType } from './entity.js'
import { UserTable, GroupUserTable,GroupTable,GMessageTable, MessageTable } from './DBManager.js';
import WebSocket from 'ws';

const Ws = WebSocket;
const clients = {}; // 存储WebSocket连接的对象
const user = new User();
const userTable = new UserTable();
const groupTable = new GroupTable();
const messageTable = new MessageTable();
const gmessageTable = new GMessageTable();
const group_user = new GroupUserTable();

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

function initWebSocketServer() {
    const server = new Ws.Server({ port: 9000 });
    console.log("后端已启动");

    function init() {
        bindEvent();
    }

    function bindEvent() {
        server.on('open', handleOpen);
        server.on('close', handleClose);
        server.on('connection', handleConnection);
        server.on("error", handleError);
    }

    function handleOpen() {
        console.log("后端 websoket open");
    }

    function handleClose() {
        console.log("后端 Websoket close");
    }

    function handleError() {
        console.log("后端 websoket error");
    }

    async function handleConnection(ws) {
        console.log("后端  websoket connection");
        // 生成唯一的标识符，可以使用更复杂的算法来确保唯一性
        const clientId = Date.now().toString();
        clients[clientId] = ws;

        // ws.uid = clientId; // 将唯一标识符存储在WebSocket实例中

        ws.uid = null; // 初始化为 null，表示未登录状态

        ws.on('message', (msg) => handleMessage.call(ws, msg)); // Pass the WebSocket instance to handleMessage

    }

    function sendMsgToUser(uid, msg) {
        server.clients.forEach((c) => {
            if (c.readyState === Ws.OPEN) {
                if (c.uid === uid) {
                    c.send(JSON.stringify(msg));
                }
            }
        });
    }

    async function handleMessage(msg) {
        msg = JSON.parse(msg)
        this.uid = msg.data.uid;

        console.log("前端 websoket uid: %s, message: %s, type: %s", this.uid, msg, msg.type)
        console.log("Message data: ", JSON.stringify(msg.data));
  
        if (msg.type === MessageType.MESSAGE_CHAT_GROUP) {
            let gname =await groupTable.get_name(msg.data.gid)
            gmessageTable.insert(msg.data.gid, msg.data.uid, gname[0].name, msg.data.text)
            let gmessage = await gmessageTable.get_group_msg(msg.data.gid)
            console.log("群组消息列表", gmessage)
            let userList = await group_user.get_group_users(msg.data.gid)
            console.log("群组用户列表", userList)
            userList.forEach((user) => {
                if(user.uid !== msg.data.uid){
                sendMsgToUser(user.uid, msg)
                console.log("发送消息给用户", user.name)
                }
            })
        }
        else if(msg.type === MessageType.MESSAGE_GET_INIT_DATA){
            let userList = await userTable.selectAll();
            let groupList = await groupTable.get_my_groups(msg.data.uid)
            const initDate = {
                userList: userList,
                groupList: groupList,
            }
            // 发送用户列表和群组列表
            this.send(JSON.stringify({
                type: MessageType.MESSAGE_GET_INIT_DATA,
                data: initDate
            }));
            console.log("发送用户列表和群组列表");
        }
        else if (msg.type === MessageType.MESSAGE_CHAT) {
            messageTable.insert(msg.data.uid, msg.data.tid, msg.data.text)
            sendMsgToUser(msg.data.tid, msg)
            console.log("发送消息给用户", msg.data.tid)
        }
        // else if (msg.type === MessageType.MESSAGE_GET_ONLINE_USERS) {
        //     console.log("当前用户", msg.data)
        //     let flag = false
        //     initDate.userList.forEach((item) => {
        //         if (item.id === msg.data.uid) {
        //             flag = true
        //         }
        //     })
        //     if (!flag) {
        //         initDate.userList.push({ id: msg.data.uid, name: msg.data.username })
        //         initDate.groupList[0].userList.push(msg.data.uid)
        //         console.log("用户列表", initDate.userList)
        //     }
        // }
        else if (msg.type === MessageType.MESSAGE_GET_GROUP_MESSAGE_LIST) {
            console.log("获取群组消息列表", msg.data)
            let groupMsgList = await gmessageTable.get_group_msg(msg.data.gid)
            console.log("群组消息列表", groupMsgList)
            this.send(JSON.stringify({
                type: MessageType.MESSAGE_GET_GROUP_MESSAGE_LIST,
                data: groupMsgList
            }))
        }
        else if (msg.type === MessageType.MESSAGE_GET_USER_MESSAGE_LIST) {
            console.log("获取用户消息列表", msg.data)
            let userMsgList = await messageTable.get_user_msg(msg.data.uid, msg.data.tid)
            // initDate.UserMsgRecordList.forEach((item) => {
            //     if ((item.uid === msg.data.uid || item.tid === msg.data.uid) && (item.uid === msg.data.tid || item.tid === msg.data.tid)) {
            //         userMsgList.push(item)
            //     }
            // })
            console.log("用户消息列表", userMsgList)
            this.send(JSON.stringify({
                type: MessageType.MESSAGE_GET_USER_MESSAGE_LIST,
                data: userMsgList
            }))
        }
        else if (msg.type === MessageType.MESSAGE_LOGIN) {
            const res = await userTable.checkUser(msg.data.username,'1')
            console.log("登录", msg.data.username, res)
            let obj = {}
            if (res === null || res === undefined  || res.length === 0) {
                const uid = await userTable.insert(msg.data.username,msg.data.username)
                await group_user.insert(uid,1)
                const userList = await userTable.selectAll();
                console.log("用户列表", userList)
                obj = {
                    type: MessageType.MESSAGE_LOGIN_SUCCEED,
                    data: {
                        uid: uid,
                        username: msg.data.username,
                    }
                }
            }
            else {
                const uid = res[0].uid
                obj = {
                    type: MessageType.MESSAGE_LOGIN_SUCCEED,
                    data: {
                        uid: uid,
                        username: msg.data.username,
                    }
                }

            }
            // else{
            //     obj = {
            //         type: MessageType.MESSAGE_LOGIN_FAILED,
            //         data: {
            //             uid: null,
            //             username: null,
            //         }
            //     }
            //     console.log(MessageType.MESSAGE_LOGIN_FAILED)
            // }
            this.send(JSON.stringify(obj));

        }

    }
    init();
}

initWebSocketServer(); // 调用函数以启动WebSocket服务器
