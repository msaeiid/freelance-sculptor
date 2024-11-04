from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from .models import Language
from .serializer import LanguageSerializer
from django.utils.translation import activate, get_language
from rest_framework.response import Response
from rest_framework import status
from django.utils.translation import gettext_lazy as _


class LanguageListAPIView(generics.ListAPIView):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer


class GetTranslation(APIView):
    queryset = Language.objects.all()

    def post(self, request):
        language = request.LANGUAGE_CODE
        requested_lst = request.data.get('translation_lst')
        translation = {item: _(item) for item in requested_lst}
        return Response(translation, status=200)


# class ChangeLanguage(APIView):
#     queryset = Language.objects.all()

#     def post(self, request):
#         language = self.request.data.get('language')
#         activate(language)

#         request.session['django_language'] = language
#         request.session.save()
#         print(request.session.get('django_language'))
#         return Response({'message': f"language changed to :{get_language()}"}, status=status.HTTP_200_OK)
