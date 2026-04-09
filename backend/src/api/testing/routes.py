from fastapi import APIRouter

from src.api.testing.io import BacktestInput, BacktestOutput
from src.modules.logic.data import download_prices
#for historical data from yfinance
from src.modules.logic.signals import ema_crossover_signals
#generate buy sell signals
from src.modules.logic.portfolio import compute_portfolio_returns
#takes signals and prices to build daily portfolio return series
from src.modules.logic.metrics import compute_metrics
#This calculates cagr, sharpe ratio, and volatility 
from src.modules.logic.metrics import equity_curve
#helps build the cumulative growth curve


testing_router = APIRouter(prefix="/testing")

@testing_router.post("/")
async def get_testing_results(input: BacktestInput) -> BacktestOutput:
    prices = download_prices(input.ticker, input.start_date, input.end_date)
    signals = ema_crossover_signals(prices, input.short_ema, input.long_ema)
    portfolio_returns = compute_portfolio_returns(prices, signals, input.trade_cost)
    metrics = compute_metrics(portfolio_returns)

    print(prices.head())

    return BacktestOutput(
        average_return=metrics["cagr"],
        sharpe_ratio=metrics["sharpe"],
        volatility=metrics["annual_vol"],
        asset_value_graph=[prices.get(ticker) for ticker in input.ticker],
    )
