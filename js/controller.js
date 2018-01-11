'use strict';
const $ = require('jquery');
const model = require("./model");
const view = require("./view");
const dataComp = require("./dataManipulation");

const setDefaultTime = () => {
    let currentTime = new Date(Date.now()),
    currentHours = currentTime.getHours(),
    currentMinutes = currentTime.getMinutes();
    currentMinutes = currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes;

    $("#time-selector").val(`${currentHours}:${currentMinutes}`);
};

const getHours = () => {
  let time = new Date(Date.now());
  time = time.getHours();
  return time;
};


const activateListeners = function() {
    $("#search-field").keypress(function (e) {
        if (e.which == 13) {
            model.getAttractions()
            .then((attractions) => {
                let selectAttractions = model.findAttractions(attractions, $(this).val());
                view.highlightArea(selectAttractions);
            });
        }
    });

    $("#time-selector").on("change", function(){
        let hour = $(this).val().match(/^\d\d/);

        model.getAttractions()
        .then(data => {
            console.log(data);
            data = model.filterForHappeningNow(data, hour);
            view.printAttractions(data);
        })
        .catch(err => console.log(err));
    });

    $("#sidebar").on("click", ".attraction-link", function(){
        model.getAttraction({id: $(this).attr("attraction_id")}).then(data => {
            view.printAttractionDetails(data, $(this));
        });
    });
    $("#gridWrap").on("click", ".parkArea", function(){
        let areaId = +$(this).attr("area_id");
        model.getAttractions().then(attractions => {
            let filteredAttractions = attractions.filter(attraction => attraction.area_id === areaId);
            view.printAttractions(filteredAttractions);
        });
    });
};

module.exports.loadPage = function()  {
    view.printFooterDate();
    model.getAttractions()
    .then((data) => {
      dataComp.groupAttractionsByArea(data);

      let currentHour = getHours();


      if(currentHour > 9 || currentHour < 22) {
          let attractions = model.filterForHappeningNow(data, currentHour);
          model.getAttractionTypes()
          .then(types => {
              attractions = model.includeAttractionTypes(attractions, types);
              view.printAttractions(attractions);
          })
          .catch(err => console.log(err));
      }
    });

    activateListeners();
    model.getAreas().then((data) => view.colorGrid(data));
    setDefaultTime();

};
