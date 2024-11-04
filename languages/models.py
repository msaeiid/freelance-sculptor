from django.db import models
from django.conf import settings
from portfolio.rest_api.baseModel import BaseModel
from django.utils.translation import gettext_lazy as _


class Language(BaseModel, models.Model):

    title = models.CharField(
        max_length=20,
        editable=False,
        verbose_name=_('Title'))
    code = models.CharField(
        verbose_name=_('code'),
        max_length=20,
        choices=settings.LANGUAGES)

    def __str__(self) -> str:
        return f'{self.code}'

    class Meta:
        verbose_name = _('Language')
        verbose_name_plural = _("Languages")
        unique_together = ('profile', 'code',)
