"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

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
            stdio.info("Computed prettify options: ".concat(JSON.stringify(finalConfig)));

            if (!(constants.USING_EDITOR_TEXT_TEMP_FILE === 'True')) {
              _context.next = 30;
              break;
            }

            _context.next = 27;
            return _fsExtra.default.readFile(constants.EDITOR_TEXT_TEMP_FILE_PATH, {
              encoding: 'utf8'
            });

          case 27:
            _context.t0 = _context.sent;
            _context.next = 31;
            break;

          case 30:
            _context.t0 = constants.EDITOR_TEXT_TEMP_FILE_CONTENTS;

          case 31:
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

          case 33:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _main.apply(this, arguments);
}

main();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsicHJvY2VzcyIsIm9uIiwiZXJyIiwic3RkaW8iLCJtYWluIiwiYmVnaW5EaWFnbm9zdGljcyIsImluZm8iLCJjb25zdGFudHMiLCJVU0lOR19FRElUT1JfVEVYVF9URU1QX0ZJTEUiLCJHTE9CQUxfRklMRV9SVUxFU19KU09OIiwiUkVTUEVDVF9FRElUT1JDT05GSUdfRklMRVMiLCJFRElUT1JfRklMRV9TWU5UQVgiLCJFRElUT1JfSU5ERU5UX1NJWkUiLCJFRElUT1JfSU5ERU5UX1dJVEhfVEFCUyIsIkVESVRPUl9URVhUX1RFTVBfRklMRV9QQVRIIiwiRURJVE9SX1RFWFRfVEVNUF9GSUxFX0NPTlRFTlRTIiwiT1JJR0lOQUxfRklMRV9QQVRIIiwiQ09ORklHX0VYVFJBX0xPT0tVUF9QQVRIUyIsInBhdGhzVG9Mb29rIiwicHV0aWxzIiwiZ2V0UG90ZW50aWFsQ29uZmlnRGlycyIsIkpTT04iLCJzdHJpbmdpZnkiLCJjdXRpbHMiLCJwYXJzZURlZmF1bHRKc2JlYXV0aWZ5Q29uZmlnIiwiYmFzZUNvbmZpZyIsImV4dGVuZEpzYmVhdXRpZnlDb25maWdGcm9tRm9sZGVycyIsImV4dGVuZGVkQ29uZmlnIiwiZXh0ZW5kSnNiZWF1dGlmeUNvbmZpZ0Zyb21FZGl0b3JDb25maWdJbkZvbGRlcnMiLCJleHRlbmRlZENvbmZpZzIiLCJmaW5hbENvbmZpZyIsImZpbmFsaXplSnNiZWF1dGlmeUNvbmZpZyIsImZzIiwicmVhZEZpbGUiLCJlbmNvZGluZyIsImJ1ZmZlckNvbnRlbnRzIiwiZnV0aWxzIiwiaXNDU1MiLCJlbmREaWFnbm9zdGljcyIsImJlZ2luUHJldHRpZmllZENvZGUiLCJvdXQiLCJiZWF1dGlmeSIsImNzcyIsImVuZFByZXR0aWZpZWRDb2RlIiwiaXNIVE1MIiwiaHRtbCIsImlzSlNPTiIsImpzIiwianNvbiIsImlzSlMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFJQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFD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QVosRUFBNEJMLFdBQVcsQ0FBQ2lCLEVBQXhDLENBQVY7QUFDQTVDLGNBQUFBLEtBQUssQ0FBQ3dDLGlCQUFOO0FBQ0QsYUFOTSxNQU1BO0FBQ0x4QyxjQUFBQSxLQUFLLENBQUNHLElBQU4sQ0FBVyx1QkFBWDtBQUNBSCxjQUFBQSxLQUFLLENBQUNtQyxjQUFOO0FBQ0FuQyxjQUFBQSxLQUFLLENBQUNvQyxtQkFBTjtBQUNBcEMsY0FBQUEsS0FBSyxDQUFDcUMsR0FBTixDQUFVTCxjQUFWO0FBQ0FoQyxjQUFBQSxLQUFLLENBQUN3QyxpQkFBTjtBQUNEOztBQWhFSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O0FBbUVBdkMsSUFBSSIsInNvdXJjZXNDb250ZW50IjpbIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uICovXG5cbmltcG9ydCBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgKiBhcyBiZWF1dGlmeSBmcm9tICdqcy1iZWF1dGlmeSc7XG5cbmltcG9ydCAqIGFzIGNvbnN0YW50cyBmcm9tICcuL3V0aWxzL2NvbnN0YW50cyc7XG5pbXBvcnQgKiBhcyBzdGRpbyBmcm9tICcuL3V0aWxzL3N0ZGlvVXRpbHMnO1xuaW1wb3J0ICogYXMgY3V0aWxzIGZyb20gJy4vdXRpbHMvY29uZmlnVXRpbHMnO1xuaW1wb3J0ICogYXMgcHV0aWxzIGZyb20gJy4vdXRpbHMvcGF0aFV0aWxzJztcbmltcG9ydCAqIGFzIGZ1dGlscyBmcm9tICcuL3V0aWxzL2ZpbGVVdGlscyc7XG5cbnByb2Nlc3Mub24oJ3VuY2F1Z2h0RXhjZXB0aW9uJywgKGVycikgPT4ge1xuICBzdGRpby5lcnIoJ1VuY2F1Z2h0IGV4Y2VwdGlvbicsIGVycik7XG59KTtcblxucHJvY2Vzcy5vbigndW5oYW5kbGVkUmVqZWN0aW9uJywgKGVycikgPT4ge1xuICBzdGRpby5lcnIoJ1VuaGFuZGxlZCBwcm9taXNlIHJlamVjdGlvbicsIGVycik7XG59KTtcblxuYXN5bmMgZnVuY3Rpb24gbWFpbigpIHtcbiAgc3RkaW8uYmVnaW5EaWFnbm9zdGljcygpO1xuXG4gIC8vIER1bXAgc29tZSBkaWFnbm9zdGljcyBtZXNzYWdlcywgcGFyc2VkIG91dCBieSB0aGUgcGx1Z2luLlxuICBzdGRpby5pbmZvKGBVc2luZyBlZGl0b3IgdGV4dCB0ZW1wIGZpbGU6ICR7Y29uc3RhbnRzLlVTSU5HX0VESVRPUl9URVhUX1RFTVBfRklMRX1gKTtcblxuICBzdGRpby5pbmZvKGBHbG9iYWwgZmlsZSBydWxlczogJHtjb25zdGFudHMuR0xPQkFMX0ZJTEVfUlVMRVNfSlNPTn1gKTtcbiAgc3RkaW8uaW5mbyhgUmVzcGVjdGluZyAuZWRpdG9yY29uZmlnIGZpbGVzOiAke2NvbnN0YW50cy5SRVNQRUNUX0VESVRPUkNPTkZJR19GSUxFU31gKTtcblxuICBzdGRpby5pbmZvKGBFZGl0b3IgZmlsZSBzeW50YXg6ICR7Y29uc3RhbnRzLkVESVRPUl9GSUxFX1NZTlRBWH1gKTtcbiAgc3RkaW8uaW5mbyhgRWRpdG9yIGluZGVudCBzaXplOiAke2NvbnN0YW50cy5FRElUT1JfSU5ERU5UX1NJWkV9YCk7XG4gIHN0ZGlvLmluZm8oYEVkaXRvciBpbmRlbnQgd2l0aCB0YWJzOiAke2NvbnN0YW50cy5FRElUT1JfSU5ERU5UX1dJVEhfVEFCU31gKTtcblxuICBzdGRpby5pbmZvKGBFZGl0b3IgdGV4dCBmaWxlIHBhdGg6ICR7Y29uc3RhbnRzLkVESVRPUl9URVhUX1RFTVBfRklMRV9QQVRIfWApO1xuICBzdGRpby5pbmZvKGBFZGl0b3IgdGV4dCBmaWxlIGNvbnRlbnRzOiAke2NvbnN0YW50cy5FRElUT1JfVEVYVF9URU1QX0ZJTEVfQ09OVEVOVFN9YCk7XG5cbiAgc3RkaW8uaW5mbyhgT3JpZ2luYWwgZmlsZSBwYXRoOiAke2NvbnN0YW50cy5PUklHSU5BTF9GSUxFX1BBVEh9YCk7XG4gIHN0ZGlvLmluZm8oYENvbmZpZyBleHRyYSBsb29rdXAgcGF0aHM6ICR7Y29uc3RhbnRzLkNPTkZJR19FWFRSQV9MT09LVVBfUEFUSFN9YCk7XG5cbiAgY29uc3QgcGF0aHNUb0xvb2sgPSBwdXRpbHMuZ2V0UG90ZW50aWFsQ29uZmlnRGlycygpO1xuXG4gIHN0ZGlvLmluZm8oYENvbXB1dGVkIGV4dHJhIGxvb2t1cCBwYXRocyBmb3IgLmpzYmVhdXRpZnlyYzogJHtKU09OLnN0cmluZ2lmeShwYXRoc1RvTG9vayl9YCk7XG5cbiAgY29uc3QgYmFzZUNvbmZpZyA9IGF3YWl0IGN1dGlscy5wYXJzZURlZmF1bHRKc2JlYXV0aWZ5Q29uZmlnKCk7XG4gIGNvbnN0IGV4dGVuZGVkQ29uZmlnID0gYXdhaXQgY3V0aWxzLmV4dGVuZEpzYmVhdXRpZnlDb25maWdGcm9tRm9sZGVycyhwYXRoc1RvTG9vaywgYmFzZUNvbmZpZyk7XG4gIGNvbnN0IGV4dGVuZGVkQ29uZmlnMiA9IGF3YWl0IGN1dGlscy5leHRlbmRKc2JlYXV0aWZ5Q29uZmlnRnJvbUVkaXRvckNvbmZpZ0luRm9sZGVycyhwYXRoc1RvTG9vaywgZXh0ZW5kZWRDb25maWcpO1xuICBjb25zdCBmaW5hbENvbmZpZyA9IGN1dGlscy5maW5hbGl6ZUpzYmVhdXRpZnlDb25maWcoZXh0ZW5kZWRDb25maWcyKTtcblxuICBzdGRpby5pbmZvKGBDb21wdXRlZCBwcmV0dGlmeSBvcHRpb25zOiAke0pTT04uc3RyaW5naWZ5KGZpbmFsQ29uZmlnKX1gKTtcblxuICBjb25zdCBidWZmZXJDb250ZW50cyA9IGNvbnN0YW50cy5VU0lOR19FRElUT1JfVEVYVF9URU1QX0ZJTEUgPT09ICdUcnVlJ1xuICAgID8gYXdhaXQgZnMucmVhZEZpbGUoY29uc3RhbnRzLkVESVRPUl9URVhUX1RFTVBfRklMRV9QQVRILCB7IGVuY29kaW5nOiAndXRmOCcgfSlcbiAgICA6IGNvbnN0YW50cy5FRElUT1JfVEVYVF9URU1QX0ZJTEVfQ09OVEVOVFM7XG5cbiAgaWYgKGZ1dGlscy5pc0NTUygpKSB7XG4gICAgc3RkaW8uaW5mbygnQXR0ZW1wdGluZyB0byBwcmV0dGlmeSB3aGF0IHNlZW1zIHRvIGJlIGEgQ1NTIGZpbGUuJyk7XG4gICAgc3RkaW8uZW5kRGlhZ25vc3RpY3MoKTtcbiAgICBzdGRpby5iZWdpblByZXR0aWZpZWRDb2RlKCk7XG4gICAgc3RkaW8ub3V0KGJlYXV0aWZ5LmNzcyhidWZmZXJDb250ZW50cywgZmluYWxDb25maWcuY3NzKSk7XG4gICAgc3RkaW8uZW5kUHJldHRpZmllZENvZGUoKTtcbiAgfSBlbHNlIGlmIChmdXRpbHMuaXNIVE1MKGJ1ZmZlckNvbnRlbnRzKSkge1xuICAgIHN0ZGlvLmluZm8oJ0F0dGVtcHRpbmcgdG8gcHJldHRpZnkgd2hhdCBzZWVtcyB0byBiZSBhIEhUTUwgZmlsZS4nKTtcbiAgICBzdGRpby5lbmREaWFnbm9zdGljcygpO1xuICAgIHN0ZGlvLmJlZ2luUHJldHRpZmllZENvZGUoKTtcbiAgICBzdGRpby5vdXQoYmVhdXRpZnkuaHRtbChidWZmZXJDb250ZW50cywgZmluYWxDb25maWcuaHRtbCkpO1xuICAgIHN0ZGlvLmVuZFByZXR0aWZpZWRDb2RlKCk7XG4gIH0gZWxzZSBpZiAoZnV0aWxzLmlzSlNPTihidWZmZXJDb250ZW50cykpIHtcbiAgICBzdGRpby5pbmZvKCdBdHRlbXB0aW5nIHRvIHByZXR0aWZ5IHdoYXQgc2VlbXMgdG8gYmUgYSBKU09OIGZpbGUuJyk7XG4gICAgc3RkaW8uZW5kRGlhZ25vc3RpY3MoKTtcbiAgICBzdGRpby5iZWdpblByZXR0aWZpZWRDb2RlKCk7XG4gICAgc3RkaW8ub3V0KGJlYXV0aWZ5LmpzKGJ1ZmZlckNvbnRlbnRzLCBmaW5hbENvbmZpZy5qc29uKSk7XG4gICAgc3RkaW8uZW5kUHJldHRpZmllZENvZGUoKTtcbiAgfSBlbHNlIGlmIChmdXRpbHMuaXNKUyhidWZmZXJDb250ZW50cykpIHtcbiAgICBzdGRpby5pbmZvKCdBdHRlbXB0aW5nIHRvIHByZXR0aWZ5IHdoYXQgc2VlbXMgdG8gYmUgYSBKUyBmaWxlLicpO1xuICAgIHN0ZGlvLmVuZERpYWdub3N0aWNzKCk7XG4gICAgc3RkaW8uYmVnaW5QcmV0dGlmaWVkQ29kZSgpO1xuICAgIHN0ZGlvLm91dChiZWF1dGlmeS5qcyhidWZmZXJDb250ZW50cywgZmluYWxDb25maWcuanMpKTtcbiAgICBzdGRpby5lbmRQcmV0dGlmaWVkQ29kZSgpO1xuICB9IGVsc2Uge1xuICAgIHN0ZGlvLmluZm8oJ1Vuc3VwcG9ydGVkIGZpbGUgdHlwZScpO1xuICAgIHN0ZGlvLmVuZERpYWdub3N0aWNzKCk7XG4gICAgc3RkaW8uYmVnaW5QcmV0dGlmaWVkQ29kZSgpO1xuICAgIHN0ZGlvLm91dChidWZmZXJDb250ZW50cyk7XG4gICAgc3RkaW8uZW5kUHJldHRpZmllZENvZGUoKTtcbiAgfVxufVxuXG5tYWluKCk7XG4iXSwiZmlsZSI6Im1haW4uanMifQ==
