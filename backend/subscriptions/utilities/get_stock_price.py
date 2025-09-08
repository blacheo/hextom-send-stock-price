from typing import Dict, Optional
from yfinance import Ticker
from subscriptions.models import Subscription


def get_stock_price(stock_ticker: str, cache: Optional[Dict[str, str]] = None):
    if cache is None:
        cache = dict()

    if stock_ticker in cache:
        return cache[stock_ticker]

    ticker = Ticker(stock_ticker)

    result = '{:,.2f}'.format(ticker.info['regularMarketPrice'])

    cache[stock_ticker] = result

    return result