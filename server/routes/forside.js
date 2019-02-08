const forside_service = require('../services/forside_service.js')



module.exports = (app) => {
    app.get('/', (req, res) => {

        (async () => {
            let kaffe = [];

            await forside_service.kaffe()
                .then(result => {
                    kaffe = result;
                    console.log(result)
                }).catch(err => {
                    console.log(err)
                })


            res.render('pages/index', {
                "side": "Forside",
                "kaffe": kaffe,
                "message": '',
                "session": req.session,


            })

        })();
    })


}