# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.
"""Various paths used by this plugin"""

from os.path import abspath, realpath, dirname, join
from sublime import packages_path

ROOT_DIR = abspath(join(dirname(realpath(__file__)), '..', '..', '..'))
PACKAGES_DIR = realpath(packages_path())

USER_FOLDER = join(PACKAGES_DIR, 'User')

JSBEAUTIFYRC_FILE = join(ROOT_DIR, '.jsbeautifyrc')
SETTINGS_FILENAME = 'HTMLPrettify.sublime-settings'
KEYMAP_FILENAME = 'Default ($PLATFORM).sublime-keymap'

JS_MAIN_FILE = join(ROOT_DIR, 'build', 'js-transpiled', 'main.js')
