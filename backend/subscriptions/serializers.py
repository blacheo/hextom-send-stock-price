from rest_framework import serializers

from subscriptions.models import Subscription
from subscriptions.constants import MAX_EMAIL_LENGTH
from subscriptions.constants import MAX_STOCK_STICKER_LENGTH

class SubscriptionSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=MAX_EMAIL_LENGTH)
    stock_sticker = serializers.CharField(max_length=MAX_STOCK_STICKER_LENGTH)

    def create(self, validated_data):
        return Subscription(**validated_data)