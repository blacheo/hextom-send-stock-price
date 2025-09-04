from rest_framework import serializers

from subscriptions.utilities.get_stock_price import get_stock_price
from subscriptions.models import Subscription
from subscriptions.constants import MAX_EMAIL_LENGTH
from subscriptions.constants import MAX_STOCK_STICKER_LENGTH
from yfinance import Ticker

class SubscriptionSerializer(serializers.ModelSerializer):
    stock_price = serializers.SerializerMethodField()
    class Meta:
        model = Subscription
        fields = ["email", "stock_sticker", "stock_price"]
        read_only_fields = ["stock_price"]

    def create(self, data):
        return Subscription.objects.create(**data)
    
    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.stock_sticker = validated_data.get('stock_sticker', instance.stock_sticker)

    def validate(self, attrs):
        info = Ticker(attrs["stock_sticker"]).history(period='7d', interval='1d')
        if (len(info) <= 0):
            raise serializers.ValidationError("Stock is either delisted or doesn't exist")
        return attrs

    def get_stock_price(self, data: Subscription):
        return get_stock_price(data.stock_sticker)
    