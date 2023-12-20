// const mysql = require('mysql2');
import mysql2 from 'mysql2'
const mysql = mysql2;
class DataBaseManager {
    constructor() {

        this.connectDatabase();

    }

    connectDatabase() {
        try {
            this.conn = mysql.createConnection({
                host: '172.30.42.161',
                user: 'haostart',
                password: 'haostart',
                database: 'test'
            });
            console.log('Connected to the database');
        } catch (error) {
            console.error('Error connecting to the database:', error.message);
        }
    }


    async close() {
        try {
            await this.conn.end();
        } catch (error) {
            console.error('Error closing the database connection:', error.message);
        }
    }
}

class UserTable extends DataBaseManager {
    constructor() {
        super();
    }

    // async createTable() {
    //     const sql = "CREATE TABLE IF NOT EXISTS USER " +
    //         "(uid INTEGER not NULL AUTO_INCREMENT, " +
    //         " name VARCHAR(255), " +
    //         " password VARCHAR(255), " +
    //         " PRIMARY KEY ( uid ))";

    //     try {
    //         const [rows, fields] = (await this.conn).execute(sql);
    //         console.log('User table created:', rows);
    //     } catch (error) {
    //         console.error('Error creating user table:', error.message);
    //     }
    // }
    async get_uid(name) {
        const sql = "SELECT uid FROM USER WHERE name = ?";
        const values = [name];

        return new Promise((resolve, reject) => {
            this.conn.execute(sql, values, (err, results, fields) => {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    reject(err);
                } else {
                    console.log('get_uid result', results);
                    resolve(results);
                }
            });
        });
    }
    async get_name(uid) {
        const sql = "SELECT name FROM USER WHERE uid = ?";
        const values = [uid];

        return new Promise((resolve, reject) => {
            this.conn.execute(sql, values, (err, results, fields) => {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    reject(err);
                } else {
                    console.log('get_name result', results);
                    resolve(results);
                }
            });
        });
    }

    async insert(name, password) {
        // console.log(this.conn)
        const sql = "INSERT IGNORE INTO USER (name, password) VALUES (?, ?)";
        const values = [name, password];

        return new Promise((resolve, reject) => {
            this.conn.execute(sql, values, (err, results, fields) => {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    reject(err);
                } else {
                    console.log('insert result', results);
                    // console.log('insert result', results.insertId);
                    resolve(results.insertId);
                }
            });
        });

    }
    async selectAll() {
        const sql = "SELECT * FROM USER";

        return new Promise((resolve, reject) => {
            this.conn.execute(sql, [], (err, results, fields) => {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    reject(err);
                } else {
                    console.log('selectAll result', results);
                    resolve(results);
                }
            });
        });
    }


    async checkUser(name, password) {
        // const sql = "SELECT * FROM USER WHERE name = ? AND password = ?";
        const sql = "SELECT * FROM USER WHERE name = ?";
        const values = [name];

        return new Promise((resolve, reject) => {
            this.conn.execute(sql, values, (err, results, fields) => {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    reject(err);
                    return;
                }

                console.log('checkUser result', results);

                // 在这里判断是否有结果
                const hasResults = results ;

                resolve(hasResults);
            });
        });
    }
}
class GroupTable extends DataBaseManager {
    constructor() {
        super();
    }



    async insert(name) {
        const sql = "INSERT INTO `GROUPS` (name) VALUES (?)";
        const values = [name];

        return new Promise((resolve, reject) => {
            this.conn.execute(sql, values, (err, results, fields) => {
                if (err) {
                    console.log('[INSERT ERROR] - ', err.message);
                    reject(err);
                } else {
                    console.log('Insert result', results);
                    resolve(results);
                }
            });
        });
    }
    async get_gid(name) {
        const sql = "SELECT gid FROM `GROUPS` WHERE name = ?";
        const values = [name];

        return new Promise((resolve, reject) => {
            this.conn.execute(sql, values, (err, results, fields) => {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    reject(err);
                } else {
                    console.log('get_gid result', results);
                    resolve(results);
                }
            });
        }
        );
    }
    async get_name(gid) {
        const sql = "SELECT name FROM `GROUPS` WHERE gid = ?";
        const values = [gid];

        return new Promise((resolve, reject) => {
            this.conn.execute(sql, values, (err, results, fields) => {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    reject(err);
                } else {
                    console.log('get_name result', results);
                    resolve(results);
                }
            });
        }
        ); 
    }
    async get_my_groups(uid) {
        const sql = "SELECT * FROM `GROUPS` WHERE gid IN (SELECT gid FROM GROUP_USER WHERE uid = ?)";
        const values = [uid];

        return new Promise((resolve, reject) => {
            this.conn.execute(sql, values, (err, results, fields) => {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    reject(err);
                } else {
                    console.log('get_my_groups result', results);
                    resolve(results);
                }
            });
        });
    }
    async selectAll() {
        const sql = "SELECT * FROM `GROUPS`";

        return new Promise((resolve, reject) => {
            this.conn.execute(sql, [], (err, results, fields) => {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    reject(err);
                } else {
                    console.log('SelectAll result', results);
                    resolve(results);
                }
            });
        });
    }
}
class GMessageTable extends DataBaseManager {
    constructor() {
        super();
    }


