from parler_rest.fields import TranslatedFieldsField
from .models import Experience
from parler_rest.serializers import TranslatableModelSerializer
from portfolio.rest_api.mixins import TranslatedSerializerMixin


class ExperienceSerializer(TranslatedSerializerMixin, TranslatableModelSerializer):
    translations = TranslatedFieldsField(
        shared_model=Experience, read_only=True)

    class Meta:
        model = Experience
        exclude = [
            'created_at',
            'created_by',
            'updated_at',
            'updated_by',
            'profile',
        ]
