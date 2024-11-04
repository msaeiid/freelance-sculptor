from rest_framework import views
from django.conf import settings
from .models import Profile
from .serializers import ProfileSerializer, UserSerializer, ShowOrHideSectionSerializer
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render
from django.contrib.auth import get_user_model
from datetime import datetime
from django.utils.translation import gettext_lazy as _
from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

User = get_user_model()
SINGLE_USER = settings.SINGLE_USER


class ProfileRetrieveUpdateAPIView(views.APIView):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

    def get(self, request, *args, **kwargs):
        if SINGLE_USER:
            profile = Profile.objects.all().first()
            serialize = self.serializer_class(
                profile, context={'request': request})
            return Response(data=serialize.data, status=status.HTTP_200_OK)
        # TODO: if SINGLE_USER == FALSE

    def put(self, request, *args, **kwargs):
        if SINGLE_USER:
            profile = Profile.objects.all().first()
            sent_data = request.data.copy()

            if 'birth_day' in sent_data:
                date_format = '%Y-%m-%dT%H:%M:%S.%fZ'
                date_object = datetime.strptime(
                    sent_data['birth_day'], date_format)
                formatted_date = date_object.date()
                sent_data['birth_day'] = formatted_date

            user_serializer = UserSerializer(
                data=sent_data, instance=profile.user)
            if user_serializer.is_valid():
                user_serializer.save()
            profile_serializer = self.serializer_class(
                data=sent_data,
                instance=profile,
                context={'request': request,
                         'sent_data': sent_data})
            if profile_serializer.is_valid():
                profile_serializer.save(updated_by=request.user.profile)
                return Response(data=profile_serializer.data, status=status.HTTP_200_OK)
            return Response(data=profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # TODO: if SINGLE_USER == FALSE


@api_view(http_method_names=['GET'])
def home_view(request, pk=None):
    user = None
    if SINGLE_USER:
        user = User.objects.all().first()
    # TODO: if SINGLE_USER == FALSE
    language_code = request.LANGUAGE_CODE

    context = {
        'message': _("message"),
        'language_code': language_code,
        'is_authenticated': "true" if request.user.is_authenticated else "false",
        'is_superuser': False,
        'user': user,
        'loginUrl': settings.LOGIN_URL
    }
    if context['is_authenticated']:
        context['is_superuser'] = request.user.is_superuser

    return render(request, 'home.html', context=context)


class ShowOrHideSection(generics.UpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ShowOrHideSectionSerializer

    # because safe methods doesn't authenticate I have to do so
    permission_classes = [IsAuthenticated,]

    def put(self, request, *args, **kwargs):
        if SINGLE_USER:
            profile = Profile.objects.all().first()
            section = request.data.get('section')
            selected_section = profile.__dict__.get(section, None)
            if (selected_section is not None):
                profile.__setattr__(
                    section, not profile.__getattribute__(section))
                profile.save()
                context = {section: profile.__getattribute__(section)}
                return Response(data=context, status=status.HTTP_200_OK)
            return Response(status=status.HTTP_400_BAD_REQUEST)
