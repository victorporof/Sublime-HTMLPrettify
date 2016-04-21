# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

import sublime, sublime_plugin
import os, sys, subprocess, codecs, webbrowser

try:
  import commands
except ImportError:
  pass

PLUGIN_FOLDER = os.path.dirname(os.path.realpath(__file__))
USER_FOLDER = os.path.join(sublime.packages_path(), 'User')
RC_FILE = ".jsbeautifyrc"
SETTINGS_FILE = "HTMLPrettify.sublime-settings"
KEYMAP_FILE = "Default ($PLATFORM).sublime-keymap"
OUTPUT_VALID = b"*** HTMLPrettify output ***"

class HtmlprettifyCommand(sublime_plugin.TextCommand):
  def run(self, edit):
    # Save the current viewport position to scroll to it after formatting.
    previous_selection = list(self.view.sel()) # Copy.
    previous_position = self.view.viewport_position()

    # Save the already folded code to refold it after formatting.
    # Backup of folded code is taken instead of regions because the start and end pos
    # of folded regions will change once formatted.
    folded_regions_content = [self.view.substr(r) for r in self.view.folded_regions()]

    # Get the current text in the buffer and save it in a temporary file.
    # This allows for scratch buffers and dirty files to be linted as well.
    entire_buffer_region = sublime.Region(0, self.view.size())
    text_selection_region = self.view.sel()[0]
    is_formatting_selection_only = \
      PluginUtils.get_pref("format_selection_only") \
      and not text_selection_region.empty()

    if is_formatting_selection_only:
      temp_file_path, buffer_text = self.save_buffer_to_temp_file(text_selection_region)
    else:
      temp_file_path, buffer_text = self.save_buffer_to_temp_file(entire_buffer_region)

    output = self.run_script_on_file(temp_file_path)
    os.remove(temp_file_path)

    # Dump any diagnostics and get the output after the identification marker.
    if PluginUtils.get_pref("print_diagnostics"):
      print(self.get_output_diagnostics(output))
    output = self.get_output_data(output)

    # If the prettified text length is nil, the current syntax isn't supported.
    if len(output) < 1:
      return

    # Replace the text only if it's different.
    if output != buffer_text:
      if is_formatting_selection_only:
        self.view.replace(edit, text_selection_region, output)
      else:
        self.view.replace(edit, entire_buffer_region, output)

    self.refold_folded_regions(folded_regions_content, output)
    self.view.set_viewport_position((0, 0), False)
    self.view.set_viewport_position(previous_position, False)
    self.view.sel().clear()

    # Restore the previous selection if formatting wasn't performed only for it.
    if not is_formatting_selection_only:
      for region in previous_selection:
        self.view.sel().add(region)

  def save_buffer_to_temp_file(self, region):
    buffer_text = self.view.substr(region)
    temp_file_name = ".__temp__"
    temp_file_path = PLUGIN_FOLDER + "/" + temp_file_name
    f = codecs.open(temp_file_path, mode="w", encoding="utf-8")
    f.write(buffer_text)
    f.close()
    return temp_file_path, buffer_text

  def run_script_on_file(self, temp_file_path):
    try:
      node_path = PluginUtils.get_node_path()
      script_path = PLUGIN_FOLDER + "/scripts/run.js"
      file_path = self.view.file_name()
      cmd = [node_path, script_path, temp_file_path, file_path or "?", USER_FOLDER]
      output = PluginUtils.get_output(cmd)

      # Make sure the correct/expected output is retrieved.
      if output.find(OUTPUT_VALID) != -1:
        return output

      msg = "Command " + '" "'.join(cmd) + " created invalid output."
      print(output)
      raise Exception(msg)

    except:
      # Something bad happened.
      print("Unexpected error({0}): {1}".format(sys.exc_info()[0], sys.exc_info()[1]))

      # Usually, it's just node.js not being found. Try to alleviate the issue.
      msg = "Node.js was not found in the default path. Please specify the location."
      if not sublime.ok_cancel_dialog(msg):
        msg = "You won't be able to use this plugin without specifying the path to node.js."
        sublime.error_message(msg)
      else:
        PluginUtils.open_sublime_settings(self.view.window())

  def get_output_diagnostics(self, output):
    index = output.find(OUTPUT_VALID)
    return output[:index].decode("utf-8")

  def get_output_data(self, output):
    index = output.find(OUTPUT_VALID)
    return output[index + len(OUTPUT_VALID) + 1:].decode("utf-8")

  def refold_folded_regions(self, folded_regions_content, entire_file_contents):
    self.view.unfold(sublime.Region(0, len(entire_file_contents)))
    region_end = 0

    for content in folded_regions_content:
      region_start = entire_file_contents.index(content, region_end)
      if region_start > -1:
        region_end = region_start + len(content)
        self.view.fold(sublime.Region(region_start, region_end))

