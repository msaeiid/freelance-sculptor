
from django.urls import path
from .views import (EducationRetrieveUpdateDestroyAPIView,
                    EducationListCreateAPIView)

app_name='educations'

urlpatterns = [
    path('<int:pk>/', EducationRetrieveUpdateDestroyAPIView.as_view(),
         name='RetrieveUpdateDestroy'),
    path('', EducationListCreateAPIView.as_view(), name='ListCreate')
]
