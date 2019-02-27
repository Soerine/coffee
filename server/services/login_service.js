const mysql = require('../config/mysql.js')

module.exports = {
    login_hash: (email) => {
        return new Promise((resolve, reject) => {
            let db = mysql.connect();

            db.execute(`SELECT * 
            
            FROM brugere 
            LEFT OUTER JOIN kunder ON fk_bruger_id = bruger_id
            WHERE bruger_email   = ?`, [email], (err, rows) => {
                    if (err) {
                        console.log(err.message);
                        reject(err.message)
                    } else {
                        console.log(rows)
                        if (rows.length == 1) {
                            resolve(rows[0]);
                        } else {
                            reject('Forkert brugernavn eller kodeord')
                        }
                    }
                });
            db.end();
        })
    },

    tag_brugere: () => {
        return new Promise((resolve, reject) => {
            let db = mysql.connect();
            db.execute(`SELECT kunde_id, kunde_fornavn, kunde_efternavn,
             kunde_adresse, bruger_navn, bruger_rolle_niveau
            from kunder
            INNER JOIN brugere ON bruger_id = fk_bruger_id`, [], (err, rows) => {
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