from django.contrib import admin
from .models import Language


@admin.register(Language)
class CustomBlogAdmin(admin.ModelAdmin):
    list_display = [
        'title',
        'code',
        'created_at',
        'created_by',
        'updated_at',
        'updated_by',]

    readonly_fields = [
        'created_at',
        'created_by',
        'updated_at',
        'updated_by',]
