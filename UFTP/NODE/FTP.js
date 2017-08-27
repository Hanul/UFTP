UFTP.FTP = CLASS((cls) => {
	
	let Client = require('ftp');
	
	return {

		init : (inner, self, params) => {
			//REQUIRED: params
			//REQUIRED: params.host
			//OPTIONAL: params.port
			//REQUIRED: params.username
			//REQUIRED: params.password
			
			let host = params.host;
			let port = params.port === undefined ? 21 : params.port;
			let username = params.username;
			let password = params.password;
			
			
		}
	};
});
