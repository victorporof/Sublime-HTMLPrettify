'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.translateEditorConfigToJsbeautifyConfig = exports.sanitizeJsbeautifyConfig = exports.sanitizeCharishValues = exports.sanitizeBooleanishValues = undefined;

var _pick = require('lodash/pick');

var _pick2 = _interopRequireDefault(_pick);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _pickBy = require('lodash/pickBy');

var _pickBy2 = _interopRequireDefault(_pickBy);

var _mapObj = require('map-obj');

var _mapObj2 = _interopRequireDefault(_mapObj);

var _isGlob = require('is-glob');

var _isGlob2 = _interopRequireDefault(_isGlob);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VALID_JSBEAUTIFY_CONFIG_KEYS = ['all', 'html', 'css', 'js', 'json', 'custom'];

// Utility function special casing "true" and "false" values as being
// actually booleans. This avoids common accidents in json files.
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var sanitizeBooleanishValues = exports.sanitizeBooleanishValues = function sanitizeBooleanishValues(prefValue) {
  switch (prefValue) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      return prefValue;
  }
};

// Utility function special casing "tab" and "space" values as being
// actually \t and \s.
var sanitizeCharishValues = exports.sanitizeCharishValues = function sanitizeCharishValues(prefValue) {
  switch (prefValue) {
    case 'tab':
      return '\t';
    case 'space':
      return ' ';
    default:
      return prefValue;
  }
};

// Utility function massaging .jsbeautifyrc objects into a consistent and
// expected format, discarding unknown keys and sanitizing values.
var sanitizeJsbeautifyConfig = exports.sanitizeJsbeautifyConfig = function sanitizeJsbeautifyConfig(jsbeautifyConfig) {
  return (0, _mapObj2.default)((0, _pick2.default)(jsbeautifyConfig, VALID_JSBEAUTIFY_CONFIG_KEYS), function (fileType, fileSettings) {
    switch (fileType) {
      case 'all':
      case 'html':
      case 'css':
      case 'js':
      case 'json':
        return [fileType, (0, _mapObj2.default)(fileSettings, function (prefName, prefValue) {
          return [prefName, sanitizeBooleanishValues(prefValue)];
        })];
      case 'custom':
        return [fileType, (0, _mapObj2.default)(fileSettings, function (globString, globConfig) {
          return [globString, (0, _mapObj2.default)(globConfig, function (prefName, prefValue) {
            return [prefName, sanitizeBooleanishValues(prefValue)];
          })];
        })];
      default:
        throw new Error('Unknown .jsbeautifyrc file type: ' + fileType);
    }
  });
};

