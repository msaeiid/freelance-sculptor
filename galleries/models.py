from django.db import models
from django.conf import settings
from portfolio.rest_api.baseModel import BaseModel
from django.utils.translation import gettext_lazy as _
from django.utils.translation import gettext_lazy as _
from parler.models import TranslatableModel, TranslatedFields


class GalleryCategory(BaseModel, TranslatableModel):

    translations = TranslatedFields(
        title=models.CharField(
            max_length=settings.LONG_TEXT_LENGTH,
            verbose_name=_('Title'))
    )

    def __unicode__(self):
        self.title

    def __str__(self) -> str:
        return f'{self.title}'

    class Meta:
        verbose_name = _('Gallery Category')
        verbose_name_plural = _("Gallery Categories")


class Gallery(BaseModel, TranslatableModel):

    translations = TranslatedFields(
        title=models.CharField(
            max_length=settings.LONG_TEXT_LENGTH,
            verbose_name=_('Title'))
    )

    category = models.ForeignKey(
        GalleryCategory,
        on_delete=models.CASCADE,
        related_name='images', verbose_name=_('Category'))
    image = models.ImageField(
        upload_to='galleries/images/',
        null=True, verbose_name=_('Image'))

    def __unicode__(self):
        self.title

    def __str__(self) -> str:
        return f'{self.title}'

    class Meta:
        verbose_name = _('Gallery')
        verbose_name_plural = _("Galleries")
        ordering = ('-created_at',)

# Create your models here.
