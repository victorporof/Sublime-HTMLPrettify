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
If you get an error about Node.js not being found or similar, you don't have `node` in the right path. Try setting the absolute path to node in `HTMLPrettify.sublime-settings`.

* `Ctrl+Shift+P` or `Cmd+Shift+P` in Linux/Windows/OS X
* type `htmlprettify`, select `Set node Path`

Simply using `node` without specifying a path sometimes doesn't work :(

For example, on Linux the path could be in `/home/<user>/.nvm/<node version>/bin/node`.

On Windows, the absolute path to node.exe *must* use forward slashes. Must include nodejs.exe, like so: `C:/Program Files (x86)/Nodejs/node.exe`

### Be very careful on Linux!
Depending on your distribution and default package sources, `apt-get install node` (for example) *will not* install node.js, contrary to all human common sense and popular belief. You want `nodejs` instead. Best thing is to make it yourself from http://nodejs.org/#download.

## Beautify on Save
To beautify your code when saving the document, set the `format_on_save` setting to `true` in `HTMLPrettify.sublime-settings`:

* `Ctrl+Shift+P` or `Cmd+Shift+P` in Linux/Windows/OS X
* type `htmlprettify`, select `Set Plugin Options`

## Beautify while editing (Experimental / Sublime Text 3 only)
To beautify your code when while editing a document, set the `format_while_editing` setting to `true` in `HTMLPrettify.sublime-settings`.

## Auto-beautify when opening, focusing or bluring a file (Sublime Text 3 only)
To beautify your code when on any of these events, set the `format_on_open`, `format_on_focus`, `format_on_focus_lost` settings to `true` in `HTMLPrettify.sublime-settings`.

## Formatting selected text only
To stop beautifying only the selected text, set the `format_selection_only` setting to `false` in `HTMLPrettify.sublime-settings`.

## Saving to a temporary file before prettifying
Before prettifying, a copy of the the current editor's text contents are saved to a temporary file. This avoids piping the text directly to the prettifier, avoiding "filename or extension is too long" errors on Windows or any potential data lowss. To operate on the original document instead, set the `save_to_temp_file_before_prettifying` setting to `false` in `HTMLPrettify.sublime-settings`.

## Specifying which files are allowed to be prettified
To add different file extensions use `allowed_file_extensions` or `allowed_file_syntaxes` in `HTMLPrettify.sublime-settings`, under the `global_file_rules` setting.

If the `use_editor_syntax` setting is false, then the following apply:
```js
{
  "html": {
    "allowed_file_extensions": ["htm", "html", "xhtml", "shtml", "xml", "svg"],
  },
  "css": {
    "allowed_file_extensions": ["css", "scss", "sass", "less"]
  },
  "js": {
    "allowed_file_extensions": ["js"]
  },
  "json": {
    "allowed_file_extensions": ["json", "jshintrc", "jsbeautifyrc"],
  }
}
```

If the `use_editor_syntax` setting is true, then the following apply:
```js
{
  "html": {
    "allowed_file_syntaxes": ["html", "xml"],
  },
  "css": {
    "allowed_file_syntaxes": ["css", "sass", "less"],
  },
  "js": {
    "allowed_file_syntaxes": ["javascript", "ecma"],
  },
  "json": {
    "allowed_file_syntaxes": ["json"],
  }
}
```

## Ignoring certain files
To add ignore rules use `disallowed_file_patterns` in `HTMLPrettify.sublime-settings`, under the `global_file_rules` setting. If the file (including path) matches any of the regexp patterns defined in `disallowed_file_patterns` it will not be beautified.

The following apply regardless of the `use_editor_syntax` setting's value:
```js
{
  "html": {
    "disallowed_file_patterns": ["myFileToSkip\\.html", "myFolderToSkip"]
  },
  "css": {
    "disallowed_file_patterns": ["myFileToSkip\\.css", "myFolderToSkip"]
  },
  "js": {
    "disallowed_file_patterns": ["myFileToSkip\\.js", "myFolderToSkip"]
  },
  "json": {
    "disallowed_file_patterns": ["myFileToSkip\\.json", "myFolderToSkip"]
  }
}
```

## Ignoring certain blocks of code
Parts of code that shouldn't be formatted can be ignored with `beautify preserve` and `beautify ignore` directive comments. This allows you to tell the beautifier to preserve the formtatting of or completely ignore part of a file. The example inputs below will remain changed after beautification.

Use `preserve` when the content is javascript, but you don't want it reformatted.
```js
/* beautify preserve:start */
{
    browserName: 'internet explorer',
    platform:    'Windows 7',
    version:     '8'
}
/* beautify preserve:end */
```

Use `ignore` when the content is not parsable as javascript.
```js
var a = 1;
/* beautify ignore:start */
 {This is some strange{template language{using open-braces?
/* beautify ignore:end */
```

## Using editor indentation settings to determine formatting style
To stop using the formatting style defined in the `.jsbeautifyrc` config file regarding indentation size and whether or not to use tabs or spaces, in order to use sublime's settings instead, then set the `use_editor_indentation` setting to `true` in `HTMLPrettify.sublime-settings`.

## Using editor syntax for determining file type
To stop using editor syntax and instead use file extensions for determining file type, set the `use_editor_syntax` setting to `false` in `HTMLPrettify.sublime-settings`.

## Respecting [.editorconfig](http://editorconfig.org) files
These configuration files can be placed wherever a `.jsbeautifyrc` could. To stop respecting `.editorconfig` files, which override the prettifier's rules, set the `use_editorconfig` setting to `false` in `HTMLPrettify.sublime-settings`. Note that `use_editor_syntax` and `use_editor_indentation` have precedence and will always override any other settings from any configuration file like `.jsbeautifyrc` and `.editorconfig`.

