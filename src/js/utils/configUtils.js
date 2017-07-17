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
import { isMatchingGlob } from './fileUtils';

// Parses a .jsbeautifyrc json file and returns a sanitized object
// with a consistent and expected format.
export const parseJsbeautifyConfig = async filePath =>
  sanitizeJsbeautifyConfig(await parseJSON5File(filePath));

// Parses the default .jsbeautifyrc json file coming with this plugin.
export const parseDefaultJsbeautifyConfig = () =>
  parseJsbeautifyConfig(path.join(ROOT_DIR, '.jsbeautifyrc.defaults.json'));

// Clones and extends a given .jsbeautifyrc object with the one located at a
// file path. If none exists, a clone of the original is returned.
export const extendJsbeautifyConfig = (newJsbeautifyConfig, oldJsbeautifyConfig) => {
  const oldClonedJsbeautifyConfig = clone(oldJsbeautifyConfig);

  for (const [fileType, newFileSettings] of Object.entries(newJsbeautifyConfig || {})) {
    switch (fileType) {
      case 'all':
      case 'html':
      case 'css':
      case 'js':
      case 'json':
        oldClonedJsbeautifyConfig[fileType] = {
          ...oldClonedJsbeautifyConfig[fileType] || {},
          ...newFileSettings || {},
        };
        break;
      case 'custom':
        for (const [globString, newGlobConfig] of Object.entries(newFileSettings || {})) {
          oldClonedJsbeautifyConfig.custom[globString] = {
            ...oldClonedJsbeautifyConfig.custom[globString] || {},
            ...newGlobConfig || {},
          };
        }
        break;
      default:
        throw new Error(`Unknown .jsbeautifyrc file type: ${fileType}`);
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

// Clones and extends a given .jsbeautifyrc with some additonal custom options
// defined in the "custom" field, which contains globs defining additional
// prettification rules for certain files paths.
export const extendJsbeautifyConfigWithCurrentFileMatchRules = (jsbeautifyConfig) => {
  const clonedJsbeautifyConfig = clone(jsbeautifyConfig);
  clonedJsbeautifyConfig.currentFileMatchRules = {};

  for (const [globString, globFileConfig] of Object.entries(clonedJsbeautifyConfig.custom || {})) {
    for (const [prefName, globPrefValue] of Object.entries(globFileConfig || {})) {
      if (isMatchingGlob(globString)) {
        clonedJsbeautifyConfig.currentFileMatchRules[prefName] = globPrefValue;
      }
    }
  }

  return clonedJsbeautifyConfig;
};

// Clones and extends a given .jsbeautifyrc with some additonal custom options
// retrieved from the editor settings.
export const extendJsbeautifyConfigWithEditorOverrides = (jsbeautifyConfig) => {
  const clonedJsbeautifyConfig = clone(jsbeautifyConfig);
  clonedJsbeautifyConfig.editorOverrides = {};

  if (EDITOR_INDENT_SIZE !== '?') {
    clonedJsbeautifyConfig.editorOverrides.indent_size = +EDITOR_INDENT_SIZE;
  }

  if (EDITOR_INDENT_WITH_TABS !== '?') {
    if (EDITOR_INDENT_WITH_TABS === 'True') {
      clonedJsbeautifyConfig.editorOverrides.indent_with_tabs = true;
      clonedJsbeautifyConfig.editorOverrides.indent_char = '\t';
    } else {
      clonedJsbeautifyConfig.editorOverrides.indent_with_tabs = false;
      clonedJsbeautifyConfig.editorOverrides.indent_char = ' ';
    }
  }

  return clonedJsbeautifyConfig;
};

// Clones and extends a given .jsbeautifyrc with some additonal meta-options
// following some specific rules respecting global editor settings.
export const finalizeJsbeautifyConfig = (jsbeautifyConfig) => {
  const extendedJsbeautifyConfig =
    extendJsbeautifyConfigWithCurrentFileMatchRules(
      extendJsbeautifyConfigWithEditorOverrides(
        jsbeautifyConfig,
      ),
    );

  return {
    html: {
      ...extendedJsbeautifyConfig.all || {},
      ...extendedJsbeautifyConfig.html || {},
      css: extendedJsbeautifyConfig.css,
      js: extendedJsbeautifyConfig.js,
      ...extendedJsbeautifyConfig.currentFileMatchRules || {},
      ...extendedJsbeautifyConfig.editorOverrides || {},
    },

    css: {
      ...extendedJsbeautifyConfig.all || {},
      ...extendedJsbeautifyConfig.css || {},
      ...extendedJsbeautifyConfig.currentFileMatchRules || {},
      ...extendedJsbeautifyConfig.editorOverrides || {},
    },

    js: {
      ...extendedJsbeautifyConfig.all || {},
      ...extendedJsbeautifyConfig.js || {},
      ...extendedJsbeautifyConfig.currentFileMatchRules || {},
      ...extendedJsbeautifyConfig.editorOverrides || {},
    },

    json: {
      ...extendedJsbeautifyConfig.all || {},
      ...extendedJsbeautifyConfig.json || {},
      ...extendedJsbeautifyConfig.currentFileMatchRules || {},
      ...extendedJsbeautifyConfig.editorOverrides || {},
    },
  };
};
