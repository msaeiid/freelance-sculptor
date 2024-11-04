from .models import Contact
from rest_framework import generics
from .serializers import ContactSerializer
from django.contrib.auth import get_user_model
from django.conf import settings
from profiles.models import Profile
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

User = get_user_model()
SINGLE_USER = settings.SINGLE_USER


class ContactCreateListAPIView(generics.ListCreateAPIView,):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = []

    def perform_create(self, serializer):
        if SINGLE_USER:
            profile = Profile.objects.first()
            serializer.save(profile=profile)
        return super().perform_create(serializer)


class ContactRetrieveAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer


class ContactMessageCount(generics.RetrieveAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    # because safe methods doesn't authenticate I have to do so
    permission_classes = [IsAuthenticated,]

    def get(self, request, *args, **kwargs):
        if SINGLE_USER:
            profile = Profile.objects.all().first()
            context = {'count': profile.contacts_contact_profile.filter(
                is_read=False).count()}
            return Response(data=context, status=status.HTTP_200_OK)
