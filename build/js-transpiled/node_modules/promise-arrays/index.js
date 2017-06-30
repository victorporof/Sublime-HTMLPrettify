/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 07.09.2015
 * @license
 * The MIT License (C) 2015 Sallar Kaboli
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
'use strict';

// UMD Definitions
(function (name, definition) {
    // NodeJS & CommonJS
    if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
        module.exports = definition();
    }
    // AMD
    else if (typeof define === 'function' && typeof define.amd === 'object') {
        define(definition);
    }
    // Browser Globals
    else {
        this[name] = definition();
    }
})('PromiseArrays', function () {
    /**
     * Async Array Map
     * performs async operations on arrays and returns a promise with the results
     * @TODO            Handle Rejection
     * @param array     {Array}     Array to perform mapping on
     * @param callback  {function}  Function to apply to each item
     * @returns         {Promise}   Promise containing the results
     */
    function map (array, callback) {
        // Map each item to a new Promise
        array = array.map(function (item, index) {
            return new Promise(function (resolve) {
                // Pass callback to given callback
                resolve(callback(item, index));
            });
        });

        // Wait for all promises to complete
        return Promise.all(array);
    }

    /**
     * Async Array Filter
     * Filters an array based on async operations and returns promise with the results
     * @param array     {Array}     Array to perform filtering on
     * @param callback  {function}  Function to use as criteria
     * @returns         {Promise}   Promise containing filtered results
     */
    function filter (array, callback) {
        // Use async map function
        return map(array, callback).then(function (result) {
            // Then filter out false results
            return array.filter(function (item, index) {
                return result[index];
            });
        });
    }

    /* Public Interface */
    return {
        map     : map,      // Map
        each    : map,      // Each, alias to Map
        filter  : filter    // Filter
    };
});