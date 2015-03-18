# HTML, CSS, JavaScript and JSON code formatter for Sublime Text 2 and 3 via node.js
#### [Sublime Text 3](http://www.sublimetext.com/3)
#### [JS-beautify](https://github.com/einars/js-beautify)
#### [Node.js download](http://nodejs.org/#download)

## About
This is a Sublime Text 2 and 3 plugin allowing you to format your HTML, CSS, JavaScript and JSON code. It uses a set of nice beautifier scripts made by Einar Lielmanis. The formatters are written in JavaScript, so you'll need something (node.js) to interpret JavaScript code outside the browser.

This will work with either HTML, CSS, JavaScript and JSON files.

## Installation
First of all, be sure you have [node.js](http://nodejs.org/#download) installed in order to run the beautifier. After you've installed node.js, you will need to setup this plugin.
Each OS has a different `Packages` folder required by Sublime Text. Open it via Preferences -> Browse Packages, and copy this repository contents to the `Sublime-HTMLPrettify` folder there.

The shorter way of doing this is:
### Through [Sublime Package Manager](http://wbond.net/sublime_packages/package_control)

* `Ctrl+Shift+P` or `Cmd+Shift+P` in Linux/Windows/OS X
* type `install`, select `Package Control: Install Package`
* type `prettify`, select `HTML-CSS-JS Prettify`

### Manually
Make sure you use the right Sublime Text folder. For example, on OS X, packages for version 2 are in `~/Library/Application\ Support/Sublime\ Text\ 2`, while version 3 is labeled `~/Library/Application\ Support/Sublime\ Text\ 3`.

These are for Sublime Text 3:

#### Mac
`git clone https://github.com/victorporof/Sublime-HTMLPrettify.git ~/Library/Application\ Support/Sublime\ Text\ 3/Packages/Sublime-HTMLPrettify`

#### Linux
`git clone https://github.com/victorporof/Sublime-HTMLPrettify.git ~/.config/sublime-text-3/Packages/Sublime-HTMLPrettify`

#### Windows
`git clone https://github.com/victorporof/Sublime-HTMLPrettify.git %APPDATA%/Sublime\ Text\ 3/Packages/Sublime-HTMLPrettify`

## Usage
Tools -> Command Palette (`Cmd+Shift+P` or `Ctrl+Shift+P`) and type `htmlprettify`.

-- or --

`Ctrl+Shift+H` (or `Cmd+Shift+H` if you're on a Mac).

-- or --

Right click in the current buffer and select `HTML/CSS/JS Prettify` -> `Prettify Code`.

-- or --

Open a HTML, CSS or JavaScript file, pop out the console in Sublime Text from View -> Show Console, and type `view.run_command("htmlprettify")`.

Writing commands in the console is ugly. Set up your own key combo for this, by going to Preferences -> Key Bindings - User, and adding a command in that array: `{ "keys": ["super+shift+h"], "command": "htmlprettify" }`. You can use any other command you want, thought most of them are already taken.

## Oh noez, command not found!
If you get an error `sh: node: command not found` or similar, you don't have `node` in the right path. Try setting the absolute path to node in `HTMLPrettify.sublime-settings`.

* `Ctrl+Shift+P` or `Cmd+Shift+P` in Linux/Windows/OS X
* type `htmlprettify`, select `Set node Path`

Simply using `node` without specifying a path sometimes doesn't work :(

For example, on Linux the path could be in `/home/<user>/.nvm/<node version>/bin/node`.

On Windows, the absolute path to node.exe *must* use forward slashes.

### Be very careful on Debian!
Depending on your distribution and default package sources, `apt-get install node` (for example) *will not* install node.js, contrary to all human common sense and popular belief. You want `nodejs` instead. Best thing is to make it yourself from http://nodejs.org/#download.

## Beautify on Save
To beautify your code when saving the document, set the `format_on_save` setting to `true` in `HTMLPrettify.sublime-settings`:

* `Ctrl+Shift+P` or `Cmd+Shift+P` in Linux/Windows/OS X
* type `htmlprettify`, select `Set Plugin Options`

## Preserving selection after formatting
To stop beautifying only the selected text, set the `format_selection_only` setting to `false` in `HTMLPrettify.sublime-settings`.

## Using your own .jsbeautifyrc options
The plugin looks for a `.jsbeautifyrc` file in the same directory as the source file you're prettifying (or any directory above if it doesn't exist, or in your home folder if everything else fails) and uses those options along the default ones. [Here](https://github.com/einars/js-beautify/blob/master/js/config/defaults.json)'s an example of how it can look like.

These are the default options used by this plugin:
```javascript
{
  // Details: https://github.com/victorporof/Sublime-HTMLPrettify#using-your-own-jsbeautifyrc-options
  // Documentation: https://github.com/einars/js-beautify/
  "html": {
    "allowed_file_extensions": ["htm", "html", "xhtml", "shtml", "xml", "svg"],
    "brace_style": "collapse", // [collapse|expand|end-expand|none] Put braces on the same line as control statements (default), or put braces on own line (Allman / ANSI style), or just put end braces on own line, or attempt to keep them where they are
    "end_with_newline": false, // End output with newline
    "indent_char": " ", // Indentation character
    "indent_handlebars": false, // e.g. {{#foo}}, {{/foo}}
    "indent_inner_html": false, // Indent <head> and <body> sections
    "indent_scripts": "keep", // [keep|separate|normal]
    "indent_size": 4, // Indentation size
    "max_preserve_newlines": 0, // Maximum number of line breaks to be preserved in one chunk (0 disables)
    "preserve_newlines": true, // Whether existing line breaks before elements should be preserved (only works before elements, not inside tags or for text)
    "unformatted": ["a", "span", "img", "code", "pre", "sub", "sup", "em", "strong", "b", "i", "u", "strike", "big", "small", "pre", "h1", "h2", "h3", "h4", "h5", "h6"], // List of tags that should not be reformatted
    "wrap_line_length": 0 // Lines should wrap at next opportunity after this number of characters (0 disables)
  },
  "css": {
    "allowed_file_extensions": ["css", "scss", "sass", "less"],
    "end_with_newline": false, // End output with newline
    "indent_char": " ", // Indentation character
    "indent_size": 4, // Indentation size
    "newline_between_rules": true, // Add a new line after every css rule
    "selector_separator": " ",
    "selector_separator_newline": true // Separate selectors with newline or not (e.g. "a,\nbr" or "a, br")
  },
  "js": {
    "allowed_file_extensions": ["js", "json", "jshintrc", "jsbeautifyrc"],
    "brace_style": "collapse", // [collapse|expand|end-expand|none] Put braces on the same line as control statements (default), or put braces on own line (Allman / ANSI style), or just put end braces on own line, or attempt to keep them where they are
    "break_chained_methods": false, // Break chained method calls across subsequent lines
    "e4x": false, // Pass E4X xml literals through untouched
    "end_with_newline": false, // End output with newline
    "indent_char": " ", // Indentation character
    "indent_level": 0, // Initial indentation level
    "indent_size": 4, // Indentation size
    "indent_with_tabs": false, // Indent with tabs, overrides `indent_size` and `indent_char`
    "jslint_happy": false, // If true, then jslint-stricter mode is enforced
    "keep_array_indentation": false, // Preserve array indentation
    "keep_function_indentation": false, // Preserve function indentation
    "max_preserve_newlines": 0, // Maximum number of line breaks to be preserved in one chunk (0 disables)
    "preserve_newlines": true, // Whether existing line breaks should be preserved
    "space_after_anon_function": false, // Should the space before an anonymous function's parens be added, "function()" vs "function ()"
    "space_before_conditional": true, // Should the space before conditional statement be added, "if(true)" vs "if (true)"
    "space_in_empty_paren": false, // Add padding spaces within empty paren, "f()" vs "f( )"
    "space_in_paren": false, // Add padding spaces within paren, ie. f( a, b )
    "unescape_strings": false, // Should printable characters in strings encoded in \xNN notation be unescaped, "example" vs "\x65\x78\x61\x6d\x70\x6c\x65"
    "wrap_line_length": 0 // Lines should wrap at next opportunity after this number of characters (0 disables)
  }
}
```

And here's how a `.jsbeautifyrc` file in your home folder could look like:
```javascript
{
  "html": {
    "indent_char": "\t",
    "indent_size": 1
  },
  "js": {
    "indent_char": " ",
    "indent_size": 2
  }
}
```

See documentation for [JS](https://github.com/einars/js-beautify/#options), or [CSS and HTML](https://github.com/einars/js-beautify/#css--html).

A few persistent options are always applied from a `.jsbeautifyrc` file located in the same directory as the plugin, if not overwritten by your own `.jsbeautifyrc` file. Those are defined [here](https://github.com/victorporof/Sublime-HTMLPrettify/blob/master/.jsbeautifyrc). You can safely add stuff to that json file if you want:

* `Ctrl+Shift+P` or `Cmd+Shift+P` in Linux/Windows/OS X
* type `htmlprettify`, select `Set Prettify Preferences`

## Specifying your own file extensions
To add different file extensions use `allowed_file_extensions` in the `.jsbeautifyrc` file:
```javascript
{
  "html": {
    "allowed_file_extensions": ["html", "shtml", "aspx", "master", "xml", "xhtml"]
  }
  "css": {
    "allowed_file_extensions": ["css", "scss", "sass", "less"]
  }
  "js": {
    "allowed_file_extensions": ["js", "json", "jshintrc", "jsbeautifyrc"]
  }
}
```

Thank you!
