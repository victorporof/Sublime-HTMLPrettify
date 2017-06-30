/* jshint node: true */

var util = require('util');
var ini = require('./third-party/ini.js');

function forEach(obj, func, ctx) {
    if (obj.forEach && typeof obj.forEach === 'function') {
        return obj.forEach(func, ctx);
    } else {
        Object.keys(obj).forEach(function(key) {
            func.call(ctx, obj[key], key, obj);
        });
    }
}

function validateString(str) {
    if (typeof str !== 'string') {
        throw new TypeError('parse input must be a string');
    }
}

function validateArray(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError('raw parameter must be an array');
    }
}

function validateObject(obj) {
    // not a totally complete check, but it is good enough
    if (Object.prototype.toString.call(obj) !== '[object Object]') {
        throw new TypeError('serialize parameter must be an object');
    }
}

function ecToIni(ec) {
    validateArray(ec);
    
    return ec.reduce(function(seed, arr) {
        if (arr[0] === null && arr[1] && arr[1].root !== undefined) {
            var newSeed = { root: arr[1].root };
            
            // Copy all existing values, to make sure
            // root is first in the object. Serialize
            // should take care of this, but we will
            // do it here for the object anyway.
            forEach(seed, function(val, key) {
                newSeed[key] = val;
            });
            
            seed = newSeed;
        } else if (arr[0] && arr[1]) {
            seed[arr[0]] = arr[1];
        }
        
        return seed;
    }, {});
}

function parse(str) {
    validateString(str);
    
    return ecToIni(ini.parseString(str));
}

function parseRaw(str) {
    validateString(str);
    
    return ini.parseString(str);
}

function serialize(obj) {
    validateObject(obj);
    
    var elems = [];
    
    forEach(obj, function(val, key) {
        // make sure `root` always goes first
        if (key === 'root') {
            // add a blank life after
            elems.unshift('');
            // add root first
            elems.unshift(util.format('%s = %s', key, val));
        } else if (typeof val === 'object') {
            // add the rule as a title, and serialize
            // the rest of the object
            elems.push(util.format('[%s]', key));
            elems.push(serialize(val));
        } else {
            // this is a key value pair, insert normally
            elems.push(util.format('%s = %s', key, val));
        }
    });
    
    // this will result in an empty file
    if (elems.length === 0) {
        return '';
    }
    
    // we could end up with multiple new lines at the
    // end due to recurssion, so we'll trim that, and
    // add a single new line
    return elems.join('\n').trim() + '\n';
}

function serializeRaw(arr) {
    if (Array.isArray(arr) && arr.length === 0) {
        return '';
    }
    
    return serialize(ecToIni(arr));
}

module.exports = {
    parse: parse,
    parseRaw: parseRaw,
    serialize: serialize,
    serializeRaw: serializeRaw
};
