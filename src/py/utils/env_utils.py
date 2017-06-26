# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.
"""Various utility functions used by this plugin"""

import subprocess
from os import environ

from .constants import PLATFORM, SUBLIME_VERSION
from .window_utils import get_pref


def get_node_path():
    """Gets the node.js path specified in this plugin's settings file"""
    node = get_pref("node_path").get(PLATFORM)
    return node


def run_command(cmd):
    """Runs a command in a shell and returns the output"""
    popen_args = {
        "stdout": subprocess.PIPE,
        "stderr": subprocess.PIPE,
        "env": environ,
    }

    if SUBLIME_VERSION < 3000 and PLATFORM == "windows":
        startupinfo = subprocess.STARTUPINFO()
        startupinfo.dwFlags |= subprocess.STARTF_USESHOWWINDOW
        popen_args["startupinfo"] = startupinfo

    return subprocess.Popen(cmd, **popen_args).communicate()
