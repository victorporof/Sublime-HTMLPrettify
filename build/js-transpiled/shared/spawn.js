"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

require("core-js/modules/es6.promise");

var _child_process = _interopRequireDefault(require("child_process"));

/*
Copyright 2016 Mozilla

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed
under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
CONDITIONS OF ANY KIND, either express or implied. See the License for the
specific language governing permissions and limitations under the License.
*/
var _default = function _default(command, args) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return new Promise(function (resolve, reject) {
    var stdio = process.platform === 'win32' ? 'ignore' : 'inherit';

    var child = _child_process.default.spawn(command, args, (0, _objectSpread2.default)({
      stdio: stdio
    }, options));

    child.on('error', function (err) {
      reject(err);
    });
    child.on('exit', function (code) {
      resolve(code);
    });
    return child;
  });
};

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9zcGF3bi5qcyJdLCJuYW1lcyI6WyJjb21tYW5kIiwiYXJncyIsIm9wdGlvbnMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInN0ZGlvIiwicHJvY2VzcyIsInBsYXRmb3JtIiwiY2hpbGQiLCJjcCIsInNwYXduIiwib24iLCJlcnIiLCJjb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBWUE7O0FBWkE7Ozs7Ozs7Ozs7O2VBY2Usa0JBQUNBLE9BQUQsRUFBVUMsSUFBVjtBQUFBLE1BQWdCQyxPQUFoQix1RUFBMEIsRUFBMUI7QUFBQSxTQUFpQyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQy9FLFFBQU1DLEtBQUssR0FBR0MsT0FBTyxDQUFDQyxRQUFSLEtBQXFCLE9BQXJCLEdBQ1YsUUFEVSxHQUVWLFNBRko7O0FBSUEsUUFBTUMsS0FBSyxHQUFHQyx1QkFBR0MsS0FBSCxDQUFTWCxPQUFULEVBQWtCQyxJQUFsQjtBQUEwQkssTUFBQUEsS0FBSyxFQUFMQTtBQUExQixPQUFvQ0osT0FBcEMsRUFBZDs7QUFFQU8sSUFBQUEsS0FBSyxDQUFDRyxFQUFOLENBQVMsT0FBVCxFQUFrQixVQUFDQyxHQUFELEVBQVM7QUFDekJSLE1BQUFBLE1BQU0sQ0FBQ1EsR0FBRCxDQUFOO0FBQ0QsS0FGRDtBQUlBSixJQUFBQSxLQUFLLENBQUNHLEVBQU4sQ0FBUyxNQUFULEVBQWlCLFVBQUNFLElBQUQsRUFBVTtBQUN6QlYsTUFBQUEsT0FBTyxDQUFDVSxJQUFELENBQVA7QUFDRCxLQUZEO0FBSUEsV0FBT0wsS0FBUDtBQUNELEdBaEIrQyxDQUFqQztBQUFBLEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuQ29weXJpZ2h0IDIwMTYgTW96aWxsYVxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZFxudW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1JcbkNPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXG5zcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IGNwIGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xuXG5leHBvcnQgZGVmYXVsdCAoY29tbWFuZCwgYXJncywgb3B0aW9ucyA9IHt9KSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gIGNvbnN0IHN0ZGlvID0gcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJ1xuICAgID8gJ2lnbm9yZSdcbiAgICA6ICdpbmhlcml0JztcblxuICBjb25zdCBjaGlsZCA9IGNwLnNwYXduKGNvbW1hbmQsIGFyZ3MsIHsgc3RkaW8sIC4uLm9wdGlvbnMgfSk7XG5cbiAgY2hpbGQub24oJ2Vycm9yJywgKGVycikgPT4ge1xuICAgIHJlamVjdChlcnIpO1xuICB9KTtcblxuICBjaGlsZC5vbignZXhpdCcsIChjb2RlKSA9PiB7XG4gICAgcmVzb2x2ZShjb2RlKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNoaWxkO1xufSk7XG4iXSwiZmlsZSI6InNoYXJlZC9zcGF3bi5qcyJ9
