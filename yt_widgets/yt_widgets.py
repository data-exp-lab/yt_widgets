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
        self.parameters = ds.parameters


@widgets.register('TextureSlider')
class TextureSlider(widgets.FloatSlider):
    """
    @todo:
    Widget for slicing through Mesh objects.
    """

    def __init__(self, field, **kwargs):
        """Extends FloatSlider from ipywidgets.
        Args:
            field:    //see: @todo
            **kwargs: Arbitrary keyword arguments for FloatRangeSlider.
        """
        super(TextureSlider, self).__init__(**kwargs)
        self.min, self.max = (-10, 10)
        self.value = 0
        self.step = 0.1
        self.layout.width = '100%'
        self.description = "Slice Position"
        self.orientation = 'vertical'
