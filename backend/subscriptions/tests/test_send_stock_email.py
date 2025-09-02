from django.test import TestCase, override_settings
from django.core import mail
from unittest.mock import patch, MagicMock
from subscriptions.tasks import send_subscription_emails
from subscriptions.models import Subscription



@override_settings(EMAIL_BACKEND="django.core.mail.backends.locmem.EmailBackend")
class SimpleEmailTest(TestCase):
    def setUp(self):
        Subscription.objects.create(email="abc@gmail.com", stock_sticker="AAPL")
        Subscription.objects.create(email="xyz@gmail.com", stock_sticker="MSFT")

    @patch("subscriptions.utilities.get_stock_price.Ticker")
    def test_email_sent(self, mock_ticker):
        # Mock stock price data
        mock_history = MagicMock()
        mock_history.empty = False
        mock_history.__getitem__.return_value = [123.45]
        mock_ticker.return_value.history.return_value = mock_history

        # Run the task
        send_subscription_emails.send_subscription_stock_emails()

        # Assert 2 emails (one per unique email)
        self.assertEqual(len(mail.outbox), 2)

        # Verify email content
        self.assertIn("AAPL", mail.outbox[0].body)
        self.assertIn("MSFT", mail.outbox[1].body)
