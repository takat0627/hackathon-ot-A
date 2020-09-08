const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('task.db');

// USERテーブルの情報を確認
// db.serialize(function () {
//     db.each('SELECT name FROM user ',
//     function (err, row){
//         console.log(row.name);
//     });
// });



    let gettask = new Promise(function (resolve, reject) {
        db.all('SELECT rowid AS id, info FROM task', function(err, rows) {
            let test;
            test = { task : rows }
            // console.log(test);
            // console.log('------');
            resolve(test);
        });
    });

    gettask.then( function(test) {
        console.log(test);
        console.log(test.task[10].id);
        //response.render('task', { test : test });
        db.close();
    })

