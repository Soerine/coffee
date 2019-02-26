const forside_service = require('../services/forside_service.js')



module.exports = (app) => {
    app.get('/', (req, res) => {

        (async () => { //Fordi der skal hentes og udføres flere db kald

            //Angiver det sidenummer, vi befinder os på lige nu
            let side = 1;
            if (req.query.side != undefined || !isNaN(req.query.side)) {//Hvis denne findes og denne er et tal, er vi interesseret i at hente den. Hvis ikke den findes, er 1tallet standart.
                side = req.query.side;//tager sidenumre fra querystring hvis denne eksisterer
            }

            //Her defineres hvor mange elementer, der skal vises pr side - i dette tilfælde kattekaffer
            let pr_side = 3;

            //Holder styr på hvor mange elementer(kattekaffer) der findes i alt.
            let antal_kaffer = 0;
            await forside_service.tæl_kaffe()
                .then(result => antal_kaffer = result)
                .catch(error => console.log(error));

            //Beregner hvor mange elementer, der skal springes over, for at vise siden - hvis der f.eks. bliver trykket på tre, når den står på side 1.
            let offset = (side - 1) * pr_side;

            //Hent elementer(kattekaffer) der skal vises på den nuværende side
            let kaffe = [];
            let logo = [];

            await forside_service.hent_offset(offset, pr_side)
                .then(result => kaffe = result)
                .catch(error => console.log(error));

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
                "sidens_kaffe": kaffe,
                "antal_kaffer": antal_kaffer,
                "kaffe_pr_side": pr_side,
                "side": side,
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