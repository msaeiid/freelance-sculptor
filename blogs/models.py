from django.db import models
from portfolio.rest_api.baseModel import BaseModel
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from ckeditor.fields import RichTextField
from parler.models import TranslatableModel, TranslatedFields
from django.urls import reverse


class Blog(BaseModel, TranslatableModel):
    images = models.ImageField(
        upload_to='blogs/',
        null=True,
        verbose_name=_('Images'))
    translations = TranslatedFields(
        title=models.CharField(
            max_length=settings.LONG_TEXT_LENGTH,
            verbose_name=_('Title')),
        body=RichTextField(
            blank=True,
            verbose_name=_('Body')),

    )

    def __unicode__(self):
        self.title

    def __str__(self) -> str:
        return f'{self.title}'

    def get_absolute_url(self):
        return reverse('blog', kwargs={'pk': self.pk})

    class Meta:
        verbose_name = _('Blog')
        verbose_name_plural = _("Blogs")
        ordering = ('-created_at',)
