var express = require('express');
var app = express();

var session = require('express-session');
var bodyParser = require('body-parser');
var uuid = require('uuid/v1');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// database config
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/university',
                 { useNewUrlParser: true },
                 function(error) {
                    if (error) {
                       return console.error('Unable to connect:', error);
                    }
                 });
                 //, {useMongoClient: true});
mongoose.set('useCreateIndex', true);

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
var usernames = [];
function userExists(toFind) {
   for (i = 0; i < usernames.length; i++) {
      if (usernames[i] === toFind) {
         return true;
      }
   }
   return false;
}

// database schemas
var Schema = mongoose.Schema;
var userSchema = new Schema({
   username: {
      type: String,
      unique: true,
      index: true
   },
   email: String,
   hashedPassword: String
}, {collection: 'users'});
var User = mongoose.model('user', userSchema);

var studentSchema = new Schema({
   sid: {
      type: String,
      unique: true,
      index: true
   },
   firstName: String,
   lastName: {
      type: String,
      index: true
   },
   gpa: {
      type: Number,
      min: 0.0,
      max: 4.3
   },
   startDate: Date,
   fullTime: Boolean
}, {collection: 'students'});
var Student = mongoose.model('student', studentSchema);

// routes
app.get('/', function(request, response) {
   username = request.session.username;
   response.render('index', {
      title: 'Index',
      description: 'This is the main page',
      username: username
   });
});

function reloadStudentList(request, response, responseMessage) {
   Student.find().then(function(results) {
      response.render('students', {
         title: 'Student List',
         students: results,
         responseMessage: responseMessage
      });
   }).catch(function(error) {
      console.log(error);
   });
}

app.get('/students', function(request, response) {
   reloadStudentList(request, response, '');
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

      response.render('loginConfirm', {username: username,
                                       title: 'Login Successful'});
   } else {
      // login failed
      response.render('login', {
         title: 'Login Page',
         errorMessage: 'Login Incorrect.  Please try again.'
      });
   }
});

app.get('/register', function(request, response) {
  response.render('register', {title: 'Register'});
});

app.post('/processRegistration', function(request, response) {
  var username = request.body.username;
  var password = request.body.pwd;

  if (userExists(username)) {
    response.render('register', {title: 'Register',
                                 errorMessage: 'Username in use'});
  } else {
    usernames.push(username);

    request.session.username = username;

    response.render('registerConfirm', {username: username,
                                        title: 'Welcome aboard!'});
  }
});

app.get('/logout', function(request, response) {
  request.session.username = '';
  response.redirect('/');
});

// web listener
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
	console.log('Server listening on port ' + app.get('port'));
});
