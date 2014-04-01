# Prompt

Prompt the user for information at the console.

```javascript
var prompt = require('consoleprompt');
prompt( 'password\n> ', true )
	.then( function(value) {
		console.log('You\'ve entered password', value );
	} );
```

`prompt` takes two parameters:

* **prompt**: String, text displayed on screen
* **hidden**: Boolean, if true the users input is replaced with stars.