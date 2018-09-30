"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.finalizeJsbeautifyConfig = exports.extendJsbeautifyConfigWithEditorOverrides = exports.extendJsbeautifyConfigWithCurrentFileMatchRules = exports.extendJsbeautifyConfigFromEditorConfigInFolders = exports.extendJsbeautifyConfigFromFolders = exports.extendJsbeautifyConfigFromEditorConfigFile = exports.extendJsbeautifyConfigFromFile = exports.extendJsbeautifyConfig = exports.parseDefaultJsbeautifyConfig = exports.parseJsbeautifyConfig = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _path = _interopRequireDefault(require("path"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _clone = _interopRequireDefault(require("lodash/clone"));

var _promiseArrays = _interopRequireDefault(require("promise-arrays"));

var _paths = require("./paths");

var _constants = require("./constants");

var _jsonUtils = require("./jsonUtils");

var _editorconfigUtils = require("./editorconfigUtils");

var _configSanitizers = require("./configSanitizers");

var _fileUtils = require("./fileUtils");

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
// Parses a .jsbeautifyrc json file and returns a sanitized object
// with a consistent and expected format.
var parseJsbeautifyConfig =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(filePath) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = _configSanitizers.sanitizeJsbeautifyConfig;
            _context.next = 3;
            return (0, _jsonUtils.parseJSON5File)(filePath);

          case 3:
            _context.t1 = _context.sent;
            return _context.abrupt("return", (0, _context.t0)(_context.t1));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function parseJsbeautifyConfig(_x) {
    return _ref.apply(this, arguments);
  };
}(); // Parses the default .jsbeautifyrc json file coming with this plugin.


exports.parseJsbeautifyConfig = parseJsbeautifyConfig;

var parseDefaultJsbeautifyConfig = function parseDefaultJsbeautifyConfig() {
  return parseJsbeautifyConfig(_path.default.join(_paths.ROOT_DIR, '.jsbeautifyrc.defaults.json'));
}; // Clones and extends a given .jsbeautifyrc object with the one located at a
// file path. If none exists, a clone of the original is returned.


exports.parseDefaultJsbeautifyConfig = parseDefaultJsbeautifyConfig;

var extendJsbeautifyConfig = function extendJsbeautifyConfig(newJsbeautifyConfig, oldJsbeautifyConfig) {
  var oldClonedJsbeautifyConfig = (0, _clone.default)(oldJsbeautifyConfig);

  var _arr = Object.entries(newJsbeautifyConfig || {});

  for (var _i = 0; _i < _arr.length; _i++) {
    var _arr$_i = (0, _slicedToArray2.default)(_arr[_i], 2),
        fileType = _arr$_i[0],
        newFileSettings = _arr$_i[1];

    switch (fileType) {
      case 'all':
      case 'html':
      case 'css':
      case 'js':
      case 'json':
        oldClonedJsbeautifyConfig[fileType] = (0, _objectSpread2.default)({}, oldClonedJsbeautifyConfig[fileType] || {}, newFileSettings || {});
        break;

      case 'custom':
        var _arr2 = Object.entries(newFileSettings || {});

        for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
          var _arr2$_i = (0, _slicedToArray2.default)(_arr2[_i2], 2),
              globString = _arr2$_i[0],
              newGlobConfig = _arr2$_i[1];

          oldClonedJsbeautifyConfig.custom[globString] = (0, _objectSpread2.default)({}, oldClonedJsbeautifyConfig.custom[globString] || {}, newGlobConfig || {});
        }

        break;

      default:
        throw new Error("Unknown .jsbeautifyrc file type: ".concat(fileType));
    }
  }

  return oldClonedJsbeautifyConfig;
}; // Clones and extends a given .jsbeautifyrc object with the one located at a
// file path. If none exists, a clone of the original is returned.


exports.extendJsbeautifyConfig = extendJsbeautifyConfig;

