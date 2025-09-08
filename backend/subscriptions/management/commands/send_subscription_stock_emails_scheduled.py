from collections import defaultdict
import time
from typing import Dict

from subscriptions.emails.chatgpt import stock_advice
from subscriptions.emails.send_subscription_emails import send_subscription_stock_emails
from subscriptions.models import Subscription
from subscriptions.utilities.get_stock_price import get_stock_price
from django.core.management.base import BaseCommand
from django.db import OperationalError, connections

def send_scheduled_subscription_emails():
    grouped_stocks: defaultdict[str, list[Dict[str, int]]] = defaultdict(list)

    subs = Subscription.objects.all()

    decision_cache = dict()
    price_cache = dict()
    
    for sub in subs:
        grouped_stocks[sub.email].append({"stock_sticker" : sub.stock_sticker, "price" : get_stock_price(sub.stock_sticker, price_cache), "decision" : stock_advice(sub.stock_sticker, decision_cache)})

    send_subscription_stock_emails(grouped_stocks)

class Command(BaseCommand):
    help = "Send scheduled subscription stock emails"

    def handle(self, *args, **options):
        retries = 5
        delay = 5
        for i in range(retries):
            try:
                send_scheduled_subscription_emails()
                break
            except OperationalError:
                if i < retries - 1:
                    self.stdout.write("DB not ready, retrying in 5s...")
                    time.sleep(delay * (i + 1))

