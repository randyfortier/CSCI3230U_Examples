let express = require('express');
let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.use(express.static('public'));

let messageHistory = [];

io.on('connection', function(socket) {
    console.log('User connected');

    for (let i = 0; i < messageHistory.length; i++) {
        socket.emit('broadcast message', messageHistory[i]);
    }

    socket.on('disconnect', function() {
        console.log('User disconnected');
    });

    socket.on('send message', function(data) {
        console.log(data.username + ': ' + data.message);
        messageHistory.push(data);

        // broadcast the message to all clients
        io.emit('broadcast message', data);
    });
});

app.set('port', process.env.PORT || 3000);
http.listen(app.get('port'), function() {
    console.log('Listening on port ' + app.get('port'));
});