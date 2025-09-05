from celery import Celery
from celery.schedules import crontab
import pytz



app = Celery("email_sender")

eastern = pytz.timezone("US/Eastern")

app.config_from_object("django.conf:settings", namespace="CELERY")

@app.on_after_configure.connect
def setup_periodic_email_tasks(sender: Celery, **kwargs):
    from subscriptions.tasks import send_subscription_stock_emails_scheduled

    sender.add_periodic_task(
        crontab(
            minute=0,
            hour="9-17",
            day_of_week="1-5",
            tz=eastern
        ),
        send_subscription_stock_emails_scheduled.s(),
        name="send_subscription_emails_work_hours"
    )
