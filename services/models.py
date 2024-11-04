from django.db import models
from ckeditor.fields import RichTextField
from django.conf import settings
from portfolio.rest_api.baseModel import BaseModel
from django.utils.translation import gettext_lazy as _
from parler.models import TranslatableModel, TranslatedFields
from django.urls import reverse


class Service(BaseModel, TranslatableModel):

    translations = TranslatedFields(
        title=models.CharField(
            max_length=settings.LONG_TEXT_LENGTH,
            verbose_name=_('Title')),
        short_description=models.CharField(
            max_length=settings.LONG_TEXT_LENGTH,
            help_text="It's a short description for home page only 120 character is allowed",
            null=True,
            verbose_name=_('Short description')),
        body=RichTextField(
            blank=True,
            verbose_name=_('Body'))
    )

    icon = models.CharField(
        max_length=settings.SHORT_TEXT_LENGTH,
        help_text='go to https://fontawesome.com/v4/icon/laptop then copy icon code example: fa fa-laptop',
        null=True,
        verbose_name=_('Icon'))

    def __unicode__(self):
        self.title

    def __str__(self) -> str:
        return f'{self.title}'

    def get_absolute_url(self):
        return reverse('service', kwargs={'pk': self.pk})

    class Meta:
        verbose_name = _('Service')
        verbose_name_plural = _("Services")
        ordering = ('-created_at',)


# Create your models here.
