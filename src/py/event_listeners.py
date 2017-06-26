# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.
"""HTML Prettify event listeners"""

from sublime_plugin import EventListener

from .utils.window_utils import get_pref


class HtmlprettifyEventListeners(EventListener):
    @staticmethod
    def on_pre_save(view):
        if get_pref("format_on_save"):
            view.run_command("htmlprettify")
