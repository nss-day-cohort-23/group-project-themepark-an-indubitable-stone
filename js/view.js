'use strict';
const $ = require('jquery');
const detail = require("../templates/detail.hbs");
const sidebar = require("../templates/sidebar.hbs");
const attractionsGrid = require("../templates/attractionsGrid.hbs");

module.exports.printAttractions = function(data) {
    $("#sidebar").empty();
    let attr = {};
    attr = {object: data};
    $("#sidebar").append(sidebar(attr));
};

module.exports.highlightArea = function(ids) {
    let $areas = $(".parkArea");

    $areas.removeClass("highlighted");

    $areas.each(function() {
        if(ids.includes(+$(this).attr("area_id"))){
            $(this).addClass("highlighted");
        }
    });
};

const removeAttractionDetails = function() {
    $(".attractionData").remove();
};

module.exports.printAttractionDetails = function(attraction, $object) {
    if($object.has(".attractionData").length){
        removeAttractionDetails();
    } else {
        removeAttractionDetails();
        $object.append(detail(attraction));
    }
    
};

module.exports.printFooterDate = () => {
    let todaysDate = new Date(Date.now()),
    day = todaysDate.getDay(),
    month = todaysDate.getMonth(),
    year = todaysDate.getFullYear();

    let monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

    $("#footer-date").text(`${monthNames[month+1]} ${day} ${year} `);
};


module.exports.colorGrid = function(areas, park) {
    areas.forEach( i => {
        let $areaElm = $(`div#park${i.id}`),
        attractions = park[`park${i.id}`],
        columns = Math.ceil(Math.sqrt(attractions.length)),
        columnsPercent = 100 / columns + '%',
        rows, rowsPercent;

        $areaElm.css({
            "background-color": `#${i.colorTheme}`,
            "grid-template":
                `repeat(${rows}, ${rowsPercent}) / repeat(${columns}, ${columnsPercent})`
        });

    });
};
