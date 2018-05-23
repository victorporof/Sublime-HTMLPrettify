# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.
"""Various utility functions used by this plugin"""

import subprocess
from os import environ, devnull

from .constants import PLATFORM
from .window_utils import get_pref


class NodeNotFoundError(OSError):
    def __init__(self, original_exception, node_path):
        msg = "Node.js was not found in the default path"
        OSError.__init__(self, msg + (": %s" % original_exception))
        self.node_path = node_path


class NodeRuntimeError(RuntimeError):
    def __init__(self, stdout, stderr):
        msg = "Node.js encountered a runtime error"
        RuntimeError.__init__(self, msg + (": %s\n%s" % (stderr, stdout)))
        self.stdout = stdout
        self.stderr = stderr


class NodeSyntaxError(RuntimeError):
    def __init__(self, stdout, stderr):
        msg = "Node.js encountered a runtime syntax error"
        RuntimeError.__init__(self, msg + (": %s\n%s" % (stderr, stdout)))
        self.stdout = stdout
        self.stderr = stderr


def get_node_path():
    """Gets the node.js path specified in this plugin's settings file"""
    node = get_pref("node_path").get(PLATFORM)
    return node


def run_command(args):
    """Runs a command in a shell and returns the output"""
    popen_args = {
        "stdout": subprocess.PIPE,
        "stderr": subprocess.PIPE,
        "env": environ,
    }

    if PLATFORM == "windows":
        startupinfo = subprocess.STARTUPINFO()
        startupinfo.dwFlags |= subprocess.STARTF_USESHOWWINDOW
        popen_args["startupinfo"] = startupinfo
        popen_args["stdin"] = open(devnull, 'wb')

    stdout, stderr = subprocess.Popen(args, **popen_args).communicate()
    if stderr:
        if b"ExperimentalWarning" in stderr:
            # Don't treat node experimental warnings as actual errors.
            return stdout
        elif b"SyntaxError" in stderr:
            raise NodeSyntaxError(
                stdout.decode('utf-8'), stderr.decode('utf-8'))
        else:
            raise NodeRuntimeError(
                stdout.decode('utf-8'), stderr.decode('utf-8'))

    return stdout


def run_node_command(args):
    """Runs a node command in a shell and returns the output"""

    node_path = get_node_path()
    try:
        stdout = run_command([node_path] + args)
    except OSError as err:
        if node_path in err.strerror or \
            "No such file or directory" in err.strerror or \
            "The system cannot find the file specified" in err.strerror:
            raise NodeNotFoundError(err, node_path)
        else:
            raise err

    return stdout
