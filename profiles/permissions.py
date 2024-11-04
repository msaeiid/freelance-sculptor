from rest_framework import permissions
from profiles.models import Profile
from contacts.models import Contact


class HasUserPermissions(permissions.DjangoModelPermissions):
    perms_map = {
        'GET': ['%(app_label)s.view_%(model_name)s'],
        'OPTIONS': [],
        'HEAD': [],
        'POST': ['%(app_label)s.add_%(model_name)s'],
        'PUT': ['%(app_label)s.change_%(model_name)s'],
        'PATCH': ['%(app_label)s.change_%(model_name)s'],
        'DELETE': ['%(app_label)s.delete_%(model_name)s'],
    }

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user.is_authenticated:
            if request.user.is_staff:
                return super().has_permission(request, view)
        return False

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user.is_authenticated:
            if isinstance(obj, Profile):
                return (obj.user == request.user) or (request.user.is_admin)
            elif isinstance(obj, Contact):
                return True
            else:
                return (obj.profile.user == request.user) or (request.user.is_admin)
