# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.
"""HTML Prettify event listeners"""

from sublime_plugin import EventListener

from .utils.window_utils import get_pref
from .utils.debounce_utils import debounce


class HtmlprettifyEventListeners(EventListener):
    @staticmethod
    def on_pre_save(view):
        if get_pref("format_on_save"):
            view.run_command("htmlprettify")

    @staticmethod
    def on_load_async(view):
        if get_pref("format_on_open"):
            view.run_command("htmlprettify")

    @staticmethod
    def on_activated_async(view):
        if get_pref("format_on_focus"):
            view.run_command("htmlprettify")

    @staticmethod
    def on_deactivated_async(view):
        if get_pref("format_on_focus_lost"):
            view.run_command("htmlprettify")

    @staticmethod
    @debounce(1)
    def on_modified_async(view):
        if get_pref("format_while_editing"):
            view.run_command("htmlprettify")
