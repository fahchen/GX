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
          'text!views/tour-details.hbs',
          'domReady!'
], function (Handlebars, $, models, _, when,
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

    var register_nav_callbacks = function () {

        // $('.navigation').click(function () {
        //    console.log("registered navigation click callbacks");
        //    render();
        // });

    }

    function get_frontend_path() {
        return window.location.href.split('#')[1];
    }

    var frontend_path = get_frontend_path();

    var render = function () {

        if (frontend_path === undefined || frontend_path == '') {

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
                register_nav_callbacks();
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
                register_nav_callbacks();
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
