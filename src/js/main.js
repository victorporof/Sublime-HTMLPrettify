/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import fs from 'fs-extra';
import * as beautify from 'js-beautify';

import * as constants from './utils/constants';
import * as stdio from './utils/stdioUtils';
import * as cutils from './utils/configUtils';
import * as putils from './utils/pathUtils';
import { isCSS, isHTML, isJSON, isJS } from './utils/fileUtils';

process.on('uncaughtException', (err) => {
  stdio.err('Uncaught exception', err);
});

process.on('unhandledRejection', (err) => {
  stdio.err('Unhandled promise rejection', err);
});

async function main() {
  stdio.beginDiagnostics();

  // Dump some diagnostics messages, parsed out by the plugin.
  stdio.info(`Using editor file syntax: ${constants.EDITOR_FILE_SYNTAX}`);
  stdio.info(`Using editor indent size: ${constants.EDITOR_INDENT_SIZE}`);
  stdio.info(`Using editor indent with tabs: ${constants.EDITOR_INDENT_WITH_TABS}`);
  stdio.info(`Using .editorconfig files: ${constants.RESPECT_EDITORCONFIG_FILES}`);
  stdio.info(`Using global file rules: ${constants.GLOBAL_FILE_RULES_JSON}`);
  stdio.info(`Using editor text file path: ${constants.EDITOR_TEXT_FILE_PATH}`);
  stdio.info(`Using original file path: ${constants.ORIGINAL_FILE_PATH}`);

  const baseConfig = await cutils.parseDefaultJsbeautifyConfig();
  const pathsToLook = putils.getPotentialConfigDirs();
  const extendedConfig = await cutils.extendJsbeautifyConfigFromFolders(pathsToLook, baseConfig);
  const extendedConfig2 = await cutils.extendJsbeautifyConfigFromEditorConfigInFolders(pathsToLook, extendedConfig);
  const finalConfig = cutils.finalizeJsbeautifyConfig(extendedConfig2);

  stdio.info(`Using paths for .jsbeautifyrc: ${JSON.stringify(pathsToLook)}`);
  stdio.info(`Using prettify options: ${JSON.stringify(finalConfig)}`);

  const fileContents = await fs.readFile(constants.EDITOR_TEXT_FILE_PATH, { encoding: 'utf8' });

  if (isCSS()) {
    stdio.info('Attempting to prettify what seems to be a CSS file.');
    stdio.endDiagnostics();
    stdio.beginPrettifiedCode();
    stdio.out(beautify.css(fileContents, finalConfig.css));
    stdio.endPrettifiedCode();
  } else if (isHTML(fileContents)) {
    stdio.info('Attempting to prettify what seems to be a HTML file.');
    stdio.endDiagnostics();
    stdio.beginPrettifiedCode();
    stdio.out(beautify.html(fileContents, finalConfig.html));
    stdio.endPrettifiedCode();
  } else if (isJSON()) {
    stdio.info('Attempting to prettify what seems to be a JSON file.');
    stdio.endDiagnostics();
    stdio.beginPrettifiedCode();
    stdio.out(beautify.js(fileContents, finalConfig.json));
    stdio.endPrettifiedCode();
  } else if (isJS(fileContents)) {
    stdio.info('Attempting to prettify what seems to be a JS file.');
    stdio.endDiagnostics();
    stdio.beginPrettifiedCode();
    stdio.out(beautify.js(fileContents, finalConfig.js));
    stdio.endPrettifiedCode();
  } else {
    stdio.info('Unsupported file type');
    stdio.endDiagnostics();
    stdio.beginPrettifiedCode();
    stdio.out(fileContents);
    stdio.endPrettifiedCode();
  }
}

main();
