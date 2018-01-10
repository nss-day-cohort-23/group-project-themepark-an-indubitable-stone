'use strict';
const $ = require('jquery');
const detail = require("../templates/detail.hbs");
const sidebar = require("../templates/sidebar.hbs");

module.exports.printAttractions = function(data) {
    let attractionsArray = [];
    let keys = Object.keys(data);
    keys.forEach( (key) => {
        attractionsArray.push(data[key]);
    });
    attractionsArray.forEach( attraction => {
        $("#sidebar").append(`<p><a href="">${attraction.name}</a></p>`);
    });
};

module.exports.highlightArea = function() {

};

module.exports.printAttractionDetails = function() {

};

module.exports.removeAttractionDetails = function() {

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
