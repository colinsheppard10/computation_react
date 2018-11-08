var databaseConnect = {
    getDBConnection: function () {
        return new Promise((res, rej) => {
            const con = {
                conected: 'false',
                connect: function (cb) {
                    var error = true;
                    cb(error);
                }
            }
            return con.connect(function (err) {
                if (err) {
                    console.log(`mysql connection failed trying again in 5`)
                    delayRetry(2, databaseConnect.getDBConnection, res, rej)
                } else {
                    console.log(`no`)
                    res(con);
                }
            });
        })
    }
}

async function callDB() {
    var con = await databaseConnect.getDBConnection();
    console.log('ok');
    console.log(con);
}

callDB();


function delayRetry(time, func, resolve, reject) {
    try {
        setTimeout(() => {
            resolve(func());
        }, time * 1000)
    } catch (err) {
        console.log(err);
        reject(err);
    }
}

async function callPause() {
    var age = 0;
    for (var i = 0; i < 5; i++) {
        age = await pauseExecution(2, i, function (a) {
            console.log(`returning: ${a}`);
            return a;
        })
        console.log(age)
    }
}
