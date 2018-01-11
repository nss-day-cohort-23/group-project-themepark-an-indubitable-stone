'use strict';
const $ = require('jquery');
const model = require("./model");
const view = require("./view");
const dataComp = require("./dataManipulation");

module.exports.loadPage = function()  {
    view.printFooterDate();
    model.getAttractions()
    .then((data) => {
        view.printAttractions(data);
    });
    module.exports.activateListeners();
    model.getAreas().then((data) => view.colorGrid(data));
};

module.exports.activateListeners = function() {
    $("#search-field").keypress(function (e) {
        if (e.which == 13) {
            model.getAttractions($(this).val())
            .then((attractions) => {
                view.highlightArea(attractions);
                dataComp.groupAttractionsByArea(attractions);
            });
        }
    });
    $("#time-selector").on("change", function(){
        console.log($(this).val());
    });
};

