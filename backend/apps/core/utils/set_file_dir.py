import os
from django.conf import settings


def set_file_dir(dir_name: str):
    if not os.path.isdir(settings.MEDIA_ROOT):
        os.mkdir(settings.MEDIA_ROOT)
    if not os.path.isdir(settings.MEDIA_ROOT + dir_name):
        os.mkdir(settings.MEDIA_ROOT + dir_name)