var extendJsbeautifyConfigFromFile =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(filePath, oldJsbeautifyConfig) {
    var newJsbeautifyConfig;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return parseJsbeautifyConfig(filePath);

          case 2:
            newJsbeautifyConfig = _context2.sent;
            return _context2.abrupt("return", extendJsbeautifyConfig(newJsbeautifyConfig, oldJsbeautifyConfig));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function extendJsbeautifyConfigFromFile(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}(); // Clones and extends a given .jsbeautifyrc object with an .editorconfig file
// located at a file path. If none exists, a clone of the original is returned.


exports.extendJsbeautifyConfigFromFile = extendJsbeautifyConfigFromFile;

var extendJsbeautifyConfigFromEditorConfigFile =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(filePath, oldJsbeautifyConfig) {
    var newEditorConfig, newJsbeautifyConfig;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _editorconfigUtils.parseEditorConfigFile)(filePath);

          case 2:
            newEditorConfig = _context3.sent;
            newJsbeautifyConfig = (0, _configSanitizers.sanitizeJsbeautifyConfig)((0, _configSanitizers.translateEditorConfigToJsbeautifyConfig)(newEditorConfig));
            return _context3.abrupt("return", extendJsbeautifyConfig(newJsbeautifyConfig, oldJsbeautifyConfig));

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function extendJsbeautifyConfigFromEditorConfigFile(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}(); // Clones and extends a given .jsbeautifyrc object with the first one found in
// a list of folder paths. If none exists, a clone of the original is returned.


exports.extendJsbeautifyConfigFromEditorConfigFile = extendJsbeautifyConfigFromEditorConfigFile;

var extendJsbeautifyConfigFromFolders =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee4(folderPaths, oldJsbeautifyConfig) {
    var filesToCheck, newJsbeautifyConfigPath;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            filesToCheck = folderPaths.map(function (f) {
              return _path.default.join(f, '.jsbeautifyrc');
            });
            _context4.next = 3;
            return _promiseArrays.default.filter(filesToCheck, _fsExtra.default.pathExists);

          case 3:
            newJsbeautifyConfigPath = _context4.sent[0];

            if (!newJsbeautifyConfigPath) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", extendJsbeautifyConfigFromFile(newJsbeautifyConfigPath, oldJsbeautifyConfig));

          case 6:
            return _context4.abrupt("return", (0, _clone.default)(oldJsbeautifyConfig));

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function extendJsbeautifyConfigFromFolders(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}(); // Clones and extends a given .jsbeautifyrc object with the first .editorconfig
// file found in a list of folder paths. If none exists, a clone of the original
// is returned.


exports.extendJsbeautifyConfigFromFolders = extendJsbeautifyConfigFromFolders;

var extendJsbeautifyConfigFromEditorConfigInFolders =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee5(folderPaths, oldJsbeautifyConfig) {
    var filesToCheck, newEditorConfigPath;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            filesToCheck = folderPaths.map(function (f) {
              return _path.default.join(f, '.editorconfig');
            });
            _context5.next = 3;
            return _promiseArrays.default.filter(filesToCheck, _fsExtra.default.pathExists);

          case 3:
            newEditorConfigPath = _context5.sent[0];

            if (!newEditorConfigPath) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt("return", extendJsbeautifyConfigFromEditorConfigFile(newEditorConfigPath, oldJsbeautifyConfig));

          case 6:
            return _context5.abrupt("return", (0, _clone.default)(oldJsbeautifyConfig));

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function extendJsbeautifyConfigFromEditorConfigInFolders(_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}(); // Clones and extends a given .jsbeautifyrc with some additional custom options
// defined in the "custom" field, which contains globs defining additional
// prettification rules for certain files paths.


exports.extendJsbeautifyConfigFromEditorConfigInFolders = extendJsbeautifyConfigFromEditorConfigInFolders;

var extendJsbeautifyConfigWithCurrentFileMatchRules = function extendJsbeautifyConfigWithCurrentFileMatchRules(jsbeautifyConfig) {
  var clonedJsbeautifyConfig = (0, _clone.default)(jsbeautifyConfig);
  clonedJsbeautifyConfig.currentFileMatchRules = {};

  var _arr3 = Object.entries(clonedJsbeautifyConfig.custom || {});

  for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
    var _arr3$_i = (0, _slicedToArray2.default)(_arr3[_i3], 2),
        globString = _arr3$_i[0],
        globFileConfig = _arr3$_i[1];

    var _arr4 = Object.entries(globFileConfig || {});

    for (var _i4 = 0; _i4 < _arr4.length; _i4++) {
      var _arr4$_i = (0, _slicedToArray2.default)(_arr4[_i4], 2),
          prefName = _arr4$_i[0],
          globPrefValue = _arr4$_i[1];

      if ((0, _fileUtils.isMatchingGlob)(globString)) {
        clonedJsbeautifyConfig.currentFileMatchRules[prefName] = globPrefValue;
      }
    }
  }

  return clonedJsbeautifyConfig;
}; // Clones and extends a given .jsbeautifyrc with some additional custom options
// retrieved from the editor settings.


exports.extendJsbeautifyConfigWithCurrentFileMatchRules = extendJsbeautifyConfigWithCurrentFileMatchRules;

var extendJsbeautifyConfigWithEditorOverrides = function extendJsbeautifyConfigWithEditorOverrides(jsbeautifyConfig) {
  var clonedJsbeautifyConfig = (0, _clone.default)(jsbeautifyConfig);
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
}; // Clones and extends a given .jsbeautifyrc with some additional meta-options
// following some specific rules respecting global editor settings.


exports.extendJsbeautifyConfigWithEditorOverrides = extendJsbeautifyConfigWithEditorOverrides;

var finalizeJsbeautifyConfig = function finalizeJsbeautifyConfig(jsbeautifyConfig) {
  var extendedJsbeautifyConfig = extendJsbeautifyConfigWithCurrentFileMatchRules(extendJsbeautifyConfigWithEditorOverrides(jsbeautifyConfig));
  return {
    html: (0, _objectSpread2.default)({}, extendedJsbeautifyConfig.all || {}, extendedJsbeautifyConfig.html || {}, {
      css: extendedJsbeautifyConfig.css,
      js: extendedJsbeautifyConfig.js
    }, extendedJsbeautifyConfig.currentFileMatchRules || {}, extendedJsbeautifyConfig.editorOverrides || {}),
    css: (0, _objectSpread2.default)({}, extendedJsbeautifyConfig.all || {}, extendedJsbeautifyConfig.css || {}, extendedJsbeautifyConfig.currentFileMatchRules || {}, extendedJsbeautifyConfig.editorOverrides || {}),
    js: (0, _objectSpread2.default)({}, extendedJsbeautifyConfig.all || {}, extendedJsbeautifyConfig.js || {}, extendedJsbeautifyConfig.currentFileMatchRules || {}, extendedJsbeautifyConfig.editorOverrides || {}),
    json: (0, _objectSpread2.default)({}, extendedJsbeautifyConfig.all || {}, extendedJsbeautifyConfig.json || {}, extendedJsbeautifyConfig.currentFileMatchRules || {}, extendedJsbeautifyConfig.editorOverrides || {})
  };
};

exports.finalizeJsbeautifyConfig = finalizeJsbeautifyConfig;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL2NvbmZpZ1V0aWxzLmpzIl0sIm5hbWVzIjpbInBhcnNlSnNiZWF1dGlmeUNvbmZpZyIsImZpbGVQYXRoIiwic2FuaXRpemVKc2JlYXV0aWZ5Q29uZmlnIiwicGFyc2VEZWZhdWx0SnNiZWF1dGlmeUNvbmZpZyIsInBhdGgiLCJqb2luIiwiUk9PVF9ESVIiLCJleHRlbmRKc2JlYXV0aWZ5Q29uZmlnIiwibmV3SnNiZWF1dGlmeUNvbmZpZyIsIm9sZEpzYmVhdXRpZnlDb25maWciLCJvbGRDbG9uZWRKc2JlYXV0aWZ5Q29uZmlnIiwiT2JqZWN0IiwiZW50cmllcyIsImZpbGVUeXBlIiwibmV3RmlsZVNldHRpbmdzIiwiZ2xvYlN0cmluZyIsIm5ld0dsb2JDb25maWciLCJjdXN0b20iLCJFcnJvciIsImV4dGVuZEpzYmVhdXRpZnlDb25maWdGcm9tRmlsZSIsImV4dGVuZEpzYmVhdXRpZnlDb25maWdGcm9tRWRpdG9yQ29uZmlnRmlsZSIsIm5ld0VkaXRvckNvbmZpZyIsImV4dGVuZEpzYmVhdXRpZnlDb25maWdGcm9tRm9sZGVycyIsImZvbGRlclBhdGhzIiwiZmlsZXNUb0NoZWNrIiwibWFwIiwiZiIsInByb21pc2VBcnJheXMiLCJmaWx0ZXIiLCJmcyIsInBhdGhFeGlzdHMiLCJuZXdKc2JlYXV0aWZ5Q29uZmlnUGF0aCIsImV4dGVuZEpzYmVhdXRpZnlDb25maWdGcm9tRWRpdG9yQ29uZmlnSW5Gb2xkZXJzIiwibmV3RWRpdG9yQ29uZmlnUGF0aCIsImV4dGVuZEpzYmVhdXRpZnlDb25maWdXaXRoQ3VycmVudEZpbGVNYXRjaFJ1bGVzIiwianNiZWF1dGlmeUNvbmZpZyIsImNsb25lZEpzYmVhdXRpZnlDb25maWciLCJjdXJyZW50RmlsZU1hdGNoUnVsZXMiLCJnbG9iRmlsZUNvbmZpZyIsInByZWZOYW1lIiwiZ2xvYlByZWZWYWx1ZSIsImV4dGVuZEpzYmVhdXRpZnlDb25maWdXaXRoRWRpdG9yT3ZlcnJpZGVzIiwiZWRpdG9yT3ZlcnJpZGVzIiwiRURJVE9SX0lOREVOVF9TSVpFIiwiaW5kZW50X3NpemUiLCJFRElUT1JfSU5ERU5UX1dJVEhfVEFCUyIsImluZGVudF93aXRoX3RhYnMiLCJpbmRlbnRfY2hhciIsImZpbmFsaXplSnNiZWF1dGlmeUNvbmZpZyIsImV4dGVuZGVkSnNiZWF1dGlmeUNvbmZpZyIsImh0bWwiLCJhbGwiLCJjc3MiLCJqcyIsImpzb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBZEE7OztBQWdCQTtBQUNBO0FBQ08sSUFBTUEscUJBQXFCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw0QkFBRyxpQkFBTUMsUUFBTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBQWtCQywwQ0FBbEI7QUFBQTtBQUFBLG1CQUFpRCwrQkFBZUQsUUFBZixDQUFqRDs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQSxrQkFBckJELHFCQUFxQjtBQUFBO0FBQUE7QUFBQSxHQUEzQixDLENBRVA7Ozs7O0FBQ08sSUFBTUcsNEJBQTRCLEdBQUcsU0FBL0JBLDRCQUErQjtBQUFBLFNBQU1ILHFCQUFxQixDQUFDSSxjQUFLQyxJQUFMLENBQVVDLGVBQVYsRUFBb0IsNkJBQXBCLENBQUQsQ0FBM0I7QUFBQSxDQUFyQyxDLENBRVA7QUFDQTs7Ozs7QUFDTyxJQUFNQyxzQkFBc0IsR0FBRyxTQUF6QkEsc0JBQXlCLENBQUNDLG1CQUFELEVBQXNCQyxtQkFBdEIsRUFBOEM7QUFDbEYsTUFBTUMseUJBQXlCLEdBQUcsb0JBQU1ELG1CQUFOLENBQWxDOztBQURrRixhQUd4Q0UsTUFBTSxDQUFDQyxPQUFQLENBQWVKLG1CQUFtQixJQUFJLEVBQXRDLENBSHdDOztBQUdsRiwyQ0FBcUY7QUFBQTtBQUFBLFFBQXpFSyxRQUF5RTtBQUFBLFFBQS9EQyxlQUErRDs7QUFD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dWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uICovXG5cbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCBjbG9uZSBmcm9tICdsb2Rhc2gvY2xvbmUnO1xuaW1wb3J0IHByb21pc2VBcnJheXMgZnJvbSAncHJvbWlzZS1hcnJheXMnO1xuXG5pbXBvcnQgeyBST09UX0RJUiB9IGZyb20gJy4vcGF0aHMnO1xuaW1wb3J0IHsgRURJVE9SX0lOREVOVF9TSVpFLCBFRElUT1JfSU5ERU5UX1dJVEhfVEFCUyB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IHBhcnNlSlNPTjVGaWxlIH0gZnJvbSAnLi9qc29uVXRpbHMnO1xuaW1wb3J0IHsgcGFyc2VFZGl0b3JDb25maWdGaWxlIH0gZnJvbSAnLi9lZGl0b3Jjb25maWdVdGlscyc7XG5pbXBvcnQgeyBzYW5pdGl6ZUpzYmVhdXRpZnlDb25maWcsIHRyYW5zbGF0ZUVkaXRvckNvbmZpZ1RvSnNiZWF1dGlmeUNvbmZpZyB9IGZyb20gJy4vY29uZmlnU2FuaXRpemVycyc7XG5pbXBvcnQgeyBpc01hdGNoaW5nR2xvYiB9IGZyb20gJy4vZmlsZVV0aWxzJztcblxuLy8gUGFyc2VzIGEgLmpzYmVhdXRpZnlyYyBqc29uIGZpbGUgYW5kIHJldHVybnMgYSBzYW5pdGl6ZWQgb2JqZWN0XG4vLyB3aXRoIGEgY29uc2lzdGVudCBhbmQgZXhwZWN0ZWQgZm9ybWF0LlxuZXhwb3J0IGNvbnN0IHBhcnNlSnNiZWF1dGlmeUNvbmZpZyA9IGFzeW5jIGZpbGVQYXRoID0+IHNhbml0aXplSnNiZWF1dGlmeUNvbmZpZyhhd2FpdCBwYXJzZUpTT041RmlsZShmaWxlUGF0aCkpO1xuXG4vLyBQYXJzZXMgdGhlIGRlZmF1bHQgLmpzYmVhdXRpZnlyYyBqc29uIGZpbGUgY29taW5nIHdpdGggdGhpcyBwbHVnaW4uXG5leHBvcnQgY29uc3QgcGFyc2VEZWZhdWx0SnNiZWF1dGlmeUNvbmZpZyA9ICgpID0+IHBhcnNlSnNiZWF1dGlmeUNvbmZpZyhwYXRoLmpvaW4oUk9PVF9ESVIsICcuanNiZWF1dGlmeXJjLmRlZmF1bHRzLmpzb24nKSk7XG5cbi8vIENsb25lcyBhbmQgZXh0ZW5kcyBhIGdpdmVuIC5qc2JlYXV0aWZ5cmMgb2JqZWN0IHdpdGggdGhlIG9uZSBsb2NhdGVkIGF0IGFcbi8vIGZpbGUgcGF0aC4gSWYgbm9uZSBleGlzdHMsIGEgY2xvbmUgb2YgdGhlIG9yaWdpbmFsIGlzIHJldHVybmVkLlxuZXhwb3J0IGNvbnN0IGV4dGVuZEpzYmVhdXRpZnlDb25maWcgPSAobmV3SnNiZWF1dGlmeUNvbmZpZywgb2xkSnNiZWF1dGlmeUNvbmZpZykgPT4ge1xuICBjb25zdCBvbGRDbG9uZWRKc2JlYXV0aWZ5Q29uZmlnID0gY2xvbmUob2xkSnNiZWF1dGlmeUNvbmZpZyk7XG5cbiAgZm9yIChjb25zdCBbZmlsZVR5cGUsIG5ld0ZpbGVTZXR0aW5nc10gb2YgT2JqZWN0LmVudHJpZXMobmV3SnNiZWF1dGlmeUNvbmZpZyB8fCB7fSkpIHtcbiAgICBzd2l0Y2ggKGZpbGVUeXBlKSB7XG4gICAgICBjYXNlICdhbGwnOlxuICAgICAgY2FzZSAnaHRtbCc6XG4gICAgICBjYXNlICdjc3MnOlxuICAgICAgY2FzZSAnanMnOlxuICAgICAgY2FzZSAnanNvbic6XG4gICAgICAgIG9sZENsb25lZEpzYmVhdXRpZnlDb25maWdbZmlsZVR5cGVdID0ge1xuICAgICAgICAgIC4uLm9sZENsb25lZEpzYmVhdXRpZnlDb25maWdbZmlsZVR5cGVdIHx8IHt9LFxuICAgICAgICAgIC4uLm5ld0ZpbGVTZXR0aW5ncyB8fCB7fSxcbiAgICAgICAgfTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjdXN0b20nOlxuICAgICAgICBmb3IgKGNvbnN0IFtnbG9iU3RyaW5nLCBuZXdHbG9iQ29uZmlnXSBvZiBPYmplY3QuZW50cmllcyhuZXdGaWxlU2V0dGluZ3MgfHwge30pKSB7XG4gICAgICAgICAgb2xkQ2xvbmVkSnNiZWF1dGlmeUNvbmZpZy5jdXN0b21bZ2xvYlN0cmluZ10gPSB7XG4gICAgICAgICAgICAuLi5vbGRDbG9uZWRKc2JlYXV0aWZ5Q29uZmlnLmN1c3RvbVtnbG9iU3RyaW5nXSB8fCB7fSxcbiAgICAgICAgICAgIC4uLm5ld0dsb2JDb25maWcgfHwge30sXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biAuanNiZWF1dGlmeXJjIGZpbGUgdHlwZTogJHtmaWxlVHlwZX1gKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2xkQ2xvbmVkSnNiZWF1dGlmeUNvbmZpZztcbn07XG5cbi8vIENsb25lcyBhbmQgZXh0ZW5kcyBhIGdpdmVuIC5qc2JlYXV0aWZ5cmMgb2JqZWN0IHdpdGggdGhlIG9uZSBsb2NhdGVkIGF0IGFcbi8vIGZpbGUgcGF0aC4gSWYgbm9uZSBleGlzdHMsIGEgY2xvbmUgb2YgdGhlIG9yaWdpbmFsIGlzIHJldHVybmVkLlxuZXhwb3J0IGNvbnN0IGV4dGVuZEpzYmVhdXRpZnlDb25maWdGcm9tRmlsZSA9IGFzeW5jIChmaWxlUGF0aCwgb2xkSnNiZWF1dGlmeUNvbmZpZykgPT4ge1xuICBjb25zdCBuZXdKc2JlYXV0aWZ5Q29uZmlnID0gYXdhaXQgcGFyc2VKc2JlYXV0aWZ5Q29uZmlnKGZpbGVQYXRoKTtcbiAgcmV0dXJuIGV4dGVuZEpzYmVhdXRpZnlDb25maWcobmV3SnNiZWF1dGlmeUNvbmZpZywgb2xkSnNiZWF1dGlmeUNvbmZpZyk7XG59O1xuXG4vLyBDbG9uZXMgYW5kIGV4dGVuZHMgYSBnaXZlbiAuanNiZWF1dGlmeXJjIG9iamVjdCB3aXRoIGFuIC5lZGl0b3Jjb25maWcgZmlsZVxuLy8gbG9jYXRlZCBhdCBhIGZpbGUgcGF0aC4gSWYgbm9uZSBleGlzdHMsIGEgY2xvbmUgb2YgdGhlIG9yaWdpbmFsIGlzIHJldHVybmVkLlxuZXhwb3J0IGNvbnN0IGV4dGVuZEpzYmVhdXRpZnlDb25maWdGcm9tRWRpdG9yQ29uZmlnRmlsZSA9IGFzeW5jIChmaWxlUGF0aCwgb2xkSnNiZWF1dGlmeUNvbmZpZykgPT4ge1xuICBjb25zdCBuZXdFZGl0b3JDb25maWcgPSBhd2FpdCBwYXJzZUVkaXRvckNvbmZpZ0ZpbGUoZmlsZVBhdGgpO1xuICBjb25zdCBuZXdKc2JlYXV0aWZ5Q29uZmlnID0gc2FuaXRpemVKc2JlYXV0aWZ5Q29uZmlnKHRyYW5zbGF0ZUVkaXRvckNvbmZpZ1RvSnNiZWF1dGlmeUNvbmZpZyhuZXdFZGl0b3JDb25maWcpKTtcbiAgcmV0dXJuIGV4dGVuZEpzYmVhdXRpZnlDb25maWcobmV3SnNiZWF1dGlmeUNvbmZpZywgb2xkSnNiZWF1dGlmeUNvbmZpZyk7XG59O1xuXG4vLyBDbG9uZXMgYW5kIGV4dGVuZHMgYSBnaXZlbiAuanNiZWF1dGlmeXJjIG9iamVjdCB3aXRoIHRoZSBmaXJzdCBvbmUgZm91bmQgaW5cbi8vIGEgbGlzdCBvZiBmb2xkZXIgcGF0aHMuIElmIG5vbmUgZXhpc3RzLCBhIGNsb25lIG9mIHRoZSBvcmlnaW5hbCBpcyByZXR1cm5lZC5cbmV4cG9ydCBjb25zdCBleHRlbmRKc2JlYXV0aWZ5Q29uZmlnRnJvbUZvbGRlcnMgPSBhc3luYyAoZm9sZGVyUGF0aHMsIG9sZEpzYmVhdXRpZnlDb25maWcpID0+IHtcbiAgY29uc3QgZmlsZXNUb0NoZWNrID0gZm9sZGVyUGF0aHMubWFwKGYgPT4gcGF0aC5qb2luKGYsICcuanNiZWF1dGlmeXJjJykpO1xuICBjb25zdCBuZXdKc2JlYXV0aWZ5Q29uZmlnUGF0aCA9IChhd2FpdCBwcm9taXNlQXJyYXlzLmZpbHRlcihmaWxlc1RvQ2hlY2ssIGZzLnBhdGhFeGlzdHMpKVswXTtcblxuICBpZiAobmV3SnNiZWF1dGlmeUNvbmZpZ1BhdGgpIHtcbiAgICByZXR1cm4gZXh0ZW5kSnNiZWF1dGlmeUNvbmZpZ0Zyb21GaWxlKG5ld0pzYmVhdXRpZnlDb25maWdQYXRoLCBvbGRKc2JlYXV0aWZ5Q29uZmlnKTtcbiAgfVxuXG4gIHJldHVybiBjbG9uZShvbGRKc2JlYXV0aWZ5Q29uZmlnKTtcbn07XG5cbi8vIENsb25lcyBhbmQgZXh0ZW5kcyBhIGdpdmVuIC5qc2JlYXV0aWZ5cmMgb2JqZWN0IHdpdGggdGhlIGZpcnN0IC5lZGl0b3Jjb25maWdcbi8vIGZpbGUgZm91bmQgaW4gYSBsaXN0IG9mIGZvbGRlciBwYXRocy4gSWYgbm9uZSBleGlzdHMsIGEgY2xvbmUgb2YgdGhlIG9yaWdpbmFsXG4vLyBpcyByZXR1cm5lZC5cbmV4cG9ydCBjb25zdCBleHRlbmRKc2JlYXV0aWZ5Q29uZmlnRnJvbUVkaXRvckNvbmZpZ0luRm9sZGVycyA9IGFzeW5jIChmb2xkZXJQYXRocywgb2xkSnNiZWF1dGlmeUNvbmZpZykgPT4ge1xuICBjb25zdCBmaWxlc1RvQ2hlY2sgPSBmb2xkZXJQYXRocy5tYXAoZiA9PiBwYXRoLmpvaW4oZiwgJy5lZGl0b3Jjb25maWcnKSk7XG4gIGNvbnN0IG5ld0VkaXRvckNvbmZpZ1BhdGggPSAoYXdhaXQgcHJvbWlzZUFycmF5cy5maWx0ZXIoZmlsZXNUb0NoZWNrLCBmcy5wYXRoRXhpc3RzKSlbMF07XG5cbiAgaWYgKG5ld0VkaXRvckNvbmZpZ1BhdGgpIHtcbiAgICByZXR1cm4gZXh0ZW5kSnNiZWF1dGlmeUNvbmZpZ0Zyb21FZGl0b3JDb25maWdGaWxlKG5ld0VkaXRvckNvbmZpZ1BhdGgsIG9sZEpzYmVhdXRpZnlDb25maWcpO1xuICB9XG5cbiAgcmV0dXJuIGNsb25lKG9sZEpzYmVhdXRpZnlDb25maWcpO1xufTtcblxuLy8gQ2xvbmVzIGFuZCBleHRlbmRzIGEgZ2l2ZW4gLmpzYmVhdXRpZnlyYyB3aXRoIHNvbWUgYWRkaXRpb25hbCBjdXN0b20gb3B0aW9uc1xuLy8gZGVmaW5lZCBpbiB0aGUgXCJjdXN0b21cIiBmaWVsZCwgd2hpY2ggY29udGFpbnMgZ2xvYnMgZGVmaW5pbmcgYWRkaXRpb25hbFxuLy8gcHJldHRpZmljYXRpb24gcnVsZXMgZm9yIGNlcnRhaW4gZmlsZXMgcGF0aHMuXG5leHBvcnQgY29uc3QgZXh0ZW5kSnNiZWF1dGlmeUNvbmZpZ1dpdGhDdXJyZW50RmlsZU1hdGNoUnVsZXMgPSAoanNiZWF1dGlmeUNvbmZpZykgPT4ge1xuICBjb25zdCBjbG9uZWRKc2JlYXV0aWZ5Q29uZmlnID0gY2xvbmUoanNiZWF1dGlmeUNvbmZpZyk7XG4gIGNsb25lZEpzYmVhdXRpZnlDb25maWcuY3VycmVudEZpbGVNYXRjaFJ1bGVzID0ge307XG5cbiAgZm9yIChjb25zdCBbZ2xvYlN0cmluZywgZ2xvYkZpbGVDb25maWddIG9mIE9iamVjdC5lbnRyaWVzKGNsb25lZEpzYmVhdXRpZnlDb25maWcuY3VzdG9tIHx8IHt9KSkge1xuICAgIGZvciAoY29uc3QgW3ByZWZOYW1lLCBnbG9iUHJlZlZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhnbG9iRmlsZUNvbmZpZyB8fCB7fSkpIHtcbiAgICAgIGlmIChpc01hdGNoaW5nR2xvYihnbG9iU3RyaW5nKSkge1xuICAgICAgICBjbG9uZWRKc2JlYXV0aWZ5Q29uZmlnLmN1cnJlbnRGaWxlTWF0Y2hSdWxlc1twcmVmTmFtZV0gPSBnbG9iUHJlZlZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjbG9uZWRKc2JlYXV0aWZ5Q29uZmlnO1xufTtcblxuLy8gQ2xvbmVzIGFuZCBleHRlbmRzIGEgZ2l2ZW4gLmpzYmVhdXRpZnlyYyB3aXRoIHNvbWUgYWRkaXRpb25hbCBjdXN0b20gb3B0aW9uc1xuLy8gcmV0cmlldmVkIGZyb20gdGhlIGVkaXRvciBzZXR0aW5ncy5cbmV4cG9ydCBjb25zdCBleHRlbmRKc2JlYXV0aWZ5Q29uZmlnV2l0aEVkaXRvck92ZXJyaWRlcyA9IChqc2JlYXV0aWZ5Q29uZmlnKSA9PiB7XG4gIGNvbnN0IGNsb25lZEpzYmVhdXRpZnlDb25maWcgPSBjbG9uZShqc2JlYXV0aWZ5Q29uZmlnKTtcbiAgY2xvbmVkSnNiZWF1dGlmeUNvbmZpZy5lZGl0b3JPdmVycmlkZXMgPSB7fTtcblxuICBpZiAoRURJVE9SX0lOREVOVF9TSVpFICE9PSAnPycpIHtcbiAgICBjbG9uZWRKc2JlYXV0aWZ5Q29uZmlnLmVkaXRvck92ZXJyaWRlcy5pbmRlbnRfc2l6ZSA9ICtFRElUT1JfSU5ERU5UX1NJWkU7XG4gIH1cblxuICBpZiAoRURJVE9SX0lOREVOVF9XSVRIX1RBQlMgIT09ICc/Jykge1xuICAgIGlmIChFRElUT1JfSU5ERU5UX1dJVEhfVEFCUyA9PT0gJ1RydWUnKSB7XG4gICAgICBjbG9uZWRKc2JlYXV0aWZ5Q29uZmlnLmVkaXRvck92ZXJyaWRlcy5pbmRlbnRfd2l0aF90YWJzID0gdHJ1ZTtcbiAgICAgIGNsb25lZEpzYmVhdXRpZnlDb25maWcuZWRpdG9yT3ZlcnJpZGVzLmluZGVudF9jaGFyID0gJ1xcdCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNsb25lZEpzYmVhdXRpZnlDb25maWcuZWRpdG9yT3ZlcnJpZGVzLmluZGVudF93aXRoX3RhYnMgPSBmYWxzZTtcbiAgICAgIGNsb25lZEpzYmVhdXRpZnlDb25maWcuZWRpdG9yT3ZlcnJpZGVzLmluZGVudF9jaGFyID0gJyAnO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjbG9uZWRKc2JlYXV0aWZ5Q29uZmlnO1xufTtcblxuLy8gQ2xvbmVzIGFuZCBleHRlbmRzIGEgZ2l2ZW4gLmpzYmVhdXRpZnlyYyB3aXRoIHNvbWUgYWRkaXRpb25hbCBtZXRhLW9wdGlvbnNcbi8vIGZvbGxvd2luZyBzb21lIHNwZWNpZmljIHJ1bGVzIHJlc3BlY3RpbmcgZ2xvYmFsIGVkaXRvciBzZXR0aW5ncy5cbmV4cG9ydCBjb25zdCBmaW5hbGl6ZUpzYmVhdXRpZnlDb25maWcgPSAoanNiZWF1dGlmeUNvbmZpZykgPT4ge1xuICBjb25zdCBleHRlbmRlZEpzYmVhdXRpZnlDb25maWcgPSBleHRlbmRKc2JlYXV0aWZ5Q29uZmlnV2l0aEN1cnJlbnRGaWxlTWF0Y2hSdWxlcyhcbiAgICBleHRlbmRKc2JlYXV0aWZ5Q29uZmlnV2l0aEVkaXRvck92ZXJyaWRlcyhcbiAgICAgIGpzYmVhdXRpZnlDb25maWcsXG4gICAgKSxcbiAgKTtcblxuICByZXR1cm4ge1xuICAgIGh0bWw6IHtcbiAgICAgIC4uLmV4dGVuZGVkSnNiZWF1dGlmeUNvbmZpZy5hbGwgfHwge30sXG4gICAgICAuLi5leHRlbmRlZEpzYmVhdXRpZnlDb25maWcuaHRtbCB8fCB7fSxcbiAgICAgIGNzczogZXh0ZW5kZWRKc2JlYXV0aWZ5Q29uZmlnLmNzcyxcbiAgICAgIGpzOiBleHRlbmRlZEpzYmVhdXRpZnlDb25maWcuanMsXG4gICAgICAuLi5leHRlbmRlZEpzYmVhdXRpZnlDb25maWcuY3VycmVudEZpbGVNYXRjaFJ1bGVzIHx8IHt9LFxuICAgICAgLi4uZXh0ZW5kZWRKc2JlYXV0aWZ5Q29uZmlnLmVkaXRvck92ZXJyaWRlcyB8fCB7fSxcbiAgICB9LFxuXG4gICAgY3NzOiB7XG4gICAgICAuLi5leHRlbmRlZEpzYmVhdXRpZnlDb25maWcuYWxsIHx8IHt9LFxuICAgICAgLi4uZXh0ZW5kZWRKc2JlYXV0aWZ5Q29uZmlnLmNzcyB8fCB7fSxcbiAgICAgIC4uLmV4dGVuZGVkSnNiZWF1dGlmeUNvbmZpZy5jdXJyZW50RmlsZU1hdGNoUnVsZXMgfHwge30sXG4gICAgICAuLi5leHRlbmRlZEpzYmVhdXRpZnlDb25maWcuZWRpdG9yT3ZlcnJpZGVzIHx8IHt9LFxuICAgIH0sXG5cbiAgICBqczoge1xuICAgICAgLi4uZXh0ZW5kZWRKc2JlYXV0aWZ5Q29uZmlnLmFsbCB8fCB7fSxcbiAgICAgIC4uLmV4dGVuZGVkSnNiZWF1dGlmeUNvbmZpZy5qcyB8fCB7fSxcbiAgICAgIC4uLmV4dGVuZGVkSnNiZWF1dGlmeUNvbmZpZy5jdXJyZW50RmlsZU1hdGNoUnVsZXMgfHwge30sXG4gICAgICAuLi5leHRlbmRlZEpzYmVhdXRpZnlDb25maWcuZWRpdG9yT3ZlcnJpZGVzIHx8IHt9LFxuICAgIH0sXG5cbiAgICBqc29uOiB7XG4gICAgICAuLi5leHRlbmRlZEpzYmVhdXRpZnlDb25maWcuYWxsIHx8IHt9LFxuICAgICAgLi4uZXh0ZW5kZWRKc2JlYXV0aWZ5Q29uZmlnLmpzb24gfHwge30sXG4gICAgICAuLi5leHRlbmRlZEpzYmVhdXRpZnlDb25maWcuY3VycmVudEZpbGVNYXRjaFJ1bGVzIHx8IHt9LFxuICAgICAgLi4uZXh0ZW5kZWRKc2JlYXV0aWZ5Q29uZmlnLmVkaXRvck92ZXJyaWRlcyB8fCB7fSxcbiAgICB9LFxuICB9O1xufTtcbiJdLCJmaWxlIjoidXRpbHMvY29uZmlnVXRpbHMuanMifQ==
