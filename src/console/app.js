var io = require('socket.io-client');

var socket = io();

socket.on('line', function(data) {
    addLine(data);
});

socket.on('close', function(callback) {
   socket.emit('closed', callback);
});

function addLine(data) {
    var line = document.createTextNode(data.data),
        el = document.createElement('li'),
        terminal = document.getElementById('terminal');

    el.innerHTML = line.textContent;
    terminal.appendChild(el);
    window.scrollTo(0,document.body.scrollHeight);
}

var css = require("./style.less");