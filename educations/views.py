from rest_framework import generics
from .models import Education
from .serializers import EducationSerializer
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.conf import settings

SINGLE_USER = settings.SINGLE_USER


class EducationRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer

    def put(self, request, *args, **kwargs):
        if SINGLE_USER:
            education = get_object_or_404(Education, pk=kwargs.get('pk'))
            sent_data = request.data.copy()
            serializer = self.serializer_class(
                data=sent_data,
                instance=education,
                context={
                    'request': request,
                    'sent_data': sent_data})
            if serializer.is_valid():
                serializer.save(updated_by=request.user)
                return Response(data=serializer.data, status=status.HTTP_200_OK)
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EducationListCreateAPIView(generics.ListCreateAPIView):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer

    def perform_create(self, serializer):
        if self.request.user.profile:
            serializer.save(profile=self.request.user.profile,
                            created_by=self.request.user)
