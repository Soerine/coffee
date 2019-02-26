const mysql = require('../config/mysql.js');
const path = require('path');


module.exports = {
    kaffe: () => {
        return new Promise((resolve, reject) => {
            let db = mysql.connect();
            db.execute(`SELECT kaffe_id, kaffe_navn, kaffe_pris, 
            kaffe_billede FROM kaffe
            ORDER BY kaffe_navn ASC`, [], (err, rows) => {
                    if (err) {
                        reject(err.message)
                    } else {
                        resolve(rows);
                    }
                })
            db.end();
        })
    },

    tæl_kaffe: () => {
        return new Promise((resolve, reject) => {
            let db = mysql.connect();
            db.execute(`SELECT COUNT(kaffe_id) AS antal FROM kaffe`, [], (err, rows) => {
                if (err) {
                    reject(err.message)
                } else {
                    console.log(rows[0])
                    resolve(rows[0].antal)
                }

            })
            db.end();
        })
    },

    hent_offset: (offset, limit) => {
        return new Promise((resolve, reject) => {
            let db = mysql.connect();
            // hvor mange skal den springe over / hvor mange skal den tage (`?, ?`)
            db.execute(`SELECT kaffe_id, kaffe_navn, kaffe_pris, kaffe_billede FROM kaffe
             ORDER BY kaffe_navn ASC 
             LIMIT ?, ?`, [offset, limit], (err, rows) => {
                    if (err) {
                        reject(err.message);
                    } else {
                        resolve(rows);
                    }
                });
            db.end();
        });
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
    },

    logo: () => {
        return new Promise((resolve, reject) => {
            let db = mysql.connect();
            db.execute(`SELECT footer_id, footer_logo FROM footer`, [], (err, rows) => {
                if (err) {
                    reject(err.message)
                } else {
                    resolve(rows);
                }
            })
            db.end();
        })
    },



}