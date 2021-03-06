var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');


// Custom Model. Custom widgets models must at least provide default values
// for model attributes, including
//
//
// When serialiazing the entire widget state for embedding, only values that
// differ from the defaults will be specified.
var HelloModel = widgets.DOMWidgetModel.extend({
    defaults: _.extend(widgets.DOMWidgetModel.prototype.defaults(), {
        _model_name : 'HelloModel',
        _view_name : 'HelloView',
        _model_module : 'yt_widgets',
        _view_module : 'yt_widgets',
        _model_module_version : '0.1.0',
        _view_module_version : '0.1.0',
        value : 'Hello World'
    })
});

// Custom View. Renders the widget model.
var HelloView = widgets.DOMWidgetView.extend({
    render: function() {
        this.value_changed();
        this.model.on('change:value', this.value_changed, this);
    },

    value_changed: function() {
        this.el.textContent = this.model.get('value');
    }
});


module.exports = {
    HelloModel : HelloModel,
    HelloView : HelloView
};
