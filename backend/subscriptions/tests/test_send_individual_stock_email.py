# tests/test_email_views.py
from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.contrib.auth.models import User
from unittest.mock import patch

from subscriptions.constants import EMAIL_NAME

class EmailViewsTests(APITestCase):
    def setUp(self):
        # Create a user and login
        self.user = User.objects.create_user(
            username="testuser",
            email="test@example.com",
            password="password123"
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.url = reverse(EMAIL_NAME)  # <-- match name from urls.py

    @patch("subscriptions.utilities.get_stock_price.get_stock_price", return_value=123.45)
    def test_successful_email_send(self, mock_get_price):
        response = self.client.get(self.url, {"stock_sticker": "^IXIC"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["message"], "Successfully sent email")

        # Assert helpers were called
        mock_get_price.assert_called_once_with("^IXIC")


    @patch("subscriptions.utilities.get_stock_price", side_effect=Exception("Invalid stock"))
    def test_invalid_stock(self, mock_get_price):
        response = self.client.get(self.url, {"stock_sticker": "FAKE"})
        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)
        self.assertEqual(response.data["error"], "Stock Sticker is either delisted or does not exist")

    def test_unauthenticated_access(self):
        client = APIClient()  # no login
        response = client.get(self.url, {"stock_sticker": "AAPL"})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
