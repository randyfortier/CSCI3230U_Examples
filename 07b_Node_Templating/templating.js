let express = require('express');
let app = express();

let session = require('express-session');
let bodyParser = require('body-parser');
let uuid = require('uuid/v1');

// middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configure out view/templating engine
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// session tracking
app.use(session({
    genid: (request) => { return uuid(); },
    resave: false, 
    saveUninitialized: false,
    // cookie: { secure: true},
    secret: 'apollo slackware prepositional expectations',
}));

var usernames = ['admin'];
function usernameExists(toFind) {
    for (let i = 0; i < usernames.length; i++) {
        if (usernames[i] === toFind) {
            return true;
        }
    }
    return false;
}

app.get('/', (request, response) => {
    console.log('/ handler');
    let session = request.session;
    let username = '';
    if (session.username) {
        username = session.username;
    }
    response.render('index', {
        title: 'Main Page',
        description: 'This is the main page',
        username: username,        
    });
});

app.get('/students', (request, response) => {
    let studentList = [
        {sid: '100200300', firstName: 'Bender', lastName: 'Rodriguez'},
        {sid: '100200301', firstName: 'Philip', lastName: 'Fry'},
        {sid: '100200302', firstName: 'Taranga', lastName: 'Leela'},
    ];
    response.render('students', {
        title: 'Student List',
        students: studentList,
    });
});

app.get('/login', (request, response) => {
    response.render('login', {
        title: 'Please Sign In',
    });
});

app.post('/processLogin', (request, response) => {
    let username = request.body.username;
    let password = request.body.password;

    if (usernameExists(username)) {
        // TODO: Check the password
        request.session.username = username;
        response.render('loginSuccess', {
            username: username,
            title: 'Login Success',
        });
    } else {
        // login failed
        response.render('login', {
            title: 'Please Log In',
            errorMessage: 'Login Incorrect',
        });
    }
});

app.set('port', 3000);

app.listen(app.get('port'), () => {
    console.log('Node.js/Express is listening on port ' + app.get('port'));
});