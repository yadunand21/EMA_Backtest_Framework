import { useState } from "react"
import "./input-form.css"
import { fetch_testing_results } from "../lib/actions"
import type { BacktestOutput } from "../lib/types"
import BacktestResults from "./results"

export default function InputForms() {
    const [tickers, setTickers] = useState<string>("");
    const [shortema, setShortEma] = useState<number>(20);
    const [longema, setLongEma] = useState<number>(50);
    const [startdate, setStartDate] = useState<string>("");
    const [enddate, setEndDate] = useState<string>("2024-01-01");
    const [transactioncost, setTransactionCost] = useState<number>(0.0005);
    const [results, setResults] = useState<BacktestOutput | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    function handleTickerChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTickers(_s => e.target.value);
    }

    function handleShortEmaChange(e: React.ChangeEvent<HTMLInputElement>) {
        setShortEma(_s => Number(e.target.value));
    }

    function handleLongEmaChange(e: React.ChangeEvent<HTMLInputElement>) {
        setLongEma(_s => Number(e.target.value));
    }

    function handleStartDateChange(e: React.ChangeEvent<HTMLInputElement>) {
        setStartDate(_s => e.target.value);
    }

    function handleEndDateChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEndDate(_s => e.target.value);
    }

    function handleTransactionCostChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTransactionCost(_s => Number(e.target.value));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResults(null);
        try {
            const data = await fetch_testing_results({
                ticker: tickers.split(",").map(t => t.trim()).filter(t => t.length > 0),
                start_date: startdate,
                end_date: enddate,
                short_ema: shortema,
                long_ema: longema,
                trade_cost: transactioncost,
            });
            setResults(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div className="card">
                <h2>Strategy Parameters</h2>
                <form id="backtest-form" onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="tickers">Tickers (comma-separated)</label>
                            <input
                                type="text"
                                id="tickers"
                                value={tickers}
                                onChange={handleTickerChange}
                                placeholder="e.g. SPY,QQQ,TLT,GLD"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="short">Short EMA Window</label>
                            <input type="number" id="short" value={shortema} min="2" max="200" onChange={handleShortEmaChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="long">Long EMA Window</label>
                            <input type="number" id="long" value={longema} min="3" max="500" onChange={handleLongEmaChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="start">Start Date</label>
                            <input type="date" id="start" value={startdate} onChange={handleStartDateChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="end">End Date</label>
                            <input type="date" id="end" value={enddate} onChange={handleEndDateChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cost">Transaction Cost (e.g. 0.0005)</label>
                            <input type="number" id="cost" value={transactioncost} step="0.0001" min="0" max="0.01" onChange={handleTransactionCostChange} />
                        </div>
                    </div>
                    <button type="submit" id="run-btn" disabled={loading}>
                        {loading ? "Running..." : "Run Backtest"}
                    </button>
                </form>
            </div>

            {error && <p className="error-message">{error}</p>}
            {results && <BacktestResults results={results} />}
        </div>
    )
}
