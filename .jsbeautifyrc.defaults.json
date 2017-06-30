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