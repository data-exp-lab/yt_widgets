import ipywidgets as widgets
from traitlets import Unicode, Dict, validate


@widgets.register('View')
class View(widgets.DOMWidget):
    """
    View Widget
    """
    _model_name = Unicode('ViewModel').tag(sync=True)
    _model_module = Unicode('yt_widgets').tag(sync=True)
    _model_module_version = Unicode('0.1.0').tag(sync=True)
    _view_name = Unicode('ViewView').tag(sync=True)
    _view_module = Unicode('yt_widgets').tag(sync=True)
    _view_module_version = Unicode('0.1.0').tag(sync=True)
    parameters = Dict({}).tag(sync=True)

    def __init__(self, ds):
        try:
            self.parameters = ds.parameters
        except AttributeError:
            print('AttributeError, needs fixing')
            raise

@widgets.register('DisplayParameters')
class DisplayParam(widgets.DOMWidget):
    """
    Base class to a widget. Displays the selected parameter in this.el.textContent .
    """
    _model_name = Unicode('DisplayParam').tag(sync=True)
    _model_module = Unicode('yt_widgets').tag(sync=True)
    _model_module_version = Unicode('0.1.0').tag(sync=True)
    _view_name = Unicode('DisplayParam').tag(sync=True)
    _view_module = Unicode('yt_widgets').tag(sync=True)
    _view_module_version = Unicode('0.1.0').tag(sync=True)
    param = Dict().tag(sync=True)

    def __init__(self, **kwargs):
        """
        The link is from the value attribute of the Dropdown widget/class
        """

@widgets.register('Dropdown')
class Dropdown(DisplayParam):
    """
    Dropdown menu widget, derived from the DisplayParam class.
    """

    def __init__(self, ds, **kwargs):
        """ Extends "Dropdown" class from ipywidgets

        Args:
            ds: The dataset associated with this menu object.
            kwargs: Arbitrary keyword arguments for "Dropdown" widget.
        """

        super(Dropdown, self).__init__(**kwargs)
        self._ds = ds
        self.description = 'Parameters'
        self.layout.width = '100%'
        self.options = self._ds.parameters
