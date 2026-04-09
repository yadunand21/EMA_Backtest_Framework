from pydantic import BaseModel

class BacktestInput(BaseModel):
    ticker: list[str]
    start_date: str
    end_date: str
    short_ema: int
    long_ema: int
    trade_cost: float

class BacktestOutput(BaseModel):
    average_return: float
    sharpe_ratio: float
    volatility: float
    asset_value_graph: list[list[float]]