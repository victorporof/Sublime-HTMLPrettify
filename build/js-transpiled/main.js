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

            _context.next = 13;
            return cutils.parseDefaultJsbeautifyConfig();

          case 13:
            baseConfig = _context.sent;
            pathsToLook = putils.getPotentialConfigDirs();
            _context.next = 17;
            return cutils.extendJsbeautifyConfigFromFolders(pathsToLook, baseConfig);

          case 17:
            extendedConfig = _context.sent;
            _context.next = 20;
            return cutils.extendJsbeautifyConfigFromEditorConfigInFolders(pathsToLook, extendedConfig);

          case 20:
            extendedConfig2 = _context.sent;
            finalConfig = cutils.finalizeJsbeautifyConfig(extendedConfig2);


            stdio.info('Computed paths for .jsbeautifyrc: ' + (0, _stringify2.default)(pathsToLook));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsic3RkaW8iLCJiZWdpbkRpYWdub3N0aWNzIiwiaW5mbyIsImNvbnN0YW50cyIsIlVTSU5HX0VESVRPUl9URVhUX1RFTVBfRklMRSIsIkdMT0JBTF9GSUxFX1JVTEVTX0pTT04iLCJSRVNQRUNUX0VESVRPUkNPTkZJR19GSUxFUyIsIkVESVRPUl9GSUxFX1NZTlRBWCIsIkVESVRPUl9JTkRFTlRfU0laRSIsIkVESVRPUl9JTkRFTlRfV0lUSF9UQUJTIiwiRURJVE9SX1RFWFRfVEVNUF9GSUxFX1BBVEgiLCJFRElUT1JfVEVYVF9URU1QX0ZJTEVfQ09OVEVOVFMiLCJPUklHSU5BTF9GSUxFX1BBVEgiLCJDT05GSUdfRVhUUkFfTE9PS1VQX1BBVEhTIiwiY3V0aWxzIiwicGFyc2VEZWZhdWx0SnNiZWF1dGlmeUNvbmZpZyIsImJhc2VDb25maWciLCJwYXRoc1RvTG9vayIsInB1dGlscyIsImdldFBvdGVudGlhbENvbmZpZ0RpcnMiLCJleHRlbmRKc2JlYXV0aWZ5Q29uZmlnRnJvbUZvbGRlcnMiLCJleHRlbmRlZENvbmZpZyIsImV4dGVuZEpzYmVhdXRpZnlDb25maWdGcm9tRWRpdG9yQ29uZmlnSW5Gb2xkZXJzIiwiZXh0ZW5kZWRDb25maWcyIiwiZmluYWxDb25maWciLCJmaW5hbGl6ZUpzYmVhdXRpZnlDb25maWciLCJyZWFkRmlsZSIsImVuY29kaW5nIiwiZmlsZUNvbnRlbnRzIiwiZW5kRGlhZ25vc3RpY3MiLCJiZWdpblByZXR0aWZpZWRDb2RlIiwib3V0IiwiYmVhdXRpZnkiLCJjc3MiLCJlbmRQcmV0dGlmaWVkQ29kZSIsImh0bWwiLCJqcyIsImpzb24iLCJtYWluIiwicHJvY2VzcyIsIm9uIiwiZXJyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7d0VBcUJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNFQSxrQkFBTUMsZ0JBQU47O0FBRUE7QUFDQUQsa0JBQU1FLElBQU4sbUNBQTJDQyxVQUFVQywy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TSxNQU1BO0FBQ0xsQyxvQkFBTUUsSUFBTixDQUFXLHVCQUFYO0FBQ0FGLG9CQUFNNkIsY0FBTjtBQUNBN0Isb0JBQU04QixtQkFBTjtBQUNBOUIsb0JBQU0rQixHQUFOLENBQVVILFlBQVY7QUFDQTVCLG9CQUFNa0MsaUJBQU47QUFDRDs7QUE5REg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7a0JBQWVJLEk7Ozs7O0FBakJmOzs7O0FBQ0E7O0lBQVlOLFE7O0FBRVo7O0lBQVk3QixTOztBQUNaOztJQUFZSCxLOztBQUNaOztJQUFZYyxNOztBQUNaOztJQUFZSSxNOztBQUNaOzs7Ozs7QUFFQXFCLFFBQVFDLEVBQVIsQ0FBVyxtQkFBWCxFQUFnQyxVQUFDQyxHQUFELEVBQVM7QUFDdkN6QyxRQUFNeUMsR0FBTixDQUFVLG9CQUFWLEVBQWdDQSxHQUFoQztBQUNELENBRkQsRSxDQWJBOzs7O0FBaUJBRixRQUFRQyxFQUFSLENBQVcsb0JBQVgsRUFBaUMsVUFBQ0MsR0FBRCxFQUFTO0FBQ3hDekMsUUFBTXlDLEdBQU4sQ0FBVSw2QkFBVixFQUF5Q0EsR0FBekM7QUFDRCxDQUZEOztBQXFFQUgiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uICovXG5cbmltcG9ydCBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgKiBhcyBiZWF1dGlmeSBmcm9tICdqcy1iZWF1dGlmeSc7XG5cbmltcG9ydCAqIGFzIGNvbnN0YW50cyBmcm9tICcuL3V0aWxzL2NvbnN0YW50cyc7XG5pbXBvcnQgKiBhcyBzdGRpbyBmcm9tICcuL3V0aWxzL3N0ZGlvVXRpbHMnO1xuaW1wb3J0ICogYXMgY3V0aWxzIGZyb20gJy4vdXRpbHMvY29uZmlnVXRpbHMnO1xuaW1wb3J0ICogYXMgcHV0aWxzIGZyb20gJy4vdXRpbHMvcGF0aFV0aWxzJztcbmltcG9ydCB7IGlzQ1NTLCBpc0hUTUwsIGlzSlNPTiwgaXNKUyB9IGZyb20gJy4vdXRpbHMvZmlsZVV0aWxzJztcblxucHJvY2Vzcy5vbigndW5jYXVnaHRFeGNlcHRpb24nLCAoZXJyKSA9PiB7XG4gIHN0ZGlvLmVycignVW5jYXVnaHQgZXhjZXB0aW9uJywgZXJyKTtcbn0pO1xuXG5wcm9jZXNzLm9uKCd1bmhhbmRsZWRSZWplY3Rpb24nLCAoZXJyKSA9PiB7XG4gIHN0ZGlvLmVycignVW5oYW5kbGVkIHByb21pc2UgcmVqZWN0aW9uJywgZXJyKTtcbn0pO1xuXG5hc3luYyBmdW5jdGlvbiBtYWluKCkge1xuICBzdGRpby5iZWdpbkRpYWdub3N0aWNzKCk7XG5cbiAgLy8gRHVtcCBzb21lIGRpYWdub3N0aWNzIG1lc3NhZ2VzLCBwYXJzZWQgb3V0IGJ5IHRoZSBwbHVnaW4uXG4gIHN0ZGlvLmluZm8oYFVzaW5nIGVkaXRvciB0ZXh0IHRlbXAgZmlsZTogJHtjb25zdGFudHMuVVNJTkdfRURJVE9SX1RFWFRfVEVNUF9GSUxFfWApO1xuXG4gIHN0ZGlvLmluZm8oYEdsb2JhbCBmaWxlIHJ1bGVzOiAke2NvbnN0YW50cy5HTE9CQUxfRklMRV9SVUxFU19KU09OfWApO1xuICBzdGRpby5pbmZvKGBSZXNwZWN0aW5nIC5lZGl0b3Jjb25maWcgZmlsZXM6ICR7Y29uc3RhbnRzLlJFU1BFQ1RfRURJVE9SQ09ORklHX0ZJTEVTfWApO1xuXG4gIHN0ZGlvLmluZm8oYEVkaXRvciBmaWxlIHN5bnRheDogJHtjb25zdGFudHMuRURJVE9SX0ZJTEVfU1lOVEFYfWApO1xuICBzdGRpby5pbmZvKGBFZGl0b3IgaW5kZW50IHNpemU6ICR7Y29uc3RhbnRzLkVESVRPUl9JTkRFTlRfU0laRX1gKTtcbiAgc3RkaW8uaW5mbyhgRWRpdG9yIGluZGVudCB3aXRoIHRhYnM6ICR7Y29uc3RhbnRzLkVESVRPUl9JTkRFTlRfV0lUSF9UQUJTfWApO1xuXG4gIHN0ZGlvLmluZm8oYEVkaXRvciB0ZXh0IGZpbGUgcGF0aDogJHtjb25zdGFudHMuRURJVE9SX1RFWFRfVEVNUF9GSUxFX1BBVEh9YCk7XG4gIHN0ZGlvLmluZm8oYEVkaXRvciB0ZXh0IGZpbGUgY29udGVudHM6ICR7Y29uc3RhbnRzLkVESVRPUl9URVhUX1RFTVBfRklMRV9DT05URU5UU31gKTtcblxuICBzdGRpby5pbmZvKGBPcmlnaW5hbCBmaWxlIHBhdGg6ICR7Y29uc3RhbnRzLk9SSUdJTkFMX0ZJTEVfUEFUSH1gKTtcbiAgc3RkaW8uaW5mbyhgQ29uZmlnIGV4dHJhIGxvb2t1cCBwYXRoczogJHtjb25zdGFudHMuQ09ORklHX0VYVFJBX0xPT0tVUF9QQVRIU31gKTtcblxuICBjb25zdCBiYXNlQ29uZmlnID0gYXdhaXQgY3V0aWxzLnBhcnNlRGVmYXVsdEpzYmVhdXRpZnlDb25maWcoKTtcbiAgY29uc3QgcGF0aHNUb0xvb2sgPSBwdXRpbHMuZ2V0UG90ZW50aWFsQ29uZmlnRGlycygpO1xuICBjb25zdCBleHRlbmRlZENvbmZpZyA9IGF3YWl0IGN1dGlscy5leHRlbmRKc2JlYXV0aWZ5Q29uZmlnRnJvbUZvbGRlcnMocGF0aHNUb0xvb2ssIGJhc2VDb25maWcpO1xuICBjb25zdCBleHRlbmRlZENvbmZpZzIgPSBhd2FpdCBjdXRpbHMuZXh0ZW5kSnNiZWF1dGlmeUNvbmZpZ0Zyb21FZGl0b3JDb25maWdJbkZvbGRlcnMocGF0aHNUb0xvb2ssIGV4dGVuZGVkQ29uZmlnKTtcbiAgY29uc3QgZmluYWxDb25maWcgPSBjdXRpbHMuZmluYWxpemVKc2JlYXV0aWZ5Q29uZmlnKGV4dGVuZGVkQ29uZmlnMik7XG5cbiAgc3RkaW8uaW5mbyhgQ29tcHV0ZWQgcGF0aHMgZm9yIC5qc2JlYXV0aWZ5cmM6ICR7SlNPTi5zdHJpbmdpZnkocGF0aHNUb0xvb2spfWApO1xuICBzdGRpby5pbmZvKGBDb21wdXRlZCBwcmV0dGlmeSBvcHRpb25zOiAke0pTT04uc3RyaW5naWZ5KGZpbmFsQ29uZmlnKX1gKTtcblxuICBjb25zdCBmaWxlQ29udGVudHMgPSBjb25zdGFudHMuVVNJTkdfRURJVE9SX1RFWFRfVEVNUF9GSUxFID09PSAnVHJ1ZSdcbiAgICA/IGF3YWl0IGZzLnJlYWRGaWxlKGNvbnN0YW50cy5FRElUT1JfVEVYVF9URU1QX0ZJTEVfUEFUSCwgeyBlbmNvZGluZzogJ3V0ZjgnIH0pXG4gICAgOiBjb25zdGFudHMuRURJVE9SX1RFWFRfVEVNUF9GSUxFX0NPTlRFTlRTO1xuXG4gIGlmIChpc0NTUygpKSB7XG4gICAgc3RkaW8uaW5mbygnQXR0ZW1wdGluZyB0byBwcmV0dGlmeSB3aGF0IHNlZW1zIHRvIGJlIGEgQ1NTIGZpbGUuJyk7XG4gICAgc3RkaW8uZW5kRGlhZ25vc3RpY3MoKTtcbiAgICBzdGRpby5iZWdpblByZXR0aWZpZWRDb2RlKCk7XG4gICAgc3RkaW8ub3V0KGJlYXV0aWZ5LmNzcyhmaWxlQ29udGVudHMsIGZpbmFsQ29uZmlnLmNzcykpO1xuICAgIHN0ZGlvLmVuZFByZXR0aWZpZWRDb2RlKCk7XG4gIH0gZWxzZSBpZiAoaXNIVE1MKGZpbGVDb250ZW50cykpIHtcbiAgICBzdGRpby5pbmZvKCdBdHRlbXB0aW5nIHRvIHByZXR0aWZ5IHdoYXQgc2VlbXMgdG8gYmUgYSBIVE1MIGZpbGUuJyk7XG4gICAgc3RkaW8uZW5kRGlhZ25vc3RpY3MoKTtcbiAgICBzdGRpby5iZWdpblByZXR0aWZpZWRDb2RlKCk7XG4gICAgc3RkaW8ub3V0KGJlYXV0aWZ5Lmh0bWwoZmlsZUNvbnRlbnRzLCBmaW5hbENvbmZpZy5odG1sKSk7XG4gICAgc3RkaW8uZW5kUHJldHRpZmllZENvZGUoKTtcbiAgfSBlbHNlIGlmIChpc0pTT04oKSkge1xuICAgIHN0ZGlvLmluZm8oJ0F0dGVtcHRpbmcgdG8gcHJldHRpZnkgd2hhdCBzZWVtcyB0byBiZSBhIEpTT04gZmlsZS4nKTtcbiAgICBzdGRpby5lbmREaWFnbm9zdGljcygpO1xuICAgIHN0ZGlvLmJlZ2luUHJldHRpZmllZENvZGUoKTtcbiAgICBzdGRpby5vdXQoYmVhdXRpZnkuanMoZmlsZUNvbnRlbnRzLCBmaW5hbENvbmZpZy5qc29uKSk7XG4gICAgc3RkaW8uZW5kUHJldHRpZmllZENvZGUoKTtcbiAgfSBlbHNlIGlmIChpc0pTKGZpbGVDb250ZW50cykpIHtcbiAgICBzdGRpby5pbmZvKCdBdHRlbXB0aW5nIHRvIHByZXR0aWZ5IHdoYXQgc2VlbXMgdG8gYmUgYSBKUyBmaWxlLicpO1xuICAgIHN0ZGlvLmVuZERpYWdub3N0aWNzKCk7XG4gICAgc3RkaW8uYmVnaW5QcmV0dGlmaWVkQ29kZSgpO1xuICAgIHN0ZGlvLm91dChiZWF1dGlmeS5qcyhmaWxlQ29udGVudHMsIGZpbmFsQ29uZmlnLmpzKSk7XG4gICAgc3RkaW8uZW5kUHJldHRpZmllZENvZGUoKTtcbiAgfSBlbHNlIHtcbiAgICBzdGRpby5pbmZvKCdVbnN1cHBvcnRlZCBmaWxlIHR5cGUnKTtcbiAgICBzdGRpby5lbmREaWFnbm9zdGljcygpO1xuICAgIHN0ZGlvLmJlZ2luUHJldHRpZmllZENvZGUoKTtcbiAgICBzdGRpby5vdXQoZmlsZUNvbnRlbnRzKTtcbiAgICBzdGRpby5lbmRQcmV0dGlmaWVkQ29kZSgpO1xuICB9XG59XG5cbm1haW4oKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
