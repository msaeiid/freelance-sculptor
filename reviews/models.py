from django.db import models
from django.conf import settings
from portfolio.rest_api.baseModel import BaseModel
from django.utils.translation import gettext_lazy as _
from parler.models import TranslatableModel, TranslatedFields


class Review(BaseModel, TranslatableModel):

    translations = TranslatedFields(
        title=models.CharField(
            max_length=settings.LONG_TEXT_LENGTH,
            verbose_name=_('Title')),
        profession=models.CharField(
            max_length=settings.MEDIUM_TEXT_LENGTH,
            null=True,
            verbose_name=_('Profession')),
        comment=models.TextField(
            null=True,
            verbose_name=_('Comment'))
    )
    # name field is title
    avatar = models.ImageField(
        upload_to='clients/images/',
        null=True,
        verbose_name=_('Avatar'))

    show = models.BooleanField(
        default=False,
        verbose_name=_('Show'))

    def __unicode__(self):
        self.title

    def __str__(self) -> str:
        return f'{self.title}'

    class Meta:
        verbose_name = _('Review')
        verbose_name_plural = _("Reviews")
