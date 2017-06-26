# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.
"""Various constants used by this plugin"""

from sublime import platform, version

PLATFORM = platform()
SUBLIME_VERSION = int(version())

DIAGNOSTICS_MARKER_BEGIN = b"### HTMLPrettify diagnostics begin ###"
DIAGNOSTICS_MARKER_END = b"### HTMLPrettify diagnostics end ###"
PRETTIFIED_CODE_MARKER_BEGIN = b"### HTMLPrettify prettified code begin ###"
PRETTIFIED_CODE_MARKER_END = b"### HTMLPrettify prettified code end ###"
