// Entry point for the notebook bundle containing custom model definitions.
//
// Setup notebook base URL
//
// Some static assets may be required by the custom widget javascript. The base
// url for the notebook is not known at build time and is therefore computed
// dynamically.
__webpack_public_path__ = document.querySelector('body').getAttribute('data-base-url') + 'nbextensions/yt_widgets/';

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
module.exports = {}

var loadedModules = [
	require('./yt_widgets.js')
];

for (var i in loadedModules) {
    if (loadedModules.hasOwnProperty(i)) {
        var loadedModule = loadedModules[i];
        for (var target_name in loadedModule) {
            if (loadedModule.hasOwnProperty(target_name)) {
                module.exports[target_name] = loadedModule[target_name];
            }
        }
    }
}

module.exports['version'] = require('../package.json').version;
