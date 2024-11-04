from django.contrib import admin
from .models import Review
from profiles.admin import CustomModelAdmin
from parler.admin import TranslatableAdmin


@admin.register(Review)
class CustomBlogAdmin(CustomModelAdmin, TranslatableAdmin):
    pass
