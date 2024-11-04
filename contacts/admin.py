from django.contrib import admin
from .models import Contact
# Register your models here.


@admin.register(Contact)
class CustomBlogAdmin(admin.ModelAdmin):
    list_display = [
        'is_read',
        'name',
        'email',
        'subject',
        'created_at',
    ]
    readonly_fields = ['created_at',]
