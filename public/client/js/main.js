require.config({
    baseUrl: 'client',
    paths: {
        'handlebars': 'bower_components/handlebars/handlebars',
        'jquery': 'bower_components/jquery/dist/jquery.min',
        'underscore': 'bower_components/lodash/dist/lodash.underscore',
        'backbone': 'bower_components/backbone/backbone',
        'lodash': 'bower_components/lodash/dist/lodash.min',
        'when': 'bower_components/when',
        'text': 'vendor/text',

				'models': 'js/models'
    },
    packages: [
        {name: 'when', path: 'bower_components/when', main: 'when'}
    ],
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

require([ 'handlebars', 'jquery', 'models', 'lodash', 'when',
					'text!views/destination-list.hbs',
					'text!views/tour-list.hbs',
					'text!views/tour-details.hbs'
], function (Handlebars, $, models, _, when,
						 destination_list_t, tour_list_t, tour_details_t) {
    "use strict";

		var destinations = new models.Destinations();

    function get_destinations() {
        var p = when.defer();
		    destinations.fetch({
            success: function () { p.resolve(); },
            error: function () { p.reject(); }
		    });
        return p.promise;
    }


		Handlebars.registerHelper('list', function(items, options) {
				var out = "<ul>";
				for(var i=0, l=items.length; i<l; i++) {
						_.extend(items[i], {num: i + 1});
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

    get_destinations().then(function () {
        var destinations_list_json = destinations.map(function (d) {
            return d.make_list_json(); });
		    compiled_template = Handlebars.compile(destination_list_t);
		    rendered_template = compiled_template({
				    destinations: destinations_list_json
		    });
        $('#destination-list').html(rendered_template);
    });

		compiled_template = Handlebars.compile(tour_list_t);
		rendered_template = compiled_template({
				tours: [{id: 0, name: "都江堰"}]
		});
    $('#tour-list').html(rendered_template);

		compiled_template = Handlebars.compile(tour_details_t);
		rendered_template = compiled_template({
				name: "都江堰",
				days: [ {description: "see the river"},
								{description: "see the mountain"}],
				hometown: "成都",
				introduction: "hey there."
		});
    $('#tour-detail').html(rendered_template);


});
