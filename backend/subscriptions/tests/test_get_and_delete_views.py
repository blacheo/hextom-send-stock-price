from django.urls import reverse
from subscriptions.constants import GET_SUBSCRIPTION_NAME
from subscriptions.models import Subscription
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from knox.models import AuthToken

class SubscriptionAPIGetTests(APITestCase):
    def setUp(self):
        Subscription.objects.create(email="abc@gmail.com", stock_sticker="^IXIC")
        Subscription.objects.create(email="xyz@gmail.com", stock_sticker="^DJI")
        self.user_abc = User.objects.create_user("abc@gmail.com", "abc@gmail.com", "a password")
        self.get_subscriptions = reverse(GET_SUBSCRIPTION_NAME)
    
    def test_succesfully_delete_subscription(self):
        _, token_string = AuthToken.objects.create(self.user_abc)
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {token_string}")
        Subscription.objects.create(email="abc@gmail.com", stock_sticker="^VIX")
        response = self.client.delete(self.get_subscriptions, {"stock_sticker": "^VIX"})

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        still_exists = Subscription.objects.filter(email="abc@gmail.com", stock_sticker="^VIX").exists()
        self.assertFalse(still_exists)
        
    def test_failure_delete_subscription_does_not_exist(self):
        _, token_string = AuthToken.objects.create(self.user_abc)
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {token_string}")
        response = self.client.delete(self.get_subscriptions, {"stock_sticker": "^VIX"})

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_subscriptions_success_as_user(self):
        
        _, token_string = AuthToken.objects.create(self.user_abc)
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {token_string}")
        response = self.client.get(self.get_subscriptions, {})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual({sub["stock_sticker"] for sub in response.data}, {"^IXIC"})


    def test_get_subscriptions_success_as_admin(self):
        password = "a password"
        user_name = 'my_admin'
        my_admin = User.objects.create_superuser(user_name, "my_admin@email.com", password)
        _, token_string = AuthToken.objects.create(my_admin)
 
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {token_string}")
        response = self.client.get(self.get_subscriptions, {})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        
        self.assertEqual({sub["stock_sticker"] for sub in response.data}, {"^IXIC", "^DJI"}, response.data)

    def test_get_subscription_failure_not_logged_in(self):
        response = self.client.get(self.get_subscriptions, {})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_subscription_failure_not_admin(self):
        response = self.client.get(self.get_subscriptions, {})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        