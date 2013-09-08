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

This means from:
`"node_path": "/usr/local/bin/node"`
change to
`"node_path": "/your/absolute/path/to/node"`

Simply using `node` without specifying a path sometimes doesn't work :(

For example, on Linux the path could be in `/home/<user>/.nvm/<node version>/bin/node`.

On Windows, the absolute path to node.exe *must* use forward slashes.

## Beautify on Save

To Beautify your code when saving the document set the below setting in `HTMLPrettify.sublime-settings`

`"format_on_save": true`

## Using your own .jsbeautifyrc options
The plugin looks for a `.jsbeautifyrc` file in the same directory as the source file you're prettifying (or one directory above if it doesn't exist, or in your home folder if everything else fails) and uses those options along the default ones. [Here](https://github.com/einars/js-beautify/blob/master/js/config/defaults.json)'s an example of how it can look like.

These are the default options used by this plugin:
```javascript
{
  // Details: https://github.com/victorporof/Sublime-HTMLPrettify#using-your-own-jsbeautifyrc-options
  // Documentation: https://github.com/einars/js-beautify/
  "html": {
    "brace_style": "collapse", // "expand", "end-expand", "expand-strict"
    "indent_char": " ",
    "indent_scripts": "keep", // "separate", "normal"
    "indent_size": 4,
    "max_preserve_newlines": 10,
    "preserve_newlines": true,
    "unformatted": ["a", "sub", "sup", "b", "i", "u"],
    "wrap_line_length": 0
  },
  "css": {
    "indent_char": " ",
    "indent_size": 4
  },
  "js": {
    "brace_style": "collapse", // "expand", "end-expand", "expand-strict"
    "break_chained_methods": false,
    "e4x": false,
    "eval_code": false,
    "indent_char": " ",
    "indent_level": 0,
    "indent_size": 4,
    "indent_with_tabs": false,
    "jslint_happy": false,
    "keep_array_indentation": false,
    "keep_function_indentation": false,
    "max_preserve_newlines": 10,
    "preserve_newlines": true,
    "space_before_conditional": true,
    "space_in_paren": false,
    "unescape_strings": false,
    "wrap_line_length": 0
  }
}
```

And here's how a `.jsbeautifyrc` file in your home folder could look like:
```javascript
{
  "html": {
    "indent_char": "\t",
    "indent_size": 1
  }
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

To add different file extensions (like jsp/gsp/php) edit `scripts/run.js`.

Thank you!
