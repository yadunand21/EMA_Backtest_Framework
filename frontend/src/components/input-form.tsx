import "./input-form.css"
export default function InputForms() {
    return (<div className="card">
        <h2>Strategy Parameters</h2>
        <form id="backtest-form">
            <div className="form-grid">
                <div className="form-group">
                    <label htmlFor="tickers">Tickers (comma-separated)</label>
                    <input type="text" id="tickers" value="SPY,QQQ,TLT,GLD" placeholder="e.g. SPY,QQQ,TLT,GLD" />
                </div>
                <div className="form-group">
                    <label htmlFor="short">Short EMA Window</label>
                    <input type="number" id="short" value="20" min="2" max="200" />
                </div>
                <div className="form-group">
                    <label htmlFor="long">Long EMA Window</label>
                    <input type="number" id="long" value="50" min="3" max="500" />
                </div>
                <div className="form-group">
                    <label htmlFor="start">Start Date</label>
                    <input type="date" id="start" value="2018-01-01" />
                </div>
                <div className="form-group">
                    <label htmlFor="end">End Date</label>
                    <input type="date" id="end" value="2024-01-01" />
                </div>
                <div className="form-group">
                    <label htmlFor="cost">Transaction Cost (e.g. 0.0005)</label>
                    <input type="number" id="cost" value="0.0005" step="0.0001" min="0" max="0.01" />
                </div>
            </div>
            <button type="submit" id="run-btn">Run Backtest</button>
        </form>
    </div>)
}

