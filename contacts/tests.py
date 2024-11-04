from django.test import TestCase
from rest_framework.test import APIClient
from .models import Contact
from django.contrib.auth import get_user_model
import json
# TODO : after implementing permissions tests raise error  owner and users with permission can
CONTENT_TYPE = "application/json"
CONTACT_PATH = "/api/contact/"
NUMBER_OF_CONTACTS = 10

User = get_user_model()


class ContactTest(TestCase):

    def setUp(self) -> None:
        user_params = {
            'username': 'saeid',
            'first_name': 'mohammadsaeid',
            'last_name': 'karbaschian'
        }
        self.user = User.objects.create(**user_params)

    def get_client(self, user=None):
        client = APIClient()
        if user:
            client.force_login(user=user)
        return client

    def test_contact_api_create(self):
        client = self.get_client()
        for i in range(1, NUMBER_OF_CONTACTS+1):
            parameters = {
                'name': f'{i}',
                'email': f'{i}@gmail.com',
                'subject': f"request {i}",
                'message': f'message {i}'
            }
            json_data = json.dumps(parameters)
            response = client.post(path=CONTACT_PATH,
                                   data=json_data,
                                   content_type=CONTENT_TYPE)
            self.assertEqual(response.status_code, 201)
        qs_contact = Contact.objects.all()
        self.assertEqual(qs_contact.count(), NUMBER_OF_CONTACTS)

    def test_contact_api_detail(self):
        self.test_contact_api_create()
        client = self.get_client(self.user)
        for i in range(1, NUMBER_OF_CONTACTS+1):
            path = f'{CONTACT_PATH}{i}/'
            response = client.get(path=path,
                                  content_type=CONTENT_TYPE)
            res_data = response.json()
            self.assertEqual(response.status_code, 200)
            self.assertEqual(res_data['name'], f'{i}')
            self.assertEqual(res_data['email'], f'{i}@gmail.com')
            self.assertEqual(res_data['subject'], f'request {i}')
            self.assertEqual(res_data['message'], f'message {i}')

    def test_contact_api_list(self):
        self.test_contact_api_create()
        client = self.get_client(self.user)
        response = client.get(path=CONTACT_PATH,
                              content_type=CONTENT_TYPE)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), NUMBER_OF_CONTACTS)


# Create your tests here.
