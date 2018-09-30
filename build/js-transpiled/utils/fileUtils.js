"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMatchingGlob = exports.isJS = exports.isJSON = exports.isHTML = exports.isCSS = void 0;

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL2ZpbGVVdGlscy5qcyJdLCJuYW1lcyI6WyJHTE9CQUxfRklMRV9SVUxFUyIsIkdMT0JBTF9GSUxFX1JVTEVTX0pTT04iLCJoYXNEaXNhbGxvd2VkRmlsZVBhdGhQYXR0ZXJuIiwiZmlsZVR5cGUiLCJmaWxlUGF0aCIsImRpc2FsbG93ZWRfZmlsZV9wYXR0ZXJucyIsInBhdHRlcm4iLCJtYXRjaCIsIlJlZ0V4cCIsImhhc0FsbG93ZWRGaWxlRXh0ZW5zaW9uIiwiZXhwZWN0ZWRUeXBlIiwiYWxsb3dlZF9maWxlX2V4dGVuc2lvbnMiLCJleHRlbnNpb24iLCJoYXNBbGxvd2VkRmlsZVN5bnRheCIsImZpbGVTeW50YXgiLCJhbGxvd2VkX2ZpbGVfc3ludGF4ZXMiLCJ0b0xvd2VyQ2FzZSIsImluY2x1ZGVzIiwiaXNDU1MiLCJpc1NhdmVkRmlsZSIsIk9SSUdJTkFMX0ZJTEVfUEFUSCIsInVzZUVkaXRvckZpbGVTeW50YXhGb3JEZXRlcm1pbmluZ0ZpbGVUeXBlIiwiRURJVE9SX0ZJTEVfU1lOVEFYIiwiaXNBbGxvd2VkRXh0ZW5zaW9uIiwiaXNBbGxvd2VkU3ludGF4IiwiaXNEaXNhbGxvd2VkRmlsZVBhdHRlcm4iLCJpc0hUTUwiLCJidWZmZXJDb250ZW50cyIsImlzTWF5YmVIdG1sIiwiaXNKU09OIiwiaXNNYXliZUpzb24iLCJpc0pTIiwiaXNNYXliZUpzIiwiaXNNYXRjaGluZ0dsb2IiLCJnbG9iU3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFJQTs7QUFFQTs7QUFFQTs7QUFDQTs7QUFUQTs7O0FBV0EsSUFBTUEsaUJBQWlCLEdBQUcsMkJBQVdDLGlDQUFYLENBQTFCLEMsQ0FFQTtBQUNBOztBQUNBLElBQU1DLDRCQUE0QixHQUFHLFNBQS9CQSw0QkFBK0IsQ0FBQ0MsUUFBRCxFQUFXQyxRQUFYLEVBQXdCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQzNELDBCQUFzQixDQUFDSixpQkFBaUIsQ0FBQ0csUUFBRCxDQUFqQixJQUErQixF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U0FBUEEsSUFBTyxDQUFDSixjQUFELEVBQW9CO0FBQ3RDLE1BQU1SLFdBQVcsR0FBR0Msa0NBQXVCLEdBQTNDO0FBQ0EsTUFBTUMseUNBQXlDLEdBQUdDLGtDQUF1QixHQUF6RTtBQUVBLE1BQU1DLGtCQUFrQixHQUFHZCx1QkFBdUIsQ0FBQyxJQUFELEVBQU9XLDZCQUFQLENBQWxEO0FBQ0EsTUFBTUksZUFBZSxHQUFHWCxvQkFBb0IsQ0FBQyxJQUFELEVBQU9TLDZCQUFQLENBQTVDO0FBQ0EsTUFBTUcsdUJBQXVCLEdBQUd2Qiw0QkFBNEIsQ0FBQyxJQUFELEVBQU9rQiw2QkFBUCxDQUE1RDtBQUNBLE1BQU1ZLFNBQVMsR0FBRyxDQUFDTCxjQUFjLENBQUNwQixLQUFmLENBQXFCLE9BQXJCLENBQW5COztBQUVBLE1BQUksQ0FBQ1ksV0FBTCxFQUFrQjtBQUNoQixXQUFPRSx5Q0FBeUMsR0FDNUNHLGVBQWUsSUFBSVEsU0FEeUIsR0FFNUNBLFNBRko7QUFHRDs7QUFFRCxNQUFJUCx1QkFBSixFQUE2QjtBQUMzQixXQUFPLEtBQVA7QUFDRDs7QUFFRCxTQUFPSix5Q0FBeUMsR0FDNUNHLGVBQWUsSUFBSUQsa0JBRHlCLEdBRTVDQSxrQkFGSjtBQUdELENBdEJNLEMsQ0F3QlA7Ozs7O0FBQ08sSUFBTVUsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixDQUFDQyxVQUFELEVBQWdCO0FBQzVDO0FBQ0EsTUFBSWQsa0NBQXVCLEdBQTNCLEVBQWdDO0FBQzlCLFdBQU8sS0FBUDtBQUNEOztBQUNELFNBQ0Usd0JBQVVBLDZCQUFWLEVBQThCYyxVQUE5QixLQUNHLHdCQUFVLG9CQUFTZCw2QkFBVCxDQUFWLEVBQXdDYyxVQUF4QyxDQUZMO0FBSUQsQ0FUTSIsInNvdXJjZXNDb250ZW50IjpbIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uICovXG5cbmltcG9ydCB7IGJhc2VuYW1lIH0gZnJvbSAncGF0aCc7XG5cbmltcG9ydCBtaW5pbWF0Y2ggZnJvbSAnbWluaW1hdGNoJztcblxuaW1wb3J0IHsgR0xPQkFMX0ZJTEVfUlVMRVNfSlNPTiwgT1JJR0lOQUxfRklMRV9QQVRILCBFRElUT1JfRklMRV9TWU5UQVggfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBwYXJzZUpTT041IH0gZnJvbSAnLi9qc29uVXRpbHMnO1xuXG5jb25zdCBHTE9CQUxfRklMRV9SVUxFUyA9IHBhcnNlSlNPTjUoR0xPQkFMX0ZJTEVfUlVMRVNfSlNPTik7XG5cbi8vIENoZWNrcyBpZiBhIGZpbGUgcGF0aCBpcyBhbGxvd2VkIGJ5IHJlZ2V4aW5nIHRoZSBmaWxlIG5hbWUgYW5kIGV4cGVjdGluZ1xuLy8gaXQgbm90IHRvIG1hdGNoIGNlcnRhaW4gZXhwcmVzc2lvbnMuXG5jb25zdCBoYXNEaXNhbGxvd2VkRmlsZVBhdGhQYXR0ZXJuID0gKGZpbGVUeXBlLCBmaWxlUGF0aCkgPT4ge1xuICBmb3IgKGNvbnN0IHBhdHRlcm4gb2YgKEdMT0JBTF9GSUxFX1JVTEVTW2ZpbGVUeXBlXSB8fCB7fSkuZGlzYWxsb3dlZF9maWxlX3BhdHRlcm5zIHx8IFtdKSB7XG4gICAgaWYgKGZpbGVQYXRoLm1hdGNoKG5ldyBSZWdFeHAocGF0dGVybiwgJ2knKSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG4vLyBDaGVja3MgaWYgYSBmaWxlIGlzIG9mIGEgcGFydGljdWxhciB0eXBlIGJ5IHJlZ2V4aW5nIHRoZSBmaWxlIG5hbWUgYW5kXG4vLyBleHBlY3RpbmcgYSBjZXJ0YWluIGV4dGVuc2lvbi5cbmNvbnN0IGhhc0FsbG93ZWRGaWxlRXh0ZW5zaW9uID0gKGV4cGVjdGVkVHlwZSwgZmlsZVBhdGgpID0+IHtcbiAgZm9yIChjb25zdCBleHRlbnNpb24gb2YgKEdMT0JBTF9GSUxFX1JVTEVTW2V4cGVjdGVkVHlwZV0gfHwge30pLmFsbG93ZWRfZmlsZV9leHRlbnNpb25zIHx8IFtdKSB7XG4gICAgaWYgKGZpbGVQYXRoLm1hdGNoKG5ldyBSZWdFeHAoYFxcXFwuJHtleHRlbnNpb259JGAsICdpJykpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuLy8gQ2hlY2tzIGlmIGEgZmlsZSBpcyBvZiBhIHBhcnRpY3VsYXIgdHlwZSBieSByZWdleGluZyB0aGUgc3ludGF4IG5hbWUgYW5kXG4vLyBleHBlY3RpbmcgYSBwYXR0ZXJuLlxuY29uc3QgaGFzQWxsb3dlZEZpbGVTeW50YXggPSAoZXhwZWN0ZWRUeXBlLCBmaWxlU3ludGF4KSA9PiB7XG4gIGZvciAoY29uc3QgcGF0dGVybiBvZiAoR0xPQkFMX0ZJTEVfUlVMRVNbZXhwZWN0ZWRUeXBlXSB8fCB7fSkuYWxsb3dlZF9maWxlX3N5bnRheGVzIHx8IFtdKSB7XG4gICAgaWYgKGZpbGVTeW50YXgudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhwYXR0ZXJuKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc0NTUyA9ICgpID0+IHtcbiAgY29uc3QgaXNTYXZlZEZpbGUgPSBPUklHSU5BTF9GSUxFX1BBVEggIT09ICc/JztcbiAgY29uc3QgdXNlRWRpdG9yRmlsZVN5bnRheEZvckRldGVybWluaW5nRmlsZVR5cGUgPSBFRElUT1JfRklMRV9TWU5UQVggIT09ICc/JztcblxuICBjb25zdCBpc0FsbG93ZWRFeHRlbnNpb24gPSBoYXNBbGxvd2VkRmlsZUV4dGVuc2lvbignY3NzJywgT1JJR0lOQUxfRklMRV9QQVRIKTtcbiAgY29uc3QgaXNBbGxvd2VkU3ludGF4ID0gaGFzQWxsb3dlZEZpbGVTeW50YXgoJ2NzcycsIEVESVRPUl9GSUxFX1NZTlRBWCk7XG4gIGNvbnN0IGlzRGlzYWxsb3dlZEZpbGVQYXR0ZXJuID0gaGFzRGlzYWxsb3dlZEZpbGVQYXRoUGF0dGVybignY3NzJywgT1JJR0lOQUxfRklMRV9QQVRIKTtcblxuICBpZiAoIWlzU2F2ZWRGaWxlKSB7XG4gICAgcmV0dXJuIHVzZUVkaXRvckZpbGVTeW50YXhGb3JEZXRlcm1pbmluZ0ZpbGVUeXBlXG4gICAgICA/IGlzQWxsb3dlZFN5bnRheFxuICAgICAgOiBmYWxzZTtcbiAgfVxuXG4gIGlmIChpc0Rpc2FsbG93ZWRGaWxlUGF0dGVybikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB1c2VFZGl0b3JGaWxlU3ludGF4Rm9yRGV0ZXJtaW5pbmdGaWxlVHlwZVxuICAgID8gaXNBbGxvd2VkU3ludGF4IHx8IGlzQWxsb3dlZEV4dGVuc2lvblxuICAgIDogaXNBbGxvd2VkRXh0ZW5zaW9uO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzSFRNTCA9IChidWZmZXJDb250ZW50cykgPT4ge1xuICBjb25zdCBpc1NhdmVkRmlsZSA9IE9SSUdJTkFMX0ZJTEVfUEFUSCAhPT0gJz8nO1xuICBjb25zdCB1c2VFZGl0b3JGaWxlU3ludGF4Rm9yRGV0ZXJtaW5pbmdGaWxlVHlwZSA9IEVESVRPUl9GSUxFX1NZTlRBWCAhPT0gJz8nO1xuXG4gIGNvbnN0IGlzQWxsb3dlZEV4dGVuc2lvbiA9IGhhc0FsbG93ZWRGaWxlRXh0ZW5zaW9uKCdodG1sJywgT1JJR0lOQUxfRklMRV9QQVRIKTtcbiAgY29uc3QgaXNBbGxvd2VkU3ludGF4ID0gaGFzQWxsb3dlZEZpbGVTeW50YXgoJ2h0bWwnLCBFRElUT1JfRklMRV9TWU5UQVgpO1xuICBjb25zdCBpc0Rpc2FsbG93ZWRGaWxlUGF0dGVybiA9IGhhc0Rpc2FsbG93ZWRGaWxlUGF0aFBhdHRlcm4oJ2h0bWwnLCBPUklHSU5BTF9GSUxFX1BBVEgpO1xuICBjb25zdCBpc01heWJlSHRtbCA9IGJ1ZmZlckNvbnRlbnRzLm1hdGNoKC9eXFxzKjwvKTtcblxuICBpZiAoIWlzU2F2ZWRGaWxlKSB7XG4gICAgcmV0dXJuIHVzZUVkaXRvckZpbGVTeW50YXhGb3JEZXRlcm1pbmluZ0ZpbGVUeXBlXG4gICAgICA/IGlzQWxsb3dlZFN5bnRheCB8fCBpc01heWJlSHRtbFxuICAgICAgOiBpc01heWJlSHRtbDtcbiAgfVxuXG4gIGlmIChpc0Rpc2FsbG93ZWRGaWxlUGF0dGVybikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB1c2VFZGl0b3JGaWxlU3ludGF4Rm9yRGV0ZXJtaW5pbmdGaWxlVHlwZVxuICAgID8gaXNBbGxvd2VkU3ludGF4IHx8IGlzQWxsb3dlZEV4dGVuc2lvblxuICAgIDogaXNBbGxvd2VkRXh0ZW5zaW9uO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzSlNPTiA9IChidWZmZXJDb250ZW50cykgPT4ge1xuICBjb25zdCBpc1NhdmVkRmlsZSA9IE9SSUdJTkFMX0ZJTEVfUEFUSCAhPT0gJz8nO1xuICBjb25zdCB1c2VFZGl0b3JGaWxlU3ludGF4Rm9yRGV0ZXJtaW5pbmdGaWxlVHlwZSA9IEVESVRPUl9GSUxFX1NZTlRBWCAhPT0gJz8nO1xuXG4gIGNvbnN0IGlzQWxsb3dlZEV4dGVuc2lvbiA9IGhhc0FsbG93ZWRGaWxlRXh0ZW5zaW9uKCdqc29uJywgT1JJR0lOQUxfRklMRV9QQVRIKTtcbiAgY29uc3QgaXNBbGxvd2VkU3ludGF4ID0gaGFzQWxsb3dlZEZpbGVTeW50YXgoJ2pzb24nLCBFRElUT1JfRklMRV9TWU5UQVgpO1xuICBjb25zdCBpc0Rpc2FsbG93ZWRGaWxlUGF0dGVybiA9IGhhc0Rpc2FsbG93ZWRGaWxlUGF0aFBhdHRlcm4oJ2pzb24nLCBPUklHSU5BTF9GSUxFX1BBVEgpO1xuICBjb25zdCBpc01heWJlSnNvbiA9IGJ1ZmZlckNvbnRlbnRzLm1hdGNoKC9eXFxzKlt7W10vKTtcblxuICBpZiAoIWlzU2F2ZWRGaWxlKSB7XG4gICAgcmV0dXJuIHVzZUVkaXRvckZpbGVTeW50YXhGb3JEZXRlcm1pbmluZ0ZpbGVUeXBlXG4gICAgICA/IGlzQWxsb3dlZFN5bnRheCB8fCBpc01heWJlSnNvblxuICAgICAgOiBpc01heWJlSnNvbjtcbiAgfVxuXG4gIGlmIChpc0Rpc2FsbG93ZWRGaWxlUGF0dGVybikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB1c2VFZGl0b3JGaWxlU3ludGF4Rm9yRGV0ZXJtaW5pbmdGaWxlVHlwZVxuICAgID8gaXNBbGxvd2VkU3ludGF4IHx8IGlzQWxsb3dlZEV4dGVuc2lvblxuICAgIDogaXNBbGxvd2VkRXh0ZW5zaW9uO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzSlMgPSAoYnVmZmVyQ29udGVudHMpID0+IHtcbiAgY29uc3QgaXNTYXZlZEZpbGUgPSBPUklHSU5BTF9GSUxFX1BBVEggIT09ICc/JztcbiAgY29uc3QgdXNlRWRpdG9yRmlsZVN5bnRheEZvckRldGVybWluaW5nRmlsZVR5cGUgPSBFRElUT1JfRklMRV9TWU5UQVggIT09ICc/JztcblxuICBjb25zdCBpc0FsbG93ZWRFeHRlbnNpb24gPSBoYXNBbGxvd2VkRmlsZUV4dGVuc2lvbignanMnLCBPUklHSU5BTF9GSUxFX1BBVEgpO1xuICBjb25zdCBpc0FsbG93ZWRTeW50YXggPSBoYXNBbGxvd2VkRmlsZVN5bnRheCgnanMnLCBFRElUT1JfRklMRV9TWU5UQVgpO1xuICBjb25zdCBpc0Rpc2FsbG93ZWRGaWxlUGF0dGVybiA9IGhhc0Rpc2FsbG93ZWRGaWxlUGF0aFBhdHRlcm4oJ2pzJywgT1JJR0lOQUxfRklMRV9QQVRIKTtcbiAgY29uc3QgaXNNYXliZUpzID0gIWJ1ZmZlckNvbnRlbnRzLm1hdGNoKC9eXFxzKjwvKTtcblxuICBpZiAoIWlzU2F2ZWRGaWxlKSB7XG4gICAgcmV0dXJuIHVzZUVkaXRvckZpbGVTeW50YXhGb3JEZXRlcm1pbmluZ0ZpbGVUeXBlXG4gICAgICA/IGlzQWxsb3dlZFN5bnRheCB8fCBpc01heWJlSnNcbiAgICAgIDogaXNNYXliZUpzO1xuICB9XG5cbiAgaWYgKGlzRGlzYWxsb3dlZEZpbGVQYXR0ZXJuKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHVzZUVkaXRvckZpbGVTeW50YXhGb3JEZXRlcm1pbmluZ0ZpbGVUeXBlXG4gICAgPyBpc0FsbG93ZWRTeW50YXggfHwgaXNBbGxvd2VkRXh0ZW5zaW9uXG4gICAgOiBpc0FsbG93ZWRFeHRlbnNpb247XG59O1xuXG4vLyBDaGVja3MgaWYgYSBmaWxlIHBhdGggbWF0Y2hlcyBhIHBhcnRpY3VsYXIgZ2xvYiBzdHJpbmcuXG5leHBvcnQgY29uc3QgaXNNYXRjaGluZ0dsb2IgPSAoZ2xvYlN0cmluZykgPT4ge1xuICAvLyBJZiBmaWxlIHVuc2F2ZWQsIHJlamVjdCBnbG9iIG1hdGNoaW5nO1xuICBpZiAoT1JJR0lOQUxfRklMRV9QQVRIID09PSAnPycpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIChcbiAgICBtaW5pbWF0Y2goT1JJR0lOQUxfRklMRV9QQVRILCBnbG9iU3RyaW5nKVxuICAgIHx8IG1pbmltYXRjaChiYXNlbmFtZShPUklHSU5BTF9GSUxFX1BBVEgpLCBnbG9iU3RyaW5nKVxuICApO1xufTtcbiJdLCJmaWxlIjoidXRpbHMvZmlsZVV0aWxzLmpzIn0=
