"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.finalizeJsbeautifyConfig = exports.extendJsbeautifyConfigWithEditorOverrides = exports.extendJsbeautifyConfigWithCurrentFileMatchRules = exports.extendJsbeautifyConfigFromEditorConfigInFolders = exports.extendJsbeautifyConfigFromFolders = exports.extendJsbeautifyConfigFromEditorConfigFile = exports.extendJsbeautifyConfigFromFile = exports.extendJsbeautifyConfig = exports.parseDefaultJsbeautifyConfig = exports.parseJsbeautifyConfig = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("core-js/modules/es7.object.entries");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("regenerator-runtime/runtime");

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL2NvbmZpZ1V0aWxzLmpzIl0sIm5hbWVzIjpbInBhcnNlSnNiZWF1dGlmeUNvbmZpZyIsImZpbGVQYXRoIiwic2FuaXRpemVKc2JlYXV0aWZ5Q29uZmlnIiwicGFyc2VEZWZhdWx0SnNiZWF1dGlmeUNvbmZpZyIsInBhdGgiLCJqb2luIiwiUk9PVF9ESVIiLCJleHRlbmRKc2JlYXV0aWZ5Q29uZmlnIiwibmV3SnNiZWF1dGlmeUNvbmZpZyIsIm9sZEpzYmVhdXRpZnlDb25maWciLCJvbGRDbG9uZWRKc2JlYXV0aWZ5Q29uZmlnIiwiT2JqZWN0IiwiZW50cmllcyIsImZpbGVUeXBlIiwibmV3RmlsZVNldHRpbmdzIiwiZ2xvYlN0cmluZyIsIm5ld0dsb2JDb25maWciLCJjdXN0b20iLCJFcnJvciIsImV4dGVuZEpzYmVhdXRpZnlDb25maWdGcm9tRmlsZSIsImV4dGVuZEpzYmVhdXRpZnlDb25maWdGcm9tRWRpdG9yQ29uZmlnRmlsZSIsIm5ld0VkaXRvckNvbmZpZyIsImV4dGVuZEpzYmVhdXRpZnlDb25maWdGcm9tRm9sZGVycyIsImZvbGRlclBhdGhzIiwiZmlsZXNUb0NoZWNrIiwibWFwIiwiZiIsInByb21pc2VBcnJheXMiLCJmaWx0ZXIiLCJmcyIsInBhdGhFeGlzdHMiLCJuZXdKc2JlYXV0aWZ5Q29uZmlnUGF0aCIsImV4dGVuZEpzYmVhdXRpZnlDb25maWdGcm9tRWRpdG9yQ29uZmlnSW5Gb2xkZXJzIiwibmV3RWRpdG9yQ29uZmlnUGF0aCIsImV4dGVuZEpzYmVhdXRpZnlDb25maWdXaXRoQ3VycmVudEZpbGVNYXRjaFJ1bGVzIiwianNiZWF1dGlmeUNvbmZpZyIsImNsb25lZEpzYmVhdXRpZnlDb25maWciLCJjdXJyZW50RmlsZU1hdGNoUnVsZXMiLCJnbG9iRmlsZUNvbmZpZyIsInByZWZOYW1lIiwiZ2xvYlByZWZWYWx1ZSIsImV4dGVuZEpzYmVhdXRpZnlDb25maWdXaXRoRWRpdG9yT3ZlcnJpZGVzIiwiZWRpdG9yT3ZlcnJpZGVzIiwiRURJVE9SX0lOREVOVF9TSVpFIiwiaW5kZW50X3NpemUiLCJFRElUT1JfSU5ERU5UX1dJVEhfVEFCUyIsImluZGVudF93aXRoX3RhYnMiLCJpbmRlbnRfY2hhciIsImZpbmFsaXplSnNiZWF1dGlmeUNvbmZpZyIsImV4dGVuZGVkSnNiZWF1dGlmeUNvbmZpZyIsImh0bWwiLCJhbGwiLCJjc3MiLCJqcyIsImpzb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQWRBOzs7QUFnQkE7QUFDQTtBQUNPLElBQU1BLHFCQUFxQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsNEJBQUcsaUJBQU1DLFFBQU47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUFrQkMsMENBQWxCO0FBQUE7QUFBQSxtQkFBaUQsK0JBQWVELFFBQWYsQ0FBakQ7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUg7O0FBQUEsa0JBQXJCRCxxQkFBcUI7QUFBQTtBQUFBO0FBQUEsR0FBM0IsQyxDQUVQOzs7OztBQUNPLElBQU1HLDRCQUE0QixHQUFHLFNBQS9CQSw0QkFBK0I7QUFBQSxTQUFNSCxxQkFBcUIsQ0FBQ0ksY0FBS0MsSUFBTCxDQUFVQyxlQUFWLEVBQW9CLDZCQUFwQixDQUFELENBQTNCO0FBQUEsQ0FBckMsQyxDQUVQO0FBQ0E7Ozs7O0FBQ08sSUFBTUMsc0JBQXNCLEdBQUcsU0FBekJBLHNCQUF5QixDQUFDQyxtQkFBRCxFQUFzQkMsbUJBQXRCLEVBQThDO0FBQ2xGLE1BQU1DLHlCQUF5QixHQUFHLG9CQUFNRCxtQkFBTixDQUFsQzs7QUFEa0YsYUFHeENFLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlSixtQkFBbUIsSUFBSSxFQUF0QyxDQUh3Qzs7QUFHbEYsMkNBQXFGO0FBQUE7QUFBQSxRQUF6RUssUUFBeUU7QUFBQSxRQUEvREMsZUFBK0Q7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aXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLiAqL1xuXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgY2xvbmUgZnJvbSAnbG9kYXNoL2Nsb25lJztcbmltcG9ydCBwcm9taXNlQXJyYXlzIGZyb20gJ3Byb21pc2UtYXJyYXlzJztcblxuaW1wb3J0IHsgUk9PVF9ESVIgfSBmcm9tICcuL3BhdGhzJztcbmltcG9ydCB7IEVESVRPUl9JTkRFTlRfU0laRSwgRURJVE9SX0lOREVOVF9XSVRIX1RBQlMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBwYXJzZUpTT041RmlsZSB9IGZyb20gJy4vanNvblV0aWxzJztcbmltcG9ydCB7IHBhcnNlRWRpdG9yQ29uZmlnRmlsZSB9IGZyb20gJy4vZWRpdG9yY29uZmlnVXRpbHMnO1xuaW1wb3J0IHsgc2FuaXRpemVKc2JlYXV0aWZ5Q29uZmlnLCB0cmFuc2xhdGVFZGl0b3JDb25maWdUb0pzYmVhdXRpZnlDb25maWcgfSBmcm9tICcuL2NvbmZpZ1Nhbml0aXplcnMnO1xuaW1wb3J0IHsgaXNNYXRjaGluZ0dsb2IgfSBmcm9tICcuL2ZpbGVVdGlscyc7XG5cbi8vIFBhcnNlcyBhIC5qc2JlYXV0aWZ5cmMganNvbiBmaWxlIGFuZCByZXR1cm5zIGEgc2FuaXRpemVkIG9iamVjdFxuLy8gd2l0aCBhIGNvbnNpc3RlbnQgYW5kIGV4cGVjdGVkIGZvcm1hdC5cbmV4cG9ydCBjb25zdCBwYXJzZUpzYmVhdXRpZnlDb25maWcgPSBhc3luYyBmaWxlUGF0aCA9PiBzYW5pdGl6ZUpzYmVhdXRpZnlDb25maWcoYXdhaXQgcGFyc2VKU09ONUZpbGUoZmlsZVBhdGgpKTtcblxuLy8gUGFyc2VzIHRoZSBkZWZhdWx0IC5qc2JlYXV0aWZ5cmMganNvbiBmaWxlIGNvbWluZyB3aXRoIHRoaXMgcGx1Z2luLlxuZXhwb3J0IGNvbnN0IHBhcnNlRGVmYXVsdEpzYmVhdXRpZnlDb25maWcgPSAoKSA9PiBwYXJzZUpzYmVhdXRpZnlDb25maWcocGF0aC5qb2luKFJPT1RfRElSLCAnLmpzYmVhdXRpZnlyYy5kZWZhdWx0cy5qc29uJykpO1xuXG4vLyBDbG9uZXMgYW5kIGV4dGVuZHMgYSBnaXZlbiAuanNiZWF1dGlmeXJjIG9iamVjdCB3aXRoIHRoZSBvbmUgbG9jYXRlZCBhdCBhXG4vLyBmaWxlIHBhdGguIElmIG5vbmUgZXhpc3RzLCBhIGNsb25lIG9mIHRoZSBvcmlnaW5hbCBpcyByZXR1cm5lZC5cbmV4cG9ydCBjb25zdCBleHRlbmRKc2JlYXV0aWZ5Q29uZmlnID0gKG5ld0pzYmVhdXRpZnlDb25maWcsIG9sZEpzYmVhdXRpZnlDb25maWcpID0+IHtcbiAgY29uc3Qgb2xkQ2xvbmVkSnNiZWF1dGlmeUNvbmZpZyA9IGNsb25lKG9sZEpzYmVhdXRpZnlDb25maWcpO1xuXG4gIGZvciAoY29uc3QgW2ZpbGVUeXBlLCBuZXdGaWxlU2V0dGluZ3NdIG9mIE9iamVjdC5lbnRyaWVzKG5ld0pzYmVhdXRpZnlDb25maWcgfHwge30pKSB7XG4gICAgc3dpdGNoIChmaWxlVHlwZSkge1xuICAgICAgY2FzZSAnYWxsJzpcbiAgICAgIGNhc2UgJ2h0bWwnOlxuICAgICAgY2FzZSAnY3NzJzpcbiAgICAgIGNhc2UgJ2pzJzpcbiAgICAgIGNhc2UgJ2pzb24nOlxuICAgICAgICBvbGRDbG9uZWRKc2JlYXV0aWZ5Q29uZmlnW2ZpbGVUeXBlXSA9IHtcbiAgICAgICAgICAuLi5vbGRDbG9uZWRKc2JlYXV0aWZ5Q29uZmlnW2ZpbGVUeXBlXSB8fCB7fSxcbiAgICAgICAgICAuLi5uZXdGaWxlU2V0dGluZ3MgfHwge30sXG4gICAgICAgIH07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY3VzdG9tJzpcbiAgICAgICAgZm9yIChjb25zdCBbZ2xvYlN0cmluZywgbmV3R2xvYkNvbmZpZ10gb2YgT2JqZWN0LmVudHJpZXMobmV3RmlsZVNldHRpbmdzIHx8IHt9KSkge1xuICAgICAgICAgIG9sZENsb25lZEpzYmVhdXRpZnlDb25maWcuY3VzdG9tW2dsb2JTdHJpbmddID0ge1xuICAgICAgICAgICAgLi4ub2xkQ2xvbmVkSnNiZWF1dGlmeUNvbmZpZy5jdXN0b21bZ2xvYlN0cmluZ10gfHwge30sXG4gICAgICAgICAgICAuLi5uZXdHbG9iQ29uZmlnIHx8IHt9LFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gLmpzYmVhdXRpZnlyYyBmaWxlIHR5cGU6ICR7ZmlsZVR5cGV9YCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9sZENsb25lZEpzYmVhdXRpZnlDb25maWc7XG59O1xuXG4vLyBDbG9uZXMgYW5kIGV4dGVuZHMgYSBnaXZlbiAuanNiZWF1dGlmeXJjIG9iamVjdCB3aXRoIHRoZSBvbmUgbG9jYXRlZCBhdCBhXG4vLyBmaWxlIHBhdGguIElmIG5vbmUgZXhpc3RzLCBhIGNsb25lIG9mIHRoZSBvcmlnaW5hbCBpcyByZXR1cm5lZC5cbmV4cG9ydCBjb25zdCBleHRlbmRKc2JlYXV0aWZ5Q29uZmlnRnJvbUZpbGUgPSBhc3luYyAoZmlsZVBhdGgsIG9sZEpzYmVhdXRpZnlDb25maWcpID0+IHtcbiAgY29uc3QgbmV3SnNiZWF1dGlmeUNvbmZpZyA9IGF3YWl0IHBhcnNlSnNiZWF1dGlmeUNvbmZpZyhmaWxlUGF0aCk7XG4gIHJldHVybiBleHRlbmRKc2JlYXV0aWZ5Q29uZmlnKG5ld0pzYmVhdXRpZnlDb25maWcsIG9sZEpzYmVhdXRpZnlDb25maWcpO1xufTtcblxuLy8gQ2xvbmVzIGFuZCBleHRlbmRzIGEgZ2l2ZW4gLmpzYmVhdXRpZnlyYyBvYmplY3Qgd2l0aCBhbiAuZWRpdG9yY29uZmlnIGZpbGVcbi8vIGxvY2F0ZWQgYXQgYSBmaWxlIHBhdGguIElmIG5vbmUgZXhpc3RzLCBhIGNsb25lIG9mIHRoZSBvcmlnaW5hbCBpcyByZXR1cm5lZC5cbmV4cG9ydCBjb25zdCBleHRlbmRKc2JlYXV0aWZ5Q29uZmlnRnJvbUVkaXRvckNvbmZpZ0ZpbGUgPSBhc3luYyAoZmlsZVBhdGgsIG9sZEpzYmVhdXRpZnlDb25maWcpID0+IHtcbiAgY29uc3QgbmV3RWRpdG9yQ29uZmlnID0gYXdhaXQgcGFyc2VFZGl0b3JDb25maWdGaWxlKGZpbGVQYXRoKTtcbiAgY29uc3QgbmV3SnNiZWF1dGlmeUNvbmZpZyA9IHNhbml0aXplSnNiZWF1dGlmeUNvbmZpZyh0cmFuc2xhdGVFZGl0b3JDb25maWdUb0pzYmVhdXRpZnlDb25maWcobmV3RWRpdG9yQ29uZmlnKSk7XG4gIHJldHVybiBleHRlbmRKc2JlYXV0aWZ5Q29uZmlnKG5ld0pzYmVhdXRpZnlDb25maWcsIG9sZEpzYmVhdXRpZnlDb25maWcpO1xufTtcblxuLy8gQ2xvbmVzIGFuZCBleHRlbmRzIGEgZ2l2ZW4gLmpzYmVhdXRpZnlyYyBvYmplY3Qgd2l0aCB0aGUgZmlyc3Qgb25lIGZvdW5kIGluXG4vLyBhIGxpc3Qgb2YgZm9sZGVyIHBhdGhzLiBJZiBub25lIGV4aXN0cywgYSBjbG9uZSBvZiB0aGUgb3JpZ2luYWwgaXMgcmV0dXJuZWQuXG5leHBvcnQgY29uc3QgZXh0ZW5kSnNiZWF1dGlmeUNvbmZpZ0Zyb21Gb2xkZXJzID0gYXN5bmMgKGZvbGRlclBhdGhzLCBvbGRKc2JlYXV0aWZ5Q29uZmlnKSA9PiB7XG4gIGNvbnN0IGZpbGVzVG9DaGVjayA9IGZvbGRlclBhdGhzLm1hcChmID0+IHBhdGguam9pbihmLCAnLmpzYmVhdXRpZnlyYycpKTtcbiAgY29uc3QgbmV3SnNiZWF1dGlmeUNvbmZpZ1BhdGggPSAoYXdhaXQgcHJvbWlzZUFycmF5cy5maWx0ZXIoZmlsZXNUb0NoZWNrLCBmcy5wYXRoRXhpc3RzKSlbMF07XG5cbiAgaWYgKG5ld0pzYmVhdXRpZnlDb25maWdQYXRoKSB7XG4gICAgcmV0dXJuIGV4dGVuZEpzYmVhdXRpZnlDb25maWdGcm9tRmlsZShuZXdKc2JlYXV0aWZ5Q29uZmlnUGF0aCwgb2xkSnNiZWF1dGlmeUNvbmZpZyk7XG4gIH1cblxuICByZXR1cm4gY2xvbmUob2xkSnNiZWF1dGlmeUNvbmZpZyk7XG59O1xuXG4vLyBDbG9uZXMgYW5kIGV4dGVuZHMgYSBnaXZlbiAuanNiZWF1dGlmeXJjIG9iamVjdCB3aXRoIHRoZSBmaXJzdCAuZWRpdG9yY29uZmlnXG4vLyBmaWxlIGZvdW5kIGluIGEgbGlzdCBvZiBmb2xkZXIgcGF0aHMuIElmIG5vbmUgZXhpc3RzLCBhIGNsb25lIG9mIHRoZSBvcmlnaW5hbFxuLy8gaXMgcmV0dXJuZWQuXG5leHBvcnQgY29uc3QgZXh0ZW5kSnNiZWF1dGlmeUNvbmZpZ0Zyb21FZGl0b3JDb25maWdJbkZvbGRlcnMgPSBhc3luYyAoZm9sZGVyUGF0aHMsIG9sZEpzYmVhdXRpZnlDb25maWcpID0+IHtcbiAgY29uc3QgZmlsZXNUb0NoZWNrID0gZm9sZGVyUGF0aHMubWFwKGYgPT4gcGF0aC5qb2luKGYsICcuZWRpdG9yY29uZmlnJykpO1xuICBjb25zdCBuZXdFZGl0b3JDb25maWdQYXRoID0gKGF3YWl0IHByb21pc2VBcnJheXMuZmlsdGVyKGZpbGVzVG9DaGVjaywgZnMucGF0aEV4aXN0cykpWzBdO1xuXG4gIGlmIChuZXdFZGl0b3JDb25maWdQYXRoKSB7XG4gICAgcmV0dXJuIGV4dGVuZEpzYmVhdXRpZnlDb25maWdGcm9tRWRpdG9yQ29uZmlnRmlsZShuZXdFZGl0b3JDb25maWdQYXRoLCBvbGRKc2JlYXV0aWZ5Q29uZmlnKTtcbiAgfVxuXG4gIHJldHVybiBjbG9uZShvbGRKc2JlYXV0aWZ5Q29uZmlnKTtcbn07XG5cbi8vIENsb25lcyBhbmQgZXh0ZW5kcyBhIGdpdmVuIC5qc2JlYXV0aWZ5cmMgd2l0aCBzb21lIGFkZGl0aW9uYWwgY3VzdG9tIG9wdGlvbnNcbi8vIGRlZmluZWQgaW4gdGhlIFwiY3VzdG9tXCIgZmllbGQsIHdoaWNoIGNvbnRhaW5zIGdsb2JzIGRlZmluaW5nIGFkZGl0aW9uYWxcbi8vIHByZXR0aWZpY2F0aW9uIHJ1bGVzIGZvciBjZXJ0YWluIGZpbGVzIHBhdGhzLlxuZXhwb3J0IGNvbnN0IGV4dGVuZEpzYmVhdXRpZnlDb25maWdXaXRoQ3VycmVudEZpbGVNYXRjaFJ1bGVzID0gKGpzYmVhdXRpZnlDb25maWcpID0+IHtcbiAgY29uc3QgY2xvbmVkSnNiZWF1dGlmeUNvbmZpZyA9IGNsb25lKGpzYmVhdXRpZnlDb25maWcpO1xuICBjbG9uZWRKc2JlYXV0aWZ5Q29uZmlnLmN1cnJlbnRGaWxlTWF0Y2hSdWxlcyA9IHt9O1xuXG4gIGZvciAoY29uc3QgW2dsb2JTdHJpbmcsIGdsb2JGaWxlQ29uZmlnXSBvZiBPYmplY3QuZW50cmllcyhjbG9uZWRKc2JlYXV0aWZ5Q29uZmlnLmN1c3RvbSB8fCB7fSkpIHtcbiAgICBmb3IgKGNvbnN0IFtwcmVmTmFtZSwgZ2xvYlByZWZWYWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoZ2xvYkZpbGVDb25maWcgfHwge30pKSB7XG4gICAgICBpZiAoaXNNYXRjaGluZ0dsb2IoZ2xvYlN0cmluZykpIHtcbiAgICAgICAgY2xvbmVkSnNiZWF1dGlmeUNvbmZpZy5jdXJyZW50RmlsZU1hdGNoUnVsZXNbcHJlZk5hbWVdID0gZ2xvYlByZWZWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gY2xvbmVkSnNiZWF1dGlmeUNvbmZpZztcbn07XG5cbi8vIENsb25lcyBhbmQgZXh0ZW5kcyBhIGdpdmVuIC5qc2JlYXV0aWZ5cmMgd2l0aCBzb21lIGFkZGl0aW9uYWwgY3VzdG9tIG9wdGlvbnNcbi8vIHJldHJpZXZlZCBmcm9tIHRoZSBlZGl0b3Igc2V0dGluZ3MuXG5leHBvcnQgY29uc3QgZXh0ZW5kSnNiZWF1dGlmeUNvbmZpZ1dpdGhFZGl0b3JPdmVycmlkZXMgPSAoanNiZWF1dGlmeUNvbmZpZykgPT4ge1xuICBjb25zdCBjbG9uZWRKc2JlYXV0aWZ5Q29uZmlnID0gY2xvbmUoanNiZWF1dGlmeUNvbmZpZyk7XG4gIGNsb25lZEpzYmVhdXRpZnlDb25maWcuZWRpdG9yT3ZlcnJpZGVzID0ge307XG5cbiAgaWYgKEVESVRPUl9JTkRFTlRfU0laRSAhPT0gJz8nKSB7XG4gICAgY2xvbmVkSnNiZWF1dGlmeUNvbmZpZy5lZGl0b3JPdmVycmlkZXMuaW5kZW50X3NpemUgPSArRURJVE9SX0lOREVOVF9TSVpFO1xuICB9XG5cbiAgaWYgKEVESVRPUl9JTkRFTlRfV0lUSF9UQUJTICE9PSAnPycpIHtcbiAgICBpZiAoRURJVE9SX0lOREVOVF9XSVRIX1RBQlMgPT09ICdUcnVlJykge1xuICAgICAgY2xvbmVkSnNiZWF1dGlmeUNvbmZpZy5lZGl0b3JPdmVycmlkZXMuaW5kZW50X3dpdGhfdGFicyA9IHRydWU7XG4gICAgICBjbG9uZWRKc2JlYXV0aWZ5Q29uZmlnLmVkaXRvck92ZXJyaWRlcy5pbmRlbnRfY2hhciA9ICdcXHQnO1xuICAgIH0gZWxzZSB7XG4gICAgICBjbG9uZWRKc2JlYXV0aWZ5Q29uZmlnLmVkaXRvck92ZXJyaWRlcy5pbmRlbnRfd2l0aF90YWJzID0gZmFsc2U7XG4gICAgICBjbG9uZWRKc2JlYXV0aWZ5Q29uZmlnLmVkaXRvck92ZXJyaWRlcy5pbmRlbnRfY2hhciA9ICcgJztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gY2xvbmVkSnNiZWF1dGlmeUNvbmZpZztcbn07XG5cbi8vIENsb25lcyBhbmQgZXh0ZW5kcyBhIGdpdmVuIC5qc2JlYXV0aWZ5cmMgd2l0aCBzb21lIGFkZGl0aW9uYWwgbWV0YS1vcHRpb25zXG4vLyBmb2xsb3dpbmcgc29tZSBzcGVjaWZpYyBydWxlcyByZXNwZWN0aW5nIGdsb2JhbCBlZGl0b3Igc2V0dGluZ3MuXG5leHBvcnQgY29uc3QgZmluYWxpemVKc2JlYXV0aWZ5Q29uZmlnID0gKGpzYmVhdXRpZnlDb25maWcpID0+IHtcbiAgY29uc3QgZXh0ZW5kZWRKc2JlYXV0aWZ5Q29uZmlnID0gZXh0ZW5kSnNiZWF1dGlmeUNvbmZpZ1dpdGhDdXJyZW50RmlsZU1hdGNoUnVsZXMoXG4gICAgZXh0ZW5kSnNiZWF1dGlmeUNvbmZpZ1dpdGhFZGl0b3JPdmVycmlkZXMoXG4gICAgICBqc2JlYXV0aWZ5Q29uZmlnLFxuICAgICksXG4gICk7XG5cbiAgcmV0dXJuIHtcbiAgICBodG1sOiB7XG4gICAgICAuLi5leHRlbmRlZEpzYmVhdXRpZnlDb25maWcuYWxsIHx8IHt9LFxuICAgICAgLi4uZXh0ZW5kZWRKc2JlYXV0aWZ5Q29uZmlnLmh0bWwgfHwge30sXG4gICAgICBjc3M6IGV4dGVuZGVkSnNiZWF1dGlmeUNvbmZpZy5jc3MsXG4gICAgICBqczogZXh0ZW5kZWRKc2JlYXV0aWZ5Q29uZmlnLmpzLFxuICAgICAgLi4uZXh0ZW5kZWRKc2JlYXV0aWZ5Q29uZmlnLmN1cnJlbnRGaWxlTWF0Y2hSdWxlcyB8fCB7fSxcbiAgICAgIC4uLmV4dGVuZGVkSnNiZWF1dGlmeUNvbmZpZy5lZGl0b3JPdmVycmlkZXMgfHwge30sXG4gICAgfSxcblxuICAgIGNzczoge1xuICAgICAgLi4uZXh0ZW5kZWRKc2JlYXV0aWZ5Q29uZmlnLmFsbCB8fCB7fSxcbiAgICAgIC4uLmV4dGVuZGVkSnNiZWF1dGlmeUNvbmZpZy5jc3MgfHwge30sXG4gICAgICAuLi5leHRlbmRlZEpzYmVhdXRpZnlDb25maWcuY3VycmVudEZpbGVNYXRjaFJ1bGVzIHx8IHt9LFxuICAgICAgLi4uZXh0ZW5kZWRKc2JlYXV0aWZ5Q29uZmlnLmVkaXRvck92ZXJyaWRlcyB8fCB7fSxcbiAgICB9LFxuXG4gICAganM6IHtcbiAgICAgIC4uLmV4dGVuZGVkSnNiZWF1dGlmeUNvbmZpZy5hbGwgfHwge30sXG4gICAgICAuLi5leHRlbmRlZEpzYmVhdXRpZnlDb25maWcuanMgfHwge30sXG4gICAgICAuLi5leHRlbmRlZEpzYmVhdXRpZnlDb25maWcuY3VycmVudEZpbGVNYXRjaFJ1bGVzIHx8IHt9LFxuICAgICAgLi4uZXh0ZW5kZWRKc2JlYXV0aWZ5Q29uZmlnLmVkaXRvck92ZXJyaWRlcyB8fCB7fSxcbiAgICB9LFxuXG4gICAganNvbjoge1xuICAgICAgLi4uZXh0ZW5kZWRKc2JlYXV0aWZ5Q29uZmlnLmFsbCB8fCB7fSxcbiAgICAgIC4uLmV4dGVuZGVkSnNiZWF1dGlmeUNvbmZpZy5qc29uIHx8IHt9LFxuICAgICAgLi4uZXh0ZW5kZWRKc2JlYXV0aWZ5Q29uZmlnLmN1cnJlbnRGaWxlTWF0Y2hSdWxlcyB8fCB7fSxcbiAgICAgIC4uLmV4dGVuZGVkSnNiZWF1dGlmeUNvbmZpZy5lZGl0b3JPdmVycmlkZXMgfHwge30sXG4gICAgfSxcbiAgfTtcbn07XG4iXSwiZmlsZSI6InV0aWxzL2NvbmZpZ1V0aWxzLmpzIn0=
