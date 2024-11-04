
from django.urls import path
from .views import (ProfileRetrieveUpdateAPIView, ShowOrHideSection)


app_name='profiles'

urlpatterns = [
    path('', ProfileRetrieveUpdateAPIView.as_view(),
         name='RetrieveUpdateDestroy'),
    path('ShowOrHideSection/', ShowOrHideSection.as_view(), name='ShowOrHideSection')
]
