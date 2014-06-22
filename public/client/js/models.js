define([
    'backbone', 'lodash'
], function (Backbone, _) {
    "use strict";

    var api_root = "/"

    var Destination = Backbone.Model.extend({
        urlRoot: api_root + 'destination',

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

        make_list_json: function () {
            return {
                id: this.id,
                name: this.get('name'),
                price: "$" + this.get('price'),
                img_url: this.get('image_url'),
            };
        },

        make_detail_json: function () {
            return {
                name: this.get('name'),
                days: _.map(this.get('days'), function(day) {
                    return {description: day.description};
                }),
                hometown: this.get('guide').hometown,
                introduction: this.get('guide').introduction,
                img_url_guide: this.get('guide').image_url,
                img_url_destination: this.get('image_url')
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
