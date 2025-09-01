from django.test import TestCase

from subscriptions.models import Subscription

# Create your tests here.
class SubscriptionModelTest(TestCase):
    def setUp(self):
        Subscription.objects.create(email="abc@gmail.com", stock_sticker="DOW")
    
    def test_sanity(self):
        subscription = Subscription.objects.get(email="abc@gmail.com")

        self.assertEqual(subscription.stock_sticker, "DOW")