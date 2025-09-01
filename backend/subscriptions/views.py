from django.shortcuts import render
from rest_framework import permissions, viewsets, response, status
from rest_framework.views import APIView

from subscriptions.serializers import SubscriptionSerializer

# Create your views here.
class SubscriptionList(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        pass

class SubscriptionCreate(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):

        serializer = SubscriptionSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return response.Response(serializer.data, status=status.HTTP_201_CREATED)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)