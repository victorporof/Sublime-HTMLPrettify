'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMatchingGlob = exports.isJS = exports.isJSON = exports.isHTML = exports.isCSS = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _path = require('path');

var _minimatch = require('minimatch');

var _minimatch2 = _interopRequireDefault(_minimatch);

var _constants = require('./constants');

var _jsonUtils = require('./jsonUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var GLOBAL_FILE_RULES = (0, _jsonUtils.parseJSON5)(_constants.GLOBAL_FILE_RULES_JSON);

// Checks if a file path is allowed by regexing the file name and expecting
// it not to match certain expressions.
var isDisallowedFilePattern = function isDisallowedFilePattern(fileType, filePath) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(GLOBAL_FILE_RULES[fileType].disallowed_file_patterns || []), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var pattern = _step.value;

      if (filePath.match(new RegExp(pattern, 'i'))) {
        return true;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return false;
};

// Checks if a file is of a particular type by regexing the file name and
// expecting a certain extension.
var hasAllowedFileExtension = function hasAllowedFileExtension(expectedType, filePath) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = (0, _getIterator3.default)(GLOBAL_FILE_RULES[expectedType].allowed_file_extensions || []), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var extension = _step2.value;

      if (filePath.match(new RegExp('\\.' + extension + '$', 'i'))) {
        return true;
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return false;
};

// Checks if a file is of a particular type by regexing the syntax name and
// expecting a pattern.
var hasAllowedFileSyntax = function hasAllowedFileSyntax(expectedType, fileSyntax) {
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = (0, _getIterator3.default)(GLOBAL_FILE_RULES[expectedType].allowed_file_syntaxes || []), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var pattern = _step3.value;

      if (fileSyntax.toLowerCase().includes(pattern)) {
        return true;
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return false;
};

var isCSS = exports.isCSS = function isCSS() {
  // If file unsaved, there's no good way to determine whether or not it's
  // CSS based on the file contents, so just bail.
  if (_constants.ORIGINAL_FILE_PATH === '?') {
    return false;
  }
  if (isDisallowedFilePattern('css', _constants.ORIGINAL_FILE_PATH)) {
    return false;
  }
  var allowedExtension = hasAllowedFileExtension('css', _constants.ORIGINAL_FILE_PATH);
  if (_constants.EDITOR_FILE_SYNTAX === '?') {
    return allowedExtension;
  }
  var allowedSyntax = hasAllowedFileSyntax('css', _constants.EDITOR_FILE_SYNTAX);
  return allowedSyntax || allowedExtension;
};

var isHTML = exports.isHTML = function isHTML(bufferContents) {
  // If file unsaved, check if first non-whitespace character is &lt;
  if (_constants.ORIGINAL_FILE_PATH === '?') {
    return bufferContents.match(/^\s*</);
  }
  if (isDisallowedFilePattern('html', _constants.ORIGINAL_FILE_PATH)) {
    return false;
  }
  var allowedExtension = hasAllowedFileExtension('html', _constants.ORIGINAL_FILE_PATH);
  if (_constants.EDITOR_FILE_SYNTAX === '?') {
    return allowedExtension;
  }
  var allowedSyntax = hasAllowedFileSyntax('html', _constants.EDITOR_FILE_SYNTAX);
  return allowedSyntax || allowedExtension;
};

var isJSON = exports.isJSON = function isJSON() {
  // If file unsaved, there's no good way to determine whether or not it's
  // JSON based on the file contents, so just bail.
  if (_constants.ORIGINAL_FILE_PATH === '?') {
    return false;
  }
  if (isDisallowedFilePattern('json', _constants.ORIGINAL_FILE_PATH)) {
    return false;
  }
  var allowedExtension = hasAllowedFileExtension('json', _constants.ORIGINAL_FILE_PATH);
  if (_constants.EDITOR_FILE_SYNTAX === '?') {
    return allowedExtension;
  }
  var allowedSyntax = hasAllowedFileSyntax('json', _constants.EDITOR_FILE_SYNTAX);
  return allowedSyntax || allowedExtension;
};

var isJS = exports.isJS = function isJS(bufferContents) {
  // If file unsaved, check if first non-whitespace character is NOT &lt;
  if (_constants.ORIGINAL_FILE_PATH === '?') {
    return !bufferContents.match(/^\s*</);
  }
  if (isDisallowedFilePattern('js', _constants.ORIGINAL_FILE_PATH)) {
    return false;
  }
  var allowedExtension = hasAllowedFileExtension('js', _constants.ORIGINAL_FILE_PATH);
  if (_constants.EDITOR_FILE_SYNTAX === '?') {
    return allowedExtension;
  }
  var allowedSyntax = hasAllowedFileSyntax('js', _constants.EDITOR_FILE_SYNTAX);
  return allowedSyntax || allowedExtension;
};

// Checks if a file path matches a particular glob string.
var isMatchingGlob = exports.isMatchingGlob = function isMatchingGlob(globString) {
  // If file unsaved, reject globl matching;
  if (_constants.ORIGINAL_FILE_PATH === '?') {
    return false;
  }
  return (0, _minimatch2.default)(_constants.ORIGINAL_FILE_PATH, globString) || (0, _minimatch2.default)((0, _path.basename)(_constants.ORIGINAL_FILE_PATH), globString);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL2ZpbGVVdGlscy5qcyJdLCJuYW1lcyI6WyJHTE9CQUxfRklMRV9SVUxFUyIsImlzRGlzYWxsb3dlZEZpbGVQYXR0ZXJuIiwiZmlsZVR5cGUiLCJmaWxlUGF0aCIsImRpc2FsbG93ZWRfZmlsZV9wYXR0ZXJucyIsInBhdHRlcm4iLCJtYXRjaCIsIlJlZ0V4cCIsImhhc0FsbG93ZWRGaWxlRXh0ZW5zaW9uIiwiZXhwZWN0ZWRUeXBlIiwiYWxsb3dlZF9maWxlX2V4dGVuc2lvbnMiLCJleHRlbnNpb24iLCJoYXNBbGxvd2VkRmlsZVN5bnRheCIsImZpbGVTeW50YXgiLCJhbGxvd2VkX2ZpbGVfc3ludGF4ZXMiLCJ0b0xvd2VyQ2FzZSIsImluY2x1ZGVzIiwiaXNDU1MiLCJhbGxvd2VkRXh0ZW5zaW9uIiwiYWxsb3dlZFN5bnRheCIsImlzSFRNTCIsImJ1ZmZlckNvbnRlbnRzIiwiaXNKU09OIiwiaXNKUyIsImlzTWF0Y2hpbmdHbG9iIiwiZ2xvYlN0cmluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFJQTs7QUFFQTs7OztBQUVBOztBQUNBOzs7O0FBVEE7Ozs7QUFXQSxJQUFNQSxvQkFBb0IsNkRBQTFCOztBQUVBO0FBQ0E7QUFDQSxJQUFNQywwQkFBMEIsU0FBMUJBLHVCQUEwQixDQUFDQyxRQUFELEVBQVdDLFFBQVgsRUFBd0I7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDdEQsb0RBQXNCSCxrQkFBa0JFLFFBQWxCLEVBQTRCRSx3QkFBNUIsSUFBd0QsRUFBOUUsNEdBQWtGO0FBQUEsVUFBdkVDLE9BQXVFOztBQUNoRixVQUFJRixTQUFTRyxLQUFULENBQWUsSUFBSUMsTUFBSixDQUFXRixPQUFYLEVBQW9CLEdBQXBCLENBQWYsQ0FBSixFQUE4QztBQUM1QyxlQUFPLElBQVA7QUFDRDtBQUNGO0FBTHFEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBTXRELFNBQU8sS0FBUDtBQUNELENBUEQ7O0FBU0E7QUFDQTtBQUNBLElBQU1HLDBCQUEwQixTQUExQkEsdUJBQTBCLENBQUNDLFlBQUQsRUFBZU4sUUFBZixFQUE0QjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUMxRCxxREFBd0JILGtCQUFrQlMsWUFBbEIsRUFBZ0NDLHVCQUFoQyxJQUEyRCxFQUFuRixpSEFBdUY7QUFBQSxVQUE1RUMsU0FBNEU7O0FBQ3JGLFVBQUlSLFNBQVNHLEtBQVQsQ0FBZSxJQUFJQyxNQUFKLFNBQWlCSSxTQUFqQixRQUErQixHQUEvQixDQUFmLENBQUosRUFBeUQ7QUFDdkQsZUFBTyxJQUFQO0FBQ0Q7QUFDRjtBQUx5RDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQU0xRCxTQUFPLEtBQVA7QUFDRCxDQVBEOztBQVNBO0FBQ0E7QUFDQSxJQUFNQyx1QkFBdUIsU0FBdkJBLG9CQUF1QixDQUFDSCxZQUFELEVBQWVJLFVBQWYsRUFBOEI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDekQscURBQXNCYixrQkFBa0JTLFlBQWxCLEVBQWdDSyxxQkFBaEMsSUFBeUQsRUFBL0UsaUhBQW1GO0FBQUEsVUFBeEVULE9BQXdFOztBQUNqRixVQUFJUSxXQUFXRSxXQUFYLEdBQXlCQyxRQUF6QixDQUFrQ1gsT0FBbEMsQ0FBSixFQUFnRDtBQUM5QyxlQUFPLElBQVA7QUFDRDtBQUNGO0FBTHdEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBTXpELFNBQU8sS0FBUDtBQUNELENBUEQ7O0FBU08sSUFBTVksd0JBQVEsU0FBUkEsS0FBUSxHQUFNO0FBQ3pCO0FBQ0E7QUFDQSxNQUFJLGtDQUF1QixHQUEzQixFQUFnQztBQUM5QixXQUFPLEtBQVA7QUFDRDtBQUNELE1BQUloQix3QkFBd0IsS0FBeEIsZ0NBQUosRUFBd0Q7QUFDdEQsV0FBTyxLQUFQO0FBQ0Q7QUFDRCxNQUFNaUIsbUJBQW1CVix3QkFBd0IsS0FBeEIsZ0NBQXpCO0FBQ0EsTUFBSSxrQ0FBdUIsR0FBM0IsRUFBZ0M7QUFDOUIsV0FBT1UsZ0JBQVA7QUFDRDtBQUNELE1BQU1DLGdCQUFnQlAscUJBQXFCLEtBQXJCLGdDQUF0QjtBQUNBLFNBQU9PLGlCQUFpQkQsZ0JBQXhCO0FBQ0QsQ0FmTTs7QUFpQkEsSUFBTUUsMEJBQVMsU0FBVEEsTUFBUyxDQUFDQyxjQUFELEVBQW9CO0FBQ3hDO0FBQ0EsTUFBSSxrQ0FBdUIsR0FBM0IsRUFBZ0M7QUFDOUIsV0FBT0EsZUFBZWYsS0FBZixDQUFxQixPQUFyQixDQUFQO0FBQ0Q7QUFDRCxNQUFJTCx3QkFBd0IsTUFBeEIsZ0NBQUosRUFBeUQ7QUFDdkQsV0FBTyxLQUFQO0FBQ0Q7QUFDRCxNQUFNaUIsbUJBQW1CVix3QkFBd0IsTUFBeEIsZ0NBQXpCO0FBQ0EsTUFBSSxrQ0FBdUIsR0FBM0IsRUFBZ0M7QUFDOUIsV0FBT1UsZ0JBQVA7QUFDRDtBQUNELE1BQU1DLGdCQUFnQlAscUJBQXFCLE1BQXJCLGdDQUF0QjtBQUNBLFNBQU9PLGlCQUFpQkQsZ0JBQXhCO0FBQ0QsQ0FkTTs7QUFnQkEsSUFBTUksMEJBQVMsU0FBVEEsTUFBUyxHQUFNO0FBQzFCO0FBQ0E7QUFDQSxNQUFJLGtDQUF1QixHQUEzQixFQUFnQztBQUM5QixXQUFPLEtBQVA7QUFDRDtBQUNELE1BQUlyQix3QkFBd0IsTUFBeEIsZ0NBQUosRUFBeUQ7QUFDdkQsV0FBTyxLQUFQO0FBQ0Q7QUFDRCxNQUFNaUIsbUJBQW1CVix3QkFBd0IsTUFBeEIsZ0NBQXpCO0FBQ0EsTUFBSSxrQ0FBdUIsR0FBM0IsRUFBZ0M7QUFDOUIsV0FBT1UsZ0JBQVA7QUFDRDtBQUNELE1BQU1DLGdCQUFnQlAscUJBQXFCLE1BQXJCLGdDQUF0QjtBQUNBLFNBQU9PLGlCQUFpQkQsZ0JBQXhCO0FBQ0QsQ0FmTTs7QUFpQkEsSUFBTUssc0JBQU8sU0FBUEEsSUFBTyxDQUFDRixjQUFELEVBQW9CO0FBQ3RDO0FBQ0EsTUFBSSxrQ0FBdUIsR0FBM0IsRUFBZ0M7QUFDOUIsV0FBTyxDQUFDQSxlQUFlZixLQUFmLENBQXFCLE9BQXJCLENBQVI7QUFDRDtBQUNELE1BQUlMLHdCQUF3QixJQUF4QixnQ0FBSixFQUF1RDtBQUNyRCxXQUFPLEtBQVA7QUFDRDtBQUNELE1BQU1pQixtQkFBbUJWLHdCQUF3QixJQUF4QixnQ0FBekI7QUFDQSxNQUFJLGtDQUF1QixHQUEzQixFQUFnQztBQUM5QixXQUFPVSxnQkFBUDtBQUNEO0FBQ0QsTUFBTUMsZ0JBQWdCUCxxQkFBcUIsSUFBckIsZ0NBQXRCO0FBQ0EsU0FBT08saUJBQWlCRCxnQkFBeEI7QUFDRCxDQWRNOztBQWdCUDtBQUNPLElBQU1NLDBDQUFpQixTQUFqQkEsY0FBaUIsQ0FBQ0MsVUFBRCxFQUFnQjtBQUM1QztBQUNBLE1BQUksa0NBQXVCLEdBQTNCLEVBQWdDO0FBQzlCLFdBQU8sS0FBUDtBQUNEO0FBQ0QsU0FBTyx3REFBOEJBLFVBQTlCLEtBQTZDLHlCQUFVLGtEQUFWLEVBQXdDQSxVQUF4QyxDQUFwRDtBQUNELENBTk0iLCJmaWxlIjoidXRpbHMvZmlsZVV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy4gKi9cblxuaW1wb3J0IHsgYmFzZW5hbWUgfSBmcm9tICdwYXRoJztcblxuaW1wb3J0IG1pbmltYXRjaCBmcm9tICdtaW5pbWF0Y2gnO1xuXG5pbXBvcnQgeyBHTE9CQUxfRklMRV9SVUxFU19KU09OLCBPUklHSU5BTF9GSUxFX1BBVEgsIEVESVRPUl9GSUxFX1NZTlRBWCB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IHBhcnNlSlNPTjUgfSBmcm9tICcuL2pzb25VdGlscyc7XG5cbmNvbnN0IEdMT0JBTF9GSUxFX1JVTEVTID0gcGFyc2VKU09ONShHTE9CQUxfRklMRV9SVUxFU19KU09OKTtcblxuLy8gQ2hlY2tzIGlmIGEgZmlsZSBwYXRoIGlzIGFsbG93ZWQgYnkgcmVnZXhpbmcgdGhlIGZpbGUgbmFtZSBhbmQgZXhwZWN0aW5nXG4vLyBpdCBub3QgdG8gbWF0Y2ggY2VydGFpbiBleHByZXNzaW9ucy5cbmNvbnN0IGlzRGlzYWxsb3dlZEZpbGVQYXR0ZXJuID0gKGZpbGVUeXBlLCBmaWxlUGF0aCkgPT4ge1xuICBmb3IgKGNvbnN0IHBhdHRlcm4gb2YgR0xPQkFMX0ZJTEVfUlVMRVNbZmlsZVR5cGVdLmRpc2FsbG93ZWRfZmlsZV9wYXR0ZXJucyB8fCBbXSkge1xuICAgIGlmIChmaWxlUGF0aC5tYXRjaChuZXcgUmVnRXhwKHBhdHRlcm4sICdpJykpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuLy8gQ2hlY2tzIGlmIGEgZmlsZSBpcyBvZiBhIHBhcnRpY3VsYXIgdHlwZSBieSByZWdleGluZyB0aGUgZmlsZSBuYW1lIGFuZFxuLy8gZXhwZWN0aW5nIGEgY2VydGFpbiBleHRlbnNpb24uXG5jb25zdCBoYXNBbGxvd2VkRmlsZUV4dGVuc2lvbiA9IChleHBlY3RlZFR5cGUsIGZpbGVQYXRoKSA9PiB7XG4gIGZvciAoY29uc3QgZXh0ZW5zaW9uIG9mIEdMT0JBTF9GSUxFX1JVTEVTW2V4cGVjdGVkVHlwZV0uYWxsb3dlZF9maWxlX2V4dGVuc2lvbnMgfHwgW10pIHtcbiAgICBpZiAoZmlsZVBhdGgubWF0Y2gobmV3IFJlZ0V4cChgXFxcXC4ke2V4dGVuc2lvbn0kYCwgJ2knKSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG4vLyBDaGVja3MgaWYgYSBmaWxlIGlzIG9mIGEgcGFydGljdWxhciB0eXBlIGJ5IHJlZ2V4aW5nIHRoZSBzeW50YXggbmFtZSBhbmRcbi8vIGV4cGVjdGluZyBhIHBhdHRlcm4uXG5jb25zdCBoYXNBbGxvd2VkRmlsZVN5bnRheCA9IChleHBlY3RlZFR5cGUsIGZpbGVTeW50YXgpID0+IHtcbiAgZm9yIChjb25zdCBwYXR0ZXJuIG9mIEdMT0JBTF9GSUxFX1JVTEVTW2V4cGVjdGVkVHlwZV0uYWxsb3dlZF9maWxlX3N5bnRheGVzIHx8IFtdKSB7XG4gICAgaWYgKGZpbGVTeW50YXgudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhwYXR0ZXJuKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc0NTUyA9ICgpID0+IHtcbiAgLy8gSWYgZmlsZSB1bnNhdmVkLCB0aGVyZSdzIG5vIGdvb2Qgd2F5IHRvIGRldGVybWluZSB3aGV0aGVyIG9yIG5vdCBpdCdzXG4gIC8vIENTUyBiYXNlZCBvbiB0aGUgZmlsZSBjb250ZW50cywgc28ganVzdCBiYWlsLlxuICBpZiAoT1JJR0lOQUxfRklMRV9QQVRIID09PSAnPycpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKGlzRGlzYWxsb3dlZEZpbGVQYXR0ZXJuKCdjc3MnLCBPUklHSU5BTF9GSUxFX1BBVEgpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbnN0IGFsbG93ZWRFeHRlbnNpb24gPSBoYXNBbGxvd2VkRmlsZUV4dGVuc2lvbignY3NzJywgT1JJR0lOQUxfRklMRV9QQVRIKTtcbiAgaWYgKEVESVRPUl9GSUxFX1NZTlRBWCA9PT0gJz8nKSB7XG4gICAgcmV0dXJuIGFsbG93ZWRFeHRlbnNpb247XG4gIH1cbiAgY29uc3QgYWxsb3dlZFN5bnRheCA9IGhhc0FsbG93ZWRGaWxlU3ludGF4KCdjc3MnLCBFRElUT1JfRklMRV9TWU5UQVgpO1xuICByZXR1cm4gYWxsb3dlZFN5bnRheCB8fCBhbGxvd2VkRXh0ZW5zaW9uO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzSFRNTCA9IChidWZmZXJDb250ZW50cykgPT4ge1xuICAvLyBJZiBmaWxlIHVuc2F2ZWQsIGNoZWNrIGlmIGZpcnN0IG5vbi13aGl0ZXNwYWNlIGNoYXJhY3RlciBpcyAmbHQ7XG4gIGlmIChPUklHSU5BTF9GSUxFX1BBVEggPT09ICc/Jykge1xuICAgIHJldHVybiBidWZmZXJDb250ZW50cy5tYXRjaCgvXlxccyo8Lyk7XG4gIH1cbiAgaWYgKGlzRGlzYWxsb3dlZEZpbGVQYXR0ZXJuKCdodG1sJywgT1JJR0lOQUxfRklMRV9QQVRIKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBjb25zdCBhbGxvd2VkRXh0ZW5zaW9uID0gaGFzQWxsb3dlZEZpbGVFeHRlbnNpb24oJ2h0bWwnLCBPUklHSU5BTF9GSUxFX1BBVEgpO1xuICBpZiAoRURJVE9SX0ZJTEVfU1lOVEFYID09PSAnPycpIHtcbiAgICByZXR1cm4gYWxsb3dlZEV4dGVuc2lvbjtcbiAgfVxuICBjb25zdCBhbGxvd2VkU3ludGF4ID0gaGFzQWxsb3dlZEZpbGVTeW50YXgoJ2h0bWwnLCBFRElUT1JfRklMRV9TWU5UQVgpO1xuICByZXR1cm4gYWxsb3dlZFN5bnRheCB8fCBhbGxvd2VkRXh0ZW5zaW9uO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzSlNPTiA9ICgpID0+IHtcbiAgLy8gSWYgZmlsZSB1bnNhdmVkLCB0aGVyZSdzIG5vIGdvb2Qgd2F5IHRvIGRldGVybWluZSB3aGV0aGVyIG9yIG5vdCBpdCdzXG4gIC8vIEpTT04gYmFzZWQgb24gdGhlIGZpbGUgY29udGVudHMsIHNvIGp1c3QgYmFpbC5cbiAgaWYgKE9SSUdJTkFMX0ZJTEVfUEFUSCA9PT0gJz8nKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChpc0Rpc2FsbG93ZWRGaWxlUGF0dGVybignanNvbicsIE9SSUdJTkFMX0ZJTEVfUEFUSCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3QgYWxsb3dlZEV4dGVuc2lvbiA9IGhhc0FsbG93ZWRGaWxlRXh0ZW5zaW9uKCdqc29uJywgT1JJR0lOQUxfRklMRV9QQVRIKTtcbiAgaWYgKEVESVRPUl9GSUxFX1NZTlRBWCA9PT0gJz8nKSB7XG4gICAgcmV0dXJuIGFsbG93ZWRFeHRlbnNpb247XG4gIH1cbiAgY29uc3QgYWxsb3dlZFN5bnRheCA9IGhhc0FsbG93ZWRGaWxlU3ludGF4KCdqc29uJywgRURJVE9SX0ZJTEVfU1lOVEFYKTtcbiAgcmV0dXJuIGFsbG93ZWRTeW50YXggfHwgYWxsb3dlZEV4dGVuc2lvbjtcbn07XG5cbmV4cG9ydCBjb25zdCBpc0pTID0gKGJ1ZmZlckNvbnRlbnRzKSA9PiB7XG4gIC8vIElmIGZpbGUgdW5zYXZlZCwgY2hlY2sgaWYgZmlyc3Qgbm9uLXdoaXRlc3BhY2UgY2hhcmFjdGVyIGlzIE5PVCAmbHQ7XG4gIGlmIChPUklHSU5BTF9GSUxFX1BBVEggPT09ICc/Jykge1xuICAgIHJldHVybiAhYnVmZmVyQ29udGVudHMubWF0Y2goL15cXHMqPC8pO1xuICB9XG4gIGlmIChpc0Rpc2FsbG93ZWRGaWxlUGF0dGVybignanMnLCBPUklHSU5BTF9GSUxFX1BBVEgpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbnN0IGFsbG93ZWRFeHRlbnNpb24gPSBoYXNBbGxvd2VkRmlsZUV4dGVuc2lvbignanMnLCBPUklHSU5BTF9GSUxFX1BBVEgpO1xuICBpZiAoRURJVE9SX0ZJTEVfU1lOVEFYID09PSAnPycpIHtcbiAgICByZXR1cm4gYWxsb3dlZEV4dGVuc2lvbjtcbiAgfVxuICBjb25zdCBhbGxvd2VkU3ludGF4ID0gaGFzQWxsb3dlZEZpbGVTeW50YXgoJ2pzJywgRURJVE9SX0ZJTEVfU1lOVEFYKTtcbiAgcmV0dXJuIGFsbG93ZWRTeW50YXggfHwgYWxsb3dlZEV4dGVuc2lvbjtcbn07XG5cbi8vIENoZWNrcyBpZiBhIGZpbGUgcGF0aCBtYXRjaGVzIGEgcGFydGljdWxhciBnbG9iIHN0cmluZy5cbmV4cG9ydCBjb25zdCBpc01hdGNoaW5nR2xvYiA9IChnbG9iU3RyaW5nKSA9PiB7XG4gIC8vIElmIGZpbGUgdW5zYXZlZCwgcmVqZWN0IGdsb2JsIG1hdGNoaW5nO1xuICBpZiAoT1JJR0lOQUxfRklMRV9QQVRIID09PSAnPycpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIG1pbmltYXRjaChPUklHSU5BTF9GSUxFX1BBVEgsIGdsb2JTdHJpbmcpIHx8IG1pbmltYXRjaChiYXNlbmFtZShPUklHSU5BTF9GSUxFX1BBVEgpLCBnbG9iU3RyaW5nKTtcbn07XG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
