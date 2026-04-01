import pandas as pd


def compute_portfolio_returns(
    prices: pd.DataFrame,
    signals: pd.DataFrame,
    transaction_cost: float = 0.0005,
) -> pd.Series:
    """
    Build an equal-weight portfolio from signals and compute daily returns.
    Applies a one-day lag to signals to avoid lookahead bias.
    Deducts transaction costs on turnover.
    """
    # Lag signals by one day so we act on yesterday's signal
    positions = signals.shift(1).fillna(0)

    # Equal-weight across all assets with an active buy signal
    row_sums = positions.sum(axis=1)
    weights = positions.div(row_sums, axis=0).fillna(0)

    # Daily asset returns
    returns = prices.pct_change().fillna(0)

    # Weighted portfolio returns
    portfolio_returns = (weights * returns).sum(axis=1)

    # Subtract transaction costs proportional to turnover
    turnover = weights.diff().abs().sum(axis=1)
    portfolio_returns = portfolio_returns - turnover * transaction_cost

    return portfolio_returns
