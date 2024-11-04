from rest_framework import generics
from .models import Skill
from .serializers import SkillSerializer
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.conf import settings


SINGLE_USER = settings.SINGLE_USER


class SkillRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

    def put(self, request, *args, **kwargs):
        if SINGLE_USER:
            skill = get_object_or_404(Skill, pk=kwargs.get('pk'))
            sent_data = request.data.copy()
            serializer = self.serializer_class(
                data=sent_data,
                instance=skill,
                context={
                    'request': request,
                    'sent_data': sent_data})
            if serializer.is_valid():
                serializer.save(updated_by=request.user)
                return Response(data=serializer.data, status=status.HTTP_200_OK)
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SkillListCreateAPIView(generics.ListCreateAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

    def perform_create(self, serializer):
        if self.request.user.profile:
            serializer.save(profile=self.request.user.profile,
                            created_by=self.request.user)
