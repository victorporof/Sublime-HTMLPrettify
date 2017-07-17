'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var main = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var pathsToLook, baseConfig, extendedConfig, extendedConfig2, finalConfig, fileContents;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            stdio.beginDiagnostics();

            // Dump some diagnostics messages, parsed out by the plugin.
            stdio.info('Using editor text temp file: ' + constants.USING_EDITOR_TEXT_TEMP_FILE);

            stdio.info('Global file rules: ' + constants.GLOBAL_FILE_RULES_JSON);
            stdio.info('Respecting .editorconfig files: ' + constants.RESPECT_EDITORCONFIG_FILES);

            stdio.info('Editor file syntax: ' + constants.EDITOR_FILE_SYNTAX);
            stdio.info('Editor indent size: ' + constants.EDITOR_INDENT_SIZE);
            stdio.info('Editor indent with tabs: ' + constants.EDITOR_INDENT_WITH_TABS);

            stdio.info('Editor text file path: ' + constants.EDITOR_TEXT_TEMP_FILE_PATH);
            stdio.info('Editor text file contents: ' + constants.EDITOR_TEXT_TEMP_FILE_CONTENTS);

            stdio.info('Original file path: ' + constants.ORIGINAL_FILE_PATH);
            stdio.info('Config extra lookup paths: ' + constants.CONFIG_EXTRA_LOOKUP_PATHS);

            pathsToLook = putils.getPotentialConfigDirs();


            stdio.info('Computed extra lookup paths for .jsbeautifyrc: ' + (0, _stringify2.default)(pathsToLook));

            _context.next = 15;
            return cutils.parseDefaultJsbeautifyConfig();

          case 15:
            baseConfig = _context.sent;
            _context.next = 18;
            return cutils.extendJsbeautifyConfigFromFolders(pathsToLook, baseConfig);

          case 18:
            extendedConfig = _context.sent;
            _context.next = 21;
            return cutils.extendJsbeautifyConfigFromEditorConfigInFolders(pathsToLook, extendedConfig);

          case 21:
            extendedConfig2 = _context.sent;
            finalConfig = cutils.finalizeJsbeautifyConfig(extendedConfig2);


            stdio.info('Computed prettify options: ' + (0, _stringify2.default)(finalConfig));

            if (!(constants.USING_EDITOR_TEXT_TEMP_FILE === 'True')) {
              _context.next = 30;
              break;
            }

            _context.next = 27;
            return _fsExtra2.default.readFile(constants.EDITOR_TEXT_TEMP_FILE_PATH, { encoding: 'utf8' });

          case 27:
            _context.t0 = _context.sent;
            _context.next = 31;
            break;

          case 30:
            _context.t0 = constants.EDITOR_TEXT_TEMP_FILE_CONTENTS;

          case 31:
            fileContents = _context.t0;


            if ((0, _fileUtils.isCSS)()) {
              stdio.info('Attempting to prettify what seems to be a CSS file.');
              stdio.endDiagnostics();
              stdio.beginPrettifiedCode();
              stdio.out(beautify.css(fileContents, finalConfig.css));
              stdio.endPrettifiedCode();
            } else if ((0, _fileUtils.isHTML)(fileContents)) {
              stdio.info('Attempting to prettify what seems to be a HTML file.');
              stdio.endDiagnostics();
              stdio.beginPrettifiedCode();
              stdio.out(beautify.html(fileContents, finalConfig.html));
              stdio.endPrettifiedCode();
            } else if ((0, _fileUtils.isJSON)()) {
              stdio.info('Attempting to prettify what seems to be a JSON file.');
              stdio.endDiagnostics();
              stdio.beginPrettifiedCode();
              stdio.out(beautify.js(fileContents, finalConfig.json));
              stdio.endPrettifiedCode();
            } else if ((0, _fileUtils.isJS)(fileContents)) {
              stdio.info('Attempting to prettify what seems to be a JS file.');
              stdio.endDiagnostics();
              stdio.beginPrettifiedCode();
              stdio.out(beautify.js(fileContents, finalConfig.js));
              stdio.endPrettifiedCode();
            } else {
              stdio.info('Unsupported file type');
              stdio.endDiagnostics();
              stdio.beginPrettifiedCode();
              stdio.out(fileContents);
              stdio.endPrettifiedCode();
            }

          case 33:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function main() {
    return _ref.apply(this, arguments);
  };
}();

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _jsBeautify = require('js-beautify');

