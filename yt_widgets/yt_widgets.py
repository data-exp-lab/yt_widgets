import ipywidgets as widgets
from traitlets import Unicode, Bool, Integer, Float, TraitError, validate
import yt


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
    parameters = Unicode('').tag(sync=True)

    @staticmethod
    def parameters(ds, **kwargs):
        parameters = ds.parameters

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
            field:    ~
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
