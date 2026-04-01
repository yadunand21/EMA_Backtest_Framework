import yfinance as yf
import pandas as pd


def download_prices(tickers: list, start: str, end: str) -> pd.DataFrame:
    """Download adjusted close prices for a list of tickers."""
    data = yf.download(tickers, start=start, end=end, progress=False)["Close"]
    data = data.dropna()
    return data
