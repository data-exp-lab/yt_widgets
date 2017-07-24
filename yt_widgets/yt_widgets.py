import ipywidgets as widgets
from traitlets import Unicode, Bool, Integer, Float, TraitError, validate


@widgets.register('InteractiveRender')
class InteractiveRender(widgets.DOMWidget):
    """
    Interactive Render Widget
    """
    _model_name = Unicode('InteractiveRender').tag(sync=True)
    _model_module = Unicode('yt_widgets').tag(sync=True)
    _model_module_version = Unicode('0.1.0').tag(sync=True)
    _view_name = Unicode('InteractiveRender').tag(sync=True)
    _view_module = Unicode('yt_widgets').tag(sync=True)
    _view_module_version = Unicode('0.1.0').tag(sync=True)
    x_pan = Float(1.0).tag(sync=True)
    y_pan = Float(1.0).tag(sync=True)
    zoom = Float(1.0).tag(sync=True)
    url = Unicode('').tag(sync=True)
