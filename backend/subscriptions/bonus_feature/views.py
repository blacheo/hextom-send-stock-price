import itertools
from django.shortcuts import render
from rest_framework import permissions, status
from rest_framework.views import APIView
from knox.auth import TokenAuthentication
from yfinance import Search
from subscriptions.models import Subscription
from subscriptions.serializers import SubscriptionSerializer
from rest_framework.response import Response



def flatmap(func, *iterable):
    return itertools.chain.from_iterable(map(func, *iterable))


class SubscriptionNews(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        subscriptions = Subscription.objects.filter(email = request.user.email)

        news_articles_lists = [Search(sub.stock_sticker).all["news"] for sub in subscriptions]

        flattened_list = list(itertools.chain.from_iterable(news_articles_lists))

        
        return Response(flattened_list)