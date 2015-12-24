// Module dependencies

var listener = require('./listener');

var listen = listener();
var count = 0;
var interval = setInterval(function(){
	var date = new Date();
    count++;
	console.log('Delete me!' + count );
}, 100);

setTimeout(function() {
	//clearInterval(interval);
    throw "Some error";

}, 1500);