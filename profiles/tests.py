from django.test import TestCase
from django.contrib.auth import get_user_model
import json.scanner
from rest_framework.test import APIClient
import json
import datetime

User = get_user_model()
# TODO : after implementing permissions tests raise error  owner and users with permission can


TEST_USER = {
    'username': 'admin',
    'password': 'password#N@K',
}
PARAMS = {
    "user": {
        "first_name": "Saeid",
        "last_name": "Karbaschian",
        "email": "mskarbaschian@gmail.com"
    },
    "first_name": "Hassan",
    "last_name": "Kakavand",
    "email": "mskarbaschian@gmail.com",
    # "home_image": open(file=r"C:\Users\mskar\OneDrive\Pictures\home_image.jpg", mode='r').read(),
    "home_page_title": "home_page_title",
    "video": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types",
    # "cv": SimpleUploadedFile(name="D:\DOC\مدارک اشخاص\سعید\CV\Resume-ENG.pdf", content=b"file_content", content_type="application/pdf"),
    "about_me_title": "about_me_title",
    # "about_image": SimpleUploadedFile(name="C:\Users\mskar\OneDrive\Pictures\home_image.jpg", content=b"file_content", content_type="image/jpeg"),
    "summary": "summary",
    "degree": "degree",
    "phone": "+989190911812",
    "address": "Toronto, Ontario, Canada",
    "birth_day": f'{datetime.date(1986, 12, 24)}',
    "experience_period": "10+ Years",
    "freelance": 'True',
    "twitter": "https://twitter.com/?lang=en",
    "facebook": "https://www.facebook.com/login/",
    "linkedin": "https://www.linkedin.com/",
    "instagram": "https://www.instagram.com/",
}


PATH = "/api/profile/"
CONTENT_TYPE = "application/json"


class Test(TestCase):
    def setUp(self) -> None:
        self.user = User.objects.create(**TEST_USER)

    def test_user_has_been_created(self):
        qs_users = User.objects.all()
        self.assertEqual(1, qs_users.count())

    def get_client(self, user):
        client = APIClient()
        client.force_login(user=user)
        return client

    def test_api_detail(self):
        client = self.get_client(self.user)
        response = client.get(
            path=PATH,
            content_type=CONTENT_TYPE)
        self.assertEqual(response.status_code, 200)

    def test_api_update(self):
        client = self.get_client(self.user)
        data = json.dumps(PARAMS)
        response = client.put(
            path=PATH, data=data, content_type=CONTENT_TYPE)
        self.assertEqual(response.status_code, 200)
