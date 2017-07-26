from ._version import version_info, __version__

from .yt_widgets import *

def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'static',
        'dest': 'yt_widgets',
        'require': 'yt_widgets/extension'
    }]
