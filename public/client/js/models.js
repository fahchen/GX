define([
    'backbone', 'lodash'
], function (Backbone, _) {
    "use strict";

    var api_root = "/"

    var Destination = Backbone.Model.extend({
        urlRoot: api_root + 'destination',

        constructor: function () { // (attrs, options)
            Backbone.Model.apply(this, arguments);
        },

        validate: function (attrs) {
        },

        make_list_json: function () {
            var self = this;
            return {
                id: self.id,
                name: self.get('name')
            };
        }
    });

    var Destinations =  Backbone.Collection.extend({
        model: Destination,
        url: api_root + 'destinations'
    });

    var Tour = Backbone.Model.extend({
        urlRoot: api_root + 'tour',

        constructor: function () { // (attrs, options)
            Backbone.Model.apply(this, arguments);
        },

        make_list_json: function () {
            debugger;
            return {
                id: 0,
                name: "都江堰",
                price: "$200",
                img_url: 'img/dujiangyan.jpg'
            };
        },

        make_detail_json: function () {
            return {
                name: "都江堰",
                days: [ {description: "see the river"},
                        {description: "see the mountain"}],
                hometown: "成都",
                introduction: "hey there.",
                img_url_guide: 'img/kool-aid-man.jpg',
                img_url_destination: 'img/dujiangyan.jpg'
            };
        }
    });

    var Tours =  Backbone.Collection.extend({
        model: Tour,
        url: api_root + 'tours'
    });


    return {
        Destination: Destination,
        Destinations: Destinations,
        Tour: Tour,
        Tours: Tours
    };

});
