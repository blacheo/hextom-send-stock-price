from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from knox.models import AuthToken

class AuthAPITest(APITestCase):
    def setUp(self):
        # Create a user for login tests
        self.user_email = "existinguser@example.com"
        self.user_password = "password123"
        self.user = User.objects.create_user(username=self.user_email, email=self.user_email, password=self.user_password)

        # URLs
        self.register_url = reverse("register")  # path('auth/register/', RegisterAPI.as_view())
        self.login_url = reverse("login")        # path('auth/login/', LoginAPI.as_view())

    def test_register_success(self):
        data = {"email": "newuser@example.com", "password": "newpassword"}
        response = self.client.post(self.register_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("token", response.data)
        self.assertEqual(response.data["user"]["email"], data["email"])
        self.assertTrue(User.objects.filter(username=data["email"]).exists())

    def test_register_duplicate_user(self):
        data = {"email": self.user_email, "password": "anypassword"}
        response = self.client.post(self.register_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("error", response.data)

    def test_login_success(self):
        data = {"email": self.user_email, "password": self.user_password}
        response = self.client.post(self.login_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("token", response.data)
        self.assertEqual(response.data["user"]["email"], self.user_email)

    def test_login_wrong_password(self):
        data = {"email": self.user_email, "password": "wrongpassword"}
        response = self.client.post(self.login_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("error", response.data)

    def test_login_nonexistent_user(self):
        data = {"email": "nouser@example.com", "password": "password"}
        response = self.client.post(self.login_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("error", response.data)
