from collections import defaultdict
from typing import Tuple
from celery import shared_task
import pytz
from subscriptions.utilities.get_stock_price import get_stock_price
from subscriptions.models import Subscription
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils import timezone

@shared_task
def send_subscription_stock_emails():
    tz = pytz.timezone("America/Toronto")
    now = timezone.now().astimezone(tz)
    
    subs = Subscription.objects.all()
    grouped: defaultdict[str, list[Tuple[str, int]]] = defaultdict(list)

    for sub in subs:
        grouped[sub.email].append({"ticker": sub.stock_sticker, "price": get_stock_price(sub)})

    for email, subs in grouped.items():
        context = {"stocks": subs, "time": now.strftime("%B %d, %Y %H:%M %Z")}
        subject = "📈 Your Stock Update"
        from_email = "noreply@myapp.com"
        to = [email]

        # Plain text fallback
        text_content = "Here are your stock prices:\n" + "\n".join(
            [f"{s['ticker']}: {s['price']}" for s in subs]
        )

        # HTML version using template
        html_content = render_to_string("emails/stock_update.html", context)

        msg = EmailMultiAlternatives(subject, text_content, from_email, to)
        msg.attach_alternative(html_content, "text/html")
        msg.send()