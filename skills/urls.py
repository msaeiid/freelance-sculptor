from django.urls import path
from .views import (SkillRetrieveUpdateDestroyAPIView,
                    SkillListCreateAPIView)


app_name='skills'

urlpatterns = [
    path('<int:pk>/', SkillRetrieveUpdateDestroyAPIView.as_view(),
         name='RetrieveUpdateDestroy'),
    path('', SkillListCreateAPIView.as_view(), name='ListCreate')
]
