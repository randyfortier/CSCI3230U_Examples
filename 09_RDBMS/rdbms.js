let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let sqlite3 = require('sqlite3').verbose();

// middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: false,
}));

// view engine (Pug)
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// setup our database (open/create it, initialize with tables)
let db = new sqlite3.Database('./data/chirps.db', (error) => {
    if (error) {
        console.error(error.message);
        return;
    }

    console.log('Connected to the SQLite database');
});

db.serialize(() => {
    // disabled since we are now viewing these in the pug file

    /*db.run('DROP TABLE chirps')
    .run(`CREATE TABLE chirps(chirpId INTEGER PRIMARY KEY,
                            sender INTEGER,
                            sentTime DATETIME DEFAULT CURRENT_TIMESTAMP,
                            message TEXT)`)
    .run(`INSERT INTO chirps(sender, sentTime, message) VALUES(1, DATETIME('now'), 'fred was here')`)
    .run(`INSERT INTO chirps(sender, sentTime, message) VALUES(2, DATETIME('now'), 'so was sally')`)
    .run(`INSERT INTO chirps(sender, sentTime, message) VALUES(1, DATETIME('now'), 'fred was here first!')`)
    .run(`INSERT INTO chirps(sender, sentTime, message) VALUES(2, DATETIME('now'), 'so what?')`)
    .run(`INSERT INTO chirps(sender, sentTime, message) VALUES(1, DATETIME('now'), 'fred is the best!')`)
    db.each('SELECT message, sentTime FROM chirps WHERE sender = ?', [2], (error, row) => {
        if (error) {
            throw error;
        }

        console.log(`${row.sentTime}: ${row.message}`);
    });
    */
});

db.serialize(() => {
    // disabled since we're doing this in the Pug file now
    /*
    let deleteId = -1;

    db.run('INSERT INTO chirps (sender, message) VALUES (?, ?)', [2, 'This is a controversial message'], function(error) {
        if (error) {
            console.error(error.message);
            return;
        }

        deleteId = this.lastID;
    })
    .run('INSERT INTO chirps (sender, message) VALUES (?, ?)', [2, 'Oh gosh darn it!'])
    .run(`UPDATE chirps SET message = ? WHERE message LIKE '%darn%'`, ['Censored'], function(error) {
        if (error) {
            console.log(error.message);
            return;
        }

        console.log(`Row(s) updated: ${this.changes}`);
    })
    .run(`DELETE FROM chirps WHERE chirpId = ${deleteId}`, [], function(error) {
        if (error) {
            console.error(error.message);
            return;
        }

        console.log(`Row(s) deleted: ${this.changes}`);
    });
    */
});

app.get('/chirps', (request, response) => {
    db.all('SELECT chirpId, sender, sentTime, message FROM chirps', (error, rows) => {
        if (error) {
            throw error;
        }

        response.render('chirps', {
            title: 'Chirps',
            description: 'A list of chirps',
            chirps: rows,
        });
    });
});

app.post('/deleteChirp', (request, response) => {
    let id = request.body.chirpId;
    db.run('DELETE FROM chirps WHERE chirpId = ?', id, function(error) {
        if (error) {
            console.error(error.message);
            return;
        }

        console.log(`Row(s) deleted: ${this.changes}`);

        response.redirect('/chirps');
    });
});

app.post('/addChirp', (request, response) => {
    let sender = request.body.sender;
    let message = request.body.message;

    db.run('INSERT INTO chirps (sender, message) VALUES (?, ?)', [sender, message], function(error) {
        if (error) {
            console.error(error.message);
            return;
        }

        console.log(`Row(s) deleted: ${this.changes}`);

        response.redirect('/chirps');
    });
});

// web listener
app.set('port', process.env.PORT || 3000);
let server = app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
});
