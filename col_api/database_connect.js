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
                    (computation_correct, random_correct)
                        VALUES
                    (${computation}, ${random});`
        await databaseConnect.executeQuery(con, sql);
        return;
    }
}
module.exports = databaseConnect;

// CREATE TABLE morning_routine(
//     time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     computation_correct INT(6),
//     random_correct INT(6)
// );

// INSERT INTO morning_routine
//     (computation_correct, random_correct)
// VALUES
//     (1, 1);