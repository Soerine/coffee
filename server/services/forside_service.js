const mysql = require('../config/mysql.js');
const path = require('path');


module.exports = {
    kaffe: () => {
        return new Promise((resolve, reject) => {
            let db = mysql.connect();
            db.execute(`SELECT kaffe_id, kaffe_navn, kaffe_pris, kaffe_billede FROM kaffe`, [], (err, rows) => {
                if (err) {
                    reject(err.message)
                } else {
                    resolve(rows);
                }
            })
            db.end();
        })
    },

    kaffe_detalje: (kaffe_id) => {
        return new Promise((resolve, reject) => {
            let db = mysql.connect();
            db.execute(`SELECT kaffe_id, kaffe_navn, kaffe_pris, kaffe_billede FROM kaffe
            
            WHERE kaffe_id = ?`, [kaffe_id], (err, rows) => {
                    if (err) {
                        reject(err.message)
                    } else {
                        console.log(rows[0])
                        resolve(rows[0])
                    }

                })
            db.end();
        })
    }


}