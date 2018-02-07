var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');


// Custom Model. Custom widgets models must at least provide default values
// for model attributes, including `_model_name`, `_view_name`, `_model_module`
// and `_view_module` when different from the base class.
//
// When serialiazing entire widget state for embedding, only values different from the
// defaults will be specified.

var DisplayParamModel = widgets.DOMWidgetModel.extend({
    defaults: _.extend(_.result(this, 'widgets.DOMWidgetModel.prototype.defaults'), {
        _model_name : 'DisplayParamModel',
        _view_name : 'DisplayParamView',
        _model_module : 'yt_widgets',
        _view_module : 'yt_widgets',
        _model_module_version : '0.1.0',
        _view_module_version : '0.1.0'
    })
});

// Custom View. Renders the widget model.
var DisplayParamView = widgets.DOMWidgetView.extend({
  render: function() {
      this.req = {
        parameters : {}
      }
      this.parameters_changed();
      this.model.on('change:parameters', this.parameters_changed, this);
  },

  parameters_changed: function() {
      this.el.textContent = this.model.get('parameters');
  }
});

var InteractiveSliceplotModel = widgets.DOMWidgetModel.extend({
    defaults: _.extend(_.result(this, 'widgets.DOMWidgetModel.prototype.defaults'), {
      _model_name : 'InteractiveSliceplot',
      _view_name : 'InteractiveSliceplot',
      _model_module : 'yt_widgets',
      _view_module : 'yt_widgets',
      _model_module_version : '0.1.0',
      _view_module_version : '0.1.0'
    })
});

var InteractiveSliceplotView = widgets.DOMWidgetView.extend({
    render: function() {
        this.req = {
          sliceplot : yt.SlicePlot()
        }
        this.sliceplot_changed();
        this.model.on('change:sliceplot', this.sliceplot_changed, this);
    },

    sliceplot_changed: function() {
        this.el.textContent = this.model.get('sliceplot');
    }
});



//
module.exports = {
    DisplayParamModel : DisplayParamModel,
    DisplayParamView : DisplayParamView
};
