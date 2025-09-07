from yfinance import Ticker
from subscriptions.models import Subscription


def get_stock_price(stock_sticker: str):
    ticker = Ticker(stock_sticker)
    return '{:,.2f}'.format(ticker.info['regularMarketPrice'])