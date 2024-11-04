from parler_rest.fields import TranslatedFieldsField
from .models import Education
from portfolio.rest_api.mixins import TranslatedSerializerMixin
from parler_rest.serializers import TranslatableModelSerializer


class EducationSerializer(TranslatedSerializerMixin, TranslatableModelSerializer):
    translations = TranslatedFieldsField(
        shared_model=Education, read_only=True)

    class Meta:
        model = Education
        exclude = [
            'created_at',
            'created_by',
            'updated_at',
            'updated_by',
            'profile',
        ]
