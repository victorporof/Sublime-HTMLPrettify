'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseJSON5File = exports.parseJSON5 = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _json = require('json5');

var _json2 = _interopRequireDefault(_json);

var _stdioUtils = require('./stdioUtils');

var stdio = _interopRequireWildcard(_stdioUtils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Parses some json text if it's well formed, otherwise silently fails and
// returns undefined.
var parseJSON5 = exports.parseJSON5 = function parseJSON5(string) {
  try {
    return _json2.default.parse(string);
  } catch (e) {
    stdio.info('Failed to parse:', string);
    return undefined;
  }
};

// Parses a json file at a given path and returns an object if it exists
// and isn't malformed, otherwise silently fails and returns undefined.
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var parseJSON5File = exports.parseJSON5File = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(filePath) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = parseJSON5;
            _context.next = 3;
            return _fsExtra2.default.readFile(filePath, { encoding: 'utf8' });

          case 3:
            _context.t1 = _context.sent;
            return _context.abrupt('return', (0, _context.t0)(_context.t1));

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function parseJSON5File(_x) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL2pzb25VdGlscy5qcyJdLCJuYW1lcyI6WyJzdGRpbyIsInBhcnNlSlNPTjUiLCJzdHJpbmciLCJwYXJzZSIsImUiLCJpbmZvIiwidW5kZWZpbmVkIiwicGFyc2VKU09ONUZpbGUiLCJmaWxlUGF0aCIsInJlYWRGaWxlIiwiZW5jb2RpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUlBOzs7O0FBQ0E7Ozs7QUFFQTs7SUFBWUEsSzs7Ozs7O0FBRVo7QUFDQTtBQUNPLElBQU1DLGtDQUFhLFNBQWJBLFVBQWEsQ0FBQ0MsTUFBRCxFQUFZO0FBQ3BDLE1BQUk7QUFDRixXQUFPLGVBQU1DLEtBQU4sQ0FBWUQsTUFBWixDQUFQO0FBQ0QsR0FGRCxDQUVFLE9BQU9FLENBQVAsRUFBVTtBQUNWSixVQUFNSyxJQUFOLENBQVcsa0JBQVgsRUFBK0JILE1BQS9CO0FBQ0EsV0FBT0ksU0FBUDtBQUNEO0FBQ0YsQ0FQTTs7QUFTUDtBQUNBO0FBckJBOzs7O0FBc0JPLElBQU1DO0FBQUEsd0VBQWlCLGlCQUFNQyxRQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkFDNUJQLFVBRDRCO0FBQUE7QUFBQSxtQkFDWCxrQkFBR1EsUUFBSCxDQUFZRCxRQUFaLEVBQXNCLEVBQUVFLFVBQVUsTUFBWixFQUF0QixDQURXOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFqQjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOIiwiZmlsZSI6InV0aWxzL2pzb25VdGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uICovXG5cbmltcG9ydCBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgSlNPTjUgZnJvbSAnanNvbjUnO1xuXG5pbXBvcnQgKiBhcyBzdGRpbyBmcm9tICcuL3N0ZGlvVXRpbHMnO1xuXG4vLyBQYXJzZXMgc29tZSBqc29uIHRleHQgaWYgaXQncyB3ZWxsIGZvcm1lZCwgb3RoZXJ3aXNlIHNpbGVudGx5IGZhaWxzIGFuZFxuLy8gcmV0dXJucyB1bmRlZmluZWQuXG5leHBvcnQgY29uc3QgcGFyc2VKU09ONSA9IChzdHJpbmcpID0+IHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTjUucGFyc2Uoc3RyaW5nKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHN0ZGlvLmluZm8oJ0ZhaWxlZCB0byBwYXJzZTonLCBzdHJpbmcpO1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn07XG5cbi8vIFBhcnNlcyBhIGpzb24gZmlsZSBhdCBhIGdpdmVuIHBhdGggYW5kIHJldHVybnMgYW4gb2JqZWN0IGlmIGl0IGV4aXN0c1xuLy8gYW5kIGlzbid0IG1hbGZvcm1lZCwgb3RoZXJ3aXNlIHNpbGVudGx5IGZhaWxzIGFuZCByZXR1cm5zIHVuZGVmaW5lZC5cbmV4cG9ydCBjb25zdCBwYXJzZUpTT041RmlsZSA9IGFzeW5jIGZpbGVQYXRoID0+XG4gIHBhcnNlSlNPTjUoYXdhaXQgZnMucmVhZEZpbGUoZmlsZVBhdGgsIHsgZW5jb2Rpbmc6ICd1dGY4JyB9KSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
