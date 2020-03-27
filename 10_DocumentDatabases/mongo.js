let express = require('express');
let app = express();

let session = require('express-session');
let bodyParser = require('body-parser');
let uuid = require('uuid/v1');
let mongoose = require('mongoose');
let bcrypt = require('bcrypt-nodejs');
let assert = require('assert');

// setup MongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/university', { useNewUrlParser: true });

let Schema = mongoose.Schema;
let userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        index: true,
    },
    email: String,
    hashedPassword: String,
}, {collection: 'users'});
let User = mongoose.model('user', userSchema);

let studentSchema = new Schema({
    sid: {
        type: String,
        validate: [/^1[0-9]{8}$/, 'must be 9 digits'],
        unique: true,
        index: true,
    },
    firstName: String,
    lastName: {
        type: String,
        index: true,
    },
    gpa: {
        type: Number,
        min: 0.0,
        max: 4.3,
    },
    startDate: Date,
    fullTime: Boolean,
}, {collection: 'students'});
let Student = mongoose.model('student', studentSchema);

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

function reloadStudentList(request, response, errorMessage) {
    Student.find().then(function(studentList) {
        response.render('students', {
            title: 'Student List',
            students: studentList,
            errorMessage: errorMessage,
        });
    });
}

app.get('/students', (request, response) => {
    reloadStudentList(request, response, '');
});

app.post('/deleteStudent', (request, response) => {
    let sid = request.body.sid;

    Student.remove({sid: sid}, (error) => {
        if (error) {
            console.log('Error when deleting student ' + error);
            reloadStudentList(request, response, 'Unable to delete student');
        } else {
            reloadStudentList(request, response, 'Student deleted');
        }
    });
});

app.post('/addOrUpdateStudent', (request, response) => {
    let studentData = {
        sid: request.body.sid,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        gpa: request.body.gpa,
    };

    // determine if we are adding or updating
    Student.find({sid: request.body.sid}).then(function(students) {
        if (students.length > 0) {
            // we already have a student with that sid, so update it
            Student.update({sid: request.body.sid}, studentData, {multi: false}, (error, numAffected) => {
                if (error || numAffected != 1) {
                    console.log('Unable to update student: ' + error);
                    reloadStudentList(request, response, 'Unable to update student');
                } else {
                    reloadStudentList(request, response, 'Student updated');
                }
            });
        } else {
            // we have no student with that sid, so create it
            let newStudent = new Student(studentData);
            newStudent.save(function(error) {
                if (error) {
                    console.log('Error while saving student: ' + error);
                    reloadStudentList(request, response, 'Unable to insert student');
                } else {
                    reloadStudentList(request, response, 'Student added');
                }
            });
        }
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
    let hashedPassword = bcrypt.hashSync(password);

    User.find({username: username, hashedPassword: hashedPassword}).then(function(users) {
        if (users.length > 0) {
            // username and hashed passwords match
            request.session.username = username;
            response.render('loginSuccess', {
                title: 'Login Success',
                username: username,
            });
        } else {
            // login failed (no username)
            response.render('login', {
                title: 'Please Log In',
                errorMessage: 'Login Incorrect',
            });
        }
    });
});

app.get('/register', function(request, response) {
  response.render('register', {title: 'Register'});
});

app.post('/processRegistration', function(request, response) {
  let username = request.body.username;
  let email = request.body.email;
  let password = request.body.pwd;
  let hashedPassword = bcrypt.hashSync(password);

  let newUser = new User({
      username: username,
      email: email,
      hashedPassword: hashedPassword,
  });

  newUser.save((error) => {
      if (error) {
          console.log('Unable to register: ' + error);
          response.render('register', {errorMessage: 'Unable to register user.'});
      } else {
          request.session.username = username;
          response.render('registerConfirm', {
              title: 'Welcome aboard!',
              username: username,
          });
      }
  });
});

app.get('/logout', function(request, response) {
  request.session.username = '';
  response.redirect('/');
});


app.set('port', 3000);

app.listen(app.get('port'), () => {
    console.log('Node.js/Express is listening on port ' + app.get('port'));
});