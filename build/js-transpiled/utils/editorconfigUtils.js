"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseEditorConfigFile = exports.parseEditorConfig = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("regenerator-runtime/runtime");

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL2VkaXRvcmNvbmZpZ1V0aWxzLmpzIl0sIm5hbWVzIjpbInBhcnNlRWRpdG9yQ29uZmlnIiwic3RyaW5nIiwiZWRpdG9yY29uZmlnIiwicGFyc2UiLCJlIiwic3RkaW8iLCJpbmZvIiwidW5kZWZpbmVkIiwicGFyc2VFZGl0b3JDb25maWdGaWxlIiwiZmlsZVBhdGgiLCJmcyIsInJlYWRGaWxlIiwiZW5jb2RpbmciLCJjb250ZW50cyIsInBhcnNlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQTs7QUFDQTs7QUFFQTs7QUFQQTs7O0FBU0E7QUFDQTtBQUNPLElBQU1BLGlCQUFpQixHQUFHLFNBQXBCQSxpQkFBb0IsQ0FBQ0MsTUFBRCxFQUFZO0FBQzNDLE1BQUk7QUFDRixXQUFPQyw0QkFBYUMsS0FBYixDQUFtQkYsTUFBbkIsQ0FBUDtBQUNELEdBRkQsQ0FFRSxPQUFPRyxDQUFQLEVBQVU7QUFDVkMsSUFBQUEsS0FBSyxDQUFDQyxJQUFOLENBQVcsK0JBQVgsRUFBNENMLE1BQTVDO0FBQ0EsV0FBT00sU0FBUDtBQUNEO0FBQ0YsQ0FQTSxDLENBU1A7QUFDQTs7Ozs7QUFDTyxJQUFNQyxxQkFBcUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDRCQUFHLGlCQUFPQyxRQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNuQ0osWUFBQUEsS0FBSyxDQUFDQyxJQUFOLENBQVcsMkJBQVgsRUFBd0NHLFFBQXhDO0FBRG1DO0FBQUE7QUFBQSxtQkFJaEJDLGlCQUFHQyxRQUFILENBQVlGLFFBQVosRUFBc0I7QUFBRUcsY0FBQUEsUUFBUSxFQUFFO0FBQVosYUFBdEIsQ0FKZ0I7O0FBQUE7QUFJakNDLFlBQUFBLFFBSmlDO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFNakNSLFlBQUFBLEtBQUssQ0FBQ0MsSUFBTixDQUFXLHNCQUFYLEVBQW1DRyxRQUFuQztBQU5pQyw2Q0FPMUJGLFNBUDBCOztBQUFBO0FBUzdCTyxZQUFBQSxNQVQ2QixHQVNwQmQsaUJBQWlCLENBQUNhLFFBQUQsQ0FURzs7QUFBQSxrQkFVL0JDLE1BQU0sS0FBS1AsU0FWb0I7QUFBQTtBQUFBO0FBQUE7O0FBV2pDRixZQUFBQSxLQUFLLENBQUNDLElBQU4sQ0FBVyx1QkFBWCxFQUFvQ0csUUFBcEM7QUFYaUMsNkNBWTFCRixTQVowQjs7QUFBQTtBQUFBLDZDQWM1Qk8sTUFkNEI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQSxrQkFBckJOLHFCQUFxQjtBQUFBO0FBQUE7QUFBQSxHQUEzQiIsInNvdXJjZXNDb250ZW50IjpbIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uICovXG5cbmltcG9ydCBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgZWRpdG9yY29uZmlnIGZyb20gJ2VkaXRvcmNvbmZpZy1wYXJzZXInO1xuXG5pbXBvcnQgKiBhcyBzdGRpbyBmcm9tICcuL3N0ZGlvVXRpbHMnO1xuXG4vLyBQYXJzZXMgc29tZSAuZWRpdG9yY29uZmlnIHRleHQgaWYgaXQncyB3ZWxsIGZvcm1lZCwgb3RoZXJ3aXNlIHNpbGVudGx5IGZhaWxzXG4vLyBhbmQgcmV0dXJucyB1bmRlZmluZWQuXG5leHBvcnQgY29uc3QgcGFyc2VFZGl0b3JDb25maWcgPSAoc3RyaW5nKSA9PiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGVkaXRvcmNvbmZpZy5wYXJzZShzdHJpbmcpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgc3RkaW8uaW5mbygnRmFpbGVkIHRvIHBhcnNlIGVkaXRvcmNvbmZpZzonLCBzdHJpbmcpO1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn07XG5cbi8vIFBhcnNlcyAuZWRpdG9yY29uZmlnIGZpbGUgYXQgYSBnaXZlbiBwYXRoIGFuZCByZXR1cm5zIGFuIG9iamVjdCBpZiBpdCBleGlzdHNcbi8vIGFuZCBpc24ndCBtYWxmb3JtZWQsIG90aGVyd2lzZSBzaWxlbnRseSBmYWlscyBhbmQgcmV0dXJucyB1bmRlZmluZWQuXG5leHBvcnQgY29uc3QgcGFyc2VFZGl0b3JDb25maWdGaWxlID0gYXN5bmMgKGZpbGVQYXRoKSA9PiB7XG4gIHN0ZGlvLmluZm8oJ0F0dGVtcHRpbmcgdG8gcGFyc2UgZmlsZTonLCBmaWxlUGF0aCk7XG4gIGxldCBjb250ZW50cztcbiAgdHJ5IHtcbiAgICBjb250ZW50cyA9IGF3YWl0IGZzLnJlYWRGaWxlKGZpbGVQYXRoLCB7IGVuY29kaW5nOiAndXRmOCcgfSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBzdGRpby5pbmZvKCdGYWlsZWQgdG8gcmVhZCBmaWxlOicsIGZpbGVQYXRoKTtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlRWRpdG9yQ29uZmlnKGNvbnRlbnRzKTtcbiAgaWYgKHBhcnNlZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgc3RkaW8uaW5mbygnRmFpbGVkIHRvIHBhcnNlIGZpbGU6JywgZmlsZVBhdGgpO1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG4iXSwiZmlsZSI6InV0aWxzL2VkaXRvcmNvbmZpZ1V0aWxzLmpzIn0=
