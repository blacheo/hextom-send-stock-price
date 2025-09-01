from rest_framework import serializers

from subscriptions.models import Subscription
from subscriptions.constants import MAX_EMAIL_LENGTH
from subscriptions.constants import MAX_STOCK_STICKER_LENGTH

class SubscriptionSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=MAX_EMAIL_LENGTH)
    stock_sticker = serializers.CharField(max_length=MAX_STOCK_STICKER_LENGTH)

    def create(self, data):
        return Subscription.objects.create(**data)
    
    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.stock_sticker = validated_data.get('stock_sticker', instance.stock_sticker)