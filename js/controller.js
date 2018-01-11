'use strict';
const $ = require('jquery');
const model = require("./model");
const view = require("./view");
const dataComp = require("./dataManipulation");

const setDefaultTime = () => {
    let currentTime = new Date(Date.now()),
    currentHours = currentTime.getHours(),
    currentMinutes = currentTime.getMinutes();

    $("#time-selector").val(`${currentHours}:${currentMinutes}`);
};

const getTime = () => {
  let time = new Date(Date.now());
  time = time.getHours();
  return time;
};

module.exports.loadPage = function()  {
    view.printFooterDate();
    model.getAttractions()
    .then((data) => {
        view.printAttractions(data);
    });
    module.exports.activateListeners();
    model.getAreas().then((data) => view.colorGrid(data));
    setDefaultTime();
  
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

    $("#sidebar").on("click", ".attraction-link", function(){
        model.getAttraction({id: $(this).attr("attraction_id")}).then(data => {
            view.printAttractionDetails(data, $(this));
        });
    });

};

