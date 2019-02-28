var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', function(request, response) {
	response.send('Hello from Node.js and Express!');
});

app.get('/ciao', function(request, response) {
	response.send('Ciao from Node.js and Express!');
});

app.listen(app.get('port'), function() {
	console.log('Server listening on port ' + app.get('port'));
});
