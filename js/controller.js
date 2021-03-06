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
    currentHours = currentHours < 10 ? `0${currentHours}` : currentHours;

    $("#time-selector").val(`${currentHours}:${currentMinutes}`);
};

const getHours = () => {
  let time = new Date(Date.now());
  time = time.getHours();
  return time;
};


const activateListeners = function() {
    $("#search-field").keypress(function (e) {
        let searchTerm = $(this).val().toLowerCase();
        if (e.which == 13 && searchTerm.trim() !== "") {
            Promise.all([model.getAttractions(), model.getAttractionTypes()])
            .then(values => {
                let attractions = values[0],
                types = values[1],
                attractionsWithTypes = model.includeDataOption(attractions, types),
                filteredAttractions, selectedAttractionIds;

                if ($("#search-field").attr("placeholder") === "Search") {
                    selectedAttractionIds = model.findAttractions(attractions, searchTerm);
                    filteredAttractions = attractionsWithTypes.filter(attraction =>
                        attraction.name.toLowerCase().indexOf(searchTerm) !== -1
                    );
                } else {
                    selectedAttractionIds = model.findAttractionsByType(attractions, searchTerm);
                    filteredAttractions = attractionsWithTypes.filter(attraction =>
                        attraction.typeName.toLowerCase().indexOf(searchTerm) !== -1
                    );
                }
                view.highlightArea(selectedAttractionIds);
                view.printAttractions(filteredAttractions, true);
                $(this).val('');
            })
            .catch(err => console.log(err));
        }
    });

    $("#time-selector").on("change", function(){
        let hour = $(this).val().match(/^\d+/)[0];

        if(hour >= 9 && hour < 22) {
            model.getAttractions()
            .then(data => {

                data = model.filterForHappeningNow(data, hour);
                model.getAreas()
                .then(areas => {

                    data = model.includeDataOption(data, areas);
                    view.printAttractions(data);
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        } else {
            view.printAttractions();
        }
    });

    $("#sidebar").on("click", ".attraction-link", function(){
        model.getAttraction({id: $(this).attr("attraction_id")})
        .then(data => {
            view.printAttractionDetails(data, $(this));
            view.removePin();
            view.markAttractionOnMap($(this).attr("attraction_id"));
        })
        .catch(error => console.log(error));
    });

    $("#gridWrap").on("click", ".parkArea", function(){
        let areaId = +$(this).attr("area_id");
        model.getAttractions().then(attractions => {
            model.getAttractionTypes()
            .then(types => {
                let attractionsWithTypes = model.includeDataOption(attractions, types),
                filteredAttractions = attractionsWithTypes.filter(attraction => attraction.area_id === areaId);
                view.printAttractions(filteredAttractions);
            })
            .catch(error => console.log(error));
        });
    });

    $("#attractionTypeSearch").click(function() {
        let $target = $("#search-field");
        if($target.attr("placeholder") === "Search") {
            $target.attr("placeholder", "Search attraction type");
        } else {
            $target.attr("placeholder", "Search");
        }
        $target.val('');
    });
};




module.exports.loadPage = function()  {
    view.printFooterDate();
    model.getAttractions()
    .then((data) => {
      let park = dataComp.groupAttractionsByArea(data);
      model.getAreas()
      .then((areas) => view.gridLayout(areas, park));

      let currentHour = getHours();

      if(currentHour >= 9 && currentHour < 22) {
          let attractions = model.filterForHappeningNow(data, currentHour);
          model.getAttractionTypes()
          .then(types => {
              attractions = model.includeDataOption(attractions, types);
              view.printAttractions(attractions);
          })
          .catch(err => console.log(err));
      }
    });

    activateListeners();
    setDefaultTime();

};
