const mysql = require('mysql2');

// module.exports er den kode der muliggører `require()` 
// vi får det tilbage som modulet eksporterer
// i dette modul er det en funktion kaldet `connect`
module.exports = {
    connect: function () {

        return mysql.createConnection({
            'host': 'localhost',
            'user': 'root',
            'password': '',
            'database': 'kaffe_bar'
        });
    }
};