from rest_framework import serializers
from parler_rest.fields import TranslatedFieldsField
from .models import Service
from parler_rest.serializers import TranslatableModelSerializer
from portfolio.rest_api.mixins import TranslatedSerializerMixin


class ServiceSerializer(TranslatedSerializerMixin, TranslatableModelSerializer):
    translations = TranslatedFieldsField(
        shared_model=Service, read_only=True)

    class Meta:
        model = Service
        exclude = [
            # 'created_at',
            'created_by',
            'updated_at',
            'updated_by',
            'profile',
        ]
