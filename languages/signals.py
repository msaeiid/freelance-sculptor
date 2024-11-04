from django.db.models.signals import pre_save
from django.dispatch import receiver
from .models import Language
from django.conf import settings


@receiver(pre_save, sender=Language)
def create_language(sender, instance, **kwargs):
    lang_title = [
        item for item in settings.LANGUAGES if item[0] == instance.code]
    instance.title = lang_title[0][1]
