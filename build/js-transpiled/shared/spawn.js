"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9zcGF3bi5qcyJdLCJuYW1lcyI6WyJjb21tYW5kIiwiYXJncyIsIm9wdGlvbnMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInN0ZGlvIiwicHJvY2VzcyIsInBsYXRmb3JtIiwiY2hpbGQiLCJjcCIsInNwYXduIiwib24iLCJlcnIiLCJjb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVlBOztBQVpBOzs7Ozs7Ozs7OztlQWNlLGtCQUFDQSxPQUFELEVBQVVDLElBQVY7QUFBQSxNQUFnQkMsT0FBaEIsdUVBQTBCLEVBQTFCO0FBQUEsU0FBaUMsSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUMvRSxRQUFNQyxLQUFLLEdBQUdDLE9BQU8sQ0FBQ0MsUUFBUixLQUFxQixPQUFyQixHQUNWLFFBRFUsR0FFVixTQUZKOztBQUlBLFFBQU1DLEtBQUssR0FBR0MsdUJBQUdDLEtBQUgsQ0FBU1gsT0FBVCxFQUFrQkMsSUFBbEI7QUFBMEJLLE1BQUFBLEtBQUssRUFBTEE7QUFBMUIsT0FBb0NKLE9BQXBDLEVBQWQ7O0FBRUFPLElBQUFBLEtBQUssQ0FBQ0csRUFBTixDQUFTLE9BQVQsRUFBa0IsVUFBQ0MsR0FBRCxFQUFTO0FBQ3pCUixNQUFBQSxNQUFNLENBQUNRLEdBQUQsQ0FBTjtBQUNELEtBRkQ7QUFJQUosSUFBQUEsS0FBSyxDQUFDRyxFQUFOLENBQVMsTUFBVCxFQUFpQixVQUFDRSxJQUFELEVBQVU7QUFDekJWLE1BQUFBLE9BQU8sQ0FBQ1UsSUFBRCxDQUFQO0FBQ0QsS0FGRDtBQUlBLFdBQU9MLEtBQVA7QUFDRCxHQWhCK0MsQ0FBakM7QUFBQSxDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbkNvcHlyaWdodCAyMDE2IE1vemlsbGFcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWRcbnVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SXG5DT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZVxuc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCBjcCBmcm9tICdjaGlsZF9wcm9jZXNzJztcblxuZXhwb3J0IGRlZmF1bHQgKGNvbW1hbmQsIGFyZ3MsIG9wdGlvbnMgPSB7fSkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICBjb25zdCBzdGRpbyA9IHByb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMidcbiAgICA/ICdpZ25vcmUnXG4gICAgOiAnaW5oZXJpdCc7XG5cbiAgY29uc3QgY2hpbGQgPSBjcC5zcGF3bihjb21tYW5kLCBhcmdzLCB7IHN0ZGlvLCAuLi5vcHRpb25zIH0pO1xuXG4gIGNoaWxkLm9uKCdlcnJvcicsIChlcnIpID0+IHtcbiAgICByZWplY3QoZXJyKTtcbiAgfSk7XG5cbiAgY2hpbGQub24oJ2V4aXQnLCAoY29kZSkgPT4ge1xuICAgIHJlc29sdmUoY29kZSk7XG4gIH0pO1xuXG4gIHJldHVybiBjaGlsZDtcbn0pO1xuIl0sImZpbGUiOiJzaGFyZWQvc3Bhd24uanMifQ==
