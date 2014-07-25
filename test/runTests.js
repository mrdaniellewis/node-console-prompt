/**
 *	Test console prompt
 */

var prompt = require('console-prompt');
var style = require('console-style');

prompt( style.yellow('Text\n> ') )
	.then( 
		function(value) {
			console.log( style.green('Got value:'), value );
		},
		function(e) {
			console.log( style.red('Error'), e );
		}
	)
	.then( 
		function() {
			return prompt( style.yellow('Test (hidden)\n> '), true );
		}
	)
	.then( 
		function(value) {
			console.log( style.green('Got value:'), value );
		},
		function(e) {
			console.log( style.red('Error'), e );
		}
	)
	.then( 
		function() {
			return prompt( style.yellow('Test again\n> ')  );
		}
	)
	.then( 
		function(value) {
			console.log( style.green('Got value:'), value );
		},
		function(e) {
			console.log( style.red('Error'), e );
		}
	);