## Using your own .jsbeautifyrc options
The plugin looks for a `.jsbeautifyrc` file in the following directories:

1. The same directory as the source file you're prettifying.
2. The source file's parent directories.
3. Your home folder.
4. Your personal Sublime settings folder.

When one is found, it stops searching, and it uses those options along with the default ones.
```js
{
    // The plugin looks for a .jsbeautifyrc file in the same directory as the
    // source file you're prettifying (or any directory above if it doesn't exist,
    // or in your home folder if everything else fails) and uses those options
    // along the default ones.

    // Details: https://github.com/victorporof/Sublime-HTMLPrettify#using-your-own-jsbeautifyrc-options
    // Documentation: https://github.com/beautify-web/js-beautify

    "all":
    {
        // These rules apply to all HTML, CSS, JS and JSON files to be prettified
        // and have the lowest level of precedence (meaning any of the settings in
        // the 'html', 'css', 'js', 'json' and 'custom' categories override these).

        // You can add other .jsbeautifyrc rules in this section too.

        // End output with newline
        "end_with_newline": false,

        // Character(s) to use as line terminators.
        "eol": "\n",

        // Initial indentation level
        "indent_level": 0,

        // Indentation character
        "indent_char": " ",

        // Indentation size
        "indent_size": 4,

        // Indent with tabs, overrides `indent_size` and `indent_char`
        "indent_with_tabs": false,

        // Maximum number of line breaks to be preserved in one chunk (0 disables)
        "max_preserve_newlines": 0,

        // Whether existing line breaks before elements should be preserved (only works before elements, not inside tags or for text)
        "preserve_newlines": true,

        // Lines should wrap at next opportunity after this number of characters (0 disables)
        "wrap_line_length": 0
    },

    "html":
    {
        // Rules added here apply only to HTML files. They take precedence over all
        // of the settings in the 'all' category above.

        // You can add other .jsbeautifyrc rules in this section too.

        // e.g. {{#foo}}, {{/foo}}
        "indent_handlebars": false,

        // Indent <head> and <body> sections
        "indent_inner_html": false,

        // [keep|separate|normal]
        "indent_scripts": "keep",

        // List of tags that should not be reformatted
        "unformatted": ["a", "span", "img", "code", "pre", "sub", "sup", "em", "strong", "b", "i", "u", "strike", "big", "small", "pre", "h1", "h2", "h3", "h4", "h5", "h6"]
    },

    "css":
    {
        // Rules added here apply only to CSS files. They take precedence over all
        // of the settings in the 'all' category above.

        // You can add other .jsbeautifyrc rules in this section too.

        // Add a new line after every css rule
        "newline_between_rules": true,

        // Selector separator character
        "selector_separator": " ",

        // Separate selectors with newline or not (e.g. "a,\nbr" or "a, br")
        "selector_separator_newline": true
    },

    "js":
    {
        // Rules added here apply only to JS files. They take precedence over all
        // of the settings in the 'all' category above.

        // You can add other .jsbeautifyrc rules in this section too.

        // [collapse|collapse-preserve-inline|expand|end-expand|none] Put braces on the same line as control statements (default), or put braces on own line (Allman / ANSI style), or put end braces on own line, or attempt to keep them where they are
        "brace_style": "collapse-preserve-inline",

        // Break chained method calls across subsequent lines
        "break_chained_methods": false,

        // Put commas at the beginning of new line instead of end
        "comma_first": false,

        // Pass E4X xml literals through untouched
        "e4x": false,

        // If true, then jslint-stricter mode is enforced
        "jslint_happy": false,

        // Preserve array indentation
        "keep_array_indentation": false,

        // Preserve function indentation
        "keep_function_indentation": false,

        // [before-newline|after-newline|preserve-newline] Set operator position
        "operator_position": "before-newline",

        // Should the space before an anonymous function's parens be added, "function()" vs "function ()"
        "space_after_anon_function": false,

        // Should the space before conditional statement be added, "if(true)" vs "if (true)"
        "space_before_conditional": true,

        // Add padding spaces within empty paren, "f()" vs "f( )"
        "space_in_empty_paren": false,

        // Add padding spaces within paren, ie. f( a, b )
        "space_in_paren": false,

        // Should printable characters in strings encoded in \xNN notation be unescaped, "example" vs "\x65\x78\x61\x6d\x70\x6c\x65"
        "unescape_strings": false
    },

    "json":
    {
        // Rules added here apply only to JSON files. They take precedence over all
        // of the settings in the 'all' category above.

        // You can add other .jsbeautifyrc rules in this section too.

        // [collapse|collapse-preserve-inline|expand|end-expand|none] Put braces on the same line as control statements (default), or put braces on own line (Allman / ANSI style), or put end braces on own line, or attempt to keep them where they are
        "brace_style": "expand",

        // Preserve array indentation
        "keep_array_indentation": false,

        // Should printable characters in strings encoded in \xNN notation be unescaped, "example" vs "\x65\x78\x61\x6d\x70\x6c\x65"
        "unescape_strings": false
    },

    "custom":
    {
        // Rules added here apply only to some files matching specific glob strings.
        // For the following entries, keys are globs and values are objects which
        // can contain any kind of .jsbeautifyrc setting. They take precedence over
        // all of the above settings.

        "package?(-lock).json":
        {
            "indent_size": 2,
            "brace_style": "collapse"
        },

        "*.sublime-@(settings|keymap|commands|menu)":
        {
            "indent_size": 4,
            "brace_style": "expand"
        }
    }
}
```

And here's how a `.jsbeautifyrc` file in your home folder could look like:
```js
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

Thank you!
