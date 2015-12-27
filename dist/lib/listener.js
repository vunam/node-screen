// Module dependencies

var fs = require('fs');
var io = require('socket.io');
var http = require('http');
var readline = require('readline');
var Convert = require('ansi-to-html');

var index = fs.readFileSync(__dirname + '/../console/index.html');
var js = fs.readFileSync(__dirname + '/../console/app.js');
var style = fs.readFileSync(__dirname + '/../console/style.css');
var convert = new Convert();


module.exports = Screen;

// Constructor
function Screen(port){
  	if (!(this instanceof Screen)) 
  		return new Screen(port);

  	port = port || 8888;
	this.rl = readline.createInterface(process.stdin, process.stdout);
	this.server = this.initServer(port);
	this.socket = io().listen(this.server);
  	this.resetConsole();
	this.readStreams();
	this.receiveSocket();
	this.errorHandling();

	console.log('Console is listening on port: localhost:' + port);
}

//Hijack console.log to send it to STDOUT
Screen.prototype.resetConsole = function() {
	var self = this;
	console.log = function(m){
	  	self.rl.write(m + "\n");
	};
	console.error = function(m){
	 	self.rl.write(m + "\n");
	};
}

Screen.prototype.initServer = function(port) {
	var serv = http.createServer(function(req, res) {

		if(req.url === '/style.css') {
	   	res.writeHead(200, {'Content-Type': 'text/css'});
			res.end(style);
		} else if(req.url === '/app.js') {
	   	res.writeHead(200, {'Content-Type': 'application/javascript'});
			res.end(js);
		} else {
	   	res.writeHead(200, {'Content-Type': 'text/html'});
	    	res.end(index);
		}

	});
	serv.listen(port);
	return serv;
}

Screen.prototype.readStreams = function () {
	var self = this;

	this.rl.on('line', function(line){
	 	self.socket.emit('line', {data: convert.toHtml(line), stream: 'std'});
	})
}

Screen.prototype.receiveSocket = function () {
	this.socket.on('connection', function (socket) {
		socket.on('closed', function (data) {
		 	process.exit();
	  	});
	})
}

//timeout one second or when client acknowledge we can stop.
Screen.prototype.closeHandler = function () {
	this.socket.emit('close', true);
 	setTimeout(function(){
 		process.exit();
 	}, 300);
}

Screen.prototype.errorHandling = function () {
	var self = this;
	process.on('uncaughtException', function (err) {
		self.rl.write(err + "\n");
		self.closeHandler();
	});
}