# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

from __future__ import print_function
import os
import json
from .utils.window_utils import get_pref
from .utils.editor_utils import get_editor_selections_copy, get_editor_folded_contents
from .utils.editor_utils import get_entire_buffer_text, get_first_selected_text
from .utils.editor_utils import has_selection
from .utils.editor_utils import force_set_viewport_position
from .utils.editor_utils import force_set_viewport_selections
from .utils.editor_utils import force_fold_contents
from .utils.file_utils import save_text_to_temp_file
from .utils.script_utils import prettify_verbose


def main(view, edit):
    format_selection_only = get_pref("format_selection_only")
    save_to_temp_file = get_pref("save_to_temp_file_before_prettifying")
    global_file_rules = get_pref("global_file_rules")
    respect_editorconfig_files = get_pref("respect_editorconfig_files")

    editor_file_syntax = view.settings().get("syntax") if get_pref(
        "use_editor_syntax") else "?"
    editor_indent_size = view.settings().get("tab_size") if get_pref(
        "use_editor_indentation") else "?"
    editor_indent_with_tabs = view.settings().get("use_tab_stops") if get_pref(
        "use_editor_indentation") else "?"

    original_file_path = view.file_name() or "?"
    previous_viewport_position = view.viewport_position()
    previous_selections = get_editor_selections_copy(view)
    folded_regions_content = get_editor_folded_contents(view)

    if format_selection_only and has_selection(view):
        text_to_prettify, formatting_region = get_first_selected_text(view)
    else:
        text_to_prettify, formatting_region = get_entire_buffer_text(view)

    if save_to_temp_file:
        editor_text_temp_file_path = save_text_to_temp_file(text_to_prettify)

    prettified_text = prettify_verbose(view.window(), [
        str(save_to_temp_file),
        json.dumps(global_file_rules),
        str(respect_editorconfig_files),
        str(editor_file_syntax),
        str(editor_indent_size),
        str(editor_indent_with_tabs),
        editor_text_temp_file_path
        if save_to_temp_file else text_to_prettify,
        original_file_path
    ])

    if save_to_temp_file:
        os.remove(editor_text_temp_file_path)

    if prettified_text is None:
        return

    if prettified_text == text_to_prettify:
        return

    view.replace(edit, formatting_region, prettified_text)
    force_fold_contents(view, folded_regions_content)
    force_set_viewport_position(view, previous_viewport_position)
    force_set_viewport_selections(view, previous_selections)
