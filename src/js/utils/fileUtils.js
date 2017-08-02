/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { basename } from 'path';

import minimatch from 'minimatch';

import { GLOBAL_FILE_RULES_JSON, ORIGINAL_FILE_PATH, EDITOR_FILE_SYNTAX } from './constants';
import { parseJSON5 } from './jsonUtils';

const GLOBAL_FILE_RULES = parseJSON5(GLOBAL_FILE_RULES_JSON);

// Checks if a file path is allowed by regexing the file name and expecting
// it not to match certain expressions.
const isDisallowedFilePattern = (fileType, filePath) => {
  for (const pattern of (GLOBAL_FILE_RULES[fileType] || {}).disallowed_file_patterns || []) {
    if (filePath.match(new RegExp(pattern, 'i'))) {
      return true;
    }
  }
  return false;
};

// Checks if a file is of a particular type by regexing the file name and
// expecting a certain extension.
const hasAllowedFileExtension = (expectedType, filePath) => {
  for (const extension of (GLOBAL_FILE_RULES[expectedType] || {}).allowed_file_extensions || []) {
    if (filePath.match(new RegExp(`\\.${extension}$`, 'i'))) {
      return true;
    }
  }
  return false;
};

// Checks if a file is of a particular type by regexing the syntax name and
// expecting a pattern.
const hasAllowedFileSyntax = (expectedType, fileSyntax) => {
  for (const pattern of (GLOBAL_FILE_RULES[expectedType] || {}).allowed_file_syntaxes || []) {
    if (fileSyntax.toLowerCase().includes(pattern)) {
      return true;
    }
  }
  return false;
};

export const isCSS = () => {
  // If file unsaved, there's no good way to determine whether or not it's
  // CSS based on the file contents, so just bail.
  if (ORIGINAL_FILE_PATH === '?') {
    return false;
  }
  if (isDisallowedFilePattern('css', ORIGINAL_FILE_PATH)) {
    return false;
  }
  const allowedExtension = hasAllowedFileExtension('css', ORIGINAL_FILE_PATH);
  if (EDITOR_FILE_SYNTAX === '?') {
    return allowedExtension;
  }
  const allowedSyntax = hasAllowedFileSyntax('css', EDITOR_FILE_SYNTAX);
  return allowedSyntax || allowedExtension;
};

export const isHTML = (bufferContents) => {
  // If file unsaved, check if first non-whitespace character is &lt;
  if (ORIGINAL_FILE_PATH === '?') {
    return bufferContents.match(/^\s*</);
  }
  if (isDisallowedFilePattern('html', ORIGINAL_FILE_PATH)) {
    return false;
  }
  const allowedExtension = hasAllowedFileExtension('html', ORIGINAL_FILE_PATH);
  if (EDITOR_FILE_SYNTAX === '?') {
    return allowedExtension;
  }
  const allowedSyntax = hasAllowedFileSyntax('html', EDITOR_FILE_SYNTAX);
  return allowedSyntax || allowedExtension;
};

export const isJSON = () => {
  // If file unsaved, there's no good way to determine whether or not it's
  // JSON based on the file contents, so just bail.
  if (ORIGINAL_FILE_PATH === '?') {
    return false;
  }
  if (isDisallowedFilePattern('json', ORIGINAL_FILE_PATH)) {
    return false;
  }
  const allowedExtension = hasAllowedFileExtension('json', ORIGINAL_FILE_PATH);
  if (EDITOR_FILE_SYNTAX === '?') {
    return allowedExtension;
  }
  const allowedSyntax = hasAllowedFileSyntax('json', EDITOR_FILE_SYNTAX);
  return allowedSyntax || allowedExtension;
};

export const isJS = (bufferContents) => {
  // If file unsaved, check if first non-whitespace character is NOT &lt;
  if (ORIGINAL_FILE_PATH === '?') {
    return !bufferContents.match(/^\s*</);
  }
  if (isDisallowedFilePattern('js', ORIGINAL_FILE_PATH)) {
    return false;
  }
  const allowedExtension = hasAllowedFileExtension('js', ORIGINAL_FILE_PATH);
  if (EDITOR_FILE_SYNTAX === '?') {
    return allowedExtension;
  }
  const allowedSyntax = hasAllowedFileSyntax('js', EDITOR_FILE_SYNTAX);
  return allowedSyntax || allowedExtension;
};

// Checks if a file path matches a particular glob string.
export const isMatchingGlob = (globString) => {
  // If file unsaved, reject globl matching;
  if (ORIGINAL_FILE_PATH === '?') {
    return false;
  }
  return minimatch(ORIGINAL_FILE_PATH, globString) || minimatch(basename(ORIGINAL_FILE_PATH), globString);
};

