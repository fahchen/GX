require.config({
    baseUrl: 'client',
    paths: {
        'handlebars': 'bower_components/handlebars/handlebars',
        'jquery': 'bower_components/jquery/dist/jquery.min',
        'underscore': 'bower_components/lodash/dist/lodash.underscore',
        'backbone': 'bower_components/backbone/backbone',
        'lodash': 'bower_components/lodash/dist/lodash.min',
        'text': 'vendor/text',

				'models': 'js/models'
    },
    shim: {
        'backbone': {
            deps: ['underscore'],
            exports: 'Backbone'
        },
        'handlebars': {
            exports: 'Handlebars'
        }
    }
});

require([ 'handlebars', 'jquery', 'models',
					'text!views/destination-list.hbs'
], function (Handlebars, $, models, destination_list_t) {
    "use strict";

		Handlebars.registerHelper('list', function(items, options) {
				var out = "<ul>";
				for(var i=0, l=items.length; i<l; i++) {
						out = out + "<li>" + options.fn(items[i]) + "</li>";
				}
				return out + "</ul>";
		});

    var compiled_list_template = Handlebars.compile(destination_list_t);
    var rendered_list_template = compiled_list_template({
				destinations: [{id: 0, name: "成都"}]
		});
    $('#list-template').html(rendered_list_template);


});
