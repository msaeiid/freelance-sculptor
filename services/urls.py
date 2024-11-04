from django.urls import path
from .views import (ServiceRetrieveUpdateDestroyAPIView,
                    ServiceListCreateAPIView)


app_name='services'

urlpatterns = [
    path('<int:pk>/', ServiceRetrieveUpdateDestroyAPIView.as_view(),
         name='RetrieveUpdateDestroy'),
    path('', ServiceListCreateAPIView.as_view(), name='ListCreate')
]
