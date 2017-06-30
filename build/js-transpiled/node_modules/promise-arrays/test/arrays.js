/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 08.09.2015
 */
"use strict";

var chai = require('chai');
chai.use(require('chai-things'));
chai.use(require('chai-as-promised'));
chai.should();

var map    = require(__dirname + '/..').map,
    filter = require(__dirname + '/..').filter;

describe('Array Map', function() {
    it('maps an array correctly', function(done) {
        var arr = [1, 2, 3, 4];

        var arrMap = map(arr, function(item) {
            return item * 10;
        });

        Promise.all([
            arrMap.should.eventually.have.length(arr.length),
            arrMap.should.eventually.all.be.above(9)
        ]).should.notify(done);
    });

    it('maps an array async correctly', function(done) {
        var arr = [1, 2, 3, 4];

        var arrMap = map(arr, function(item) {
            return new Promise(function(resolve) {
                setTimeout(function() {
                    resolve(item * 10);
                }, 100);
            });
        });

        Promise.all([
            arrMap.should.eventually.have.length(arr.length),
            arrMap.should.eventually.all.be.above(9)
        ]).should.notify(done);
    });
});

describe('Array Filter', function() {
    it('filters an array correctly', function(done) {
        var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        var arrFilter = filter(arr, function(item, i, resolve) {
            return item > 3 && item < 8;
        });

        Promise.all([
            arrFilter.should.eventually.have.length(4)
        ]).should.notify(done);
    });
});