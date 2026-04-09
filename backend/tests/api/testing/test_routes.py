import os 
import sys
import asyncio

import pytest
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..')))

from src.api.testing.routes import get_testing_results
from src.api.testing.io import BacktestInput

@pytest.mark.asyncio
async def test_call():
    input = BacktestInput(
        ticker = ["AAPL", "PL"], 
        start_date = "2015-08-01",
        end_date = "2025-08-01",
        short_ema = 20,
        long_ema = 50,
        trade_cost = 0.0005
    )
    output = await get_testing_results(input)
    print(f"Output: {output}")

