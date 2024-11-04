from rest_framework import generics
from .models import Service
from .serializers import ServiceSerializer
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.conf import settings

SINGLE_USER = settings.SINGLE_USER


class ServiceRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

    def put(self, request, *args, **kwargs):
        if SINGLE_USER:
            service = get_object_or_404(Service, pk=kwargs.get('pk'))
            sent_data = request.data.copy()
            serializer = self.serializer_class(
                data=sent_data,
                instance=service,
                context={
                    'request': request,
                    'sent_data': sent_data})
            if serializer.is_valid():
                serializer.save(updated_by=request.user)
                return Response(data=serializer.data, status=status.HTTP_200_OK)
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ServiceListCreateAPIView(generics.ListCreateAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

    def perform_create(self, serializer):
        if self.request.user.profile:
            serializer.save(profile=self.request.user.profile,
                            created_by=self.request.user)

    def get_queryset(self):
        exclude_query = self.request.query_params.get('exclude')
        if exclude_query:
            return Service.objects.exclude(id=exclude_query)
        return super().get_queryset()
