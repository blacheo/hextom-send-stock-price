from django.urls import reverse
from subscriptions.models import Subscription
from rest_framework.test import APITestCase

class SubscriptionAPIGetTests(APITestCase):
    def setUp(self):
        Subscription.objects.create(email="abc@gmail.com", stock_sticker="DOW")
        Subscription.objects.create(email="xyz@gmail.com", stock_sticker="NASDAQ")
        self.get_url = reverse('subscription-create')
        

    def test_get_subscriptions_success_as_user(self):
        pass

    def test_get_subscriptions_success_as_admin(self):
        pass