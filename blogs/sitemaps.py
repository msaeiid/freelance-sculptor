from django.shortcuts import render
from django.contrib.sitemaps import Sitemap
from django.contrib.sitemaps.views import sitemap
from .models import Blog


class BlogSitemap(Sitemap):
    changefreq = "daily"
    priority = 0.1
    i18n = True

    def items(self):
        return Blog.objects.all().order_by('-updated_at')

    def lastmod(self, obj):
        return obj.updated_at

    def location(self, obj):
        return obj.get_absolute_url()
