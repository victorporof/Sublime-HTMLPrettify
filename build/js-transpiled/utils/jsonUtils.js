"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseJSON5File = exports.parseJSON5 = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("regenerator-runtime/runtime");

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL2pzb25VdGlscy5qcyJdLCJuYW1lcyI6WyJwYXJzZUpTT041Iiwic3RyaW5nIiwiSlNPTjUiLCJwYXJzZSIsImUiLCJzdGRpbyIsImluZm8iLCJ1bmRlZmluZWQiLCJwYXJzZUpTT041RmlsZSIsImZpbGVQYXRoIiwiZnMiLCJyZWFkRmlsZSIsImVuY29kaW5nIiwiY29udGVudHMiLCJwYXJzZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUE7O0FBQ0E7O0FBRUE7O0FBUEE7OztBQVNBO0FBQ0E7QUFDTyxJQUFNQSxVQUFVLEdBQUcsU0FBYkEsVUFBYSxDQUFDQyxNQUFELEVBQVk7QUFDcEMsTUFBSTtBQUNGLFdBQU9DLGNBQU1DLEtBQU4sQ0FBWUYsTUFBWixDQUFQO0FBQ0QsR0FGRCxDQUVFLE9BQU9HLENBQVAsRUFBVTtBQUNWQyxJQUFBQSxLQUFLLENBQUNDLElBQU4sQ0FBVywrQkFBWCxFQUE0Q0wsTUFBNUM7QUFDQSxXQUFPTSxTQUFQO0FBQ0Q7QUFDRixDQVBNLEMsQ0FTUDtBQUNBOzs7OztBQUNPLElBQU1DLGNBQWM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDRCQUFHLGlCQUFPQyxRQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUM1QkosWUFBQUEsS0FBSyxDQUFDQyxJQUFOLENBQVcsMkJBQVgsRUFBd0NHLFFBQXhDO0FBRDRCO0FBQUE7QUFBQSxtQkFJVEMsaUJBQUdDLFFBQUgsQ0FBWUYsUUFBWixFQUFzQjtBQUFFRyxjQUFBQSxRQUFRLEVBQUU7QUFBWixhQUF0QixDQUpTOztBQUFBO0FBSTFCQyxZQUFBQSxRQUowQjtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBTTFCUixZQUFBQSxLQUFLLENBQUNDLElBQU4sQ0FBVyxzQkFBWCxFQUFtQ0csUUFBbkM7QUFOMEIsNkNBT25CRixTQVBtQjs7QUFBQTtBQVN0Qk8sWUFBQUEsTUFUc0IsR0FTYmQsVUFBVSxDQUFDYSxRQUFELENBVEc7O0FBQUEsa0JBVXhCQyxNQUFNLEtBQUtQLFNBVmE7QUFBQTtBQUFBO0FBQUE7O0FBVzFCRixZQUFBQSxLQUFLLENBQUNDLElBQU4sQ0FBVyx1QkFBWCxFQUFvQ0csUUFBcEM7QUFYMEIsNkNBWW5CRixTQVptQjs7QUFBQTtBQUFBLDZDQWNyQk8sTUFkcUI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQSxrQkFBZE4sY0FBYztBQUFBO0FBQUE7QUFBQSxHQUFwQiIsInNvdXJjZXNDb250ZW50IjpbIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uICovXG5cbmltcG9ydCBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgSlNPTjUgZnJvbSAnanNvbjUnO1xuXG5pbXBvcnQgKiBhcyBzdGRpbyBmcm9tICcuL3N0ZGlvVXRpbHMnO1xuXG4vLyBQYXJzZXMgc29tZSBqc29uIHRleHQgaWYgaXQncyB3ZWxsIGZvcm1lZCwgb3RoZXJ3aXNlIHNpbGVudGx5IGZhaWxzIGFuZFxuLy8gcmV0dXJucyB1bmRlZmluZWQuXG5leHBvcnQgY29uc3QgcGFyc2VKU09ONSA9IChzdHJpbmcpID0+IHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTjUucGFyc2Uoc3RyaW5nKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHN0ZGlvLmluZm8oJ0ZhaWxlZCB0byBwYXJzZSBqc2JlYXV0aWZ5cmM6Jywgc3RyaW5nKTtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59O1xuXG4vLyBQYXJzZXMgYSBqc29uIGZpbGUgYXQgYSBnaXZlbiBwYXRoIGFuZCByZXR1cm5zIGFuIG9iamVjdCBpZiBpdCBleGlzdHNcbi8vIGFuZCBpc24ndCBtYWxmb3JtZWQsIG90aGVyd2lzZSBzaWxlbnRseSBmYWlscyBhbmQgcmV0dXJucyB1bmRlZmluZWQuXG5leHBvcnQgY29uc3QgcGFyc2VKU09ONUZpbGUgPSBhc3luYyAoZmlsZVBhdGgpID0+IHtcbiAgc3RkaW8uaW5mbygnQXR0ZW1wdGluZyB0byBwYXJzZSBmaWxlOicsIGZpbGVQYXRoKTtcbiAgbGV0IGNvbnRlbnRzO1xuICB0cnkge1xuICAgIGNvbnRlbnRzID0gYXdhaXQgZnMucmVhZEZpbGUoZmlsZVBhdGgsIHsgZW5jb2Rpbmc6ICd1dGY4JyB9KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHN0ZGlvLmluZm8oJ0ZhaWxlZCB0byByZWFkIGZpbGU6JywgZmlsZVBhdGgpO1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgY29uc3QgcGFyc2VkID0gcGFyc2VKU09ONShjb250ZW50cyk7XG4gIGlmIChwYXJzZWQgPT09IHVuZGVmaW5lZCkge1xuICAgIHN0ZGlvLmluZm8oJ0ZhaWxlZCB0byBwYXJzZSBmaWxlOicsIGZpbGVQYXRoKTtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIl0sImZpbGUiOiJ1dGlscy9qc29uVXRpbHMuanMifQ==
