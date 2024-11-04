from rest_framework import generics
from .serializers import GalleryCategorySerializer, GallerySerializer
from .models import GalleryCategory, Gallery
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.conf import settings

SINGLE_USER = settings.SINGLE_USER

# GalleryCategory


class GalleryCategoryRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = GalleryCategory.objects.all()
    serializer_class = GalleryCategorySerializer

    def put(self, request, *args, **kwargs):
        if SINGLE_USER:
            galleryCategory = get_object_or_404(
                GalleryCategory, pk=kwargs.get('pk'))
            sent_data = request.data.copy()
            serializer = self.serializer_class(
                data=sent_data,
                instance=galleryCategory,
                context={
                    'request': request,
                    'sent_data': sent_data})
            if serializer.is_valid():
                serializer.save(updated_by=request.user)
                return Response(data=serializer.data, status=status.HTTP_200_OK)
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GalleryCategoryListCreateAPIView(generics.ListCreateAPIView):
    queryset = GalleryCategory.objects.all()
    serializer_class = GalleryCategorySerializer

    def perform_create(self, serializer):
        if self.request.user.profile:
            serializer.save(profile=self.request.user.profile,
                            created_by=self.request.user)

# Gallery


class GalleryRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer

    def put(self, request, *args, **kwargs):
        if SINGLE_USER:
            gallery = get_object_or_404(Gallery, pk=kwargs.get('pk'))
            sent_data = request.data.copy()
            serializer = self.serializer_class(
                data=sent_data,
                instance=gallery,
                context={
                    'request': request,
                    'sent_data': sent_data})
            if serializer.is_valid():
                serializer.save(updated_by=request.user)
                return Response(data=serializer.data, status=status.HTTP_200_OK)
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GalleryListCreateAPIView(generics.ListCreateAPIView):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer

    def perform_create(self, serializer):
        if self.request.user.profile:
            serializer.save(profile=self.request.user.profile,
                            created_by=self.request.user)

    def get_queryset(self):
        category = self.request.GET.get('category') or None
        gallery = Gallery.objects.all()
        if category and category != "All":
            gallery = gallery.filter(
                category__translations__title__iexact=category)
        return gallery
