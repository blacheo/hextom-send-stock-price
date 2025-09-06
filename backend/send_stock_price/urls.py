"""
URL configuration for send_stock_price project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path

from subscriptions.html.views import IndexView
from subscriptions.bonus_feature.views import SubscriptionNews
from subscriptions.emails.email_views import EmailViews
from subscriptions.users.views import LoginAPI, RegisterAPI
from subscriptions.constants import EMAIL_NAME, GET_SUBSCRIPTION_NAME, NEWS_NAME
from subscriptions.views import SubscriptionOwn

urlpatterns = [
    path('admin/', admin.site.urls),
    path('subscription/own/', SubscriptionOwn.as_view(), name=GET_SUBSCRIPTION_NAME),
    path('api/auth/login/', LoginAPI.as_view(), name='login'),
    path(r'api/auth/', include('knox.urls')),
    path('api/auth/register/', RegisterAPI.as_view(), name='register'),
    path('', IndexView.as_view(), name="index"),
    path('email/', EmailViews.as_view(), name=EMAIL_NAME),
    path('news/', SubscriptionNews.as_view(), name=NEWS_NAME)
]
