from django.shortcuts import render
from rest_framework import permissions, status
from rest_framework.views import APIView
from knox.auth import TokenAuthentication
from subscriptions.models import Subscription
from subscriptions.serializers import SubscriptionSerializer
from rest_framework.response import Response

# Create your views here.
class SubscriptionSeeOwn(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        if request.user.is_superuser:
            subscriptions = Subscription.objects.all()
        else:
            subscriptions = Subscription.objects.filter(email=request.user.email)
        serializer = SubscriptionSerializer(subscriptions, many=True)
        return Response(serializer.data)
    
    def delete(self, request):
        try:
            subscription = Subscription.objects.get(email=request.user.email, stock_sticker=request.data.get("stock_sticker"))
        except Subscription.DoesNotExist:
            return Response({"error": "Subscription not found"}, status=status.HTTP_404_NOT_FOUND)
        subscription.delete()
        return Response({"message": "Subscription deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


class SubscriptionListAll(APIView):
    permission_classes = [permissions.IsAdminUser]
    authentication_classes = [TokenAuthentication]
    def get(self, _):
        subscriptions = Subscription.objects.all()
        serializer = SubscriptionSerializer(subscriptions, many=True)
        return Response(serializer.data)

class SubscriptionCreate(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):

        serializer = SubscriptionSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        if Subscription.objects.filter(email=request.data.get("email"), stock_sticker=request.data.get("stock_sticker")).exists():
            return Response({"error": "Subscription already exists"}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)