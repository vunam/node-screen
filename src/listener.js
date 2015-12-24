var fs = require('fs');
var readline = require('readline');

var rl = readline.createInterface(process.stdin, process.stdout);
var logStream = fs.createWriteStream('./logFile.log', {flags: 'a'});

rl.on('line', function(line){
    console.log(line);
    logStream.write(line);
})

setInterval(function(){
	var date = new Date();
	rl.write('Delete me!' + date.getSeconds() + "\n");
}, 1000)