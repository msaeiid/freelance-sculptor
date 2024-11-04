
from django.urls import path
from .views import (ExperienceRetrieveUpdateDestroyAPIView,
                    ExperienceListCreateAPIView)

app_name='experiences'

urlpatterns = [
    path('<int:pk>/', ExperienceRetrieveUpdateDestroyAPIView.as_view(),
         name='RetrieveUpdateDestroy'),
    path('', ExperienceListCreateAPIView.as_view(), name='ListCreate')
]
