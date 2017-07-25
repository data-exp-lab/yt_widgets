var widgets = require('jupyter-js-widgets');
var _ = require('underscore');


// Custom Model. Custom widgets models must at least provide default values
// for model attributes, including `_model_name`, `_view_name`, `_model_module`
// and `_view_module` when different from the base class.
//
// When serialiazing entire widget state for embedding, only values different from the
// defaults will be specified.
var InteractiveRenderModel = widgets.DOMWidgetModel.extend({
    defaults: _.extend(_.result(this, 'widgets.DOMWidgetModel.prototype.defaults'), {
        _model_name : 'InteractiveRenderModel',
        _view_name : 'InteractiveRenderView',
        _model_module : 'yt-widgets',
        _view_module : 'yt-widgets',
        _model_module_version : '0.1.0',
        _view_module_version : '0.1.0'
    })
});

var util = yt.util;            // Not sure what these are called in YT
var action = yt.action;        // Not sure what these are called in YT


var seq = 1;
// Custom View. Renders the widget model.
var InteractiveRenderView = widgets.DOMWidgetView.extend({
    render: function() {
        this.url = this.model.get('url');
        this.el.id = `InteractiveRender-${seq++}`;
        this.req = {
            plotId    : this.el.id,
        };
        this.model.on('change:zoom', this.update_zoom, this);
        this.model.on('change:x_pan change:y_pan', this.update_pan, this);
        this.redraw = this.redraw.bind(this);
        this.update_zoom = this.update_zoom.bind(this);
        this.zoom_changed = this.zoom_changed.bind(this);
        this.update_pan = this.update_pan.bind(this);
        this.pan_changed = this.pan_changed.bind(this);
        setTimeout(this.redraw, 0);
    },

    redraw: function() {
        if (this.hasOwnProperty("url") && (this.url.length === 0)) {
            yt.InteractiveRender(this.el.id, this.req);
        }
        else {
            console.log('using url ' + this.url);
            firefly.InteractiveRender(this.el.id, {url: this.url, plotId: this.el.id});
        }
    }

    update_zoom: function() {
        console.log('updating zoom to ' + this.model.get('zoom'));
        yt.zoom(this.model.get('zoom'));
    },

    zoom_changed: function(action,state) {        //callback for a zoom change
        if (action.payload.plotId === this.req.plotId) {
            var plot= yt.InteractiveRender();  // get the plot
            console.log('I got a replot, zoom factor= ' + plot.zoomFactor);
            zoom_factor = Math.round(parseFloat(plot.zoomFactor)*100)/100
            var original_zoom = Math.round(this.model.get('zoom')*100)/100;
            console.log('model zoom = ' + original_zoom);
            if (zoom_factor != original_zoom){
                console.log('updating model zoom to ' + zoom_factor);
                this.model.set('zoom', zoom_factor);
                this.touch();
            }
        }
     },

});

// BOILERPLATE:
module.exports = {
    ImageModel : InteractiveRenderModel,
    ImageView : InteractiveRenderView
};
