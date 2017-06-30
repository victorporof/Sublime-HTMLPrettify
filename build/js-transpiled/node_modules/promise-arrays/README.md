Promise Arrays [![NPM version][npm-version-image]][npm-url] [![Travis Build][travis-build-image]][travis-url] [![MIT License][license-image]][license-url]
===
A super small library to help you map and filter arrays with async operations. The only hard dependency is 
`Promise` so it needs to be present some how in your project (polyfill or native).  
Compatible with NodeJS, CommonJS, AMD and Browser Globals.

## Install
Available on `npm`:
```bash
$ npm install promise-arrays --save
```

### NodeJS
Install using `npm` Then:
```javascript
// ES5:
var PromiseArrays = require('promise-arrays');

// ES6:
import PromiseArrays from 'promise-arrays';
```

### AMD
Install `npm` and include in your AMD project, then:
```javascript
// Include as dependency:
define(['promise-arrays'], function (PromiseArrays) {
    // Use Here...
});
```

### Browser Globals
```html
<script src="/path/to/promise-arrays.js"></script>
```

## Usage
All methods in this library return a `Promise` object. The API is similar to JS native `filter` and `map`, although
you can return a `Promise` instead of just returning the result.

### PromiseArrays.map(array, callback) → Promise
Mutate elements of an array using a given callback. Return a value to replace the original item or a `Promise` object.
```javascript
var array   = [1, 2, 3, 4, 5];

// Sync
var promise = PromiseArrays.map(array, function (item, index) {
    return item * 10;
}).then(function (result) {
    console.log(result); // [10, 20, 30, 40, 50]
});

// Async
var promise = PromiseArrays.map(array, function (item, index) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(item * 10);
        }, 100);
    });
}).then(function (result) {
    console.log(result); // [10, 20, 30, 40, 50] After ~ 100ms
});
```

You can also use `each` instead of `map`, which is basically an alias to `map`.

### PromiseArrays.filter(array, callback) → Promise
Filter an array based on given criteria. API usage is similar to `.map`
```javascript
var array   = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var promise = PromiseArrays.filter(array, function (item, index) {
    return item > 3 && item < 8; // OR return a Promise
}).then(function (result) {
    console.log(result); // [4, 5, 6, 7]
});
```

## Test
```bash
$ npm test
```

## License
This software is released under the [MIT License](http://sallar.mit-license.org/).  

    Copyright © 2015 Sallar Kaboli <sallar.kaboli@gmail.com>
    
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the “Software”), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
    
[npm-url]: https://npmjs.com/package/promise-arrays
[npm-version-image]: https://img.shields.io/npm/v/promise-arrays.svg

[travis-url]: https://travis-ci.org/sallar/promise-arrays
[travis-build-image]: https://img.shields.io/travis/sallar/promise-arrays.svg

[license-url]: http://sallar.mit-license.org/
[license-image]: https://img.shields.io/npm/l/promise-arrays.svg