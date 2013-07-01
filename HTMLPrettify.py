import sublime, sublime_plugin
import commands, subprocess, os

PLUGIN_FOLDER = os.path.dirname(os.path.realpath(__file__))

class HtmlprettifyCommand(sublime_plugin.TextCommand):
  def run(self, edit):
    scriptPath = PLUGIN_FOLDER + "/scripts/run.js"
    filePath = self.view.file_name()
    setings = ' && '.join([
      "indent_size: 1",
      "indent_char: \t",
      "max_char: 80",
      "brace_style: collapse"
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

    if sublime.platform() == 'windows':
      p = subprocess.Popen(cmd, stdout=subprocess.PIPE)
      output = p.communicate()[0]
    else:
      output = commands.getoutput('"' + '" "'.join(cmd) + '"')

    # We're done with beautifying, remove the temporary file and change the
    # text shown in the current buffer.
    os.remove(tempPath)

    if len(output) > 0:
      self.view.replace(edit, sublime.Region(0, self.view.size()), output.decode('utf-8'))

    if filePath != None:
      self.view.run_command("save")
