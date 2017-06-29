/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import path from 'path';
import fs from 'fs-extra';
import clone from 'lodash/clone';
import promiseArrays from 'promise-arrays';

import { ROOT_DIR } from './paths';
import { EDITOR_INDENT_SIZE, EDITOR_INDENT_WITH_TABS } from './constants';
import { parseJSON5File } from './jsonUtils';
import { parseEditorConfigFile } from './editorconfigUtils';
import { sanitizeJsbeautifyConfig, translateEditorConfigToJsbeautifyConfig } from './configSanitizers';

// Parses a .jsbeautifyrc json file and returns a sanitized object
// with a consistent and expected format.
export const parseJsbeautifyConfig = async filePath =>
  sanitizeJsbeautifyConfig(await parseJSON5File(filePath));

// Parses the default .jsbeautifyrc json file coming with this plugin.
export const parseDefaultJsbeautifyConfig = () =>
  parseJsbeautifyConfig(path.join(ROOT_DIR, '.jsbeautifyrc.defaults'));

// Clones and extends a given .jsbeautifyrc object with the one located at a
// file path. If none exists, a clone of the original is returned.
export const extendJsbeautifyConfig = async (newJsbeautifyConfig, oldJsbeautifyConfig) => {
  const oldClonedJsbeautifyConfig = clone(oldJsbeautifyConfig);

  for (const [fileType, newFileConfig] of Object.entries(newJsbeautifyConfig)) {
    for (const [prefName, newPrefValue] of Object.entries(newFileConfig)) {
      oldClonedJsbeautifyConfig[fileType][prefName] = newPrefValue;
    }
  }

  return oldClonedJsbeautifyConfig;
};

// Clones and extends a given .jsbeautifyrc object with the one located at a
// file path. If none exists, a clone of the original is returned.
export const extendJsbeautifyConfigFromFile = async (filePath, oldJsbeautifyConfig) => {
  const newJsbeautifyConfig = await parseJsbeautifyConfig(filePath);
  return extendJsbeautifyConfig(newJsbeautifyConfig, oldJsbeautifyConfig);
};

// Clones and extends a given .jsbeautifyrc object with an .editorconfig file
// located at a file path. If none exists, a clone of the original is returned.
export const extendJsbeautifyConfigFromEditorConfigFile = async (filePath, oldJsbeautifyConfig) => {
  const newEditorConfig = await parseEditorConfigFile(filePath);
  const newJsbeautifyConfig = sanitizeJsbeautifyConfig(translateEditorConfigToJsbeautifyConfig(newEditorConfig));
  return extendJsbeautifyConfig(newJsbeautifyConfig, oldJsbeautifyConfig);
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

// Clones and extends a given .jsbeautifyrc object with the first .editorconfig
// file found in a list of folder paths. If none exists, a clone of the original
// is returned.
export const extendJsbeautifyConfigFromEditorConfigInFolders = async (folderPaths, oldJsbeautifyConfig) => {
  const filesToCheck = folderPaths.map(f => path.join(f, '.editorconfig'));
  const newEditorConfigPath = (await promiseArrays.filter(filesToCheck, fs.pathExists))[0];

  if (newEditorConfigPath) {
    return extendJsbeautifyConfigFromEditorConfigFile(newEditorConfigPath, oldJsbeautifyConfig);
  }

  return clone(oldJsbeautifyConfig);
};

// Clones and extends a given .jsbeautifyrc with some additonal meta-options
// following some specific rules respecting global editor settings.
export const finalizeJsbeautifyConfig = (jsbeautifyConfig) => {
  const newJsbeautifyConfig = clone(jsbeautifyConfig);

  if (EDITOR_INDENT_SIZE !== '?') {
    newJsbeautifyConfig.html.indent_size = +EDITOR_INDENT_SIZE;
    newJsbeautifyConfig.css.indent_size = +EDITOR_INDENT_SIZE;
    newJsbeautifyConfig.js.indent_size = +EDITOR_INDENT_SIZE;
    newJsbeautifyConfig.json.indent_size = +EDITOR_INDENT_SIZE;
  }
  if (EDITOR_INDENT_WITH_TABS !== '?') {
    if (EDITOR_INDENT_WITH_TABS === 'True') {
      newJsbeautifyConfig.html.indent_with_tabs = true;
      newJsbeautifyConfig.html.indent_char = '\t';
      newJsbeautifyConfig.css.indent_with_tabs = true;
      newJsbeautifyConfig.css.indent_char = '\t';
      newJsbeautifyConfig.js.indent_with_tabs = true;
      newJsbeautifyConfig.js.indent_char = '\t';
      newJsbeautifyConfig.json.indent_with_tabs = true;
      newJsbeautifyConfig.json.indent_char = '\t';
    } else {
      newJsbeautifyConfig.html.indent_with_tabs = false;
      newJsbeautifyConfig.html.indent_char = ' ';
      newJsbeautifyConfig.css.indent_with_tabs = false;
      newJsbeautifyConfig.css.indent_char = ' ';
      newJsbeautifyConfig.js.indent_with_tabs = false;
      newJsbeautifyConfig.js.indent_char = ' ';
      newJsbeautifyConfig.json.indent_with_tabs = false;
      newJsbeautifyConfig.json.indent_char = ' ';
    }
  }

  newJsbeautifyConfig.html.js = newJsbeautifyConfig.js;
  newJsbeautifyConfig.html.css = newJsbeautifyConfig.css;

  return newJsbeautifyConfig;
};
