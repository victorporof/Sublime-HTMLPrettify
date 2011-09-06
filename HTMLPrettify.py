import commands, re
import sublime, sublime_plugin

class HtmlprettifyCommand(sublime_plugin.TextCommand):
  def run(self, edit):

    regx = re.compile(" ");
    html = commands.getoutput("node " +
      regx.sub("\ ", sublime.packages_path()) + "/HTMLPrettify/scripts/run.js " +
      regx.sub("\ ", self.view.file_name()) +
        " indent_size:\ 2" +
        " indent_char:\ ' '" +
        " max_char:\ 80" +
        " brace_style:\ collapse")

    if len(html) > 0:
      self.view.replace(edit, sublime.Region(0, self.view.size()), html);
