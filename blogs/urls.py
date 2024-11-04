from django.urls import path
from .views import (BlogRetrieveUpdateDestroyAPIView,
                    BlogListCreateAPIView)

app_name='blogs'

urlpatterns = [
    path('<int:pk>/', BlogRetrieveUpdateDestroyAPIView.as_view(),
         name='RetrieveUpdateDestroy'),
    path('', BlogListCreateAPIView.as_view(), name='BlogListCreate')
]
