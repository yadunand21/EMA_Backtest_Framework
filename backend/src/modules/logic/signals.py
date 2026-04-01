import pandas as pd


def ema_crossover_signals(prices: pd.DataFrame, short_window: int, long_window: int) -> pd.DataFrame:
    """
    Generate buy/sell signals using EMA crossover.
    Returns 1 (buy) when short EMA > long EMA, else 0.
    """
    ema_short = prices.ewm(span=short_window).mean()
    ema_long = prices.ewm(span=long_window).mean()
    signals = (ema_short > ema_long).astype(int)
    return signals
