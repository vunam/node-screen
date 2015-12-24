// Module dependencies

var fs = require('fs');
var io = require('socket.io');
var http = require('http');
var readline = require('readline');

var rl = readline.createInterface(process.stdin, process.stdout);
//var logStream = fs.createWriteStream('./logFile.log', {flags: 'a'});
var index = fs.readFileSync(__dirname + '/index.html');


module.exports = Screen;

// Constructor

function Screen(port){
  	if (!(this instanceof Screen)) 
  		return new Screen(port);

  	port = port || 3000;

	this.server = this.initServer(port);

	this.socket = io().listen(this.server);
	this.rl = readline.createInterface(process.stdin, process.stdout);

	this.readConsole();
	this.errorHandling();
}

Screen.prototype.initServer = function(port) {
	var serv = http.createServer(function(req, res) {
	    res.writeHead(200, {'Content-Type': 'text/html'});
	    res.end(index);
	});

	serv.listen(port);

	return serv;
}

Screen.prototype.readConsole = function () {
	var self = this;

	rl.on('line', function(line){
	    console.log(line);
	 	 self.socket.emit('line', line);
	})
	
}

Screen.prototype.errorHandling = function () {
	var self = this;
	process.on('uncaughtException', function (err) {
	  	console.error(err);
	 	self.socket.emit('line', err);

	 	//Try to log error before quit.
	 	//timeout one second or when client acknowledge we can stop.
	 	setTimeout(function(){
	 		self.socket.emit('line', err);
	 		process.exit();
	 		throw err;
	 	}, 100);

	});
}



// process.on('beforeExit', function (err) {
//   	//console.error(err);
//  	socket.emit('line', "aaaa");

// });

// process.stdin.resume();//so the program will not close instantly

// function exitHandler(options, err) {
//     if (options.cleanup) console.log('clean');
//     if (err) console.log(err.stack);
//     if (options.exit) process.exit();
// }

// //do something when app is closing
// process.on('exit', exitHandler.bind(null,{cleanup:true}));

// //catches ctrl+c event
// process.on('SIGINT', exitHandler.bind(null, {exit:true}));

// //catches uncaught exceptions
// process.on('uncaughtException', exitHandler.bind(null, {exit:true}));

// rl.on("data", function(chunk) {
//     console.log('received chunk ' + chunk);
// });

// rl.on('line', function(line){
//     console.log(line);
//     logStream.write(line);
//  	 socket.emit('line', line);
// })


// process.stderr.on('end', function(line){
//     console.log("It stopped");
//     console.log(line);
//     console.log("It stopped");
// })

// rl.on('end', function(line){
//     console.log("It stopped");
//     console.log(line);
//     console.log("It stopped");
// })


// process.stderr.on('error', function(line){
//     console.log("It stopped");
//     console.log(line);
//     console.log("It stopped");
// })

// rl.on('error', function(line){
//     console.log("It stopped");
//     console.log(line);
//     console.log("It stopped");
// })


// rl.on('close', function(line){
//     console.log("It stopped");
//     console.log(line);
//     console.log("It stopped");
// })


// test fuctions