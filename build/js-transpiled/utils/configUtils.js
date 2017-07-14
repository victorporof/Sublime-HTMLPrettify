'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.finalizeJsbeautifyConfig = exports.extendJsbeautifyConfigWithEditorOverrides = exports.extendJsbeautifyConfigWithCurrentFileMatchRules = exports.extendJsbeautifyConfigFromEditorConfigInFolders = exports.extendJsbeautifyConfigFromFolders = exports.extendJsbeautifyConfigFromEditorConfigFile = exports.extendJsbeautifyConfigFromFile = exports.extendJsbeautifyConfig = exports.parseDefaultJsbeautifyConfig = exports.parseJsbeautifyConfig = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _clone = require('lodash/clone');

var _clone2 = _interopRequireDefault(_clone);

var _promiseArrays = require('promise-arrays');

var _promiseArrays2 = _interopRequireDefault(_promiseArrays);

var _paths = require('./paths');

var _constants = require('./constants');

var _jsonUtils = require('./jsonUtils');

var _editorconfigUtils = require('./editorconfigUtils');

var _configSanitizers = require('./configSanitizers');

var _fileUtils = require('./fileUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Parses a .jsbeautifyrc json file and returns a sanitized object
// with a consistent and expected format.
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var parseJsbeautifyConfig = exports.parseJsbeautifyConfig = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(filePath) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = _configSanitizers.sanitizeJsbeautifyConfig;
            _context.next = 3;
            return (0, _jsonUtils.parseJSON5File)(filePath);

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

  return function parseJsbeautifyConfig(_x) {
    return _ref.apply(this, arguments);
  };
}();

// Parses the default .jsbeautifyrc json file coming with this plugin.
var parseDefaultJsbeautifyConfig = exports.parseDefaultJsbeautifyConfig = function parseDefaultJsbeautifyConfig() {
  return parseJsbeautifyConfig(_path2.default.join(_paths.ROOT_DIR, '.jsbeautifyrc.defaults.json'));
};

