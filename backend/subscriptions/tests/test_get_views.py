from django.urls import reverse
from subscriptions.models import Subscription
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from knox.models import AuthToken

class SubscriptionAPIGetTests(APITestCase):
    def setUp(self):
        Subscription.objects.create(email="abc@gmail.com", stock_sticker="^IXIC")
        Subscription.objects.create(email="xyz@gmail.com", stock_sticker="^DJI")
        self.get_all_url = reverse('subscription-get-all')
        

    def test_get_subscriptions_success_as_user(self):
        pass

    def test_get_subscriptions_success_as_admin(self):
        password = "a password"
        user_name = 'my_admin'
        my_admin = User.objects.create_superuser(user_name, "my_admin@email.com", password)
        _, token_string = AuthToken.objects.create(my_admin)
 
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {token_string}")
        response = self.client.get(self.get_all_url, {})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual({sub["stock_sticker"] for sub in response.data}, {"^IXIC", "^DJI"})

    def test_get_subscription_failure_not_logged_in(self):
        pass

    def test_get_subscription_failure_not_admin(self):
        response = self.client.get(self.get_all_url, {})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)