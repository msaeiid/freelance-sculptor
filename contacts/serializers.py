from rest_framework import serializers
from .models import Contact


class ContactSerializer(serializers.ModelSerializer):

    class Meta:
        model = Contact
        exclude = [
            'created_by',
            'updated_at',
            'updated_by',
            'profile',
        ]
