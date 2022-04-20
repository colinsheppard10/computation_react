var mysql = require('mysql');
var constants = require('./keys');

var databaseConnect = {
    getDBConnection: function () {
        return new Promise((res, rej) => {
            const con = mysql.createConnection({
                host: constants.host,
                user: constants.user,
                password: constants.password,
                database: constants.database
            });
            con.connect(function (err) {
                if (err) {
                    console.log(`mysql connection failed trying again in 2 seconds`)
                    databaseConnect.delayRetry(2, databaseConnect.getDBConnection, res, rej)
                } else {
                    console.log(`connected to DB`)
                    res(con);
                }
            });
        })
    },

    delayRetry: function (time, func, resolve, reject) {
        try {
            setTimeout(() => {
                resolve(func());
            }, time * 1000)
        } catch (err) {
            console.log(err);
            reject(err);
        }
    },

    executeQuery: function (con, sql) {
        return new Promise((res, rej) => {
            con.query(sql, function (err, result, fields) {
                if (err) throw err;
                res(result);
            });
        })
    },

    formDate: function(){
        let currentDate = new Date();
        currentDate.setHours(currentDate.getHours() - 4);
        return `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`
    },

    getData: async function (con) {
        var sql = `SELECT * FROM morning_routine`
        var results = await databaseConnect.executeQuery(con, sql);
        if (results.length == 0) {
            throw new Error("No morning routine dataes selected");
        }
        return results;
    },

    insertDate: async function (con, computation, random) {
        var sql = `INSERT INTO morning_routine
                    (time, computation_correct, random_correct, study_session_results)
                        VALUES
                    ('${this.formDate()}',${computation}, ${random}, 0)
                    ON DUPLICATE KEY UPDATE computation_correct=${computation}, random_correct=${random};`
        await databaseConnect.executeQuery(con, sql);
        return;
    },

    insertOrUpdateStudySession: async function (con, studySessionResults) {
        const currentDate = new Date();
        // going to let the db auto increment
        var sql = `INSERT INTO morning_routine
                    (time)
                        VALUES
                    ('${this.formDate()}')
                    ON DUPLICATE KEY UPDATE study_session_results=study_session_results+1;`
        await databaseConnect.executeQuery(con, sql);
        return;
    },

    insertUser: async function (con, user) {
        var sql = `INSERT INTO userx
                    (time, firstName, lastName, email)
                        VALUES
                    ('${this.formDate()}', '${user.firstName}', '${user.lastName}', '${user.email}')`
        await databaseConnect.executeQuery(con, sql);
        return;
    },
    
    insertOrUpdateStudySessionJess: async function (con, studySessionResults) {
        const currentDate = new Date();
        // going to let the db auto increment
        var sql = `INSERT INTO morning_routine_jess
                    (time)
                        VALUES
                    ('${this.formDate()}')
                    ON DUPLICATE KEY UPDATE study_session_results=study_session_results+1;`
        await databaseConnect.executeQuery(con, sql);
        return;
    }, 

    getDataJess: async function (con) {
        var sql = `SELECT * FROM morning_routine_jess`
        var results = await databaseConnect.executeQuery(con, sql);
        if (results.length == 0) {
            throw new Error("No morning routine dataes selected");
        }
        return results;
    }

}
module.exports = databaseConnect;

// sever: mysql
// username: root
// pw: example

// CREATE TABLE morning_routine(
//     time DATE PRIMARY KEY,
//     computation_correct INT(6),
//     random_correct INT(6),
//     study_session_results INT(6) DEFAULT 1 
// );

// CREATE TABLE userx (
//     time DATE,
//     firstName varchar(255),
//     lastName varchar(255),
//     email varchar(255)
// );

// INSERT INTO morning_routine
//     (time, computation_correct, random_correct)
// VALUES
//     ('2019-10-05',2, 1)
//     ON DUPLICATE KEY UPDATE study_session_results=study_session_results+1;