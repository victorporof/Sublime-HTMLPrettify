# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.
"""HTML Prettify plugin entry point"""

import sys
from os.path import dirname
from sublime_plugin import TextCommand

sys.path.insert(0, dirname(__file__))
from src.py.commands import *
from src.py.event_listeners import *
from src.py.main import *


class HtmlprettifyCommand(TextCommand):
    def run(self, edit):
        main(self.view, edit)
