"""
WSGI config for portfolio project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/wsgi/
"""

from django.conf import settings

if settings.DEBUG:
    import os

    from django.core.wsgi import get_wsgi_application
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio.settings')

    application = get_wsgi_application()
else:
    from django.core.wsgi import get_wsgi_application
    import os
    import sys

    # assuming your django settings file is at '/home/msaeiid/mysite/mysite/settings.py'
    # and your manage.py is is at '/home/msaeiid/mysite/manage.py'
    path = '/home/hasankak/website/freelancer/portfolio/'
    if path not in sys.path:
        sys.path.append(path)

    os.environ['DJANGO_SETTINGS_MODULE'] = 'portfolio.settings'

    # then:
    application = get_wsgi_application()
