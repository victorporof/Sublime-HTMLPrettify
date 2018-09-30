"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseEditorConfigFile = exports.parseEditorConfig = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _editorconfigParser = _interopRequireDefault(require("editorconfig-parser"));

var stdio = _interopRequireWildcard(require("./stdioUtils"));

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
// Parses some .editorconfig text if it's well formed, otherwise silently fails
// and returns undefined.
var parseEditorConfig = function parseEditorConfig(string) {
  try {
    return _editorconfigParser.default.parse(string);
  } catch (e) {
    stdio.info('Failed to parse editorconfig:', string);
    return undefined;
  }
}; // Parses .editorconfig file at a given path and returns an object if it exists
// and isn't malformed, otherwise silently fails and returns undefined.


exports.parseEditorConfig = parseEditorConfig;

var parseEditorConfigFile =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(filePath) {
    var contents, parsed;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            stdio.info('Attempting to parse file:', filePath);
            _context.prev = 1;
            _context.next = 4;
            return _fsExtra.default.readFile(filePath, {
              encoding: 'utf8'
            });

          case 4:
            contents = _context.sent;
            _context.next = 11;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](1);
            stdio.info('Failed to read file:', filePath);
            return _context.abrupt("return", undefined);

          case 11:
            parsed = parseEditorConfig(contents);

            if (!(parsed === undefined)) {
              _context.next = 15;
              break;
            }

            stdio.info('Failed to parse file:', filePath);
            return _context.abrupt("return", undefined);

          case 15:
            return _context.abrupt("return", parsed);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[1, 7]]);
  }));

  return function parseEditorConfigFile(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.parseEditorConfigFile = parseEditorConfigFile;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL2VkaXRvcmNvbmZpZ1V0aWxzLmpzIl0sIm5hbWVzIjpbInBhcnNlRWRpdG9yQ29uZmlnIiwic3RyaW5nIiwiZWRpdG9yY29uZmlnIiwicGFyc2UiLCJlIiwic3RkaW8iLCJpbmZvIiwidW5kZWZpbmVkIiwicGFyc2VFZGl0b3JDb25maWdGaWxlIiwiZmlsZVBhdGgiLCJmcyIsInJlYWRGaWxlIiwiZW5jb2RpbmciLCJjb250ZW50cyIsInBhcnNlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBSUE7O0FBQ0E7O0FBRUE7O0FBUEE7OztBQVNBO0FBQ0E7QUFDTyxJQUFNQSxpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQW9CLENBQUNDLE1BQUQsRUFBWTtBQUMzQyxNQUFJO0FBQ0YsV0FBT0MsNEJBQWFDLEtBQWIsQ0FBbUJGLE1BQW5CLENBQVA7QUFDRCxHQUZELENBRUUsT0FBT0csQ0FBUCxFQUFVO0FBQ1ZDLElBQUFBLEtBQUssQ0FBQ0MsSUFBTixDQUFXLCtCQUFYLEVBQTRDTCxNQUE1QztBQUNBLFdBQU9NLFNBQVA7QUFDRDtBQUNGLENBUE0sQyxDQVNQO0FBQ0E7Ozs7O0FBQ08sSUFBTUMscUJBQXFCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw0QkFBRyxpQkFBT0MsUUFBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDbkNKLFlBQUFBLEtBQUssQ0FBQ0MsSUFBTixDQUFXLDJCQUFYLEVBQXdDRyxRQUF4QztBQURtQztBQUFBO0FBQUEsbUJBSWhCQyxpQkFBR0MsUUFBSCxDQUFZRixRQUFaLEVBQXNCO0FBQUVHLGNBQUFBLFFBQVEsRUFBRTtBQUFaLGFBQXRCLENBSmdCOztBQUFBO0FBSWpDQyxZQUFBQSxRQUppQztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBTWpDUixZQUFBQSxLQUFLLENBQUNDLElBQU4sQ0FBVyxzQkFBWCxFQUFtQ0csUUFBbkM7QUFOaUMsNkNBTzFCRixTQVAwQjs7QUFBQTtBQVM3Qk8sWUFBQUEsTUFUNkIsR0FTcEJkLGlCQUFpQixDQUFDYSxRQUFELENBVEc7O0FBQUEsa0JBVS9CQyxNQUFNLEtBQUtQLFNBVm9CO0FBQUE7QUFBQTtBQUFBOztBQVdqQ0YsWUFBQUEsS0FBSyxDQUFDQyxJQUFOLENBQVcsdUJBQVgsRUFBb0NHLFFBQXBDO0FBWGlDLDZDQVkxQkYsU0FaMEI7O0FBQUE7QUFBQSw2Q0FjNUJPLE1BZDRCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUg7O0FBQUEsa0JBQXJCTixxQkFBcUI7QUFBQTtBQUFBO0FBQUEsR0FBM0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLiAqL1xuXG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0IGVkaXRvcmNvbmZpZyBmcm9tICdlZGl0b3Jjb25maWctcGFyc2VyJztcblxuaW1wb3J0ICogYXMgc3RkaW8gZnJvbSAnLi9zdGRpb1V0aWxzJztcblxuLy8gUGFyc2VzIHNvbWUgLmVkaXRvcmNvbmZpZyB0ZXh0IGlmIGl0J3Mgd2VsbCBmb3JtZWQsIG90aGVyd2lzZSBzaWxlbnRseSBmYWlsc1xuLy8gYW5kIHJldHVybnMgdW5kZWZpbmVkLlxuZXhwb3J0IGNvbnN0IHBhcnNlRWRpdG9yQ29uZmlnID0gKHN0cmluZykgPT4ge1xuICB0cnkge1xuICAgIHJldHVybiBlZGl0b3Jjb25maWcucGFyc2Uoc3RyaW5nKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHN0ZGlvLmluZm8oJ0ZhaWxlZCB0byBwYXJzZSBlZGl0b3Jjb25maWc6Jywgc3RyaW5nKTtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59O1xuXG4vLyBQYXJzZXMgLmVkaXRvcmNvbmZpZyBmaWxlIGF0IGEgZ2l2ZW4gcGF0aCBhbmQgcmV0dXJucyBhbiBvYmplY3QgaWYgaXQgZXhpc3RzXG4vLyBhbmQgaXNuJ3QgbWFsZm9ybWVkLCBvdGhlcndpc2Ugc2lsZW50bHkgZmFpbHMgYW5kIHJldHVybnMgdW5kZWZpbmVkLlxuZXhwb3J0IGNvbnN0IHBhcnNlRWRpdG9yQ29uZmlnRmlsZSA9IGFzeW5jIChmaWxlUGF0aCkgPT4ge1xuICBzdGRpby5pbmZvKCdBdHRlbXB0aW5nIHRvIHBhcnNlIGZpbGU6JywgZmlsZVBhdGgpO1xuICBsZXQgY29udGVudHM7XG4gIHRyeSB7XG4gICAgY29udGVudHMgPSBhd2FpdCBmcy5yZWFkRmlsZShmaWxlUGF0aCwgeyBlbmNvZGluZzogJ3V0ZjgnIH0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgc3RkaW8uaW5mbygnRmFpbGVkIHRvIHJlYWQgZmlsZTonLCBmaWxlUGF0aCk7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBjb25zdCBwYXJzZWQgPSBwYXJzZUVkaXRvckNvbmZpZyhjb250ZW50cyk7XG4gIGlmIChwYXJzZWQgPT09IHVuZGVmaW5lZCkge1xuICAgIHN0ZGlvLmluZm8oJ0ZhaWxlZCB0byBwYXJzZSBmaWxlOicsIGZpbGVQYXRoKTtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIl0sImZpbGUiOiJ1dGlscy9lZGl0b3Jjb25maWdVdGlscy5qcyJ9
