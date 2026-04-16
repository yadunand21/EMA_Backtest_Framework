export interface BacktestInput {
    ticker: string[];
    start_date: string;
    end_date: string;
    short_ema: number;
    long_ema: number;
    trade_cost: number;
}

export interface BacktestOutput {
    average_return: number;
    sharpe_ratio: number;
    volatility: number;
    asset_value_graph: number[][];
}
