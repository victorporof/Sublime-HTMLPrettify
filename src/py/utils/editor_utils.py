# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.
"""Various utility functions used by this plugin"""

from sublime import Region


def get_editor_selections_copy(view):
    """Gets a copy of the given view's selections"""
    return list(view.sel())


def get_editor_folded_contents(view):
    """Gets a copy of the given view's folded regions contents"""
    return [view.substr(region) for region in view.folded_regions()]


def get_entire_buffer_text(view):
    """Gets a copy of the given view's buffer"""
    entire_buffer_region = Region(0, view.size())
    buffer_text = view.substr(entire_buffer_region)
    return buffer_text, entire_buffer_region


def get_first_selected_text(view):
    """Gets a copy of the given view's first buffer selection"""
    first_selected_region = view.sel()[0]
    buffer_text = view.substr(first_selected_region)
    return buffer_text, first_selected_region


def has_selection(view):
    """Checks whether or not at least one selected region exists"""
    first_selected_region = view.sel()[0]
    return not first_selected_region.empty()


def force_set_viewport_position(view, position):
    """Force sets the viewport position"""
    view.set_viewport_position((0, 0), False)
    view.set_viewport_position(position, False)


def force_set_viewport_selections(view, selections):
    """Force sets the viewport selections"""
    view.sel().clear()
    for region in selections:
        view.sel().add(region)


def force_fold_contents(view, foldable_contents):
    """Force folds the given text if it exists in the view"""
    buffer_text, entire_buffer_region = get_entire_buffer_text(view)

    view.unfold(entire_buffer_region)
    region_end = 0

    for content in foldable_contents:
        region_start = buffer_text.index(content, region_end)
        if region_start > -1:
            region_end = region_start + len(content)
            view.fold(Region(region_start, region_end))
