define([
    'lodash'
], function (_) {
    "use strict";

    function h_list(items, options) {
        var out = "<ul>";
        for(var i=0, l=items.length; i<l; i++) {
            _.extend(items[i], {num: i + 1});
            out = out + "<li>" + options.fn(items[i]) + "</li>";
        }
        return out + "</ul>";
    }

    function h_tourlist(items, options) {
        var out = "";
        for(var i=0, l=items.length; i<l; i++) {
            out = [out,
                   '<div class="tour-list-item">',
                   options.fn(items[i]),
                   '</div>'].join('');
        }
        return out;
    }

    return {
        list: h_list,
        tourlist: h_tourlist
    };
});