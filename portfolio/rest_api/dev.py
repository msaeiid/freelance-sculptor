from rest_framework import authentication
from django.contrib.auth import get_user_model

User = get_user_model()


class DevAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        user = User.objects.all().first()
        return (user, None)
