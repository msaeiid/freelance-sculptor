from django.contrib import admin
from .models import Blog
from profiles.admin import CustomModelAdmin
from parler.admin import TranslatableAdmin


@admin.register(Blog)
class CustomBlogAdmin(CustomModelAdmin, TranslatableAdmin):
    pass
