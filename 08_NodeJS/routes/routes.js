var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var uuid = require('uuid/v1');
var app = express();

// middleware
app.use(express.static('public')); // serve static documents
/*
// will work similar to this code:
app.get('/index.html', function(request, response) {
   response.sendFile(__dirname + '/login.html');
});
*/
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());  // not used, for demonstration only
app.use(session({
   genid: function(request) { return uuid(); },
   resave: false,
   saveUninitialized: false,
   // cookie: {secure: true},
   secret: 'apollo slackware prepositional expectations'
}));

app.get('/processLogin', function(request, response) {
   console.log('/processLogin (GET): username: ' + request.query.username);
});

app.post('/processLogin', function(request, response) {
   console.log('/processLogin (POST): username: ' + request.body.username);
   if (request.body.username === 'admin' && request.body.password === 'opensesame') {
      request.session.username = request.body.username;
      response.send('Thanks for logging in!');
   } else {
      response.send('Get out of here tresspasser!');
   }
});

app.get('/', function(request, response) {
   if (request.session.username) {
      response.send('Permission granted!');
   } else {
      response.send('Unauthorized access!');
   }
});

app.get('/products/:product_id/:user_id', function(request, response) {
   console.log('/products product_id: ' + request.params.product_id);
   console.log('/products user_id: ' + request.params.user_id);
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
	console.log('Server listening on port ' + app.get('port'));
});
