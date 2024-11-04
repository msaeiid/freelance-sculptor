from parler_rest.fields import TranslatedFieldsField
from .models import Blog
from parler_rest.serializers import TranslatableModelSerializer
from portfolio.rest_api.mixins import TranslatedSerializerMixin


class BlogSerializer(TranslatedSerializerMixin, TranslatableModelSerializer):
    translations = TranslatedFieldsField(
        shared_model=Blog,
        read_only=True)

    class Meta:
        model = Blog
        exclude = [
            # 'created_at',
            'created_by',
            'updated_at',
            'updated_by',
            'profile',
        ]
