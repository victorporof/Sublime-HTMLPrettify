import sublime, sublime_plugin
import os

try:
  import commands
except ImportError:
  import subprocess

PLUGIN_FOLDER = os.path.dirname(os.path.realpath(__file__))

class HtmlprettifyCommand(sublime_plugin.TextCommand):
  def run(self, edit):
    scriptPath = PLUGIN_FOLDER + "/scripts/run.js"
    filePath = self.view.file_name()
    setings = " && ".join([
      "indent_size: 1",
      "indent_char: \t",
      "wrap_line_length: 250",
      "brace_style: collapse",
      "unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u']",
      "preserve_newlines: true",
      "max_preserve_newlines: 5"
    ])

    # Get the current text in the buffer.
    bufferText = self.view.substr(sublime.Region(0, self.view.size()))

    # ...and save it in a temporary file. This allows for scratch buffers
    # and dirty files to be beautified as well.
    tempName = ".__temp__"
    tempPath = PLUGIN_FOLDER + '/' + tempName
    f = open(tempPath, 'w')
    f.write(bufferText)
    f.close()

    cmd = ["/usr/local/bin/node", scriptPath, tempPath, filePath or "?", setings]
    output = ""
    try:
      if sublime.platform() != "windows":
        output = commands.getoutput('"' + '" "'.join(cmd) + '"')
      else:
        output = subprocess.Popen(cmd, stdout=subprocess.PIPE).communicate()[0]
    except NameError:
      output = subprocess.check_output('"' + '" "'.join(cmd) + '"',
                                       stderr=subprocess.STDOUT,
                                       shell=True)

    # We're done with beautifying, remove the temporary file and change the
    # text shown in the current buffer.
    os.remove(tempPath)

    if len(output) > 0:
      self.view.replace(edit, sublime.Region(0, self.view.size()), output.decode("utf-8"))

    if filePath != None:
      self.view.run_command("save")
