from django.contrib.auth import get_user_model
from django.db import models
from profiles.models import Profile
from django.utils.translation import gettext_lazy as _


class BaseModel(models.Model):
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name=_('Created at'))
    created_by = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name='%(app_label)s_%(class)s_created',
        null=True,
        verbose_name=_('Created by'))
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name=_('Updated at'))
    updated_by = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name='%(app_label)s_%(class)s_updated',
        null=True,
        verbose_name=_('Updated by'))
    profile = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        related_name='%(app_label)s_%(class)s_profile',
        verbose_name=_('Profile')
    )

    class Meta:
        abstract = True  # Mark this as an abstract base class
