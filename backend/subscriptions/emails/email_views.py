from rest_framework.views import APIView

from subscriptions.utilities import get_stock_price
from subscriptions.emails.send_subscription_emails import send_subscription_stock_emails
from rest_framework.response import Response
from rest_framework import status

class EmailViews(APIView):
    def get(self, request):
        email = request.user.email
        stock_sticker = request.data.get("stock_sticker")

        try:
            grouped_stocks = {email : [(stock_sticker, get_stock_price(stock_sticker))]}
        except:
            return  Response({"error": "Stock Sticker is either delisted or does not exist"}, status=status.HTTP_409_CONFLICT) 
        
        send_subscription_stock_emails(grouped_stocks)
        return Response({"message": "Successfully sent email"}, status=status.HTTP_200_OK)