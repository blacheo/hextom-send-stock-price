from collections import defaultdict
from typing import Dict

from subscriptions.emails.chatgpt import stock_advice
from subscriptions.emails.send_subscription_emails import send_subscription_stock_emails
from subscriptions.models import Subscription
from subscriptions.utilities.get_stock_price import get_stock_price
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = "Send scheduled subscription stock emails"

    def handle(self, *args, **options):
        grouped_stocks: defaultdict[str, list[Dict[str, int]]] = defaultdict(list)

        subs = Subscription.objects.all()

        cache = dict()
        
        for sub in subs:
            grouped_stocks[sub.email].append({"stock_sticker" : sub.stock_sticker, "price" : get_stock_price(sub.stock_sticker), "decision" : stock_advice(sub.stock_sticker, cache)})

        send_subscription_stock_emails(grouped_stocks)

