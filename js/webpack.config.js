var version = require('./package.json').version;

// Custom webpack loaders are generally the same for all webpack bundles, hence
// stored in a separate local variable.

var leaflet_marker_selector = /leaflet\/images\/marker-.*\.png/;
var leaflet_layer_icon = /leaflet\/images\/layers.*\.png/;
var fullscreen_icon = /leaflet-fullscreen\/dist\/fullscreen.*\.png/;
var path = require('path');

var loaders = [
    { test: /\.json$/, loader: 'json-loader' },
    { test: /\.css$/, loader: 'style-loader!css-loader' },
    { test: leaflet_marker_selector, loader: 'file?name=[name].[ext]' },
    { test: leaflet_layer_icon, loader: 'file?name=[name].[ext]' },
    { test: fullscreen_icon, loader: 'file?name=[name].[ext]' },
    { test: /\.(jpg|png|gif|svg)$/, loader: 'file', exclude: [leaflet_marker_selector,fullscreen_icon]}
];


module.exports = [
    {// Notebook extension
     //
     // This bundle only contains the part of the JavaScript that is run on
     // load of the notebook. This section generally only performs
     // some configuration for requirejs, and provides the legacy
     // "load_ipython_extension" function which is required for any notebook
     // extension.
     //
        entry: './src/extension.js',
        output: {
            filename: 'extension.js',
            path: '../yt_widgets/static',
            libraryTarget: 'amd'
        }
    },
    {// Bundle for the notebook containing the custom widget views and models
     //
     // This bundle contains the implementation for the custom widget views and
     // custom widget.
     // It must be an amd module
     //
        entry: './src/index.js',
        output: {
            filename: 'index.js',
            path: '../yt_widgets/static',
            libraryTarget: 'amd'
        },
        devtool: 'source-map',
        module: {
            loaders: loaders
        },
        resolve:{
            root: [
                path.resolve("./node_modules"),
                path.resolve("./src")
            ]
        },
        externals: ['@jupyter-widgets/base']
    },
    {// Embeddable yt_widgets bundle
     //
     // This bundle is generally almost identical to the notebook bundle
     // containing the custom widget views and models.
     //
     // The only difference is in the configuration of the webpack public path
     // for the static assets.
     //
     // It will be automatically distributed by unpkg to work with the static
     // widget embedder.
     //
     // The target bundle is always `dist/index.js`, which is the path required
     // by the custom widget embedder.
     //
        entry: './src/embed.js',
        output: {
            filename: 'index.js',
            path: './dist/',
            libraryTarget: 'amd',
            publicPath: 'https://unpkg.com/yt_widgets@' + version + '/dist/'
        },
        devtool: 'source-map',
        module: {
            loaders: loaders
        },
        resolve:{
            root: [
                path.resolve("./node_modules"),
                path.resolve("./src")
            ]
        },
        externals: ['jupyter-js-widgets']
    }
];
