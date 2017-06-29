# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.
"""Various utility functions used by this plugin"""

from codecs import open as fopen
from os import makedirs
from os.path import isfile, isdir, dirname, join
from uuid import uuid4

from .paths import get_root_dir


def get_temp_file_path():
    """Gets the path to a constant temporary file"""
    return join(get_root_dir(), str(uuid4()))


def save_text_to_file(text, file_path):
    """Saves the given text to a file at the specified path"""
    handle = fopen(file_path, mode="w", encoding="utf-8")
    handle.write(text)
    handle.close()


def save_text_to_temp_file(text):
    """Saves the given text to a temporary file"""
    temp_file_path = get_temp_file_path()
    save_text_to_file(text, temp_file_path)
    return temp_file_path


def read_text_from_file(file_path, default_contents=None):
    """Reads the text from a file if it exists; if it doens't, some default contents are returned"""
    if isfile(file_path):
        handle = fopen(file_path, mode="r", encoding="utf-8")
        text = handle.read()
        handle.close()
        return text

    return default_contents


def ensure_file(file_path, default_contents=None):
    """Ensures a file exists; if it doesn't, one is created with some contents"""
    if not isdir(dirname(file_path)):
        makedirs(dirname(file_path))

    if not isfile(file_path):
        handle = fopen(file_path, mode="w", encoding="utf-8")
        handle.write(default_contents)
        handle.close()

    return file_path
