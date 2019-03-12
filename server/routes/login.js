const login_service = require('../services/login_service.js');


module.exports = (app) => {
    // Login siden
    app.get('/login', (req, res) => {
        res.render('pages/login', {
            "email": "",
            "besked": "",
            "page": "login",
            "session": req.session
        });
    });

    app.post('/login', (req, res) => {
        console.log(req.body.email);
        //validering
        let email = req.body.email;
        if (email == undefined) {
            email = '';

        }
        let kodeord = req.body.kodeord;
        if (kodeord == undefined) {
            kodeord = '';

        }
        if (email == '' && kodeord == '') {
            res.sendStatus(400);
        } else {
            console.log(email, kodeord);
            login_service.login(req.body.email, req.body.kodeord)
                //Det er kun når vi har den ene bruger at vi kan logge ind
                .then(result => {
                    // gem de nødvendige variabler i vores session variabel.
                    req.session.login_id = result.login_id;

                    console.log(req.session.login_id);

                    res.redirect('/admin');
                })
                .catch(err => {
                    // login fejlede,
                    console.log(err);
                    res.render('pages/login', {
                        "page": "login",
                        "email": req.body.email,
                        "besked": err,
                        "session": req.session
                    });
                })
        }
    });

    app.get('/logout', (req, res) => {
        req.session.destroy((err) => {
            if (err) { console.log(err); }
            res.redirect('/login');
        });
    });

}