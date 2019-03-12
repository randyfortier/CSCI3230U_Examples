var express = require('express');
var app = express();

var session = require('express-session');
var bodyParser = require('body-parser');
var uuid = require('uuid/v1');

// middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

// configure the templating engine
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// configure sessions
app.use(session({
   genid: function(request) { return uuid(); },
   resave: false,
   saveUninitialized: false,
   // cookie: {secure: true},
   secret: 'apollo slackware prepositional expectations'
}));

// utility functions (read: hacks)
var usernames = ['bsmith'];
function userExists(toFind) {
   for (i = 0; i < usernames.length; i++) {
      if (usernames[i] === toFind) {
         return true;
      }
   }
   return false;
}

// routes
app.get('/basic', function(request, response) {
   response.render('basic', {
      title: 'Basic Page',
      message:  'This is a basic page.'
   });
});

app.get('/', function(request, response) {
   username = request.session.username;
   response.render('index', {
      title: 'Index',
      description: 'This is the main page',
      username: username
   });
});

app.get('/login', function(request, response) {
   response.render('login', {
      title: 'Login Page',
      errorMessage: ''
   });
});

app.post('/processLogin', function(request, response) {
   username = request.body.username;
   password = request.body.password;

   if (userExists(username)) {
      // login success (obviously, not secure)
      request.session.username = username;

      response.render('loginConfirm', {
         title: 'Login Successful',
         message: 'You have successfully logged in.'
      });
   } else {
      // login failed
      response.render('login', {
         title: 'Login Page',
         errorMessage: 'Login Incorrect.  Please try again.'
      });
   }
});

app.get('/students', function(request, response) {
   var studentList = [
      {sid: '100200300', firstName: 'Philip', lastName: 'Fry'},
      {sid: '100200301', firstName: 'Taranga', lastName: 'Leela'},
      {sid: '100200302', firstName: 'Bender', lastName: 'Rodriguez'}
   ];

   response.render('students', {
      title: 'Class List',
      students: studentList
   });
});

// web listener
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
	console.log('Server listening on port ' + app.get('port'));
});
