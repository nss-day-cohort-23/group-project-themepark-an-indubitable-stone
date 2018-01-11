'use strict';
const $ = require('jquery');
const detail = require("../templates/detail.hbs");
const sidebar = require("../templates/sidebar.hbs");

module.exports.printAttractions = function(data) {
    let attr = {};
    attr = {object: data};
    $("#sidebar").append(sidebar(attr));
    console.log('data', attr);
    
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


module.exports.colorGrid = function(areas) {
    areas.forEach( i => {
        $(`div#park${i.id}`).css("background-color", `#${i.colorTheme}`);
    });
};