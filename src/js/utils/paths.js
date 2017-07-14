/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import path from 'path';

export const PATH_SEP = path.sep || '/';

export const ROOT_DIR = path.resolve(path.join(__dirname, '..', '..', '..'));

export const USER_HOME_DIR =
  process.env.HOME ||
  process.env.USERPROFILE ||
  path.join(process.env.HOMEDRIVE, process.env.HOMEPATH);
