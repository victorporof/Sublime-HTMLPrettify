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
    stdio.info('Failed to parse:', string);
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
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = parseEditorConfig;
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

  return function parseEditorConfigFile(_x) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL2VkaXRvcmNvbmZpZ1V0aWxzLmpzIl0sIm5hbWVzIjpbInN0ZGlvIiwicGFyc2VFZGl0b3JDb25maWciLCJzdHJpbmciLCJwYXJzZSIsImUiLCJpbmZvIiwidW5kZWZpbmVkIiwicGFyc2VFZGl0b3JDb25maWdGaWxlIiwiZmlsZVBhdGgiLCJyZWFkRmlsZSIsImVuY29kaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFJQTs7OztBQUNBOzs7O0FBRUE7O0lBQVlBLEs7Ozs7OztBQUVaO0FBQ0E7QUFDTyxJQUFNQyxnREFBb0IsU0FBcEJBLGlCQUFvQixDQUFDQyxNQUFELEVBQVk7QUFDM0MsTUFBSTtBQUNGLFdBQU8sNkJBQWFDLEtBQWIsQ0FBbUJELE1BQW5CLENBQVA7QUFDRCxHQUZELENBRUUsT0FBT0UsQ0FBUCxFQUFVO0FBQ1ZKLFVBQU1LLElBQU4sQ0FBVyxrQkFBWCxFQUErQkgsTUFBL0I7QUFDQSxXQUFPSSxTQUFQO0FBQ0Q7QUFDRixDQVBNOztBQVNQO0FBQ0E7QUFyQkE7Ozs7QUFzQk8sSUFBTUM7QUFBQSx3RUFBd0IsaUJBQU1DLFFBQU47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUNuQ1AsaUJBRG1DO0FBQUE7QUFBQSxtQkFDWCxrQkFBR1EsUUFBSCxDQUFZRCxRQUFaLEVBQXNCLEVBQUVFLFVBQVUsTUFBWixFQUF0QixDQURXOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUF4Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOIiwiZmlsZSI6InV0aWxzL2VkaXRvcmNvbmZpZ1V0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy4gKi9cblxuaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCBlZGl0b3Jjb25maWcgZnJvbSAnZWRpdG9yY29uZmlnLXBhcnNlcic7XG5cbmltcG9ydCAqIGFzIHN0ZGlvIGZyb20gJy4vc3RkaW9VdGlscyc7XG5cbi8vIFBhcnNlcyBzb21lIC5lZGl0b3Jjb25maWcgdGV4dCBpZiBpdCdzIHdlbGwgZm9ybWVkLCBvdGhlcndpc2Ugc2lsZW50bHkgZmFpbHNcbi8vIGFuZCByZXR1cm5zIHVuZGVmaW5lZC5cbmV4cG9ydCBjb25zdCBwYXJzZUVkaXRvckNvbmZpZyA9IChzdHJpbmcpID0+IHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZWRpdG9yY29uZmlnLnBhcnNlKHN0cmluZyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBzdGRpby5pbmZvKCdGYWlsZWQgdG8gcGFyc2U6Jywgc3RyaW5nKTtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59O1xuXG4vLyBQYXJzZXMgLmVkaXRvcmNvbmZpZyBmaWxlIGF0IGEgZ2l2ZW4gcGF0aCBhbmQgcmV0dXJucyBhbiBvYmplY3QgaWYgaXQgZXhpc3RzXG4vLyBhbmQgaXNuJ3QgbWFsZm9ybWVkLCBvdGhlcndpc2Ugc2lsZW50bHkgZmFpbHMgYW5kIHJldHVybnMgdW5kZWZpbmVkLlxuZXhwb3J0IGNvbnN0IHBhcnNlRWRpdG9yQ29uZmlnRmlsZSA9IGFzeW5jIGZpbGVQYXRoID0+XG4gIHBhcnNlRWRpdG9yQ29uZmlnKGF3YWl0IGZzLnJlYWRGaWxlKGZpbGVQYXRoLCB7IGVuY29kaW5nOiAndXRmOCcgfSkpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
