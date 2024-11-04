from django.shortcuts import render
from django.contrib.sitemaps import Sitemap
from django.contrib.sitemaps.views import sitemap
from .models import Service


class ServiceSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.2
    i18n = True

    def items(self):
        return Service.objects.all().order_by('-updated_at')

    def lastmod(self, obj):
        return obj.updated_at

    def location(self, obj):
        return obj.get_absolute_url()
