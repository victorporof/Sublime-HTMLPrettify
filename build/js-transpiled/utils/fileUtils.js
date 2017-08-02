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
var hasDisallowedFilePathPattern = function hasDisallowedFilePathPattern(fileType, filePath) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)((GLOBAL_FILE_RULES[fileType] || {}).disallowed_file_patterns || []), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
    for (var _iterator2 = (0, _getIterator3.default)((GLOBAL_FILE_RULES[expectedType] || {}).allowed_file_extensions || []), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
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
    for (var _iterator3 = (0, _getIterator3.default)((GLOBAL_FILE_RULES[expectedType] || {}).allowed_file_syntaxes || []), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
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

var isHTML = exports.isHTML = function isHTML(bufferContents) {
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

var isJSON = exports.isJSON = function isJSON(bufferContents) {
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

var isJS = exports.isJS = function isJS(bufferContents) {
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
};

// Checks if a file path matches a particular glob string.
var isMatchingGlob = exports.isMatchingGlob = function isMatchingGlob(globString) {
  // If file unsaved, reject globl matching;
  if (_constants.ORIGINAL_FILE_PATH === '?') {
    return false;
  }
  return (0, _minimatch2.default)(_constants.ORIGINAL_FILE_PATH, globString) || (0, _minimatch2.default)((0, _path.basename)(_constants.ORIGINAL_FILE_PATH), globString);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL2ZpbGVVdGlscy5qcyJdLCJuYW1lcyI6WyJHTE9CQUxfRklMRV9SVUxFUyIsImhhc0Rpc2FsbG93ZWRGaWxlUGF0aFBhdHRlcm4iLCJmaWxlVHlwZSIsImZpbGVQYXRoIiwiZGlzYWxsb3dlZF9maWxlX3BhdHRlcm5zIiwicGF0dGVybiIsIm1hdGNoIiwiUmVnRXhwIiwiaGFzQWxsb3dlZEZpbGVFeHRlbnNpb24iLCJleHBlY3RlZFR5cGUiLCJhbGxvd2VkX2ZpbGVfZXh0ZW5zaW9ucyIsImV4dGVuc2lvbiIsImhhc0FsbG93ZWRGaWxlU3ludGF4IiwiZmlsZVN5bnRheCIsImFsbG93ZWRfZmlsZV9zeW50YXhlcyIsInRvTG93ZXJDYXNlIiwiaW5jbHVkZXMiLCJpc0NTUyIsImlzU2F2ZWRGaWxlIiwidXNlRWRpdG9yRmlsZVN5bnRheEZvckRldGVybWluaW5nRmlsZVR5cGUiLCJpc0FsbG93ZWRFeHRlbnNpb24iLCJpc0FsbG93ZWRTeW50YXgiLCJpc0Rpc2FsbG93ZWRGaWxlUGF0dGVybiIsImlzSFRNTCIsImJ1ZmZlckNvbnRlbnRzIiwiaXNNYXliZUh0bWwiLCJpc0pTT04iLCJpc01heWJlSnNvbiIsImlzSlMiLCJpc01heWJlSnMiLCJpc01hdGNoaW5nR2xvYiIsImdsb2JTdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBSUE7O0FBRUE7Ozs7QUFFQTs7QUFDQTs7OztBQVRBOzs7O0FBV0EsSUFBTUEsb0JBQW9CLDZEQUExQjs7QUFFQTtBQUNBO0FBQ0EsSUFBTUMsK0JBQStCLFNBQS9CQSw0QkFBK0IsQ0FBQ0MsUUFBRCxFQUFXQyxRQUFYLEVBQXdCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQzNELG9EQUFzQixDQUFDSCxrQkFBa0JFLFFBQWxCLEtBQStCLEVBQWhDLEVBQW9DRSx3QkFBcEMsSUFBZ0UsRUFBdEYsNEdBQTBGO0FBQUEsVUFBL0VDLE9BQStFOztBQUN4RixVQUFJRixTQUFTRyxLQUFULENBQWUsSUFBSUMsTUFB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MENBQWlCLFNBQWpCQSxjQUFpQixDQUFDQyxVQUFELEVBQWdCO0FBQzVDO0FBQ0EsTUFBSSxrQ0FBdUIsR0FBM0IsRUFBZ0M7QUFDOUIsV0FBTyxLQUFQO0FBQ0Q7QUFDRCxTQUNFLHdEQUE4QkEsVUFBOUIsS0FDQSx5QkFBVSxrREFBVixFQUF3Q0EsVUFBeEMsQ0FGRjtBQUlELENBVE0iLCJmaWxlIjoidXRpbHMvZmlsZVV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy4gKi9cblxuaW1wb3J0IHsgYmFzZW5hbWUgfSBmcm9tICdwYXRoJztcblxuaW1wb3J0IG1pbmltYXRjaCBmcm9tICdtaW5pbWF0Y2gnO1xuXG5pbXBvcnQgeyBHTE9CQUxfRklMRV9SVUxFU19KU09OLCBPUklHSU5BTF9GSUxFX1BBVEgsIEVESVRPUl9GSUxFX1NZTlRBWCB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IHBhcnNlSlNPTjUgfSBmcm9tICcuL2pzb25VdGlscyc7XG5cbmNvbnN0IEdMT0JBTF9GSUxFX1JVTEVTID0gcGFyc2VKU09ONShHTE9CQUxfRklMRV9SVUxFU19KU09OKTtcblxuLy8gQ2hlY2tzIGlmIGEgZmlsZSBwYXRoIGlzIGFsbG93ZWQgYnkgcmVnZXhpbmcgdGhlIGZpbGUgbmFtZSBhbmQgZXhwZWN0aW5nXG4vLyBpdCBub3QgdG8gbWF0Y2ggY2VydGFpbiBleHByZXNzaW9ucy5cbmNvbnN0IGhhc0Rpc2FsbG93ZWRGaWxlUGF0aFBhdHRlcm4gPSAoZmlsZVR5cGUsIGZpbGVQYXRoKSA9PiB7XG4gIGZvciAoY29uc3QgcGF0dGVybiBvZiAoR0xPQkFMX0ZJTEVfUlVMRVNbZmlsZVR5cGVdIHx8IHt9KS5kaXNhbGxvd2VkX2ZpbGVfcGF0dGVybnMgfHwgW10pIHtcbiAgICBpZiAoZmlsZVBhdGgubWF0Y2gobmV3IFJlZ0V4cChwYXR0ZXJuLCAnaScpKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbi8vIENoZWNrcyBpZiBhIGZpbGUgaXMgb2YgYSBwYXJ0aWN1bGFyIHR5cGUgYnkgcmVnZXhpbmcgdGhlIGZpbGUgbmFtZSBhbmRcbi8vIGV4cGVjdGluZyBhIGNlcnRhaW4gZXh0ZW5zaW9uLlxuY29uc3QgaGFzQWxsb3dlZEZpbGVFeHRlbnNpb24gPSAoZXhwZWN0ZWRUeXBlLCBmaWxlUGF0aCkgPT4ge1xuICBmb3IgKGNvbnN0IGV4dGVuc2lvbiBvZiAoR0xPQkFMX0ZJTEVfUlVMRVNbZXhwZWN0ZWRUeXBlXSB8fCB7fSkuYWxsb3dlZF9maWxlX2V4dGVuc2lvbnMgfHwgW10pIHtcbiAgICBpZiAoZmlsZVBhdGgubWF0Y2gobmV3IFJlZ0V4cChgXFxcXC4ke2V4dGVuc2lvbn0kYCwgJ2knKSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG4vLyBDaGVja3MgaWYgYSBmaWxlIGlzIG9mIGEgcGFydGljdWxhciB0eXBlIGJ5IHJlZ2V4aW5nIHRoZSBzeW50YXggbmFtZSBhbmRcbi8vIGV4cGVjdGluZyBhIHBhdHRlcm4uXG5jb25zdCBoYXNBbGxvd2VkRmlsZVN5bnRheCA9IChleHBlY3RlZFR5cGUsIGZpbGVTeW50YXgpID0+IHtcbiAgZm9yIChjb25zdCBwYXR0ZXJuIG9mIChHTE9CQUxfRklMRV9SVUxFU1tleHBlY3RlZFR5cGVdIHx8IHt9KS5hbGxvd2VkX2ZpbGVfc3ludGF4ZXMgfHwgW10pIHtcbiAgICBpZiAoZmlsZVN5bnRheC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHBhdHRlcm4pKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzQ1NTID0gKCkgPT4ge1xuICBjb25zdCBpc1NhdmVkRmlsZSA9IE9SSUdJTkFMX0ZJTEVfUEFUSCAhPT0gJz8nO1xuICBjb25zdCB1c2VFZGl0b3JGaWxlU3ludGF4Rm9yRGV0ZXJtaW5pbmdGaWxlVHlwZSA9IEVESVRPUl9GSUxFX1NZTlRBWCAhPT0gJz8nO1xuXG4gIGNvbnN0IGlzQWxsb3dlZEV4dGVuc2lvbiA9IGhhc0FsbG93ZWRGaWxlRXh0ZW5zaW9uKCdjc3MnLCBPUklHSU5BTF9GSUxFX1BBVEgpO1xuICBjb25zdCBpc0FsbG93ZWRTeW50YXggPSBoYXNBbGxvd2VkRmlsZVN5bnRheCgnY3NzJywgRURJVE9SX0ZJTEVfU1lOVEFYKTtcbiAgY29uc3QgaXNEaXNhbGxvd2VkRmlsZVBhdHRlcm4gPSBoYXNEaXNhbGxvd2VkRmlsZVBhdGhQYXR0ZXJuKCdjc3MnLCBPUklHSU5BTF9GSUxFX1BBVEgpO1xuXG4gIGlmICghaXNTYXZlZEZpbGUpIHtcbiAgICByZXR1cm4gdXNlRWRpdG9yRmlsZVN5bnRheEZvckRldGVybWluaW5nRmlsZVR5cGVcbiAgICAgID8gaXNBbGxvd2VkU3ludGF4XG4gICAgICA6IGZhbHNlO1xuICB9XG5cbiAgaWYgKGlzRGlzYWxsb3dlZEZpbGVQYXR0ZXJuKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHVzZUVkaXRvckZpbGVTeW50YXhGb3JEZXRlcm1pbmluZ0ZpbGVUeXBlXG4gICAgICA/IGlzQWxsb3dlZFN5bnRheCB8fCBpc0FsbG93ZWRFeHRlbnNpb25cbiAgICAgIDogaXNBbGxvd2VkRXh0ZW5zaW9uO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzSFRNTCA9IChidWZmZXJDb250ZW50cykgPT4ge1xuICBjb25zdCBpc1NhdmVkRmlsZSA9IE9SSUdJTkFMX0ZJTEVfUEFUSCAhPT0gJz8nO1xuICBjb25zdCB1c2VFZGl0b3JGaWxlU3ludGF4Rm9yRGV0ZXJtaW5pbmdGaWxlVHlwZSA9IEVESVRPUl9GSUxFX1NZTlRBWCAhPT0gJz8nO1xuXG4gIGNvbnN0IGlzQWxsb3dlZEV4dGVuc2lvbiA9IGhhc0FsbG93ZWRGaWxlRXh0ZW5zaW9uKCdodG1sJywgT1JJR0lOQUxfRklMRV9QQVRIKTtcbiAgY29uc3QgaXNBbGxvd2VkU3ludGF4ID0gaGFzQWxsb3dlZEZpbGVTeW50YXgoJ2h0bWwnLCBFRElUT1JfRklMRV9TWU5UQVgpO1xuICBjb25zdCBpc0Rpc2FsbG93ZWRGaWxlUGF0dGVybiA9IGhhc0Rpc2FsbG93ZWRGaWxlUGF0aFBhdHRlcm4oJ2h0bWwnLCBPUklHSU5BTF9GSUxFX1BBVEgpO1xuICBjb25zdCBpc01heWJlSHRtbCA9IGJ1ZmZlckNvbnRlbnRzLm1hdGNoKC9eXFxzKjwvKTtcblxuICBpZiAoIWlzU2F2ZWRGaWxlKSB7XG4gICAgcmV0dXJuIHVzZUVkaXRvckZpbGVTeW50YXhGb3JEZXRlcm1pbmluZ0ZpbGVUeXBlXG4gICAgICA/IGlzQWxsb3dlZFN5bnRheCB8fCBpc01heWJlSHRtbFxuICAgICAgOiBpc01heWJlSHRtbDtcbiAgfVxuXG4gIGlmIChpc0Rpc2FsbG93ZWRGaWxlUGF0dGVybikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB1c2VFZGl0b3JGaWxlU3ludGF4Rm9yRGV0ZXJtaW5pbmdGaWxlVHlwZVxuICAgICAgPyBpc0FsbG93ZWRTeW50YXggfHwgaXNBbGxvd2VkRXh0ZW5zaW9uXG4gICAgICA6IGlzQWxsb3dlZEV4dGVuc2lvbjtcbn07XG5cbmV4cG9ydCBjb25zdCBpc0pTT04gPSAoYnVmZmVyQ29udGVudHMpID0+IHtcbiAgY29uc3QgaXNTYXZlZEZpbGUgPSBPUklHSU5BTF9GSUxFX1BBVEggIT09ICc/JztcbiAgY29uc3QgdXNlRWRpdG9yRmlsZVN5bnRheEZvckRldGVybWluaW5nRmlsZVR5cGUgPSBFRElUT1JfRklMRV9TWU5UQVggIT09ICc/JztcblxuICBjb25zdCBpc0FsbG93ZWRFeHRlbnNpb24gPSBoYXNBbGxvd2VkRmlsZUV4dGVuc2lvbignanNvbicsIE9SSUdJTkFMX0ZJTEVfUEFUSCk7XG4gIGNvbnN0IGlzQWxsb3dlZFN5bnRheCA9IGhhc0FsbG93ZWRGaWxlU3ludGF4KCdqc29uJywgRURJVE9SX0ZJTEVfU1lOVEFYKTtcbiAgY29uc3QgaXNEaXNhbGxvd2VkRmlsZVBhdHRlcm4gPSBoYXNEaXNhbGxvd2VkRmlsZVBhdGhQYXR0ZXJuKCdqc29uJywgT1JJR0lOQUxfRklMRV9QQVRIKTtcbiAgY29uc3QgaXNNYXliZUpzb24gPSBidWZmZXJDb250ZW50cy5tYXRjaCgvXlxccypbe1tdLyk7XG5cbiAgaWYgKCFpc1NhdmVkRmlsZSkge1xuICAgIHJldHVybiB1c2VFZGl0b3JGaWxlU3ludGF4Rm9yRGV0ZXJtaW5pbmdGaWxlVHlwZVxuICAgICAgPyBpc0FsbG93ZWRTeW50YXggfHwgaXNNYXliZUpzb25cbiAgICAgIDogaXNNYXliZUpzb247XG4gIH1cblxuICBpZiAoaXNEaXNhbGxvd2VkRmlsZVBhdHRlcm4pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdXNlRWRpdG9yRmlsZVN5bnRheEZvckRldGVybWluaW5nRmlsZVR5cGVcbiAgICAgID8gaXNBbGxvd2VkU3ludGF4IHx8IGlzQWxsb3dlZEV4dGVuc2lvblxuICAgICAgOiBpc0FsbG93ZWRFeHRlbnNpb247XG59O1xuXG5leHBvcnQgY29uc3QgaXNKUyA9IChidWZmZXJDb250ZW50cykgPT4ge1xuICBjb25zdCBpc1NhdmVkRmlsZSA9IE9SSUdJTkFMX0ZJTEVfUEFUSCAhPT0gJz8nO1xuICBjb25zdCB1c2VFZGl0b3JGaWxlU3ludGF4Rm9yRGV0ZXJtaW5pbmdGaWxlVHlwZSA9IEVESVRPUl9GSUxFX1NZTlRBWCAhPT0gJz8nO1xuXG4gIGNvbnN0IGlzQWxsb3dlZEV4dGVuc2lvbiA9IGhhc0FsbG93ZWRGaWxlRXh0ZW5zaW9uKCdqcycsIE9SSUdJTkFMX0ZJTEVfUEFUSCk7XG4gIGNvbnN0IGlzQWxsb3dlZFN5bnRheCA9IGhhc0FsbG93ZWRGaWxlU3ludGF4KCdqcycsIEVESVRPUl9GSUxFX1NZTlRBWCk7XG4gIGNvbnN0IGlzRGlzYWxsb3dlZEZpbGVQYXR0ZXJuID0gaGFzRGlzYWxsb3dlZEZpbGVQYXRoUGF0dGVybignanMnLCBPUklHSU5BTF9GSUxFX1BBVEgpO1xuICBjb25zdCBpc01heWJlSnMgPSAhYnVmZmVyQ29udGVudHMubWF0Y2goL15cXHMqPC8pO1xuXG4gIGlmICghaXNTYXZlZEZpbGUpIHtcbiAgICByZXR1cm4gdXNlRWRpdG9yRmlsZVN5bnRheEZvckRldGVybWluaW5nRmlsZVR5cGVcbiAgICAgID8gaXNBbGxvd2VkU3ludGF4IHx8IGlzTWF5YmVKc1xuICAgICAgOiBpc01heWJlSnM7XG4gIH1cblxuICBpZiAoaXNEaXNhbGxvd2VkRmlsZVBhdHRlcm4pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdXNlRWRpdG9yRmlsZVN5bnRheEZvckRldGVybWluaW5nRmlsZVR5cGVcbiAgICAgID8gaXNBbGxvd2VkU3ludGF4IHx8IGlzQWxsb3dlZEV4dGVuc2lvblxuICAgICAgOiBpc0FsbG93ZWRFeHRlbnNpb247XG59O1xuXG4vLyBDaGVja3MgaWYgYSBmaWxlIHBhdGggbWF0Y2hlcyBhIHBhcnRpY3VsYXIgZ2xvYiBzdHJpbmcuXG5leHBvcnQgY29uc3QgaXNNYXRjaGluZ0dsb2IgPSAoZ2xvYlN0cmluZykgPT4ge1xuICAvLyBJZiBmaWxlIHVuc2F2ZWQsIHJlamVjdCBnbG9ibCBtYXRjaGluZztcbiAgaWYgKE9SSUdJTkFMX0ZJTEVfUEFUSCA9PT0gJz8nKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiAoXG4gICAgbWluaW1hdGNoKE9SSUdJTkFMX0ZJTEVfUEFUSCwgZ2xvYlN0cmluZykgfHxcbiAgICBtaW5pbWF0Y2goYmFzZW5hbWUoT1JJR0lOQUxfRklMRV9QQVRIKSwgZ2xvYlN0cmluZylcbiAgKTtcbn07XG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
