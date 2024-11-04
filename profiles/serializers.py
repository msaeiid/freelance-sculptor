from rest_framework import serializers
from .models import Profile
from django.contrib.auth import get_user_model
from parler_rest.fields import TranslatedFieldsField
from portfolio.rest_api.mixins import TranslatedSerializerMixin
from parler_rest.serializers import TranslatableModelSerializer

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        # fields = ('first_name', 'last_name', 'email')
        fields = ('email',)


class ProfileSerializer(TranslatedSerializerMixin, TranslatableModelSerializer):
    user = UserSerializer(read_only=True)
    translations = TranslatedFieldsField(shared_model=Profile, read_only=True)

    class Meta:
        model = Profile
        exclude = [
            'updated_at',
        ]
        read_only_fields = [
            'quality_public',
            'skill_public',
            'service_public',
            'portfolio_public',
            'review_public',
            'blog_public',
            'contact_public',
        ]


class ShowOrHideSectionSerializer(serializers.Serializer):
    section = serializers.CharField()
