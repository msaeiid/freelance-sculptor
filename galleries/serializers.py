from rest_framework import serializers
from parler_rest.fields import TranslatedFieldsField
from .models import Gallery, GalleryCategory
from parler_rest.serializers import TranslatableModelSerializer
from portfolio.rest_api.mixins import TranslatedSerializerMixin


class GalleryCategorySerializer(TranslatedSerializerMixin, TranslatableModelSerializer):
    translations = TranslatedFieldsField(
        shared_model=GalleryCategory,
        read_only=True)

    class Meta:
        model = GalleryCategory
        exclude = [
            'created_at',
            'created_by',
            'updated_at',
            'updated_by',
            'profile',
        ]


class GallerySerializer(TranslatedSerializerMixin, TranslatableModelSerializer):
    category = serializers.PrimaryKeyRelatedField(
        queryset=GalleryCategory.objects.all())
    translations = TranslatedFieldsField(
        shared_model=Gallery,
        read_only=True)

    class Meta:
        model = Gallery
        exclude = [
            'created_at',
            'created_by',
            'updated_at',
            'updated_by',
            'profile',
        ]

    # The to_representation method is overridden to customize show category title of
    # the Gallery instance. In this method, it checks the HTTP method of the request(GET or HEAD),
    # and if it's one of those methods, it retrieves the category ID from the serialized data and replaces
    # it with the serialized representation of the GalleryCategory instance obtained using the GalleryCategorySerializer.
    # This way, when you perform GET requests, the serialized data will include title, while during POST or PUT requests,
    # only the category ID will be accepted.

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        category_id = representation.pop('category')
        category = GalleryCategory.objects.get(id=category_id)
        representation['category'] = category.title
        return representation
