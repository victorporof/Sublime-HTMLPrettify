/*
 Copyright (C) 2011 Sencha Inc.

 Author: Ariya Hidayat.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/

/*jslint continue: true, indent: 4 */

function cssbeautify(style, opt) {
    "use strict";
    var options, index = 0, length = style.length, formatted = '',
        ch, ch2, str, state, State,
        openbrace = ' {',
        trimRight, i, len;

    options = arguments.length > 1 ? opt : {};
    if (typeof options.indent_size !== "undefined") {
        options.indent = "";

        for (i = 0, len = options.indent_size; i < len; i++) {
            options.indent += options.indent_char || ' ';
        }
    }
    if (typeof options.indent === 'undefined') {
        options.indent = '    ';
    }
    if (typeof options.openbrace === 'string') {
        openbrace = (options.openbrace === 'end-of-line') ? ' {' : '\n{';
    }

    function isWhitespace(c) {
        return ' \t\n\r\f'.indexOf(c) >= 0;
    }

    if (String.prototype.trimRight) {
        trimRight = function (s) {
            return s.trimRight();
        };
    } else {
        // old Internet Explorer
        trimRight = function (s) {
            return s.replace(/\s+$/, '');
        };
    }

    State = {
        Start: 0,
        BlockComment: 1,
        Selectors: 2,
        Ruleset: 3,
        PropertyName: 4,
        Separator: 5,
        PropertyValue: 6,
        SingleQuotedString: 7,
        DoubleQuotedString: 8
    };
    state = State.Start;

    // We want to deal with LF (\n) only
    style = style.replace(/\r\n/g, '\n');

    while (index < length) {
        ch = style.charAt(index);
        ch2 = style.charAt(index + 1);
        index += 1;

        if (state === State.Start) {

            // Copy white spaces and control characters
            if (ch <= ' ' || ch.charCodeAt(0) >= 128) {
                state = State.Start;
                formatted += ch;
                continue;
            }

            // Block comment
            if (ch === '/' && ch2 === '*') {
                state = State.BlockComment;
                formatted += ch;
                formatted += ch2;
                index += 1;
                continue;
            }

            // Selectors
            // FIXME: handle Unicode characters
            if ((ch >= 'a' && ch <= 'z') ||
                    (ch >= 'A' && ch <= 'Z') ||
                    (ch >= '0' && ch <= '9') ||
                    (ch === '-') || (ch === '_') ||
                    (ch === '.') || (ch === ':')) {

                // Clear trailing whitespaces and linefeeds.
                str = trimRight(formatted);

                // After finishing a ruleset, there should be one blank line.
                if (str.charAt(str.length - 1) === '}') {
                    formatted = str + '\n\n';
                } else {
                    // After block comment, keep all the linefeeds but
                    // start from the first column (remove whitespaces prefix).
                    while (true) {
                        ch2 = formatted.charAt(formatted.length - 1);
                        if (ch2 !== ' ' && ch2.charCodeAt(0) !== 9) {
                            break;
                        }
                        formatted = formatted.substr(0, formatted.length - 1);
                    }
                }
                formatted += ch;
                state = State.Selectors;
                continue;
            }
        }

        if (state ===  State.BlockComment) {
            // Continue until we hit the final marker '*/' (star, forward slash).
            formatted += ch;
            if (ch === '*' && ch2 === '/') {
                state = State.Start;
                formatted += ch2;
                index += 1;
            }
            continue;
        }

        if (state === State.Selectors) {
            // Continue until we hit '{'
            if (ch === '{') {
                formatted = trimRight(formatted);
                formatted += openbrace;
                if (ch2 !== '\n') {
                    formatted += '\n';
                }
                state = State.Ruleset;
            } else {
                formatted += ch;
            }
            continue;
        }

        if (state === State.Ruleset) {
            // Continue until we hit '}'
            if (ch === '}') {
                formatted = trimRight(formatted);
                formatted += '\n}';
                state = State.Start;
                continue;
            }
            // Make sure there is no blank line or trailing spaces inbetween
            if (ch === '\n') {
                formatted = trimRight(formatted);
                formatted += '\n';
                continue;
            }
            // property name
            if (!isWhitespace(ch)) {
                formatted = trimRight(formatted);
                formatted += '\n';
                formatted += options.indent;
                formatted += ch;
                state = State.PropertyName;
                continue;
            }
            formatted += ch;
            continue;
        }

        if (state === State.PropertyName) {
            // Continue until we hit ':'
            if (ch === ':') {
                formatted = trimRight(formatted);
                formatted += ': ';
                state = State.Separator;
                continue;
            }
            // or until we hit '}'
            if (ch === '}') {
                formatted = trimRight(formatted);
                formatted += '\n}';
                state = State.Start;
                continue;
            }
            formatted += ch;
            continue;
        }

        if (state === State.Separator) {
            if (!isWhitespace(ch)) {
                formatted += ch;
                if (ch === '\'') {
                    state = State.SingleQuotedString;
                    continue;
                } else if (ch === '"') {
                    state = State.DoubleQuotedString;
                    continue;
                }
                state = State.PropertyValue;
                continue;
            }
            continue;
        }

        if (state === State.PropertyValue) {
            if (ch === '\'') {
                formatted += ch;
                state = State.SingleQuotedString;
                continue;
            }
            if (ch === '"') {
                formatted += ch;
                state = State.DoubleQuotedString;
                continue;
            }
            // Continue until we hit ';''
            if (ch === ';') {
                formatted = trimRight(formatted);
                formatted += ';\n';
                state = State.Ruleset;
                continue;
            }
            // or until we hit '}'
            if (ch === '}') {
                formatted = trimRight(formatted);
                formatted += '\n}';
                state = State.Start;
                continue;
            }
            formatted += ch;
            continue;
        }

        // TODO: fully implement http://www.w3.org/TR/CSS2/syndata.html#strings
        if (state === State.SingleQuotedString) {
            // Continue until we hit another single quote
            if (ch === '\'') {
                state = State.PropertyValue;
                formatted += ch;
                continue;
            }
            formatted += ch;
            continue;
        }

        // TODO: fully implement http://www.w3.org/TR/CSS2/syndata.html#strings
        if (state === State.DoubleQuotedString) {
            // Continue until we hit another double quote
            if (ch === '"') {
                state = State.PropertyValue;
                formatted += ch;
                continue;
            }
            formatted += ch;
            continue;
        }


        // The default action is to copy the character (to prevent
        // infinite loop).
        formatted += ch;
    }

    return formatted;
}

if (typeof exports !== "undefined")
    exports.cssbeautify = cssbeautify;
