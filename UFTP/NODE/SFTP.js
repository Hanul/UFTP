UFTP.SFTP = CLASS((cls) => {
	
	let Client = require('ssh2').Client;
	
	return {

		init : (inner, self, params, connectionErrorHandler) => {
			//REQUIRED: params
			//REQUIRED: params.host
			//OPTIONAL: params.port
			//REQUIRED: params.username
			//OPTIONAL: params.password
			//OPTIONAL: params.privateKey
			//OPTIONAL: connectionErrorHandler
			
			let host = params.host;
			let port = params.port === undefined ? 22 : params.port;
			let username = params.username;
			let password = params.password;
			let privateKey = params.privateKey;
			
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
			
			client.on('error', (error) => {
				
				let errorMsg = error.toString();

				if (connectionErrorHandler !== undefined) {
					connectionErrorHandler(errorMsg, params);
				} else {
					SHOW_ERROR('UFTP.FTP', errorMsg, params);
				}
			});
			
			client.on('ready', () => {
				
				client.sftp((error, sftp) => {
					
					if (error !== undefined) {
						
						let errorMsg = error.toString();

						if (connectionErrorHandler !== undefined) {
							connectionErrorHandler(errorMsg, params);
						} else {
							SHOW_ERROR('UFTP.SFTP', errorMsg, params);
						}
					}
					
					else {
						
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
							//REQUIRED: callbackOrHandlers
							//OPTIONAL: callbackOrHandlers.notExists
							//OPTIONAL: callbackOrHandlers.error
							//REQUIRED: callbackOrHandlers.success
							
							let notExistsHandler
							let errorHandler;
							let callback;
							
							if (callbackOrHandlers !== undefined) {
								if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
									callback = callbackOrHandlers;
								} else {
									notExistsHandler = callbackOrHandlers.notExists;
									errorHandler = callbackOrHandlers.error;
									callback = callbackOrHandlers.success;
								}
							}
							
							checkFileExists(path, (exists) => {
								
								if (exists !== true) {
									
									if (notExistsHandler !== undefined) {
										notExistsHandler(path);
									} else {
										SHOW_WARNING('UFTP.SFTP/readFile', MSG({
											ko : '파일이 존재하지 않습니다.'
										}), {
											path : path
										});
									}
								}
								
								else {
									
									sftp.open(path, 'r', (error, handle) => {
										
										if (error !== undefined) {
											
											let errorMsg = error.toString();
				
											if (errorHandler !== undefined) {
												errorHandler(errorMsg, path);
											} else {
												SHOW_ERROR('UFTP.SFTP/readFile', errorMsg, path);
											}
										}
										
										else {
											
											sftp.fstat(handle, (error, stats) => {
											
												if (error !== undefined) {
													
													let errorMsg = error.toString();
						
													if (errorHandler !== undefined) {
														errorHandler(errorMsg, path);
													} else {
														SHOW_ERROR('UFTP.SFTP/readFile', errorMsg, path);
													}
												}
												
												else {
													
													let data = [];
													
													let bufferSize = stats.size;
													let chunkSize = 16384;
													let buffer = new Buffer(bufferSize);
													let readBytes = 0;
													let isErrorOccured;
													
													let totalReadBytes = 0;
													let readCallback = (error, readBytes, buffer) => {
														
														if (error !== undefined) {
															
															isErrorOccured = true;
															sftp.close(handle);
															
															let errorMsg = error.toString();
															
															if (errorHandler !== undefined) {
																errorHandler(errorMsg, path);
															} else {
																SHOW_ERROR('UFTP.SFTP/readFile', errorMsg, path);
															}
														}
														
														else {
															
															totalReadBytes += readBytes;
															
															data.push(buffer);
															
															if (totalReadBytes === bufferSize) {
																
																callback(Buffer.concat(data));
																
																sftp.close(handle);
															}
														}
													};
													
													while (readBytes < bufferSize && isErrorOccured !== true) {
														
														if ((readBytes + chunkSize) > bufferSize) {
															chunkSize = (bufferSize - readBytes);
														}
														
														sftp.read(handle, buffer, readBytes, chunkSize, readBytes, readCallback);
														
														readBytes += chunkSize;
													}
												}
											});
										}
									});
								}
							});
						};
						
						getFileInfo = self.getFileInfo = (path, callbackOrHandlers) => {
							//REQUIRED: path	불러올 파일의 경로
							//REQUIRED: callbackOrHandlers
							//OPTIONAL: callbackOrHandlers.notExists
							//OPTIONAL: callbackOrHandlers.error
							//REQUIRED: callbackOrHandlers.success
							
							let notExistsHandler
							let errorHandler;
							let callback;
							
							if (callbackOrHandlers !== undefined) {
								if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
									callback = callbackOrHandlers;
								} else {
									notExistsHandler = callbackOrHandlers.notExists;
									errorHandler = callbackOrHandlers.error;
									callback = callbackOrHandlers.success;
								}
							}
							
							sftp.stat(path, (error, stat) => {
								
								if (error !== undefined) {
									
									if (notExistsHandler !== undefined) {
										notExistsHandler(path);
									} else {
										SHOW_WARNING('UFTP.SFTP/getFileInfo', MSG({
											ko : '파일이 존재하지 않습니다.'
										}), {
											path : path
										});
									}
								}
								
								else {
									
									let fileInfo = {
										lastUpdateTime : new Date(stat.mtime * 1000)
									};
									
									if (stat.isDirectory() !== true) {
										fileInfo.size = stat.size;
									}
									
									callback(fileInfo);
								}
							});
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
							
							sftp.stat(path, (error) => {
								callback(error === undefined);
							});
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
							
							let notExistsHandler
							let errorHandler;
							let callback;
							
							if (callbackOrHandlers !== undefined) {
								if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
									callback = callbackOrHandlers;
								} else {
									notExistsHandler = callbackOrHandlers.notExists;
									errorHandler = callbackOrHandlers.error;
									callback = callbackOrHandlers.success;
								}
							}
							
							let fileNames = [];
							
							//TODO: 존재하는지 판단 먼저
							
							sftp.readdir(path, (error, list) => {
								
								if (error !== undefined) {
									
									let errorMsg = error.toString();
		
									if (errorHandler !== undefined) {
										errorHandler(errorMsg, path);
									} else {
										SHOW_ERROR('UFTP.SFTP/findFileNames', errorMsg, path);
									}
								}
								
								else {
									
									EACH(list, (info) => {
										
										if (info.attrs.isDirectory() !== true) {
											fileNames.push(info.filename);
										}
									});
									
									if (callback !== undefined) {
										callback(fileNames);
									}
								}
							});
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
					}
				});
			});
			
			client.connect({
				host : host,
				port : port,
				user : username,
				password : password,
				privateKey : privateKey
			});
			
			let disconnect = self.disconnect = () => {
				client.end();
			};
		}
	};
});
