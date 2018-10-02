"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var beautify = _interopRequireWildcard(require("js-beautify"));

var constants = _interopRequireWildcard(require("./utils/constants"));

var stdio = _interopRequireWildcard(require("./utils/stdioUtils"));

var cutils = _interopRequireWildcard(require("./utils/configUtils"));

var putils = _interopRequireWildcard(require("./utils/pathUtils"));

var futils = _interopRequireWildcard(require("./utils/fileUtils"));

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
process.on('uncaughtException', function (err) {
  stdio.err('Uncaught exception', err);
});
process.on('unhandledRejection', function (err) {
  stdio.err('Unhandled promise rejection', err);
});

function main() {
  return _main.apply(this, arguments);
}

function _main() {
  _main = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var pathsToLook, baseConfig, extendedConfig, extendedConfig2, finalConfig, bufferContents;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            stdio.beginDiagnostics(); // Dump some diagnostics messages, parsed out by the plugin.

            stdio.info("Using process versions: ".concat(JSON.stringify(process.versions)));
            stdio.info("Using editor text temp file: ".concat(constants.USING_EDITOR_TEXT_TEMP_FILE));
            stdio.info("Global file rules: ".concat(constants.GLOBAL_FILE_RULES_JSON));
            stdio.info("Respecting .editorconfig files: ".concat(constants.RESPECT_EDITORCONFIG_FILES));
            stdio.info("Editor file syntax: ".concat(constants.EDITOR_FILE_SYNTAX));
            stdio.info("Editor indent size: ".concat(constants.EDITOR_INDENT_SIZE));
            stdio.info("Editor indent with tabs: ".concat(constants.EDITOR_INDENT_WITH_TABS));
            stdio.info("Editor text file path: ".concat(constants.EDITOR_TEXT_TEMP_FILE_PATH));
            stdio.info("Editor text file contents: ".concat(constants.EDITOR_TEXT_TEMP_FILE_CONTENTS));
            stdio.info("Original file path: ".concat(constants.ORIGINAL_FILE_PATH));
            stdio.info("Config extra lookup paths: ".concat(constants.CONFIG_EXTRA_LOOKUP_PATHS));
            pathsToLook = putils.getPotentialConfigDirs();
            stdio.info("Computed extra lookup paths for .jsbeautifyrc: ".concat(JSON.stringify(pathsToLook)));
            _context.next = 16;
            return cutils.parseDefaultJsbeautifyConfig();

          case 16:
            baseConfig = _context.sent;
            _context.next = 19;
            return cutils.extendJsbeautifyConfigFromFolders(pathsToLook, baseConfig);

          case 19:
            extendedConfig = _context.sent;
            _context.next = 22;
            return cutils.extendJsbeautifyConfigFromEditorConfigInFolders(pathsToLook, extendedConfig);

          case 22:
            extendedConfig2 = _context.sent;
            finalConfig = cutils.finalizeJsbeautifyConfig(extendedConfig2);
            stdio.info("Computed prettify options: ".concat(JSON.stringify(finalConfig)));

            if (!(constants.USING_EDITOR_TEXT_TEMP_FILE === 'True')) {
              _context.next = 31;
              break;
            }

            _context.next = 28;
            return _fsExtra.default.readFile(constants.EDITOR_TEXT_TEMP_FILE_PATH, {
              encoding: 'utf8'
            });

          case 28:
            _context.t0 = _context.sent;
            _context.next = 32;
            break;

          case 31:
            _context.t0 = constants.EDITOR_TEXT_TEMP_FILE_CONTENTS;

          case 32:
            bufferContents = _context.t0;

            if (futils.isCSS()) {
              stdio.info('Attempting to prettify what seems to be a CSS file.');
              stdio.endDiagnostics();
              stdio.beginPrettifiedCode();
              stdio.out(beautify.css(bufferContents, finalConfig.css));
              stdio.endPrettifiedCode();
            } else if (futils.isHTML(bufferContents)) {
              stdio.info('Attempting to prettify what seems to be a HTML file.');
              stdio.endDiagnostics();
              stdio.beginPrettifiedCode();
              stdio.out(beautify.html(bufferContents, finalConfig.html));
              stdio.endPrettifiedCode();
            } else if (futils.isJSON(bufferContents)) {
              stdio.info('Attempting to prettify what seems to be a JSON file.');
              stdio.endDiagnostics();
              stdio.beginPrettifiedCode();
              stdio.out(beautify.js(bufferContents, finalConfig.json));
              stdio.endPrettifiedCode();
            } else if (futils.isJS(bufferContents)) {
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

          case 34:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _main.apply(this, arguments);
}

main();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsicHJvY2VzcyIsIm9uIiwiZXJyIiwic3RkaW8iLCJtYWluIiwiYmVnaW5EaWFnbm9zdGljcyIsImluZm8iLCJKU09OIiwic3RyaW5naWZ5IiwidmVyc2lvbnMiLCJjb25zdGFudHMiLCJVU0lOR19FRElUT1JfVEVYVF9URU1QX0ZJTEUiLCJHTE9CQUxfRklMRV9SVUxFU19KU09OIiwiUkVTUEVDVF9FRElUT1JDT05GSUdfRklMRVMiLCJFRElUT1JfRklMRV9TWU5UQVgiLCJFRElUT1JfSU5ERU5UX1NJWkUiLCJFRElUT1JfSU5ERU5UX1dJVEhfVEFCUyIsIkVESVRPUl9URVhUX1RFTVBfRklMRV9QQVRIIiwiRURJVE9SX1RFWFRfVEVNUF9GSUxFX0NPTlRFTlRTIiwiT1JJR0lOQUxfRklMRV9QQVRIIiwiQ09ORklHX0VYVFJBX0xPT0tVUF9QQVRIUyIsInBhdGhzVG9Mb29rIiwicHV0aWxzIiwiZ2V0UG90ZW50aWFsQ29uZmlnRGlycyIsImN1dGlscyIsInBhcnNlRGVmYXVsdEpzYmVhdXRpZnlDb25maWciLCJiYXNlQ29uZmlnIiwiZXh0ZW5kSnNiZWF1dGlmeUNvbmZpZ0Zyb21Gb2xkZXJzIiwiZXh0ZW5kZWRDb25maWciLCJleHRlbmRKc2JlYXV0aWZ5Q29uZmlnRnJvbUVkaXRvckNvbmZpZ0luRm9sZGVycyIsImV4dGVuZGVkQ29uZmlnMiIsImZpbmFsQ29uZmlnIiwiZmluYWxpemVKc2JlYXV0aWZ5Q29uZmlnIiwiZnMiLCJyZWFkRmlsZSIsImVuY29kaW5nIiwiYnVmZmVyQ29udGVudHMiLCJmdXRpbHMiLCJpc0NTUyIsImVuZERpYWdub3N0aWNzIiwiYmVnaW5QcmV0dGlmaWVkQ29kZSIsIm91dCIsImJlYXV0aWZ5IiwiY3NzIiwiZW5kUHJldHRpZmllZENvZGUiLCJpc0hUTUwiLCJodG1sIiwiaXNKU09OIiwianMiLCJqc29uIiwiaXNKUyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBSUE7O0FBQ0E7O0FB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Y0FBTjtBQUNBcEMsY0FBQUEsS0FBSyxDQUFDcUMsbUJBQU47QUFDQXJDLGNBQUFBLEtBQUssQ0FBQ3NDLEdBQU4sQ0FBVUMsUUFBUSxDQUFDTSxFQUFULENBQVlaLGNBQVosRUFBNEJMLFdBQVcsQ0FBQ2lCLEVBQXhDLENBQVY7QUFDQTdDLGNBQUFBLEtBQUssQ0FBQ3lDLGlCQUFOO0FBQ0QsYUFOTSxNQU1BO0FBQ0x6QyxjQUFBQSxLQUFLLENBQUNHLElBQU4sQ0FBVyx1QkFBWDtBQUNBSCxjQUFBQSxLQUFLLENBQUNvQyxjQUFOO0FBQ0FwQyxjQUFBQSxLQUFLLENBQUNxQyxtQkFBTjtBQUNBckMsY0FBQUEsS0FBSyxDQUFDc0MsR0FBTixDQUFVTCxjQUFWO0FBQ0FqQyxjQUFBQSxLQUFLLENBQUN5QyxpQkFBTjtBQUNEOztBQWxFSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O0FBcUVBeEMsSUFBSSIsInNvdXJjZXNDb250ZW50IjpbIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uICovXG5cbmltcG9ydCBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgKiBhcyBiZWF1dGlmeSBmcm9tICdqcy1iZWF1dGlmeSc7XG5cbmltcG9ydCAqIGFzIGNvbnN0YW50cyBmcm9tICcuL3V0aWxzL2NvbnN0YW50cyc7XG5pbXBvcnQgKiBhcyBzdGRpbyBmcm9tICcuL3V0aWxzL3N0ZGlvVXRpbHMnO1xuaW1wb3J0ICogYXMgY3V0aWxzIGZyb20gJy4vdXRpbHMvY29uZmlnVXRpbHMnO1xuaW1wb3J0ICogYXMgcHV0aWxzIGZyb20gJy4vdXRpbHMvcGF0aFV0aWxzJztcbmltcG9ydCAqIGFzIGZ1dGlscyBmcm9tICcuL3V0aWxzL2ZpbGVVdGlscyc7XG5cbnByb2Nlc3Mub24oJ3VuY2F1Z2h0RXhjZXB0aW9uJywgKGVycikgPT4ge1xuICBzdGRpby5lcnIoJ1VuY2F1Z2h0IGV4Y2VwdGlvbicsIGVycik7XG59KTtcblxucHJvY2Vzcy5vbigndW5oYW5kbGVkUmVqZWN0aW9uJywgKGVycikgPT4ge1xuICBzdGRpby5lcnIoJ1VuaGFuZGxlZCBwcm9taXNlIHJlamVjdGlvbicsIGVycik7XG59KTtcblxuYXN5bmMgZnVuY3Rpb24gbWFpbigpIHtcbiAgc3RkaW8uYmVnaW5EaWFnbm9zdGljcygpO1xuXG4gIC8vIER1bXAgc29tZSBkaWFnbm9zdGljcyBtZXNzYWdlcywgcGFyc2VkIG91dCBieSB0aGUgcGx1Z2luLlxuICBzdGRpby5pbmZvKGBVc2luZyBwcm9jZXNzIHZlcnNpb25zOiAke0pTT04uc3RyaW5naWZ5KHByb2Nlc3MudmVyc2lvbnMpfWApO1xuXG4gIHN0ZGlvLmluZm8oYFVzaW5nIGVkaXRvciB0ZXh0IHRlbXAgZmlsZTogJHtjb25zdGFudHMuVVNJTkdfRURJVE9SX1RFWFRfVEVNUF9GSUxFfWApO1xuXG4gIHN0ZGlvLmluZm8oYEdsb2JhbCBmaWxlIHJ1bGVzOiAke2NvbnN0YW50cy5HTE9CQUxfRklMRV9SVUxFU19KU09OfWApO1xuICBzdGRpby5pbmZvKGBSZXNwZWN0aW5nIC5lZGl0b3Jjb25maWcgZmlsZXM6ICR7Y29uc3RhbnRzLlJFU1BFQ1RfRURJVE9SQ09ORklHX0ZJTEVTfWApO1xuXG4gIHN0ZGlvLmluZm8oYEVkaXRvciBmaWxlIHN5bnRheDogJHtjb25zdGFudHMuRURJVE9SX0ZJTEVfU1lOVEFYfWApO1xuICBzdGRpby5pbmZvKGBFZGl0b3IgaW5kZW50IHNpemU6ICR7Y29uc3RhbnRzLkVESVRPUl9JTkRFTlRfU0laRX1gKTtcbiAgc3RkaW8uaW5mbyhgRWRpdG9yIGluZGVudCB3aXRoIHRhYnM6ICR7Y29uc3RhbnRzLkVESVRPUl9JTkRFTlRfV0lUSF9UQUJTfWApO1xuXG4gIHN0ZGlvLmluZm8oYEVkaXRvciB0ZXh0IGZpbGUgcGF0aDogJHtjb25zdGFudHMuRURJVE9SX1RFWFRfVEVNUF9GSUxFX1BBVEh9YCk7XG4gIHN0ZGlvLmluZm8oYEVkaXRvciB0ZXh0IGZpbGUgY29udGVudHM6ICR7Y29uc3RhbnRzLkVESVRPUl9URVhUX1RFTVBfRklMRV9DT05URU5UU31gKTtcblxuICBzdGRpby5pbmZvKGBPcmlnaW5hbCBmaWxlIHBhdGg6ICR7Y29uc3RhbnRzLk9SSUdJTkFMX0ZJTEVfUEFUSH1gKTtcbiAgc3RkaW8uaW5mbyhgQ29uZmlnIGV4dHJhIGxvb2t1cCBwYXRoczogJHtjb25zdGFudHMuQ09ORklHX0VYVFJBX0xPT0tVUF9QQVRIU31gKTtcblxuICBjb25zdCBwYXRoc1RvTG9vayA9IHB1dGlscy5nZXRQb3RlbnRpYWxDb25maWdEaXJzKCk7XG5cbiAgc3RkaW8uaW5mbyhgQ29tcHV0ZWQgZXh0cmEgbG9va3VwIHBhdGhzIGZvciAuanNiZWF1dGlmeXJjOiAke0pTT04uc3RyaW5naWZ5KHBhdGhzVG9Mb29rKX1gKTtcblxuICBjb25zdCBiYXNlQ29uZmlnID0gYXdhaXQgY3V0aWxzLnBhcnNlRGVmYXVsdEpzYmVhdXRpZnlDb25maWcoKTtcbiAgY29uc3QgZXh0ZW5kZWRDb25maWcgPSBhd2FpdCBjdXRpbHMuZXh0ZW5kSnNiZWF1dGlmeUNvbmZpZ0Zyb21Gb2xkZXJzKHBhdGhzVG9Mb29rLCBiYXNlQ29uZmlnKTtcbiAgY29uc3QgZXh0ZW5kZWRDb25maWcyID0gYXdhaXQgY3V0aWxzLmV4dGVuZEpzYmVhdXRpZnlDb25maWdGcm9tRWRpdG9yQ29uZmlnSW5Gb2xkZXJzKHBhdGhzVG9Mb29rLCBleHRlbmRlZENvbmZpZyk7XG4gIGNvbnN0IGZpbmFsQ29uZmlnID0gY3V0aWxzLmZpbmFsaXplSnNiZWF1dGlmeUNvbmZpZyhleHRlbmRlZENvbmZpZzIpO1xuXG4gIHN0ZGlvLmluZm8oYENvbXB1dGVkIHByZXR0aWZ5IG9wdGlvbnM6ICR7SlNPTi5zdHJpbmdpZnkoZmluYWxDb25maWcpfWApO1xuXG4gIGNvbnN0IGJ1ZmZlckNvbnRlbnRzID0gY29uc3RhbnRzLlVTSU5HX0VESVRPUl9URVhUX1RFTVBfRklMRSA9PT0gJ1RydWUnXG4gICAgPyBhd2FpdCBmcy5yZWFkRmlsZShjb25zdGFudHMuRURJVE9SX1RFWFRfVEVNUF9GSUxFX1BBVEgsIHsgZW5jb2Rpbmc6ICd1dGY4JyB9KVxuICAgIDogY29uc3RhbnRzLkVESVRPUl9URVhUX1RFTVBfRklMRV9DT05URU5UUztcblxuICBpZiAoZnV0aWxzLmlzQ1NTKCkpIHtcbiAgICBzdGRpby5pbmZvKCdBdHRlbXB0aW5nIHRvIHByZXR0aWZ5IHdoYXQgc2VlbXMgdG8gYmUgYSBDU1MgZmlsZS4nKTtcbiAgICBzdGRpby5lbmREaWFnbm9zdGljcygpO1xuICAgIHN0ZGlvLmJlZ2luUHJldHRpZmllZENvZGUoKTtcbiAgICBzdGRpby5vdXQoYmVhdXRpZnkuY3NzKGJ1ZmZlckNvbnRlbnRzLCBmaW5hbENvbmZpZy5jc3MpKTtcbiAgICBzdGRpby5lbmRQcmV0dGlmaWVkQ29kZSgpO1xuICB9IGVsc2UgaWYgKGZ1dGlscy5pc0hUTUwoYnVmZmVyQ29udGVudHMpKSB7XG4gICAgc3RkaW8uaW5mbygnQXR0ZW1wdGluZyB0byBwcmV0dGlmeSB3aGF0IHNlZW1zIHRvIGJlIGEgSFRNTCBmaWxlLicpO1xuICAgIHN0ZGlvLmVuZERpYWdub3N0aWNzKCk7XG4gICAgc3RkaW8uYmVnaW5QcmV0dGlmaWVkQ29kZSgpO1xuICAgIHN0ZGlvLm91dChiZWF1dGlmeS5odG1sKGJ1ZmZlckNvbnRlbnRzLCBmaW5hbENvbmZpZy5odG1sKSk7XG4gICAgc3RkaW8uZW5kUHJldHRpZmllZENvZGUoKTtcbiAgfSBlbHNlIGlmIChmdXRpbHMuaXNKU09OKGJ1ZmZlckNvbnRlbnRzKSkge1xuICAgIHN0ZGlvLmluZm8oJ0F0dGVtcHRpbmcgdG8gcHJldHRpZnkgd2hhdCBzZWVtcyB0byBiZSBhIEpTT04gZmlsZS4nKTtcbiAgICBzdGRpby5lbmREaWFnbm9zdGljcygpO1xuICAgIHN0ZGlvLmJlZ2luUHJldHRpZmllZENvZGUoKTtcbiAgICBzdGRpby5vdXQoYmVhdXRpZnkuanMoYnVmZmVyQ29udGVudHMsIGZpbmFsQ29uZmlnLmpzb24pKTtcbiAgICBzdGRpby5lbmRQcmV0dGlmaWVkQ29kZSgpO1xuICB9IGVsc2UgaWYgKGZ1dGlscy5pc0pTKGJ1ZmZlckNvbnRlbnRzKSkge1xuICAgIHN0ZGlvLmluZm8oJ0F0dGVtcHRpbmcgdG8gcHJldHRpZnkgd2hhdCBzZWVtcyB0byBiZSBhIEpTIGZpbGUuJyk7XG4gICAgc3RkaW8uZW5kRGlhZ25vc3RpY3MoKTtcbiAgICBzdGRpby5iZWdpblByZXR0aWZpZWRDb2RlKCk7XG4gICAgc3RkaW8ub3V0KGJlYXV0aWZ5LmpzKGJ1ZmZlckNvbnRlbnRzLCBmaW5hbENvbmZpZy5qcykpO1xuICAgIHN0ZGlvLmVuZFByZXR0aWZpZWRDb2RlKCk7XG4gIH0gZWxzZSB7XG4gICAgc3RkaW8uaW5mbygnVW5zdXBwb3J0ZWQgZmlsZSB0eXBlJyk7XG4gICAgc3RkaW8uZW5kRGlhZ25vc3RpY3MoKTtcbiAgICBzdGRpby5iZWdpblByZXR0aWZpZWRDb2RlKCk7XG4gICAgc3RkaW8ub3V0KGJ1ZmZlckNvbnRlbnRzKTtcbiAgICBzdGRpby5lbmRQcmV0dGlmaWVkQ29kZSgpO1xuICB9XG59XG5cbm1haW4oKTtcbiJdLCJmaWxlIjoibWFpbi5qcyJ9
