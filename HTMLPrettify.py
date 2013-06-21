import commands, subprocess
import sublime, sublime_plugin

class HtmlprettifyCommand(sublime_plugin.TextCommand):
  def run(self, edit):
    self.save()
    self.prettify(edit)

  def save(self):
    self.view.run_command("save")

  def prettify(self, edit):
    scriptPath = sublime.packages_path() + "/Sublime-HTMLPrettify/scripts/run.js"
    cmd = ["node",scriptPath,self.view.file_name(),
      "indent_size: 1",
      "indent_char: \t",
      "max_char: 80",
      "brace_style: collapse"
    ]

    if sublime.platform()=='windows':
      p = subprocess.Popen(cmd,shell=True,stdout=subprocess.PIPE)
      html = p.communicate()[0]
    else:
      html = commands.getoutput('"'+'" "'.join(cmd)+'"')

    if len(html) > 0:
      self.view.replace(edit, sublime.Region(0, self.view.size()), html.decode('utf-8'))
      sublime.set_timeout(self.save, 100)
