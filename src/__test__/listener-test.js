import { assert} from 'chai';
import listener from '../listener';

var config = {
	host: 'localhost',
	port: 5555
};

describe('Listener', () => {

	it('Module loads correct', () => {
		return assert.ok(listener);
	});

	it('Listen function is a function', () => {
		return assert.typeOf(listener, 'function');
	});


	it('Listen function loads correct', () => {
		return assert.ok(listener());
	});

	it('Function can read console output', () => {
		var listen = new listener;
		console.log('It works');
		console.log(listen());
		//console.log(listen.consoleText);
		return assert.ok(listen);
	});

})