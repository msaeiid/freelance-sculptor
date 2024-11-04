from parler_rest.fields import TranslatedFieldsField
from .models import Review
from parler_rest.serializers import TranslatableModelSerializer
from portfolio.rest_api.mixins import TranslatedSerializerMixin


class ReviewSerializer(TranslatedSerializerMixin, TranslatableModelSerializer):
    translations = TranslatedFieldsField(
        shared_model=Review,
        read_only=True)

    class Meta:
        model = Review
        exclude = [
            'created_at',
            'created_by',
            'updated_at',
            'updated_by',
            'profile',
        ]
