# from whitenoise.storage import CompressedManifestStaticFilesStorage

# class WhiteNoiseStaticFilesStorage(CompressedManifestStaticFilesStorage):
#     manifest_strict = False

# class WhiteNoiseMediaStorage(WhiteNoiseStaticFilesStorage):
#     def __init__(self, *args, **kwargs):
#         kwargs.setdefault("base_dir", 'media')
#         super(WhiteNoiseMediaStorage, self).__init__(*args, **kwargs)