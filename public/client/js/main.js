require.config({
    baseUrl: '',
    paths: {
        'handlebars': 'bower_components/handlebars/handlebars',
        'jquery': 'bower_components/jquery/dist/jquery.min',
        'underscore': 'bower_components/lodash/dist/lodash.underscore',
        'backbone': 'bower_components/backbone/backbone',
        'lodash': 'bower_components/lodash/dist/lodash.min',
        'when': 'bower_components/when',
        'domReady': 'bower_components/requirejs-domready/domReady',
        'text': 'vendor/text',

        'models': 'js/models',
        'handlebar-helpers': 'js/handlebar-helpers'
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
          'handlebar-helpers',
          'text!views/destination-list.hbs',
          'text!views/tour-list.hbs',
          'text!views/tour-details.hbs',
          'domReady!'
], function (Handlebars, $, models, _, when,
             handlebar_helpers,
             destination_list_t, tour_list_t, tour_details_t) {
    "use strict";

    var destinations = new models.Destinations();
    var tours = new models.Tours();

    function get_destinations() {
        var p = when.defer();
        destinations.fetch({
            success: function () { p.resolve(); },
            error: function () { p.reject(); }
        });
        return p.promise;
    }

    function get_tours() {
        var p = when.defer();
        tours.add(new models.Tour());
        p.resolve();
        return p.promise;
    }


    Handlebars.registerHelper('list', handlebar_helpers.list);

    Handlebars.registerHelper('tourlist', handlebar_helpers.tourlist);

    var compiled_template;
    var rendered_template;

    function get_frontend_path() {
        var after_hash_tag = window.location.href.split('#')[1];
        var split_path, view_id;
        if (after_hash_tag === undefined || after_hash_tag == '') {
            return {
                view: 'destinations',
                id: undefined
            };
        }
        split_path = after_hash_tag.split('/');
        if (split_path[1] === undefined || split_path[1] === '') {
            view_id = undefined;
        } else {
            view_id = parseInt(split_path[1]);
        }
        return {
            view: split_path[0],
            id: view_id
        };
    }

    var frontend_path = get_frontend_path();

    var render = function () {

        if (frontend_path.view === 'destinations') {
            get_destinations().then(function () {
                var destinations_list_json = destinations.map(function (d) {
                    return d.make_list_json(); });
                compiled_template = Handlebars.compile(destination_list_t);
                rendered_template = compiled_template({
                    destinations: destinations_list_json
                });
                $('#destination-list').html(rendered_template);
                return;
            }).then(function () {
                $('#tour-list').html("");
                $('#tour-detail').html("");
            });
        } else {
            get_tours().then(function () {
                var tours_list_json = tours.map(function (tour) {
                    return tour.make_list_json(); });
                compiled_template = Handlebars.compile(tour_list_t);
                rendered_template = compiled_template({
                    tours: tours_list_json
                });
                $('#tour-list').html(rendered_template);
                return;
            }).then(function () {
                var tour_detail_json = tours.models[0].make_detail_json();
                compiled_template = Handlebars.compile(tour_details_t);
                rendered_template = compiled_template(tour_detail_json);
                $('#tour-detail').html(rendered_template);
                return;
            }).then(function () {
                $('#destination-list').html("");
            });
        }
    }

    render();

    window.setInterval(function () {
        var new_frontend_path = get_frontend_path();
        if (frontend_path !== new_frontend_path) {
            frontend_path = new_frontend_path;
            render();
        }
    }, 100); // apparently used by Google
// http://stackoverflow.com/questions/2161906/handle-url-anchor-change-event-in-js

});
