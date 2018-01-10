'use strict';
const $ = require('jquery');

const fbURL = "https://an-indubitable-stone.firebaseio.com/";

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

module.exports.getAttractions = function(obj) {
  let options = obj || {area_id: null};

  let url = `${fbURL}/attractions.json`;

  url = options.area_id ? `${url}?indexOn=${options.area_id}` : url;
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `${url}`
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
