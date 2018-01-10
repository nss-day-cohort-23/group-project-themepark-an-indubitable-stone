'use strict';
const $ = require('jquery');
const model = require("./model");
const view = require("./view");

module.exports.loadPage = function()  {
    view.printFooterDate();
    model.getAttractions()
    .then((data) => {
        view.printAttractions(data);
    });
    module.exports.activateListeners();
    
};

module.exports.activateListeners = function() {
    $("#search-field").keypress(function (e) {
        if (e.which == 13) {
          // execute function on enter press
        }
    });
    $("#time-selector").on("change", function(){
        console.log($(this).val());
    });
};

