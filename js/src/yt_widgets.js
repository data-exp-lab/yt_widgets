var widgets = require('jupyter-js-widgets');
var _ = require('underscore');


// Custom Model. Custom widgets models must at least provide default values
// for model attributes, including `_model_name`, `_view_name`, `_model_module`
// and `_view_module` when different from the base class.
//
// When serialiazing entire widget state for embedding, only values different from the
// defaults will be specified.
var ImageModel = widgets.DOMWidgetModel.extend({
    defaults: _.extend(_.result(this, 'widgets.DOMWidgetModel.prototype.defaults'), {
        _model_name : 'InteractiveRender',
        _view_name : 'InteractiveRender',
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
var ImageView = widgets.DOMWidgetView.extend({
    render: function() {
        this.url = this.model.get('url');
        this.el.id = `InteractiveRender-${seq++}`;
/*        this.req = {
            plotId    : this.el.id,
            Type      : 'SERVICE',
            Service   : 'TWOMASS',
            Title     : '2mass from service',
            GridOn     : true,
            SurveyKey  : 'k',
            WorldPt    : '10.68479;41.26906;EQ_J2000',
            SizeInDeg  : '.12',
            AllowImageSelection : true
        };*/
        this.model.on('change:GridOn change:SurveyKey change:FilePath', this.redraw, this);
        this.model.on('change:colorbar', this.update_color, this);
        this.model.on('change:zoom', this.update_zoom, this);
        this.model.on('change:x_pan change:y_pan', this.update_pan, this);
        this.redraw = this.redraw.bind(this);
        this.update_color = this.update_color.bind(this);
        this.color_changed = this.color_changed.bind(this);
        this.colorListner = util.addActionListener(action.type.COLOR_CHANGE, this.color_changed);
        this.update_zoom = this.update_zoom.bind(this);
        this.zoom_changed = this.zoom_changed.bind(this);
        this.zoomListner = util.addActionListener(action.type.ZOOM_IMAGE, this.zoom_changed);
        this.update_pan = this.update_pan.bind(this);
        this.pan_changed = this.pan_changed.bind(this);
        this.stopPickListner = util.addActionListener(action.type.SELECT_POINT, this.pan_changed);
        //this.panListner = util.addActionListener(action.type.PROCESS_SCROLL, this.pan_changed);
        setTimeout(this.redraw, 0);
    },

// BOILERPLATE:
module.exports = {
    ImageModel : ImageModel,
    ImageView : ImageView
};
