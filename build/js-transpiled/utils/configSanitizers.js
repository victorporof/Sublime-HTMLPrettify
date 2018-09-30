"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.translateEditorConfigToJsbeautifyConfig = exports.sanitizeJsbeautifyConfig = exports.sanitizeCharishValues = exports.sanitizeBooleanishValues = void 0;

var _pick = _interopRequireDefault(require("lodash/pick"));

var _isObject = _interopRequireDefault(require("lodash/isObject"));

var _pickBy = _interopRequireDefault(require("lodash/pickBy"));

var _mapObj = _interopRequireDefault(require("map-obj"));

var _isGlob = _interopRequireDefault(require("is-glob"));

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
var VALID_JSBEAUTIFY_CONFIG_KEYS = ['all', 'html', 'css', 'js', 'json', 'custom']; // Utility function special casing "true" and "false" values as being
// actually booleans. This avoids common accidents in json files.

var sanitizeBooleanishValues = function sanitizeBooleanishValues(prefValue) {
  switch (prefValue) {
    case 'true':
      return true;

    case 'false':
      return false;

    default:
      return prefValue;
  }
}; // Utility function special casing "tab" and "space" values as being
// actually \t and \s.


exports.sanitizeBooleanishValues = sanitizeBooleanishValues;

var sanitizeCharishValues = function sanitizeCharishValues(prefValue) {
  switch (prefValue) {
    case 'tab':
      return '\t';

    case 'space':
      return ' ';

    default:
      return prefValue;
  }
}; // Utility function massaging .jsbeautifyrc objects into a consistent and
// expected format, discarding unknown keys and sanitizing values.


exports.sanitizeCharishValues = sanitizeCharishValues;

var sanitizeJsbeautifyConfig = function sanitizeJsbeautifyConfig(jsbeautifyConfig) {
  return (0, _mapObj.default)((0, _pick.default)(jsbeautifyConfig, VALID_JSBEAUTIFY_CONFIG_KEYS), function (fileType, fileSettings) {
    switch (fileType) {
      case 'all':
      case 'html':
      case 'css':
      case 'js':
      case 'json':
        return [fileType, (0, _mapObj.default)(fileSettings, function (prefName, prefValue) {
          return [prefName, sanitizeBooleanishValues(prefValue)];
        })];

      case 'custom':
        return [fileType, (0, _mapObj.default)(fileSettings, function (globString, globConfig) {
          return [globString, (0, _mapObj.default)(globConfig, function (prefName, prefValue) {
            return [prefName, sanitizeBooleanishValues(prefValue)];
          })];
        })];

      default:
        throw new Error("Unknown .jsbeautifyrc file type: ".concat(fileType));
    }
  });
};

exports.sanitizeJsbeautifyConfig = sanitizeJsbeautifyConfig;

