/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import pick from 'lodash/pick';
import isObject from 'lodash/isObject';
import pickBy from 'lodash/pickBy';
import mapObj from 'map-obj';
import isGlob from 'is-glob';

const VALID_JSBEAUTIFY_CONFIG_KEYS = [
  'all',
  'html',
  'css',
  'js',
  'json',
  'custom',
];

// Utility function special casing "true" and "false" values as being
// actually booleans. This avoids common accidents in json files.
export const sanitizeBooleanishValues = (prefValue) => {
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
export const sanitizeCharishValues = (prefValue) => {
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
export const sanitizeJsbeautifyConfig = jsbeautifyConfig =>
  mapObj(pick(jsbeautifyConfig, VALID_JSBEAUTIFY_CONFIG_KEYS), (fileType, fileSettings) => {
    switch (fileType) {
      case 'all':
      case 'html':
      case 'css':
      case 'js':
      case 'json':
        return [fileType, mapObj(fileSettings, (prefName, prefValue) =>
          [prefName, sanitizeBooleanishValues(prefValue)],
        )];
      case 'custom':
        return [fileType, mapObj(fileSettings, (globString, globConfig) =>
          [globString, mapObj(globConfig, (prefName, prefValue) =>
            [prefName, sanitizeBooleanishValues(prefValue)],
          )],
        )];
      default:
        throw new Error(`Unknown .jsbeautifyrc file type: ${fileType}`);
    }
  });

export const translateEditorConfigToJsbeautifyConfig = editorConfig => ({
  custom: mapObj(pickBy(editorConfig, (v, k) => isGlob(k) && isObject(v)), (globString, globConfig) =>
    [globString, mapObj(globConfig, (prefName, prefValue) => {
      switch (prefName) {
        case 'indent_style':
          return ['indent_char', sanitizeCharishValues(prefValue)];
        case 'insert_final_newline':
          return ['end_with_newline', prefValue];
        default:
          return [prefName, prefValue];
      }
    })]),
});
