/**
 *	Prompts the user for a value at the console
 */

if ( typeof Promise === 'undefined' ) {
	var Promise = require('Promise');
}

module.exports = function( prompt, hidden ) {
	
	var resolveProxy, rejectProxy;
	var promise = new Promise( function( resolve, reject ) {
		resolveProxy = resolve;
		rejectProxy = reject;
	} );

	process.stdout.write(prompt);
	process.stdin.setEncoding('utf8');

	if ( hidden ) {

		// See http://stackoverflow.com/questions/4708787/get-password-from-input-using-node-js
		process.stdin.setRawMode(true);
		process.stdin.resume();
		var value = '';
		process.stdin
			.on('data', function listener(char) {

				switch (char) {
					case "\n": 
					case "\r": 
					case "\u0004":
						// They've finished typing their password
						process.stdin.pause();
						process.stdin.setRawMode(false);
						
						process.stdin.removeListener( 'data', listener );
						process.stdin.removeListener( 'error', rejectProxy );
						
						process.stdout.write('\n');
						resolveProxy(value);	
					break;
					case "\u007f":
						// Backspace
						value = value.slice(0,-1);
						if ( value.length > 0 ) {
							process.stdout.write('\x1b[1D \x1b[1D');
						}
					break;
					case "\u0003":
						// Ctrl C
						process.exit();
					break;
					default:
						process.stdout.write('*');
						value += char;
					break;
				}

			} )
			.on( 'error', rejectProxy );

	} else {

		process.stdin
			.on('data', function listener(chunk) {

				if ( chunk !== null ) {
					process.stdin.removeListener( 'data', listener );
					process.stdin.removeListener( 'error', rejectProxy );
					process.stdin.pause();
					// Remove trailing \n
					resolveProxy( chunk.slice( 0, -1 ) );
				}
				
			} )
			.on( 'error', rejectProxy )
			.resume();

	}

	return promise;

};