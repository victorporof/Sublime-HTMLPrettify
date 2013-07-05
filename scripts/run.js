/*
 * Copyright (c) 2011 Victor Porof
 *
 * This software is provided 'as-is', without any express or implied
 * warranty. In no event will the authors be held liable for any damages
 * arising from the use of this software.
 *
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 *
 *    1. The origin of this software must not be misrepresented; you must not
 *    claim that you wrote the original software. If you use this software
 *    in a product, an acknowledgment in the product documentation would be
 *    appreciated but is not required.
 *
 *    2. Altered source versions must be plainly marked as such, and must not
 *    be misrepresented as being the original software.
 *
 *    3. This notice may not be removed or altered from any source
 *    distribution.
 */

(function() {
  "use strict";

  // Cache the console log function and the process arguments.
  var log = console.log;
  var argv = process.argv;

  // Require path and file system utilities to load the jshint.js file.
  var path = require("path");
  var fs = require("fs");

  // The source file to be prettified, original source's path and some options.
  var tempPath = argv[2] || "";
  var filePath = argv[3] || "";
  var options = {};

  var html_beautify = require(path.join(__dirname, "beautify-html.js")).html_beautify;
  var js_beautify = require(path.join(__dirname, "beautify.js")).js_beautify;
  var css_beautify = require(path.join(__dirname, "beautify-css.js")).css_beautify;

  // Some handy utility functions.
  function isTrue(value) {
    return value == "true" || value == true;
  }
  function getOptions(file) {
    var data = fs.readFileSync(file, "utf8");
    var comments = /(?:\/\*(?:[\s\S]*?)\*\/)|(?:\/\/(?:.*)$)/gm;
    try {
      return JSON.parse(data.replace(comments, ""));
    } catch (e) {
      return Object.create(null);
    }
  }
  function setOptions(file, optionsStore) {
    var obj = getOptions(file);
    for (var key in obj) {
      var value = obj[key];
      // Special case "true" and "false" pref values as actually booleans.
      // This avoids common accidents in .jsbeautifyrc json files.
      if (value == "true" || value == "false") {
        optionsStore[key] = isTrue(value);
      } else {
        optionsStore[key] = value;
      }
    }
  }

  var jshintrc = ".jsbeautifyrc";
  var pluginFolder = __dirname.split(path.sep).slice(0, -1).join(path.sep);
  var jshintrcPath;

  // Try and get some persistent options from the plugin folder.
  if (fs.existsSync(jshintrcPath = pluginFolder + path.sep + jshintrc)) {
    setOptions(jshintrcPath, options);
  }

  function isHTML(path, data) {
    return path.match(/\.html?$/) ||
      path.match(/\.xhtml?$/) ||
      path.match(/\.xml?$/) ||
      (path == "?" && data.indexOf("<") == 0);
  }

  function isCSS(path, data) {
    return path.match(/\.css?$/) || path.match(/\.less?$/);
  }

  function isJS(path, data) {
    return path.match(/\.jsm?$/) ||
      path.match(/\.json$/) ||
      path.match(/\.sublime-/) ||
      (path == "?" && data.indexOf("<") != 0);
  }

  // Read the source file and, when complete, beautify the code.
  fs.readFile(tempPath, "utf8", function(err, data) {
    if (err) {
      return;
    } else if (isCSS(filePath)) {
      log(css_beautify(data, options));
    } else if (isHTML(filePath, data)) {
      log(html_beautify(data, options));
    } else if (isJS(filePath, data)) {
      log(js_beautify(data, options));
    }
  });
}());
