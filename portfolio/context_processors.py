from django.conf import settings


def default_domain(request):
    return {'default_domain': settings.DEFAULT_DOMAIN,
            'developer_url': settings.DEVELOPER_URL,
            'developer_name': settings.DEVELOPER_NAME}
