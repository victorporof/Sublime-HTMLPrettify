/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import path from 'path';

import { PATH_SEP, USER_HOME_DIR } from './paths';
import { CONFIG_EXTRA_LOOKUP_PATHS } from './constants';

// Returns a list of all absolute ancestor paths starting from a given path.
export const getAncestorPaths = (givenPath) => {
  const pathParts = path.resolve(givenPath).split(PATH_SEP);
  return pathParts.map((value, key) => pathParts.slice(0, key + 1).join(PATH_SEP));
};

// Returns all potential directories where a configuration file could exist.
export const getPotentialConfigDirs = (givenPath) => {
  const potentialConfigDirs = getAncestorPaths(givenPath);

  // Start with the current directory first, then with the user's home folder,
  // and end with the user's personal sublime settings folder.
  potentialConfigDirs.reverse();
  potentialConfigDirs.push(USER_HOME_DIR);
  potentialConfigDirs.push(...CONFIG_EXTRA_LOOKUP_PATHS);

  return potentialConfigDirs.filter(Boolean);
};
