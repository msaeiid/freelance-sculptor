from django.contrib import admin
from .models import Skill
from profiles.admin import CustomModelAdmin
from parler.admin import TranslatableAdmin


@admin.register(Skill)
class CustomBlogAdmin(CustomModelAdmin, TranslatableAdmin):
    pass
