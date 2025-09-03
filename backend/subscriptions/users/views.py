from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from knox.models import AuthToken

class RegisterAPI(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        if User.objects.filter(username=email).exists():
            return Response({"error": "User already exists"}, status=status.HTTP_400_BAD_REQUEST)
        
        user = User.objects.create_user(username=email, email=email, password=password)
        _, token = AuthToken.objects.create(user)
        return Response({"user": {"email": user.email}, "token": token}, status=status.HTTP_201_CREATED)
    


class LoginAPI(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(username=email, password=password)
        if not user:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
        
        _, token = AuthToken.objects.create(user)
        return Response({"user": {"email": user.email}, "token": token}, status=status.HTTP_200_OK)
    

