from django.db import models
from django.conf import settings
from portfolio.rest_api.baseModel import BaseModel
from django.utils.translation import gettext_lazy as _


class Contact(BaseModel):
    name = models.CharField(
        max_length=settings.MEDIUM_TEXT_LENGTH,
        null=False,
        verbose_name=_('Name'))
    email = models.EmailField(null=False, verbose_name=_('Email'))
    subject = models.CharField(
        max_length=settings.LONG_TEXT_LENGTH,
        null=False,
        verbose_name=_('Subject')
    )
    message = models.TextField(
        null=False,
        verbose_name=_('Message'))
    is_read = models.BooleanField(
        default=False,
        verbose_name=_('Is read'))

    def __str__(self) -> str:
        return f'{self.name}'

    class Meta:
        verbose_name = _('Contact')
        verbose_name_plural = _("Contacts")
