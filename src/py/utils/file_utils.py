# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.
"""Various utility functions used by this plugin"""

from codecs import open as fopen
from os import path
from uuid import uuid4

from .paths import ROOT_DIR


def get_temp_file_path():
    """Gets the path to a constant temporary file"""
    return path.join(ROOT_DIR, str(uuid4()))


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
