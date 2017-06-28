# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.
"""Various utility functions used by this plugin"""

from os.path import join
from sublime import load_settings

from .paths import SETTINGS_FILENAME, KEYMAP_FILENAME
from .paths import get_root_dir, get_plugin_user_dir
from .file_utils import read_text_from_file, ensure_file


def get_pref(key):
    """Retrieves the pref value under the given name key from the settings file"""
    return load_settings(SETTINGS_FILENAME).get(key)


def open_config_rc(window):
    """Opens the default .jsbeautifyrc file for editing in a new tab"""
    window.open_file(join(get_root_dir(), '.jsbeautifyrc.defaults'))


def open_u_config_rc(window):
    """Opens the user's .jsbeautifyrc file for editing in a new tab"""
    old_jsbeautifyrc = read_text_from_file(
        join(get_root_dir(), '.jsbeautifyrc'), default_contents="{\n}")

    window.open_file(
        ensure_file(
            join(get_plugin_user_dir(), '.jsbeautifyrc'), old_jsbeautifyrc))


def open_sublime_settings(window):
    """Opens the default plugin settings file for editing in a new tab"""
    window.open_file(join(get_root_dir(), SETTINGS_FILENAME))


def open_u_sublime_settings(window):
    """Opens the user's plugin settings file for editing in a new tab"""
    window.open_file(
        ensure_file(join(get_plugin_user_dir(), SETTINGS_FILENAME)))


def open_sublime_keymap(window, platform):
    """Opens the default plugin keyboard bindings file for editing in a new tab"""
    window.open_file(
        join(get_root_dir(), KEYMAP_FILENAME.replace("$PLATFORM", platform)))


def open_u_sublime_keymap(window, platform):
    """Opens the user's plugin keyboard bindings file for editing in a new tab"""
    window.open_file(
        ensure_file(
            join(get_plugin_user_dir(),
                 KEYMAP_FILENAME.replace("$PLATFORM", platform))))
