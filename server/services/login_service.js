const mysql = require('../config/mysql.js');

module.exports = {

    login: (email, kodeord) => {
        return new Promise((resolve, reject) => {
            let db = mysql.connect();
            db.execute(`SELECT 
            login_email,
            login_id,
            FROM login
            WHERE login_email = ? AND login_kodeord = ?`,
                [email, kodeord], (err, rows) => {
                    if (err) {
                        console.log(err.message);
                        reject(err.message);
                    } else {
                        if (rows.length == 1) {
                            resolve(rows[0]);
                        } else {
                            //denne reject fejlbesked kommer til at ligge ude i catch() "besked": err, i routen
                            reject('Prøv igen, forkert brugernavn eller kodeord')
                        }
                    }
                });
            db.end();
        });
    },
    login_hash: (email) => {
        return new Promise((resolve, reject) => {
            let db = mysql.connect();
            db.execute(`SELECT 
            login_email,
            login_id,
           login_kodeord
            FROM login
            WHERE login_email = ? `,
                [email], (err, rows) => {
                    if (err) {
                        console.log(err.message);
                        reject(err.message);
                    } else {
                        if (rows.length == 1) {
                            resolve(rows[0]);

                        } else {
                            //denne reject fejlbesked kommer til at ligge ude i catch() "besked": err, i routen
                            reject('Prøv igen, forkert brugernavn eller kodeord')
                        }
                    }
                });
            db.end();
        });
    }
}