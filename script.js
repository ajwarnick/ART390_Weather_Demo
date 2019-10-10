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
    // fetch(toFetch)
    // .then(function(response) {
    //     return response.json();
    // })
    // .then(function(myJson) {
    //     console.log(myJson);
    // });
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
    name: 'Francesco',
    title: 'Front-end Developer'
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