    async insert(gid, uid, gname, text) {
        const sql = "INSERT INTO GMESSAGE (gid, uid, gname, text) VALUES (?, ?, ?, ?)";
        const values = [gid, uid, gname, text];

        return new Promise((resolve, reject) => {
            this.conn.execute(sql, values, (err, results, fields) => {
                if (err) {
                    console.log('[INSERT ERROR] - ', err.message);
                    reject(err);
                } else {
                    console.log('Insert result', results);
                    resolve(results);
                }
            });
        });
    }
    async get_group_msg(gid) {
        const sql = "SELECT GMESSAGE.*, USER.name AS username " +
            "FROM GMESSAGE " +
            "JOIN USER ON GMESSAGE.uid = USER.uid " +
            "WHERE GMESSAGE.gid = ?";
        const values = [gid];

        return new Promise((resolve, reject) => {
            this.conn.execute(sql, values, (err, results, fields) => {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    reject(err);
                } else {
                    console.log('get_group_msg result', results);
                    resolve(results);
                }
            });
        });
    }
    async selectAll() {
        const sql = "SELECT * FROM GMESSAGE";

        return new Promise((resolve, reject) => {
            this.conn.execute(sql, [], (err, results, fields) => {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    reject(err);
                } else {
                    console.log('SelectAll result', results);
                    resolve(results);
                }
            });
        });
    }
}
class MessageTable extends DataBaseManager {
    constructor() {
        super();
    }


    async insert(s_uid, r_uid,  text) {
        const sql = "INSERT INTO UMESSAGE (s_uid, r_uid,  text) VALUES (?, ?, ?)";
        const values = [s_uid, r_uid,  text];

        return new Promise((resolve, reject) => {
            this.conn.execute(sql, values, (err, results, fields) => {
                if (err) {
                    console.log('[INSERT ERROR] - ', err.message);
                    reject(err);
                } else {
                    console.log('Insert result', results);
                    resolve(results);
                }
            });
        });
    }
    async get_user_msg(s_uid, r_uid) {
        const sql = "SELECT UMESSAGE.s_uid AS uid, UMESSAGE.r_uid AS tid,UMESSAGE.text AS text, USER.name AS username " +
            "FROM UMESSAGE " +
            "JOIN USER ON UMESSAGE.s_uid = USER.uid " +
            "WHERE UMESSAGE.s_uid = ? AND UMESSAGE.r_uid = ? " +
            "OR UMESSAGE.s_uid = ? AND UMESSAGE.r_uid = ? " +
            "ORDER BY UMESSAGE.time ASC";
        const values = [s_uid, r_uid, r_uid, s_uid];

        return new Promise((resolve, reject) => {
            this.conn.execute(sql, values, (err, results, fields) => {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    console.log('[SELECT ERROR] - ', sql);
                    console.log('[SELECT ERROR] - ', values);
                    reject(err);
                } else {
                    console.log('get_user_msg result', results);
                    resolve(results);
                }
            });
        });
    }
    async selectAll() {
        const sql = "SELECT * FROM UMESSAGE";

        return new Promise((resolve, reject) => {
            this.conn.execute(sql, [], (err, results, fields) => {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    reject(err);
                } else {
                    console.log('SelectAll result', results);
                    resolve(results);
                }
            });
        });
    }
}

class GroupUserTable extends DataBaseManager {
    constructor() {
        super();
    }
    async get_group_users(gid) {
        const sql = "SELECT * FROM USER WHERE uid IN (SELECT uid FROM GROUP_USER WHERE gid = ?)";
        const values = [gid];

        return new Promise((resolve, reject) => {
            this.conn.execute(sql, values, (err, results, fields) => {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    reject(err);
                } else {
                    console.log('get_group_users result', results);
                    resolve(results);
                }
            });
        });
    }
    async insert(uid, gid) {
        const sql = "INSERT INTO GROUP_USER (uid, gid) VALUES (?, ?)";
        const values = [uid, gid];

        return new Promise((resolve, reject) => {
            this.conn.execute(sql, values, (err, results, fields) => {
                if (err) {
                    console.log('[INSERT ERROR] - ', err.message);
                    reject(err);
                } else {
                    console.log('Insert result', results);
                    resolve(results);
                }
            });
        });
    }

}
export { UserTable, GroupUserTable, GroupTable, GMessageTable, MessageTable };
// 示例用法
// (async () => {
//     const userTable = new UserTable();
//     // await userTable.createTable();
//     await userTable.insert("123", "123");
//     await userTable.selectAll();
//     await userTable.close();

//     // const messageTable = new MessageTable();
//     // // await messageTable.createTable();
//     // await messageTable.insert("John", "Alice", "Hello!", new Date());
//     // await messageTable.selectAll();
//     // await messageTable.close();
// })();
