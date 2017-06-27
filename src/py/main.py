# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

from __future__ import print_function
import os

from .utils.window_utils import get_pref
from .utils.editor_utils import get_syntax, get_editor_selections_copy, get_editor_folded_contents
from .utils.editor_utils import get_entire_buffer_text, get_first_selected_text
from .utils.editor_utils import has_selection
from .utils.editor_utils import force_set_viewport_position
from .utils.editor_utils import force_set_viewport_selections
from .utils.editor_utils import force_fold_contents
from .utils.file_utils import save_text_to_temp_file
from .utils.script_utils import prettify_verbose


def main(view, edit):
    editor_file_syntax = get_syntax(view) if get_pref("use_syntax") else "?"
    original_file_path = view.file_name() or "?"

    previous_viewport_position = view.viewport_position()
    previous_selections = get_editor_selections_copy(view)
    folded_regions_content = get_editor_folded_contents(view)

    is_formatting_selection_only = \
        get_pref("format_selection_only") and has_selection(view)

    # Get the current text in the buffer and save it in a temporary file.
    # This allows for scratch buffers and dirty files to be prettified as well.
    if is_formatting_selection_only:
        text_to_prettify, formatting_region = get_first_selected_text(view)
        editor_text_file_path = save_text_to_temp_file(text_to_prettify)
    else:
        text_to_prettify, formatting_region = get_entire_buffer_text(view)
        editor_text_file_path = save_text_to_temp_file(text_to_prettify)

    prettified_text = prettify_verbose(view.window(), [
        editor_file_syntax, editor_text_file_path, original_file_path
    ])

    os.remove(editor_text_file_path)

    if prettified_text is None:
        return

    if prettified_text == text_to_prettify:
        return

    if is_formatting_selection_only:
        view.replace(edit, formatting_region, prettified_text)
    else:
        view.replace(edit, formatting_region, prettified_text)

    force_fold_contents(view, folded_regions_content)
    force_set_viewport_position(view, previous_viewport_position)
    force_set_viewport_selections(view, previous_selections)
