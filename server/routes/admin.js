const forside_service = require('../services/forside_service.js')
const admin_service = require('../services/admin_service.js')



module.exports = (app) => {
    app.get('/admin', (req, res) => {

        (async () => {
            let logo = []

            await forside_service.logo()
                .then(result => {
                    logo = result;
                    console.log(result)
                }).catch(err => {
                    console.log(err)
                })

            res.render('pages/admin_forside', {
                "logo": logo,
                "side": "Kassen",
                "message": '',
                "session": req.session
            })

        })();
    })

}