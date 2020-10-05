import Blob_is from './@core/Blob/is';
import File_is from './@core/File/is';
import Promise_isLike from './@core/Promise/isLike';
import Response_is from './@core/Response/is';
import String_is from './@core/String/is';
import URL_is from './@core/URL/is';

function downloadFrom(value, fileName) {
	return (Promise
		.resolve()
		.then(() => {
			if (String_is(value)) {
				return downloadFromString(value, fileName);
			}
			if (File_is(value)) {
				return downloadFromFile(value, fileName);
			}
			if (Blob_is(value)) {
				return downloadFromBlob(value, fileName);
			}
			if (URL_is(value)) {
				return downloadFromURL(value, fileName);
			}
			if (Response_is(value)) {
				return downloadFromResponse(value, fileName);
			}
			if (Promise_isLike(value)) {
				return downloadFromPromiseLike(value, fileName);
			}
			throw new Error();
		})
	);
}

function downloadFromBlob(blob, fileName) {
	return (Promise
		.resolve()
		.then(() => {
			let url = URL.createObjectURL(blob);
			try {
				let element = document.createElement('a');
				element.href = url;
				element.setAttribute('download', fileName || '');
				element.click();
			} finally {
				URL.revokeObjectURL(url);
			}
		})
	);
}

function downloadFromFile(file, fileName) {
	return (Promise
		.resolve()
		.then(() => {
			if (!fileName) {
				fileName = file.name;
			}
			return downloadFromBlob(file, fileName);
		})
	);
}

function downloadFromResponse(response, fileName) {
	return (Promise
		.resolve()
		.then(() => {
			if (!response.ok) {
				throw new Error();
			}
			return response.blob();
		})
		.then(blob => {
			if (!fileName) {
				let header = response.headers.get('Content-Disposition');
				fileName = extractFileNameFromContentDispositionHeader(header);
				if (!fileName) {
					let url = response.url;
					fileName = extractFileNameFromURL(url);
				}
			}
			return downloadFromBlob(blob, fileName);
		})
	);
}

function downloadFromXMLHttpRequest(xhr, fileName) {
	return (Promise
		.resolve()
		.then(() => {
			return new Promise((resolve, reject) => {
				xhr.responseType = 'blob';
				xhr.addEventListener('load', () => {
					if (xhr.status == 200) {
						let blob = xhr.response;
						resolve(blob);
					} else {
						reject(new Error());
					}
				});
				xhr.addEventListener('error', () => {
					reject(new Error());
				});
				xhr.send();
			});
		})
		.then(blob => {
			if (!fileName) {
				let header = xhr.getResponseHeader('Content-Disposition');
				fileName = extractFileNameFromContentDispositionHeader(header);
				if (!fileName) {
					let url = xhr.responseURL;
					fileName = extractFileNameFromURL(url);
				}
			}
			return downloadFromBlob(blob, fileName);
		})
	);
}

function downloadFromString(string, fileName) {
	return (Promise
		.resolve()
		.then(() => {
			let xhr = new XMLHttpRequest();
			xhr.open('GET', string);
			return downloadFromXMLHttpRequest(xhr, fileName);
		})
	);
}

function downloadFromURL(url, fileName) {
	return (Promise
		.resolve()
		.then(() => downloadFromString(`${url}`, fileName))
	);
}

function downloadFromPromiseLike(promise, fileName) {
	return (Promise
		.resolve()
		.then(() => promise)
		.then(value => downloadFrom(value, fileName))
	);
}

function extractFileNameFromContentDispositionHeader(header) {
	if (String_is(header)) {
		let fileName = header.match(/filename="(.+)"/)[1];
		if (fileName) {
			return fileName;
		}
	}
}

function extractFileNameFromURL(url) {
	if (String_is(url)) {
		url = new URL(url, document.location.origin);
	}
	let fileName = url.pathname.slice(url.pathname.lastIndexOf('/') + 1);
	if (fileName) {
		return fileName;
	}
}

export default downloadFrom;
