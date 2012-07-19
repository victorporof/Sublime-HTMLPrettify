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

/*global console, process, require, __dirname */

(function() {
  "use strict";

  var i, len, hash, key, value, raw,

    // cache the console log function and the process arguments
    log = console.log,
    argv = process.argv,

    // require path and file system utilities to load the jshint.js file
    path = require('path'),
    fs = require('fs'),

    // the source file to be linted and options
    source = argv[2] || "",
    option = {};

  // the style_html and js_beautify functions work when global by dependance
  global.style_html =
    require(path.join(__dirname, "beautify-html.js")).style_html;

  global.js_beautify =
    require(path.join(__dirname, "beautify.js")).js_beautify;

  global.cssbeautify =
    require(path.join(__dirname, "cssbeautify.js")).cssbeautify;

  // continue only if the source file is specified
  if (source !== "") {

    // extra arguments with custom options could be passed, so check them now
    // and add them to the options object
    for (i = 3, len = argv.length; i < len; i++) {
      hash = argv[i].split(": ");
      key = hash[0];
      value = hash[1];

      // options are stored in key value pairs, such as option.es5 = true
      option[key] = value;
    }

    // read the source file and, when complete, lint the code
    fs.readFile(source, "utf8", function(err, data) {
      if (err) {
        return;
      }

      // format the code
      if (source.match(".html?" + "$")) {
        log(style_html(data, option));
      }
      else if (source.match(".css" + "$") == ".css") {
        log(cssbeautify(data, option));
      }
      else if (source.match(".js" + "$") == ".js") {
        log(js_beautify(data, option));
      }
    });
  }
}());
