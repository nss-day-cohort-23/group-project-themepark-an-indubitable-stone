'use strict';
const $ = require('jquery');

const fbURL = "https://an-indubitable-stone.firebaseio.com";

function getTime() {
  let time = new Date(Date.now());
  time = time.getHours();
  return time;
}

function getAttractionsHappeningNow(data, hour) {
  const regexHour = new RegExp(`${hour}`);
  let happeningNow = [];

  data.forEach(attraction => {
    if (!attraction.times) {
      happeningNow.push(attraction);
    } else if (attraction.times) {
      let attractionArr = attraction.times.filter(time => {
      });
      if (attractionArr.length > 0) happeningNow.unshift(attraction);
    }
  });

  return happeningNow;
}

module.exports.getParkInfo = function() {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `${fbURL}/park-info.json`
    })
    .done(data => resolve(data))
    .fail(err => reject(err));
  });
};

module.exports.getAreas = function() {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `${fbURL}/areas.json`
    })
    .done(data => resolve(data))
    .fail(err => reject(err));
  });
};

module.exports.getAttractions = function(id) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `${fbURL}/attractions.json`
    })
    .done(data => {
      resolve(data);
    })
    .fail(err => reject(err));
  });
};

module.exports.getAttraction = function(attraction) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `${fbURL}/attractions/${attraction.id}.json`
    })
    .done(data => resolve(data))
    .fail(err => reject(err));
  });
};

function getAttractionTypes() {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `${fbURL}/attraction_types.json`
    })
    .done(data => resolve(data))
    .fail(err => reject(err));
  });
}
