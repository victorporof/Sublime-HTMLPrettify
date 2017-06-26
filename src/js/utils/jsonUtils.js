/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import fs from 'fs-extra';
import JSON5 from 'json5';

// Parses a json file at a given path and returns an object if it exists
// and isn't malformed, otherwise silently fails and returns undefined.
export default async (filePath) => {
  try {
    return JSON5.parse(await fs.readFile(filePath, { encoding: 'utf8' }));
  } catch (e) {
    return undefined;
  }
};
