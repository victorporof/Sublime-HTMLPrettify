# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.
"""Various utility functions used by this plugin"""

from __future__ import print_function
from os import path
from sublime import load_settings

from .paths import ROOT_DIR, JSBEAUTIFYRC_FILE, SETTINGS_FILENAME, KEYMAP_FILENAME


def get_pref(key):
    """Retrieves the pref value under the given name key from the settings file"""
    return load_settings(SETTINGS_FILENAME).get(key)


def open_config_rc(window):
    """Opens the default .jsbeautifyrc file for editing in a new tab"""
    window.open_file(path.join(ROOT_DIR, JSBEAUTIFYRC_FILE))


def open_sublime_settings(window):
    """Opens the default plugin settings file for editing in a new tab"""
    window.open_file(path.join(ROOT_DIR, SETTINGS_FILENAME))


def open_sublime_keymap(window, platform):
    """Opens the default plugin keyboard bindings file for editing in a new tab"""
    window.open_file(
        path.join(ROOT_DIR, KEYMAP_FILENAME.replace("$PLATFORM", platform)))
