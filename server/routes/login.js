const login_service = require('../services/login_service.js')
const forside_service = require('../services/forside_service.js')
const bcrypt = require('bcrypt');

function renderStuff(req, res, email, error = '') {
    (async () => {
        let trending = [];
        let reklamer = []

        await forside_service.trending()
            .then(result => {
                trending = result;
                console.log(result)
            }).catch(err => {
                console.log(err)
            })
        await forside_service.reklamer()
            .then(result => {
                reklamer = result
            }).catch(err => {
                console.log(err)
            })


        res.render('pages/index', {
            "trending": trending,
            "side": "Kassen",
            "reklamer": reklamer,
            "message": error,
            "email": email,
            "session": req.session


        })

    })();
}

module.exports = (app) => {


    app.post('/login', (req, res) => {
        let formData = true;

        if (req.body.email == undefined || req.body.email == '') {
            formData = false;

        }


        if (req.body.password == undefined || req.body.password == '') {
            formData = false

        }

        if (formData) {
            bruger_service.login_hash(req.body.email)
                .then(user => {

                    if (bcrypt.compareSync(req.body.password, user.bruger_password)) {
                        console.log('success')
                        req.session.cookie.expires = false;
                        // gem de nødvendige variabler i vores session variabel.
                        req.session.bruger_id = user.bruger_id;
                        req.session.kunde_id = user.kunde_id;
                        req.session.bruger_rolle_niveau = user.bruger_rolle_niveau


                        res.redirect('/');
                    } else {
                        renderStuff(req, res, req.body.email, "Forkert brugernavn eller kodeord")
                        console.log('FAIL')
                    } // true
                    // sammenligner kodeord fra formularen, men hashet_kodeord fra database

                }).catch(err => {
                    renderStuff(req, res, req.body.email, err)
                })
        } else {
            renderStuff(req, res, '', 'Udfyld venligst brugernavn eller kodeord')
        }
    }),

        app.get('/logout', (req, res) => {
            // slet de gemte session variabler
            delete req.session.bruger_id
            delete req.session.kunde_id
            delete req.session.bruger_rolle_niveau

            res.redirect('/');
        }),


        app.get('/admin/brugere', (req, res) => {
            if (req.session.bruger_rolle_niveau == undefined) {
                res.redirect('/');
            }
            if (req.session.bruger_rolle_niveau < 100) {
                res.redirect('/');
            }
            (async () => {

                let content = [];

                await bruger_service.tag_brugere()
                    .then(result => {
                        content = result;
                        console.log(content)
                    }).catch(err => {
                        console.log(err)
                    })


                res.render('pages/brugere_admin', {

                    "side": "Brugere",
                    "message": '',
                    "session": req.session,
                    "content": content
                })

            })();
        })


}