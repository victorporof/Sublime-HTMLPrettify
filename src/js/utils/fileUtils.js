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
const hasDisallowedFilePathPattern = (fileType, filePath) => {
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
  const isSavedFile = ORIGINAL_FILE_PATH !== '?';
  const useEditorFileSyntaxForDeterminingFileType = EDITOR_FILE_SYNTAX !== '?';

  const isAllowedExtension = hasAllowedFileExtension('css', ORIGINAL_FILE_PATH);
  const isAllowedSyntax = hasAllowedFileSyntax('css', EDITOR_FILE_SYNTAX);
  const isDisallowedFilePattern = hasDisallowedFilePathPattern('css', ORIGINAL_FILE_PATH);

  if (!isSavedFile) {
    return useEditorFileSyntaxForDeterminingFileType
      ? isAllowedSyntax
      : false;
  }

  if (isDisallowedFilePattern) {
    return false;
  }

  return useEditorFileSyntaxForDeterminingFileType
      ? isAllowedSyntax || isAllowedExtension
      : isAllowedExtension;
};

export const isHTML = (bufferContents) => {
  const isSavedFile = ORIGINAL_FILE_PATH !== '?';
  const useEditorFileSyntaxForDeterminingFileType = EDITOR_FILE_SYNTAX !== '?';

  const isAllowedExtension = hasAllowedFileExtension('html', ORIGINAL_FILE_PATH);
  const isAllowedSyntax = hasAllowedFileSyntax('html', EDITOR_FILE_SYNTAX);
  const isDisallowedFilePattern = hasDisallowedFilePathPattern('html', ORIGINAL_FILE_PATH);
  const isMaybeHtml = bufferContents.match(/^\s*</);

  if (!isSavedFile) {
    return useEditorFileSyntaxForDeterminingFileType
      ? isAllowedSyntax || isMaybeHtml
      : isMaybeHtml;
  }

  if (isDisallowedFilePattern) {
    return false;
  }

  return useEditorFileSyntaxForDeterminingFileType
      ? isAllowedSyntax || isAllowedExtension
      : isAllowedExtension;
};

export const isJSON = (bufferContents) => {
  const isSavedFile = ORIGINAL_FILE_PATH !== '?';
  const useEditorFileSyntaxForDeterminingFileType = EDITOR_FILE_SYNTAX !== '?';

  const isAllowedExtension = hasAllowedFileExtension('json', ORIGINAL_FILE_PATH);
  const isAllowedSyntax = hasAllowedFileSyntax('json', EDITOR_FILE_SYNTAX);
  const isDisallowedFilePattern = hasDisallowedFilePathPattern('json', ORIGINAL_FILE_PATH);
  const isMaybeJson = bufferContents.match(/^\s*[{[]/);

  if (!isSavedFile) {
    return useEditorFileSyntaxForDeterminingFileType
      ? isAllowedSyntax || isMaybeJson
      : isMaybeJson;
  }

  if (isDisallowedFilePattern) {
    return false;
  }

  return useEditorFileSyntaxForDeterminingFileType
      ? isAllowedSyntax || isAllowedExtension
      : isAllowedExtension;
};

export const isJS = (bufferContents) => {
  const isSavedFile = ORIGINAL_FILE_PATH !== '?';
  const useEditorFileSyntaxForDeterminingFileType = EDITOR_FILE_SYNTAX !== '?';

  const isAllowedExtension = hasAllowedFileExtension('js', ORIGINAL_FILE_PATH);
  const isAllowedSyntax = hasAllowedFileSyntax('js', EDITOR_FILE_SYNTAX);
  const isDisallowedFilePattern = hasDisallowedFilePathPattern('js', ORIGINAL_FILE_PATH);
  const isMaybeJs = !bufferContents.match(/^\s*</);

  if (!isSavedFile) {
    return useEditorFileSyntaxForDeterminingFileType
      ? isAllowedSyntax || isMaybeJs
      : isMaybeJs;
  }

  if (isDisallowedFilePattern) {
    return false;
  }

  return useEditorFileSyntaxForDeterminingFileType
      ? isAllowedSyntax || isAllowedExtension
      : isAllowedExtension;
};

// Checks if a file path matches a particular glob string.
export const isMatchingGlob = (globString) => {
  // If file unsaved, reject globl matching;
  if (ORIGINAL_FILE_PATH === '?') {
    return false;
  }
  return (
    minimatch(ORIGINAL_FILE_PATH, globString) ||
    minimatch(basename(ORIGINAL_FILE_PATH), globString)
  );
};

