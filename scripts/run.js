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

  // The source file to be linted and options.
  var source = argv[2] || "";
  var settings = (argv[3] || "").split(" && ");
  var option = {};

  var html_beautify = require(path.join(__dirname, "beautify-html.js")).html_beautify;
  var js_beautify = require(path.join(__dirname, "beautify.js")).js_beautify;
  var css_beautify = require(path.join(__dirname, "beautify-css.js")).css_beautify;

  // Continue only if the source file is specified.
  if (source == "") {
    return;
  }

  // Extra arguments with custom options could be passed, so check them now
  // and add them to the options object.
  for (var i = 0, len = settings.length; i < len; i++) {
    var hash = settings[i].split(":");
    if (hash.length != 2) {
      continue;
    }
    var key = hash[0].trim();
    var value = hash[1].replace(/^\ /, "");

    // Options are stored in key value pairs, such as option.indent_size = 2.
    option[key] = value;
  }

  // Read the source file and, when complete, beautify the code.
  fs.readFile(source, "utf8", function(err, data) {
    if (err) {
      log("Error, unable to continue.");
      return;
    }
    else if (source.match(".html?$")) {
      log(html_beautify(data, option));
    }
    else if (source.match(".css?$")) {
      log(css_beautify(data, option));
    }
    else if (source.match(".jsm?$")) {
      log(js_beautify(data, option));
    }
  });
}());
