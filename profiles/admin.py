from django.contrib import admin
from .models import Profile
from parler.admin import TranslatableAdmin


@admin.register(Profile)
class CustomBlogAdmin(TranslatableAdmin):
    list_display = [
        'user',
        'first_name',
        'last_name',
    ]


class CustomModelAdmin(TranslatableAdmin):
    list_display = [
        'profile',
        'title',
        'created_at',
        'created_by',
        'updated_at',
        'updated_by',]
    readonly_fields = [
        'created_at',
        'created_by',
        'updated_at',
        'updated_by',]
