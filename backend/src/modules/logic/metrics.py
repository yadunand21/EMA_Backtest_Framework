import numpy as np
import pandas as pd


def compute_metrics(portfolio_returns: pd.Series) -> dict:
    """Compute CAGR, Sharpe ratio, and max drawdown from daily returns."""
    cumulative = (1 + portfolio_returns).cumprod()

    n_days = len(cumulative)
    cagr = float(cumulative.iloc[-1] ** (252 / n_days) - 1)

    annual_vol = float(portfolio_returns.std() * np.sqrt(252))
    sharpe = float((portfolio_returns.mean() * 252) / annual_vol) if annual_vol > 0 else 0.0

    drawdown = cumulative / cumulative.cummax() - 1
    max_drawdown = float(drawdown.min())

    return {
        "cagr": round(cagr, 4),
        "sharpe": round(sharpe, 4),
        "max_drawdown": round(max_drawdown, 4),
        "annual_vol": round(annual_vol, 4),
    }


def equity_curve(portfolio_returns: pd.Series) -> list:
    """Return equity curve as a list of {date, value} dicts for charting."""
    cumulative = (1 + portfolio_returns).cumprod()
    return [
        {"date": str(date.date()), "value": round(float(val), 4)}
        for date, val in cumulative.items()
    ]
