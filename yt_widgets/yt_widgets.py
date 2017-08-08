import ipywidgets as widgets
from traitlets import Unicode, Dict, validate


@widgets.register('DisplayParam')
class DisplayParam(widgets.DOMWidget):
    """
    Base class to a (Dropdown) widget. Displays the selected parameter in this.el.textContent .
    Self-updating (see yt_widget.js)
    """
    _model_name = Unicode('DisplayParam').tag(sync=True)
    _model_module = Unicode('yt_widgets').tag(sync=True)
    _model_module_version = Unicode('0.1.0').tag(sync=True)
    _view_name = Unicode('DisplayParam').tag(sync=True)
    _view_module = Unicode('yt_widgets').tag(sync=True)
    _view_module_version = Unicode('0.1.0').tag(sync=True)
    parameters = Dict().tag(sync=True)
    w = widgets.Dropdown()

    def __init__(self, ds):
        """
        The link should be from the value attribute of the Dropdown widget/class
        """
        try:
            self.parameters = ds.parameters
        except AttributeError:
            print('AttributeError, needs fixing')
            raise

@widgets.register('Dropdown')
class Dropdown(DisplayParam):
    """
    Dropdown menu widget, derived from the DisplayParam class.
    """

    def __init__(self, ds, **kwargs):
        """Extends "DisplayParam" class from yt_widgets
           Extends "Dropdown" class from ipywidgets
        """
        super(DisplayParam, self).__init__(**kwargs)
