from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from subscriptions.constants import PUT_SUBSCRIPTION
from subscriptions.models import Subscription

class SubscriptionPutAPITests(APITestCase):
    def setUp(self):
        Subscription.objects.create(email="abc@gmail.com", stock_sticker="DOW")
        self.add_url = reverse(PUT_SUBSCRIPTION)
        

    def test_new_subscription_success(self):
        response = self.client.post(self.add_url, {'email': "abc@gmail.com", 'stock_sticker' : "^IXIC"})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED, response)
        subscription = Subscription.objects.get(stock_sticker="^IXIC")

        self.assertEqual(subscription.email, "abc@gmail.com")
        self.assertEqual(Subscription.objects.count(), 2)


    def test_new_subscription_invalid_stock_sticker(self):
        response = self.client.post(self.add_url, {'email': "abc@gmail.com", 'stock_sticker' : "whatever"})

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_new_subscription_invalid_already_exists(self):
        response = self.client.post(self.add_url, {'email': "abc@gmail.com", 'stock_sticker' : "^FCHI"})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = self.client.post(self.add_url, {'email': "abc@gmail.com", 'stock_sticker' : "^FCHI"})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        

    