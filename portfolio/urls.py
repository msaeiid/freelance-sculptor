from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from profiles.views import home_view
from django.conf.urls.i18n import i18n_patterns
from blogs.sitemaps import BlogSitemap
from services.sitemaps import ServiceSitemap
from django.contrib.sitemaps.views import sitemap

urlpatterns = i18n_patterns(
    # General
    path('admin/', admin.site.urls),
    path('rosetta/', include('rosetta.urls')),
    path('', home_view, name='home'),
    # API
    path('api/blog/', include('blogs.urls')),
    path('api/contact/', include('contacts.urls')),
    path('api/education/', include('educations.urls')),
    path('api/experience/', include('experiences.urls')),
    path('api/gallery/', include('galleries.urls')),
    path('api/profile/', include('profiles.urls')),
    path('api/review/', include('reviews.urls')),
    path('api/service/', include('services.urls')),
    path('api/skill/', include('skills.urls')),
    path('api/language/', include('languages.urls')),
    # Pages
    path('qualities', home_view, name='qualities'),
    path('skills', home_view, name='skills'),
    path('service/<int:pk>', home_view, name='service'),
    path('portfolio', home_view, name='portfolio'),
    path('reviews', home_view, name='reviews'),
    path('blog/<int:pk>', home_view, name='blog'),
    path('contact/', home_view, name='contact'),
)

sitemaps = {
    'Blog': BlogSitemap,
    'Service': ServiceSitemap
}

urlpatterns += [
    path(
        'sitemap.xml',
        sitemap,
        {"sitemaps": sitemaps},
        name="django.contrib.sitemaps.views.sitemap",
    )
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
