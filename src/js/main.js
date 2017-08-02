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
  stdio.info(`Using editor text temp file: ${constants.USING_EDITOR_TEXT_TEMP_FILE}`);

  stdio.info(`Global file rules: ${constants.GLOBAL_FILE_RULES_JSON}`);
  stdio.info(`Respecting .editorconfig files: ${constants.RESPECT_EDITORCONFIG_FILES}`);

  stdio.info(`Editor file syntax: ${constants.EDITOR_FILE_SYNTAX}`);
  stdio.info(`Editor indent size: ${constants.EDITOR_INDENT_SIZE}`);
  stdio.info(`Editor indent with tabs: ${constants.EDITOR_INDENT_WITH_TABS}`);

  stdio.info(`Editor text file path: ${constants.EDITOR_TEXT_TEMP_FILE_PATH}`);
  stdio.info(`Editor text file contents: ${constants.EDITOR_TEXT_TEMP_FILE_CONTENTS}`);

  stdio.info(`Original file path: ${constants.ORIGINAL_FILE_PATH}`);
  stdio.info(`Config extra lookup paths: ${constants.CONFIG_EXTRA_LOOKUP_PATHS}`);

  const pathsToLook = putils.getPotentialConfigDirs();

  stdio.info(`Computed extra lookup paths for .jsbeautifyrc: ${JSON.stringify(pathsToLook)}`);

  const baseConfig = await cutils.parseDefaultJsbeautifyConfig();
  const extendedConfig = await cutils.extendJsbeautifyConfigFromFolders(pathsToLook, baseConfig);
  const extendedConfig2 = await cutils.extendJsbeautifyConfigFromEditorConfigInFolders(pathsToLook, extendedConfig);
  const finalConfig = cutils.finalizeJsbeautifyConfig(extendedConfig2);

  stdio.info(`Computed prettify options: ${JSON.stringify(finalConfig)}`);

  const bufferContents = constants.USING_EDITOR_TEXT_TEMP_FILE === 'True'
    ? await fs.readFile(constants.EDITOR_TEXT_TEMP_FILE_PATH, { encoding: 'utf8' })
    : constants.EDITOR_TEXT_TEMP_FILE_CONTENTS;

  if (isCSS()) {
    stdio.info('Attempting to prettify what seems to be a CSS file.');
    stdio.endDiagnostics();
    stdio.beginPrettifiedCode();
    stdio.out(beautify.css(bufferContents, finalConfig.css));
    stdio.endPrettifiedCode();
  } else if (isHTML(bufferContents)) {
    stdio.info('Attempting to prettify what seems to be a HTML file.');
    stdio.endDiagnostics();
    stdio.beginPrettifiedCode();
    stdio.out(beautify.html(bufferContents, finalConfig.html));
    stdio.endPrettifiedCode();
  } else if (isJSON(bufferContents)) {
    stdio.info('Attempting to prettify what seems to be a JSON file.');
    stdio.endDiagnostics();
    stdio.beginPrettifiedCode();
    stdio.out(beautify.js(bufferContents, finalConfig.json));
    stdio.endPrettifiedCode();
  } else if (isJS(bufferContents)) {
    stdio.info('Attempting to prettify what seems to be a JS file.');
    stdio.endDiagnostics();
    stdio.beginPrettifiedCode();
    stdio.out(beautify.js(bufferContents, finalConfig.js));
    stdio.endPrettifiedCode();
  } else {
    stdio.info('Unsupported file type');
    stdio.endDiagnostics();
    stdio.beginPrettifiedCode();
    stdio.out(bufferContents);
    stdio.endPrettifiedCode();
  }
}

main();
