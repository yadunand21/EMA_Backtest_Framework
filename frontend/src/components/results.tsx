import type { BacktestOutput } from "../lib/types"
import "./results.css"

interface Props {
    results: BacktestOutput
}

function toPercent(value: number) {
    return (value * 100).toFixed(2) + "%"
}

export default function BacktestResults({ results }: Props) {
    return (
        <div className="results-card">
            <h2>Backtest Results</h2>
            <div className="metrics-grid">
                <div className="metric">
                    <span className="metric-label">CAGR</span>
                    <span className="metric-value">{toPercent(results.average_return)}</span>
                </div>
                <div className="metric">
                    <span className="metric-label">Sharpe Ratio</span>
                    <span className="metric-value">{results.sharpe_ratio.toFixed(3)}</span>
                </div>
                <div className="metric">
                    <span className="metric-label">Volatility</span>
                    <span className="metric-value">{toPercent(results.volatility)}</span>
                </div>
            </div>
        </div>
    )
}
