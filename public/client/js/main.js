require.config({
    baseUrl: 'client',
    paths: {
        'handlebars': 'bower_components/handlebars/handlebars',
        'jquery': 'bower_components/jquery/dist/jquery.min',
        'text': 'vendor/text'
    },
    shim: {
        'handlebars': {
            exports: 'Handlebars'
        }
    }
});

require([ 'handlebars', 'jquery', 'text!hello.hbs'
], function (Handlebars, $, test_template) {
    "use strict";

    debugger;

    console.log("hello world");

    // var test_template = "<p>Hello {{ name }} </p>";

    var compiled_template = Handlebars.compile(test_template);
    var rendered_template = compiled_template({name: "bob"});
    $('#hello-test').html(rendered_template);

});
