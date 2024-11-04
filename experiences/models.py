from django.db import models
from django.conf import settings
from portfolio.rest_api.baseModel import BaseModel
from django.utils.translation import gettext_lazy as _
from parler.models import TranslatableModel, TranslatedFields


class Experience(BaseModel, TranslatableModel):

    translations = TranslatedFields(
        title=models.CharField(
            max_length=settings.LONG_TEXT_LENGTH,
            verbose_name=_('Title')),
        company_name=models.CharField(
            max_length=settings.MEDIUM_TEXT_LENGTH,
            verbose_name=_('Company name')),
        description=models.TextField(
            null=True, blank=True, verbose_name=_('Description'))
    )
    start_date = models.DateField(null=True, verbose_name=_('Start date'))
    finish_date = models.DateField(null=True, verbose_name=_('Finish Date'))
    until_now = models.BooleanField(blank=True, verbose_name=_('Until now'))

    def __unicode__(self):
        self.title

    def __str__(self) -> str:
        self.set_current_language(self.language_code)
        return f'{self.title}'

    class Meta:
        verbose_name = _('Experience')
        verbose_name_plural = _("Experiences")

# Create your models here.
