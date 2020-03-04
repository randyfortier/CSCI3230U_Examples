let express = require('express');
let app = express();
let session = require('express-session');
let uuid = require('uuid/v1');

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



app.set('port', 3000);

app.listen(app.get('port'), () => {
    console.log('Node.js/Express is listening on port ' + app.get('port'));
});