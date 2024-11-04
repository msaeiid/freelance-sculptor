
from django.urls import path
from .views import (ContactCreateListAPIView,
                    ContactRetrieveAPIView, ContactMessageCount)

app_name='contacts'

urlpatterns = [
    path('<int:pk>/', ContactRetrieveAPIView.as_view(),
         name='Retrieve'),
    path('', ContactCreateListAPIView.as_view(), name='CreateList'),
    path('contact_count/', ContactMessageCount.as_view(), name='ContactsCount'),
]