var translateEditorConfigToJsbeautifyConfig = exports.translateEditorConfigToJsbeautifyConfig = function translateEditorConfigToJsbeautifyConfig(editorConfig) {
  return {
    custom: (0, _mapObj2.default)((0, _pickBy2.default)(editorConfig, function (v, k) {
      return (0, _isGlob2.default)(k) && (0, _isObject2.default)(v);
    }), function (globString, globConfig) {
      return [globString, (0, _mapObj2.default)(globConfig, function (prefName, prefValue) {
        switch (prefName) {
          case 'indent_style':
            return ['indent_char', sanitizeCharishValues(prefValue)];
          case 'insert_final_newline':
            return ['end_with_newline', prefValue];
          default:
            return [prefName, prefValue];
        }
      })];
    })
  };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL2NvbmZpZ1Nhbml0aXplcnMuanMiXSwibmFtZXMiOlsiVkFMSURfSlNCRUFVVElGWV9DT05GSUdfS0VZUyIsInNhbml0aXplQm9vbGVhbmlzaFZhbHVlcyIsInByZWZWYWx1ZSIsInNhbml0aXplQ2hhcmlzaFZhbHVlcyIsInNhbml0aXplSnNiZWF1dGlmeUNvbmZpZyIsImpzYmVhdXRpZnlDb25maWciLCJmaWxlVHlwZSIsImZpbGVTZXR0aW5ncyIsInByZWZOYW1lIiwiZ2xvYlN0cmluZyIsImdsb2JDb25maWciLCJFcnJvciIsInRyYW5zbGF0ZUVkaXRvckNvbmZpZ1RvSnNiZWF1dGlmeUNvbmZpZyIsImN1c3RvbSIsImVkaXRvckNvbmZpZyIsInYiLCJrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBSUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsK0JBQStCLENBQ25DLEtBRG1DLEVBRW5DLE1BRm1DLEVBR25DLEtBSG1DLEVBSW5DLElBSm1DLEVBS25DLE1BTG1DLEVBTW5DLFFBTm1DLENBQXJDOztBQVNBO0FBQ0E7QUFwQkE7Ozs7QUFxQk8sSUFBTUMsOERBQTJCLFNBQTNCQSx3QkFBMkIsQ0FBQ0MsU0FBRCxFQUFlO0FBQ3JELFVBQVFBLFNBQVI7QUFDRSxTQUFLLE1BQUw7QUFDRSxhQUFPLElBQVA7QUFDRixTQUFLLE9BQUw7QUFDRSxhQUFPLEtBQVA7QUFDRjtBQUNFLGFBQU9BLFNBQVA7QUFOSjtBQVFELENBVE07O0FBV1A7QUFDQTtBQUNPLElBQU1DLHdEQUF3QixTQUF4QkEscUJBQXdCLENBQUNELFNBQUQsRUFBZTtBQUNsRCxVQUFRQSxTQUFSO0FBQ0UsU0FBSyxLQUFMO0FBQ0UsYUFBTyxJQUFQO0FBQ0YsU0FBSyxPQUFMO0FBQ0UsYUFBTyxHQUFQO0FBQ0Y7QUFDRSxhQUFPQSxTQUFQO0FBTko7QUFRRCxDQVRNOztBQVdQO0FBQ0E7QUFDTyxJQUFNRSw4REFBMkIsU0FBM0JBLHdCQUEyQjtBQUFBLFNBQ3RDLHNCQUFPLG9CQUFLQyxnQkFBTCxFQUF1QkwsNEJBQXZCLENBQVAsRUFBNkQsVUFBQ00sUUFBRCxFQUFXQyxZQUFYLEVBQTRCO0FBQ3ZGLFlBQVFELFFBQVI7QUFDRSxXQUFLLEtBQUw7QUFDQSxXQUFLLE1BQUw7QUFDQSxXQUFLLEtBQUw7QUFDQSxXQUFLLElBQUw7QUFDQSxXQUFLLE1BQUw7QUFDRSxlQUFPLENBQUNBLFFBQUQsRUFBVyxzQkFBT0MsWUFBUCxFQUFxQixVQUFDQyxRQUFELEVBQVdOLFNBQVg7QUFBQSxpQkFDckMsQ0FBQ00sUUFBRCxFQUFXUCx5QkFBeUJDLFNBQXpCLENBQVgsQ0FEcUM7QUFBQSxTQUFyQixDQUFYLENBQVA7QUFHRixXQUFLLFFBQUw7QUFDRSxlQUFPLENBQUNJLFFBQUQsRUFBVyxzQkFBT0MsWUFBUCxFQUFxQixVQUFDRSxVQUFELEVBQWFDLFVBQWI7QUFBQSxpQkFDckMsQ0FBQ0QsVUFBRCxFQUFhLHNCQUFPQyxVQUFQLEVBQW1CLFVBQUNGLFFBQUQsRUFBV04sU0FBWDtBQUFBLG1CQUM5QixDQUFDTSxRQUFELEVBQVdQLHlCQUF5QkMsU0FBekIsQ0FBWCxDQUQ4QjtBQUFBLFdBQW5CLENBQWIsQ0FEcUM7QUFBQSxTQUFyQixDQUFYLENBQVA7QUFLRjtBQUNFLGNBQU0sSUFBSVMsS0FBSix1Q0FBOENMLFFBQTlDLENBQU47QUFoQko7QUFrQkQsR0FuQkQsQ0FEc0M7QUFBQSxDQUFqQzs7QUFzQkEsSUFBTU0sNEZBQTBDLFNBQTFDQSx1Q0FBMEM7QUFBQSxTQUFpQjtBQUN0RUMsWUFBUSxzQkFBTyxzQkFBT0MsWUFBUCxFQUFxQixVQUFDQyxDQUFELEVBQUlDLENBQUo7QUFBQSxhQUFVLHNCQUFPQSxDQUFQLEtBQWEsd0JBQVNELENBQVQsQ0FBdkI7QUFBQSxLQUFyQixDQUFQLEVBQWlFLFVBQUNOLFVBQUQsRUFBYUMsVUFBYjtBQUFBLGFBQ3ZFLENBQUNELFVBQUQsRUFBYSxzQkFBT0MsVUFBUCxFQUFtQixVQUFDRixRQUFELEVBQVdOLFNBQVgsRUFBeUI7QUFDdkQsZ0JBQVFNLFFBQVI7QUFDRSxlQUFLLGNBQUw7QUFDRSxtQkFBTyxDQUFDLGFBQUQsRUFBZ0JMLHNCQUFzQkQsU0FBdEIsQ0FBaEIsQ0FBUDtBQUNGLGVBQUssc0JBQUw7QUFDRSxtQkFBTyxDQUFDLGtCQUFELEVBQXFCQSxTQUFyQixDQUFQO0FBQ0Y7QUFDRSxtQkFBTyxDQUFDTSxRQUFELEVBQVdOLFNBQVgsQ0FBUDtBQU5KO0FBUUQsT0FUWSxDQUFiLENBRHVFO0FBQUEsS0FBakU7QUFEOEQsR0FBakI7QUFBQSxDQUFoRCIsImZpbGUiOiJ1dGlscy9jb25maWdTYW5pdGl6ZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy4gKi9cblxuaW1wb3J0IHBpY2sgZnJvbSAnbG9kYXNoL3BpY2snO1xuaW1wb3J0IGlzT2JqZWN0IGZyb20gJ2xvZGFzaC9pc09iamVjdCc7XG5pbXBvcnQgcGlja0J5IGZyb20gJ2xvZGFzaC9waWNrQnknO1xuaW1wb3J0IG1hcE9iaiBmcm9tICdtYXAtb2JqJztcbmltcG9ydCBpc0dsb2IgZnJvbSAnaXMtZ2xvYic7XG5cbmNvbnN0IFZBTElEX0pTQkVBVVRJRllfQ09ORklHX0tFWVMgPSBbXG4gICdhbGwnLFxuICAnaHRtbCcsXG4gICdjc3MnLFxuICAnanMnLFxuICAnanNvbicsXG4gICdjdXN0b20nLFxuXTtcblxuLy8gVXRpbGl0eSBmdW5jdGlvbiBzcGVjaWFsIGNhc2luZyBcInRydWVcIiBhbmQgXCJmYWxzZVwiIHZhbHVlcyBhcyBiZWluZ1xuLy8gYWN0dWFsbHkgYm9vbGVhbnMuIFRoaXMgYXZvaWRzIGNvbW1vbiBhY2NpZGVudHMgaW4ganNvbiBmaWxlcy5cbmV4cG9ydCBjb25zdCBzYW5pdGl6ZUJvb2xlYW5pc2hWYWx1ZXMgPSAocHJlZlZhbHVlKSA9PiB7XG4gIHN3aXRjaCAocHJlZlZhbHVlKSB7XG4gICAgY2FzZSAndHJ1ZSc6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBjYXNlICdmYWxzZSc6XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBwcmVmVmFsdWU7XG4gIH1cbn07XG5cbi8vIFV0aWxpdHkgZnVuY3Rpb24gc3BlY2lhbCBjYXNpbmcgXCJ0YWJcIiBhbmQgXCJzcGFjZVwiIHZhbHVlcyBhcyBiZWluZ1xuLy8gYWN0dWFsbHkgXFx0IGFuZCBcXHMuXG5leHBvcnQgY29uc3Qgc2FuaXRpemVDaGFyaXNoVmFsdWVzID0gKHByZWZWYWx1ZSkgPT4ge1xuICBzd2l0Y2ggKHByZWZWYWx1ZSkge1xuICAgIGNhc2UgJ3RhYic6XG4gICAgICByZXR1cm4gJ1xcdCc7XG4gICAgY2FzZSAnc3BhY2UnOlxuICAgICAgcmV0dXJuICcgJztcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHByZWZWYWx1ZTtcbiAgfVxufTtcblxuLy8gVXRpbGl0eSBmdW5jdGlvbiBtYXNzYWdpbmcgLmpzYmVhdXRpZnlyYyBvYmplY3RzIGludG8gYSBjb25zaXN0ZW50IGFuZFxuLy8gZXhwZWN0ZWQgZm9ybWF0LCBkaXNjYXJkaW5nIHVua25vd24ga2V5cyBhbmQgc2FuaXRpemluZyB2YWx1ZXMuXG5leHBvcnQgY29uc3Qgc2FuaXRpemVKc2JlYXV0aWZ5Q29uZmlnID0ganNiZWF1dGlmeUNvbmZpZyA9PlxuICBtYXBPYmoocGljayhqc2JlYXV0aWZ5Q29uZmlnLCBWQUxJRF9KU0JFQVVUSUZZX0NPTkZJR19LRVlTKSwgKGZpbGVUeXBlLCBmaWxlU2V0dGluZ3MpID0+IHtcbiAgICBzd2l0Y2ggKGZpbGVUeXBlKSB7XG4gICAgICBjYXNlICdhbGwnOlxuICAgICAgY2FzZSAnaHRtbCc6XG4gICAgICBjYXNlICdjc3MnOlxuICAgICAgY2FzZSAnanMnOlxuICAgICAgY2FzZSAnanNvbic6XG4gICAgICAgIHJldHVybiBbZmlsZVR5cGUsIG1hcE9iaihmaWxlU2V0dGluZ3MsIChwcmVmTmFtZSwgcHJlZlZhbHVlKSA9PlxuICAgICAgICAgIFtwcmVmTmFtZSwgc2FuaXRpemVCb29sZWFuaXNoVmFsdWVzKHByZWZWYWx1ZSldLFxuICAgICAgICApXTtcbiAgICAgIGNhc2UgJ2N1c3RvbSc6XG4gICAgICAgIHJldHVybiBbZmlsZVR5cGUsIG1hcE9iaihmaWxlU2V0dGluZ3MsIChnbG9iU3RyaW5nLCBnbG9iQ29uZmlnKSA9PlxuICAgICAgICAgIFtnbG9iU3RyaW5nLCBtYXBPYmooZ2xvYkNvbmZpZywgKHByZWZOYW1lLCBwcmVmVmFsdWUpID0+XG4gICAgICAgICAgICBbcHJlZk5hbWUsIHNhbml0aXplQm9vbGVhbmlzaFZhbHVlcyhwcmVmVmFsdWUpXSxcbiAgICAgICAgICApXSxcbiAgICAgICAgKV07XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gLmpzYmVhdXRpZnlyYyBmaWxlIHR5cGU6ICR7ZmlsZVR5cGV9YCk7XG4gICAgfVxuICB9KTtcblxuZXhwb3J0IGNvbnN0IHRyYW5zbGF0ZUVkaXRvckNvbmZpZ1RvSnNiZWF1dGlmeUNvbmZpZyA9IGVkaXRvckNvbmZpZyA9PiAoe1xuICBjdXN0b206IG1hcE9iaihwaWNrQnkoZWRpdG9yQ29uZmlnLCAodiwgaykgPT4gaXNHbG9iKGspICYmIGlzT2JqZWN0KHYpKSwgKGdsb2JTdHJpbmcsIGdsb2JDb25maWcpID0+XG4gICAgW2dsb2JTdHJpbmcsIG1hcE9iaihnbG9iQ29uZmlnLCAocHJlZk5hbWUsIHByZWZWYWx1ZSkgPT4ge1xuICAgICAgc3dpdGNoIChwcmVmTmFtZSkge1xuICAgICAgICBjYXNlICdpbmRlbnRfc3R5bGUnOlxuICAgICAgICAgIHJldHVybiBbJ2luZGVudF9jaGFyJywgc2FuaXRpemVDaGFyaXNoVmFsdWVzKHByZWZWYWx1ZSldO1xuICAgICAgICBjYXNlICdpbnNlcnRfZmluYWxfbmV3bGluZSc6XG4gICAgICAgICAgcmV0dXJuIFsnZW5kX3dpdGhfbmV3bGluZScsIHByZWZWYWx1ZV07XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuIFtwcmVmTmFtZSwgcHJlZlZhbHVlXTtcbiAgICAgIH1cbiAgICB9KV0pLFxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
