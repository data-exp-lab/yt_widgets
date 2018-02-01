import ipywidgets as widgets
from traitlets import Unicode, Dict, validate


@widgets.register('DisplayParam')
class DisplayParam(widgets.DOMWidget):
    """
    Base class to a (Dropdown) widget. Displays the selected parameter in this.el.textContent .
    Self-updating (see yt_widget.js)
    """
    _model_name = Unicode('DisplayParamModel').tag(sync=True)
    _model_module = Unicode('yt_widgets').tag(sync=True)
    _model_module_version = Unicode('0.1.0').tag(sync=True)
    _view_name = Unicode('DisplayParamView').tag(sync=True)
    _view_module = Unicode('yt_widgets').tag(sync=True)
    _view_module_version = Unicode('0.1.0').tag(sync=True)
    parameters = Dict().tag(sync=True)

    def __init__(self, ds, **kwargs):
        """
        The link should be from the value attribute of the Dropdown widget/class (still todo)
        """
        try:
            self.parameters = ds.parameters
        except AttributeError:
            print('AttributeError, needs fixing')
            raise

    def _parameter_widgets(self, ds):

        widgets.Dropdown(options = ds.parameters)

@widgets.register('InteractiveSliceplot')
class InteractiveSliceplot(widgets.DOMWidget):
    """
    This is a class this will call a sliceplot and link it to some widget features
    """
    _model_name = Unicode('InteractiveSliceplotModel').tag(sync=True)
    _model_module = Unicode('yt_widgets').tag(sync=True)
    _model_module_version = Unicode('0.1.0').tag(sync=True)
    _view_name = Unicode('InteractiveSliceplotView').tag(sync=True)
    _view_module = Unicode('yt_widgets').tag(sync=True)
    _view_module_version = Unicode('0.1.0').tag(sync=True)
    parameters = Dict().tag(sync=True)

    def __init__(self, ds, **kwargs):
        """
        This will initialize a sliceplot with zoom controls
        """

    def _sliceplot(self, ds):
        widgets.InteractiveSliceplot(options = yt.SlicePlot(ds, 'z', 'density'))

@widgets.register('HelloWorld')
class HelloWorld(widgets.DOMWidget):
    _model_name = Unicode('HelloWorldModel').tag(sync=True)
    _model_module = Unicode('yt_widgets').tag(sync=True)
    _model_module_version = Unicode('0.1.0').tag(sync=True)
    _view_name = Unicode('HelloWorldView').tag(sync=True)
    _view_module = Unicode('yt_widgets').tag(sync=True)
    _view_module_version = Unicode('0.1.0').tag(sync=True)
