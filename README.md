# HTML, CSS and JavaScript code formatter for Sublime Text 2 and 3 via node.js
#### [Sublime Text 3](http://www.sublimetext.com/3)
#### [JS-beautify](https://github.com/einars/js-beautify)
#### [Node.js download](http://nodejs.org/#download)

## About
This is a Sublime Text 2 and 3 plugin allowing you to format your HTML, CSS and JavaScript code. It uses a set of nice beautifier libs made by Einar Lielmanis and Noah Kantrowitz. The formatters are written in JavaScript, so you'll need something (node.js) to interpret JavaScript code outside the browser.

This will work with both HTML, CSS and JavaScript files.

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

These are for Sublime Text 2:

#### Mac
`git clone https://github.com/victorporof/Sublime-HTMLPrettify.git ~/Library/Application\ Support/Sublime\ Text\ 2/Packages/Sublime-HTMLPrettify`

#### Linux
`git clone https://github.com/victorporof/Sublime-HTMLPrettify.git ~/.config/sublime-text-2/Packages/Sublime-HTMLPrettify`

#### Windows
`git clone https://github.com/victorporof/Sublime-HTMLPrettify.git %APPDATA%/Sublime\ Text\ 2/Packages/Sublime-HTMLPrettify`

## Usage
Tools -> Command Palette (`Cmd+Shift+P` or `Ctrl+Shift+P`) and type `htmlprettify`.

-- or --

`Ctrl+Shift+H` (or `Cmd+Shift+H` if you're on a Mac).

-- or --

Right click in the current buffer and select "Prettify Code".

-- or --

Open a HTML, CSS or JavaScript file, pop out the console in Sublime Text from View -> Show Console, and type `view.run_command("htmlprettify")`.

Writing commands in the console is ugly. Set up your own key combo for this, by going to Preferences -> Key Bindings - User, and adding a command in that huge array: `{ "keys": ["super+shift+h"], "command": "htmlprettify" },`. You can use any other command you want, thought most of them are already taken.

## Oh noez, command not found!
If you get an error `sh: node: command not found` or similar, you don't have `node` in the right path. Try setting the absolute path to node in `HTMLPrettify.py`.
This means from:
`node = "node" if self.exists_in_path("node") else "/usr/local/bin/node"`
change to
`node = "node" if self.exists_in_path("node") else "/your/absolute/path/to/node"`

* `Ctrl+Shift+P` or `Cmd+Shift+P` in Linux/Windows/OS X
* type `htmlprettify`, select `Set node Path`

Simply using `node` without specifying a path sometimes doesn't work :(

For example, on Linux the path could be in `/home/<user>/.nvm/<node version>/bin/node`.

On Windows, the absolute path to node.exe *must* use forward slashes.

## Customize
A few persistent options always applied from a `.jsbeautifyrc` file in the same directory as the plugin. Those are defined [here](https://github.com/victorporof/Sublime-JSHint/blob/master/scripts/.jsbeautifyrc). You can safely add stuff to that json file if you want (see documentation for [JS](https://github.com/einars/js-beautify/#options), or [CSS and HTML](https://github.com/einars/js-beautify/#css--html).

* `Ctrl+Shift+P` or `Cmd+Shift+P` in Linux/Windows/OS X
* type `htmlprettify`, select `Set Default Options`

To add different file extensions (like jsp/gsp/php) edit `scripts/run.js`.

Have fun!
