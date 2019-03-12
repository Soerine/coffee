const mysql = require('../config/mysql.js');
const path = require('path');

function hent_kop_farver(kaffe_id) {
    return new Promise((resolve, reject) => {
        let db = mysql.connect();
        db.execute(`SELECT farve_navn, farve_id 
        FROM kaffe_kop_farve
        INNER JOIN kop_farve ON farve_id = fk_farve_id
        WHERE fk_kaffe_id =?`, [kaffe_id], (err, rows) => {
                if (err) {
                    reject(err.message)
                } else {
                    resolve(rows);
                }
            })
        db.end();
    })
}

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
            db.execute(`SELECT k.kaffe_navn, kaffe_pris, kaffe_billede, kaffe_id, 
            GROUP_CONCAT(f.farve_navn ORDER BY f.farve_navn SEPARATOR ', ' ) AS farver
            FROM kaffe AS k, kaffe_kop_farve kkf, kop_farve AS f 
            WHERE kkf.fk_kaffe_id = k.kaffe_id AND kkf.fk_farve_id = f.farve_id 
            GROUP BY kkf.fk_kaffe_id ORDER BY k.kaffe_navn
            LIMIT ?, ?
            `, [offset, limit], (err, rows) => {
                    if (err) {
                        reject(err.message);
                    } else {

                        console.log(rows);
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

    //FARVER

    hent_farver: () => {
        return new Promise((resolve, reject) => {
            let db = mysql.connect();
            db.execute(`SELECT farve_navn, farve_id FROM kop_farve
         `, [], (err, rows) => {
                    if (err) {
                        reject(err.message)
                    } else {
                        resolve(rows);
                    }
                })
            db.end();
        })
    },

    hent_kop_farver: hent_kop_farver,

    opret_kop_farve: (values) => {
        return new Promise((resolve, reject) => {
            let db = mysql.connect();

            let sql_values = [];

            values.colors.forEach(color_id => {
                sql_values.push(`(${values.kaffe_id}, ${farve_id})`);
            })

            let sql_query = `INSERT INTO kop_farve (fk_kaffe_id, fk_farve_id) VALUES ` + sql_values.join(',');

            db.execute(sql_query, [values], (err, rows) => {
                if (err) {
                    reject('sql fejl! ' + err.message);
                } else {
                    resolve(rows);
                }
            });
            // console.log(sql_query);
            db.end();
        });
    },
    slet_kop_farve: (id) => {
        // delete_bike_colors: (bike_color_ids) => {
        return new Promise((resolve, reject) => {
            let db = mysql.connect();
            // bike_color_ids = [1,2,3]

            let sql_query = `DELETE FROM 
                                kaffe_kop_farve
                            WHERE 
                                fk_kaffe_id = ? `;
            // bike_color_id IN(` + bike_color_ids.join(',') + `) `;

            db.execute(sql_query, [id], (err, rows) => {
                if (err) {
                    reject('sql fejl! ' + err.message);
                } else {
                    resolve(rows)
                }
            });
            db.end();
        });
    }



}