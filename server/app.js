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


require('./routes/forside.js')(app)
require('./routes/admin.js')(app)

app.use(express.static('public'));

const port = 3000;
app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log('App is listening on http://localhost:' + port);
})

