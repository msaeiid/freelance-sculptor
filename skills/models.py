from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from colorfield.fields import ColorField
from portfolio.rest_api.baseModel import BaseModel
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from parler.models import TranslatableModel, TranslatedFields


class Skill(BaseModel, TranslatableModel):

    translations = TranslatedFields(
        title=models.CharField(
            max_length=settings.LONG_TEXT_LENGTH,
            verbose_name=_('Title'))
    )

    percentage = models.SmallIntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        verbose_name=_('Percentage')
    )
    color = ColorField(
        default='#FF0000',
        verbose_name=_('Color'))

    def __unicode__(self):
        self.title

    def __str__(self) -> str:
        return f'{self.title}'

    class Meta:
        verbose_name = _('Skill')
        verbose_name_plural = _("Skills")
