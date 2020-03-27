let express = require('express');
let app = express();

let session = require('express-session');
let bodyParser = require('body-parser');
let uuid = require('uuid/v1');
let mongoose = require('mongoose');
let bcrypt = require('bcrypt-nodejs');

// database config
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/university', {
      useNewUrlParser: true
   },
   function(error) {
      if (error) {
         return console.error('Unable to connect:', error);
      }
   });
//, {useMongoClient: true});
mongoose.set('useCreateIndex', true);

// middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
   extended: false
}));

// configure the templating engine
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// configure sessions
app.use(session({
   genid: function(request) {
      return uuid();
   },
   resave: false,
   saveUninitialized: false,
   // cookie: {secure: true},
   secret: 'apollo slackware prepositional expectations'
}));

// database schemas
let Schema = mongoose.Schema;
let userSchema = new Schema({
   username: {
      type: String,
      unique: true,
      index: true
   },
   email: String,
   hashedPassword: String
}, {
   collection: 'users'
});
let User = mongoose.model('user', userSchema);

let studentSchema = new Schema({
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
}, {
   collection: 'students'
});
let Student = mongoose.model('student', studentSchema);

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

app.post('/deleteStudent', function(request, response) {
   sid = request.body.sid;
   Student.remove({
      sid: sid
   }, function(error) {
      if (error) {
         reloadStudentList(request, response, 'Unable to delete student');
      } else {
         reloadStudentList(request, response, 'Student deleted');
      }
   });
});

app.post('/addOrUpdateStudent', function(request, response) {
   sid = request.body.sid;
   firstName = request.body.firstName;
   lastName = request.body.lastName;
   gpa = parseFloat(request.body.gpa);

   studentData = {
      sid: sid,
      firstName: firstName,
      lastName: lastName,
      gpa: gpa
   };

   Student.find({
      sid: sid
   }).then(function(results) {
      if (results.length > 0) {
         // update an existing student
         Student.updateOne({
               sid: sid
            },
            studentData,
            function(error, numAffected) {
               if (error != null || numAffected != 1) {
                  console.log('update error:', error);

                  reloadStudentList(request, response, 'Unable to update student');
               } else {
                  reloadStudentList(request, response, 'Student updated');
               }
            });
      } else {
         // add a new student
         newStudent = new Student(studentData);
         newStudent.save(function(error) {
            if (error != null) {
               console.log('add error:', error);
               reloadStudentList(request, response, 'Unable to add student');
            } else {
               reloadStudentList(request, response, 'Student added');
            }
         });

      }
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

   User.find({username: username}).then(function(results) {
      if (results.length != 1) {
         console.log('login: no user found');
         // error logging in - no such user
         response.render('login', {
            errorMessage: 'Login Incorrect'
         });
      } else {
         // user was found, now check the password
         console.log('login password:', results[0].hashedPassword);
         if (bcrypt.compareSync(password, results[0].hashedPassword)) {
            // password match - successful login
            request.session.username = username;
            response.render('loginSuccess', {
               username: username,
               title: 'Login Success'
            });
         } else {
            console.log('login: password is not a match');
            // error logging in - invalid password
            response.render('login', {
               errorMessage: 'Login Incorrect'
            });
         }
      }
   }).catch(function(error) {
      // error logging in - no such user
      console.log('login: catch');
      response.render('login', {
         errorMessage: 'Login Incorrect'
      });
   });
});

app.get('/register', function(request, response) {
   response.render('register', {
      title: 'Register'
   });
});

app.post('/processRegistration', function(request, response) {
   username = request.body.username;
   email = request.body.email;
   password = request.body.pwd;

   hashedPassword = bcrypt.hashSync(password);
   console.log('register password:', hashedPassword);

   newUser = new User({
      username: username,
      email: email,
      hashedPassword: hashedPassword
   });

   newUser.save(function(error) {
      if (error) {
         response.render('register',
                         {errorMessage: 'Invalid registration data'});
      } else {
         request.session.username = username; // logged in
         response.render('registerConfirm', {
            username: username,
            title: 'Welcome aboard!'
         });
      }
   });
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
