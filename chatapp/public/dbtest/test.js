const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('user.db');

db.serialize(function () {
    console.log(1);
    let exists;

    var create = new Promise(function (resolve, reject) {
        db.each('SELECT name FROM user WHERE name = masaya',
        function (err, row){
            console.log(2);
            exists = true;
            resolve(exists);
        });
      });
      
    console.log(3);
    
    create.then(function (exists) {
        console.log(4);
        if (exists) {
          console.log(5);
          db.run('INSERT INTO user TEXT (aaa)');
        }
    });
});
db.close();