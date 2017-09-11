UFTP.FTP = CLASS((cls) => {
	
	let Client = require('ftp');
	let Path = require('path');
	
	return {

		init : (inner, self, params, handlers) => {
			//REQUIRED: params
			//REQUIRED: params.host
			//OPTIONAL: params.port
			//REQUIRED: params.username
			//REQUIRED: params.password
			//OPTIONAL: handlers
			//OPTIONAL: handlers.error
			//OPTIONAL: handlers.success
			
			let host = params.host;
			let port = params.port === undefined ? 21 : params.port;
			let username = params.username;
			let password = params.password;
			
			let connectionErrorHandler;
			let connectedHandler;
			
			if (handlers !== undefined) {
				connectionErrorHandler = handlers.error;
				connectedHandler = handlers.success;
			}
			
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
				
				if (connectedHandler !== undefined) {
					connectedHandler();
				}
				
				writeFile = self.writeFile = (params, callbackOrHandlers) => {
					//REQUIRED: params
					//REQUIRED: params.path		작성할 파일의 경로
					//OPTIONAL: params.content	파일에 작성할 내용 (문자열)
					//OPTIONAL: params.buffer	파일에 작성할 내용 (Buffer)
					//OPTIONAL: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.error
					//OPTIONAL: callbackOrHandlers.success
					
					let path = params.path;
					let content = params.content;
					let buffer = params.buffer;
					
					if (content !== undefined) {
						buffer = Buffer.from(content, 'utf8');
					}
					
					let errorHandler;
					let callback;
					
					if (callbackOrHandlers !== undefined) {
						if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
							callback = callbackOrHandlers;
						} else {
							errorHandler = callbackOrHandlers.error;
							callback = callbackOrHandlers.success;
						}
					}
					
					let folderPath = Path.dirname(path);
					
					createFolder(folderPath, {
						
						error : (errorMsg) => {
							
							if (errorHandler !== undefined) {
								errorHandler(errorMsg, folderPath);
							} else {
								SHOW_ERROR('UFTP.FTP/writeFile', errorMsg, folderPath);
							}
						},
						
						success : () => {
							
							client.put(buffer, path, (error, stream) => {
								
								if (error !== undefined) {
								
									let errorMsg = error.toString();
		
									if (errorHandler !== undefined) {
										errorHandler(errorMsg, params);
									} else {
										SHOW_ERROR('UFTP.FTP/writeFile', errorMsg, params);
									}
								}
								
								else if (callback !== undefined) {
									callback();
								}
							});
						}
					});
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
								SHOW_WARNING('UFTP.FTP/readFile', MSG({
									ko : '파일이 존재하지 않습니다.'
								}), {
									path : path
								});
							}
						}
						
						else {
							
							client.get(path, (error, stream) => {
								
								if (error !== undefined) {
								
									let errorMsg = error.toString();
		
									if (errorHandler !== undefined) {
										errorHandler(errorMsg, path);
									} else {
										SHOW_ERROR('UFTP.FTP/readFile', errorMsg, path);
									}
								}
								
								else {
									
									let data = [];
									
									stream.on('data', (buffer) => {
										data.push(buffer);
									});
									
									stream.on('end', () => {
										callback(Buffer.concat(data));
									});
									
									stream.on('error', (error) => {
										
										let errorMsg = error.toString();
			
										if (errorHandler !== undefined) {
											errorHandler(errorMsg, path);
										} else {
											SHOW_ERROR('UFTP.FTP/readFile', errorMsg, path);
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
					
					let folderPath = path.substring(0, path.lastIndexOf('/'));
					let fileName = path.substring(path.lastIndexOf('/') + 1);
					
					client.list(folderPath, (error, list) => {
						
						if (error !== undefined) {
						
							let errorMsg = error.toString();

							if (errorHandler !== undefined) {
								errorHandler(errorMsg, path);
							} else {
								SHOW_ERROR('UFTP.FTP/getFileInfo', errorMsg, path);
							}
						}
						
						else {
							
							let fileInfo;
							
							EACH(list, (info) => {
								
								if (info.name === fileName) {
									
									fileInfo = {
										lastUpdateTime : info.date
									};
									
									if (info.type !== 'd') {
										fileInfo.size = info.size;
									}
								}
							});
							
							if (fileInfo === undefined) {
								
								if (notExistsHandler !== undefined) {
									notExistsHandler(path);
								} else {
									SHOW_WARNING('UFTP.FTP/getFileInfo', MSG({
										ko : '파일이 존재하지 않습니다.'
									}), {
										path : path
									});
								}
							}
							
							else {
								callback(fileInfo);
							}
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
					
					let from = params.from;
					let to = params.to;
					
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
					
					readFile(from, {
						
						error : (errorMsg) => {
							
							if (errorHandler !== undefined) {
								errorHandler(errorMsg, from);
							} else {
								SHOW_ERROR('UFTP.FTP/copyFile', errorMsg, from);
							}
						},
						
						notExists : () => {
							
							if (notExistsHandler !== undefined) {
								notExistsHandler(from);
							} else {
								SHOW_WARNING('UFTP.FTP/copyFile', MSG({
									ko : '파일이 존재하지 않습니다.'
								}), {
									from : from
								});
							}
						},
						
						success : (buffer) => {
							
							writeFile({
								path : to,
								buffer : buffer
							}, {
								
								error : (errorMsg) => {
									
									if (errorHandler !== undefined) {
										errorHandler(errorMsg, to);
									} else {
										SHOW_ERROR('UFTP.FTP/copyFile', errorMsg, to);
									}
								},
								
								success : callback
							});
						}
					});
				};
				
				moveFile = self.moveFile = (params, callbackOrHandlers) => {
					//REQUIRED: params
					//REQUIRED: params.from		파일의 원래 위치
					//REQUIRED: params.to		파일을 옮길 위치
					//OPTIONAL: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.notExistsHandler
					//OPTIONAL: callbackOrHandlers.error
					//OPTIONAL: callbackOrHandlers.success
					
					let from = params.from;
					let to = params.to;
					
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
					
					checkFileExists(from, (exists) => {
						
						if (exists !== true) {
							
							if (notExistsHandler !== undefined) {
								notExistsHandler(from);
							} else {
								SHOW_WARNING('UFTP.FTP/moveFile', MSG({
									ko : '파일이 존재하지 않습니다.'
								}), {
									from : from
								});
							}
						}
						
						else {
							
							client.rename(from, to, (error) => {
								
								if (error !== undefined) {
								
									let errorMsg = error.toString();
		
									if (errorHandler !== undefined) {
										errorHandler(errorMsg, params);
									} else {
										SHOW_ERROR('UFTP.FTP/moveFile', errorMsg, params);
									}
								}
								
								else if (callback !== undefined) {
									callback();
								}
							});
						}
					});
				};
				
				removeFile = self.removeFile = (path, callbackOrHandlers) => {
					//REQUIRED: path	삭제할 파일의 경로
					//REQUIRED: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.notExists
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
					
					checkFileExists(path, (exists) => {
						
						if (exists !== true) {
							
							if (notExistsHandler !== undefined) {
								notExistsHandler(path);
							} else {
								SHOW_WARNING('UFTP.FTP/removeFile', MSG({
									ko : '파일이 존재하지 않습니다.'
								}), {
									path : path
								});
							}
						}
						
						else {
							
							client.delete(path, (error) => {
								
								if (error !== undefined) {
								
									let errorMsg = error.toString();
		
									if (errorHandler !== undefined) {
										errorHandler(errorMsg, path);
									} else {
										SHOW_ERROR('UFTP.FTP/removeFile', errorMsg, path);
									}
								}
								
								else if (callback !== undefined) {
									callback();
								}
							});
						}
					});
				};
				
				checkFileExists = self.checkFileExists = (path, callback) => {
					//REQUIRED: path	확인할 경로
					//REQUIRED: callback
					
					if (path === '.') {
						callback(true);
					} else {
						
						let folderPath = path.substring(0, path.lastIndexOf('/'));
						let fileName = path.substring(path.lastIndexOf('/') + 1);
						
						client.list(folderPath, (error, list) => {
							
							let exists = false;
							
							if (error === undefined) {
								
								EACH(list, (info) => {
									if (info.name === fileName) {
										exists = true;
										return false;
									}
								});
							}
							
							if (callback !== undefined) {
								callback(exists);
							}
						});
					}
				};
				
				createFolder = self.createFolder = (path, callbackOrHandlers) => {
					//REQUIRED: path	폴더를 생성할 경로
					//OPTIONAL: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.error
					//OPTIONAL: callbackOrHandlers.success
					
					let errorHandler;
					let callback;
					
					if (callbackOrHandlers !== undefined) {
						if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
							callback = callbackOrHandlers;
						} else {
							errorHandler = callbackOrHandlers.error;
							callback = callbackOrHandlers.success;
						}
					}
					
					client.mkdir(path, true, (error) => {
						
						if (error !== undefined) {
						
							let errorMsg = error.toString();

							if (errorHandler !== undefined) {
								errorHandler(errorMsg, path);
							} else {
								SHOW_ERROR('UFTP.FTP/createFolder', errorMsg, path);
							}
						}
						
						else if (callback !== undefined) {
							callback();
						}
					});
				};
				
				copyFolder = self.copyFolder = (params, callbackOrHandlers) => {
					//REQUIRED: params
					//REQUIRED: params.from		복사할 폴더의 위치
					//REQUIRED: params.to		폴더를 복사할 위치
					//REQUIRED: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.notExists
					//OPTIONAL: callbackOrHandlers.error
					//REQUIRED: callbackOrHandlers.success
					
					let from = params.from;
					let to = params.to;
					
					let notExistsHandler;
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
					
					checkFileExists(from, (exists) => {
						
						if (exists !== true) {
							
							if (notExistsHandler !== undefined) {
								notExistsHandler(from);
							} else {
								SHOW_WARNING('UFTP.FTP/copyFolder', MSG({
									ko : '폴더가 존재하지 않습니다.'
								}), {
									from : from
								});
							}
						}
						
						else {
							
							client.list(from, (error, list) => {
								
								if (error !== undefined) {
									
									let errorMsg = error.toString();
		
									if (errorHandler !== undefined) {
										errorHandler(errorMsg, params);
									} else {
										SHOW_ERROR('UFTP.FTP/copyFolder', errorMsg, params);
									}
								}
								
								else {
									
									createFolder(to, {
										error : errorHandler,
										success : () => {
											
											NEXT(list, [(info, next) => {
												
												if (info.type === 'd') {
													copyFolder({
														from : from + '/' + info.name,
														to : to + '/' + info.name
													}, {
														error : errorHandler,
														success : next
													});
												}
												
												else {
													copyFile({
														from : from + '/' + info.name,
														to : to + '/' + info.name
													}, {
														error : errorHandler,
														success : next
													});
												}
											},
											
											() => {
												return () => {
													
													if (callback !== undefined) {
														callback();
													}
												};
											}]);
										}
									});
								}
							});
						}
					});
				};
				
				removeFolder = self.removeFolder = (path, callbackOrHandlers) => {
					//REQUIRED: path	삭제할 폴더의 경로
					//REQUIRED: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.notExists
					//OPTIONAL: callbackOrHandlers.error
					//REQUIRED: callbackOrHandlers.success
					
					let notExistsHandler;
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
								SHOW_WARNING('UFTP.FTP/removeFolder', MSG({
									ko : '파일이 존재하지 않습니다.'
								}), {
									path : path
								});
							}
						}
						
						else {
							
							client.rmdir(path, true, (error) => {
								
								if (error !== undefined) {
								
									let errorMsg = error.toString();
		
									if (errorHandler !== undefined) {
										errorHandler(errorMsg, path);
									} else {
										SHOW_ERROR('UFTP.FTP/removeFolder', errorMsg, path);
									}
								}
								
								else if (callback !== undefined) {
									callback();
								}
							});
						}
					});
				};
				
				checkIsFolder = self.checkIsFolder = (path, callbackOrHandlers) => {
					//REQUIRED: path	확인할 경로
					//OPTIONAL: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.error
					//OPTIONAL: callbackOrHandlers.success
					
					let errorHandler;
					let callback;
					
					if (callbackOrHandlers !== undefined) {
						if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
							callback = callbackOrHandlers;
						} else {
							errorHandler = callbackOrHandlers.error;
							callback = callbackOrHandlers.success;
						}
					}
					
					let folderPath = path.substring(0, path.lastIndexOf('/'));
					let fileName = path.substring(path.lastIndexOf('/') + 1);
					
					client.list(folderPath, (error, list) => {
						
						if (error !== undefined) {
							callback(false);
						}
						
						else {
							
							let isFolder = false;
							
							EACH(list, (info) => {
								if (info.name === fileName) {
									isFolder = info.type === 'd';
								}
							});
							
							callback(isFolder);
						}
					});
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
					
					checkFileExists(path, (exists) => {
						
						if (exists !== true) {
							
							if (notExistsHandler !== undefined) {
								notExistsHandler(path);
							} else {
								SHOW_WARNING('UFTP.FTP/findFileNames', MSG({
									ko : '폴더가 존재하지 않습니다.'
								}), {
									path : path
								});
							}
						}
						
						else {
							
							client.list(path, (error, list) => {
								
								if (error !== undefined) {
								
									let errorMsg = error.toString();
		
									if (errorHandler !== undefined) {
										errorHandler(errorMsg, path);
									} else {
										SHOW_ERROR('UFTP.FTP/findFileNames', errorMsg, path);
									}
								}
								
								else {
									
									EACH(list, (info) => {
										
										if (info.type !== 'd') {
											fileNames.push(info.name);
										}
									});
									
									if (callback !== undefined) {
										callback(fileNames);
									}
								}
							});
						}
					});
				};
				
				findFolderNames = self.findFolderNames = (path, callbackOrHandlers) => {
					//REQUIRED: path	폴더들이 위치한 경로
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
					
					let folderNames = [];
					
					checkFileExists(path, (exists) => {
						
						if (exists !== true) {
							
							if (notExistsHandler !== undefined) {
								notExistsHandler(path);
							} else {
								SHOW_WARNING('UFTP.FTP/findFolderNames', MSG({
									ko : '폴더가 존재하지 않습니다.'
								}), {
									path : path
								});
							}
						}
						
						else {
							
							client.list(path, (error, list) => {
								
								if (error !== undefined) {
								
									let errorMsg = error.toString();
		
									if (errorHandler !== undefined) {
										errorHandler(errorMsg, path);
									} else {
										SHOW_ERROR('UFTP.FTP/findFolderNames', errorMsg, path);
									}
								}
								
								else {
									
									EACH(list, (info) => {
										
										if (info.type === 'd') {
											folderNames.push(info.name);
										}
									});
									
									if (callback !== undefined) {
										callback(folderNames);
									}
								}
							});
						}
					});
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
