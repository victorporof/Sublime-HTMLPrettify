# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.
"""Various utility functions used by this plugin"""

from webbrowser import open_new_tab


def file_bug():
    """Opens a new tab in the default browser at this plugin's repo"""
    url = "https://github.com/victorporof/Sublime-HTMLPrettify/issues/new"
    open_new_tab(url)


def view_readme():
    """Opens a new tab in the default browser at this plugin's repo"""
    url = "https://github.com/victorporof/Sublime-HTMLPrettify/blob/master/README.md"
    open_new_tab(url)


def view_release_notes():
    """Opens a new tab in the default browser at this plugin's repo"""
    url = "https://github.com/victorporof/Sublime-HTMLPrettify/releases"
    open_new_tab(url)
