var fs = require('fs');
var readline = require('readline');
var io = require('socket.io');
var http = require('http');

var rl = readline.createInterface(process.stdin, process.stdout);
var logStream = fs.createWriteStream('./logFile.log', {flags: 'a'});

var index = fs.readFileSync(__dirname + '/index.html');
console.log(__dirname + '/index.html');

var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});
var socket = io().listen(app);

app.listen(3000);


rl.on('line', function(line){
    console.log(line);
    logStream.write(line);
 	 socket.emit('line', line);
})

process.on('uncaughtException', function (err) {
  	console.error(err);
 	socket.emit('line', err);

 	//Try to log error before quit.
 	//timeout one second or when client acknowledge we can stop.
 	setTimeout(function(){
 		socket.emit('line', err);
 		process.exit();
 		throw err;
 	}, 100);

});


process.on('beforeExit', function (err) {
  	//console.error(err);
 	socket.emit('line', "aaaa");

});

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

var interval = setInterval(function(){
	var date = new Date();
	rl.write('Delete me!' + date.getSeconds() + "\n");
}, 1000)

setTimeout(function() {
	//clearInterval(interval);

    throw "Some error";

}, 6000)