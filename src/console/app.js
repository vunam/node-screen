var io = require('socket.io-client');

var socket = io();

socket.on('line', function(data) {
	console.log(data)
    addLine(data);
});

socket.on('close', function(callback) {
   socket.emit('closed', callback);
   console.log("closing");
});

function addLine(data) {
    var line = document.createTextNode(data.data),
        el = document.createElement('li'),
        terminal = document.getElementById('terminal');

    el.innerHTML = line;
    terminal.appendChild(el);
    window.scrollTo(0,document.body.scrollHeight);
}

var css = require("./style.less");