var beautify = _interopRequireWildcard(_jsBeautify);

var _constants = require('./utils/constants');

var constants = _interopRequireWildcard(_constants);

var _stdioUtils = require('./utils/stdioUtils');

var stdio = _interopRequireWildcard(_stdioUtils);

var _configUtils = require('./utils/configUtils');

var cutils = _interopRequireWildcard(_configUtils);

var _pathUtils = require('./utils/pathUtils');

var putils = _interopRequireWildcard(_pathUtils);

var _fileUtils = require('./utils/fileUtils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.on('uncaughtException', function (err) {
  stdio.err('Uncaught exception', err);
}); /* This Source Code Form is subject to the terms of the Mozilla Public
     * License, v. 2.0. If a copy of the MPL was not distributed with this
     * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

process.on('unhandledRejection', function (err) {
  stdio.err('Unhandled promise rejection', err);
});

main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsic3RkaW8iLCJiZWdpbkRpYWdub3N0aWNzIiwiaW5mbyIsImNvbnN0YW50cyIsIlVTSU5HX0VESVRPUl9URVhUX1RFTVBfRklMRSIsIkdMT0JBTF9GSUxFX1JVTEVTX0pTT04iLCJSRVNQRUNUX0VESVRPUkNPTkZJR19GSUxFUyIsIkVESVRPUl9GSUxFX1NZTlRBWCIsIkVESVRPUl9JTkRFTlRfU0laRSIsIkVESVRPUl9JTkRFTlRfV0lUSF9UQUJTIiwiRURJVE9SX1RFWFRfVEVNUF9GSUxFX1BBVEgiLCJFRElUT1JfVEVYVF9URU1QX0ZJTEVfQ09OVEVOVFMiLCJPUklHSU5BTF9GSUxFX1BBVEgiLCJDT05GSUdfRVhUUkFfTE9PS1VQX1BBVEhTIiwicGF0aHNUb0xvb2siLCJwdXRpbHMiLCJnZXRQb3RlbnRpYWxDb25maWdEaXJzIiwiY3V0aWxzIiwicGFyc2VEZWZhdWx0SnNiZWF1dGlmeUNvbmZpZyIsImJhc2VDb25maWciLCJleHRlbmRKc2JlYXV0aWZ5Q29uZmlnRnJvbUZvbGRlcnMiLCJleHRlbmRlZENvbmZpZyIsImV4dGVuZEpzYmVhdXRpZnlDb25maWdGcm9tRWRpdG9yQ29uZmlnSW5Gb2xkZXJzIiwiZXh0ZW5kZWRDb25maWcyIiwiZmluYWxDb25maWciLCJmaW5hbGl6ZUpzYmVhdXRpZnlDb25maWciLCJyZWFkRmlsZSIsImVuY29kaW5nIiwiZmlsZUNvbnRlbnRzIiwiZW5kRGlhZ25vc3RpY3MiLCJiZWdpblByZXR0aWZpZWRDb2RlIiwib3V0IiwiYmVhdXRpZnkiLCJjc3MiLCJlbmRQcmV0dGlmaWVkQ29kZSIsImh0bWwiLCJqcyIsImpzb24iLCJtYWluIiwicHJvY2VzcyIsIm9uIiwiZXJyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7d0VBcUJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNFQSxrQkFBTUMsZ0JBQU47O0FBRUE7QUFDQUQsa0JBQU1FLElBQU4sbUNBQTJDQyxVQUFVQywy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YUFOTSxNQU1BO0FBQ0xsQyxvQkFBTUUsSUFBTixDQUFXLHVCQUFYO0FBQ0FGLG9CQUFNNkIsY0FBTjtBQUNBN0Isb0JBQU04QixtQkFBTjtBQUNBOUIsb0JBQU0rQixHQUFOLENBQVVILFlBQVY7QUFDQTVCLG9CQUFNa0MsaUJBQU47QUFDRDs7QUFoRUg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7a0JBQWVJLEk7Ozs7O0FBakJmOzs7O0FBQ0E7O0lBQVlOLFE7O0FBRVo7O0lBQVk3QixTOztBQUNaOztJQUFZSCxLOztBQUNaOztJQUFZaUIsTTs7QUFDWjs7SUFBWUYsTTs7QUFDWjs7Ozs7O0FBRUF3QixRQUFRQyxFQUFSLENBQVcsbUJBQVgsRUFBZ0MsVUFBQ0MsR0FBRCxFQUFTO0FBQ3ZDekMsUUFBTXlDLEdBQU4sQ0FBVSxvQkFBVixFQUFnQ0EsR0FBaEM7QUFDRCxDQUZELEUsQ0FiQTs7OztBQWlCQUYsUUFBUUMsRUFBUixDQUFXLG9CQUFYLEVBQWlDLFVBQUNDLEdBQUQsRUFBUztBQUN4Q3pDLFFBQU15QyxHQUFOLENBQVUsNkJBQVYsRUFBeUNBLEdBQXpDO0FBQ0QsQ0FGRDs7QUF1RUFIIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLiAqL1xuXG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0ICogYXMgYmVhdXRpZnkgZnJvbSAnanMtYmVhdXRpZnknO1xuXG5pbXBvcnQgKiBhcyBjb25zdGFudHMgZnJvbSAnLi91dGlscy9jb25zdGFudHMnO1xuaW1wb3J0ICogYXMgc3RkaW8gZnJvbSAnLi91dGlscy9zdGRpb1V0aWxzJztcbmltcG9ydCAqIGFzIGN1dGlscyBmcm9tICcuL3V0aWxzL2NvbmZpZ1V0aWxzJztcbmltcG9ydCAqIGFzIHB1dGlscyBmcm9tICcuL3V0aWxzL3BhdGhVdGlscyc7XG5pbXBvcnQgeyBpc0NTUywgaXNIVE1MLCBpc0pTT04sIGlzSlMgfSBmcm9tICcuL3V0aWxzL2ZpbGVVdGlscyc7XG5cbnByb2Nlc3Mub24oJ3VuY2F1Z2h0RXhjZXB0aW9uJywgKGVycikgPT4ge1xuICBzdGRpby5lcnIoJ1VuY2F1Z2h0IGV4Y2VwdGlvbicsIGVycik7XG59KTtcblxucHJvY2Vzcy5vbigndW5oYW5kbGVkUmVqZWN0aW9uJywgKGVycikgPT4ge1xuICBzdGRpby5lcnIoJ1VuaGFuZGxlZCBwcm9taXNlIHJlamVjdGlvbicsIGVycik7XG59KTtcblxuYXN5bmMgZnVuY3Rpb24gbWFpbigpIHtcbiAgc3RkaW8uYmVnaW5EaWFnbm9zdGljcygpO1xuXG4gIC8vIER1bXAgc29tZSBkaWFnbm9zdGljcyBtZXNzYWdlcywgcGFyc2VkIG91dCBieSB0aGUgcGx1Z2luLlxuICBzdGRpby5pbmZvKGBVc2luZyBlZGl0b3IgdGV4dCB0ZW1wIGZpbGU6ICR7Y29uc3RhbnRzLlVTSU5HX0VESVRPUl9URVhUX1RFTVBfRklMRX1gKTtcblxuICBzdGRpby5pbmZvKGBHbG9iYWwgZmlsZSBydWxlczogJHtjb25zdGFudHMuR0xPQkFMX0ZJTEVfUlVMRVNfSlNPTn1gKTtcbiAgc3RkaW8uaW5mbyhgUmVzcGVjdGluZyAuZWRpdG9yY29uZmlnIGZpbGVzOiAke2NvbnN0YW50cy5SRVNQRUNUX0VESVRPUkNPTkZJR19GSUxFU31gKTtcblxuICBzdGRpby5pbmZvKGBFZGl0b3IgZmlsZSBzeW50YXg6ICR7Y29uc3RhbnRzLkVESVRPUl9GSUxFX1NZTlRBWH1gKTtcbiAgc3RkaW8uaW5mbyhgRWRpdG9yIGluZGVudCBzaXplOiAke2NvbnN0YW50cy5FRElUT1JfSU5ERU5UX1NJWkV9YCk7XG4gIHN0ZGlvLmluZm8oYEVkaXRvciBpbmRlbnQgd2l0aCB0YWJzOiAke2NvbnN0YW50cy5FRElUT1JfSU5ERU5UX1dJVEhfVEFCU31gKTtcblxuICBzdGRpby5pbmZvKGBFZGl0b3IgdGV4dCBmaWxlIHBhdGg6ICR7Y29uc3RhbnRzLkVESVRPUl9URVhUX1RFTVBfRklMRV9QQVRIfWApO1xuICBzdGRpby5pbmZvKGBFZGl0b3IgdGV4dCBmaWxlIGNvbnRlbnRzOiAke2NvbnN0YW50cy5FRElUT1JfVEVYVF9URU1QX0ZJTEVfQ09OVEVOVFN9YCk7XG5cbiAgc3RkaW8uaW5mbyhgT3JpZ2luYWwgZmlsZSBwYXRoOiAke2NvbnN0YW50cy5PUklHSU5BTF9GSUxFX1BBVEh9YCk7XG4gIHN0ZGlvLmluZm8oYENvbmZpZyBleHRyYSBsb29rdXAgcGF0aHM6ICR7Y29uc3RhbnRzLkNPTkZJR19FWFRSQV9MT09LVVBfUEFUSFN9YCk7XG5cbiAgY29uc3QgcGF0aHNUb0xvb2sgPSBwdXRpbHMuZ2V0UG90ZW50aWFsQ29uZmlnRGlycygpO1xuXG4gIHN0ZGlvLmluZm8oYENvbXB1dGVkIGV4dHJhIGxvb2t1cCBwYXRocyBmb3IgLmpzYmVhdXRpZnlyYzogJHtKU09OLnN0cmluZ2lmeShwYXRoc1RvTG9vayl9YCk7XG5cbiAgY29uc3QgYmFzZUNvbmZpZyA9IGF3YWl0IGN1dGlscy5wYXJzZURlZmF1bHRKc2JlYXV0aWZ5Q29uZmlnKCk7XG4gIGNvbnN0IGV4dGVuZGVkQ29uZmlnID0gYXdhaXQgY3V0aWxzLmV4dGVuZEpzYmVhdXRpZnlDb25maWdGcm9tRm9sZGVycyhwYXRoc1RvTG9vaywgYmFzZUNvbmZpZyk7XG4gIGNvbnN0IGV4dGVuZGVkQ29uZmlnMiA9IGF3YWl0IGN1dGlscy5leHRlbmRKc2JlYXV0aWZ5Q29uZmlnRnJvbUVkaXRvckNvbmZpZ0luRm9sZGVycyhwYXRoc1RvTG9vaywgZXh0ZW5kZWRDb25maWcpO1xuICBjb25zdCBmaW5hbENvbmZpZyA9IGN1dGlscy5maW5hbGl6ZUpzYmVhdXRpZnlDb25maWcoZXh0ZW5kZWRDb25maWcyKTtcblxuICBzdGRpby5pbmZvKGBDb21wdXRlZCBwcmV0dGlmeSBvcHRpb25zOiAke0pTT04uc3RyaW5naWZ5KGZpbmFsQ29uZmlnKX1gKTtcblxuICBjb25zdCBmaWxlQ29udGVudHMgPSBjb25zdGFudHMuVVNJTkdfRURJVE9SX1RFWFRfVEVNUF9GSUxFID09PSAnVHJ1ZSdcbiAgICA/IGF3YWl0IGZzLnJlYWRGaWxlKGNvbnN0YW50cy5FRElUT1JfVEVYVF9URU1QX0ZJTEVfUEFUSCwgeyBlbmNvZGluZzogJ3V0ZjgnIH0pXG4gICAgOiBjb25zdGFudHMuRURJVE9SX1RFWFRfVEVNUF9GSUxFX0NPTlRFTlRTO1xuXG4gIGlmIChpc0NTUygpKSB7XG4gICAgc3RkaW8uaW5mbygnQXR0ZW1wdGluZyB0byBwcmV0dGlmeSB3aGF0IHNlZW1zIHRvIGJlIGEgQ1NTIGZpbGUuJyk7XG4gICAgc3RkaW8uZW5kRGlhZ25vc3RpY3MoKTtcbiAgICBzdGRpby5iZWdpblByZXR0aWZpZWRDb2RlKCk7XG4gICAgc3RkaW8ub3V0KGJlYXV0aWZ5LmNzcyhmaWxlQ29udGVudHMsIGZpbmFsQ29uZmlnLmNzcykpO1xuICAgIHN0ZGlvLmVuZFByZXR0aWZpZWRDb2RlKCk7XG4gIH0gZWxzZSBpZiAoaXNIVE1MKGZpbGVDb250ZW50cykpIHtcbiAgICBzdGRpby5pbmZvKCdBdHRlbXB0aW5nIHRvIHByZXR0aWZ5IHdoYXQgc2VlbXMgdG8gYmUgYSBIVE1MIGZpbGUuJyk7XG4gICAgc3RkaW8uZW5kRGlhZ25vc3RpY3MoKTtcbiAgICBzdGRpby5iZWdpblByZXR0aWZpZWRDb2RlKCk7XG4gICAgc3RkaW8ub3V0KGJlYXV0aWZ5Lmh0bWwoZmlsZUNvbnRlbnRzLCBmaW5hbENvbmZpZy5odG1sKSk7XG4gICAgc3RkaW8uZW5kUHJldHRpZmllZENvZGUoKTtcbiAgfSBlbHNlIGlmIChpc0pTT04oKSkge1xuICAgIHN0ZGlvLmluZm8oJ0F0dGVtcHRpbmcgdG8gcHJldHRpZnkgd2hhdCBzZWVtcyB0byBiZSBhIEpTT04gZmlsZS4nKTtcbiAgICBzdGRpby5lbmREaWFnbm9zdGljcygpO1xuICAgIHN0ZGlvLmJlZ2luUHJldHRpZmllZENvZGUoKTtcbiAgICBzdGRpby5vdXQoYmVhdXRpZnkuanMoZmlsZUNvbnRlbnRzLCBmaW5hbENvbmZpZy5qc29uKSk7XG4gICAgc3RkaW8uZW5kUHJldHRpZmllZENvZGUoKTtcbiAgfSBlbHNlIGlmIChpc0pTKGZpbGVDb250ZW50cykpIHtcbiAgICBzdGRpby5pbmZvKCdBdHRlbXB0aW5nIHRvIHByZXR0aWZ5IHdoYXQgc2VlbXMgdG8gYmUgYSBKUyBmaWxlLicpO1xuICAgIHN0ZGlvLmVuZERpYWdub3N0aWNzKCk7XG4gICAgc3RkaW8uYmVnaW5QcmV0dGlmaWVkQ29kZSgpO1xuICAgIHN0ZGlvLm91dChiZWF1dGlmeS5qcyhmaWxlQ29udGVudHMsIGZpbmFsQ29uZmlnLmpzKSk7XG4gICAgc3RkaW8uZW5kUHJldHRpZmllZENvZGUoKTtcbiAgfSBlbHNlIHtcbiAgICBzdGRpby5pbmZvKCdVbnN1cHBvcnRlZCBmaWxlIHR5cGUnKTtcbiAgICBzdGRpby5lbmREaWFnbm9zdGljcygpO1xuICAgIHN0ZGlvLmJlZ2luUHJldHRpZmllZENvZGUoKTtcbiAgICBzdGRpby5vdXQoZmlsZUNvbnRlbnRzKTtcbiAgICBzdGRpby5lbmRQcmV0dGlmaWVkQ29kZSgpO1xuICB9XG59XG5cbm1haW4oKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