var translateEditorConfigToJsbeautifyConfig = function translateEditorConfigToJsbeautifyConfig(editorConfig) {
  return {
    custom: (0, _mapObj.default)((0, _pickBy.default)(editorConfig, function (v, k) {
      return (0, _isGlob.default)(k) && (0, _isObject.default)(v);
    }), function (globString, globConfig) {
      return [globString, (0, _mapObj.default)(globConfig, function (prefName, prefValue) {
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

exports.translateEditorConfigToJsbeautifyConfig = translateEditorConfigToJsbeautifyConfig;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL2NvbmZpZ1Nhbml0aXplcnMuanMiXSwibmFtZXMiOlsiVkFMSURfSlNCRUFVVElGWV9DT05GSUdfS0VZUyIsInNhbml0aXplQm9vbGVhbmlzaFZhbHVlcyIsInByZWZWYWx1ZSIsInNhbml0aXplQ2hhcmlzaFZhbHVlcyIsInNhbml0aXplSnNiZWF1dGlmeUNvbmZpZyIsImpzYmVhdXRpZnlDb25maWciLCJmaWxlVHlwZSIsImZpbGVTZXR0aW5ncyIsInByZWZOYW1lIiwiZ2xvYlN0cmluZyIsImdsb2JDb25maWciLCJFcnJvciIsInRyYW5zbGF0ZUVkaXRvckNvbmZpZ1RvSnNiZWF1dGlmeUNvbmZpZyIsImVkaXRvckNvbmZpZyIsImN1c3RvbSIsInYiLCJrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFJQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFSQTs7O0FBVUEsSUFBTUEsNEJBQTRCLEdBQUcsQ0FDbkMsS0FEbUMsRUFFbkMsTUFGbUMsRUFHbkMsS0FIbUMsRUFJbkMsSUFKbUMsRUFLbkMsTUFMbUMsRUFNbkMsUUFObUMsQ0FBckMsQyxDQVNBO0FBQ0E7O0FBQ08sSUFBTUMsd0JBQXdCLEdBQUcsU0FBM0JBLHdCQUEyQixDQUFDQyxTQUFELEVBQWU7QUFDckQsVUFBUUEsU0FBUjtBQUNFLFNBQUssTUFBTDtBQUNFLGFBQU8sSUFBUDs7QUFDRixTQUFLLE9BQUw7QUFDRSxhQUFPLEtBQVA7O0FBQ0Y7QUFDRSxhQUFPQSxTQUFQO0FBTko7QUFRRCxDQVRNLEMsQ0FXUDtBQUNBOzs7OztBQUNPLElBQU1DLHFCQUFxQixHQUFHLFNBQXhCQSxxQkFBd0IsQ0FBQ0QsU0FBRCxFQUFlO0FBQ2xELFVBQVFBLFNBQVI7QUFDRSxTQUFLLEtBQUw7QUFDRSxhQUFPLElBQVA7O0FBQ0YsU0FBSyxPQUFMO0FBQ0UsYUFBTyxHQUFQOztBQUNGO0FBQ0UsYUFBT0EsU0FBUDtBQU5KO0FBUUQsQ0FUTSxDLENBV1A7QUFDQTs7Ozs7QUFDTyxJQUFNRSx3QkFBd0IsR0FBRyxTQUEzQkEsd0JBQTJCLENBQUFDLGdCQUFnQjtBQUFBLFNBQUkscUJBQU8sbUJBQUtBLGdCQUFMLEVBQXVCTCw0QkFBdkIsQ0FBUCxFQUE2RCxVQUFDTSxRQUFELEVBQVdDLFlBQVgsRUFBNEI7QUFDbkosWUFBUUQsUUFBUjtBQUNFLFdBQUssS0FBTDtBQUNBLFdBQUssTUFBTDtBQUNBLFdBQUssS0FBTDtBQUNBLFdBQUssSUFBTDtBQUNBLFdBQUssTUFBTDtBQUNFLGVBQU8sQ0FDTEEsUUFESyxFQUNLLHFCQUFPQyxZQUFQLEVBQXFCLFVBQUNDLFFBQUQsRUFBV04sU0FBWDtBQUFBLGlCQUF5QixDQUN0RE0sUUFEc0QsRUFDNUNQLHdCQUF3QixDQUFDQyxTQUFELENBRG9CLENBQXpCO0FBQUEsU0FBckIsQ0FETCxDQUFQOztBQUtGLFdBQUssUUFBTDtBQUNFLGVBQU8sQ0FDTEksUUFESyxFQUNLLHFCQUFPQyxZQUFQLEVBQXFCLFVBQUNFLFVBQUQsRUFBYUMsVUFBYjtBQUFBLGlCQUE0QixDQUN6REQsVUFEeUQsRUFDN0MscUJBQU9DLFVBQVAsRUFBbUIsVUFBQ0YsUUFBRCxFQUFXTixTQUFYO0FBQUEsbUJBQXlCLENBQ3RETSxRQURzRCxFQUM1Q1Asd0JBQXdCLENBQUNDLFNBQUQsQ0FEb0IsQ0FBekI7QUFBQSxXQUFuQixDQUQ2QyxDQUE1QjtBQUFBLFNBQXJCLENBREwsQ0FBUDs7QUFPRjtBQUNFLGNBQU0sSUFBSVMsS0FBSiw0Q0FBOENMLFFBQTlDLEVBQU47QUFwQko7QUFzQkQsR0F2QjJELENBQUo7QUFBQSxDQUFqRDs7OztBQXlCQSxJQUFNTSx1Q0FBdUMsR0FBRyxTQUExQ0EsdUNBQTBDLENBQUFDLFlBQVk7QUFBQSxTQUFLO0FBQ3RFQyxJQUFBQSxNQUFNLEVBQUUscUJBQU8scUJBQU9ELFlBQVAsRUFBcUIsVUFBQ0UsQ0FBRCxFQUFJQyxDQUFKO0FBQUEsYUFBVSxxQkFBT0EsQ0FBUCxLQUFhLHVCQUFTRCxDQUFULENBQXZCO0FBQUEsS0FBckIsQ0FBUCxFQUFpRSxVQUFDTixVQUFELEVBQWFDLFVBQWI7QUFBQSxhQUE0QixDQUNuR0QsVUFEbUcsRUFDdkYscUJBQU9DLFVBQVAsRUFBbUIsVUFBQ0YsUUFBRCxFQUFXTixTQUFYLEVBQXlCO0FBQ3RELGdCQUFRTSxRQUFSO0FBQ0UsZUFBSyxjQUFMO0FBQ0UsbUJBQU8sQ0FDTCxhQURLLEVBQ1VMLHFCQUFxQixDQUFDRCxTQUFELENBRC9CLENBQVA7O0FBR0YsZUFBSyxzQkFBTDtBQUNFLG1CQUFPLENBQ0wsa0JBREssRUFDZUEsU0FEZixDQUFQOztBQUdGO0FBQ0UsbUJBQU8sQ0FDTE0sUUFESyxFQUNLTixTQURMLENBQVA7QUFWSjtBQWNELE9BZlcsQ0FEdUYsQ0FBNUI7QUFBQSxLQUFqRTtBQUQ4RCxHQUFMO0FBQUEsQ0FBNUQiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLiAqL1xuXG5pbXBvcnQgcGljayBmcm9tICdsb2Rhc2gvcGljayc7XG5pbXBvcnQgaXNPYmplY3QgZnJvbSAnbG9kYXNoL2lzT2JqZWN0JztcbmltcG9ydCBwaWNrQnkgZnJvbSAnbG9kYXNoL3BpY2tCeSc7XG5pbXBvcnQgbWFwT2JqIGZyb20gJ21hcC1vYmonO1xuaW1wb3J0IGlzR2xvYiBmcm9tICdpcy1nbG9iJztcblxuY29uc3QgVkFMSURfSlNCRUFVVElGWV9DT05GSUdfS0VZUyA9IFtcbiAgJ2FsbCcsXG4gICdodG1sJyxcbiAgJ2NzcycsXG4gICdqcycsXG4gICdqc29uJyxcbiAgJ2N1c3RvbScsXG5dO1xuXG4vLyBVdGlsaXR5IGZ1bmN0aW9uIHNwZWNpYWwgY2FzaW5nIFwidHJ1ZVwiIGFuZCBcImZhbHNlXCIgdmFsdWVzIGFzIGJlaW5nXG4vLyBhY3R1YWxseSBib29sZWFucy4gVGhpcyBhdm9pZHMgY29tbW9uIGFjY2lkZW50cyBpbiBqc29uIGZpbGVzLlxuZXhwb3J0IGNvbnN0IHNhbml0aXplQm9vbGVhbmlzaFZhbHVlcyA9IChwcmVmVmFsdWUpID0+IHtcbiAgc3dpdGNoIChwcmVmVmFsdWUpIHtcbiAgICBjYXNlICd0cnVlJzpcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIGNhc2UgJ2ZhbHNlJzpcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHByZWZWYWx1ZTtcbiAgfVxufTtcblxuLy8gVXRpbGl0eSBmdW5jdGlvbiBzcGVjaWFsIGNhc2luZyBcInRhYlwiIGFuZCBcInNwYWNlXCIgdmFsdWVzIGFzIGJlaW5nXG4vLyBhY3R1YWxseSBcXHQgYW5kIFxccy5cbmV4cG9ydCBjb25zdCBzYW5pdGl6ZUNoYXJpc2hWYWx1ZXMgPSAocHJlZlZhbHVlKSA9PiB7XG4gIHN3aXRjaCAocHJlZlZhbHVlKSB7XG4gICAgY2FzZSAndGFiJzpcbiAgICAgIHJldHVybiAnXFx0JztcbiAgICBjYXNlICdzcGFjZSc6XG4gICAgICByZXR1cm4gJyAnO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gcHJlZlZhbHVlO1xuICB9XG59O1xuXG4vLyBVdGlsaXR5IGZ1bmN0aW9uIG1hc3NhZ2luZyAuanNiZWF1dGlmeXJjIG9iamVjdHMgaW50byBhIGNvbnNpc3RlbnQgYW5kXG4vLyBleHBlY3RlZCBmb3JtYXQsIGRpc2NhcmRpbmcgdW5rbm93biBrZXlzIGFuZCBzYW5pdGl6aW5nIHZhbHVlcy5cbmV4cG9ydCBjb25zdCBzYW5pdGl6ZUpzYmVhdXRpZnlDb25maWcgPSBqc2JlYXV0aWZ5Q29uZmlnID0+IG1hcE9iaihwaWNrKGpzYmVhdXRpZnlDb25maWcsIFZBTElEX0pTQkVBVVRJRllfQ09ORklHX0tFWVMpLCAoZmlsZVR5cGUsIGZpbGVTZXR0aW5ncykgPT4ge1xuICBzd2l0Y2ggKGZpbGVUeXBlKSB7XG4gICAgY2FzZSAnYWxsJzpcbiAgICBjYXNlICdodG1sJzpcbiAgICBjYXNlICdjc3MnOlxuICAgIGNhc2UgJ2pzJzpcbiAgICBjYXNlICdqc29uJzpcbiAgICAgIHJldHVybiBbXG4gICAgICAgIGZpbGVUeXBlLCBtYXBPYmooZmlsZVNldHRpbmdzLCAocHJlZk5hbWUsIHByZWZWYWx1ZSkgPT4gW1xuICAgICAgICAgIHByZWZOYW1lLCBzYW5pdGl6ZUJvb2xlYW5pc2hWYWx1ZXMocHJlZlZhbHVlKSxcbiAgICAgICAgXSksXG4gICAgICBdO1xuICAgIGNhc2UgJ2N1c3RvbSc6XG4gICAgICByZXR1cm4gW1xuICAgICAgICBmaWxlVHlwZSwgbWFwT2JqKGZpbGVTZXR0aW5ncywgKGdsb2JTdHJpbmcsIGdsb2JDb25maWcpID0+IFtcbiAgICAgICAgICBnbG9iU3RyaW5nLCBtYXBPYmooZ2xvYkNvbmZpZywgKHByZWZOYW1lLCBwcmVmVmFsdWUpID0+IFtcbiAgICAgICAgICAgIHByZWZOYW1lLCBzYW5pdGl6ZUJvb2xlYW5pc2hWYWx1ZXMocHJlZlZhbHVlKSxcbiAgICAgICAgICBdKSxcbiAgICAgICAgXSksXG4gICAgICBdO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gLmpzYmVhdXRpZnlyYyBmaWxlIHR5cGU6ICR7ZmlsZVR5cGV9YCk7XG4gIH1cbn0pO1xuXG5leHBvcnQgY29uc3QgdHJhbnNsYXRlRWRpdG9yQ29uZmlnVG9Kc2JlYXV0aWZ5Q29uZmlnID0gZWRpdG9yQ29uZmlnID0+ICh7XG4gIGN1c3RvbTogbWFwT2JqKHBpY2tCeShlZGl0b3JDb25maWcsICh2LCBrKSA9PiBpc0dsb2IoaykgJiYgaXNPYmplY3QodikpLCAoZ2xvYlN0cmluZywgZ2xvYkNvbmZpZykgPT4gW1xuICAgIGdsb2JTdHJpbmcsIG1hcE9iaihnbG9iQ29uZmlnLCAocHJlZk5hbWUsIHByZWZWYWx1ZSkgPT4ge1xuICAgICAgc3dpdGNoIChwcmVmTmFtZSkge1xuICAgICAgICBjYXNlICdpbmRlbnRfc3R5bGUnOlxuICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAnaW5kZW50X2NoYXInLCBzYW5pdGl6ZUNoYXJpc2hWYWx1ZXMocHJlZlZhbHVlKSxcbiAgICAgICAgICBdO1xuICAgICAgICBjYXNlICdpbnNlcnRfZmluYWxfbmV3bGluZSc6XG4gICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICdlbmRfd2l0aF9uZXdsaW5lJywgcHJlZlZhbHVlLFxuICAgICAgICAgIF07XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHByZWZOYW1lLCBwcmVmVmFsdWUsXG4gICAgICAgICAgXTtcbiAgICAgIH1cbiAgICB9KSxcbiAgXSksXG59KTtcbiJdLCJmaWxlIjoidXRpbHMvY29uZmlnU2FuaXRpemVycy5qcyJ9
