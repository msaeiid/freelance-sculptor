
from django.urls import path
from .views import (LanguageListAPIView, GetTranslation)


app_name='languages'

urlpatterns = [
    path('', LanguageListAPIView.as_view(),
         name='LanguageListAPIView'),
    path('po', GetTranslation.as_view(), name='GetTranslation'),
    #     path('change_language', ChangeLanguage.as_view(),
    #          name='ChangeLanguage'),
]
