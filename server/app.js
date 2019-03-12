const express = require('express');
const app = express();

const logger = require('morgan');
app.use(logger('dev'));

app.set('view engine', 'ejs');
app.set('views', './server/views');
app.engine('ejs', require('express-ejs-extend'));

const session = require('express-session');
app.use(session({
    secret: '2fool4coolios6megabois8snickersBois10Yen12elfs14canteens',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 30,
        secure: false
    }
}));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Dette model kan benyttes til at håndtere filuploads
const fileupload = require('express-fileupload');
//Det er muligt at bestemme hvor store filer der må uploades
app.use(fileupload({
    limits: {
        fileSize: 10 * 1024 * 1024
    } //10mb
}));

// placeres som den absolut første route der rammes
app.get('*', (req, res, next) => {
    req.session.login_id = 1;
    req.session.login_access = 1000;
    next();
});

// simpel catch*all route til hurtigt session rolle tjek på samtlige admin routes
app.get('/admin/*', (req, res, next) => {
    if (req.session.login_access == undefined || req.session.login_access < 100) {
        console.log('admin', 'no access');
        res.redirect('/login');
    } else {
        next();
    }
});


require('./routes/forside.js')(app)
require('./routes/admin.js')(app)
require('./routes/login.js')(app)

app.use(express.static('public'));

const port = 3000;
app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log('App is listening on http://localhost:' + port);
})

