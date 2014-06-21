require.config({
    baseUrl: 'client',
    paths: {
        'handlebars': 'bower_components/handlebars/handlebars',
        'jquery': 'bower_components/jquery/dist/jquery.min'
    },
    shim: {
        'handlebars': {
            exports: 'Handlebars'
        }
    }
});

require([ 'handlebars', 'jquery'
], function (Handlebars, $) {
    "use strict";

    console.log("hello world");

    var test_template_raw = "<p>Hello {{ name }} </p>";
    var compiled_template = Handlebars.compile(test_template_raw);
    var rendered_template = compiled_template({name: "bob"});
    $('#hello-test').html(rendered_template);

});
