/* jshint node: true, mocha: true */

var fs = require('fs');
var path = require('path');

var expect = require('chai').expect;
var ec = require('../index.js');

var FILE = fs.readFileSync(
    path.resolve(__dirname, '../fixtures/editorconfig'),
    'utf8'
);
var KEYS = [
    'root', '*', '{package.json,*.yml}'
];

// hand-made sample data
var SAMPLE = {
    root: true,
    '*': { thing: 'stuff' },
    '*.json': { yellow: 'pineapples' }
};
var RAW = [
    [ null, { root: true }],
    [ '*', { thing: 'stuff' }],
    [ '*.json', { yellow: 'pineapples' }]
];
var OUT = 'root = true\n\n[*]\nthing = stuff\n\n[*.json]\nyellow = pineapples\n';
var NULL_RULE = [[ null, {} ]];

describe('[index]', function() {
    
    function stringify(val) {
        return JSON.stringify(val) || (
            val === undefined ?
                'undefined' :
                val.toString()
        );
    }
    
    function testNonStringValues(func) {
        [
            null,
            undefined,
            12,
            [],
            {},
            function() {}
        ].forEach(function(val) {
            var strVal = stringify(val);
            
            function throwFunc() {
                return func(val);
            }
            
            it('throws for non-string value: ' + strVal, function() {
                expect(throwFunc).to.throw(TypeError, 'parse input must be a string');
            });
        });
    }
    
    function testNonArrayValues(func) {
        [
            null,
            undefined,
            12,
            'string',
            {},
            function() {}
        ].forEach(function(val) {
            var strVal = stringify(val);
            
            function throwFunc() {
                return func(val);
            }
            
            it('throws for non-array value: ' + strVal, function() {
                expect(throwFunc).to.throw(TypeError, 'raw parameter must be an array');
            });
        });
    }
    
    function testNonObjectValues(func) {
        [
            null,
            undefined,
            12,
            'string',
            [],
            function() {}
        ].forEach(function(val) {
            var strVal = stringify(val);
            
            function throwFunc() {
                return func(val);
            }
            
            it('throws for non-array value: ' + strVal, function() {
                expect(throwFunc).to.throw(TypeError, 'serialize parameter must be an object');
            });
        });
    }
    
    describe('#parse', function() {
        it('parses an editorconfig file', function() {
            var obj = ec.parse(FILE);
            
            expect(obj).to.be.an('object')
                .and.to.have.all.keys(KEYS);
        });
        
        it('can parse an empty string to empty object', function() {
            var obj = ec.parse('');
            expect(obj).to.deep.equal({});
        });
        
        testNonStringValues(ec.parse.bind(ec));
    });
    
    describe('#parseRaw', function() {
        it('parses an editorconfig file into an array', function() {
            var arr = ec.parseRaw(FILE);
            
            expect(arr).to.be.an('array')
                .and.to.have.lengthOf(3);
        });
        
        it('parses an empty string into an array with an empty null rule', function() {
            var arr = ec.parseRaw('');
            expect(arr).to.deep.equal(NULL_RULE);
        });
        
        testNonStringValues(ec.parseRaw.bind(ec));
    });
    
    describe('#serialize', function() {
        it('seralizes an object to an editorconfig string', function() {
            var str = ec.serialize(SAMPLE);
            
            expect(str).to.be.a('string').and.to.equal(OUT);
        });
        
        it('serializes an empty object', function() {
            var str = ec.serialize({});
            expect(str).to.equal('');
        });
        
        it('serializes the root rule first, even if it is not first in the object', function() {
            var OBJ = {
                'rule': { things: 'stuff' },
                root: true
            };
            
            var str = ec.serialize(OBJ);
            expect(str).to.match(/^root = true/);
        });
        
        testNonObjectValues(ec.serialize.bind(ec));
    });
    
    describe('#serializeRaw', function() {
        it('serializes an array-based config into an editorconfir string', function() {
            var str = ec.serializeRaw(RAW);
            expect(str).to.be.a('string').and.to.equal(OUT);
        });
        
        it('serializes a null rule array into an empty string', function() {
            var str = ec.serializeRaw(NULL_RULE);
            expect(str).to.be.a('string').and.to.equal('');
        });
        
        it('serializes an empty array into an empty string', function() {
            var str = ec.serializeRaw([]);
            expect(str).to.be.a('string').and.to.equal('');
        });
        
        it('serializes an array of empty arrays into an empty string', function() {
            var str;
            
            str = ec.serializeRaw([[]]);
            expect(str).to.be.a('string').and.to.equal('');
            
            str = ec.serializeRaw([[], []]);
            expect(str).to.be.a('string').and.to.equal('');
        });
        
        testNonArrayValues(ec.serializeRaw.bind(ec));
    });
});
