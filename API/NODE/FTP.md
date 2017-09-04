# `CLASS ` UFTP.FTP

## Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.host*
* `OPTIONAL` *params.port*
* `REQUIRED` *params.username*
* `REQUIRED` *params.password*
* `OPTIONAL` *connectionErrorHandler*

## Public Members

### `writeFile(params, callbackOrHandlers)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.path* 작성할 파일의 경로
* `OPTIONAL` *params.content* 파일에 작성할 내용 (문자열)
* `OPTIONAL` *params.buffer* 파일에 작성할 내용 (Buffer)
* `OPTIONAL` *callbackOrHandlers*
* `OPTIONAL` *callbackOrHandlers.error*
* `OPTIONAL` *callbackOrHandlers.success*

### `readFile(path, callbackOrHandlers)`
#### Parameters
* `REQUIRED` *path* 불러올 파일의 경로
* `OPTIONAL` *callbackOrHandlers*
* `OPTIONAL` *callbackOrHandlers.notExists*
* `OPTIONAL` *callbackOrHandlers.error*
* `OPTIONAL` *callbackOrHandlers.success*

### `getFileInfo(path, callbackOrHandlers)`
#### Parameters
* `REQUIRED` *path* 불러올 파일의 경로
* `OPTIONAL` *callbackOrHandlers*
* `OPTIONAL` *callbackOrHandlers.notExists*
* `OPTIONAL` *callbackOrHandlers.error*
* `OPTIONAL` *callbackOrHandlers.success*

### `copyFile(params, callbackOrHandlers)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.from* 복사할 파일의 위치
* `REQUIRED` *params.to* 파일을 복사할 위치
* `OPTIONAL` *callbackOrHandlers*
* `OPTIONAL` *callbackOrHandlers.notExistsHandler*
* `OPTIONAL` *callbackOrHandlers.error*
* `OPTIONAL` *callbackOrHandlers.success*

### `moveFile(params, callbackOrHandlers)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.from* 파일의 원래 위치
* `REQUIRED` *params.to* 파일을 옮길 위치
* `OPTIONAL` *callbackOrHandlers*
* `OPTIONAL` *callbackOrHandlers.notExistsHandler*
* `OPTIONAL` *callbackOrHandlers.error*
* `OPTIONAL` *callbackOrHandlers.success*

### `removeFile(path, callbackOrHandlers)`
#### Parameters
* `REQUIRED` *path* 삭제할 파일의 경로
* `REQUIRED` *callbackOrHandlers*
* `OPTIONAL` *callbackOrHandlers.notExists*
* `OPTIONAL` *callbackOrHandlers.error*
* `REQUIRED` *callbackOrHandlers.success*

### `checkFileExists(path, callback)`
#### Parameters
* `REQUIRED` *path* 확인할 경로
* `OPTIONAL` *callback*

### `createFolder(path, callbackOrHandlers)`
#### Parameters
* `REQUIRED` *path* 폴더를 생성할 경로
* `OPTIONAL` *callbackOrHandlers*
* `OPTIONAL` *callbackOrHandlers.error*
* `OPTIONAL` *callbackOrHandlers.success*

### `copyFolder(params, callbackOrHandlers)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.from* 복사할 폴더의 위치
* `REQUIRED` *params.to* 폴더를 복사할 위치
* `REQUIRED` *callbackOrHandlers*
* `OPTIONAL` *callbackOrHandlers.notExists*
* `OPTIONAL` *callbackOrHandlers.error*
* `REQUIRED` *callbackOrHandlers.success*

### `removeFolder(path, callbackOrHandlers)`
#### Parameters
* `REQUIRED` *path* 삭제할 폴더의 경로
* `REQUIRED` *callbackOrHandlers*
* `OPTIONAL` *callbackOrHandlers.notExists*
* `OPTIONAL` *callbackOrHandlers.error*
* `REQUIRED` *callbackOrHandlers.success*

### `checkIsFolder(path, callbackOrHandlers)`
#### Parameters
* `REQUIRED` *path* 확인할 경로
* `OPTIONAL` *callbackOrHandlers*
* `OPTIONAL` *callbackOrHandlers.error*
* `OPTIONAL` *callbackOrHandlers.success*

### `findFileNames(path, callbackOrHandlers)`
#### Parameters
* `REQUIRED` *path* 파일들이 위치한 경로
* `OPTIONAL` *callbackOrHandlers*
* `OPTIONAL` *callbackOrHandlers.notExistsHandler*
* `OPTIONAL` *callbackOrHandlers.error*
* `OPTIONAL` *callbackOrHandlers.success*

### `findFolderNames(path, callbackOrHandlers)`
#### Parameters
* `REQUIRED` *path* 폴더들이 위치한 경로
* `OPTIONAL` *callbackOrHandlers*
* `OPTIONAL` *callbackOrHandlers.notExistsHandler*
* `OPTIONAL` *callbackOrHandlers.error*
* `OPTIONAL` *callbackOrHandlers.success*

### `disconnect()`
