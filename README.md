# saveFile

```
saveFile(value, fileName)
```

Saves a file inside a browser.

| argument | description |
| ---: | :--- |
| `value` | The value to load from. Supported value types are `String`, `Promise`, `URL`, `Blob`, `File`, `Response`. |
| `fileName` | A string as the file name. If not specified, the file name is suggested in various ways. |

Returns a promise.

## setup

### npm

```shell
npm i @seregpie/save-file
```

### ES module

```javascript
import saveFile from '@seregpie/save-file';
```

### Node

```javascript
let saveFile = require('@seregpie/save-file');
```

### browser

```html
<script src="https://unpkg.com/@seregpie/save-file"></script>
```

The function is globally available as `saveFile`.

## usage

```javascript
let text = [
  'Twinkle, twinkle, little star,',
  'How I wonder what you are!',
  'Up above the world so high,',
  'Like a diamond in the sky.'
].join('\n');
let blob = new Blob([text], {type: 'text/plain;charset=utf-8'});
await saveFile(blob, 'lullaby.txt');
```

---

```javascript
let res = await fetch('/path/to/image.jpg', {
  method: 'GET',
  headers: {'Authorization': `Bearer ${token}`},
});
await saveFile(res);
```
