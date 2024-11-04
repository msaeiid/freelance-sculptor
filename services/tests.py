from django.test import TestCase
from django.contrib.auth import get_user_model
import json.scanner
from rest_framework.test import APIClient
import json
import datetime

User = get_user_model()
# TODO : after implementing permissions tests raise error  owner and users with permission can

TEST_USERS = [{
    'username': 'saeid',
    'first_name': 'mohammadsaeid',
    'last_name': 'karbaschian'
}, {
    'username': 'reza',
    'first_name': 'mohammadreza',
    'last_name': 'karbaschian'
}, {
    'username': 'ali',
    'first_name': 'mohammadali',
    'last_name': 'karbaschian'
},
]
PARAMS = {
    "author": "admin",
    "title": "title",
    "short_description": "short des",
    "body": "<p><s><u>hi there<br />\r\n<br />\r\nfmeklsmfksfkd<br />\r\naD<br />\r\nsaD<br />\r\nsaD<br />\r\nasD<br />\r\nASD<br />\r\nSaF<br />\r\nas</u></s></p>",
    "icon": "fa-laptop",
}


PATH = "/api/service/"
CONTENT_TYPE = "application/json"


class Test(TestCase):
    def setUp(self) -> None:
        self.users = [User.objects.create(**TEST_USERS[0]),
                      User.objects.create(**TEST_USERS[1]),
                      User.objects.create(**TEST_USERS[2])]

    def test_user_has_been_created(self):
        qs_users = User.objects.all()
        self.assertEqual(self.users[0], qs_users[0])
        self.assertEqual(self.users[1], qs_users[1])
        self.assertEqual(self.users[2], qs_users[2])
        self.assertEqual(len(self.users), qs_users.count())

    def get_client(self, user):
        client = APIClient()
        client.force_login(user=user)
        return client

    def test_api_create(self):
        for user in self.users:
            client = self.get_client(user)
            PARAMS['profile'] = user.profile.id
            data = json.dumps(PARAMS)
            response = client.post(path=PATH,
                                   data=data,
                                   content_type=CONTENT_TYPE)
            self.assertEqual(response.status_code, 201)

    def test_api_detail(self):
        self.test_api_create()
        client = self.get_client(self.users[0])
        for i in range(len(self.users)):
            response = client.get(
                path=f'{PATH}{i+1}/',
                content_type=CONTENT_TYPE)
            self.assertEqual(response.status_code, 200)
            self.assertEqual(
                response.json()['created_by'], self.users[i].username)
            self.assertEqual(
                response.json()['author'], self.users[i].username)
            self.assertEqual(
                response.json()['title'], PARAMS['title'])
            self.assertEqual(
                response.json()['short_description'], PARAMS['short_description'])
            self.assertEqual(
                response.json()['body'], PARAMS['body'])
            self.assertEqual(
                response.json()['icon'], PARAMS['icon'])

    def test_api_update(self):
        self.test_api_create()
        for i in range(len(self.users)):
            client = self.get_client(self.users[i])
            PARAMS['author'] = self.users[i].profile.id
            PARAMS['title'] = f'{
                PARAMS['title']}-{self.users[i].username}'
            PARAMS['short_description'] = f'{
                PARAMS['short_description']}-{self.users[i].username}'
            PARAMS['body'] = f'{
                PARAMS['body']}-{self.users[i].username}'
            PARAMS['icon'] = f'{
                PARAMS['icon']}--'
            data = json.dumps(PARAMS)
            response = client.put(path=f'{PATH}{i+1}/',
                                  data=data,
                                  content_type=CONTENT_TYPE)
            self.assertEqual(response.status_code, 200)
            self.assertEqual(
                response.json()['updated_by'], self.users[i].username)

    def test_api_delete(self):
        self.test_api_create()
        for i in range(len(self.users)):
            client = self.get_client(self.users[i])
            response = client.delete(path=f'{PATH}{
                                     i+1}/', content_type=CONTENT_TYPE)
            self.assertEqual(response.status_code, 204)
        response = client.get(
            path=PATH, content_type=CONTENT_TYPE)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), [])

    def test_api_list(self):
        self.test_api_create()
        client = self.get_client(self.users[0])
        response = client.get(
            path=PATH, content_type=CONTENT_TYPE)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 3)
