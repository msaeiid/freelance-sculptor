from django.urls import path
from .views import (ReviewRetrieveUpdateDestroyAPIView,
                    ReviewListCreateAPIView)

app_name='reviews'

urlpatterns = [
    path('<int:pk>/', ReviewRetrieveUpdateDestroyAPIView.as_view(),
         name='RetrieveUpdateDestroy'),
    path('', ReviewListCreateAPIView.as_view(), name='ListCreate')
]
