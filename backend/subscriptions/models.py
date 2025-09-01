from django.db import models

from subscriptions.constants import MAX_EMAIL_LENGTH, MAX_STOCK_STICKER_LENGTH

# Create your models here.
class Subscription(models.Model):
    email = models.CharField(max_length=MAX_EMAIL_LENGTH)
    stock_sticker = models.CharField(max_length=MAX_STOCK_STICKER_LENGTH)

