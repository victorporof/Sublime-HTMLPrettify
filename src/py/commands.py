# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.
"""HTML Prettify commands"""

from sublime_plugin import TextCommand

from .utils.constants import PLATFORM
from .utils.window_utils import open_config_rc, open_sublime_settings, open_sublime_keymap
from .utils.window_utils import open_u_config_rc, open_u_sublime_settings, open_u_sublime_keymap
from .utils.web_utils import file_bug, view_readme, view_release_notes


class HtmlprettifySetPrettifyPrefsCommand(TextCommand):
    def run(self, _):
        open_config_rc(self.view.window())


class HtmlprettifySetUserPrettifyPrefsCommand(TextCommand):
    def run(self, _):
        open_u_config_rc(self.view.window())


class HtmlprettifySetPluginOptionsCommand(TextCommand):
    def run(self, _):
        open_sublime_settings(self.view.window())


class HtmlprettifySetUserPluginOptionsCommand(TextCommand):
    def run(self, _):
        open_u_sublime_settings(self.view.window())


class HtmlprettifySetKeyboardShortcutsCommand(TextCommand):
    def run(self, _):
        open_sublime_keymap(self.view.window(), {
            "windows": "Windows",
            "linux": "Linux",
            "osx": "OSX"
        }.get(PLATFORM))


class HtmlprettifySetUserKeyboardShortcutsCommand(TextCommand):
    def run(self, _):
        open_u_sublime_keymap(self.view.window(), {
            "windows": "Windows",
            "linux": "Linux",
            "osx": "OSX"
        }.get(PLATFORM))


class HtmlprettifySetNodePathCommand(TextCommand):
    def run(self, _):
        open_sublime_settings(self.view.window())


class HtmlprettifyOpenHelpCommand(TextCommand):
    def run(self, _):
        view_readme()


class HtmlprettifyOpenBugFile(TextCommand):
    def run(self, _):
        file_bug()


class HtmlprettifyOpenReleaseNotes(TextCommand):
    def run(self, _):
        view_release_notes()
