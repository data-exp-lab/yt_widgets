import ipywidgets as widgets
from traitlets import Unicode, Bool, Integer, Float, TraitError, validate


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

    x_pan = Float(1.0).tag(sync=True)
    y_pan = Float(1.0).tag(sync=True)
    zoom = Float(1.0).tag(sync=True)

    def __init__(self, **kwargs):
        super(View, self).__init__(**kwargs)

@widgets.register('TextureSlider')
class TextureSlider(widgets.FloatSlider):
    """
    Widget for slicing through Mesh objects.
    """
    #readout_format = Unicode('.3f').tag(sync=True)

    def __init__(self, field, **kwargs):
        """Extends FloatSlider from ipywidgets.
        Args:
            **kwargs: Arbitrary keyword arguments for FloatRangeSlider.
        """
        super(TextureSlider, self).__init__(**kwargs)
        self.min, self.max = (-10, 10)
        #self.min, self.max = [index.grid_levels.min(). index.grid_levels.max()]
        self.value = 0
        self.step = 0.1
        self.layout.width = '100%'
        self.description = "Slice Position"
        self.orientation = 'vertical'

        #self.link()


# The property field of the catalog that the slider will use.
# Need a property field.

'''
    def link(self):
        """Link slider values with the ``filter_range`` from tileLayer."""
        self._layer.filter_property = self.property
        self.link = dlink((self, 'value'), (self._layer, 'filter_range'))

    def unlink(self):
        """Unlink from the provided tileLayer."""
        self.link.unlink()
        del self.link
        self._layer.filter_property = ''
'''
