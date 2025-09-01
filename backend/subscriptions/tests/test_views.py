from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from subscriptions.models import Subscription

class SubscriptionAPITests(APITestCase):
    def setUp(self):
        Subscription.objects.create(email="abc@gmail.com", stock_sticker="DOW")
        self.add_url = reverse('subscription-create')
        

    def test_new_subscription_success(self):
        response = self.client.post(self.add_url, {'email': "abc@gmail.com", 'stock_sticker' : "NASDAQ"})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED, response)
        subscription = Subscription.objects.get(stock_sticker="NASDAQ")

        self.assertEqual(subscription.email, "abc@gmail.com")
        self.assertEqual(Subscription.objects.count(), 2)


    def test_new_subscription_invalid(self):
        pass