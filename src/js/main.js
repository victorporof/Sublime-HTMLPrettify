/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import path from 'path';
import fs from 'fs-extra';

import * as beautify from 'js-beautify';

import * as stdio from './utils/stdioUtils';
import { parseDefaultJsbeautifyConfig, extendJsbeautifyConfigFromFolders } from './utils/configUtils';
import { finalizeJsbeautifyConfig } from './utils/configUtils';
import { getPotentialConfigDirs } from './utils/pathUtils';
import { isCSS, isHTML, isJSON, isJS, isAllowedFilePath } from './utils/fileUtils';
import { EDITOR_FILE_SYNTAX, EDITOR_INDENT_SIZE, EDITOR_INDENT_WITH_TABS } from './utils/constants';
import { EDITOR_TEXT_FILE_PATH, ORIGINAL_FILE_PATH } from './utils/constants';

process.on('uncaughtException', (err) => {
  stdio.err('Uncaught exception', err);
});

process.on('unhandledRejection', (err) => {
  stdio.err('Unhandled promise rejection', err);
});

async function main() {
  stdio.beginDiagnostics();

  const baseConfig = await parseDefaultJsbeautifyConfig();
  const pathsToLook = getPotentialConfigDirs(path.dirname(ORIGINAL_FILE_PATH));
  const extendedConfig = await extendJsbeautifyConfigFromFolders(pathsToLook, baseConfig);
  const finalConfig = finalizeJsbeautifyConfig(extendedConfig, EDITOR_INDENT_SIZE, EDITOR_INDENT_WITH_TABS);

  // Dump some diagnostics messages, parsed out by the plugin.
  stdio.info(`Using editor file syntax: ${EDITOR_FILE_SYNTAX}`);
  stdio.info(`Using editor indent size: ${EDITOR_INDENT_SIZE}`);
  stdio.info(`Using editor indent with tabs: ${EDITOR_INDENT_WITH_TABS}`);
  stdio.info(`Using editor text path: ${EDITOR_TEXT_FILE_PATH}`);
  stdio.info(`Using original file path: ${ORIGINAL_FILE_PATH}`);
  stdio.info(`Using paths for .jsbeautifyrc: ${JSON.stringify(pathsToLook)}`);
  stdio.info(`Using prettify options: ${JSON.stringify(finalConfig)}`);

  const fileContents = await fs.readFile(EDITOR_TEXT_FILE_PATH, { encoding: 'utf8' });

  if (isCSS(EDITOR_FILE_SYNTAX, ORIGINAL_FILE_PATH, finalConfig)) {
    stdio.info('Attempting to prettify what seems to be a CSS file.');
    stdio.endDiagnostics();
    stdio.beginPrettifiedCode();
    stdio.out(beautify.css(fileContents, finalConfig.css));
    stdio.endPrettifiedCode();
  } else if (isHTML(EDITOR_FILE_SYNTAX, ORIGINAL_FILE_PATH, fileContents, finalConfig)) {
    stdio.info('Attempting to prettify what seems to be a HTML file.');
    stdio.endDiagnostics();
    stdio.beginPrettifiedCode();
    stdio.out(beautify.html(fileContents, finalConfig.html));
    stdio.endPrettifiedCode();
  } else if (isJSON(EDITOR_FILE_SYNTAX, ORIGINAL_FILE_PATH, fileContents, finalConfig)) {
    stdio.info('Attempting to prettify what seems to be a JSON file.');
    stdio.endDiagnostics();
    stdio.beginPrettifiedCode();
    stdio.out(beautify.js(fileContents, finalConfig.json));
    stdio.endPrettifiedCode();
  } else if (isJS(EDITOR_FILE_SYNTAX, ORIGINAL_FILE_PATH, fileContents, finalConfig)) {
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
