/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import fs from 'fs-extra';
import editorconfig from 'editorconfig-parser';

import * as stdio from './stdioUtils';

// Parses some .editorconfig text if it's well formed, otherwise silently fails
// and returns undefined.
export const parseEditorConfig = (string) => {
  try {
    return editorconfig.parse(string);
  } catch (e) {
    stdio.info('Failed to parse editorconfig:', string);
    return undefined;
  }
};

// Parses .editorconfig file at a given path and returns an object if it exists
// and isn't malformed, otherwise silently fails and returns undefined.
export const parseEditorConfigFile = async (filePath) => {
  stdio.info('Attempting to parse file:', filePath);
  let contents;
  try {
    contents = await fs.readFile(filePath, { encoding: 'utf8' });
  } catch (e) {
    stdio.info('Failed to read file:', filePath);
    return undefined;
  }
  const parsed = parseEditorConfig(contents);
  if (parsed === undefined) {
    stdio.info('Failed to parse file:', filePath);
    return undefined;
  }
  return parsed;
};
