'use strict';
import $ from 'jquery'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
window.jQuery = $;
window.$ = $;
var L = require("leaflet")
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();

import marker from 'leaflet/dist/images/marker-icon.png';
import marker2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: marker2x,
    iconUrl: marker,
    shadowUrl: markerShadow
});

var map = L.map('map').setView([51.505, -0.09], 13);
L.Icon.Default.imagePath = 'styles/';
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();
