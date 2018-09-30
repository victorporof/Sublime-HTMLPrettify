"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseJSON5File = exports.parseJSON5 = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _json = _interopRequireDefault(require("json5"));

var stdio = _interopRequireWildcard(require("./stdioUtils"));

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
// Parses some json text if it's well formed, otherwise silently fails and
// returns undefined.
var parseJSON5 = function parseJSON5(string) {
  try {
    return _json.default.parse(string);
  } catch (e) {
    stdio.info('Failed to parse jsbeautifyrc:', string);
    return undefined;
  }
}; // Parses a json file at a given path and returns an object if it exists
// and isn't malformed, otherwise silently fails and returns undefined.


exports.parseJSON5 = parseJSON5;

var parseJSON5File =
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
            parsed = parseJSON5(contents);

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

  return function parseJSON5File(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.parseJSON5File = parseJSON5File;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL2pzb25VdGlscy5qcyJdLCJuYW1lcyI6WyJwYXJzZUpTT041Iiwic3RyaW5nIiwiSlNPTjUiLCJwYXJzZSIsImUiLCJzdGRpbyIsImluZm8iLCJ1bmRlZmluZWQiLCJwYXJzZUpTT041RmlsZSIsImZpbGVQYXRoIiwiZnMiLCJyZWFkRmlsZSIsImVuY29kaW5nIiwiY29udGVudHMiLCJwYXJzZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUlBOztBQUNBOztBQUVBOztBQVBBOzs7QUFTQTtBQUNBO0FBQ08sSUFBTUEsVUFBVSxHQUFHLFNBQWJBLFVBQWEsQ0FBQ0MsTUFBRCxFQUFZO0FBQ3BDLE1BQUk7QUFDRixXQUFPQyxjQUFNQyxLQUFOLENBQVlGLE1BQVosQ0FBUDtBQUNELEdBRkQsQ0FFRSxPQUFPRyxDQUFQLEVBQVU7QUFDVkMsSUFBQUEsS0FBSyxDQUFDQyxJQUFOLENBQVcsK0JBQVgsRUFBNENMLE1BQTVDO0FBQ0EsV0FBT00sU0FBUDtBQUNEO0FBQ0YsQ0FQTSxDLENBU1A7QUFDQTs7Ozs7QUFDTyxJQUFNQyxjQUFjO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw0QkFBRyxpQkFBT0MsUUFBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDNUJKLFlBQUFBLEtBQUssQ0FBQ0MsSUFBTixDQUFXLDJCQUFYLEVBQXdDRyxRQUF4QztBQUQ0QjtBQUFBO0FBQUEsbUJBSVRDLGlCQUFHQyxRQUFILENBQVlGLFFBQVosRUFBc0I7QUFBRUcsY0FBQUEsUUFBUSxFQUFFO0FBQVosYUFBdEIsQ0FKUzs7QUFBQTtBQUkxQkMsWUFBQUEsUUFKMEI7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQU0xQlIsWUFBQUEsS0FBSyxDQUFDQyxJQUFOLENBQVcsc0JBQVgsRUFBbUNHLFFBQW5DO0FBTjBCLDZDQU9uQkYsU0FQbUI7O0FBQUE7QUFTdEJPLFlBQUFBLE1BVHNCLEdBU2JkLFVBQVUsQ0FBQ2EsUUFBRCxDQVRHOztBQUFBLGtCQVV4QkMsTUFBTSxLQUFLUCxTQVZhO0FBQUE7QUFBQTtBQUFBOztBQVcxQkYsWUFBQUEsS0FBSyxDQUFDQyxJQUFOLENBQVcsdUJBQVgsRUFBb0NHLFFBQXBDO0FBWDBCLDZDQVluQkYsU0FabUI7O0FBQUE7QUFBQSw2Q0FjckJPLE1BZHFCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUg7O0FBQUEsa0JBQWROLGNBQWM7QUFBQTtBQUFBO0FBQUEsR0FBcEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLiAqL1xuXG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0IEpTT041IGZyb20gJ2pzb241JztcblxuaW1wb3J0ICogYXMgc3RkaW8gZnJvbSAnLi9zdGRpb1V0aWxzJztcblxuLy8gUGFyc2VzIHNvbWUganNvbiB0ZXh0IGlmIGl0J3Mgd2VsbCBmb3JtZWQsIG90aGVyd2lzZSBzaWxlbnRseSBmYWlscyBhbmRcbi8vIHJldHVybnMgdW5kZWZpbmVkLlxuZXhwb3J0IGNvbnN0IHBhcnNlSlNPTjUgPSAoc3RyaW5nKSA9PiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIEpTT041LnBhcnNlKHN0cmluZyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBzdGRpby5pbmZvKCdGYWlsZWQgdG8gcGFyc2UganNiZWF1dGlmeXJjOicsIHN0cmluZyk7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufTtcblxuLy8gUGFyc2VzIGEganNvbiBmaWxlIGF0IGEgZ2l2ZW4gcGF0aCBhbmQgcmV0dXJucyBhbiBvYmplY3QgaWYgaXQgZXhpc3RzXG4vLyBhbmQgaXNuJ3QgbWFsZm9ybWVkLCBvdGhlcndpc2Ugc2lsZW50bHkgZmFpbHMgYW5kIHJldHVybnMgdW5kZWZpbmVkLlxuZXhwb3J0IGNvbnN0IHBhcnNlSlNPTjVGaWxlID0gYXN5bmMgKGZpbGVQYXRoKSA9PiB7XG4gIHN0ZGlvLmluZm8oJ0F0dGVtcHRpbmcgdG8gcGFyc2UgZmlsZTonLCBmaWxlUGF0aCk7XG4gIGxldCBjb250ZW50cztcbiAgdHJ5IHtcbiAgICBjb250ZW50cyA9IGF3YWl0IGZzLnJlYWRGaWxlKGZpbGVQYXRoLCB7IGVuY29kaW5nOiAndXRmOCcgfSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBzdGRpby5pbmZvKCdGYWlsZWQgdG8gcmVhZCBmaWxlOicsIGZpbGVQYXRoKTtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlSlNPTjUoY29udGVudHMpO1xuICBpZiAocGFyc2VkID09PSB1bmRlZmluZWQpIHtcbiAgICBzdGRpby5pbmZvKCdGYWlsZWQgdG8gcGFyc2UgZmlsZTonLCBmaWxlUGF0aCk7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICByZXR1cm4gcGFyc2VkO1xufTtcbiJdLCJmaWxlIjoidXRpbHMvanNvblV0aWxzLmpzIn0=
