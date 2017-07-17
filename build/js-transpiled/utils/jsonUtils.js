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
    stdio.info('Failed to parse jsbeautifyrc:', string);
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
    var contents, parsed;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            stdio.info('Attempting to parse file:', filePath);
            contents = void 0;
            _context.prev = 2;
            _context.next = 5;
            return _fsExtra2.default.readFile(filePath, { encoding: 'utf8' });

          case 5:
            contents = _context.sent;
            _context.next = 12;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context['catch'](2);

            stdio.info('Failed to read file:', filePath);
            return _context.abrupt('return', undefined);

          case 12:
            parsed = parseJSON5(contents);

            if (!(parsed === undefined)) {
              _context.next = 16;
              break;
            }

            stdio.info('Failed to parse file:', filePath);
            return _context.abrupt('return', undefined);

          case 16:
            return _context.abrupt('return', parsed);

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 8]]);
  }));

  return function parseJSON5File(_x) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL2pzb25VdGlscy5qcyJdLCJuYW1lcyI6WyJzdGRpbyIsInBhcnNlSlNPTjUiLCJzdHJpbmciLCJwYXJzZSIsImUiLCJpbmZvIiwidW5kZWZpbmVkIiwicGFyc2VKU09ONUZpbGUiLCJmaWxlUGF0aCIsImNvbnRlbnRzIiwicmVhZEZpbGUiLCJlbmNvZGluZyIsInBhcnNlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBSUE7Ozs7QUFDQTs7OztBQUVBOztJQUFZQSxLOzs7Ozs7QUFFWjtBQUNBO0FBQ08sSUFBTUMsa0NBQWEsU0FBYkEsVUFBYSxDQUFDQyxNQUFELEVBQVk7QUFDcEMsTUFBSTtBQUNGLFdBQU8sZUFBTUMsS0FBTixDQUFZRCxNQUFaLENBQVA7QUFDRCxHQUZELENBRUUsT0FBT0UsQ0FBUCxFQUFVO0FBQ1ZKLFVBQU1LLElBQU4sQ0FBVywrQkFBWCxFQUE0Q0gsTUFBNUM7QUFDQSxXQUFPSSxTQUFQO0FBQ0Q7QUFDRixDQVBNOztBQVNQO0FBQ0E7QUFyQkE7Ozs7QUFzQk8sSUFBTUM7QUFBQSx3RUFBaUIsaUJBQU9DLFFBQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQzVCUixrQkFBTUssSUFBTixDQUFXLDJCQUFYLEVBQXdDRyxRQUF4QztBQUNJQyxvQkFGd0I7QUFBQTtBQUFBO0FBQUEsbUJBSVQsa0JBQUdDLFFBQUgsQ0FBWUYsUUFBWixFQUFzQixFQUFFRyxVQUFVLE1BQVosRUFBdEIsQ0FKUzs7QUFBQTtBQUkxQkYsb0JBSjBCO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBTTFCVCxrQkFBTUssSUFBTixDQUFXLHNCQUFYLEVBQW1DRyxRQUFuQztBQU4wQiw2Q0FPbkJGLFNBUG1COztBQUFBO0FBU3RCTSxrQkFUc0IsR0FTYlgsV0FBV1EsUUFBWCxDQVRhOztBQUFBLGtCQVV4QkcsV0FBV04sU0FWYTtBQUFBO0FBQUE7QUFBQTs7QUFXMUJOLGtCQUFNSyxJQUFOLENBQVcsdUJBQVgsRUFBb0NHLFFBQXBDO0FBWDBCLDZDQVluQkYsU0FabUI7O0FBQUE7QUFBQSw2Q0FjckJNLE1BZHFCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQWpCOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU4iLCJmaWxlIjoidXRpbHMvanNvblV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy4gKi9cblxuaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCBKU09ONSBmcm9tICdqc29uNSc7XG5cbmltcG9ydCAqIGFzIHN0ZGlvIGZyb20gJy4vc3RkaW9VdGlscyc7XG5cbi8vIFBhcnNlcyBzb21lIGpzb24gdGV4dCBpZiBpdCdzIHdlbGwgZm9ybWVkLCBvdGhlcndpc2Ugc2lsZW50bHkgZmFpbHMgYW5kXG4vLyByZXR1cm5zIHVuZGVmaW5lZC5cbmV4cG9ydCBjb25zdCBwYXJzZUpTT041ID0gKHN0cmluZykgPT4ge1xuICB0cnkge1xuICAgIHJldHVybiBKU09ONS5wYXJzZShzdHJpbmcpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgc3RkaW8uaW5mbygnRmFpbGVkIHRvIHBhcnNlIGpzYmVhdXRpZnlyYzonLCBzdHJpbmcpO1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn07XG5cbi8vIFBhcnNlcyBhIGpzb24gZmlsZSBhdCBhIGdpdmVuIHBhdGggYW5kIHJldHVybnMgYW4gb2JqZWN0IGlmIGl0IGV4aXN0c1xuLy8gYW5kIGlzbid0IG1hbGZvcm1lZCwgb3RoZXJ3aXNlIHNpbGVudGx5IGZhaWxzIGFuZCByZXR1cm5zIHVuZGVmaW5lZC5cbmV4cG9ydCBjb25zdCBwYXJzZUpTT041RmlsZSA9IGFzeW5jIChmaWxlUGF0aCkgPT4ge1xuICBzdGRpby5pbmZvKCdBdHRlbXB0aW5nIHRvIHBhcnNlIGZpbGU6JywgZmlsZVBhdGgpO1xuICBsZXQgY29udGVudHM7XG4gIHRyeSB7XG4gICAgY29udGVudHMgPSBhd2FpdCBmcy5yZWFkRmlsZShmaWxlUGF0aCwgeyBlbmNvZGluZzogJ3V0ZjgnIH0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgc3RkaW8uaW5mbygnRmFpbGVkIHRvIHJlYWQgZmlsZTonLCBmaWxlUGF0aCk7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBjb25zdCBwYXJzZWQgPSBwYXJzZUpTT041KGNvbnRlbnRzKTtcbiAgaWYgKHBhcnNlZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgc3RkaW8uaW5mbygnRmFpbGVkIHRvIHBhcnNlIGZpbGU6JywgZmlsZVBhdGgpO1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
