"use strict";
const $ = require("jquery");


const setFooterDate = () => {
    let todaysDate = new Date(Date.now()),
    day = todaysDate.getDay(),
    month = todaysDate.getMonth(),
    year = todaysDate.getFullYear();

    let monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

    $("#footer-date").text(`${day} ${monthNames[month+1]} ${year} `);
};


setFooterDate();