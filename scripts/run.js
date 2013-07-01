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
  var path = require('path');
  var fs = require('fs');

  // The source file to be prettified, original source's path and some options.
  var tempPath = argv[2] || "";
  var filePath = argv[3] || "";
  var settings = (argv[4] || "").split(" && ");
  var option = {};

  var html_beautify = require(path.join(__dirname, "beautify-html.js")).html_beautify;
  var js_beautify = require(path.join(__dirname, "beautify.js")).js_beautify;
  var css_beautify = require(path.join(__dirname, "beautify-css.js")).css_beautify;

  // Extra arguments with custom options could be passed, so check them now
  // and add them to the options object.
  for (var i = 0, len = settings.length; i < len; i++) {
    var hash = settings[i].split(":");
    if (hash.length != 2) {
      continue;
    }
    var key = hash[0].trim();
    var value = hash[1].replace(/^\ /, "");

    // There is one option that allows array of strings to be passed.
    if (key == "unformatted") {
      // eval is evil, but JSON.parse would require usage of only double quotes.
      option[key] = eval(value);
      continue;
    }

    // Special case 'max_char' to allow for infinite lines.
    if (key == "max_char" && +value <= 0) {
      option[key] = Number.MAX_VALUE;
    }

    // Options are stored in key value pairs, such as option.indent_size = 2.
    option[key] = value;
  }

  // Read the source file and, when complete, beautify the code.
  fs.readFile(tempPath, "utf8", function(err, data) {
    if (err) {
      log("Error, unable to continue.");
      return;
    }
    else if (filePath.match(".jsm?$") || data.indexOf("<") != 0) {
      log(js_beautify(data, option));
    }
    else if (filePath.match(".html?$") || data.indexOf("<") == 0) {
      log(html_beautify(data, option));
    }
    else if (filePath.match(".css?$")) {
      log(css_beautify(data, option));
    }
    else if (filePath.match(".less$")) {
      log(css_beautify(data, option));
    }
  });
}());
