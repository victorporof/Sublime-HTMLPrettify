/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import pick from 'lodash/pick';

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
