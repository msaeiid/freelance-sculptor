
from django.urls import path
from .views import (GalleryCategoryRetrieveUpdateDestroyAPIView,
                    GalleryCategoryListCreateAPIView,
                    GalleryRetrieveUpdateDestroyAPIView,
                    GalleryListCreateAPIView
                    )


app_name='galleries'

urlpatterns = [
    # GalleryCategory
    path('category/<int:pk>/', GalleryCategoryRetrieveUpdateDestroyAPIView.as_view(),
         name='CategoryRetrieveUpdateDestroy'),
    path('category/', GalleryCategoryListCreateAPIView.as_view(),
         name='CategoryListCreate'),
    # Gallery
    path('gallery/<int:pk>/', GalleryRetrieveUpdateDestroyAPIView.as_view(),
         name='GalleryRetrieveUpdateDestroy'),
    path('gallery/', GalleryListCreateAPIView.as_view(), name='GalleryListCreate')
]
