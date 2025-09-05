# tests/test_subscription_news.py
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from knox.models import AuthToken
from unittest.mock import patch

from subscriptions.constants import NEWS_NAME
from subscriptions.models import Subscription

User = get_user_model()


class SubscriptionNewsTests(APITestCase):
    def setUp(self):
       

        self.token = AuthToken.objects.create(user=self.user)
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token}")

        
  # ✅ patch yfinance.Search
    def test_get_subscription_news(self):
        password = "password123"
        username = "testuser"
        user = User.objects.create_user(
            email="testuser@example.com",
            username=self.username,
            password=self.password
        )

        # Create subscription
        Subscription.objects.create(email=self.user.email, stock_sticker="AAPL")
        Subscription.objects.create(email=self.user.email, stock_sticker="MSFT")

        self.client.login()
        # Mock yfinance.Search return value
        with patch("yfinance.Search") as mock_search:
            mock_search.return_value = lambda ticker: [
                {"title": f"Fake news about {ticker}", "url": f"http://example.com/{ticker}"}
            ]

            url = reverse(NEWS_NAME)  # your URL name in urls.py
            response = self.client.get(url)

            self.assertEqual(response.status_code, 200)

            data = response.json()
            self.assertTrue(isinstance(data, list))
            self.assertGreater(len(data), 0)

            # Check that articles match mock
            self.assertIn("AAPL", data[0]["title"])
            self.assertIn("MSFT", data[1]["title"])

    def test_requires_authentication(self):
        # Remove credentials
        client = APIClient()
        url = reverse(NEWS_NAME)

        response = client.get(url)
        self.assertEqual(response.status_code, 401)
