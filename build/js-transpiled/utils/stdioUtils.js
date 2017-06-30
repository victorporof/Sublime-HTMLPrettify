'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.err = exports.out = exports.info = exports.endPrettifiedCode = exports.beginPrettifiedCode = exports.endDiagnostics = exports.beginDiagnostics = undefined;

var _constants = require('./constants');

var constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var beginDiagnostics = exports.beginDiagnostics = function beginDiagnostics() {
  console.log(constants.DIAGNOSTICS_MARKER_BEGIN);
}; /* This Source Code Form is subject to the terms of the Mozilla Public
    * License, v. 2.0. If a copy of the MPL was not distributed with this
    * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var endDiagnostics = exports.endDiagnostics = function endDiagnostics() {
  console.log(constants.DIAGNOSTICS_MARKER_END);
};

var beginPrettifiedCode = exports.beginPrettifiedCode = function beginPrettifiedCode() {
  console.log(constants.PRETTIFIED_CODE_MARKER_BEGIN);
};

var endPrettifiedCode = exports.endPrettifiedCode = function endPrettifiedCode() {
  console.log(constants.PRETTIFIED_CODE_MARKER_END);
};

var info = exports.info = function info() {
  var _console;

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (_console = console).log.apply(_console, ['[HTMLPrettify]'].concat(args));
};
var out = exports.out = console.log;
var err = exports.err = console.error;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL3N0ZGlvVXRpbHMuanMiXSwibmFtZXMiOlsiY29uc3RhbnRzIiwiYmVnaW5EaWFnbm9zdGljcyIsImNvbnNvbGUiLCJsb2ciLCJESUFHTk9TVElDU19NQVJLRVJfQkVHSU4iLCJlbmREaWFnbm9zdGljcyIsIkRJQUdOT1NUSUNTX01BUktFUl9FTkQiLCJiZWdpblByZXR0aWZpZWRDb2RlIiwiUFJFVFRJRklFRF9DT0RFX01BUktFUl9CRUdJTiIsImVuZFByZXR0aWZpZWRDb2RlIiwiUFJFVFRJRklFRF9DT0RFX01BUktFUl9FTkQiLCJpbmZvIiwiYXJncyIsIm91dCIsImVyciIsImVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBSUE7O0lBQVlBLFM7Ozs7QUFFTCxJQUFNQyw4Q0FBbUIsU0FBbkJBLGdCQUFtQixHQUFNO0FBQ3BDQyxVQUFRQyxHQUFSLENBQVlILFVBQVVJLHdCQUF0QjtBQUNELENBRk0sQyxDQU5QOzs7O0FBVU8sSUFBTUMsMENBQWlCLFNBQWpCQSxjQUFpQixHQUFNO0FBQ2xDSCxVQUFRQyxHQUFSLENBQVlILFVBQVVNLHNCQUF0QjtBQUNELENBRk07O0FBSUEsSUFBTUMsb0RBQXNCLFNBQXRCQSxtQkFBc0IsR0FBTTtBQUN2Q0wsVUFBUUMsR0FBUixDQUFZSCxVQUFVUSw0QkFBdEI7QUFDRCxDQUZNOztBQUlBLElBQU1DLGdEQUFvQixTQUFwQkEsaUJBQW9CLEdBQU07QUFDckNQLFVBQVFDLEdBQVIsQ0FBWUgsVUFBVVUsMEJBQXRCO0FBQ0QsQ0FGTTs7QUFJQSxJQUFNQyxzQkFBTyxTQUFQQSxJQUFPO0FBQUE7O0FBQUEsb0NBQUlDLElBQUo7QUFBSUEsUUFBSjtBQUFBOztBQUFBLFNBQWEscUJBQVFULEdBQVIsa0JBQVksZ0JBQVosU0FBaUNTLElBQWpDLEVBQWI7QUFBQSxDQUFiO0FBQ0EsSUFBTUMsb0JBQU1YLFFBQVFDLEdBQXBCO0FBQ0EsSUFBTVcsb0JBQU1aLFFBQVFhLEtBQXBCIiwiZmlsZSI6InV0aWxzL3N0ZGlvVXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLiAqL1xuXG5pbXBvcnQgKiBhcyBjb25zdGFudHMgZnJvbSAnLi9jb25zdGFudHMnO1xuXG5leHBvcnQgY29uc3QgYmVnaW5EaWFnbm9zdGljcyA9ICgpID0+IHtcbiAgY29uc29sZS5sb2coY29uc3RhbnRzLkRJQUdOT1NUSUNTX01BUktFUl9CRUdJTik7XG59O1xuXG5leHBvcnQgY29uc3QgZW5kRGlhZ25vc3RpY3MgPSAoKSA9PiB7XG4gIGNvbnNvbGUubG9nKGNvbnN0YW50cy5ESUFHTk9TVElDU19NQVJLRVJfRU5EKTtcbn07XG5cbmV4cG9ydCBjb25zdCBiZWdpblByZXR0aWZpZWRDb2RlID0gKCkgPT4ge1xuICBjb25zb2xlLmxvZyhjb25zdGFudHMuUFJFVFRJRklFRF9DT0RFX01BUktFUl9CRUdJTik7XG59O1xuXG5leHBvcnQgY29uc3QgZW5kUHJldHRpZmllZENvZGUgPSAoKSA9PiB7XG4gIGNvbnNvbGUubG9nKGNvbnN0YW50cy5QUkVUVElGSUVEX0NPREVfTUFSS0VSX0VORCk7XG59O1xuXG5leHBvcnQgY29uc3QgaW5mbyA9ICguLi5hcmdzKSA9PiBjb25zb2xlLmxvZygnW0hUTUxQcmV0dGlmeV0nLCAuLi5hcmdzKTtcbmV4cG9ydCBjb25zdCBvdXQgPSBjb25zb2xlLmxvZztcbmV4cG9ydCBjb25zdCBlcnIgPSBjb25zb2xlLmVycm9yO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
