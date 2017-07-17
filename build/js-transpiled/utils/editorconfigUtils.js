'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseEditorConfigFile = exports.parseEditorConfig = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _editorconfigParser = require('editorconfig-parser');

var _editorconfigParser2 = _interopRequireDefault(_editorconfigParser);

var _stdioUtils = require('./stdioUtils');

var stdio = _interopRequireWildcard(_stdioUtils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Parses some .editorconfig text if it's well formed, otherwise silently fails
// and returns undefined.
var parseEditorConfig = exports.parseEditorConfig = function parseEditorConfig(string) {
  try {
    return _editorconfigParser2.default.parse(string);
  } catch (e) {
    stdio.info('Failed to parse editorconfig:', string);
    return undefined;
  }
};

// Parses .editorconfig file at a given path and returns an object if it exists
// and isn't malformed, otherwise silently fails and returns undefined.
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var parseEditorConfigFile = exports.parseEditorConfigFile = function () {
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
            parsed = parseEditorConfig(contents);

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

  return function parseEditorConfigFile(_x) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL2VkaXRvcmNvbmZpZ1V0aWxzLmpzIl0sIm5hbWVzIjpbInN0ZGlvIiwicGFyc2VFZGl0b3JDb25maWciLCJzdHJpbmciLCJwYXJzZSIsImUiLCJpbmZvIiwidW5kZWZpbmVkIiwicGFyc2VFZGl0b3JDb25maWdGaWxlIiwiZmlsZVBhdGgiLCJjb250ZW50cyIsInJlYWRGaWxlIiwiZW5jb2RpbmciLCJwYXJzZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUlBOzs7O0FBQ0E7Ozs7QUFFQTs7SUFBWUEsSzs7Ozs7O0FBRVo7QUFDQTtBQUNPLElBQU1DLGdEQUFvQixTQUFwQkEsaUJBQW9CLENBQUNDLE1BQUQsRUFBWTtBQUMzQyxNQUFJO0FBQ0YsV0FBTyw2QkFBYUMsS0FBYixDQUFtQkQsTUFBbkIsQ0FBUDtBQUNELEdBRkQsQ0FFRSxPQUFPRSxDQUFQLEVBQVU7QUFDVkosVUFBTUssSUFBTixDQUFXLCtCQUFYLEVBQTRDSCxNQUE1QztBQUNBLFdBQU9JLFNBQVA7QUFDRDtBQUNGLENBUE07O0FBU1A7QUFDQTtBQXJCQTs7OztBQXNCTyxJQUFNQztBQUFBLHdFQUF3QixpQkFBT0MsUUFBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDbkNSLGtCQUFNSyxJQUFOLENBQVcsMkJBQVgsRUFBd0NHLFFBQXhDO0FBQ0lDLG9CQUYrQjtBQUFBO0FBQUE7QUFBQSxtQkFJaEIsa0JBQUdDLFFBQUgsQ0FBWUYsUUFBWixFQUFzQixFQUFFRyxVQUFVLE1BQVosRUFBdEIsQ0FKZ0I7O0FBQUE7QUFJakNGLG9CQUppQztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQU1qQ1Qsa0JBQU1LLElBQU4sQ0FBVyxzQkFBWCxFQUFtQ0csUUFBbkM7QUFOaUMsNkNBTzFCRixTQVAwQjs7QUFBQTtBQVM3Qk0sa0JBVDZCLEdBU3BCWCxrQkFBa0JRLFFBQWxCLENBVG9COztBQUFBLGtCQVUvQkcsV0FBV04sU0FWb0I7QUFBQTtBQUFBO0FBQUE7O0FBV2pDTixrQkFBTUssSUFBTixDQUFXLHVCQUFYLEVBQW9DRyxRQUFwQztBQVhpQyw2Q0FZMUJGLFNBWjBCOztBQUFBO0FBQUEsNkNBYzVCTSxNQWQ0Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUF4Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOIiwiZmlsZSI6InV0aWxzL2VkaXRvcmNvbmZpZ1V0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy4gKi9cblxuaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCBlZGl0b3Jjb25maWcgZnJvbSAnZWRpdG9yY29uZmlnLXBhcnNlcic7XG5cbmltcG9ydCAqIGFzIHN0ZGlvIGZyb20gJy4vc3RkaW9VdGlscyc7XG5cbi8vIFBhcnNlcyBzb21lIC5lZGl0b3Jjb25maWcgdGV4dCBpZiBpdCdzIHdlbGwgZm9ybWVkLCBvdGhlcndpc2Ugc2lsZW50bHkgZmFpbHNcbi8vIGFuZCByZXR1cm5zIHVuZGVmaW5lZC5cbmV4cG9ydCBjb25zdCBwYXJzZUVkaXRvckNvbmZpZyA9IChzdHJpbmcpID0+IHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZWRpdG9yY29uZmlnLnBhcnNlKHN0cmluZyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBzdGRpby5pbmZvKCdGYWlsZWQgdG8gcGFyc2UgZWRpdG9yY29uZmlnOicsIHN0cmluZyk7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufTtcblxuLy8gUGFyc2VzIC5lZGl0b3Jjb25maWcgZmlsZSBhdCBhIGdpdmVuIHBhdGggYW5kIHJldHVybnMgYW4gb2JqZWN0IGlmIGl0IGV4aXN0c1xuLy8gYW5kIGlzbid0IG1hbGZvcm1lZCwgb3RoZXJ3aXNlIHNpbGVudGx5IGZhaWxzIGFuZCByZXR1cm5zIHVuZGVmaW5lZC5cbmV4cG9ydCBjb25zdCBwYXJzZUVkaXRvckNvbmZpZ0ZpbGUgPSBhc3luYyAoZmlsZVBhdGgpID0+IHtcbiAgc3RkaW8uaW5mbygnQXR0ZW1wdGluZyB0byBwYXJzZSBmaWxlOicsIGZpbGVQYXRoKTtcbiAgbGV0IGNvbnRlbnRzO1xuICB0cnkge1xuICAgIGNvbnRlbnRzID0gYXdhaXQgZnMucmVhZEZpbGUoZmlsZVBhdGgsIHsgZW5jb2Rpbmc6ICd1dGY4JyB9KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHN0ZGlvLmluZm8oJ0ZhaWxlZCB0byByZWFkIGZpbGU6JywgZmlsZVBhdGgpO1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgY29uc3QgcGFyc2VkID0gcGFyc2VFZGl0b3JDb25maWcoY29udGVudHMpO1xuICBpZiAocGFyc2VkID09PSB1bmRlZmluZWQpIHtcbiAgICBzdGRpby5pbmZvKCdGYWlsZWQgdG8gcGFyc2UgZmlsZTonLCBmaWxlUGF0aCk7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICByZXR1cm4gcGFyc2VkO1xufTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
