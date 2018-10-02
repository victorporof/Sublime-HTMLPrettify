"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMatchingGlob = exports.isJS = exports.isJSON = exports.isHTML = exports.isCSS = void 0;

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.regexp.constructor");

require("core-js/modules/es6.regexp.match");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

var _path = require("path");

var _minimatch = _interopRequireDefault(require("minimatch"));

var _constants = require("./constants");

var _jsonUtils = require("./jsonUtils");

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
var GLOBAL_FILE_RULES = (0, _jsonUtils.parseJSON5)(_constants.GLOBAL_FILE_RULES_JSON); // Checks if a file path is allowed by regexing the file name and expecting
// it not to match certain expressions.

var hasDisallowedFilePathPattern = function hasDisallowedFilePathPattern(fileType, filePath) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = ((GLOBAL_FILE_RULES[fileType] || {}).disallowed_file_patterns || [])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return false;
}; // Checks if a file is of a particular type by regexing the file name and
// expecting a certain extension.


var hasAllowedFileExtension = function hasAllowedFileExtension(expectedType, filePath) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = ((GLOBAL_FILE_RULES[expectedType] || {}).allowed_file_extensions || [])[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var extension = _step2.value;

      if (filePath.match(new RegExp("\\.".concat(extension, "$"), 'i'))) {
        return true;
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return false;
}; // Checks if a file is of a particular type by regexing the syntax name and
// expecting a pattern.


var hasAllowedFileSyntax = function hasAllowedFileSyntax(expectedType, fileSyntax) {
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = ((GLOBAL_FILE_RULES[expectedType] || {}).allowed_file_syntaxes || [])[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
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
      if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
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

var isCSS = function isCSS() {
  var isSavedFile = _constants.ORIGINAL_FILE_PATH !== '?';
  var useEditorFileSyntaxForDeterminingFileType = _constants.EDITOR_FILE_SYNTAX !== '?';
  var isAllowedExtension = hasAllowedFileExtension('css', _constants.ORIGINAL_FILE_PATH);
  var isAllowedSyntax = hasAllowedFileSyntax('css', _constants.EDITOR_FILE_SYNTAX);
  var isDisallowedFilePattern = hasDisallowedFilePathPattern('css', _constants.ORIGINAL_FILE_PATH);

  if (!isSavedFile) {
    return useEditorFileSyntaxForDeterminingFileType ? isAllowedSyntax : false;
  }

  if (isDisallowedFilePattern) {
    return false;
  }

  return useEditorFileSyntaxForDeterminingFileType ? isAllowedSyntax || isAllowedExtension : isAllowedExtension;
};

exports.isCSS = isCSS;

var isHTML = function isHTML(bufferContents) {
  var isSavedFile = _constants.ORIGINAL_FILE_PATH !== '?';
  var useEditorFileSyntaxForDeterminingFileType = _constants.EDITOR_FILE_SYNTAX !== '?';
  var isAllowedExtension = hasAllowedFileExtension('html', _constants.ORIGINAL_FILE_PATH);
  var isAllowedSyntax = hasAllowedFileSyntax('html', _constants.EDITOR_FILE_SYNTAX);
  var isDisallowedFilePattern = hasDisallowedFilePathPattern('html', _constants.ORIGINAL_FILE_PATH);
  var isMaybeHtml = bufferContents.match(/^\s*</);

  if (!isSavedFile) {
    return useEditorFileSyntaxForDeterminingFileType ? isAllowedSyntax || isMaybeHtml : isMaybeHtml;
  }

  if (isDisallowedFilePattern) {
    return false;
  }

  return useEditorFileSyntaxForDeterminingFileType ? isAllowedSyntax || isAllowedExtension : isAllowedExtension;
};

exports.isHTML = isHTML;

var isJSON = function isJSON(bufferContents) {
  var isSavedFile = _constants.ORIGINAL_FILE_PATH !== '?';
  var useEditorFileSyntaxForDeterminingFileType = _constants.EDITOR_FILE_SYNTAX !== '?';
  var isAllowedExtension = hasAllowedFileExtension('json', _constants.ORIGINAL_FILE_PATH);
  var isAllowedSyntax = hasAllowedFileSyntax('json', _constants.EDITOR_FILE_SYNTAX);
  var isDisallowedFilePattern = hasDisallowedFilePathPattern('json', _constants.ORIGINAL_FILE_PATH);
  var isMaybeJson = bufferContents.match(/^\s*[{[]/);

  if (!isSavedFile) {
    return useEditorFileSyntaxForDeterminingFileType ? isAllowedSyntax || isMaybeJson : isMaybeJson;
  }

  if (isDisallowedFilePattern) {
    return false;
  }

  return useEditorFileSyntaxForDeterminingFileType ? isAllowedSyntax || isAllowedExtension : isAllowedExtension;
};

exports.isJSON = isJSON;

var isJS = function isJS(bufferContents) {
  var isSavedFile = _constants.ORIGINAL_FILE_PATH !== '?';
  var useEditorFileSyntaxForDeterminingFileType = _constants.EDITOR_FILE_SYNTAX !== '?';
  var isAllowedExtension = hasAllowedFileExtension('js', _constants.ORIGINAL_FILE_PATH);
  var isAllowedSyntax = hasAllowedFileSyntax('js', _constants.EDITOR_FILE_SYNTAX);
  var isDisallowedFilePattern = hasDisallowedFilePathPattern('js', _constants.ORIGINAL_FILE_PATH);
  var isMaybeJs = !bufferContents.match(/^\s*</);

  if (!isSavedFile) {
    return useEditorFileSyntaxForDeterminingFileType ? isAllowedSyntax || isMaybeJs : isMaybeJs;
  }

  if (isDisallowedFilePattern) {
    return false;
  }

  return useEditorFileSyntaxForDeterminingFileType ? isAllowedSyntax || isAllowedExtension : isAllowedExtension;
}; // Checks if a file path matches a particular glob string.


exports.isJS = isJS;

var isMatchingGlob = function isMatchingGlob(globString) {
  // If file unsaved, reject glob matching;
  if (_constants.ORIGINAL_FILE_PATH === '?') {
    return false;
  }

  return (0, _minimatch.default)(_constants.ORIGINAL_FILE_PATH, globString) || (0, _minimatch.default)((0, _path.basename)(_constants.ORIGINAL_FILE_PATH), globString);
};

exports.isMatchingGlob = isMatchingGlob;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL2ZpbGVVdGlscy5qcyJdLCJuYW1lcyI6WyJHTE9CQUxfRklMRV9SVUxFUyIsIkdMT0JBTF9GSUxFX1JVTEVTX0pTT04iLCJoYXNEaXNhbGxvd2VkRmlsZVBhdGhQYXR0ZXJuIiwiZmlsZVR5cGUiLCJmaWxlUGF0aCIsImRpc2FsbG93ZWRfZmlsZV9wYXR0ZXJucyIsInBhdHRlcm4iLCJtYXRjaCIsIlJlZ0V4cCIsImhhc0FsbG93ZWRGaWxlRXh0ZW5zaW9uIiwiZXhwZWN0ZWRUeXBlIiwiYWxsb3dlZF9maWxlX2V4dGVuc2lvbnMiLCJleHRlbnNpb24iLCJoYXNBbGxvd2VkRmlsZVN5bnRheCIsImZpbGVTeW50YXgiLCJhbGxvd2VkX2ZpbGVfc3ludGF4ZXMiLCJ0b0xvd2VyQ2FzZSIsImluY2x1ZGVzIiwiaXNDU1MiLCJpc1NhdmVkRmlsZSIsIk9SSUdJTkFMX0ZJTEVfUEFUSCIsInVzZUVkaXRvckZpbGVTeW50YXhGb3JEZXRlcm1pbmluZ0ZpbGVUeXBlIiwiRURJVE9SX0ZJTEVfU1lOVEFYIiwiaXNBbGxvd2VkRXh0ZW5zaW9uIiwiaXNBbGxvd2VkU3ludGF4IiwiaXNEaXNhbGxvd2VkRmlsZVBhdHRlcm4iLCJpc0hUTUwiLCJidWZmZXJDb250ZW50cyIsImlzTWF5YmVIdG1sIiwiaXNKU09OIiwiaXNNYXliZUpzb24iLCJpc0pTIiwiaXNNYXliZUpzIiwiaXNNYXRjaGluZ0dsb2IiLCJnbG9iU3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBOztBQUVBOztBQUVBOztBQUNBOztBQVRBOzs7QUFXQSxJQUFNQSxpQkFBaUIsR0FBRywyQkFBV0MsaUNBQVgsQ0FBMUIsQyxDQUVBO0FBQ0E7O0FBQ0EsSUFBTUMsNEJBQTRCLEdBQUcsU0FBL0JBLDRCQUErQixDQUFDQyxRQUFELEVBQVdDLFFBQVgsRUFBd0I7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDM0QsMEJBQXNCLENBQUNKLGlCQUFpQixDQUFDRyxRQUFE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QU1RLElBQUksR0FBRyxTQUFQQSxJQUFPLENBQUNKLGNBQUQsRUFBb0I7QUFDdEMsTUFBTVIsV0FBVyxHQUFHQyxrQ0FBdUIsR0FBM0M7QUFDQSxNQUFNQyx5Q0FBeUMsR0FBR0Msa0NBQXVCLEdBQXpFO0FBRUEsTUFBTUMsa0JBQWtCLEdBQUdkLHVCQUF1QixDQUFDLElBQUQsRUFBT1csNkJBQVAsQ0FBbEQ7QUFDQSxNQUFNSSxlQUFlLEdBQUdYLG9CQUFvQixDQUFDLElBQUQsRUFBT1MsNkJBQVAsQ0FBNUM7QUFDQSxNQUFNRyx1QkFBdUIsR0FBR3ZCLDRCQUE0QixDQUFDLElBQUQsRUFBT2tCLDZCQUFQLENBQTVEO0FBQ0EsTUFBTVksU0FBUyxHQUFHLENBQUNMLGNBQWMsQ0FBQ3BCLEtBQWYsQ0FBcUIsT0FBckIsQ0FBbkI7O0FBRUEsTUFBSSxDQUFDWSxXQUFMLEVBQWtCO0FBQ2hCLFdBQU9FLHlDQUF5QyxHQUM1Q0csZUFBZSxJQUFJUSxTQUR5QixHQUU1Q0EsU0FGSjtBQUdEOztBQUVELE1BQUlQLHVCQUFKLEVBQTZCO0FBQzNCLFdBQU8sS0FBUDtBQUNEOztBQUVELFNBQU9KLHlDQUF5QyxHQUM1Q0csZUFBZSxJQUFJRCxrQkFEeUIsR0FFNUNBLGtCQUZKO0FBR0QsQ0F0Qk0sQyxDQXdCUDs7Ozs7QUFDTyxJQUFNVSxjQUFjLEdBQUcsU0FBakJBLGNBQWlCLENBQUNDLFVBQUQsRUFBZ0I7QUFDNUM7QUFDQSxNQUFJZCxrQ0FBdUIsR0FBM0IsRUFBZ0M7QUFDOUIsV0FBTyxLQUFQO0FBQ0Q7O0FBQ0QsU0FDRSx3QkFBVUEsNkJBQVYsRUFBOEJjLFVBQTlCLEtBQ0csd0JBQVUsb0JBQVNkLDZCQUFULENBQVYsRUFBd0NjLFVBQXhDLENBRkw7QUFJRCxDQVRNIiwic291cmNlc0NvbnRlbnQiOlsiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy4gKi9cblxuaW1wb3J0IHsgYmFzZW5hbWUgfSBmcm9tICdwYXRoJztcblxuaW1wb3J0IG1pbmltYXRjaCBmcm9tICdtaW5pbWF0Y2gnO1xuXG5pbXBvcnQgeyBHTE9CQUxfRklMRV9SVUxFU19KU09OLCBPUklHSU5BTF9GSUxFX1BBVEgsIEVESVRPUl9GSUxFX1NZTlRBWCB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IHBhcnNlSlNPTjUgfSBmcm9tICcuL2pzb25VdGlscyc7XG5cbmNvbnN0IEdMT0JBTF9GSUxFX1JVTEVTID0gcGFyc2VKU09ONShHTE9CQUxfRklMRV9SVUxFU19KU09OKTtcblxuLy8gQ2hlY2tzIGlmIGEgZmlsZSBwYXRoIGlzIGFsbG93ZWQgYnkgcmVnZXhpbmcgdGhlIGZpbGUgbmFtZSBhbmQgZXhwZWN0aW5nXG4vLyBpdCBub3QgdG8gbWF0Y2ggY2VydGFpbiBleHByZXNzaW9ucy5cbmNvbnN0IGhhc0Rpc2FsbG93ZWRGaWxlUGF0aFBhdHRlcm4gPSAoZmlsZVR5cGUsIGZpbGVQYXRoKSA9PiB7XG4gIGZvciAoY29uc3QgcGF0dGVybiBvZiAoR0xPQkFMX0ZJTEVfUlVMRVNbZmlsZVR5cGVdIHx8IHt9KS5kaXNhbGxvd2VkX2ZpbGVfcGF0dGVybnMgfHwgW10pIHtcbiAgICBpZiAoZmlsZVBhdGgubWF0Y2gobmV3IFJlZ0V4cChwYXR0ZXJuLCAnaScpKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbi8vIENoZWNrcyBpZiBhIGZpbGUgaXMgb2YgYSBwYXJ0aWN1bGFyIHR5cGUgYnkgcmVnZXhpbmcgdGhlIGZpbGUgbmFtZSBhbmRcbi8vIGV4cGVjdGluZyBhIGNlcnRhaW4gZXh0ZW5zaW9uLlxuY29uc3QgaGFzQWxsb3dlZEZpbGVFeHRlbnNpb24gPSAoZXhwZWN0ZWRUeXBlLCBmaWxlUGF0aCkgPT4ge1xuICBmb3IgKGNvbnN0IGV4dGVuc2lvbiBvZiAoR0xPQkFMX0ZJTEVfUlVMRVNbZXhwZWN0ZWRUeXBlXSB8fCB7fSkuYWxsb3dlZF9maWxlX2V4dGVuc2lvbnMgfHwgW10pIHtcbiAgICBpZiAoZmlsZVBhdGgubWF0Y2gobmV3IFJlZ0V4cChgXFxcXC4ke2V4dGVuc2lvbn0kYCwgJ2knKSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG4vLyBDaGVja3MgaWYgYSBmaWxlIGlzIG9mIGEgcGFydGljdWxhciB0eXBlIGJ5IHJlZ2V4aW5nIHRoZSBzeW50YXggbmFtZSBhbmRcbi8vIGV4cGVjdGluZyBhIHBhdHRlcm4uXG5jb25zdCBoYXNBbGxvd2VkRmlsZVN5bnRheCA9IChleHBlY3RlZFR5cGUsIGZpbGVTeW50YXgpID0+IHtcbiAgZm9yIChjb25zdCBwYXR0ZXJuIG9mIChHTE9CQUxfRklMRV9SVUxFU1tleHBlY3RlZFR5cGVdIHx8IHt9KS5hbGxvd2VkX2ZpbGVfc3ludGF4ZXMgfHwgW10pIHtcbiAgICBpZiAoZmlsZVN5bnRheC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHBhdHRlcm4pKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzQ1NTID0gKCkgPT4ge1xuICBjb25zdCBpc1NhdmVkRmlsZSA9IE9SSUdJTkFMX0ZJTEVfUEFUSCAhPT0gJz8nO1xuICBjb25zdCB1c2VFZGl0b3JGaWxlU3ludGF4Rm9yRGV0ZXJtaW5pbmdGaWxlVHlwZSA9IEVESVRPUl9GSUxFX1NZTlRBWCAhPT0gJz8nO1xuXG4gIGNvbnN0IGlzQWxsb3dlZEV4dGVuc2lvbiA9IGhhc0FsbG93ZWRGaWxlRXh0ZW5zaW9uKCdjc3MnLCBPUklHSU5BTF9GSUxFX1BBVEgpO1xuICBjb25zdCBpc0FsbG93ZWRTeW50YXggPSBoYXNBbGxvd2VkRmlsZVN5bnRheCgnY3NzJywgRURJVE9SX0ZJTEVfU1lOVEFYKTtcbiAgY29uc3QgaXNEaXNhbGxvd2VkRmlsZVBhdHRlcm4gPSBoYXNEaXNhbGxvd2VkRmlsZVBhdGhQYXR0ZXJuKCdjc3MnLCBPUklHSU5BTF9GSUxFX1BBVEgpO1xuXG4gIGlmICghaXNTYXZlZEZpbGUpIHtcbiAgICByZXR1cm4gdXNlRWRpdG9yRmlsZVN5bnRheEZvckRldGVybWluaW5nRmlsZVR5cGVcbiAgICAgID8gaXNBbGxvd2VkU3ludGF4XG4gICAgICA6IGZhbHNlO1xuICB9XG5cbiAgaWYgKGlzRGlzYWxsb3dlZEZpbGVQYXR0ZXJuKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHVzZUVkaXRvckZpbGVTeW50YXhGb3JEZXRlcm1pbmluZ0ZpbGVUeXBlXG4gICAgPyBpc0FsbG93ZWRTeW50YXggfHwgaXNBbGxvd2VkRXh0ZW5zaW9uXG4gICAgOiBpc0FsbG93ZWRFeHRlbnNpb247XG59O1xuXG5leHBvcnQgY29uc3QgaXNIVE1MID0gKGJ1ZmZlckNvbnRlbnRzKSA9PiB7XG4gIGNvbnN0IGlzU2F2ZWRGaWxlID0gT1JJR0lOQUxfRklMRV9QQVRIICE9PSAnPyc7XG4gIGNvbnN0IHVzZUVkaXRvckZpbGVTeW50YXhGb3JEZXRlcm1pbmluZ0ZpbGVUeXBlID0gRURJVE9SX0ZJTEVfU1lOVEFYICE9PSAnPyc7XG5cbiAgY29uc3QgaXNBbGxvd2VkRXh0ZW5zaW9uID0gaGFzQWxsb3dlZEZpbGVFeHRlbnNpb24oJ2h0bWwnLCBPUklHSU5BTF9GSUxFX1BBVEgpO1xuICBjb25zdCBpc0FsbG93ZWRTeW50YXggPSBoYXNBbGxvd2VkRmlsZVN5bnRheCgnaHRtbCcsIEVESVRPUl9GSUxFX1NZTlRBWCk7XG4gIGNvbnN0IGlzRGlzYWxsb3dlZEZpbGVQYXR0ZXJuID0gaGFzRGlzYWxsb3dlZEZpbGVQYXRoUGF0dGVybignaHRtbCcsIE9SSUdJTkFMX0ZJTEVfUEFUSCk7XG4gIGNvbnN0IGlzTWF5YmVIdG1sID0gYnVmZmVyQ29udGVudHMubWF0Y2goL15cXHMqPC8pO1xuXG4gIGlmICghaXNTYXZlZEZpbGUpIHtcbiAgICByZXR1cm4gdXNlRWRpdG9yRmlsZVN5bnRheEZvckRldGVybWluaW5nRmlsZVR5cGVcbiAgICAgID8gaXNBbGxvd2VkU3ludGF4IHx8IGlzTWF5YmVIdG1sXG4gICAgICA6IGlzTWF5YmVIdG1sO1xuICB9XG5cbiAgaWYgKGlzRGlzYWxsb3dlZEZpbGVQYXR0ZXJuKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHVzZUVkaXRvckZpbGVTeW50YXhGb3JEZXRlcm1pbmluZ0ZpbGVUeXBlXG4gICAgPyBpc0FsbG93ZWRTeW50YXggfHwgaXNBbGxvd2VkRXh0ZW5zaW9uXG4gICAgOiBpc0FsbG93ZWRFeHRlbnNpb247XG59O1xuXG5leHBvcnQgY29uc3QgaXNKU09OID0gKGJ1ZmZlckNvbnRlbnRzKSA9PiB7XG4gIGNvbnN0IGlzU2F2ZWRGaWxlID0gT1JJR0lOQUxfRklMRV9QQVRIICE9PSAnPyc7XG4gIGNvbnN0IHVzZUVkaXRvckZpbGVTeW50YXhGb3JEZXRlcm1pbmluZ0ZpbGVUeXBlID0gRURJVE9SX0ZJTEVfU1lOVEFYICE9PSAnPyc7XG5cbiAgY29uc3QgaXNBbGxvd2VkRXh0ZW5zaW9uID0gaGFzQWxsb3dlZEZpbGVFeHRlbnNpb24oJ2pzb24nLCBPUklHSU5BTF9GSUxFX1BBVEgpO1xuICBjb25zdCBpc0FsbG93ZWRTeW50YXggPSBoYXNBbGxvd2VkRmlsZVN5bnRheCgnanNvbicsIEVESVRPUl9GSUxFX1NZTlRBWCk7XG4gIGNvbnN0IGlzRGlzYWxsb3dlZEZpbGVQYXR0ZXJuID0gaGFzRGlzYWxsb3dlZEZpbGVQYXRoUGF0dGVybignanNvbicsIE9SSUdJTkFMX0ZJTEVfUEFUSCk7XG4gIGNvbnN0IGlzTWF5YmVKc29uID0gYnVmZmVyQ29udGVudHMubWF0Y2goL15cXHMqW3tbXS8pO1xuXG4gIGlmICghaXNTYXZlZEZpbGUpIHtcbiAgICByZXR1cm4gdXNlRWRpdG9yRmlsZVN5bnRheEZvckRldGVybWluaW5nRmlsZVR5cGVcbiAgICAgID8gaXNBbGxvd2VkU3ludGF4IHx8IGlzTWF5YmVKc29uXG4gICAgICA6IGlzTWF5YmVKc29uO1xuICB9XG5cbiAgaWYgKGlzRGlzYWxsb3dlZEZpbGVQYXR0ZXJuKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHVzZUVkaXRvckZpbGVTeW50YXhGb3JEZXRlcm1pbmluZ0ZpbGVUeXBlXG4gICAgPyBpc0FsbG93ZWRTeW50YXggfHwgaXNBbGxvd2VkRXh0ZW5zaW9uXG4gICAgOiBpc0FsbG93ZWRFeHRlbnNpb247XG59O1xuXG5leHBvcnQgY29uc3QgaXNKUyA9IChidWZmZXJDb250ZW50cykgPT4ge1xuICBjb25zdCBpc1NhdmVkRmlsZSA9IE9SSUdJTkFMX0ZJTEVfUEFUSCAhPT0gJz8nO1xuICBjb25zdCB1c2VFZGl0b3JGaWxlU3ludGF4Rm9yRGV0ZXJtaW5pbmdGaWxlVHlwZSA9IEVESVRPUl9GSUxFX1NZTlRBWCAhPT0gJz8nO1xuXG4gIGNvbnN0IGlzQWxsb3dlZEV4dGVuc2lvbiA9IGhhc0FsbG93ZWRGaWxlRXh0ZW5zaW9uKCdqcycsIE9SSUdJTkFMX0ZJTEVfUEFUSCk7XG4gIGNvbnN0IGlzQWxsb3dlZFN5bnRheCA9IGhhc0FsbG93ZWRGaWxlU3ludGF4KCdqcycsIEVESVRPUl9GSUxFX1NZTlRBWCk7XG4gIGNvbnN0IGlzRGlzYWxsb3dlZEZpbGVQYXR0ZXJuID0gaGFzRGlzYWxsb3dlZEZpbGVQYXRoUGF0dGVybignanMnLCBPUklHSU5BTF9GSUxFX1BBVEgpO1xuICBjb25zdCBpc01heWJlSnMgPSAhYnVmZmVyQ29udGVudHMubWF0Y2goL15cXHMqPC8pO1xuXG4gIGlmICghaXNTYXZlZEZpbGUpIHtcbiAgICByZXR1cm4gdXNlRWRpdG9yRmlsZVN5bnRheEZvckRldGVybWluaW5nRmlsZVR5cGVcbiAgICAgID8gaXNBbGxvd2VkU3ludGF4IHx8IGlzTWF5YmVKc1xuICAgICAgOiBpc01heWJlSnM7XG4gIH1cblxuICBpZiAoaXNEaXNhbGxvd2VkRmlsZVBhdHRlcm4pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdXNlRWRpdG9yRmlsZVN5bnRheEZvckRldGVybWluaW5nRmlsZVR5cGVcbiAgICA/IGlzQWxsb3dlZFN5bnRheCB8fCBpc0FsbG93ZWRFeHRlbnNpb25cbiAgICA6IGlzQWxsb3dlZEV4dGVuc2lvbjtcbn07XG5cbi8vIENoZWNrcyBpZiBhIGZpbGUgcGF0aCBtYXRjaGVzIGEgcGFydGljdWxhciBnbG9iIHN0cmluZy5cbmV4cG9ydCBjb25zdCBpc01hdGNoaW5nR2xvYiA9IChnbG9iU3RyaW5nKSA9PiB7XG4gIC8vIElmIGZpbGUgdW5zYXZlZCwgcmVqZWN0IGdsb2IgbWF0Y2hpbmc7XG4gIGlmIChPUklHSU5BTF9GSUxFX1BBVEggPT09ICc/Jykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gKFxuICAgIG1pbmltYXRjaChPUklHSU5BTF9GSUxFX1BBVEgsIGdsb2JTdHJpbmcpXG4gICAgfHwgbWluaW1hdGNoKGJhc2VuYW1lKE9SSUdJTkFMX0ZJTEVfUEFUSCksIGdsb2JTdHJpbmcpXG4gICk7XG59O1xuIl0sImZpbGUiOiJ1dGlscy9maWxlVXRpbHMuanMifQ==
