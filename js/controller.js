'use strict';
const $ = require('jquery');
const model = require("./model");
const view = require("./view");

module.exports.loadPage = function()  {
    
};

module.exports.activateListeners = function() {
    $("#search-field").keypress(function (e) {
        if (e.which == 13) {
          // execute function on enter press
        }
    });
};
