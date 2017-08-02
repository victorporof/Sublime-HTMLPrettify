'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var main = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var pathsToLook, baseConfig, extendedConfig, extendedConfig2, finalConfig, bufferContents;
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
            bufferContents = _context.t0;


            if ((0, _fileUtils.isCSS)()) {
              stdio.info('Attempting to prettify what seems to be a CSS file.');
              stdio.endDiagnostics();
              stdio.beginPrettifiedCode();
              stdio.out(beautify.css(bufferContents, finalConfig.css));
              stdio.endPrettifiedCode();
            } else if ((0, _fileUtils.isHTML)(bufferContents)) {
              stdio.info('Attempting to prettify what seems to be a HTML file.');
              stdio.endDiagnostics();
              stdio.beginPrettifiedCode();
              stdio.out(beautify.html(bufferContents, finalConfig.html));
              stdio.endPrettifiedCode();
            } else if ((0, _fileUtils.isJSON)(bufferContents)) {
              stdio.info('Attempting to prettify what seems to be a JSON file.');
              stdio.endDiagnostics();
              stdio.beginPrettifiedCode();
              stdio.out(beautify.js(bufferContents, finalConfig.json));
              stdio.endPrettifiedCode();
            } else if ((0, _fileUtils.isJS)(bufferContents)) {
              stdio.info('Attempting to prettify what seems to be a JS file.');
              stdio.endDiagnostics();
              stdio.beginPrettifiedCode();
              stdio.out(beautify.js(bufferContents, finalConfig.js));
              stdio.endPrettifiedCode();
            } else {
              stdio.info('Unsupported file type');
              stdio.endDiagnostics();
              stdio.beginPrettifiedCode();
              stdio.out(bufferContents);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsic3RkaW8iLCJiZWdpbkRpYWdub3N0aWNzIiwiaW5mbyIsImNvbnN0YW50cyIsIlVTSU5HX0VESVRPUl9URVhUX1RFTVBfRklMRSIsIkdMT0JBTF9GSUxFX1JVTEVTX0pTT04iLCJSRVNQRUNUX0VESVRPUkNPTkZJR19GSUxFUyIsIkVESVRPUl9GSUxFX1NZTlRBWCIsIkVESVRPUl9JTkRFTlRfU0laRSIsIkVESVRPUl9JTkRFTlRfV0lUSF9UQUJTIiwiRURJVE9SX1RFWFRfVEVNUF9GSUxFX1BBVEgiLCJFRElUT1JfVEVYVF9URU1QX0ZJTEVfQ09OVEVOVFMiLCJPUklHSU5BTF9GSUxFX1BBVEgiLCJDT05GSUdfRVhUUkFfTE9PS1VQX1BBVEhTIiwicGF0aHNUb0xvb2siLCJwdXRpbHMiLCJnZXRQb3RlbnRpYWxDb25maWdEaXJzIiwiY3V0aWxzIiwicGFyc2VEZWZhdWx0SnNiZWF1dGlmeUNvbmZpZyIsImJhc2VDb25maWciLCJleHRlbmRKc2JlYXV0aWZ5Q29uZmlnRnJvbUZvbGRlcnMiLCJleHRlbmRlZENvbmZpZyIsImV4dGVuZEpzYmVhdXRpZnlDb25maWdGcm9tRWRpdG9yQ29uZmlnSW5Gb2xkZXJzIiwiZXh0ZW5kZWRDb25maWcyIiwiZmluYWxDb25maWciLCJmaW5hbGl6ZUpzYmVhdXRpZnlDb25maWciLCJyZWFkRmlsZSIsImVuY29kaW5nIiwiYnVmZmVyQ29udGVudHMiLCJlbmREaWFnbm9zdGljcyIsImJlZ2luUHJldHRpZmllZENvZGUiLCJvdXQiLCJiZWF1dGlmeSIsImNzcyIsImVuZFByZXR0aWZpZWRDb2RlIiwiaHRtbCIsImpzIiwianNvbiIsIm1haW4iLCJwcm9jZXNzIiwib24iLCJlcnIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozt3RUFxQkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0VBLGtCQUFNQyxnQkFBTjs7QUFFQTtBQUNBRCxrQkFBTUUsSUFBTixtQ0FBMkNDLFVBQVVD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a0MsaUJBQU47QUFDRCxhQU5NLE1BTUE7QUFDTGxDLG9CQUFNRSxJQUFOLENBQVcsdUJBQVg7QUFDQUYsb0JBQU02QixjQUFOO0FBQ0E3QixvQkFBTThCLG1CQUFOO0FBQ0E5QixvQkFBTStCLEdBQU4sQ0FBVUgsY0FBVjtBQUNBNUIsb0JBQU1rQyxpQkFBTjtBQUNEOztBQWhFSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOztrQkFBZUksSTs7Ozs7QUFqQmY7Ozs7QUFDQTs7SUFBWU4sUTs7QUFFWjs7SUFBWTdCLFM7O0FBQ1o7O0lBQVlILEs7O0FBQ1o7O0lBQVlpQixNOztBQUNaOztJQUFZRixNOztBQUNaOzs7Ozs7QUFFQXdCLFFBQVFDLEVBQVIsQ0FBVyxtQkFBWCxFQUFnQyxVQUFDQyxHQUFELEVBQVM7QUFDdkN6QyxRQUFNeUMsR0FBTixDQUFVLG9CQUFWLEVBQWdDQSxHQUFoQztBQUNELENBRkQsRSxDQWJBOzs7O0FBaUJBRixRQUFRQyxFQUFSLENBQVcsb0JBQVgsRUFBaUMsVUFBQ0MsR0FBRCxFQUFTO0FBQ3hDekMsUUFBTXlDLEdBQU4sQ0FBVSw2QkFBVixFQUF5Q0EsR0FBekM7QUFDRCxDQUZEOztBQXVFQUgiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uICovXG5cbmltcG9ydCBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgKiBhcyBiZWF1dGlmeSBmcm9tICdqcy1iZWF1dGlmeSc7XG5cbmltcG9ydCAqIGFzIGNvbnN0YW50cyBmcm9tICcuL3V0aWxzL2NvbnN0YW50cyc7XG5pbXBvcnQgKiBhcyBzdGRpbyBmcm9tICcuL3V0aWxzL3N0ZGlvVXRpbHMnO1xuaW1wb3J0ICogYXMgY3V0aWxzIGZyb20gJy4vdXRpbHMvY29uZmlnVXRpbHMnO1xuaW1wb3J0ICogYXMgcHV0aWxzIGZyb20gJy4vdXRpbHMvcGF0aFV0aWxzJztcbmltcG9ydCB7IGlzQ1NTLCBpc0hUTUwsIGlzSlNPTiwgaXNKUyB9IGZyb20gJy4vdXRpbHMvZmlsZVV0aWxzJztcblxucHJvY2Vzcy5vbigndW5jYXVnaHRFeGNlcHRpb24nLCAoZXJyKSA9PiB7XG4gIHN0ZGlvLmVycignVW5jYXVnaHQgZXhjZXB0aW9uJywgZXJyKTtcbn0pO1xuXG5wcm9jZXNzLm9uKCd1bmhhbmRsZWRSZWplY3Rpb24nLCAoZXJyKSA9PiB7XG4gIHN0ZGlvLmVycignVW5oYW5kbGVkIHByb21pc2UgcmVqZWN0aW9uJywgZXJyKTtcbn0pO1xuXG5hc3luYyBmdW5jdGlvbiBtYWluKCkge1xuICBzdGRpby5iZWdpbkRpYWdub3N0aWNzKCk7XG5cbiAgLy8gRHVtcCBzb21lIGRpYWdub3N0aWNzIG1lc3NhZ2VzLCBwYXJzZWQgb3V0IGJ5IHRoZSBwbHVnaW4uXG4gIHN0ZGlvLmluZm8oYFVzaW5nIGVkaXRvciB0ZXh0IHRlbXAgZmlsZTogJHtjb25zdGFudHMuVVNJTkdfRURJVE9SX1RFWFRfVEVNUF9GSUxFfWApO1xuXG4gIHN0ZGlvLmluZm8oYEdsb2JhbCBmaWxlIHJ1bGVzOiAke2NvbnN0YW50cy5HTE9CQUxfRklMRV9SVUxFU19KU09OfWApO1xuICBzdGRpby5pbmZvKGBSZXNwZWN0aW5nIC5lZGl0b3Jjb25maWcgZmlsZXM6ICR7Y29uc3RhbnRzLlJFU1BFQ1RfRURJVE9SQ09ORklHX0ZJTEVTfWApO1xuXG4gIHN0ZGlvLmluZm8oYEVkaXRvciBmaWxlIHN5bnRheDogJHtjb25zdGFudHMuRURJVE9SX0ZJTEVfU1lOVEFYfWApO1xuICBzdGRpby5pbmZvKGBFZGl0b3IgaW5kZW50IHNpemU6ICR7Y29uc3RhbnRzLkVESVRPUl9JTkRFTlRfU0laRX1gKTtcbiAgc3RkaW8uaW5mbyhgRWRpdG9yIGluZGVudCB3aXRoIHRhYnM6ICR7Y29uc3RhbnRzLkVESVRPUl9JTkRFTlRfV0lUSF9UQUJTfWApO1xuXG4gIHN0ZGlvLmluZm8oYEVkaXRvciB0ZXh0IGZpbGUgcGF0aDogJHtjb25zdGFudHMuRURJVE9SX1RFWFRfVEVNUF9GSUxFX1BBVEh9YCk7XG4gIHN0ZGlvLmluZm8oYEVkaXRvciB0ZXh0IGZpbGUgY29udGVudHM6ICR7Y29uc3RhbnRzLkVESVRPUl9URVhUX1RFTVBfRklMRV9DT05URU5UU31gKTtcblxuICBzdGRpby5pbmZvKGBPcmlnaW5hbCBmaWxlIHBhdGg6ICR7Y29uc3RhbnRzLk9SSUdJTkFMX0ZJTEVfUEFUSH1gKTtcbiAgc3RkaW8uaW5mbyhgQ29uZmlnIGV4dHJhIGxvb2t1cCBwYXRoczogJHtjb25zdGFudHMuQ09ORklHX0VYVFJBX0xPT0tVUF9QQVRIU31gKTtcblxuICBjb25zdCBwYXRoc1RvTG9vayA9IHB1dGlscy5nZXRQb3RlbnRpYWxDb25maWdEaXJzKCk7XG5cbiAgc3RkaW8uaW5mbyhgQ29tcHV0ZWQgZXh0cmEgbG9va3VwIHBhdGhzIGZvciAuanNiZWF1dGlmeXJjOiAke0pTT04uc3RyaW5naWZ5KHBhdGhzVG9Mb29rKX1gKTtcblxuICBjb25zdCBiYXNlQ29uZmlnID0gYXdhaXQgY3V0aWxzLnBhcnNlRGVmYXVsdEpzYmVhdXRpZnlDb25maWcoKTtcbiAgY29uc3QgZXh0ZW5kZWRDb25maWcgPSBhd2FpdCBjdXRpbHMuZXh0ZW5kSnNiZWF1dGlmeUNvbmZpZ0Zyb21Gb2xkZXJzKHBhdGhzVG9Mb29rLCBiYXNlQ29uZmlnKTtcbiAgY29uc3QgZXh0ZW5kZWRDb25maWcyID0gYXdhaXQgY3V0aWxzLmV4dGVuZEpzYmVhdXRpZnlDb25maWdGcm9tRWRpdG9yQ29uZmlnSW5Gb2xkZXJzKHBhdGhzVG9Mb29rLCBleHRlbmRlZENvbmZpZyk7XG4gIGNvbnN0IGZpbmFsQ29uZmlnID0gY3V0aWxzLmZpbmFsaXplSnNiZWF1dGlmeUNvbmZpZyhleHRlbmRlZENvbmZpZzIpO1xuXG4gIHN0ZGlvLmluZm8oYENvbXB1dGVkIHByZXR0aWZ5IG9wdGlvbnM6ICR7SlNPTi5zdHJpbmdpZnkoZmluYWxDb25maWcpfWApO1xuXG4gIGNvbnN0IGJ1ZmZlckNvbnRlbnRzID0gY29uc3RhbnRzLlVTSU5HX0VESVRPUl9URVhUX1RFTVBfRklMRSA9PT0gJ1RydWUnXG4gICAgPyBhd2FpdCBmcy5yZWFkRmlsZShjb25zdGFudHMuRURJVE9SX1RFWFRfVEVNUF9GSUxFX1BBVEgsIHsgZW5jb2Rpbmc6ICd1dGY4JyB9KVxuICAgIDogY29uc3RhbnRzLkVESVRPUl9URVhUX1RFTVBfRklMRV9DT05URU5UUztcblxuICBpZiAoaXNDU1MoKSkge1xuICAgIHN0ZGlvLmluZm8oJ0F0dGVtcHRpbmcgdG8gcHJldHRpZnkgd2hhdCBzZWVtcyB0byBiZSBhIENTUyBmaWxlLicpO1xuICAgIHN0ZGlvLmVuZERpYWdub3N0aWNzKCk7XG4gICAgc3RkaW8uYmVnaW5QcmV0dGlmaWVkQ29kZSgpO1xuICAgIHN0ZGlvLm91dChiZWF1dGlmeS5jc3MoYnVmZmVyQ29udGVudHMsIGZpbmFsQ29uZmlnLmNzcykpO1xuICAgIHN0ZGlvLmVuZFByZXR0aWZpZWRDb2RlKCk7XG4gIH0gZWxzZSBpZiAoaXNIVE1MKGJ1ZmZlckNvbnRlbnRzKSkge1xuICAgIHN0ZGlvLmluZm8oJ0F0dGVtcHRpbmcgdG8gcHJldHRpZnkgd2hhdCBzZWVtcyB0byBiZSBhIEhUTUwgZmlsZS4nKTtcbiAgICBzdGRpby5lbmREaWFnbm9zdGljcygpO1xuICAgIHN0ZGlvLmJlZ2luUHJldHRpZmllZENvZGUoKTtcbiAgICBzdGRpby5vdXQoYmVhdXRpZnkuaHRtbChidWZmZXJDb250ZW50cywgZmluYWxDb25maWcuaHRtbCkpO1xuICAgIHN0ZGlvLmVuZFByZXR0aWZpZWRDb2RlKCk7XG4gIH0gZWxzZSBpZiAoaXNKU09OKGJ1ZmZlckNvbnRlbnRzKSkge1xuICAgIHN0ZGlvLmluZm8oJ0F0dGVtcHRpbmcgdG8gcHJldHRpZnkgd2hhdCBzZWVtcyB0byBiZSBhIEpTT04gZmlsZS4nKTtcbiAgICBzdGRpby5lbmREaWFnbm9zdGljcygpO1xuICAgIHN0ZGlvLmJlZ2luUHJldHRpZmllZENvZGUoKTtcbiAgICBzdGRpby5vdXQoYmVhdXRpZnkuanMoYnVmZmVyQ29udGVudHMsIGZpbmFsQ29uZmlnLmpzb24pKTtcbiAgICBzdGRpby5lbmRQcmV0dGlmaWVkQ29kZSgpO1xuICB9IGVsc2UgaWYgKGlzSlMoYnVmZmVyQ29udGVudHMpKSB7XG4gICAgc3RkaW8uaW5mbygnQXR0ZW1wdGluZyB0byBwcmV0dGlmeSB3aGF0IHNlZW1zIHRvIGJlIGEgSlMgZmlsZS4nKTtcbiAgICBzdGRpby5lbmREaWFnbm9zdGljcygpO1xuICAgIHN0ZGlvLmJlZ2luUHJldHRpZmllZENvZGUoKTtcbiAgICBzdGRpby5vdXQoYmVhdXRpZnkuanMoYnVmZmVyQ29udGVudHMsIGZpbmFsQ29uZmlnLmpzKSk7XG4gICAgc3RkaW8uZW5kUHJldHRpZmllZENvZGUoKTtcbiAgfSBlbHNlIHtcbiAgICBzdGRpby5pbmZvKCdVbnN1cHBvcnRlZCBmaWxlIHR5cGUnKTtcbiAgICBzdGRpby5lbmREaWFnbm9zdGljcygpO1xuICAgIHN0ZGlvLmJlZ2luUHJldHRpZmllZENvZGUoKTtcbiAgICBzdGRpby5vdXQoYnVmZmVyQ29udGVudHMpO1xuICAgIHN0ZGlvLmVuZFByZXR0aWZpZWRDb2RlKCk7XG4gIH1cbn1cblxubWFpbigpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
