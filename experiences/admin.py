from django.contrib import admin
from .models import Experience
from profiles.admin import CustomModelAdmin
from parler.admin import TranslatableAdmin


@admin.register(Experience)
class CustomBlogAdmin(CustomModelAdmin, TranslatableAdmin):
    pass
