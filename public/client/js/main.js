require.config({
    baseUrl: '',
    paths: {
        'handlebars': 'bower_components/handlebars/handlebars'
    },
    shim: {
        'handlebars': {
            exports: 'Handlebars'
        }
    }
});

require([ 'handlebars'
], function (Handlebars) {
    "use strict";
    console.log("hello world");
});