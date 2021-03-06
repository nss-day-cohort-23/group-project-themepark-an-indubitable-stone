'use strict';
const $ = require('jquery');
const Handlebars = require('hbsfy/runtime');
const detail = require("../templates/detail.hbs");
const sidebar = require("../templates/sidebar.hbs");
const attractionsGrid = require("../templates/attractionsGrid.hbs");
const areaTitle = require("../templates/areaTitle.hbs");

const removeAttractionDetails = function() {
    $(".attractionData").remove();
};

module.exports.removePin = () => {
    $(".fa-map-pin").removeClass("fa-map-pin");
};

module.exports.printAttractions = function(data, dropPin = false) {
    module.exports.removePin();
    if(dropPin === true){
        for(let i = 0;  i < data.length; i ++){
            module.exports.markAttractionOnMap(data[i].id);   
        }
    }
    $("#sidebar").parent().scrollTop(0);
    $("#sidebar").empty();
    $("#sidebar").append(sidebar({object: data}));
};

module.exports.highlightArea = function(ids) {
    module.exports.removePin();
    let $areas = $(".parkArea");
    
    $areas.removeClass("highlighted");

    $areas.each(function() {
        if(ids.includes(+$(this).attr("area_id"))){
            $(this).addClass("highlighted");
        }
    });
};

module.exports.markAttractionOnMap = (attractionId) => {
    let pin = "fa fa-map-pin";
    $(`#gridWrap #${attractionId}`).addClass(pin); 
};

module.exports.printAttractionDetails = function(attraction, $object) {
  
    let attractionData = $object.has(".attractionData").length;

    module.exports.removePin();

    removeAttractionDetails();
    if(!attractionData){
        $object.append(detail(attraction));
    }

    
};

module.exports.printFooterDate = () => {
    let todaysDate = new Date(Date.now()),
    day = todaysDate.getDate(),
    month = todaysDate.getMonth(),
    year = todaysDate.getFullYear();

    let monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

    $("#footer-date").text(`${monthNames[month]} ${day} ${year} `);
};

const stringifyPercent = (divisor) => {
    return 100 / divisor + '%';
};

module.exports.gridLayout = function(areas, park) {
    console.log(areas);
    console.log(park);
    areas.forEach( i => {
        let $areaElm = $(`div#park${i.id}`),
        attractions = park[`park${i.id}`],
        columns = Math.ceil(Math.sqrt(attractions.length)),
        columnsPercent = stringifyPercent(columns),
        rows, rowsPercent;

        // DLK -
        // This ternary operator checks to see whether creating equally sized rows
        // & columns in a CSS grid will end up with an empty row. E.g., park area
        // at grid position 8 has 20 attractions. If a 5 x 5 grid for the attractions
        // is generated then there'll be an empty row. Thus, the grid needs one
        // less row & different percentages are needed.
        //
        // tl;dr: make it look seeeeexy.
        rows = attractions.length / (columns - 1) === columns ? columns - 1 : columns;
        rowsPercent = stringifyPercent(rows);

        $areaElm.css({
            "background-color": `#${i.colorTheme}`,
            "grid-template":
            `repeat(${rows}, ${rowsPercent}) / repeat(${columns}, ${columnsPercent})`
        });
        attractions.forEach(attraction => {
            $areaElm.append(attractionsGrid(attraction));
        });
        $areaElm.append(areaTitle(i));
    });
};
