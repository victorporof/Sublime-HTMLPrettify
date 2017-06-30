'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var main = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var baseConfig, pathsToLook, extendedConfig, extendedConfig2, finalConfig, fileContents;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            stdio.beginDiagnostics();

            // Dump some diagnostics messages, parsed out by the plugin.
            stdio.info('Using editor file syntax: ' + constants.EDITOR_FILE_SYNTAX);
            stdio.info('Using editor indent size: ' + constants.EDITOR_INDENT_SIZE);
            stdio.info('Using editor indent with tabs: ' + constants.EDITOR_INDENT_WITH_TABS);
            stdio.info('Using .editorconfig files: ' + constants.RESPECT_EDITORCONFIG_FILES);
            stdio.info('Using global file rules: ' + constants.GLOBAL_FILE_RULES_JSON);
            stdio.info('Using editor text file path: ' + constants.EDITOR_TEXT_FILE_PATH);
            stdio.info('Using original file path: ' + constants.ORIGINAL_FILE_PATH);

            _context.next = 10;
            return cutils.parseDefaultJsbeautifyConfig();

          case 10:
            baseConfig = _context.sent;
            pathsToLook = putils.getPotentialConfigDirs();
            _context.next = 14;
            return cutils.extendJsbeautifyConfigFromFolders(pathsToLook, baseConfig);

          case 14:
            extendedConfig = _context.sent;
            _context.next = 17;
            return cutils.extendJsbeautifyConfigFromEditorConfigInFolders(pathsToLook, extendedConfig);

          case 17:
            extendedConfig2 = _context.sent;
            finalConfig = cutils.finalizeJsbeautifyConfig(extendedConfig2);


            stdio.info('Using paths for .jsbeautifyrc: ' + (0, _stringify2.default)(pathsToLook));
            stdio.info('Using prettify options: ' + (0, _stringify2.default)(finalConfig));

            _context.next = 23;
            return _fsExtra2.default.readFile(constants.EDITOR_TEXT_FILE_PATH, { encoding: 'utf8' });

          case 23:
            fileContents = _context.sent;


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

          case 25:
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsic3RkaW8iLCJiZWdpbkRpYWdub3N0aWNzIiwiaW5mbyIsImNvbnN0YW50cyIsIkVESVRPUl9GSUxFX1NZTlRBWCIsIkVESVRPUl9JTkRFTlRfU0laRSIsIkVESVRPUl9JTkRFTlRfV0lUSF9UQUJTIiwiUkVTUEVDVF9FRElUT1JDT05GSUdfRklMRVMiLCJHTE9CQUxfRklMRV9SVUxFU19KU09OIiwiRURJVE9SX1RFWFRfRklMRV9QQVRIIiwiT1JJR0lOQUxfRklMRV9QQVRIIiwiY3V0aWxzIiwicGFyc2VEZWZhdWx0SnNiZWF1dGlmeUNvbmZpZyIsImJhc2VDb25maWciLCJwYXRoc1RvTG9vayIsInB1dGlscyIsImdldFBvdGVudGlhbENvbmZpZ0RpcnMiLCJleHRlbmRKc2JlYXV0aWZ5Q29uZmlnRnJvbUZvbGRlcnMiLCJleHRlbmRlZENvbmZpZyIsImV4dGVuZEpzYmVhdXRpZnlDb25maWdGcm9tRWRpdG9yQ29uZmlnSW5Gb2xkZXJzIiwiZXh0ZW5kZWRDb25maWcyIiwiZmluYWxDb25maWciLCJmaW5hbGl6ZUpzYmVhdXRpZnlDb25maWciLCJyZWFkRmlsZSIsImVuY29kaW5nIiwiZmlsZUNvbnRlbnRzIiwiZW5kRGlhZ25vc3RpY3MiLCJiZWdpblByZXR0aWZpZWRDb2RlIiwib3V0IiwiYmVhdXRpZnkiLCJjc3MiLCJlbmRQcmV0dGlmaWVkQ29kZSIsImh0bWwiLCJqcyIsImpzb24iLCJtYWluIiwicHJvY2VzcyIsIm9uIiwiZXJyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7d0VBcUJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNFQSxrQkFBTUMsZ0JBQU47O0FBRUE7QUFDQUQsa0JBQU1FLElBQU4sZ0NBQXdDQyxVQUFVQyxrQkFBbEQ7QUFDQUosa0JBQU1FLElBQU4sZ0NBQXdDQyxVQUFVRSxrQkFBbEQ7QUFDQUwsa0JBQU1FLElBQU4scUNBQTZDQyxVQUFVRyx1QkFBdkQ7QUFDQU4sa0JBQU1FLElBQU4saUNBQXlDQyxVQUFVSSwwQkFBbkQ7QUFDQVAsa0JBQU1FLElBQU4sK0JBQXVDQyxVQUFVSyxzQkFBakQ7QUFDQVIsa0JBQU1FLElBQU4sbUNBQTJDQyxVQUFVTSxxQkFBckQ7QUFDQVQsa0JBQU1FLElBQU4sZ0NBQXdDQyxVQUFVTyxrQkFBbEQ7O0FBVkY7QUFBQSxtQkFZMkJDLE9BQU9DLDRCQUFQLEVBWjNCOztBQUFBO0FBWVFDLHNCQVpSO0FBYVFDLHVCQWJSLEdBYXNCQyxPQUFPQyxzQkFBUCxFQWJ0QjtBQUFBO0FBQUEsbUJBYytCTCxPQUFPTSxpQ0FBUCxDQUF5Q0gsV0FBekMsRUFBc0RELFVBQXRELENBZC9COztBQUFBO0FBY1FLLDBCQWRSO0FBQUE7QUFBQSxtQkFlZ0NQLE9BQU9RLCtDQUFQLENBQXVETCxXQUF2RCxFQUFvRUksY0FBcEUsQ0FmaEM7O0FBQUE7QUFlUUUsMkJBZlI7QUFnQlFDLHVCQWhCUixHQWdCc0JWLE9BQU9XLHdCQUFQLENBQWdDRixlQUFoQyxDQWhCdEI7OztBQWtCRXBCLGtCQUFNRSxJQUFOLHFDQUE2Qyx5QkFBZVksV0FBZixDQUE3QztBQUNBZCxrQkFBTUUsSUFBTiw4QkFBc0MseUJBQWVtQixXQUFmLENBQXRDOztBQW5CRjtBQUFBLG1CQXFCNkIsa0JBQUdFLFFBQUgsQ0FBWXBCLFVBQVVNLHFCQUF0QixFQUE2QyxFQUFFZSxVQUFVLE1BQVosRUFBN0MsQ0FyQjdCOztBQUFBO0FBcUJRQyx3QkFyQlI7OztBQXVCRSxnQkFBSSx1QkFBSixFQUFhO0FBQ1h6QixvQkFBTUUsSUFBTixDQUFXLHFEQUFYO0FBQ0FGLG9CQUFNMEIsY0FBTjtBQUNBMUIsb0JBQU0yQixtQkFBTjtBQUNBM0Isb0JBQU00QixHQUFOLENBQVVDLFNBQVNDLEdBQVQsQ0FBYUwsWUFBYixFQUEyQkosWUFBWVMsR0FBdkMsQ0FBVjtBQUNBOUIsb0JBQU0rQixpQkFBTjtBQUNELGFBTkQsTUFNTyxJQUFJLHVCQUFPTixZQUFQLENBQUosRUFBMEI7QUFDL0J6QixvQkFBTUUsSUFBTixDQUFXLHNEQUFYO0FBQ0FGLG9CQUFNMEIsY0FBTjtBQUNBMUIsb0JBQU0yQixtQkFBTjtBQUNBM0Isb0JBQU00QixHQUFOLENBQVVDLFNBQVNHLElBQVQsQ0FBY1AsWUFBZCxFQUE0QkosWUFBWVcsSUFBeEMsQ0FBVjtBQUNBaEMsb0JBQU0rQixpQkFBTjtBQUNELGFBTk0sTUFNQSxJQUFJLHdCQUFKLEVBQWM7QUFDbkIvQixvQkFBTUUsSUFBTixDQUFXLHNEQUFYO0FBQ0FGLG9CQUFNMEIsY0FBTjtBQUNBMUIsb0JBQU0yQixtQkFBTjtBQUNBM0Isb0JBQU00QixHQUFOLENBQVVDLFNBQVNJLEVBQVQsQ0FBWVIsWUFBWixFQUEwQkosWUFBWWEsSUFBdEMsQ0FBVjtBQUNBbEMsb0JBQU0rQixpQkFBTjtBQUNELGFBTk0sTUFNQSxJQUFJLHFCQUFLTixZQUFMLENBQUosRUFBd0I7QUFDN0J6QixvQkFBTUUsSUFBTixDQUFXLG9EQUFYO0FBQ0FGLG9CQUFNMEIsY0FBTjtBQUNBMUIsb0JBQU0yQixtQkFBTjtBQUNBM0Isb0JBQU00QixHQUFOLENBQVVDLFNBQVNJLEVBQVQsQ0FBWVIsWUFBWixFQUEwQkosWUFBWVksRUFBdEMsQ0FBVjtBQUNBakMsb0JBQU0rQixpQkFBTjtBQUNELGFBTk0sTUFNQTtBQUNML0Isb0JBQU1FLElBQU4sQ0FBVyx1QkFBWDtBQUNBRixvQkFBTTBCLGNBQU47QUFDQTFCLG9CQUFNMkIsbUJBQU47QUFDQTNCLG9CQUFNNEIsR0FBTixDQUFVSCxZQUFWO0FBQ0F6QixvQkFBTStCLGlCQUFOO0FBQ0Q7O0FBckRIO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7O2tCQUFlSSxJOzs7OztBQWpCZjs7OztBQUNBOztJQUFZTixROztBQUVaOztJQUFZMUIsUzs7QUFDWjs7SUFBWUgsSzs7QUFDWjs7SUFBWVcsTTs7QUFDWjs7SUFBWUksTTs7QUFDWjs7Ozs7O0FBRUFxQixRQUFRQyxFQUFSLENBQVcsbUJBQVgsRUFBZ0MsVUFBQ0MsR0FBRCxFQUFTO0FBQ3ZDdEMsUUFBTXNDLEdBQU4sQ0FBVSxvQkFBVixFQUFnQ0EsR0FBaEM7QUFDRCxDQUZELEUsQ0FiQTs7OztBQWlCQUYsUUFBUUMsRUFBUixDQUFXLG9CQUFYLEVBQWlDLFVBQUNDLEdBQUQsRUFBUztBQUN4Q3RDLFFBQU1zQyxHQUFOLENBQVUsNkJBQVYsRUFBeUNBLEdBQXpDO0FBQ0QsQ0FGRDs7QUE0REFIIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLiAqL1xuXG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0ICogYXMgYmVhdXRpZnkgZnJvbSAnanMtYmVhdXRpZnknO1xuXG5pbXBvcnQgKiBhcyBjb25zdGFudHMgZnJvbSAnLi91dGlscy9jb25zdGFudHMnO1xuaW1wb3J0ICogYXMgc3RkaW8gZnJvbSAnLi91dGlscy9zdGRpb1V0aWxzJztcbmltcG9ydCAqIGFzIGN1dGlscyBmcm9tICcuL3V0aWxzL2NvbmZpZ1V0aWxzJztcbmltcG9ydCAqIGFzIHB1dGlscyBmcm9tICcuL3V0aWxzL3BhdGhVdGlscyc7XG5pbXBvcnQgeyBpc0NTUywgaXNIVE1MLCBpc0pTT04sIGlzSlMgfSBmcm9tICcuL3V0aWxzL2ZpbGVVdGlscyc7XG5cbnByb2Nlc3Mub24oJ3VuY2F1Z2h0RXhjZXB0aW9uJywgKGVycikgPT4ge1xuICBzdGRpby5lcnIoJ1VuY2F1Z2h0IGV4Y2VwdGlvbicsIGVycik7XG59KTtcblxucHJvY2Vzcy5vbigndW5oYW5kbGVkUmVqZWN0aW9uJywgKGVycikgPT4ge1xuICBzdGRpby5lcnIoJ1VuaGFuZGxlZCBwcm9taXNlIHJlamVjdGlvbicsIGVycik7XG59KTtcblxuYXN5bmMgZnVuY3Rpb24gbWFpbigpIHtcbiAgc3RkaW8uYmVnaW5EaWFnbm9zdGljcygpO1xuXG4gIC8vIER1bXAgc29tZSBkaWFnbm9zdGljcyBtZXNzYWdlcywgcGFyc2VkIG91dCBieSB0aGUgcGx1Z2luLlxuICBzdGRpby5pbmZvKGBVc2luZyBlZGl0b3IgZmlsZSBzeW50YXg6ICR7Y29uc3RhbnRzLkVESVRPUl9GSUxFX1NZTlRBWH1gKTtcbiAgc3RkaW8uaW5mbyhgVXNpbmcgZWRpdG9yIGluZGVudCBzaXplOiAke2NvbnN0YW50cy5FRElUT1JfSU5ERU5UX1NJWkV9YCk7XG4gIHN0ZGlvLmluZm8oYFVzaW5nIGVkaXRvciBpbmRlbnQgd2l0aCB0YWJzOiAke2NvbnN0YW50cy5FRElUT1JfSU5ERU5UX1dJVEhfVEFCU31gKTtcbiAgc3RkaW8uaW5mbyhgVXNpbmcgLmVkaXRvcmNvbmZpZyBmaWxlczogJHtjb25zdGFudHMuUkVTUEVDVF9FRElUT1JDT05GSUdfRklMRVN9YCk7XG4gIHN0ZGlvLmluZm8oYFVzaW5nIGdsb2JhbCBmaWxlIHJ1bGVzOiAke2NvbnN0YW50cy5HTE9CQUxfRklMRV9SVUxFU19KU09OfWApO1xuICBzdGRpby5pbmZvKGBVc2luZyBlZGl0b3IgdGV4dCBmaWxlIHBhdGg6ICR7Y29uc3RhbnRzLkVESVRPUl9URVhUX0ZJTEVfUEFUSH1gKTtcbiAgc3RkaW8uaW5mbyhgVXNpbmcgb3JpZ2luYWwgZmlsZSBwYXRoOiAke2NvbnN0YW50cy5PUklHSU5BTF9GSUxFX1BBVEh9YCk7XG5cbiAgY29uc3QgYmFzZUNvbmZpZyA9IGF3YWl0IGN1dGlscy5wYXJzZURlZmF1bHRKc2JlYXV0aWZ5Q29uZmlnKCk7XG4gIGNvbnN0IHBhdGhzVG9Mb29rID0gcHV0aWxzLmdldFBvdGVudGlhbENvbmZpZ0RpcnMoKTtcbiAgY29uc3QgZXh0ZW5kZWRDb25maWcgPSBhd2FpdCBjdXRpbHMuZXh0ZW5kSnNiZWF1dGlmeUNvbmZpZ0Zyb21Gb2xkZXJzKHBhdGhzVG9Mb29rLCBiYXNlQ29uZmlnKTtcbiAgY29uc3QgZXh0ZW5kZWRDb25maWcyID0gYXdhaXQgY3V0aWxzLmV4dGVuZEpzYmVhdXRpZnlDb25maWdGcm9tRWRpdG9yQ29uZmlnSW5Gb2xkZXJzKHBhdGhzVG9Mb29rLCBleHRlbmRlZENvbmZpZyk7XG4gIGNvbnN0IGZpbmFsQ29uZmlnID0gY3V0aWxzLmZpbmFsaXplSnNiZWF1dGlmeUNvbmZpZyhleHRlbmRlZENvbmZpZzIpO1xuXG4gIHN0ZGlvLmluZm8oYFVzaW5nIHBhdGhzIGZvciAuanNiZWF1dGlmeXJjOiAke0pTT04uc3RyaW5naWZ5KHBhdGhzVG9Mb29rKX1gKTtcbiAgc3RkaW8uaW5mbyhgVXNpbmcgcHJldHRpZnkgb3B0aW9uczogJHtKU09OLnN0cmluZ2lmeShmaW5hbENvbmZpZyl9YCk7XG5cbiAgY29uc3QgZmlsZUNvbnRlbnRzID0gYXdhaXQgZnMucmVhZEZpbGUoY29uc3RhbnRzLkVESVRPUl9URVhUX0ZJTEVfUEFUSCwgeyBlbmNvZGluZzogJ3V0ZjgnIH0pO1xuXG4gIGlmIChpc0NTUygpKSB7XG4gICAgc3RkaW8uaW5mbygnQXR0ZW1wdGluZyB0byBwcmV0dGlmeSB3aGF0IHNlZW1zIHRvIGJlIGEgQ1NTIGZpbGUuJyk7XG4gICAgc3RkaW8uZW5kRGlhZ25vc3RpY3MoKTtcbiAgICBzdGRpby5iZWdpblByZXR0aWZpZWRDb2RlKCk7XG4gICAgc3RkaW8ub3V0KGJlYXV0aWZ5LmNzcyhmaWxlQ29udGVudHMsIGZpbmFsQ29uZmlnLmNzcykpO1xuICAgIHN0ZGlvLmVuZFByZXR0aWZpZWRDb2RlKCk7XG4gIH0gZWxzZSBpZiAoaXNIVE1MKGZpbGVDb250ZW50cykpIHtcbiAgICBzdGRpby5pbmZvKCdBdHRlbXB0aW5nIHRvIHByZXR0aWZ5IHdoYXQgc2VlbXMgdG8gYmUgYSBIVE1MIGZpbGUuJyk7XG4gICAgc3RkaW8uZW5kRGlhZ25vc3RpY3MoKTtcbiAgICBzdGRpby5iZWdpblByZXR0aWZpZWRDb2RlKCk7XG4gICAgc3RkaW8ub3V0KGJlYXV0aWZ5Lmh0bWwoZmlsZUNvbnRlbnRzLCBmaW5hbENvbmZpZy5odG1sKSk7XG4gICAgc3RkaW8uZW5kUHJldHRpZmllZENvZGUoKTtcbiAgfSBlbHNlIGlmIChpc0pTT04oKSkge1xuICAgIHN0ZGlvLmluZm8oJ0F0dGVtcHRpbmcgdG8gcHJldHRpZnkgd2hhdCBzZWVtcyB0byBiZSBhIEpTT04gZmlsZS4nKTtcbiAgICBzdGRpby5lbmREaWFnbm9zdGljcygpO1xuICAgIHN0ZGlvLmJlZ2luUHJldHRpZmllZENvZGUoKTtcbiAgICBzdGRpby5vdXQoYmVhdXRpZnkuanMoZmlsZUNvbnRlbnRzLCBmaW5hbENvbmZpZy5qc29uKSk7XG4gICAgc3RkaW8uZW5kUHJldHRpZmllZENvZGUoKTtcbiAgfSBlbHNlIGlmIChpc0pTKGZpbGVDb250ZW50cykpIHtcbiAgICBzdGRpby5pbmZvKCdBdHRlbXB0aW5nIHRvIHByZXR0aWZ5IHdoYXQgc2VlbXMgdG8gYmUgYSBKUyBmaWxlLicpO1xuICAgIHN0ZGlvLmVuZERpYWdub3N0aWNzKCk7XG4gICAgc3RkaW8uYmVnaW5QcmV0dGlmaWVkQ29kZSgpO1xuICAgIHN0ZGlvLm91dChiZWF1dGlmeS5qcyhmaWxlQ29udGVudHMsIGZpbmFsQ29uZmlnLmpzKSk7XG4gICAgc3RkaW8uZW5kUHJldHRpZmllZENvZGUoKTtcbiAgfSBlbHNlIHtcbiAgICBzdGRpby5pbmZvKCdVbnN1cHBvcnRlZCBmaWxlIHR5cGUnKTtcbiAgICBzdGRpby5lbmREaWFnbm9zdGljcygpO1xuICAgIHN0ZGlvLmJlZ2luUHJldHRpZmllZENvZGUoKTtcbiAgICBzdGRpby5vdXQoZmlsZUNvbnRlbnRzKTtcbiAgICBzdGRpby5lbmRQcmV0dGlmaWVkQ29kZSgpO1xuICB9XG59XG5cbm1haW4oKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
