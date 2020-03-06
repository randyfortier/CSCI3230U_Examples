let express = require('express');
let app = express();
let session = require('express-session');
let uuid = require('uuid/v1');
let bodyParser = require('body-parser');

// middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
app.use(session({
    genid: (request) => { return uuid(); },
    resave: false,
    saveUninitialized: false, 
    //cookie: { secure: true },
    secret: 'laptop hdmi cable',
}));

app.use(function(request, response, next) {
    console.log('REQUEST: url = ' + request.url);
    next();
});

app.get('/hello', (request,response) => {
    request.session.message = 'Hello';
    response.send('Hello, world!');
});

app.get('/cats', (request,response) => {
    response.sendFile(__dirname + '/public/cats.html');
});

app.post('/processLogin', (request, response) => {
    if (request.body.username === 'admin' &&
        request.body.password === '123') {
        response.send('You have successfully logged in!');
    } else {
        response.send('Login incorrect!');
    }
});

app.get('/chat/:userid/:groupid', (request, response) => {
    let userId = request.params.userid;
    let groupId = request.params.groupid;
    response.send(`User ${userId} is chatting in group ${groupId}`);
});

app.set('port', 3000);

app.listen(app.get('port'), () => {
    console.log('Node.js/Express is listening on port ' + app.get('port'));
});