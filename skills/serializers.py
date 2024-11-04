from parler_rest.fields import TranslatedFieldsField
from .models import Skill
from parler_rest.serializers import TranslatableModelSerializer
from portfolio.rest_api.mixins import TranslatedSerializerMixin


class SkillSerializer(TranslatedSerializerMixin, TranslatableModelSerializer):
    translations = TranslatedFieldsField(
        shared_model=Skill,
        read_only=True)

    class Meta:
        model = Skill
        exclude = [
            'created_at',
            'created_by',
            'updated_at',
            'updated_by',
            'profile',
        ]
