/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as Constants from './constants';

export const beginDiagnostics = () => {
  console.log(Constants.DIAGNOSTICS_MARKER_BEGIN);
};

export const endDiagnostics = () => {
  console.log(Constants.DIAGNOSTICS_MARKER_END);
};

export const beginPrettifiedCode = () => {
  console.log(Constants.PRETTIFIED_CODE_MARKER_BEGIN);
};

export const endPrettifiedCode = () => {
  console.log(Constants.PRETTIFIED_CODE_MARKER_END);
};

export const info = (...args) => console.log('[HTMLPrettify]', ...args);
export const out = console.log;
export const err = console.error;
