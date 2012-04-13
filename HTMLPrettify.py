import commands, re
import sublime, sublime_plugin

class HtmlprettifyCommand(sublime_plugin.TextCommand):
  def run(self, edit):
    self.save()
    self.prettify(edit)

  def save(self):
    self.view.run_command("save")

  def prettify(self, edit):
    regx = re.compile(" ")
    html = commands.getoutput("node " +
      regx.sub("\ ", sublime.packages_path()) + "/Sublime-HTMLPrettify/scripts/run.js " +
      regx.sub("\ ", self.view.file_name()) +
        " indent_size:\ 2" +
        " indent_char:\ ' '" +
        " max_char:\ 80" +
        " brace_style:\ collapse")

    if len(html) > 0:
      self.view.replace(edit, sublime.Region(0, self.view.size()), html.decode('utf-8'))
      sublime.set_timeout(self.save, 100)
