'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.USER_HOME_DIR = exports.ROOT_DIR = exports.PATH_SEP = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PATH_SEP = exports.PATH_SEP = _path2.default.sep || '/'; /* This Source Code Form is subject to the terms of the Mozilla Public
                                                              * License, v. 2.0. If a copy of the MPL was not distributed with this
                                                              * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var ROOT_DIR = exports.ROOT_DIR = _path2.default.resolve(_path2.default.join(__dirname, '..', '..', '..'));

var USER_HOME_DIR = exports.USER_HOME_DIR = process.env.HOME || process.env.USERPROFILE || _path2.default.join(process.env.HOMEDRIVE, process.env.HOMEPATH);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL3BhdGhzLmpzIl0sIm5hbWVzIjpbIlBBVEhfU0VQIiwic2VwIiwiUk9PVF9ESVIiLCJyZXNvbHZlIiwiam9pbiIsIl9fZGlybmFtZSIsIlVTRVJfSE9NRV9ESVIiLCJwcm9jZXNzIiwiZW52IiwiSE9NRSIsIlVTRVJQUk9GSUxFIiwiSE9NRURSSVZFIiwiSE9NRVBBVEgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFJQTs7Ozs7O0FBRU8sSUFBTUEsOEJBQVcsZUFBS0MsR0FBTCxJQUFZLEdBQTdCLEMsQ0FOUDs7OztBQVFPLElBQU1DLDhCQUFXLGVBQUtDLE9BQUwsQ0FBYSxlQUFLQyxJQUFMLENBQVVDLFNBQVYsRUFBcUIsSUFBckIsRUFBMkIsSUFBM0IsRUFBaUMsSUFBakMsQ0FBYixDQUFqQjs7QUFFQSxJQUFNQyx3Q0FDWEMsUUFBUUMsR0FBUixDQUFZQyxJQUFaLElBQ0FGLFFBQVFDLEdBQVIsQ0FBWUUsV0FEWixJQUVBLGVBQUtOLElBQUwsQ0FBVUcsUUFBUUMsR0FBUixDQUFZRyxTQUF0QixFQUFpQ0osUUFBUUMsR0FBUixDQUFZSSxRQUE3QyxDQUhLIiwiZmlsZSI6InV0aWxzL3BhdGhzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy4gKi9cblxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmV4cG9ydCBjb25zdCBQQVRIX1NFUCA9IHBhdGguc2VwIHx8ICcvJztcblxuZXhwb3J0IGNvbnN0IFJPT1RfRElSID0gcGF0aC5yZXNvbHZlKHBhdGguam9pbihfX2Rpcm5hbWUsICcuLicsICcuLicsICcuLicpKTtcblxuZXhwb3J0IGNvbnN0IFVTRVJfSE9NRV9ESVIgPVxuICBwcm9jZXNzLmVudi5IT01FIHx8XG4gIHByb2Nlc3MuZW52LlVTRVJQUk9GSUxFIHx8XG4gIHBhdGguam9pbihwcm9jZXNzLmVudi5IT01FRFJJVkUsIHByb2Nlc3MuZW52LkhPTUVQQVRIKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
