!function(n,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(n="undefined"!=typeof globalThis?globalThis:n||self).saveFile=e()}(this,(function(){"use strict";function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n})(e)}function e(e){return function(e){if(e){var t=n(e);return"object"===t||"function"===t}return!1}(e)&&function(n){return"function"==typeof n}(e.then)}function t(n){return"string"==typeof n}function r(n,c){return Promise.resolve().then((function(){if(t(n))return i(n,c);if(function(n){var e=globalThis.File;return!!e&&n instanceof e}(n))return function(n,e){return Promise.resolve().then((function(){return e||(e=n.name),o(n,e)}))}(n,c);if(function(n){var e=globalThis.Blob;return!!e&&n instanceof e}(n))return o(n,c);if(function(n){var e=globalThis.URL;return!!e&&n instanceof e}(n))return function(n,e){return Promise.resolve().then((function(){return i("".concat(n),e)}))}(n,c);if(function(n){var e=globalThis.Response;return!!e&&n instanceof e}(n))return function(n,e){return Promise.resolve().then((function(){if(!n.ok)throw new Error;return n.blob()})).then((function(t){if(!e){var r=n.headers.get("Content-Disposition");if(!(e=u(r))){var i=n.url;e=f(i)}}return o(t,e)}))}(n,c);if(e(n))return function(n,e){return Promise.resolve().then((function(){return n})).then((function(n){return r(n,e)}))}(n,c);throw new Error}))}function o(n,e){return Promise.resolve().then((function(){var t=URL.createObjectURL(n);try{var r=document.createElement("a");r.href=t,r.setAttribute("download",e||""),r.click()}finally{URL.revokeObjectURL(t)}}))}function i(n,e){return Promise.resolve().then((function(){var t=new XMLHttpRequest;return t.open("GET",n),function(n,e){return Promise.resolve().then((function(){return new Promise((function(e,t){n.responseType="blob",n.addEventListener("load",(function(){if(200==n.status){var r=n.response;e(r)}else t(new Error)})),n.addEventListener("error",(function(){t(new Error)})),n.send()}))})).then((function(t){if(!e){var r=n.getResponseHeader("Content-Disposition");if(!(e=u(r))){var i=n.responseURL;e=f(i)}}return o(t,e)}))}(t,e)}))}function u(n){if(t(n)){var e=n.match(/filename="(.+)"/)[1];if(e)return e}}function f(n){t(n)&&(n=new URL(n,document.location.origin));var e=n.pathname.slice(n.pathname.lastIndexOf("/")+1);if(e)return e}return r}));