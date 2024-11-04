from django.contrib import admin
from .models import Gallery, GalleryCategory
from profiles.admin import CustomModelAdmin
from parler.admin import TranslatableAdmin


@admin.register(GalleryCategory)
class CustomBlogCategoryAdmin(CustomModelAdmin, TranslatableAdmin):
    pass


@admin.register(Gallery)
class CustomBlogAdmin(CustomModelAdmin, TranslatableAdmin):
    pass
