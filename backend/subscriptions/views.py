from django.shortcuts import render
from rest_framework import permissions, viewsets, response, status
from rest_framework.views import APIView
from knox.auth import TokenAuthentication
from subscriptions.models import Subscription
from subscriptions.serializers import SubscriptionSerializer

# Create your views here.
class SubscriptionSeeOwn(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        subscriptions = Subscription.objects.filter(email=request.user.email)
        serializer = SubscriptionSerializer(subscriptions, many=True)
        return response.Response(serializer.data)

class SubscriptionListAll(APIView):
    permission_classes = [permissions.IsAdminUser]
    authentication_classes = [TokenAuthentication]
    def get(self, _):
        subscriptions = Subscription.objects.all()
        serializer = SubscriptionSerializer(subscriptions, many=True)
        return response.Response(serializer.data)

class SubscriptionCreate(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):

        serializer = SubscriptionSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return response.Response(serializer.data, status=status.HTTP_201_CREATED)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)