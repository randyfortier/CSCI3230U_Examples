window.onload = function() {
    let socket = io();

    let usernameField = document.getElementById('username');
    let messageField = document.getElementById('message');
    let sendButton = document.getElementById('btnSend');
    sendButton.onclick = function() {
        socket.emit('send message', {
            username: usernameField.value,
            message: messageField.value,
        });
    };

    socket.on('broadcast message', function(data) {
        console.log(data.username + ': ' + data.message);
        let messages = document.getElementById('messages');
        messages.innerHTML += '<div>' + data.username + ': ' + data.message + '</div>';
    });
};