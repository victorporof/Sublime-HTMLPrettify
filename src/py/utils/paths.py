# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.
"""Various paths used by this plugin"""

from os.path import abspath, dirname, join
from sublime import packages_path

SETTINGS_FILENAME = 'HTMLPrettify.sublime-settings'
KEYMAP_FILENAME = 'Default ($PLATFORM).sublime-keymap'
PLUGIN_ROOT_DIR = abspath(join(dirname(abspath(__file__)), '..', '..', '..'))


def get_root_dir():
    return PLUGIN_ROOT_DIR


def get_user_dir():
    return join(packages_path(), 'User')


def get_main_js_file():
    return join(get_root_dir(), 'build', 'js-transpiled', 'main.js')