// Clones and extends a given .jsbeautifyrc object with the one located at a
// file path. If none exists, a clone of the original is returned.
var extendJsbeautifyConfig = exports.extendJsbeautifyConfig = function extendJsbeautifyConfig(newJsbeautifyConfig, oldJsbeautifyConfig) {
  var oldClonedJsbeautifyConfig = (0, _clone2.default)(oldJsbeautifyConfig);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)((0, _entries2.default)(newJsbeautifyConfig)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
          fileType = _step$value[0],
          newFileSettings = _step$value[1];

      switch (fileType) {
        case 'all':
        case 'html':
        case 'css':
        case 'js':
        case 'json':
          oldClonedJsbeautifyConfig[fileType] = (0, _extends3.default)({}, oldClonedJsbeautifyConfig[fileType] || {}, newFileSettings);
          break;
        case 'custom':
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = (0, _getIterator3.default)((0, _entries2.default)(newFileSettings)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var _step2$value = (0, _slicedToArray3.default)(_step2.value, 2),
                  globString = _step2$value[0],
                  newGlobConfig = _step2$value[1];

              oldClonedJsbeautifyConfig.custom[globString] = (0, _extends3.default)({}, oldClonedJsbeautifyConfig.custom[globString] || {}, newGlobConfig);
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

          break;
        default:
          throw new Error('Unknown .jsbeautifyrc file type: ' + fileType);
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

  return oldClonedJsbeautifyConfig;
};

// Clones and extends a given .jsbeautifyrc object with the one located at a
// file path. If none exists, a clone of the original is returned.
var extendJsbeautifyConfigFromFile = exports.extendJsbeautifyConfigFromFile = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(filePath, oldJsbeautifyConfig) {
    var newJsbeautifyConfig;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return parseJsbeautifyConfig(filePath);

          case 2:
            newJsbeautifyConfig = _context2.sent;
            return _context2.abrupt('return', extendJsbeautifyConfig(newJsbeautifyConfig, oldJsbeautifyConfig));

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function extendJsbeautifyConfigFromFile(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

// Clones and extends a given .jsbeautifyrc object with an .editorconfig file
// located at a file path. If none exists, a clone of the original is returned.
var extendJsbeautifyConfigFromEditorConfigFile = exports.extendJsbeautifyConfigFromEditorConfigFile = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(filePath, oldJsbeautifyConfig) {
    var newEditorConfig, newJsbeautifyConfig;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _editorconfigUtils.parseEditorConfigFile)(filePath);

          case 2:
            newEditorConfig = _context3.sent;
            newJsbeautifyConfig = (0, _configSanitizers.sanitizeJsbeautifyConfig)((0, _configSanitizers.translateEditorConfigToJsbeautifyConfig)(newEditorConfig));
            return _context3.abrupt('return', extendJsbeautifyConfig(newJsbeautifyConfig, oldJsbeautifyConfig));

          case 5:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function extendJsbeautifyConfigFromEditorConfigFile(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

// Clones and extends a given .jsbeautifyrc object with the first one found in
// a list of folder paths. If none exists, a clone of the original is returned.
var extendJsbeautifyConfigFromFolders = exports.extendJsbeautifyConfigFromFolders = function () {
  var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(folderPaths, oldJsbeautifyConfig) {
    var filesToCheck, newJsbeautifyConfigPath;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            filesToCheck = folderPaths.map(function (f) {
              return _path2.default.join(f, '.jsbeautifyrc');
            });
            _context4.next = 3;
            return _promiseArrays2.default.filter(filesToCheck, _fsExtra2.default.pathExists);

          case 3:
            newJsbeautifyConfigPath = _context4.sent[0];

            if (!newJsbeautifyConfigPath) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt('return', extendJsbeautifyConfigFromFile(newJsbeautifyConfigPath, oldJsbeautifyConfig));

          case 6:
            return _context4.abrupt('return', (0, _clone2.default)(oldJsbeautifyConfig));

          case 7:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function extendJsbeautifyConfigFromFolders(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

// Clones and extends a given .jsbeautifyrc object with the first .editorconfig
// file found in a list of folder paths. If none exists, a clone of the original
// is returned.
var extendJsbeautifyConfigFromEditorConfigInFolders = exports.extendJsbeautifyConfigFromEditorConfigInFolders = function () {
  var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(folderPaths, oldJsbeautifyConfig) {
    var filesToCheck, newEditorConfigPath;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            filesToCheck = folderPaths.map(function (f) {
              return _path2.default.join(f, '.editorconfig');
            });
            _context5.next = 3;
            return _promiseArrays2.default.filter(filesToCheck, _fsExtra2.default.pathExists);

          case 3:
            newEditorConfigPath = _context5.sent[0];

            if (!newEditorConfigPath) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt('return', extendJsbeautifyConfigFromEditorConfigFile(newEditorConfigPath, oldJsbeautifyConfig));

          case 6:
            return _context5.abrupt('return', (0, _clone2.default)(oldJsbeautifyConfig));

          case 7:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function extendJsbeautifyConfigFromEditorConfigInFolders(_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();

// Clones and extends a given .jsbeautifyrc with some additonal custom options
// defined in the "custom" field, which contains globs defining additional
// prettification rules for certain files paths.
var extendJsbeautifyConfigWithCurrentFileMatchRules = exports.extendJsbeautifyConfigWithCurrentFileMatchRules = function extendJsbeautifyConfigWithCurrentFileMatchRules(jsbeautifyConfig) {
  var clonedJsbeautifyConfig = (0, _clone2.default)(jsbeautifyConfig);
  clonedJsbeautifyConfig.currentFileMatchRules = {};

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = (0, _getIterator3.default)((0, _entries2.default)(clonedJsbeautifyConfig.custom)), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _step3$value = (0, _slicedToArray3.default)(_step3.value, 2),
          globString = _step3$value[0],
          globFileConfig = _step3$value[1];

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = (0, _getIterator3.default)((0, _entries2.default)(globFileConfig)), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _step4$value = (0, _slicedToArray3.default)(_step4.value, 2),
              prefName = _step4$value[0],
              globPrefValue = _step4$value[1];

          if ((0, _fileUtils.isMatchingGlob)(globString)) {
            clonedJsbeautifyConfig.currentFileMatchRules[prefName] = globPrefValue;
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
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

  return clonedJsbeautifyConfig;
};

// Clones and extends a given .jsbeautifyrc with some additonal custom options
// retrieved from the editor settings.
var extendJsbeautifyConfigWithEditorOverrides = exports.extendJsbeautifyConfigWithEditorOverrides = function extendJsbeautifyConfigWithEditorOverrides(jsbeautifyConfig) {
  var clonedJsbeautifyConfig = (0, _clone2.default)(jsbeautifyConfig);
  clonedJsbeautifyConfig.editorOverrides = {};

  if (_constants.EDITOR_INDENT_SIZE !== '?') {
    clonedJsbeautifyConfig.editorOverrides.indent_size = +_constants.EDITOR_INDENT_SIZE;
  }

  if (_constants.EDITOR_INDENT_WITH_TABS !== '?') {
    if (_constants.EDITOR_INDENT_WITH_TABS === 'True') {
      clonedJsbeautifyConfig.editorOverrides.indent_with_tabs = true;
      clonedJsbeautifyConfig.editorOverrides.indent_char = '\t';
    } else {
      clonedJsbeautifyConfig.editorOverrides.indent_with_tabs = false;
      clonedJsbeautifyConfig.editorOverrides.indent_char = ' ';
    }
  }

  return clonedJsbeautifyConfig;
};

// Clones and extends a given .jsbeautifyrc with some additonal meta-options
// following some specific rules respecting global editor settings.
var finalizeJsbeautifyConfig = exports.finalizeJsbeautifyConfig = function finalizeJsbeautifyConfig(jsbeautifyConfig) {
  var extendedJsbeautifyConfig = extendJsbeautifyConfigWithCurrentFileMatchRules(extendJsbeautifyConfigWithEditorOverrides(jsbeautifyConfig));

  extendedJsbeautifyConfig.html = (0, _extends3.default)({}, extendedJsbeautifyConfig.all, extendedJsbeautifyConfig.html, {
    css: extendedJsbeautifyConfig.css,
    js: extendedJsbeautifyConfig.js
  }, extendedJsbeautifyConfig.currentFileMatchRules, extendedJsbeautifyConfig.editorOverrides);

  extendedJsbeautifyConfig.css = (0, _extends3.default)({}, extendedJsbeautifyConfig.all, extendedJsbeautifyConfig.css, extendedJsbeautifyConfig.currentFileMatchRules, extendedJsbeautifyConfig.editorOverrides);

  extendedJsbeautifyConfig.js = (0, _extends3.default)({}, extendedJsbeautifyConfig.all, extendedJsbeautifyConfig.js, extendedJsbeautifyConfig.currentFileMatchRules, extendedJsbeautifyConfig.editorOverrides);

  extendedJsbeautifyConfig.json = (0, _extends3.default)({}, extendedJsbeautifyConfig.all, extendedJsbeautifyConfig.json, extendedJsbeautifyConfig.currentFileMatchRules, extendedJsbeautifyConfig.editorOverrides);

  delete extendedJsbeautifyConfig.all;
  delete extendedJsbeautifyConfig.custom;
  delete extendedJsbeautifyConfig.currentFileMatchRules;
  delete extendedJsbeautifyConfig.editorOverrides;

  return extendedJsbeautifyConfig;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL2NvbmZpZ1V0aWxzLmpzIl0sIm5hbWVzIjpbInBhcnNlSnNiZWF1dGlmeUNvbmZpZyIsImZpbGVQYXRoIiwicGFyc2VEZWZhdWx0SnNiZWF1dGlmeUNvbmZpZyIsImpvaW4iLCJleHRlbmRKc2JlYXV0aWZ5Q29uZmlnIiwibmV3SnNiZWF1dGlmeUNvbmZpZyIsIm9sZEpzYmVhdXRpZnlDb25maWciLCJvbGRDbG9uZWRKc2JlYXV0aWZ5Q29uZmlnIiwiZmlsZVR5cGUiLCJuZXdGaWxlU2V0dGluZ3MiLCJnbG9iU3RyaW5nIiwibmV3R2xvYkNvbmZpZyIsImN1c3RvbSIsIkVycm9yIiwiZXh0ZW5kSnNiZWF1dGlmeUNvbmZpZ0Zyb21GaWxlIiwiZXh0ZW5kSnNiZWF1dGlmeUNvbmZpZ0Zyb21FZGl0b3JDb25maWdGaWxlIiwibmV3RWRpdG9yQ29uZmlnIiwiZXh0ZW5kSnNiZWF1dGlmeUNvbmZpZ0Zyb21Gb2xkZXJzIiwiZm9sZGVyUGF0aHMiLCJmaWxlc1RvQ2hlY2siLCJtYXAiLCJmIiwiZmlsdGVyIiwicGF0aEV4aXN0cyIsIm5ld0pzYmVhdXRpZnlDb25maWdQYXRoIiwiZXh0ZW5kSnNiZWF1dGlmeUNvbmZpZ0Zyb21FZGl0b3JDb25maWdJbkZvbGRlcnMiLCJuZXdFZGl0b3JDb25maWdQYXRoIiwiZXh0ZW5kSnNiZWF1dGlmeUNvbmZpZ1dpdGhDdXJyZW50RmlsZU1hdGNoUnVsZXMiLCJqc2JlYXV0aWZ5Q29uZmlnIiwiY2xvbmVkSnNiZWF1dGlmeUNvbmZpZyIsImN1cnJlbnRGaWxlTWF0Y2hSdWxlcyIsImdsb2JGaWxlQ29uZmlnIiwicHJlZk5hbWUiLCJnbG9iUHJlZlZhbHVlIiwiZXh0ZW5kSnNiZWF1dGlmeUNvbmZpZ1dpdGhFZGl0b3JPdmVycmlkZXMiLCJlZGl0b3JPdmVycmlkZXMiLCJpbmRlbnRfc2l6ZSIsImluZGVudF93aXRoX3RhYnMiLCJpbmRlbnRfY2hhciIsImZpbmFsaXplSnNiZWF1dGlmeUNvbmZpZyIsImV4dGVuZGVk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TCx5QkFBeUJWLHFCQUg5QixFQUlLVSx5QkFBeUJMLGVBSjlCOztBQU9BLFNBQU9LLHlCQUF5QkUsR0FBaEM7QUFDQSxTQUFPRix5QkFBeUI1QixNQUFoQztBQUNBLFNBQU80Qix5QkFBeUJWLHFCQUFoQztBQUNBLFNBQU9VLHlCQUF5QkwsZUFBaEM7O0FBRUEsU0FBT0ssd0JBQVA7QUFDRCxDQTVDTSIsImZpbGUiOiJ1dGlscy9jb25maWdVdGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uICovXG5cbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCBjbG9uZSBmcm9tICdsb2Rhc2gvY2xvbmUnO1xuaW1wb3J0IHByb21pc2VBcnJheXMgZnJvbSAncHJvbWlzZS1hcnJheXMnO1xuXG5pbXBvcnQgeyBST09UX0RJUiB9IGZyb20gJy4vcGF0aHMnO1xuaW1wb3J0IHsgRURJVE9SX0lOREVOVF9TSVpFLCBFRElUT1JfSU5ERU5UX1dJVEhfVEFCUyB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IHBhcnNlSlNPTjVGaWxlIH0gZnJvbSAnLi9qc29uVXRpbHMnO1xuaW1wb3J0IHsgcGFyc2VFZGl0b3JDb25maWdGaWxlIH0gZnJvbSAnLi9lZGl0b3Jjb25maWdVdGlscyc7XG5pbXBvcnQgeyBzYW5pdGl6ZUpzYmVhdXRpZnlDb25maWcsIHRyYW5zbGF0ZUVkaXRvckNvbmZpZ1RvSnNiZWF1dGlmeUNvbmZpZyB9IGZyb20gJy4vY29uZmlnU2FuaXRpemVycyc7XG5pbXBvcnQgeyBpc01hdGNoaW5nR2xvYiB9IGZyb20gJy4vZmlsZVV0aWxzJztcblxuLy8gUGFyc2VzIGEgLmpzYmVhdXRpZnlyYyBqc29uIGZpbGUgYW5kIHJldHVybnMgYSBzYW5pdGl6ZWQgb2JqZWN0XG4vLyB3aXRoIGEgY29uc2lzdGVudCBhbmQgZXhwZWN0ZWQgZm9ybWF0LlxuZXhwb3J0IGNvbnN0IHBhcnNlSnNiZWF1dGlmeUNvbmZpZyA9IGFzeW5jIGZpbGVQYXRoID0+XG4gIHNhbml0aXplSnNiZWF1dGlmeUNvbmZpZyhhd2FpdCBwYXJzZUpTT041RmlsZShmaWxlUGF0aCkpO1xuXG4vLyBQYXJzZXMgdGhlIGRlZmF1bHQgLmpzYmVhdXRpZnlyYyBqc29uIGZpbGUgY29taW5nIHdpdGggdGhpcyBwbHVnaW4uXG5leHBvcnQgY29uc3QgcGFyc2VEZWZhdWx0SnNiZWF1dGlmeUNvbmZpZyA9ICgpID0+XG4gIHBhcnNlSnNiZWF1dGlmeUNvbmZpZyhwYXRoLmpvaW4oUk9PVF9ESVIsICcuanNiZWF1dGlmeXJjLmRlZmF1bHRzLmpzb24nKSk7XG5cbi8vIENsb25lcyBhbmQgZXh0ZW5kcyBhIGdpdmVuIC5qc2JlYXV0aWZ5cmMgb2JqZWN0IHdpdGggdGhlIG9uZSBsb2NhdGVkIGF0IGFcbi8vIGZpbGUgcGF0aC4gSWYgbm9uZSBleGlzdHMsIGEgY2xvbmUgb2YgdGhlIG9yaWdpbmFsIGlzIHJldHVybmVkLlxuZXhwb3J0IGNvbnN0IGV4dGVuZEpzYmVhdXRpZnlDb25maWcgPSAobmV3SnNiZWF1dGlmeUNvbmZpZywgb2xkSnNiZWF1dGlmeUNvbmZpZykgPT4ge1xuICBjb25zdCBvbGRDbG9uZWRKc2JlYXV0aWZ5Q29uZmlnID0gY2xvbmUob2xkSnNiZWF1dGlmeUNvbmZpZyk7XG5cbiAgZm9yIChjb25zdCBbZmlsZVR5cGUsIG5ld0ZpbGVTZXR0aW5nc10gb2YgT2JqZWN0LmVudHJpZXMobmV3SnNiZWF1dGlmeUNvbmZpZykpIHtcbiAgICBzd2l0Y2ggKGZpbGVUeXBlKSB7XG4gICAgICBjYXNlICdhbGwnOlxuICAgICAgY2FzZSAnaHRtbCc6XG4gICAgICBjYXNlICdjc3MnOlxuICAgICAgY2FzZSAnanMnOlxuICAgICAgY2FzZSAnanNvbic6XG4gICAgICAgIG9sZENsb25lZEpzYmVhdXRpZnlDb25maWdbZmlsZVR5cGVdID0ge1xuICAgICAgICAgIC4uLm9sZENsb25lZEpzYmVhdXRpZnlDb25maWdbZmlsZVR5cGVdIHx8IHt9LFxuICAgICAgICAgIC4uLm5ld0ZpbGVTZXR0aW5ncyxcbiAgICAgICAgfTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjdXN0b20nOlxuICAgICAgICBmb3IgKGNvbnN0IFtnbG9iU3RyaW5nLCBuZXdHbG9iQ29uZmlnXSBvZiBPYmplY3QuZW50cmllcyhuZXdGaWxlU2V0dGluZ3MpKSB7XG4gICAgICAgICAgb2xkQ2xvbmVkSnNiZWF1dGlmeUNvbmZpZy5jdXN0b21bZ2xvYlN0cmluZ10gPSB7XG4gICAgICAgICAgICAuLi5vbGRDbG9uZWRKc2JlYXV0aWZ5Q29uZmlnLmN1c3RvbVtnbG9iU3RyaW5nXSB8fCB7fSxcbiAgICAgICAgICAgIC4uLm5ld0dsb2JDb25maWcsXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biAuanNiZWF1dGlmeXJjIGZpbGUgdHlwZTogJHtmaWxlVHlwZX1gKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2xkQ2xvbmVkSnNiZWF1dGlmeUNvbmZpZztcbn07XG5cbi8vIENsb25lcyBhbmQgZXh0ZW5kcyBhIGdpdmVuIC5qc2JlYXV0aWZ5cmMgb2JqZWN0IHdpdGggdGhlIG9uZSBsb2NhdGVkIGF0IGFcbi8vIGZpbGUgcGF0aC4gSWYgbm9uZSBleGlzdHMsIGEgY2xvbmUgb2YgdGhlIG9yaWdpbmFsIGlzIHJldHVybmVkLlxuZXhwb3J0IGNvbnN0IGV4dGVuZEpzYmVhdXRpZnlDb25maWdGcm9tRmlsZSA9IGFzeW5jIChmaWxlUGF0aCwgb2xkSnNiZWF1dGlmeUNvbmZpZykgPT4ge1xuICBjb25zdCBuZXdKc2JlYXV0aWZ5Q29uZmlnID0gYXdhaXQgcGFyc2VKc2JlYXV0aWZ5Q29uZmlnKGZpbGVQYXRoKTtcbiAgcmV0dXJuIGV4dGVuZEpzYmVhdXRpZnlDb25maWcobmV3SnNiZWF1dGlmeUNvbmZpZywgb2xkSnNiZWF1dGlmeUNvbmZpZyk7XG59O1xuXG4vLyBDbG9uZXMgYW5kIGV4dGVuZHMgYSBnaXZlbiAuanNiZWF1dGlmeXJjIG9iamVjdCB3aXRoIGFuIC5lZGl0b3Jjb25maWcgZmlsZVxuLy8gbG9jYXRlZCBhdCBhIGZpbGUgcGF0aC4gSWYgbm9uZSBleGlzdHMsIGEgY2xvbmUgb2YgdGhlIG9yaWdpbmFsIGlzIHJldHVybmVkLlxuZXhwb3J0IGNvbnN0IGV4dGVuZEpzYmVhdXRpZnlDb25maWdGcm9tRWRpdG9yQ29uZmlnRmlsZSA9IGFzeW5jIChmaWxlUGF0aCwgb2xkSnNiZWF1dGlmeUNvbmZpZykgPT4ge1xuICBjb25zdCBuZXdFZGl0b3JDb25maWcgPSBhd2FpdCBwYXJzZUVkaXRvckNvbmZpZ0ZpbGUoZmlsZVBhdGgpO1xuICBjb25zdCBuZXdKc2JlYXV0aWZ5Q29uZmlnID0gc2FuaXRpemVKc2JlYXV0aWZ5Q29uZmlnKHRyYW5zbGF0ZUVkaXRvckNvbmZpZ1RvSnNiZWF1dGlmeUNvbmZpZyhuZXdFZGl0b3JDb25maWcpKTtcbiAgcmV0dXJuIGV4dGVuZEpzYmVhdXRpZnlDb25maWcobmV3SnNiZWF1dGlmeUNvbmZpZywgb2xkSnNiZWF1dGlmeUNvbmZpZyk7XG59O1xuXG4vLyBDbG9uZXMgYW5kIGV4dGVuZHMgYSBnaXZlbiAuanNiZWF1dGlmeXJjIG9iamVjdCB3aXRoIHRoZSBmaXJzdCBvbmUgZm91bmQgaW5cbi8vIGEgbGlzdCBvZiBmb2xkZXIgcGF0aHMuIElmIG5vbmUgZXhpc3RzLCBhIGNsb25lIG9mIHRoZSBvcmlnaW5hbCBpcyByZXR1cm5lZC5cbmV4cG9ydCBjb25zdCBleHRlbmRKc2JlYXV0aWZ5Q29uZmlnRnJvbUZvbGRlcnMgPSBhc3luYyAoZm9sZGVyUGF0aHMsIG9sZEpzYmVhdXRpZnlDb25maWcpID0+IHtcbiAgY29uc3QgZmlsZXNUb0NoZWNrID0gZm9sZGVyUGF0aHMubWFwKGYgPT4gcGF0aC5qb2luKGYsICcuanNiZWF1dGlmeXJjJykpO1xuICBjb25zdCBuZXdKc2JlYXV0aWZ5Q29uZmlnUGF0aCA9IChhd2FpdCBwcm9taXNlQXJyYXlzLmZpbHRlcihmaWxlc1RvQ2hlY2ssIGZzLnBhdGhFeGlzdHMpKVswXTtcblxuICBpZiAobmV3SnNiZWF1dGlmeUNvbmZpZ1BhdGgpIHtcbiAgICByZXR1cm4gZXh0ZW5kSnNiZWF1dGlmeUNvbmZpZ0Zyb21GaWxlKG5ld0pzYmVhdXRpZnlDb25maWdQYXRoLCBvbGRKc2JlYXV0aWZ5Q29uZmlnKTtcbiAgfVxuXG4gIHJldHVybiBjbG9uZShvbGRKc2JlYXV0aWZ5Q29uZmlnKTtcbn07XG5cbi8vIENsb25lcyBhbmQgZXh0ZW5kcyBhIGdpdmVuIC5qc2JlYXV0aWZ5cmMgb2JqZWN0IHdpdGggdGhlIGZpcnN0IC5lZGl0b3Jjb25maWdcbi8vIGZpbGUgZm91bmQgaW4gYSBsaXN0IG9mIGZvbGRlciBwYXRocy4gSWYgbm9uZSBleGlzdHMsIGEgY2xvbmUgb2YgdGhlIG9yaWdpbmFsXG4vLyBpcyByZXR1cm5lZC5cbmV4cG9ydCBjb25zdCBleHRlbmRKc2JlYXV0aWZ5Q29uZmlnRnJvbUVkaXRvckNvbmZpZ0luRm9sZGVycyA9IGFzeW5jIChmb2xkZXJQYXRocywgb2xkSnNiZWF1dGlmeUNvbmZpZykgPT4ge1xuICBjb25zdCBmaWxlc1RvQ2hlY2sgPSBmb2xkZXJQYXRocy5tYXAoZiA9PiBwYXRoLmpvaW4oZiwgJy5lZGl0b3Jjb25maWcnKSk7XG4gIGNvbnN0IG5ld0VkaXRvckNvbmZpZ1BhdGggPSAoYXdhaXQgcHJvbWlzZUFycmF5cy5maWx0ZXIoZmlsZXNUb0NoZWNrLCBmcy5wYXRoRXhpc3RzKSlbMF07XG5cbiAgaWYgKG5ld0VkaXRvckNvbmZpZ1BhdGgpIHtcbiAgICByZXR1cm4gZXh0ZW5kSnNiZWF1dGlmeUNvbmZpZ0Zyb21FZGl0b3JDb25maWdGaWxlKG5ld0VkaXRvckNvbmZpZ1BhdGgsIG9sZEpzYmVhdXRpZnlDb25maWcpO1xuICB9XG5cbiAgcmV0dXJuIGNsb25lKG9sZEpzYmVhdXRpZnlDb25maWcpO1xufTtcblxuLy8gQ2xvbmVzIGFuZCBleHRlbmRzIGEgZ2l2ZW4gLmpzYmVhdXRpZnlyYyB3aXRoIHNvbWUgYWRkaXRvbmFsIGN1c3RvbSBvcHRpb25zXG4vLyBkZWZpbmVkIGluIHRoZSBcImN1c3RvbVwiIGZpZWxkLCB3aGljaCBjb250YWlucyBnbG9icyBkZWZpbmluZyBhZGRpdGlvbmFsXG4vLyBwcmV0dGlmaWNhdGlvbiBydWxlcyBmb3IgY2VydGFpbiBmaWxlcyBwYXRocy5cbmV4cG9ydCBjb25zdCBleHRlbmRKc2JlYXV0aWZ5Q29uZmlnV2l0aEN1cnJlbnRGaWxlTWF0Y2hSdWxlcyA9IChqc2JlYXV0aWZ5Q29uZmlnKSA9PiB7XG4gIGNvbnN0IGNsb25lZEpzYmVhdXRpZnlDb25maWcgPSBjbG9uZShqc2JlYXV0aWZ5Q29uZmlnKTtcbiAgY2xvbmVkSnNiZWF1dGlmeUNvbmZpZy5jdXJyZW50RmlsZU1hdGNoUnVsZXMgPSB7fTtcblxuICBmb3IgKGNvbnN0IFtnbG9iU3RyaW5nLCBnbG9iRmlsZUNvbmZpZ10gb2YgT2JqZWN0LmVudHJpZXMoY2xvbmVkSnNiZWF1dGlmeUNvbmZpZy5jdXN0b20pKSB7XG4gICAgZm9yIChjb25zdCBbcHJlZk5hbWUsIGdsb2JQcmVmVmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGdsb2JGaWxlQ29uZmlnKSkge1xuICAgICAgaWYgKGlzTWF0Y2hpbmdHbG9iKGdsb2JTdHJpbmcpKSB7XG4gICAgICAgIGNsb25lZEpzYmVhdXRpZnlDb25maWcuY3VycmVudEZpbGVNYXRjaFJ1bGVzW3ByZWZOYW1lXSA9IGdsb2JQcmVmVmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNsb25lZEpzYmVhdXRpZnlDb25maWc7XG59O1xuXG4vLyBDbG9uZXMgYW5kIGV4dGVuZHMgYSBnaXZlbiAuanNiZWF1dGlmeXJjIHdpdGggc29tZSBhZGRpdG9uYWwgY3VzdG9tIG9wdGlvbnNcbi8vIHJldHJpZXZlZCBmcm9tIHRoZSBlZGl0b3Igc2V0dGluZ3MuXG5leHBvcnQgY29uc3QgZXh0ZW5kSnNiZWF1dGlmeUNvbmZpZ1dpdGhFZGl0b3JPdmVycmlkZXMgPSAoanNiZWF1dGlmeUNvbmZpZykgPT4ge1xuICBjb25zdCBjbG9uZWRKc2JlYXV0aWZ5Q29uZmlnID0gY2xvbmUoanNiZWF1dGlmeUNvbmZpZyk7XG4gIGNsb25lZEpzYmVhdXRpZnlDb25maWcuZWRpdG9yT3ZlcnJpZGVzID0ge307XG5cbiAgaWYgKEVESVRPUl9JTkRFTlRfU0laRSAhPT0gJz8nKSB7XG4gICAgY2xvbmVkSnNiZWF1dGlmeUNvbmZpZy5lZGl0b3JPdmVycmlkZXMuaW5kZW50X3NpemUgPSArRURJVE9SX0lOREVOVF9TSVpFO1xuICB9XG5cbiAgaWYgKEVESVRPUl9JTkRFTlRfV0lUSF9UQUJTICE9PSAnPycpIHtcbiAgICBpZiAoRURJVE9SX0lOREVOVF9XSVRIX1RBQlMgPT09ICdUcnVlJykge1xuICAgICAgY2xvbmVkSnNiZWF1dGlmeUNvbmZpZy5lZGl0b3JPdmVycmlkZXMuaW5kZW50X3dpdGhfdGFicyA9IHRydWU7XG4gICAgICBjbG9uZWRKc2JlYXV0aWZ5Q29uZmlnLmVkaXRvck92ZXJyaWRlcy5pbmRlbnRfY2hhciA9ICdcXHQnO1xuICAgIH0gZWxzZSB7XG4gICAgICBjbG9uZWRKc2JlYXV0aWZ5Q29uZmlnLmVkaXRvck92ZXJyaWRlcy5pbmRlbnRfd2l0aF90YWJzID0gZmFsc2U7XG4gICAgICBjbG9uZWRKc2JlYXV0aWZ5Q29uZmlnLmVkaXRvck92ZXJyaWRlcy5pbmRlbnRfY2hhciA9ICcgJztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gY2xvbmVkSnNiZWF1dGlmeUNvbmZpZztcbn07XG5cbi8vIENsb25lcyBhbmQgZXh0ZW5kcyBhIGdpdmVuIC5qc2JlYXV0aWZ5cmMgd2l0aCBzb21lIGFkZGl0b25hbCBtZXRhLW9wdGlvbnNcbi8vIGZvbGxvd2luZyBzb21lIHNwZWNpZmljIHJ1bGVzIHJlc3BlY3RpbmcgZ2xvYmFsIGVkaXRvciBzZXR0aW5ncy5cbmV4cG9ydCBjb25zdCBmaW5hbGl6ZUpzYmVhdXRpZnlDb25maWcgPSAoanNiZWF1dGlmeUNvbmZpZykgPT4ge1xuICBjb25zdCBleHRlbmRlZEpzYmVhdXRpZnlDb25maWcgPVxuICAgIGV4dGVuZEpzYmVhdXRpZnlDb25maWdXaXRoQ3VycmVudEZpbGVNYXRjaFJ1bGVzKFxuICAgICAgZXh0ZW5kSnNiZWF1dGlmeUNvbmZpZ1dpdGhFZGl0b3JPdmVycmlkZXMoXG4gICAgICAgIGpzYmVhdXRpZnlDb25maWcsXG4gICAgICApLFxuICAgICk7XG5cbiAgZXh0ZW5kZWRKc2JlYXV0aWZ5Q29uZmlnLmh0bWwgPSB7XG4gICAgLi4uZXh0ZW5kZWRKc2JlYXV0aWZ5Q29uZmlnLmFsbCxcbiAgICAuLi5leHRlbmRlZEpzYmVhdXRpZnlDb25maWcuaHRtbCxcbiAgICBjc3M6IGV4dGVuZGVkSnNiZWF1dGlmeUNvbmZpZy5jc3MsXG4gICAganM6IGV4dGVuZGVkSnNiZWF1dGlmeUNvbmZpZy5qcyxcbiAgICAuLi5leHRlbmRlZEpzYmVhdXRpZnlDb25maWcuY3VycmVudEZpbGVNYXRjaFJ1bGVzLFxuICAgIC4uLmV4dGVuZGVkSnNiZWF1dGlmeUNvbmZpZy5lZGl0b3JPdmVycmlkZXMsXG4gIH07XG5cbiAgZXh0ZW5kZWRKc2JlYXV0aWZ5Q29uZmlnLmNzcyA9IHtcbiAgICAuLi5leHRlbmRlZEpzYmVhdXRpZnlDb25maWcuYWxsLFxuICAgIC4uLmV4dGVuZGVkSnNiZWF1dGlmeUNvbmZpZy5jc3MsXG4gICAgLi4uZXh0ZW5kZWRKc2JlYXV0aWZ5Q29uZmlnLmN1cnJlbnRGaWxlTWF0Y2hSdWxlcyxcbiAgICAuLi5leHRlbmRlZEpzYmVhdXRpZnlDb25maWcuZWRpdG9yT3ZlcnJpZGVzLFxuICB9O1xuXG4gIGV4dGVuZGVkSnNiZWF1dGlmeUNvbmZpZy5qcyA9IHtcbiAgICAuLi5leHRlbmRlZEpzYmVhdXRpZnlDb25maWcuYWxsLFxuICAgIC4uLmV4dGVuZGVkSnNiZWF1dGlmeUNvbmZpZy5qcyxcbiAgICAuLi5leHRlbmRlZEpzYmVhdXRpZnlDb25maWcuY3VycmVudEZpbGVNYXRjaFJ1bGVzLFxuICAgIC4uLmV4dGVuZGVkSnNiZWF1dGlmeUNvbmZpZy5lZGl0b3JPdmVycmlkZXMsXG4gIH07XG5cbiAgZXh0ZW5kZWRKc2JlYXV0aWZ5Q29uZmlnLmpzb24gPSB7XG4gICAgLi4uZXh0ZW5kZWRKc2JlYXV0aWZ5Q29uZmlnLmFsbCxcbiAgICAuLi5leHRlbmRlZEpzYmVhdXRpZnlDb25maWcuanNvbixcbiAgICAuLi5leHRlbmRlZEpzYmVhdXRpZnlDb25maWcuY3VycmVudEZpbGVNYXRjaFJ1bGVzLFxuICAgIC4uLmV4dGVuZGVkSnNiZWF1dGlmeUNvbmZpZy5lZGl0b3JPdmVycmlkZXMsXG4gIH07XG5cbiAgZGVsZXRlIGV4dGVuZGVkSnNiZWF1dGlmeUNvbmZpZy5hbGw7XG4gIGRlbGV0ZSBleHRlbmRlZEpzYmVhdXRpZnlDb25maWcuY3VzdG9tO1xuICBkZWxldGUgZXh0ZW5kZWRKc2JlYXV0aWZ5Q29uZmlnLmN1cnJlbnRGaWxlTWF0Y2hSdWxlcztcbiAgZGVsZXRlIGV4dGVuZGVkSnNiZWF1dGlmeUNvbmZpZy5lZGl0b3JPdmVycmlkZXM7XG5cbiAgcmV0dXJuIGV4dGVuZGVkSnNiZWF1dGlmeUNvbmZpZztcbn07XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
