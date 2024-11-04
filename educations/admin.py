from django.contrib import admin
from .models import Education
from profiles.admin import CustomModelAdmin
from parler.admin import TranslatableAdmin


@admin.register(Education)
class CustomBlogAdmin(CustomModelAdmin, TranslatableAdmin):
    pass