class HtmlprettifyEventListeners(sublime_plugin.EventListener):
  @staticmethod
  def on_pre_save(view):
    if PluginUtils.get_pref("format_on_save"):
      view.run_command("htmlprettify")

class HtmlprettifySetPrettifyPrefsCommand(sublime_plugin.TextCommand):
  def run(self, edit):
    PluginUtils.open_config_rc(self.view.window())

class HtmlprettifySetPluginOptionsCommand(sublime_plugin.TextCommand):
  def run(self, edit):
    PluginUtils.open_sublime_settings(self.view.window())

class HtmlprettifySetKeyboardShortcutsCommand(sublime_plugin.TextCommand):
  def run(self, edit):
    PluginUtils.open_sublime_keymap(self.view.window(), {
      "windows": "Windows",
      "linux": "Linux",
      "osx": "OSX"
    }.get(sublime.platform()))

class HtmlprettifySetNodePathCommand(sublime_plugin.TextCommand):
  def run(self, edit):
    PluginUtils.open_sublime_settings(self.view.window())

class PluginUtils:
  @staticmethod
  def get_pref(key):
    return sublime.load_settings(SETTINGS_FILE).get(key)

  @staticmethod
  def open_config_rc(window):
    window.open_file(PLUGIN_FOLDER + "/" + RC_FILE)

  @staticmethod
  def open_sublime_settings(window):
    window.open_file(PLUGIN_FOLDER + "/" + SETTINGS_FILE)

  @staticmethod
  def open_sublime_keymap(window, platform):
    window.open_file(PLUGIN_FOLDER + "/" + KEYMAP_FILE.replace("$PLATFORM", platform))

  @staticmethod
  def exists_in_path(cmd):
    # Can't search the path if a directory is specified.
    assert not os.path.dirname(cmd)
    path = os.environ.get("PATH", "").split(os.pathsep)
    extensions = os.environ.get("PATHEXT", "").split(os.pathsep)

    # For each directory in PATH, check if it contains the specified binary.
    for directory in path:
      base = os.path.join(directory, cmd)
      options = [base] + [(base + ext) for ext in extensions]
      for filename in options:
        if os.path.exists(filename):
          return True

    return False

  @staticmethod
  def get_node_path():
    platform = sublime.platform()
    node = PluginUtils.get_pref("node_path").get(platform)
    print("Using node.js path on '" + platform + "': " + node)
    return node

  @staticmethod
  def get_output(cmd):
    if int(sublime.version()) < 3000:
      if sublime.platform() != "windows":
        # Handle Linux and OS X in Python 2.
        run = '"' + '" "'.join(cmd) + '"'
        return commands.getoutput(run)
      else:
        # Handle Windows in Python 2.
        # Prevent console window from showing.
        startupinfo = subprocess.STARTUPINFO()
        startupinfo.dwFlags |= subprocess.STARTF_USESHOWWINDOW
        return subprocess.Popen(cmd, \
          stdout=subprocess.PIPE, \
          startupinfo=startupinfo).communicate()[0]
    else:
      # Handle all OS in Python 3.
      run = '"' + '" "'.join(cmd) + '"'
      return subprocess.check_output(run, stderr=subprocess.STDOUT, shell=True, env=os.environ)
