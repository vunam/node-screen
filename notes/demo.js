// Module dependencies

var listener = require('./listener');

var listen = listener();
var count = 0;
var interval = setInterval(function(){
	var date = new Date();
    count++;
	console.log('Test!' + count );
}, 10);

setTimeout(function() {
	//clearInterval(interval);
    throw "Some error";

}, 5000);