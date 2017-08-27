UFTP.SFTP = CLASS((cls) => {
	
	let Client = require('ssh2').Client;
	
	return {

		init : (inner, self, params) => {
			//REQUIRED: params
			//REQUIRED: params.host
			//OPTIONAL: params.port
			//REQUIRED: params.username
			//REQUIRED: params.password
			
			let host = params.host;
			let port = params.port === undefined ? 22 : params.port;
			let username = params.username;
			let password = params.password;
			
			
		}
	};
});
