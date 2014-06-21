define([
    'backbone', 'lodash'
], function (Backbone, _) {
    "use strict";

		var Destination = Backbone.Model.extend({
        urlRoot: '',

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
        url: ''
		});

		var Tour = Backbone.Model.extend({
        urlRoot: '',

        constructor: function () { // (attrs, options)
            Backbone.Model.apply(this, arguments);
        }
		});

		var Tours =  Backbone.Collection.extend({
				model: Tour,
        url: ''
		});


		return {
				Destination: Destination,
				Destinations: Destinations,
				Tour: Tour,
				Tours: Tours
		};

});