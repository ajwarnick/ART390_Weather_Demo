'use strict';
import { keys } from "./keys.js";
//import { moon } from "./moon.js";

let nws; 
let hourly;

let zip = "";
const zip_input = document.getElementById('zip');
zip_input.addEventListener('input', zipTest);

// let lat = 40.75;
// let lon = -73.92;
let gridX;
let gridY;

if (getParameterByName('zip')) {
    zip = getParameterByName('zip');
}

function zipTest(e) {
    // log.textContent = e.target.value;
    let log = document.getElementById('zip_display');

    var test_zip = e.target.value.replace(/\D/g, '');
    var regex = /(^\d{5}$)|(^\d{5}-\d{4}$)/g;
    var found = test_zip.match(regex);

    if (found) {
        zip_input.blur();
        if (found[0] !== zip) {
            zip = found[0];
            log.textContent = zip;
            getWeather(keys.api_key, zip);
        }

    }
}

function getWeather(k, z) {
    let toFetch = "https://api.openweathermap.org/data/2.5/weather?zip=" + z + ",us&appid=" + k;
    console.log(toFetch);
    // fetch(toFetch)
    // .then(function(response) {
    //     return response.json();
    // })
    // .then(function(myJson) {
    //     console.log(myJson);
    // });
}

function getUVIndex(k,lat, lon){
    // http://api.openweathermap.org/data/2.5/uvi?appid="+k+"&lat="+lat+"&lon="+lon
    let toFetch = "https://api.openweathermap.org/data/2.5/weather?zip=" + z + ",us&appid=" + k;
    console.log(toFetch);

    // fetch(toFetch)
    // .then(function(response) {
    //     return response.json();
    // })
    // .then(function(myJson) {
    //     console.log(myJson);
    // });
}

function getHourlyForcast( lat, lon ){
    let toFetch = "https://api.weather.gov/points/" + lat + "," + lon;
    fetch(toFetch)
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        nws = myJson;
        gridX = nws.properties.gridX;
        gridY = nws.properties.gridY;

        // get hourly
    }).then(function(){
        let gridFetch = "https://api.weather.gov/gridpoints/TOP/"+gridX+","+gridY+"/forecast/hourly"
        fetch(gridFetch).then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            hourly = myJson.properties.periods;
        })
    });
}

getHourlyForcast( 40.75, -73.92);

/* HELPER FUNCTIONS */

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}