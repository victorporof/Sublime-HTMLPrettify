/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import pick from 'lodash/pick';
import mapObj from 'map-obj';
import minimatch from 'minimatch';

const VALID_JSBEAUTIFY_CONFIG_KEYS = ['html', 'css', 'js', 'json'];

// Utility function special casing "true" and "false" values as being
// actually booleans. This avoids common accidents in json files.
export const sanitizeBooleanishValues = (prefValue) => {
  if (prefValue === 'true') {
    return true;
  }
  if (prefValue === 'false') {
    return false;
  }
  return prefValue;
};

// Utility function special casing "tab" and "space" values as being
// actually \t and \s.
export const sanitizeCharishValues = (prefValue) => {
  if (prefValue === 'tab') {
    return '\t';
  }
  if (prefValue === 'space') {
    return ' ';
  }
  return prefValue;
};

// Utility function massaging .jsbeautifyrc objects into a consistent and
// expected format, discarding unknown keys and sanitizing values.
export const sanitizeJsbeautifyConfig = (jsbeautifyConfig) => {
  const sanitizedJsbeautifyConfig = pick(jsbeautifyConfig, VALID_JSBEAUTIFY_CONFIG_KEYS);

  for (const [fileType, fileConfig] of Object.entries(sanitizedJsbeautifyConfig)) {
    for (const [prefName, prefValue] of Object.entries(fileConfig)) {
      sanitizedJsbeautifyConfig[fileType][prefName] = sanitizeBooleanishValues(prefValue);
    }
  }

  return sanitizedJsbeautifyConfig;
};

// Maps an .editorconfig object to its respective .jsbeautifyconfig form.
export const translateEditorConfigToJsbeautifyConfig = (editorConfig, { root = true } = {}) =>
  mapObj(editorConfig, (key, value) => {
    if (root) {
      if (minimatch('*.html', key)) {
        return ['html', translateEditorConfigToJsbeautifyConfig(value, { root: false })];
      }
      if (minimatch('*.css', key)) {
        return ['css', translateEditorConfigToJsbeautifyConfig(value, { root: false })];
      }
      if (minimatch('*.js', key)) {
        return ['js', translateEditorConfigToJsbeautifyConfig(value, { root: false })];
      }
      if (minimatch('*.json', key)) {
        return ['json', translateEditorConfigToJsbeautifyConfig(value, { root: false })];
      }
      return [key, value];
    }
    if (key === 'indent_style') {
      return ['indent_char', sanitizeCharishValues(value)];
    }
    if (key === 'insert_final_newline') {
      return ['end_with_newline', value];
    }
    return [key, value];
  });
