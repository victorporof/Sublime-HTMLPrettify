import sublime, sublime_plugin
import os, subprocess, codecs

try:
  import commands
except ImportError:
  pass

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
    f = codecs.open(tempPath, mode='w', encoding='utf-8')
    f.write(bufferText)
    f.close()

    node = "node" if self.exists_in_path("node") else "/usr/local/bin/node"
    cmd = [node, scriptPath, tempPath, filePath or "?", setings]

    output = ""
    try:
      # Sublime Text 2.
      if sublime.platform() != "windows":
        # Handle Linux and OS X in Python 2.
        run = '"' + '" "'.join(cmd) + '"'
        output = commands.getoutput(run)
      else:
        # Handle Windows in Python 2.
        output = subprocess.Popen(cmd, stdout=subprocess.PIPE).communicate()[0]
    except:
      # Sublime Text 3, Python 3.
      run = '"' + '" "'.join(cmd) + '"'
      output = subprocess.check_output(run, stderr=subprocess.STDOUT, shell=True)

    # We're done with beautifying, remove the temporary file and change the
    # text shown in the current buffer.
    os.remove(tempPath)
    self.view.erase_regions("jshint_errors");

    if len(output) > 0:
      self.view.replace(edit, sublime.Region(0, self.view.size()), output.decode("utf-8"))

    if filePath != None:
      self.view.run_command("save")

  def exists_in_path(self, cmd):
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
