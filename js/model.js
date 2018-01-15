'use strict';
const $ = require('jquery');

const fbURL = "https://an-indubitable-stone.firebaseio.com";

module.exports.filterForHappeningNow = (data, hour) => {
  const regexHour = new RegExp(`${hour}`);
  let happeningNow = [];

  data.forEach(attraction => {
    if (!attraction.times) {
      happeningNow.push(attraction);
    } else if (attraction.times) {
      let attractionArr = attraction.times.filter(time => {
        let amOrPm = time.match(/\w\w$/)[0];
        let timeToCheck = +time.match(/\d+(?=:)/);

        if(amOrPm === "PM" && timeToCheck !== 12){
          timeToCheck += 12;
        } else if(timeToCheck === 12){
          timeToCheck = 0;
        }

        return regexHour.test(timeToCheck);
      });
      if (attractionArr.length > 0) happeningNow.unshift(attraction);
    }
  });

  return happeningNow;
};

module.exports.includeDataOption = (attractions, arr) => {
    let optionName = arr[0].hasOwnProperty("colorTheme") ? "area" : "type";
    let newAttractionProp = `${optionName}Name`;
    attractions = attractions.map(attraction => {
        attraction[newAttractionProp] = arr.find(
            opt => attraction[`${optionName}_id`] === opt.id);
        attraction[newAttractionProp] = attraction[newAttractionProp].name;
        return attraction;
    });
    return attractions;
};

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

module.exports.getAttractionTypes = function() {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `${fbURL}/attraction_types.json`
    })
    .done(data => resolve(data))
    .fail(err => reject(err));
  });
};

module.exports.getAttractions = function() {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `${fbURL}/attractions.json`
    })
    .done(data => resolve(data))
    .fail(err => reject(err));
  });
};

module.exports.getAttraction = function(attraction) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `${fbURL}/attractions/${attraction.id-1}.json`
    })
    .done(data => resolve(data))
    .fail(err => reject(err));
  });
};

module.exports.findAttractions = (attractions, search) => {
    let selectedAtrractions = [];
    let regexSearch = new RegExp(`${search}`, 'gi');
    attractions.forEach(att => {
        if (regexSearch.test(att.name)) {
        selectedAtrractions.push(att.area_id);
        }
    });
  return selectedAtrractions;
};

module.exports.findAttractionsByType = (attractions, search) => {
    let selectedAtrractions = [];
    let regexSearch = new RegExp(`${search}`, 'gi');
    attractions.forEach(att => {
        if (regexSearch.test(att.typeName)) {
            selectedAtrractions.push(att.area_id);
        }
    });
    return selectedAtrractions;
};
