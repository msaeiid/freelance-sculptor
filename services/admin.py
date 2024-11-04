from django.contrib import admin
from .models import Service
from profiles.admin import CustomModelAdmin
from parler.admin import TranslatableAdmin


@admin.register(Service)
class CustomBlogAdmin(CustomModelAdmin, TranslatableAdmin):
    pass
