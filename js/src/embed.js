// Entry point for the unpkg bundle containing custom model definitions.
//
// It differs from the notebook bundle in that it does not need to define a
// dynamic baseURL for the static assets and may load some css that would
// already be loaded by the notebook otherwise.

// Load css
require('leaflet/leaflet.css');
require('leaflet-fullscreen/dist/leaflet.fullscreen.css');
require('leaflet-draw/dist/leaflet.draw.css');
// Forcibly load the marker icon images to be in the bundle.
require('leaflet/images/marker-shadow.png');
require('leaflet/images/marker-icon.png');
require('leaflet/images/marker-icon-2x.png');
require('leaflet-fullscreen/dist/fullscreen.png');
require('leaflet-fullscreen/dist/fullscreen@2x.png');

// Export widget models and views, and the npm package version number.
module.exports = require('./yt_widgets.js');
module.exports['version'] = require('../package.json').version;
