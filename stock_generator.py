import random

stocks = {"AAPL": 150.0, "GOOGL": 2500.0, "TSLA": 900.0, "MSFT": 400.0}


def get_stock_data():
    result = []

    for ticker in stocks:
        change = random.uniform(-5, 5)
        stocks[ticker] += change

        result.append({"ticker": ticker, "price": round(stocks[ticker], 2)})

    return result
