'use strict';
import { keys } from "./keys.js";


/* ZIP CODE FUNCTIONS */
let zip = "";
const zip_input = document.getElementById('zip');
zip_input.addEventListener('input', zipTest);

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



/* WEATHER RETRIEVAL AND PARSING FUNCTIONS */

function getWeather(k, z) {
    let toFetch = "https://api.openweathermap.org/data/2.5/weather?zip=" + z + ",us&appid=" + k;
    console.log(toFetch);
    fetch(toFetch)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            console.log(myJson);
            //mapResultsToState(myJson);
        });
}


function mapResultsToState(j) {
    // state["now_description_main"] = j.weather.main;
    // state["now_description_long"] = j.weather.description;
    // state["now_description_icon"] = j.weather.icon;

    // state["now_temp_current"] = kelvinToFahrenheit(j.main.temp);
    // state["now_temp_high"] = kelvinToFahrenheit(j.main.temp_max);
    // state["now_temp_low"] = kelvinToFahrenheit(j.main.temp_min);

    // state["now_wind_speed"] = j.wind.speed;
    // state["now_wind_degree"] = j.wind.deg;
    // state["now_cloud_cover"] = j.clouds.all;
}


/* TWO WAY DATA BINDING FUNCTIONS */

const createState = (state) => {
    return new Proxy(state, {
        set(target, property, value) {
            target[property] = value;
            render();
            return true;
        }
    });
};


const state = createState({
    now_description_main: "1",
    now_description_long: "1",
    now_description_icon: "1",

    now_temp_current: "1",
    now_temp_high: "1",
    now_temp_low: "1",

    now_wind_speed: "1",
    now_wind_degree: "1",
    now_cloud_cover: "1",
    /*
    now_rain: "",
    now_snow: "",

    sunrise: "",
    sunset: "",

    day_1_description_main: "",
    day_1_description_long: "",
    day_1_description_icon: "",

    day_1_temp_current: "",
    day_1_temp_high: "",
    day_1_temp_low: "",

    day_1_wind_speed: "",
    day_1_wind_degree: "",
    day_1_cloud_cover: "",

    day_2_description_main: "",
    day_2_description_long: "",
    day_2_description_icon: "",

    day_2_temp_current: "",
    day_2_temp_high: "",
    day_2_temp_low: "",

    day_2_wind_speed: "",
    day_2_wind_degree: "",
    day_2_cloud_cover: "",

    day_3_description_main: "",
    day_3_description_long: "",
    day_3_description_icon: "",

    day_3_temp_current: "",
    day_3_temp_high: "",
    day_3_temp_low: "",

    day_3_wind_speed: "",
    day_3_wind_degree: "",
    day_3_cloud_cover: "",

    day_4_description_main: "",
    day_4_description_long: "",
    day_4_description_icon: "",

    day_4_temp_current: "",
    day_4_temp_high: "",
    day_4_temp_low: "",

    day_4_wind_speed: "",
    day_4_wind_degree: "",
    day_4_cloud_cover: "",

    day_5_description_main: "",
    day_5_description_long: "",
    day_5_description_icon: "",

    day_5_temp_current: "",
    day_5_temp_high: "",
    day_5_temp_low: "",

    day_5_wind_speed: "",
    day_5_wind_degree: "",
    day_5_cloud_cover: "",
    */
});


const listeners = document.querySelectorAll('[data-model]');

listeners.forEach((listener) => {
    const name = listener.dataset.model;
    listener.addEventListener('keyup', (event) => {
        state[name] = listener.value;
    });
});


const render = () => {
    const bindings = Array.from(document.querySelectorAll('[data-binding]')).map(
        e => e.dataset.binding
    );
    bindings.forEach((binding) => {
        document.querySelector(`[data-binding='${binding}']`).innerHTML = state[binding];
        document.querySelector(`[data-model='${binding}']`).value = state[binding];
    });
};

render();

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

function kelvinToFahrenheit(tempK) {
    // Convert from Kelvin to Fahrenheit
    //T(°F) = T(K) × 9/5 - 459.67
    let tempF = parseInt((tempK * 1.8) - 459.67, 10);
    return tempF;
}
