# HTML, CSS and JavaScript code formatter for Sublime Text 2 via node.js
#### [Sublime Text 2](http://www.sublimetext.com/2)
#### [JSBeautifier](http://jsbeautifier.org/)
#### [Node.js download](http://nodejs.org/#download)

## About
This is a Sublime Text 2 plugin allowing you to format your HTML, CSS and JavaScript code. It uses a set of nice beautifier libs made by Einar Lielmanis and Noah Kantrowitz. The formatters are written in JavaScript, so you'll need something (node.js) to interpret JavaScript code outside the browser.

This will work with both HTML, CSS and JavaScript files.

## Installation
First of all, be sure you have [node.js](http://nodejs.org/#download) installed in order to run the beautifier. After you've installed node.js, you will need to setup this plugin.
Each OS has a different `Packages` folder required by Sublime Text. Open it via Preferences -> Browse Packages, and copy this repository contents to the `Sublime-HTMLPrettify` folder there.

The shorter way of doing this is:
#### Linux
`git clone git://github.com/victorporof/Sublime-HTMLPrettify.git ~/.config/sublime-text-2/Packages/Sublime-HTMLPrettify`

#### Mac
`git clone git://github.com/victorporof/Sublime-HTMLPrettify.git ~/Library/Application\ Support/Sublime\ Text\ 2/Packages/Sublime-HTMLPrettify`

#### Windows
`git clone git://github.com/victorporof/Sublime-HTMLPrettify.git %APPDATA%/Sublime\ Text\ 2/Packages/Sublime-HTMLPrettify`

## Usage
Tools -> Command Palette (`Cmd+Shift+P` or `Ctrl+Shift+P`) and type `htmlprettify`.

-- or --

`Ctrl+Shift+H` (or `Cmd+Shift+H` if you're on a Mac).

-- or --

Right click in the current buffer and select "Beautify code".

-- or --

Open a HTML, CSS or JavaScript file, pop out the console in Sublime Text from View -> Show Console, and type `view.run_command("htmlprettify")`.

Writing commands in the console is ugly. Set up your own key combo for this, by going to Preferences -> Key Bindings - User, and adding a command in that huge array: `{ "keys": ["super+shift+h"], "command": "htmlprettify" },`. You can use any other command you want, thought most of them are already taken.

## Oh noez, command not found!
If you get an error `sh: node: command not found` or similar, you don't have `node` in the right path. Try setting the absolute path to node in `HTMLPrettify.py`.
This means from:
`cmd = ["/usr/local/bin/node",...]`
change to
`cmd = ["/your/absolute/path/to/node",...]`

On Windows, the absolute path to node.exe *must* use forward slashes.

## Customize
The `HTMLPrettify.py` script has some predefined settings regarding the indentation size, indentation character, maximum chars per line and brace styling. Customize these settings by modifying the script with your desired values (see the [JSBeautifier options](https://github.com/einars/js-beautify/#options)). To add different file extensions (like jsp/gsp/php) edit scripts/run.js.

Have fun!
