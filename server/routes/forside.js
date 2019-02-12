const forside_service = require('../services/forside_service.js')



module.exports = (app) => {
    app.get('/', (req, res) => {

        (async () => {
            let kaffe = [];
            let logo = [];

            await forside_service.kaffe()
                .then(result => {
                    kaffe = result;
                    console.log(result)
                }).catch(err => {
                    console.log(err)
                })

            await forside_service.logo()
                .then(result => {
                    logo = result;
                    console.log(result)
                }).catch(err => {
                    console.log(err)
                })


            res.render('pages/index', {
                "side": "Forside",
                "logo": logo,
                "kaffe": kaffe,
                "message": '',
                "session": req.session,


            })

        })();
    }),

        app.get('/kaffe_detalje/:kaffe_id', (req, res) => {
            (async () => {
                let kaffe_detalje = {
                    "kaffe_id": 0,
                    "kaffe_navn": "",
                    "kaffe_pris": 0,
                    "kaffe_billede": "",
                };

                await forside_service.kaffe_detalje(req.params.kaffe_id)
                    .then(result => {
                        kaffe_detalje = result
                    }).catch(err => {
                        console.log(err)
                    })

                res.render('pages/kaffe_detalje', {
                    "kaffe_detalje": kaffe_detalje,
                    "side": "Detalje",
                    "message": '',
                    "session": req.session
                })


            })();
        })


}