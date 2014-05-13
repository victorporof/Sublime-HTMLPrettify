/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

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
  var options = { html: {}, css: {}, js: {} };

  // This stuff does all the magic.
  var html_beautify = require(path.join(__dirname, "beautify-html.js")).html_beautify;
  var js_beautify = require(path.join(__dirname, "beautify.js")).js_beautify;
  var css_beautify = require(path.join(__dirname, "beautify-css.js")).css_beautify;

  // Some handy utility functions.
  function isTrue(value) {
    return value == "true" || value == true;
  }
  function getUserHome() {
    return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
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

      // Options are defined as an object for each format, with keys as prefs.
      if (key != "html" && key != "css" && key != "js") {
        continue;
      }
      for (var pref in value) {
        // Special case "true" and "false" pref values as actually booleans.
        // This avoids common accidents in .jsbeautifyrc json files.
        if (value == "true" || value == "false") {
          optionsStore[key][pref] = isTrue(value[pref]);
        } else {
          optionsStore[key][pref] = value[pref];
        }
      }
    }
  }

  var jsbeautifyrc = ".jsbeautifyrc";
  var pluginFolder = path.dirname(__dirname);
  var sourceFolder = path.dirname(filePath);
  var sourceParent = path.dirname(sourceFolder);
  var jsbeautifyrcPath;

  // Older versions of node has `existsSync` in the path module, not fs. Meh.
  fs.existsSync = fs.existsSync || path.existsSync;

  // Try and get some persistent options from the plugin folder.
  if (fs.existsSync(jsbeautifyrcPath = pluginFolder + path.sep + jsbeautifyrc)) {
    setOptions(jsbeautifyrcPath, options);
  }

  // When a JSBeautify config file exists in the same dir as the source file or
  // one dir above, then use this configuration to overwrite the default prefs.

  // Try and get more options from the source's folder.
  if (fs.existsSync(jsbeautifyrcPath = sourceFolder + path.sep + jsbeautifyrc)) {
    setOptions(jsbeautifyrcPath, options);
  }
  // ...or the parent folder.
  else if (fs.existsSync(jsbeautifyrcPath = sourceParent + path.sep + jsbeautifyrc)) {
    setOptions(jsbeautifyrcPath, options);
  }
  // ...or the user's home folder if everything else fails.
  else if (fs.existsSync(jsbeautifyrcPath = getUserHome() + path.sep + jsbeautifyrc)) {
    setOptions(jsbeautifyrcPath, options);
  }

  var DEFAULT_TYPES = {
    "html": ["htm", "html", "xhtml", "shtml", "xml"],
    "css": ["css", "scss", "sass", "less"],
    "js": ["js", "json", "jshintrc", "jsbeautifyrc"]
  };

  // Checks if a file type is allowed by regexing the file name and expecting a
  // certain extension loaded from the settings file.
  function isTypeAllowed(type, path, data) {
    var allowedFileExtensions = options[type]["allowed_file_extensions"] || DEFAULT_TYPES[type];
    for (var i = 0, len = allowedFileExtensions.length; i < len; i++) {
      if (path.match(new RegExp("\\." + allowedFileExtensions[i] + "$"))) {
        return true;
      }
    }
    return false;
  }

  function isHTML(path, data) {
    // If file unsaved, check if first non-whitespace character is &lt;
    if (path == "?") {
      return data.match(/^\s*</);
    }
    return isTypeAllowed("html", path, data);
  }
  function isCSS(path, data) {
    // If file unsaved, there's no good way to determine whether or not it's
    // CSS based on the file contents.
    if (path == "?") {
      return false;
    }
    return isTypeAllowed("css", path, data);
  }
  function isJS(path, data) {
    // If file unsaved, check if first non-whitespace character is NOT &lt;
    if (path == "?") {
      return !data.match(/^\s*</);
    }
    return isTypeAllowed("js", path, data);
  }

  // Read the source file and, when complete, beautify the code.
  fs.readFile(tempPath, "utf8", function(err, data) {
    if (err) {
      return;
    }

    // Mark the output as being from this plugin.
    log("*** HTMLPrettify output ***");

    if (isCSS(filePath, data)) {
      log(css_beautify(data, options["css"]).replace(/\s+$/, ""));
    }
    else if (isHTML(filePath, data)) {
      log(html_beautify(data, options["html"]).replace(/\s+$/, ""));
    }
    else if (isJS(filePath, data)) {
      log(js_beautify(data, options["js"]).replace(/\s+$/, ""));
    }
  });
}());
