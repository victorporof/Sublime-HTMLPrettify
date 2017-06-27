/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import path from 'path';
import fs from 'fs-extra';
import clone from 'lodash/clone';
import promiseArrays from 'promise-arrays';

import parseJson5 from './jsonUtils';
import { sanitizeJsbeautifyConfig } from './configSanitizers';
import { ROOT_DIR } from './paths';

// Parses a .jsbeautifyrc json file and returns a sanitized object
// with a consistent and expected format.
export const parseJsbeautifyConfig = async filePath =>
  sanitizeJsbeautifyConfig(await parseJson5(filePath));

// Parses the default .jsbeautifyrc json file coming with this plugin.
export const parseDefaultJsbeautifyConfig = () =>
  parseJsbeautifyConfig(path.join(ROOT_DIR, '.jsbeautifyrc.defaults'));

// Clones and extends a given .jsbeautifyrc object with the one located at a
// file path. If none exists, a clone of the original is returned.
export const extendJsbeautifyConfigFromFile = async (filePath, oldJsbeautifyConfig) => {
  const newJsbeautifyConfig = await parseJsbeautifyConfig(filePath);
  const oldClonedJsbeautifyConfig = clone(oldJsbeautifyConfig);

  for (const [fileType, newFileConfig] of Object.entries(newJsbeautifyConfig)) {
    for (const [prefName, newPrefValue] of Object.entries(newFileConfig)) {
      oldClonedJsbeautifyConfig[fileType][prefName] = newPrefValue;
    }
  }

  return oldClonedJsbeautifyConfig;
};

// Clones and extends a given .jsbeautifyrc object with the first one found in
// a list of folder paths. If none exists, a clone of the original is returned.
export const extendJsbeautifyConfigFromFolders = async (folderPaths, oldJsbeautifyConfig) => {
  const filesToCheck = folderPaths.map(f => path.join(f, '.jsbeautifyrc'));
  const newJsbeautifyConfigPath = (await promiseArrays.filter(filesToCheck, fs.pathExists))[0];

  if (newJsbeautifyConfigPath) {
    return extendJsbeautifyConfigFromFile(newJsbeautifyConfigPath, oldJsbeautifyConfig);
  }

  return clone(oldJsbeautifyConfig);
};
