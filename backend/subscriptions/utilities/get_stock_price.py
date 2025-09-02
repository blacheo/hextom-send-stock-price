from yfinance import Ticker
from subscriptions.models import Subscription


def get_stock_price(data: Subscription):
    ticker = Ticker(data.stock_sticker)
    return ticker.info['regularMarketPrice']