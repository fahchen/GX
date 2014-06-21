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
					'text!views/destination-list.hbs',
					'text!views/tour-list.hbs',
					'text!views/tour-details.hbs'
], function (Handlebars, $, models,
						 destination_list_t, tour_list_t, tour_details_t) {
    "use strict";

		var destinations = new models.Destinations();
		destinations.fetch({
				success: function () { console.log("fetch success"); },
        error: function () { console.log("fetch error"); }
		});


		Handlebars.registerHelper('list', function(items, options) {
				var out = "<ul>";
				for(var i=0, l=items.length; i<l; i++) {
						out = out + "<li>" + options.fn(items[i]) + "</li>";
				}
				return out + "</ul>";
		});

		Handlebars.registerHelper('tourlist', function(items, options) {
				var out = "";
				for(var i=0, l=items.length; i<l; i++) {
						out = [out,
									 '<div class="tour-list-item">',
									 options.fn(items[i]),
									 '</div>'].join('');
				}
				return out;
		});

    var compiled_template;
    var rendered_template;

		compiled_template = Handlebars.compile(destination_list_t);
		rendered_template = compiled_template({
				destinations: [{id: 0, name: "成都"}]
		});
    $('#destination-list').html(rendered_template);

		compiled_template = Handlebars.compile(tour_list_t);
		rendered_template = compiled_template({
				tours: [{id: 0, name: "窄巷"}]
		});
    $('#tour-list').html(rendered_template);

		compiled_template = Handlebars.compile(tour_details_t);
		rendered_template = compiled_template({
		});
    $('#tour-detail').html(rendered_template);


});
