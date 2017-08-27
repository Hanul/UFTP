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
			
			let waitingWriteFileInfos = [];
			let waitingReadFileInfos = [];
			let waitingGetFileInfoInfos = [];
			let waitingCopyFileInfos = [];
			let waitingMoveFileInfos = [];
			let waitingRemoveFileInfos = [];
			let waitingCheckFileExistsInfos = [];
			let waitingCreateFolderInfos = [];
			let waitingCopyFolderInfos = [];
			let waitingRemoveFolderInfos = [];
			let waitingCheckIsFolderInfos = [];
			let waitingFindFileNamesInfos = [];
			let waitingFindFolderNamesInfos = [];
			
			let writeFile = self.writeFile = (params, callbackOrHandlers) => {
				//REQUIRED: params
				//REQUIRED: params.path		작성할 파일의 경로
				//OPTIONAL: params.content	파일에 작성할 내용 (문자열)
				//OPTIONAL: params.buffer	파일에 작성할 내용 (Buffer)
				//OPTIONAL: callbackOrHandlers
				//OPTIONAL: callbackOrHandlers.error
				//OPTIONAL: callbackOrHandlers.success
				
				waitingWriteFileInfos.push({
					params : params,
					callbackOrHandlers : callbackOrHandlers
				});
			};
			
			let readFile = self.readFile = (path, callbackOrHandlers) => {
				//REQUIRED: path	불러올 파일의 경로
				//OPTIONAL: callbackOrHandlers
				//OPTIONAL: callbackOrHandlers.notExists
				//OPTIONAL: callbackOrHandlers.error
				//OPTIONAL: callbackOrHandlers.success
				
				waitingReadFileInfos.push({
					path : path,
					callbackOrHandlers : callbackOrHandlers
				});
			};
			
			let getFileInfo = self.getFileInfo = (path, callbackOrHandlers) => {
				//REQUIRED: path	불러올 파일의 경로
				//OPTIONAL: callbackOrHandlers
				//OPTIONAL: callbackOrHandlers.notExists
				//OPTIONAL: callbackOrHandlers.error
				//OPTIONAL: callbackOrHandlers.success
				
				waitingGetFileInfoInfos.push({
					path : path,
					callbackOrHandlers : callbackOrHandlers
				});
			};
			
			let copyFile = self.copyFile = (params, callbackOrHandlers) => {
				//REQUIRED: params
				//REQUIRED: params.from		복사할 파일의 위치
				//REQUIRED: params.to		파일을 복사할 위치
				//OPTIONAL: callbackOrHandlers
				//OPTIONAL: callbackOrHandlers.notExistsHandler
				//OPTIONAL: callbackOrHandlers.error
				//OPTIONAL: callbackOrHandlers.success
				
				waitingCopyFileInfos.push({
					params : params,
					callbackOrHandlers : callbackOrHandlers
				});
			};
			
			let moveFile = self.moveFile = (params, callbackOrHandlers) => {
				//REQUIRED: params
				//REQUIRED: params.from		파일의 원래 위치
				//REQUIRED: params.to		파일을 옮길 위치
				//OPTIONAL: callbackOrHandlers
				//OPTIONAL: callbackOrHandlers.notExistsHandler
				//OPTIONAL: callbackOrHandlers.error
				//OPTIONAL: callbackOrHandlers.success
				
				waitingMoveFileInfos.push({
					params : params,
					callbackOrHandlers : callbackOrHandlers
				});
			};
			
			let removeFile = self.removeFile = (path, callbackOrHandlers) => {
				//REQUIRED: path	삭제할 파일의 경로
				//REQUIRED: callbackOrHandlers
				//OPTIONAL: callbackOrHandlers.notExists
				//OPTIONAL: callbackOrHandlers.error
				//REQUIRED: callbackOrHandlers.success
				
				waitingRemoveFileInfos.push({
					path : path,
					callbackOrHandlers : callbackOrHandlers
				});
			};
			
			let checkFileExists = self.checkFileExists = (path, callback) => {
				//REQUIRED: path	확인할 경로
				//OPTIONAL: callback
				
				waitingCheckFileExistsInfos.push({
					path : path,
					callback : callback
				});
			};
			
			let createFolder = self.createFolder = (path, callbackOrHandlers) => {
				//REQUIRED: path	폴더를 생성할 경로
				//OPTIONAL: callbackOrHandlers
				//OPTIONAL: callbackOrHandlers.error
				//OPTIONAL: callbackOrHandlers.success
				
				waitingCreateFolderInfos.push({
					path : path,
					callbackOrHandlers : callbackOrHandlers
				});
			};
			
			let copyFolder = self.copyFolder = (params, callbackOrHandlers) => {
				//REQUIRED: params
				//REQUIRED: params.from		복사할 폴더의 위치
				//REQUIRED: params.to		폴더를 복사할 위치
				//REQUIRED: callbackOrHandlers
				//OPTIONAL: callbackOrHandlers.notExists
				//OPTIONAL: callbackOrHandlers.error
				//REQUIRED: callbackOrHandlers.success
				
				waitingCopyFolderInfos.push({
					params : params,
					callbackOrHandlers : callbackOrHandlers
				});
			};
			
			let removeFolder = self.removeFolder = (path, callbackOrHandlers) => {
				//REQUIRED: path	삭제할 폴더의 경로
				//REQUIRED: callbackOrHandlers
				//OPTIONAL: callbackOrHandlers.notExists
				//OPTIONAL: callbackOrHandlers.error
				//REQUIRED: callbackOrHandlers.success
				
				waitingRemoveFolderInfos.push({
					path : path,
					callbackOrHandlers : callbackOrHandlers
				});
			};
			
			let checkIsFolder = self.checkIsFolder = (path, callbackOrHandlers) => {
				//REQUIRED: path	확인할 경로
				//OPTIONAL: callbackOrHandlers
				//OPTIONAL: callbackOrHandlers.error
				//OPTIONAL: callbackOrHandlers.success
				
				waitingCheckIsFolderInfos.push({
					path : path,
					callbackOrHandlers : callbackOrHandlers
				});
			};
			
			let findFileNames = self.findFileNames = (path, callbackOrHandlers) => {
				//REQUIRED: path	파일들이 위치한 경로
				//OPTIONAL: callbackOrHandlers
				//OPTIONAL: callbackOrHandlers.notExistsHandler
				//OPTIONAL: callbackOrHandlers.error
				//OPTIONAL: callbackOrHandlers.success
				
				waitingFindFileNamesInfos.push({
					path : path,
					callbackOrHandlers : callbackOrHandlers
				});
			};
			
			let findFolderNames = self.findFolderNames = (path, callbackOrHandlers) => {
				//REQUIRED: path	폴더들이 위치한 경로
				//OPTIONAL: callbackOrHandlers
				//OPTIONAL: callbackOrHandlers.notExistsHandler
				//OPTIONAL: callbackOrHandlers.error
				//OPTIONAL: callbackOrHandlers.success
				
				waitingFindFolderNamesInfos.push({
					path : path,
					callbackOrHandlers : callbackOrHandlers
				});
			};
			
			let client = new Client();
			
			client.on('ready', () => {
				
				writeFile = self.writeFile = (params, callbackOrHandlers) => {
					//REQUIRED: params
					//REQUIRED: params.path		작성할 파일의 경로
					//OPTIONAL: params.content	파일에 작성할 내용 (문자열)
					//OPTIONAL: params.buffer	파일에 작성할 내용 (Buffer)
					//OPTIONAL: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.error
					//OPTIONAL: callbackOrHandlers.success
					
				};
				
				readFile = self.readFile = (path, callbackOrHandlers) => {
					//REQUIRED: path	불러올 파일의 경로
					//OPTIONAL: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.notExists
					//OPTIONAL: callbackOrHandlers.error
					//OPTIONAL: callbackOrHandlers.success
					
				};
				
				getFileInfo = self.getFileInfo = (path, callbackOrHandlers) => {
					//REQUIRED: path	불러올 파일의 경로
					//OPTIONAL: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.notExists
					//OPTIONAL: callbackOrHandlers.error
					//OPTIONAL: callbackOrHandlers.success
					
				};
				
				copyFile = self.copyFile = (params, callbackOrHandlers) => {
					//REQUIRED: params
					//REQUIRED: params.from		복사할 파일의 위치
					//REQUIRED: params.to		파일을 복사할 위치
					//OPTIONAL: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.notExistsHandler
					//OPTIONAL: callbackOrHandlers.error
					//OPTIONAL: callbackOrHandlers.success
					
				};
				
				moveFile = self.moveFile = (params, callbackOrHandlers) => {
					//REQUIRED: params
					//REQUIRED: params.from		파일의 원래 위치
					//REQUIRED: params.to		파일을 옮길 위치
					//OPTIONAL: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.notExistsHandler
					//OPTIONAL: callbackOrHandlers.error
					//OPTIONAL: callbackOrHandlers.success
					
				};
				
				removeFile = self.removeFile = (path, callbackOrHandlers) => {
					//REQUIRED: path	삭제할 파일의 경로
					//REQUIRED: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.notExists
					//OPTIONAL: callbackOrHandlers.error
					//REQUIRED: callbackOrHandlers.success
					
				};
				
				checkFileExists = self.checkFileExists = (path, callback) => {
					//REQUIRED: path	확인할 경로
					//OPTIONAL: callback
					
				};
				
				createFolder = self.createFolder = (path, callbackOrHandlers) => {
					//REQUIRED: path	폴더를 생성할 경로
					//OPTIONAL: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.error
					//OPTIONAL: callbackOrHandlers.success
					
				};
				
				copyFolder = self.copyFolder = (params, callbackOrHandlers) => {
					//REQUIRED: params
					//REQUIRED: params.from		복사할 폴더의 위치
					//REQUIRED: params.to		폴더를 복사할 위치
					//REQUIRED: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.notExists
					//OPTIONAL: callbackOrHandlers.error
					//REQUIRED: callbackOrHandlers.success
					
				};
				
				removeFolder = self.removeFolder = (path, callbackOrHandlers) => {
					//REQUIRED: path	삭제할 폴더의 경로
					//REQUIRED: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.notExists
					//OPTIONAL: callbackOrHandlers.error
					//REQUIRED: callbackOrHandlers.success
					
				};
				
				checkIsFolder = self.checkIsFolder = (path, callbackOrHandlers) => {
					//REQUIRED: path	확인할 경로
					//OPTIONAL: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.error
					//OPTIONAL: callbackOrHandlers.success
					
				};
				
				findFileNames = self.findFileNames = (path, callbackOrHandlers) => {
					//REQUIRED: path	파일들이 위치한 경로
					//OPTIONAL: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.notExistsHandler
					//OPTIONAL: callbackOrHandlers.error
					//OPTIONAL: callbackOrHandlers.success
					
				};
				
				findFolderNames = self.findFolderNames = (path, callbackOrHandlers) => {
					//REQUIRED: path	폴더들이 위치한 경로
					//OPTIONAL: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.notExistsHandler
					//OPTIONAL: callbackOrHandlers.error
					//OPTIONAL: callbackOrHandlers.success
					
				};
				
				// run waiting infos.

				EACH(waitingWriteFileInfos, (info) => {
					writeFile(info.params, info.callbackOrHandlers);
				});

				waitingWriteFileInfos = undefined;

				EACH(waitingReadFileInfos, (info) => {
					readFile(info.path, info.callbackOrHandlers);
				});

				waitingReadFileInfos = undefined;

				EACH(waitingGetFileInfoInfos, (info) => {
					getFileInfo(info.path, info.callbackOrHandlers);
				});

				waitingGetFileInfoInfos = undefined;

				EACH(waitingCopyFileInfos, (info) => {
					copyFile(info.params, info.callbackOrHandlers);
				});

				waitingCopyFileInfos = undefined;

				EACH(waitingMoveFileInfos, (info) => {
					moveFile(info.params, info.callbackOrHandlers);
				});

				waitingMoveFileInfos = undefined;

				EACH(waitingRemoveFileInfos, (info) => {
					removeFile(info.path, info.callbackOrHandlers);
				});

				waitingRemoveFileInfos = undefined;

				EACH(waitingCheckFileExistsInfos, (info) => {
					checkFileExists(info.path, info.callback);
				});

				waitingCheckFileExistsInfos = undefined;

				EACH(waitingCreateFolderInfos, (info) => {
					createFolder(info.path, info.callbackOrHandlers);
				});

				waitingCreateFolderInfos = undefined;

				EACH(waitingCopyFolderInfos, (info) => {
					copyFolder(info.params, info.callbackOrHandlers);
				});

				waitingCopyFolderInfos = undefined;

				EACH(waitingRemoveFolderInfos, (info) => {
					removeFolder(info.path, info.callbackOrHandlers);
				});

				waitingRemoveFolderInfos = undefined;

				EACH(waitingCheckIsFolderInfos, (info) => {
					checkIsFolder(info.path, info.callbackOrHandlers);
				});

				waitingCheckIsFolderInfos = undefined;

				EACH(waitingFindFileNamesInfos, (info) => {
					findFileNames(info.path, info.callbackOrHandlers);
				});

				waitingFindFileNamesInfos = undefined;

				EACH(waitingFindFolderNamesInfos, (info) => {
					findFolderNames(info.path, info.callbackOrHandlers);
				});

				waitingFindFolderNamesInfos = undefined;
			});
			
			client.connect({
				host : host,
				port : port,
				user : username,
				password : password
			});
			
			let disconnect = self.disconnect = () => {
				client.end();
			};
		}
	};
});
